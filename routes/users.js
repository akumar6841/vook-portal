const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();

//IMPORT MODEL
const User = require('./../models/User');

//IMPORT VALIDATIONS
const jwt = require('jsonwebtoken');
const validateLoginInput = require('./../validations/login');
const validateRegisterInput = require('./../validations/register');

//IMPORT KEYS
const {secretKey, tokenExpiresIn} = require('./../config/keys');

// @ROUTE POST api/users/login
// @desc USER LOGIN
// @access PUBLIC
router.post('/login',(req,res)=>{
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(401).json(errors);
    }
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username : username})
    .then(user=>{
        if(!user){
            return res.status(404).json({username : 'User not found'});
        }

        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch){
                var payload = {
                    id : user.id,
                    name : user.name,
                    username : user.username,
                    email : user.email,
                    avatar : user.avatar
                }
                jwt.sign(payload,secretKey,{expiresIn : tokenExpiresIn},(err,token)=>{
                    res.json({
                        success : true,
                        token : 'Bearer '+token
                    });
                });
            }else{
                return res.status(400).json({password : 'Password incorrect'});
            }
        })
    })

});


// @route POST api/users/register
// @desc REGISTER NEW USER
// @access PUBLIC
router.post('/register',(req,res)=>{
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(401).json(errors);
    }
    const avatar = gravatar.url(req.body.email,{
        s : '200',
        r : 'pg',
        d : 'mm'
    })
    var newUser = new User({
        username : req.body.username,
        number : req.body.number,
        password : req.body.password1,
        avatar : avatar
    });

    

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash
        })
    })
    User.findOne({username : req.body.username},(err,user)=>{
        if(user){
            res.status(401).json({username : 'Username already exist'});
        }else{
            newUser.save()
            .then(user=>{
                res.json(user);
            })
            .catch(err=>{
                res.status(401).json(err);
            })
        }
    })
    
});



module.exports = router;