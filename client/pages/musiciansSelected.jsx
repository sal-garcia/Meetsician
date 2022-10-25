import React, { useContext, useEffect } from 'react';
import { UserContext } from '../lib/MainContext';
import MusiciansAccounts from '../components/musicians-account';

function MusiciansSelected() {
  const context = useContext(UserContext);
  // console.log(context, 'context');
  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    const instrument = params.get('instrument');
    // console.log(params, 'params');
    // console.log(window.location, 'window');
    fetch(`/api/musiciantypes?instrument=${instrument}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
      });

  }, []);
  return (
    <div>
      <pre className='purple'>{JSON.stringify(context)}</pre>
      <MusiciansAccounts />
    </div>
  );
}
export default MusiciansSelected;
