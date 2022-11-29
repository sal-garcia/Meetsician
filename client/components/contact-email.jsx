import React from 'react';
function ContactEmail(props) {

  return (
    <div>
      <a href={`mailto:${props.email}`}><button>contact</button></a>

    </div>
  );
}

export default ContactEmail;
