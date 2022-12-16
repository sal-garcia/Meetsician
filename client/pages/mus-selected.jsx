import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/MainContext';
import MusiciansAccounts from '../components/musicians-account';

function MusiciansSelected() {

  const context = useContext(UserContext);
  const [instrument, setInstrument] = useState('');
  const [foundMusicians, setFoundMusicians] = useState([]);/* eslint-disable */
  const [likes, setLikes] = useState(0);

  useEffect(() => {

    const params = (window.location);
    const queryParamsMatch = params.hash.match(/\?(.*)$/);

    const paramInstrument = params.hash.match(/\?instrument=(.*?)&/)[1];
    setInstrument(paramInstrument);

    if (context.musicians) {
      setFoundMusicians(context.musicians[paramInstrument]);
    }

    if (!context.musicians) {
      fetch(`/api/musiciantypes?${queryParamsMatch[1]}`)
        .then(response => response.json())
        .then(data => {
          setFoundMusicians(data);

        });
    }

  }, []);

  function updateAccount(index, newData) {
    const updatedMusician = { ...foundMusicians[index], ...newData };
    if (index === 0) {
      setFoundMusicians([updatedMusician, ...foundMusicians.slice(1)]);
    } else {
      setFoundMusicians([...foundMusicians.slice(0, index), updatedMusician, ...foundMusicians.slice(index + 1)]);
    }

  }
  const renderAccounts = () => {

    const accounts = foundMusicians;
    if (accounts.length < 1) {
      return (
        <div className='text-center'>
          <h1>No musician found</h1>
        </div>
      );
    }
    return accounts.map((user, index) => {
      return <MusiciansAccounts key = {`${user.user_id}`} updateAccount={updateAccount} index={index} instrumentName={instrument} {...user} likes={user.num_likes} email={user.email} setLikes={setLikes}/>;
    });
  };

  return (
    <div className='black m-0'>
      {
        instrument &&
        renderAccounts()
      }

    </div>
  );
}
export default MusiciansSelected;
