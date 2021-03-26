const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { jwtSecret } = require('../../config/secret');

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');

router.post('/register', (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json(error.message);
            })
    }else{
        res.status(400).json({message: 'please provide valid creditials'})
    }
})

router.post('/login', (req, res) => {
    
})