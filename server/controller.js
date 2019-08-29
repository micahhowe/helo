const bcrypt = require('bcryptjs')

module.exports = {
    findUser: async(req,res) => {
        const db = req.app.get('db')
        const {userQuery} = req.params
        const user = await db.find_email([email])
        if (user == userQuery) {
            return res.status(400).send({ message: 'User Exists' })
          }
          else{
            return res.status(400).send({ message: 'User Does Not Exist' })  
          }
    },
  register: async (req, res) => {
    const db = req.app.get('db')
    const { email, password, username } = req.body
    req.session.user_id = req.body.username
    //? not sure if i did the line above correctly
    const user = await db.find_email([email])
    if (user.length > 0) {
      return res.status(400).send({ message: 'Email in use.' })
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = await db.insert_user_info({ username, email })
    db.insert_hash({ hash, user_id: newUser[0].user_id })
      .then(() => {
        //   This will come back from massive as an array unless specified, so i need the first one with [0]
        req.session.user = newUser[0]
        res
          .status(200)
          .send({
            message: 'Logged in',
            user: req.session.user,
            loggedIn: true
          })
      })
      .catch(err => {
        res.status(500).send({message: 'Failed to register'})
      })
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    req.session.user_id = req.body.username
    const user = await db.find_email_and_match([email])
    if (user.length === 0) {
      return res.status(400).send({message: 'Email not found'})
    }
    const result = bcrypt.compareSync(password, user[0].hash)
    if (result) {
      delete user[0].hash
      req.session.user = user[0]
      return res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    }
  },
  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'Logged out', loggedIn: false})
  },
  loadPosts: async (req, res) => {
    const db = req.app.get('db')
    const loadPosts = await db.load_posts()
    return res.status(200).send(loadPosts)
  },
  findPosts: async (req, res) => {
    const db = req.app.get('db')
    const allPosts = await db.find_posts(`%${req.query.post_title}%`)
    return res.status(200).send(allPosts)
    },
  loadPosts: async (req, res) => {
        const db = req.app.get("db");
         //const posts = await db.load_posts();
         //console.log(req.query)
        const posts = await db.find_posts(`%${req.query.post_title}%`)
        res.status(200).send(posts);
    },
  addPost: async(req, res, next) => {
        console.log(req.body)
        const { post_title, post_image, post_content } = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const postToAdd = await db.create_post([user_id, post_title, post_image, post_content])
        res.status(200).send(postToAdd)
    },
    sessionInfo: async (req, res) => {
        return res.status(200).send({message: 'session info internalized', user: req.session.user, loggedIn: true})
    },
}