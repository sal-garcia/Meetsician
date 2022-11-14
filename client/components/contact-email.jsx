import React from 'react';
function ContactEmail(props) {

  return (
    <div>
      <a href={`mailto:${props.email}`}><button>contact</button></a>
      {/* <form action={`https://formsubmit.co/${props.email}`} method="POST">
        <input type="text" name="name" required></input>
        <input type="email" name="email" required></input>
        <button type="submit">Send</button>
    </form> */}
    </div>
  );
}

export default ContactEmail;
