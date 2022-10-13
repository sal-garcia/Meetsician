import React from 'react';
import { UserConsumer } from '../lib/MainContext';

class MusLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guitar: 0,
      bass: 0,
      drum: 0,
      vocal: 0,
      country: 'USA',
      state: 'AL',
      city: null
    };
    this.loginClicked = this.loginClicked.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.countOfIntruments = this.countOfIntruments.bind(this);
  }

  handleChangeCountry(e) {

    this.setState({ country: e.target.value });
  }

  handleChangeState(e) {

    this.setState({ state: e.target.value });
  }

  handleChangeCity(e) {

    this.setState({ city: e.target.value });
  }

  countOfIntruments(arrayData) {
    const instruments = {
      guitar: 0,
      bass: 0,
      drums: 0,
      vocals: 0
    };
    for (const element of arrayData) {
      const instrument = element.instrument;
      instruments[instrument] += 1;
    } return instruments;
  }

  loginClicked(updateMusician, e) {
    e.preventDefault();
    // console.log(this.props);

    // console.log(this.state.country);
    // console.log(this.state.state);
    // console.log(this.state.city);
    // console.log(this.state.guitar);

    fetch(`/api/users?country=${this.state.country}&state=${this.state.state}&city=${this.state.city}`)
      .then(response => response.json())
      .then(data => {
        // console.log('data', data);
        const instrumentCount = this.countOfIntruments(data);
        updateMusician(instrumentCount);
        // this.props.updateMusician(instrumentCount);
        // console.log(instrumentCount, 'instrument count');
        // console.log('test', this.state.musicians);
      });
    window.location.assign('/#musician/mus-available');
  }

  render() {
    return (
      <UserConsumer>
        { user => (

          <div className='d-flex justify-content-center align-items-center text-center h-75'>
            <div className='flex-column w-25 justify-content-evenly h-75'>

              <h1>Where are you looking for musicians?</h1>

              <form className='flex-column d-flex justify-content-evenly h-75' onSubmit={e => this.loginClicked(user.updateMusician, e)}>

                <select className='rounded-border h-15' type="email" name='countries' required onChange={this.handleChangeCountry}>
                  <option value="DEFAULT" disabled>Select Country</option>
                  <option value="usa">USA</option>

                </select>

                <select className='rounded-border h-15' type="email" name='countries' required onChange={this.handleChangeState}>
                  <option value="DEFAULT" disabled>Select State</option>
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

                <input className='rounded-border h-15' type="text" placeholder='City full name, Ex: Los Angeles' required onChange={this.handleChangeCity} />

                <button className='purple text-white sans-serif rounded-border h-15' type="submit">LOG IN</button>

              </form>
            </div>
          </div>
        )

        }
      </UserConsumer>
    );
  }
}

export default MusLocation;
