import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { message } from 'antd';
import { onError } from '@apollo/client/link/error'; // import onError

const uri = '/graphql';

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    orgId: '',
  },
}));

const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    message.error('return wrong parameter');
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        message.error('Login failed, please try again');
      }
    });
  }
  if (networkError) {
    message.error(networkError.message);
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
