import React from 'react';
function TypesOfMusicians(props) {
  return (

    <div className='d-flex flex-column justify-content-around mt-5 text-center h-75 w-15 align-items-center'>
      <div>
        <h1>{props.instrumentCount}</h1>
      </div>
      <div className='w-180px h-50 beige d-flex align-items-center justify-content-center'>
        <i className={`fa-solid text-dark fa-8x fa-${props.instrumentIcon}`}></i>
      </div>
      <div>
        <button onClick={() => props.musicianSelect(props.instrumentName)} className='purple text-light rounded-border'>select</button>
      </div>
    </div>
  );
}

export default TypesOfMusicians;
