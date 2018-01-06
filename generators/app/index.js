const Generator = require('../../lib/generator');
const path = require('path');
const makeConfig = require('./configs');
const { kebabCase } = require('lodash');

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    const cwd = process
      .cwd()
      .split(path.sep)
      .pop();

    this.props = {
      name: this.pkg.name || cwd,
      description: this.pkg.description,
      src: this.pkg.directories && this.pkg.directories.lib
    };

    this.dependencies = [
      'apollo-server-express',
      'body-parser',
      'clarify',
      'config',
      'cors',
      'dataloader',
      'deepmerge',
      'express',
      'graphql',
      'graphql-date',
      'graphql-subscriptions',
      'graphql-tools',
      'helmet',
      'jsonwebtoken',
      'subscriptions-transport-ws',
      'uuid',
      'validate',
      'winston'
    ];

    this.devDependencies = [
      'babel-cli',
      'babel-eslint',
      'babel-jest',
      'babel-plugin-transform-imports',
      'babel-plugin-transform-runtime',
      'babel-preset-env',
      'babel-preset-es2015',
      'babel-preset-es2016',
      'babel-preset-es2017',
      'babel-preset-flow',
      'babel-preset-stage-2',
      'babel-preset-stage-3',
      'babel-register',
      'babel-watch',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-flowtype',
      'eslint-plugin-import',
      'eslint-plugin-import-order-autofix',
      'eslint-plugin-jest',
      'eslint-plugin-prettier',
      'husky',
      'jest',
      'lint-staged',
      'prettier'
    ];
  }

  prompting() {
    const dependencies = this.dependencies.concat(this.devDependencies);
    const prompts = [
      {
        name: 'name',
        message: 'Project name',
        when: !this.pkg.name,
        default: this.props.name,
        filter: kebabCase,
        validate(input) {
          const isSelfRef = dependencies.some(dependency => {
            const sepIndex = dependency.indexOf('@');
            const end = sepIndex !== -1 ? sepIndex : dependency.length;
            const dependencyName = dependency.substring(0, end);
            return dependencyName === input;
          });
          if (isSelfRef)
            return `${input} is a dependency of the project. Please give the project another name`;

          return true;
        }
      },
      {
        name: 'description',
        message: 'Project description',
        when: !this.pkg.description
      },
      {
        name: 'src',
        message: 'what should the source folder be called?',
        default: 'src',
        when: !(this.pkg.directories && this.pkg.directories.lib)
      },
      {
        name: 'packager',
        type: 'list',
        message: 'What package manager do you perfer?',
        default: 'npm@>= 5.0.0',
        choices: [{ name: 'Npm', value: 'npm@>= 5.0.0' }, { name: 'Yarn', value: 'yarn@>= 1.0.0' }]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }

  writing() {
    const props = this.props;
    const pkg = (this.pkg = makeConfig.package(this));
    const context = Object.assign({}, props, {
      hasProvider(name) {
        return props.providers.indexOf(name) !== -1;
      }
    });

    this.fs.copy(this.templatePath('src'), this.destinationPath(props.src));
    this.fs.copy(this.templatePath('_eslintrc'), this.destinationPath('', '.eslintrc'));
    this.fs.copy(this.templatePath('_flowconfig'), this.destinationPath('', '.flowconfig'));
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('', '.gitignore'));
    this.fs.copy(this.templatePath('_prettierrc'), this.destinationPath('', '.prettierrc'));

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('', 'README.md'), context);

    this.fs.copyTpl(this.templatePath('server.js'), this.destinationPath('server.js'), context);

    /*this.fs.copyTpl(
      this.templatePath('app.test.js'),
      this.destinationPath(this.testDirectory, 'app.test.js'),
      context
    );*/

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.writeJSON(
      this.destinationPath('config', 'default.json'),
      makeConfig.configDefault(this)
    );

    this.fs.writeJSON(
      this.destinationPath('config', 'production.json'),
      makeConfig.configProduction(this)
    );
  }

  install() {
    this._packagerInstall(this.dependencies, {
      save: true
    });

    this._packagerInstall(this.devDependencies, {
      saveDev: true
    });
  }
};
