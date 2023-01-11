require('dotenv').config()
const express = require('express')

const db = require('./database/database')

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
})