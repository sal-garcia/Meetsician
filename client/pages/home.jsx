import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../lib/MainContext';

export default function Home(props) {

  const authContext = useContext(AuthContext);

  useEffect(() => {

  }, []);

  function renderHomeContent() {
    if (authContext.user) {
      return (
        <>
        <h2>Welcome {authContext.user.name}</h2>
        </>
      );
    } else {
      return (
        <>
          <button className='purple text-white sans-serif rounded-border h-15 width-test' onClick={() => signUpClicked()}>Sign Up</button>
      <div>
      <button className='purple text-white sans-serif rounded-border h-15 width-test' onClick={() => logInClicked()}>Log In</button>
      </div>
      <div>
        <button className='black text-white sans-serif rounded-border h-15 width-test border border-white' onClick={() => guest()}>Sign In As Guest</button>
      </div>
      </>
      );
    }
  }

  function logInClicked(e) {
    window.location.assign('/#log-in');

  }

  function signUpClicked(e) {
    window.location.assign('/#sign-up');

  }

  function guest(e) {
    window.location.assign('/#musician/mus-location');

  }

  return (
    <div className='text-center'>
      <h1>Meetsician</h1>
    {
      renderHomeContent()
    }

    </div>
  );
}
