const express = require('express')
const router = express.Router();

const {login, signup} = require("../controllers/Auth")
const {auth, isStudent, isAdmin} = require("../middlewares/Auth")

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

module.exports = router

