import * as React from 'react';
import WebPlayback from './WebPlayback'
import {createRoot} from 'react-dom/client';
import './app.css';
import Login from './Login';


const App = () => {
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
        { (token === '') ? <Login setToken={setToken}/> : <WebPlayback token={token} /> }
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
