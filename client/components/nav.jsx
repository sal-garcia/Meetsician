import React from 'react';
// import { AuthContext, AuthProvider } from '../lib/MainContext';

function Nav() {
  return (
    // <AuthConsumer>
    //   {logInUrl => (
    <ul className='nav'>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#sign-up">Sign Up</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#log-in">log</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#home">Home</a>
      </li>
    </ul>
  // )

  // }
  // </AuthConsumer>
  );
}

export default Nav;
