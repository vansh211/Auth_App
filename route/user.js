const express = require('express')
const router = express.Router();

const {login, signup} = require("../controllers/Auth")
const {auth, isStudent, isAdmin} = require("../middlewares/Auth")
const User = require("../model/userSchema")

router.post("/login", login);
router.post("/signup", signup);

//protected routes

router.get("/test", auth, (req, res) => {
    res.json({
        success : true,
        message : "auth done"
    })
})

router.get("/student", auth, isStudent , (req, res) => {
    res.json({
        success : true,
        messaage : "Wecome to proctedt studet route"
    })
})

router.get("/admin", auth, isAdmin , (req, res) => {
    res.json({
        success : true,
        messaage : "Wecome to proctedt admin route"
    })
})

router.get("/getDetails", auth, async(req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findOne({_id : id});

        return res.status(200).json({
            success: true,
            user,
            message: "details here"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "internal error here"
        });
    }
});

module.exports = router

