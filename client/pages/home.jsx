import React from 'react';

export default function Home(props) {

  function logInClicked(e) {
    window.location.assign('/#log-in');

  }

  function signUpClicked(e) {
    window.location.assign('/#sign-up');

  }

  return (
    <div className='text-center'>
      <h1>Meetsician</h1>
      <button className='violet text-white sans-serif rounded-border h-15 w-15' onClick={() => signUpClicked()}>SIGN UP</button>
      <div>
      <button className='purple text-white sans-serif rounded-border h-15 w-15' onClick={() => logInClicked()}>LOG IN</button>
      </div>

    </div>
  );
}
