const express = require('express');
const dbConnect = require("./config/database");

const app = express(); 

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());


dbConnect();

const user = require('./route/user')

app.use("/app/v1", user)


app.listen(PORT, () => {
    console.log(`server Started at ${PORT}`)
})