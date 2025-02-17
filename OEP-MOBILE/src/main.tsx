import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import { client } from './utils/apollo.js';
import Login from './containers/Login';
import Register from './containers/Register';
import './theme.css';
import { ROUTE_COMPONENT } from './routes';
import { routes } from './routes/menus';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<App />}>
            {routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key];
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
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
