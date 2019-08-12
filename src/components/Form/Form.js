import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'


class Form extends Component {
    state = {
        title: '',
        image: '',
        content:''
    }
    handleChange(e, key) {
        this.setState({
          [key]: e.target.value
        })
      }
      addPost = () => {
        const {title: post_title, image: post_image, content: post_content} = this.state
        axios.post('/api/posting', {post_title, post_image, post_content}).then(res => {
          //const {post_title,post_image,post_content} = res.data.post
          //this.props.addPost({post_title,post_image, post_content})
        })
        .catch(err => {
          alert('Sorry! Try Posting again.')
        })
      }
      componentDidMount() {
        this.checkSession()
    }
      checkSession(){
        axios.get(`/api/auth/me`).then(res => 
            this.props.setUser( res.data.user )
        )}
  render() {

    return (
      <div className="Form">
        
        <input 
        type="text" 
        onChange={e => this.handleChange(e, 'title')}
        placeholder="title"
        />
        
        <input type="text" 
        onChange={e => this.handleChange(e, 'image')}
        placeholder="image URL"
        />
        <img src={this.state.image} alt='' />
        
        <input type="text" 
        onChange={e => this.handleChange(e, 'content')}
        placeholder="content"
        />
        <Link to="/dashboard">
        <button onClick={() => this.addPost()}>Post</button>
        </Link>
      </div>
    )
  }
}
function mapStateToProps(reduxState) {
    const { user, username } = reduxState
    return { user, username}
  }

  export default connect(
    mapStateToProps,
    { setUser }
  )(Form)