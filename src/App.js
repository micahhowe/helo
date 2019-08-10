import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import routes from './routes'
import { withRouter } from 'react-router-dom'


class App extends Component {
  
  render(){
    return (
      <div className="App">
        {/* This line stops nav from showing up on the login page (Auth) */}
        {this.props.location.pathname === "/" ? null : <Nav />}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
