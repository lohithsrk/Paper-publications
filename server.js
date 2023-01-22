require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const authRouter = require('./routers/auth.route')
const paperRouter = require('./routers/paper.route')
const suggestionRouter = require('./routers/suggestion.route')
const employeeRouter = require('./routers/employees.route')

const db = require('./database/database')

const app = express()

app.use(express.static('papers'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', authRouter)
app.use('/api', paperRouter)
app.use('/api', suggestionRouter)
app.use('/api', employeeRouter)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
})