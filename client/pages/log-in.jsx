import React from 'react';

class LogIn extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    window.location.assign('/#musician/mus-location');
  }

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center text-center h-75'>
        <div className='flex-column w-25 justify-content-evenly h-75'>

          <h1>Log in</h1>

          <form className='flex-column d-flex justify-content-evenly h-75' onSubmit={this.onSubmit} action="">

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
