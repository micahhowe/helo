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
    req.session.userid = req.body.username
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
    req.session.userid = req.body.username
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
  findPosts: async (req, res) => {
    const db = req.app.get('db')
    const allPosts = await db.find_posts(`%${req.query.post_title}%`)
    return res.status(200).send(allPosts)
    },
    loadPosts: async (req, res) => {
        const db = req.app.get("db");
        const posts = await db.load_posts();
        res.status(200).send(posts);
    },
    addPost: (req, res, next) => {
        const db = req.app.get('db')
        const { post_title, post_image, post_content } = req.body
        db.create_post([post_title, post_image, post_content]).then(result => {
            res.status(200).send(result)
        })
    },
}