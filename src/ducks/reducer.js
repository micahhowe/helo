// INITIAL STATE
const initialState = {
    username: '',
    email: '',
    // user_id: 0,
    post: ''
  }
  
  // ACTION CONSTANTS
  const SET_USER = 'SET_USER'
  const LOGOUT_USER = 'LOGOUT_USER'
  const ADD_POST = 'ADD_POST'
  
  // ACTION BUILDERS
  export function setUser(user) {
    return {
      type: SET_USER,
      payload: user
    }
  }
  export function logoutUser() {
    return {
      type: LOGOUT_USER
    }
  }
  export function addPost(){
      return {
        type: ADD_POST,
      }
  }
  
  // REDUCER
  export default (state=initialState, action) => {
    const {type, payload} = action
    switch (type) {
      case LOGOUT_USER:
        return initialState
      case SET_USER: 
        const {username, email} = payload
        return {...state, username, email}
      case ADD_POST:
          const{post_title,post_image, post_content} = payload
          return{...state, post_title,post_image, post_content }
      default: return state
    }
  }