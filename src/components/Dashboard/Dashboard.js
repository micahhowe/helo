import React, { Component } from 'react'
//import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        Dashboard
        <input type="text"/>
        <button>Search</button>
        <button>Reset</button>
        <h3>My Posts</h3>
        <input type="checkbox" />
      </div>
    )
  }
}