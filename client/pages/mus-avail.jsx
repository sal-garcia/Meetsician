import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/MainContext';
import TypesOfMusicians from '../components/typesOfMusicians';
function MusAvail() {
  const context = useContext(UserContext);

  const [queryParams, setQueryParams] = useState('');

  function countOfIntruments(arrayData) {
    const instruments = {
      guitar: [],
      bass: [],
      drums: [],
      vocals: []
    };
    for (const element of arrayData) {
      const instrument = element.instrument;

      instruments[instrument].push(element);
    } return instruments;
  }

  useEffect(() => { // renders each time the componenet changes
    const params = (window.location);
    const queryParamsMatch = params.hash.match(/\?(.*)$/);
    queryParamsMatch ? setQueryParams(queryParamsMatch[1]) : setQueryParams('');

    if (!context.musicians) {

      if (queryParamsMatch) {
        fetch(`/api/users?${queryParamsMatch[1]}`)
          .then(response => response.json())
          .then(result => context.updateMusician(countOfIntruments(result)));
      }
    }
  }, []);

  const musicianSelect = instrument => {
    window.location.assign(`/#musician/mus-selected?instrument=${instrument}&${queryParams}`);
  };

  return (

          <div>

<div className='text-center flex-column'>
  <h1>These are the musicians in your area</h1>
</div>

  <div className='row justify-content-around align-content-around h-75 black'>
        {
        context.musicians &&
        <>
   <TypesOfMusicians instrumentCount={context.musicians.guitar.length} musicianSelect={musicianSelect} instrumentIcon="guitar" instrumentName="guitar"/>
   <TypesOfMusicians instrumentCount={context.musicians.vocals.length} musicianSelect={musicianSelect} instrumentIcon="microphone" instrumentName="vocals" />
   <TypesOfMusicians instrumentCount={context.musicians.drums.length} musicianSelect={musicianSelect} instrumentIcon="drum" instrumentName="drums"/>
   <TypesOfMusicians instrumentCount={context.musicians.bass.length} musicianSelect={musicianSelect} instrumentIcon="guitar" instrumentName="bass" />

        </>

  }

  </div>
  </div>

  );

}

export default MusAvail;
