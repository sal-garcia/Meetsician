import React from 'react';

class LogIn extends React.Component {
  render() {
    return (
      <div className='d-flex justify-content-center text-center h-75'>
        <div className='flex-column w-25 justify-content-evenly h-75'>

          <h1>Log in</h1>

          <form className='flex-column d-flex justify-content-evenly h-75' action="">

            <input className='rounded-border h-15' type="email" />

            <input className='rounded-border h-15' type="password" />

            <button className='purple text-white sans-serif rounded-border h-15' type="submit">LOG IN</button>

          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
