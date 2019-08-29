import React, { Component } from 'react'
//import {Link} from 'react-router-dom'



export default class Post extends Component {
  render() {
    return (
        <div className="Post">
        <div className="single-post">
            <div className="post-header">
                <h4>
                {this.props.title}
                </h4>
            <img className="post-profile-pic" src={`https://robohash.org/${this.props.username}`} alt='posters profile'/>
            </div>
            <div className="content">
            {this.props.image.length > 7 ? (
            <>
              <img style={{ maxHeight: 200 }} src={this.props.image} alt='' />
            </>
          ) : null}
            {/* <img className="post-image" src={this.props.image} alt='this post'/> */}
        <span>{this.props.content}</span></div>
    </div>
    </div>
    )
  }
}