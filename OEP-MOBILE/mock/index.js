/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/en_US';

const typeDefs = `#graphql
type Result {
  code: Int!
  message: String
  data: String
}

type UserType {
  id: String!

  """nickname"""
  name: String!

  """description"""
  desc: String!

  """tel"""
  tel: String!

  """avatar"""
  avatar: String
}

type Query {
  """get user by id"""
  find(id: String!): UserType!
}

type Mutation {
  """add new user"""
  create(params: UserInput!): Boolean!

  """delete an user"""
  del(id: String!): Boolean!

  """update an user"""
  updateUserInfo(id: String!, params: UserInput!): Result!
}

input UserInput {
  """nickname"""
  name: String!

  """description"""
  desc: String!

  """telephone"""
  tel: String!
}
`;

const resolvers = {
  UserType: {
    name: () => faker.name.fullName(),
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'hello',
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

startStandaloneServer(server, { listen: { port: 8888 } });
