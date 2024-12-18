/* eslint-disable import/order */
import { createRoot } from 'react-dom/client';
import Login from './containers/Login';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './utils/apollo';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <ConfigProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>,
);
