import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import Post from '../Post/Post.js'
import axios from 'axios'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
            
        this.state = {
            searchValue: '',
            postsToggle: true,
            postList: []
          };
          //I can't get the toggle checkbox to work correctly skipping for now
          this.handleToggle = this.handleToggle.bind(this)
        }
    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }
    handleToggle(){
        this.setState({
            postsToggle: true ? false : true
        })
    }
    findPosts = () => {
        axios.get(`/api/posts?post_title=${this.state.searchValue}`).then(postList =>
            this.setState({
                postList: postList.data
            }))
    }
    // componentDidMount() {
    //     this.findPosts()
    // }
  render() {
      console.log(this.state.postsToggle)
    return (
      <div className="Dashboard">
        Dashboard
        <input onChange={e => this.handleChange(e)} type="text" placeholder="Search"/>
        <button onClick={this.findPosts}>Search</button>
        <button>Reset</button>
        <h3>My Posts</h3>
        <input type="checkbox" onClick={() => this.handleToggle} />
        <div className="postList">
                    {this.state.postList.map(el => (
                        <div className="individualPosts">
                        <Post 
                        key={el.id}
                        />    
                        </div>
                        ))}
                </div>
      </div>
    )
  }
}