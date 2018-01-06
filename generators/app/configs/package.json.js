const semver = require('semver');

module.exports = function(generator) {
  const major = semver.major(process.version);
  const { props } = generator;
  const lib = props.src;
  const [packager, version] = props.packager.split('@');
  const pkg = {
    name: props.name,
    description: props.description,
    version: '0.0.0',
    homepage: '',
    main: lib,
    keywords: ['bowler'],
    author: {
      name: generator.user.git.name(),
      email: generator.user.git.email()
    },
    contributors: [],
    bugs: {},
    directories: {
      lib
    },
    engines: {
      node: `^${major}.0.0`,
      [packager]: version
    },
    babel: {
      presets: ['env', 'es2015', 'es2016', 'es2017', 'stage-2', 'stage-3', 'flow'],
      plugins: ['transform-imports', 'transform-runtime']
    },
    'lint-staged': {
      '*.{js}': ['prettier --write', 'git add']
    },
    jest: {
      moduleDirectories: ['node_modules'],
      collectCoverage: true
    },
    scripts: {
      clean: 'rm -rf build && mkdir build',
      build: `${packager} run clean && ${packager} run build:server`,
      'build:server': 'babel --ignore **__mocks__/*.js,**__tests__/*.js -d ./build ./src -s',
      start: `${packager} run build && NODE_ENV=production node server.js`,
      dev: 'babel-watch server.js',
      precommit: 'lint-staged',
      'prettier-watch': "onchange '**/*.js' -- prettier --write {{changed}}",
      test: `${packager} run eslint && ${packager} run jest`,
      eslint: `eslint ${lib}/. test/. --config .eslintrc.json`,
      jest: 'jest --no-cache'
    }
  };
  return pkg;
};
