require('dotenv').config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

router.get("/", authenticateToken, (req, res) => {
  db.User.findOne({
    where: {
      id: req.user.id
    },
    attributes: ["id", "username", "email"]
  }).then(user=>{
    res.json(user);
  })
})

router.post("/", async (req, res) => {
    const email = req.body.email.trim();
    let hashedPassword;
    if(!req.body.password.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/)){
      console.log("PASSWORD ERROR");
      return res.json({succes:false, error: 'Password needs to contain a number and letter and be at least 8 characters'}).status(400);
    }else{
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }
    const username = req.body.username.trim();

    db.User.create({email, password: hashedPassword, username})
      .then(() => res.status(201).json({ succes: true }))
      .catch((er) => {
        console.log(er);
        if(er.errors[0].type==="unique violation" && er.errors[0].path==='users.email'){
          return res.json({succes:false, error: 'Account with that email already exists'}).status(400);
        }
        if(er.errors[0].type==='Validation error' && er.errors[0].path==='email'){
          return res.json({succes:false, error: 'Enter a valid email'}).status(400);
        }
        if(er.errors[0].type==='unique violation' && er.errors[0].path==='users.username'){
          return res.json({succes:false, error: 'Username already exists'}).status(400);
        }
        res.json({succes:false, error: "Server error. Try again Later."}).status(400);
      });
});

router.post("/signin", (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  db.User.findOne({
    where: {
      email: email
    }
  }).then(async (user)=>{
    const authFail = "Username or password incorrect"
    if(!user){
      return res.json({succes: false, error: authFail}).status(401);
    }
    if( await bcrypt.compare(password, user.password)){
      const userJWT = {id: user.id, username: user.username};
      const accessToken = jwt.sign(userJWT, process.env.REACT_APP_SECRET_KEY, {expiresIn: '1h'});
      res.json({accessToken: accessToken, succes: true});
    }else{
      res.json({succes:false, error: authFail}).status(401);
    }
  }).catch(er=>{
    console.log(er);
    res.json({succes: false, error: 'Something went wrong :/ Try again later.'}).status(500);
  })
})

module.exports = router;
