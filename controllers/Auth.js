const bcrypt = require("bcrypt");

const User = require("../model/userSchema");

exports.signup = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const existUser = await User.findOne({email})

        if(existUser) {
            return res.status(400).json({
                success : false,
                data : "user already exist"
            })
        }

        let hashedPass;
        try{
            hashedPass = await bcrypt.hash(password, 10);
        }
        catch(err) {
            res.status(500).json({
                success:false,
                message:"error in hashing"
            })
        }

        const user = await User.create({
            name, email, password:hashedPass, role
        })

        return res.status(200).json({
            success: true,
            message : "created data"
        })
    }
    catch{
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "error in creating"
        })
    }
}