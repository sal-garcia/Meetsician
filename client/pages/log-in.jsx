import React from 'react';
import { AuthContext } from '../lib/MainContext';

class LogIn extends React.Component {

  constructor() {
    super();
    this.state = {

      password: '',
      email: ''

    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // console.log(this.context.user, 'login');
    if (this.context.user) {

      window.location.assign('/#musician/mus-location');
      // this.AuthProvider.setState({ logInUrl: 'Log In' });
      // console.log(this.state);
    } else {
      //
      // console.log(this.state);
    }
  }

  componentDidUpdate() {
    if (this.context.user) {
      window.location.assign('/#musician/mus-location');
    }
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errorLocation: false });
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          password: '',
          email: ''
        });
        if (data.error) {
          alert(data.error);
        } else {
          this.context.updateUser(data.user);
          window.location.assign('/#musician/mus-location');
        }
      });

  }

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center text-center h-75'>
        <div className='flex-column w-25 justify-content-evenly h-75'>

          <h1>Log in</h1>

          <form className='flex-column d-flex justify-content-evenly h-75' onSubmit={this.onSubmit} action="/api/auth/sign-in" method="POST">

            <input className='rounded-border h-15' type="email" onChange={this.onChangeEmail} placeholder="email" required />

            <input className='rounded-border h-15' type="password" onChange={this.onChangePassword} placeholder="password" required/>

            <button className='purple text-white sans-serif rounded-border h-15' type="submit">LOG IN</button>

          </form>
        </div>
      </div>

    );
  }
}

LogIn.contextType = AuthContext;

export default LogIn;
