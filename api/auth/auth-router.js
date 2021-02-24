const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const router = require("express").Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');
const {jwtSecret} = require('../../config/secrets');

router.post('/register', (req, res) =>{
    const credentials = req.body;

    if(isValid(credentials)) {
        const rounds = process.env.BCRYPY_ROUNDS || 8;

        // we are hashing the password here
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;
        // saving the user to the database
        Users.add(credentials)
        .then(user => {
            res.status(201).json({ data: user });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
    } else{
        res.status(400).json({
            message: 'please provide username and password and the password',
        });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(isValid(req.body)) {
        Users.findBy({ username: username})
        .then(([user]) => {
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = makeToken(user)

                res.status(200).json({
                    message: 'Welcome back to your world' + user.username,
                    token
                });
            }else {
                res.status(401).json({ message: 'Invalid username and/or password'});
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
    }else{
        res.status(400).json({
            message:'please provide a username and password'
        });
    }
});

function makeToken(user){
    const payload = {
        subject:user.id,
        username:user.username,
        role:user.role
    }
    const options = {
        expiresIn: '500s'
    }
    return jwt.sign(payload,jwtSecret,options)
}

module.exports = router;