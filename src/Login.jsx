import React, { useEffect, useState } from 'react';


function Login({setToken}) {
    const [externalPopup, setExternalPopup] = useState(null);

    useEffect(() => {
      if (!externalPopup) {
        return;
      }

      console.log(externalPopup);
  
      const timer = setInterval(async () => {
        if (!externalPopup) {
          console.log("closed")
          timer && clearInterval(timer);
          return;
        }

        if (externalPopup.closed) {
          console.log("closed1")
          timer && clearInterval(timer);
          setExternalPopup(null);
          const response = await fetch('http://localhost:5000/auth/token');
          const json = await response.json();
          setToken(json.access_token);
          return;
        }
      }, 500)
    },
    [externalPopup]
  )

    async function handleClick() {
        const left = window.screenX + (window.outerWidth - 500) / 2;
        const top = window.screenY + (window.outerHeight - 400) / 2.5;
        const title = "login";
        const url = "http://localhost:5000/auth/login";
        const popup = window.open(url, title, `width=${500},height=${400},left=${left},top=${top}`);
        setExternalPopup(popup);
    }
    return (
        <div className="App">
            <header className="App-header">
                <span className="btn-spotify" onClick={handleClick}>
                    Login with Spotify 
                </span>
            </header>
        </div>
    );
}


export default Login;