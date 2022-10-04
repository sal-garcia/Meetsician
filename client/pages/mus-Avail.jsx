import React from 'react';

class MusAvail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Guitar: props.musicians.guitar,
      Drums: props.musicians.drums,
      Bass: props.musicians.bass,
      Vocals: props.musicians.vocal

    };

  }

  render() {
    return (
<div>

<div className='text-center flex-column'>
  <h1>These are the musicians in your area</h1>
</div>

        <div className='row justify-content-around align-content-around h-75 black'>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
       <h1>{this.state.Guitar}</h1>
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
              <h1>{this.state.Vocals}</h1>
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
              <h1>{this.state.Drums}</h1>
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
              <h1>{this.state.Bass}</h1>
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
