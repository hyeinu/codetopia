const express = require('express');
const router = express.Router();

const Message = require('../models/message')
const User = require('../models/user')


router.route('/')
  .get((req, res) => {
    Message.find({}, (err, messages)=>{
      res.status(err ? 400 : 200).send(err || messages)
    })
  })

router.route('/:id')
  .post((req, res) =>{
    Message.create(req.body, (err, message) =>{
      if (err) return res.status(400).send(err)
      User.findById(req.params.id, (err, user) =>{
        if (err) return res.status(400).send(err)
        user.messages.push(message._id)
        user.save(err =>{
          if(err) return res.status(400).send(err)
          res.send(user);
      })
    })
  })
})

module.exports = router;
