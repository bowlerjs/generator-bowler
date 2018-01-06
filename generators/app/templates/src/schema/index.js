import { makeExecutableSchema } from 'graphql-tools';
import deepmerge from 'deepmerge';
import * as General from './General';

/*
 * Register resource modules
 */
const Resources = {
  General
};

// Variable init
let resolvers = { Query: {}, Mutation: {}, Subscription: {} };
let QueryTypes = ``;
let MutationTypes = ``;
let SubscriptionTypes = ``;
let Types = ``;
const Loaders = [];

// Parsing Resource modules
Object.keys(Resources).forEach(ResourceKey => {
  const Resource = Resources[ResourceKey];

  // Parsing the sections in each module
  Object.keys(Resource).forEach(SectionKey => {
    const Section = Resource[SectionKey];
    if (!Section) return;

    if (Section.defs) {
      switch (SectionKey) {
        case 'queries':
          QueryTypes = `${QueryTypes}${Section.defs}`;
          break;
        case 'mutations':
          MutationTypes = `${MutationTypes}${Section.defs}`;
          break;
        case 'subscriptions':
          SubscriptionTypes = `${SubscriptionTypes}${Section.defs}`;
      }
    }

    if (Section.resolvers) {
      resolvers = deepmerge(resolvers, Section.resolvers);
    }
  });

  // Adding the resource object types to the global type definition
  if (Resource.types) {
    Object.keys(Resource.types).forEach(type => {
      if (typeof Resource.types[type] === 'string') {
        Types = `${Types}${Resource.types[type]}`;
      }
    });
  }

  if (Resource.loaders) {
    Loaders.push(Resource.loaders);
  }
});

// Merging Query, Mutation and Subscription types
Types = `
  ${Types}
  ${
    QueryTypes.length
      ? `type Query {
    ${QueryTypes}
  }`
      : ''
  }
  ${
    MutationTypes.length
      ? `type Mutation {
    ${MutationTypes}
  }`
      : ''
  }
  ${
    SubscriptionTypes.length
      ? `type Subscription {
    ${SubscriptionTypes}
  }`
      : ''
  }
`;

// removing unused resolver sections since Apollo complains if they are empty
if (!Object.keys(resolvers.Query).length) {
  delete resolvers.Query;
}

if (!Object.keys(resolvers.Mutation).length) {
  delete resolvers.Mutation;
}

if (!Object.keys(resolvers.Subscription).length) {
  delete resolvers.Subscription;
}

// binds the database connection to each loader and then merges them to a single object
const buildDataloaders = connection =>
  Loaders.map(loader => loader(connection)).reduce((loaders, current) => ({
    ...loaders,
    ...current
  }));

export { buildDataloaders };

export default makeExecutableSchema({ typeDefs: Types, resolvers });
