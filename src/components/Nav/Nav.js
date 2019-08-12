import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { logoutUser } from '../../ducks/reducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class Nav extends Component {
    logout = () => {
        axios.get('/auth/logout').then(() => {
          this.props.logoutUser()
          // This is what takes the user back to the dashboard upon logout
          this.props.history.push('/')
        })
      }
  render() {
      console.log(this.props)
      return (
      <div className="Nav">
          {this.props.username ? (
          <>
          <img src={`https://robohash.org/${this.props.username}`} alt="user profile pic"/>
          <h3>Welcome, {this.props.username}</h3>
          </>
          ) : null}
    <Link to='/dashboard'>
        <button>Home</button>
    </Link>
    <Link to="/new">
        {/* This link will probably need to be dynamic but idk how that is supposed to work yet */}
        <button>New Post</button>
    </Link>
    <Link to="/">
        <button onClick={this.logout}>Logout</button>
    </Link>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
    const { username } = reduxState
    return { username }
  }

export default connect(
    mapStateToProps,
    { logoutUser }
  )(withRouter(Nav))