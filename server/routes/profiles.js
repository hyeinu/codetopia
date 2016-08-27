const express = require('express');
const router = express.Router();

const User = require('../models/user')


router.get('/', (req, res) => {
  User.getProfiles((err, users) => {
    users.forEach(user =>{
      user.messages.forEach(message =>{
        message.user_from.password = null;
      })
    })
    res.status(err ? 400 : 200).send(err || users)
  })
})


module.exports = router;
