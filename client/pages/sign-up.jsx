import React from 'react';
import { AuthContext } from '../lib/MainContext';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      instrument: '',
      country: '',
      state: '',
      city: '',
      about: '',
      password: '',
      email: '',
      photoUrl: '',
      likes: 1,
      saved: false

    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeInstrument = this.onChangeInstrument.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeAbout = this.onChangeAbout.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeInstrument(e) {
    this.setState({ instrument: e.target.value });
  }

  onChangeCountry(e) {
    this.setState({ country: e.target.value });
  }

  onChangeState(e) {
    this.setState({ state: e.target.value });
  }

  onChangeCity(e) {
    this.setState({ city: e.target.value.toLowerCase() });
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

  componentDidUpdate() {
    if (this.context.user) {
      window.location.assign('/#musician/mus-location');
    }
  }

  componentDidMount() {

    if (this.context.user) {

      window.location.assign('/#musician/mus-location');

    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errorLocation: false });
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        instrument: this.state.instrument,
        country: this.state.country,
        state: this.state.state,
        city: this.state.city,
        about: this.state.about,
        email: this.state.email,
        password: this.state.password,
        photoUrl: this.state.photoUrl,
        likes: this.state.likes,
        saved: this.state.saved

      })
    })
      .then(res => res.json())
      .then(data => this.setState({
        name: '',
        instrument: '',
        country: '',
        state: '',
        city: '',
        about: '',
        password: '',
        email: '',
        photoUrl: '',
        likes: 1,
        saved: false

      }));

    window.location.assign('/#login');
  }

  render() {

    return (
      <div className='d-flex justify-content-center align-items-center text-center h-75'>
        <div className='flex-column width-test justify-content-evenly h-75'>

          <h1>Create an Account</h1>

          <form className='flex-column d-flex justify-content-evenly h-100' action="/api/auth/sign-up" method="POST" onSubmit={this.onSubmit}>

            <input className='rounded-border h-15' type="text" placeholder='name' required value={this.state.name} onChange={this.onChangeName}/>

            <span className='d-flex'>
              <select className='rounded-borders w-100' name="instruments" value={this.state.instrument || 'instruments'} required onChange={this.onChangeInstrument}>
              <option value="instruments" disabled hidden>instrument</option>
              <option value="guitar">guitar</option>
              <option value="drums">drums</option>
              <option value="bass">bass</option>
              <option value="vocals">vocals</option>
              </select>
            </span>

            <span className='d-flex'>
              <select className='rounded-border w-33' name='countries' required value={this.state.country || 'country'} onChange={this.onChangeCountry}>
                <option value="country" disabled hidden>Country</option>
                <option value="USA">USA</option>
              </select>
              <select className='rounded-border w-33' name='states' required value={this.state.state || 'state'} onChange={this.onChangeState}>
              <option value="state" disabled hidden>State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <input type="text" className='w-33 rounded-border' placeholder='City Full Name' onChange={this.onChangeCity}/>
            </span>

            <textarea name="user-info" className='rounded-border h-25' maxLength="200" placeholder='about' required value={this.state.about} onChange={this.onChangeAbout}></textarea>

            <input className='rounded-border h-15' type="password" placeholder='password' required value={this.state.password} onChange={this.onChangePassword}/>

            <input className='rounded-border h-15' type="email" placeholder='email' required value={this.state.email} onChange={this.onChangeEmail}/>

            <button className='purple text-white sans-serif rounded-border h-15' type="submit" onSubmit={this.onSubmit}>SIGN UP</button>

          </form>
        </div>
      </div>
    );
  }
}

SignUp.contextType = AuthContext;

export default SignUp;
