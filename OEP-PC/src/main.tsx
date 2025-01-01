/* eslint-disable import/order */
import ReactDOM from 'react-dom/client';
import Login from './containers/Login';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './utils/apollo';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                console.log("component::", Component)
                return (
                  <Route
                    path={item.path}
                    key={item.key}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>,
);
