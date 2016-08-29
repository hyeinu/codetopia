const express = require('express');
const router = express.Router();

const User = require('../models/user')

router.route('/')
  .get((req, res) =>{
    User.find({}, (err, users) =>{
      res.status(err ? 400: 200).send(err || users);
    })
  })
  .post((req, res) =>{
    User.create(req.body, (err, person) =>{
      res.status(err ? 400: 200).send(err || person);
    })
  })

router.route('/:id/addFact')
  .put((req, res) =>{
    User.findById(req.params.id, (err, user)=>{
      if(err) {
        return res.status(400).send(err);
      } else {
        user.facts.push(req.body.fact)
        user.save()
        return res.send(user)
      }
    })
  })

router.route('/:id/getFacts')
  .get((req, res)=>{
    User.findById(req.params.id , (err, user)=>{
      if(err){
        return res.status(400).send(err);
      } else {
       let gamePiece = {}
       let randomFact = Math.floor(Math.random() * (user.facts.length))
       gamePiece.fact = user.facts[randomFact]
       gamePiece.user_pic = user.pic_url
       gamePiece.username = user.username
       return res.send(gamePiece)
      }
    })
  })

router.route('/:id/getAll')
  .get((req, res)=>{
    User.findById(req.params.id , (err, user)=>{
      if(err){
        return res.status(400).send(err);
      } else {
       let userfacts = user.facts
       return res.send(userfacts)
      }
    })
  })

module.exports = router;
