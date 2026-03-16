const bcrypt = require("bcrypt");
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.signup = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const existUser = await User.findOne({email});

        if(existUser) {
            return res.status(500).json({
                success : false,
                mesaage : 'email alredy exist'
            })
        }

        //secure password with hash
        let hashedPass;
        try{
            hashedPass = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success : false,
                message : "error in hashsing pass"
            })
        }

        const user = await User.create({name, email, password:hashedPass, role});

        return res.status(200).json({
            success : true,
            message : "user created successfully"
        })
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            suces : false,
            message : "try again later"
        })
    }
}

exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "please fill all the details"
            })
        }

        let user = await User.findOne({email}); // to find user

        if(!user) { // if not then return error
            return res.status(401).json({
                success : false,
                message : "User doesnt exost"
            })
        }


        const payload =  {
            email : user.email,
            id : user._id,
            role : user.role,
        }

        // verify pass && generate jwt token
         if(await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'2h'}) // payload secretkey expire

            user = user.toObject();
            user.token = token;
            console.log(user);
            user.password = undefined;
            console.log(user);
            
            const option = {
                expires : new Date(Date.now() + 30000),
                httpOnly:true 
            }
            res.cookie("token", token, option).status(200).json({
                sucess : true,
                token,
                user,
                message: "user lggedIn success"
            })


            // res.status(200).json({
            //     sucess : true,
            //     token,
            //     user,
            //     message: "user lggedIn success"
            // })
         }
         else{
            // wrong password
            return res.status(403).json({
                success : false, 
                message : "password dont match"
            })
         }

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            success : false,
            message: "login failed"
            
        })
    }
}