const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.auth = (req, res, next) => {
    try{


        // Only check for token in cookies
        console.log("cookie ->", req.body.token)
        console.log("cookie ->", req.cookies.token);
        console.log("header ->", req.header("Authorization")?.replace("Bearer ", ""));
        
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", ""); // to get token from header or cookie

        if(!token) { // if no tokn 
            return res.status(401).json({
                success : false,
                message : "no token provided"
            })
        }

        // to verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success : false,
                message : "decoding failed"
            })
        }

        next();

    } catch(error) {
        return res.status(400).json({
            success: false,
            message : "something went wrong in auth"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try{
        if(req.user.role !== "Student") {
            return res.status(401).json({
                succes : false,
                message : "onlu for students babe"
            })
        }
        
        console.log(req.user.role);
        next();
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "something wrong in student"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                succes : false,
                message : "onlu for admins babe"
            })
        }

        console.log(req.user.role);
        next();
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "something wrong in admin"
        })
    }
}