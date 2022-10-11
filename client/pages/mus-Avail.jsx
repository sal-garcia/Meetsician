import React from 'react';
import { UserConsumer } from '../lib/MainContext';
import TypesOfMusicians from '../components/typesOfMusicians';
class MusAvail extends React.Component {
  constructor(props) {
    super(props);
    this.musicianSelect = this.musicianSelect.bind(this);
  }

  musicianSelect(instrument) {
    window.location.assign(`/#musician/mus-selected?instrument=${instrument}`);
  }

  render() {
    return (
    <UserConsumer>
      {
        user => (
          <div>

<div className='text-center flex-column'>
  <h1>These are the musicians in your area</h1>
</div>

  <div className='row justify-content-around align-content-around h-75 black'>

              <TypesOfMusicians instrument={user.musicians.guitar} musicianSelect={this.musicianSelect} instrumentName="guitar" />
              <TypesOfMusicians instrument={user.musicians.vocals} musicianSelect={this.musicianSelect} instrumentName="microphone" />
              <TypesOfMusicians instrument={user.musicians.drums} musicianSelect={this.musicianSelect} instrumentName="drum" />
              <TypesOfMusicians instrument={user.musicians.bass} musicianSelect={this.musicianSelect} instrumentName="guitar" />

    {/* <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
              <h1>{user.musicians.vocals}</h1>
    </div>
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
              <i className="fa-solid text-dark fa-8x fa-microphone"></i>
    </div>
    <div>
      <button onClick={() => this.musicianSelect('vocals')} className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
              <h1>{user.musicians.drums}</h1>
    </div>
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
      <i className="fa-solid text-dark fa-8x fa-drum"></i>
    </div>
    <div>
      <button onClick={() => this.musicianSelect('drums')} className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
    <div>
              <h1>{user.musicians.bass}</h1>
    </div>
    <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
              <i className="fa-solid text-dark fa-8x fa-guitar"></i>

    </div>
    <div>
      <button onClick={() => this.musicianSelect('bass')} className='purple text-light rounded-border'>select</button>
    </div>
  </div>

  </div>

  </div> */}
  </div>
  </div>
        )
      }
    </UserConsumer>

    );
  }
}

export default MusAvail;
