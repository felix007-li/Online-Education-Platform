import { createRoot } from 'react-dom/client';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo.js';
import Login from './containers/Login/index.js';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  </ApolloProvider>,
);
