import React from 'react';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'name',
      instrument: 'test',
      location: 'usa,state,city',
      errorLocation: false,
      about: 'test',
      password: 'password',
      email: 'fakemail1@gmail.com',
      photoUrl: 'test'
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeInstrument(e) {
    this.setState({ instrument: e.target.value });
  }

  onChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  onChangeAbout(e) {
    this.setState({ about: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const locationSplit = this.state.location.split(',');
    if (locationSplit.length !== 3) {
      this.setState({ errorLocation: true });
      return;
    }
    this.setState({ errorLocation: false });
    fetch('/api/user_create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        instrument: this.state.instrument,
        country: locationSplit[0],
        state: locationSplit[1],
        city: locationSplit[2],
        about: this.state.about,
        email: this.state.email,
        hashedPassword: this.state.password,
        photoUrl: this.state.photoUrl
      })
    });
  }

  render() {

    return (
      <div className='d-flex justify-content-center align-items-center text-center h-75'>
        <div className='flex-column w-25 justify-content-evenly h-75'>

          <h1>Create an Account</h1>

          <form className='flex-column d-flex justify-content-evenly h-100' action="/user_create" method="POST" onSubmit={this.onSubmit}>

            <input className='rounded-border h-15' type="text" placeholder='name' required value={this.state.name} onChange={this.onChangeName}/>

            <input className='rounded-border h-15' type="text" placeholder='instrument' required/>

            <input className='rounded-border h-15' type="text" placeholder='country, state, city' required value={this.state.location} onChange={this.onChangeLocation}/>
              {this.state.errorLocation && <p className='text-danger'>error , needed after each location</p>}
            <textarea name="user-info" className='rounded-border h-25' maxLength="200" placeholder='about' required></textarea>

            <input className='rounded-border h-15' type="password" placeholder='password' required/>

            <input className='rounded-border h-15' type="email" placeholder='email' required/>

            <button className='purple text-white sans-serif rounded-border h-15' type="submit">LOG IN</button>

          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
