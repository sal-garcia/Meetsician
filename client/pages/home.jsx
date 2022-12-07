import React from 'react';

export default function Home(props) {

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
      <button className='purple text-white sans-serif rounded-border h-15 w-15' onClick={() => signUpClicked()}>Sign Up</button>
      <div>
      <button className='purple text-white sans-serif rounded-border h-15 w-15' onClick={() => logInClicked()}>Log In</button>
      </div>
      <div>
        <button className='black text-white sans-serif rounded-border h-15 w-15 border border-white' onClick={() => guest()}>Sign In As Guest</button>
      </div>

    </div>
  );
}
