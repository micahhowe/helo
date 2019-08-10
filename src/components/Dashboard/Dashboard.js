import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import Post from '../Post/Post.js'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
            
        this.state = {
            searchValue: '',
            PostsToggle: true,
            postList: ['how', 'now', 'brown', 'cow']
          }
        }
    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }
  render() {
      console.log(this.state.searchValue)
    return (
      <div className="Dashboard">
        Dashboard
        <input onChange={e => this.handleChange(e)} type="text" placeholder="Search"/>
        <button>Search</button>
        <button>Reset</button>
        <h3>My Posts</h3>
        <input type="checkbox" />
        <div className="postList">
                    {this.state.postList.map(el => (
                        <div className="individualPosts">
                        <Post />    
                        </div>
                        ))}
                </div>
      </div>
    )
  }
}