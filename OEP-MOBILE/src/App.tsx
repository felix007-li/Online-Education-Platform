import { useQuery } from '@apollo/client';
import { FIND } from './graphql/demo';
import './App.css';

const App = () => {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: '7f8b6d8e-07b8-452e-9567-6c1ee1733c2a',
    },
  });

  return (
    <div>
      <p>
        data:
        {JSON.stringify(data)}
      </p>
      <p>
        loading: `$
        {loading}
        `
      </p>
    </div>
  );
};

export default App;
