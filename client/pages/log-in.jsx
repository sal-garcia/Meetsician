import React from 'react';

class LogIn extends React.Component {
  render() {
    return (
      <div className='$black flex-column'>
        <div className='text-center'>
          <h1>log in</h1>
          <form action="">
            <input type="email" />
            <input type="password" />
          </form>
        </div>
        <a href="#">Return Home</a>
      </div>
    );
  }
}

export default LogIn;// why wont {logIn} work
