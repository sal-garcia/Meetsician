import React from 'react';

class Menu extends React.Component {

  findMusician(e) {
    window.location.assign('/#musician/mus-location');
  }

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center text-center h-75'>
        <div className='flex-column w-25 justify-content-evenly h-75'>

          <h1>Home</h1>

          <div className='flex-column d-flex justify-content-evenly h-75' action="">

            <button className='purple text-white sans-serif rounded-border h-15' onClick={this.findMusician}>FIND MUSICIAN</button>

            <button className='purple text-white sans-serif rounded-border h-15'>MY MUSICIAN</button>

            <button className='purple text-white sans-serif rounded-border h-15'>MY ACCOUNT</button>

          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
