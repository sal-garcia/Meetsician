import React from 'react';
function ContactEmail(props) {

  return (
    <div>
      <a href={`mailto:${props.email}`}><button className="violet text-light">Send email</button></a>

    </div>
  );
}

export default ContactEmail;
