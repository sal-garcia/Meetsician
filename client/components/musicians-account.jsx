import React, { useState, useContext } from 'react';
import { AuthContext } from '../lib/MainContext';
import ContactEmail from './contact-email';

function MusiciansAccounts(props) {
  const authContext = useContext(AuthContext);
  const [showContactEmail, setShowContactEmail] = useState(false);

  const ContactButton = param => {

    setShowContactEmail(true);

  };

  const likeButton = () => {
    const newLikes = props.likes + 1;
    if (!authContext.user) {
      alert('must be logged in');
      return;
    }
    fetch(`/user/${authContext.user.user_id}/likes/${props.user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
          return;
        }
        props.updateAccount(props.index, { num_likes: newLikes });
        props.setLikes(newLikes);
      })
      .catch(err => {
        console.error('error:', err);
      });

  };

  const dislikeButton = () => {
    const newLikes = props.likes - 1;

    if (!authContext.user) {
      alert('must be logged in');
      return;
    }
    fetch(`/user/${authContext.user.user_id}/dislikes/${props.user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
          return;
        }
        props.updateAccount(props.index, { num_likes: newLikes });
        props.setLikes(newLikes);
      })

      .catch(err => {
        console.error('error:', err);
      });

  };

  const savedButton = () => {
    const newSaved = !props.saved;

    fetch('/api/userSaved', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: props.name,
        email: props.email,
        saved: newSaved

      })
    })
      .then(res => res.json())
      .then(data => {

        props.updateAccount(props.index, { saved: newSaved });

      })
      .catch(err => {
        console.error('error:', err);
      });
  };

  return (

  <>

  <div className='d-flex align-items-center flex-column mb-5 m-account'>
    <div className='beige w-25 phone-account'>
      <div className="h-50 beige d-flex align-items-center justify-content-center">
        <i className="fa-solid text-dark fa-8x fa-guitar"></i>
      </div>
        <div className=' text-dark badge badge-primary text-wrap w-100'>
        <h4 className='overflow-auto'>name: {props.name}</h4>
        <h4 className='overflow-auto'>instrument: {props.instrumentName}</h4>
        <h4 className='overflow-auto'>contact me: {props.email}</h4>
        <p className='overflow-auto margin mb-2 text-wrap'><strong>About me:</strong> {props.about}</p>
      </div>
    </div>
      <h2>{props.likes}</h2>
      <div className='d-flex justify-content-around w-25 p-button'>
          <button className='purple text-light w-50 rounded-border' onClick={likeButton}>like</button>
          <button className='purple text-light w-50 rounded-border' onClick={savedButton}>{props.saved ? 'unsave' : 'save'}</button>
          <button className='purple text-light w-50 rounded-border' onClick={dislikeButton}>dislike</button>
      </div>
      <div className='d-flex justify-content-end w-50 align-items-end'>
        <button className='w-25 violet text-light p-button' onClick={ContactButton}>contact</button>
      </div>
      <div>
        {showContactEmail &&
        <ContactEmail email={props.email}/>
        }

      </div>

  </div >

    </>

  );
}

export default MusiciansAccounts;
