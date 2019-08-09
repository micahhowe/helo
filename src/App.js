import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Post from './components/Post/Post'
import routes from './routes'

function App() {
  return (
    <div className="App">
      <Nav />
      <Post />
      {routes}
    </div>
  );
}

export default App;
