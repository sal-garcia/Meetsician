import React from 'react';

function MusiciansAccounts() {

  return (

  <div className='d-flex justify-content-center align-items-center flex-column'>
    <div className='w-25 beige'>

      <div className="w-1 h-50 beige d-flex align-items-center justify-content-center">
        <i className="fa-solid text-dark fa-8x fa-guitar"></i>

      </div>
      <div className='w-100 text-dark'>
        <h3>name</h3>
        <h3>instrument</h3>
        <p><strong>About me:</strong> paragraph about the muscian network test more testing
        even some lorem ipusm just to test whwat happens when the users makes a long about me
        paragraph</p>
      </div>

    </div>
      <h2>0</h2>
      <div className='d-flex justify-content-around w-25'>
        <button>like</button>
        <button>save</button>
        <button>dislike</button>
      </div>

  </div >
  );
}

export default MusiciansAccounts;
