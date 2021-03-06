import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import Post from '../Post/Post.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../ducks/reducer'


class Dashboard extends Component {
    constructor(props) {
        super(props)
            
        this.state = {
            searchValue: '',
            postsToggle: true,
            postList: []
          };
          this.handleToggle = this.handleToggle.bind(this)
        }
    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }
    handleToggle = () => {
        this.setState({
            postsToggle: !this.state.postsToggle
        })
    }
    findPosts = () => {
        axios.get(`/api/posts?post_title=${this.state.searchValue}`).then(postList =>
            this.setState({
                postList: postList.data
            }))
    }
    loadPosts = () => {
        axios.get(`/api/posts?post_title=${this.state.searchValue}`).then(postList => 
            this.setState({
                postList: postList.data
            }))
    }
    componentDidMount() {
        this.loadPosts()
        this.checkSession()
    }
    checkSession(){
        axios.get(`/api/auth/me`).then(res => 
            this.props.setUser( res.data.user )
            )}
  render() {
    //console.log(this.state.searchValue)
    return (
      <div className="Dashboard">
        <div className="dashboard-header"><input onChange={e => this.handleChange(e)} type="text" placeholder="Search"/>
        <button onClick={this.loadPosts}>Search</button>
        <button>Reset</button>
        <h3>Hide My Posts</h3>
        <input type="checkbox" onClick={this.handleToggle} /></div>
        <div className="postList">
                    {this.state.postsToggle === true ? (this.state.postList.map((el, i) => (
                        <div>
                        <Post
                        key={el.user_id}
                        title={el.post_title}
                        image={el.post_image}
                        content={el.post_content}
                        profile_pic={el.profile_pic}
                        />    
                        </div>
                    ))): (this.state.postList.filter(el => ( el.username !== this.props.username)).map((el, i) => (
                        <div>
                        <Post
                        key={el.user_id}
                        title={el.post_title}
                        image={el.post_image}
                        content={el.post_content}
                        profile_pic={el.profile_pic}
                        />    
                        </div>
                    ))) }
                </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
    const { user_id, username } = reduxState
    return { user_id, username}
  }

  export default connect(
    mapStateToProps,
    {  setUser  }
  )(Dashboard)