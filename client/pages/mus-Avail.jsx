import React from 'react';

class MusAvail extends React.Component {
  constructor() {
    super();
    this.state = {
      Guitar: 0,
      Drums: 0,
      Bass: 0,
      Vocals: 0

    };
    // this.onLoad = this.onLoad.bind(this);

  }

  componentDidMount() {
    const blah = 'usa';
    const blah2 = 'ca';
    const blah3 = 'la';

    fetch(`/api/users?country=${blah}&state=${blah2}&city=${blah3}`);
  }

  // musicianSelection(e) {
  //   // if (country === ||state||city) {
  //   //   return 'something';
  //   // }
  // }

  render() {
    return (
<div>

<div className='text-center flex-column'>
  <h1>These are the musicians in your area</h1>
</div>

        <div className='row justify-content-around align-content-around h-75 black'>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
       <h1>0</h1>
    </div>
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
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
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
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
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
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
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
              <i className="fa-solid text-dark fa-8x fa-guitar"></i>

    </div>
    <div>
      <button className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  </div>

  </div>

    );
  }
}

export default MusAvail;
