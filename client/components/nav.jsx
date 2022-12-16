import React, { useContext } from 'react';
import { AuthContext } from '../lib/MainContext';

function Nav() {
  const authContext = useContext(AuthContext);

  const handleLogOut = async event => {
    event.preventDefault();
    const logOutResponse = await fetch('/auth/sign-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await logOutResponse.json();
    authContext.updateUser(null);
    window.location.assign('/#log-in');
    return false;// returning false to overide default click behavior on link
  };

  const renderLoginButton = () => {
    if (authContext.user) {
      return (
        <a className='nav-link link-light' href='#' onClick={handleLogOut}>Log out</a>

      );
    } else {
      return (
        <a className='nav-link link-light' href="#log-in">Log in</a>
      );
    }
  };

  return (

    <ul className='nav'>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#sign-up">Sign Up</a>
      </li>
      <li className='nav-item'>
        {renderLoginButton()}
      </li>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#home">Home</a>
      </li>
    </ul>

  );
}

export default Nav;
