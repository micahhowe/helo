import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <div className="Nav">
    <Link>
        <button>Home</button>
    </Link>
    <Link>
        <button>New Post</button>
    </Link>
    <Link>
        <button>Logout</button>
    </Link>
      </div>
    )
  }
}