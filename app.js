require('dotenv').config();
require('./config/database').connect();
const jwt = require('jsonwebtoken')

const User = require('./model/user');

const express = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');

const app = express();

app.use(express.json());

app.post('/Login', (req,res) => {

})

app.post('/Register', async (req,res)=>{
    try {
        const {first_name, last_name, email, password}= req.body;
        
        console.log(first_name);
        
        if(!(email && password && first_name && last_name)){
            res.status(400).send('All input is required');
        }

        const oldUser = await User.findOne({email});
        
        if(oldUser){
            return res.status(409).send('User already exist. Please Login');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        const token = jwt.sign(
            {user_id: user._id, email},
            'mykey',
            {expiresIn: '2h'}
        );

        user.token = token;

        res.status(201).json(user);

    } catch (error) {   
        console.log('Error'+ error);
    }
})

module.exports = app;