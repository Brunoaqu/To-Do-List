const express = require('express')
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./Config/DB.Config')()

const TaskRoute = require('./Routes/Task.Route')
app.use('/api/task', TaskRoute)




const PORT = process.env.PORT || 3000

// STARTS APPLICATION 
app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`)  
})