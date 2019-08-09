import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <div className="Nav">
    <Link to='/dashboard'>
        <button>Home</button>
    </Link>
    <Link to="/post/1">
        {/* This link will probably need to be dynamic but idk how that is supposed to work yet */}
        <button>New Post</button>
    </Link>
    <Link to="/Auth">
        <button>Logout</button>
    </Link>
      </div>
    )
  }
}