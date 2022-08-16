import React from 'react';
import { parseRoute } from './lib';
// import Home from './pages/home';
import LogIn from './pages/log-in';
import MscnSearch from './pages/mscn-search';
import Nav from './components/nav';
import NotFound from './pages/not-found';
import SignUp from './pages/sign-up';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: parseRoute(location.hash)
    };
  }

  componentDidMount() { // updates the url hash
    window.addEventListener('hashchange', () => {
      const updatedroute = parseRoute(location.hash);
      this.setState({ route: updatedroute });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'musician-search') {
      return <MscnSearch />;
    }
    if (route.path === 'log-in') {
      return <LogIn />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
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
