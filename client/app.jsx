import React from 'react';
import { parseRoute } from './lib';
import Home from './pages/home';
import LogIn from './pages/log-in';
import Menu from './pages/menu';
import MusAvail from './pages/mus-Avail';
import MusLocation from './pages/mus-location';
import Nav from './components/nav';
import NotFound from './pages/not-found';
import SignUp from './pages/sign-up';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: parseRoute(location.hash),
      musicians: {
        guitar: 0,
        bass: 0,
        drums: 0,
        vocal: 0
      }
    };
    this.updateMusician = this.updateMusician.bind(this);
  }

  updateMusician(newLocation) {
    this.setState({ musicians: newLocation });
    // console.log('app muscians', this.state.musicians);
  }

  componentDidMount() { // updates the url hash
    window.addEventListener('hashchange', () => {
      const updatedroute = parseRoute(location.hash);
      this.setState({ route: updatedroute });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'home') {
      return <Home />;
    }
    if (route.path === 'log-in') {
      return <LogIn />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'menu') {
      return <Menu />;
    }
    if (route.path === 'mus-location') {
      return <MusLocation updateMusician={this.updateMusician} />;// passing method to muslocation so that muslocation can update number of musicians
    }
    if (route.path === 'mus-available') {
      return <MusAvail musicians={this.state.musicians} />;// passing the values from the state of muslocation
    }
    if (route.path === 'login') {
      return <LogIn />;
    }

    return <NotFound />;
  }

  render() {
    // console.log('app state:', this.state);
    return ( // nav component is inserted here so that it  appears in every other component
      <div className='container-fluid black vh-100 text-white'>
        <Nav />
        {this.renderPage()}
      </div>
    );
  }
}
