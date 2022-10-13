import React from 'react';

function Nav() {
  return (
    <ul className='nav'>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#sign-up">Sign Up</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#log-in">Log In</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link link-light' href="#home">Home</a>
      </li>
    </ul>
  );
}

export default Nav;
