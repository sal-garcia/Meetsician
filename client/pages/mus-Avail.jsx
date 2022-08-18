import React from 'react';

class MusAvail extends React.Component {
  constructor() {
    super();
    this.state = {
      Guitar: { amount: 0 },
      Drums: { amount: 0 },
      Bass: { amount: 0 },
      Vocals: { amount: 0 }

    };
    // this.onLoad = this.onLoad.bind(this);

  }

  componentDidMount() {
    const blah = 'usa';
    const blah2 = 'ca';
    const blah3 = 'la';

    fetch(`/api/users?country=${blah}&state=${blah2}&city=${blah3}`);
  }

  musicianSelection(e) {
    // if (instrument === 'Guitar') {
    //   return 'something';
    // }
  }

  render() {
    return (
<>

<div className='text-center flex-column'>
  <h1>These are the musicians in your area</h1>
</div>
        <div className='row justify-content-around align-content-around h-75'>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
       <h1>0</h1>
    </div>
    <div className='w-75 h-50 beige d-flex align-items-center justify-content-center'>
              <i className="fa-solid text-dark fa-8x fa-guitar"></i>
    </div>
    <div>
      <button className='purple text-light rounded-border'>select</button>
    </div>
  </div>

    <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
       <h1>0</h1>
    </div>
    <div className='w-75 h-50 beige d-flex align-items-center justify-content-center'>
              <i className="fa-solid text-dark fa-8x fa-microphone"></i>
    </div>
    <div>
      <button className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
      <h1>0</h1>
    </div>
    <div className='w-75 h-50 beige d-flex align-items-center justify-content-center'>
      <i className="fa-solid text-dark fa-8x fa-drum"></i>
    </div>
    <div>
      <button className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
       <h1>0</h1>
    </div>
    <div className='w-75 h-50 beige d-flex align-items-center justify-content-center'>
              <i className="fa-solid text-dark fa-8x fa-guitar"></i>

    </div>
    <div>
      <button className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  </div>
      </>

    );
  }
}

export default MusAvail;
