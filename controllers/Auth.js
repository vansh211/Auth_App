const bcrypt = require("bcrypt");
const User = require('../model/userSchema')

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

// exports.login = async(req,res) => {

// }