import React from 'react';

class MusLocation extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     CA: false,
  //     USA: false,
  //     MEX: false
  //   };
  // }

  loginClicked(e) {
    window.location.assign('/#mus-available');
  }

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center text-center h-75'>
        <div className='flex-column w-25 justify-content-evenly h-75'>

          <h1>Where are you looking for musicians?</h1>

          <form className='flex-column d-flex justify-content-evenly h-75' onSubmit={this.onSubmit} action="">

            <select className='rounded-border h-15' type="email" name='countries' required>
              <option value="" disabled selected>Select Country</option>
              <option value="USA">USA</option>

            </select>

            <select className='rounded-border h-15' type="email" name='countries' required>
              <option value="" disabled selected>Select State</option>
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

            <input className='rounded-border h-15' type="text" placeholder='City full name, Ex: Los Angeles' required/>

            <button className='purple text-white sans-serif rounded-border h-15' type="submit" onClick={this.loginClicked}>LOG IN</button>

          </form>
        </div>
      </div>
    );
  }
}

export default MusLocation;
