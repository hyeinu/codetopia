//Should not be committed should be kept as an env variable
const JWT_SECRET = '&qwefwda*g(fad*gaera*fdaewrga*a'

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-node')
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  bio: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  pic_url: { type: String, default: 'http://static1.squarespace.com/static/5502fdbee4b03657f7464e5c/550a4b1de4b069a29065f3a1/551b7a90e4b0d5e6433a2bef/1429569820924/unknown.gif?format=300w' }
})

userSchema.statics.register = function(userObj , cb){
  this.findOne({username: userObj.username}, (err, dbUser)=>{
    if (err) return cb(err);
    if (dbUser) return cb({err: 'Username Already Taken'})
    bcrypt.genSalt(12, (err, salt)=>{
      if (err) return cb(err);
      bcrypt.hash(userObj.password, salt, null, (err, hash)=>{
        if (err) return cb(err);
        userObj.password  = hash;
        this.create(userObj, (err, newUser)=> {
          cb(err)
        });
      })
    })
  });
}

userSchema.statics.authenticate = function(userObj, cb){
  let { username, password } = userObj

  this.findOne({ username }, (err, user)=>{
    if (err || !user) {
      return cb(err || {error: 'Login failed.'})
    }
    bcrypt.compare(password, user.password, (err, res)=>{
      if (err) return cb(err);
      if (!res) return cb({error: 'Login failed.'});
      let payload = {
        _id: user._id
      }
      jwt.sign(payload, JWT_SECRET, {}, cb)
    })
  })
}

userSchema.statics.authMiddleware = function(req, res, next){
  let token = req.cookies.authtoken;
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send(err);

    mongoose.model('User')
      .findById(payload._id)
      .select({password: false})
      .populate('friends')
      .populate({ path: 'messages', populate: { path: 'user_from'}})
      .exec((err, user) => {
      if(err) return res.status(400).send(err);
      if(!user) return res.status(401).send({error: 'user not found.'})
        user.messages.forEach(message =>{
          message.user_from.password = null;
        })
      req.user = user;
      next();
    });
  });
}

userSchema.statics.getProfiles = function(cb){
  mongoose.model('User')
    .find({})
    .select({password: false})
    .populate('friends')
    .populate({ path: 'messages', populate: { path: 'user_from'}})
    .exec((err, users) => {
      if(err) return cb(err);
      cb(null, users)
  })
}


const User = mongoose.model('User', userSchema)

module.exports = User;
