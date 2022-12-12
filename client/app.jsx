import React from 'react';
import { parseRoute } from './lib';
import Home from './pages/home';
import LogIn from './pages/log-in';
import MusAvail from './pages/mus-avail';
import MusLocation from './pages/mus-location';
import MusiciansSelected from './pages/mus-selected';
import Nav from './components/nav';
import NotFound from './pages/not-found';
import SignUp from './pages/sign-up';
import { UserProvider, AuthProvider } from './lib/MainContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: parseRoute(location.hash),
      musicians: null,
      user: null
    };
    this.updateMusician = this.updateMusician.bind(this);
    this.updateUser = this.updateUser.bind(this);

  }

  updateUser(newUser) {
    this.setState({ user: newUser });
  }

  updateMusician(newLocation) {
    this.setState({ musicians: newLocation });

  }

  componentDidMount() { // updates the url hash
    window.addEventListener('hashchange', () => {
      const updatedroute = parseRoute(location.hash);
      this.setState({ route: updatedroute });
    });
    fetch('/auth/check')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.updateUser(data.user);
      });
  }

  renderMusicianPages() {
    const { route } = this.state; // destructuring

    if (route.path === 'musician/mus-location') {
      return <MusLocation />;// passing method to muslocation so that muslocation can update number of musicians
    }
    if (route.path === 'musician/mus-available') {
      return <MusAvail />;// passing the values from the state of muslocation
    }
    if (route.path === 'musician/mus-selected') {
      return <MusiciansSelected />;
    }

  }

  renderAppPages() {
    const { route } = this.state; // destructuring
    if (route.path === 'home') {
      return <Home />;
    }
    if (route.path === 'log-in') {
      return <LogIn />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'login') {
      return <LogIn />;
    }
    return <NotFound />;
  }

  render() {

    return ( // nav component is inserted here so that it  appears in every other component
      <AuthProvider value={{
        user: this.state.user,
        updateUser: this.updateUser
      }}

      >
        <div className='container-fluid black text-white'>
          <Nav />
          {this.state.route.path.startsWith('musician')
            ? <UserProvider value={{
              musicians: this.state.musicians,
              updateMusician: this.updateMusician

            }}>
              {this.renderMusicianPages()}
            </UserProvider>
            : <div>
              {this.renderAppPages()}
            </div>
          }

        </div>
      </AuthProvider>
    );
  }
}
