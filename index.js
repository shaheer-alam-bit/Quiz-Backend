const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const port = 3000
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/Auth')
const recipeRouter = require('./routes/Recipe')
const ingredientRouter = require('./routes/Ingredient')

app.use(express.json())
app.use(cors())
app.use('/auth',authRouter)

app.use((req,res,next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({msg : "Token not found"})
        }
        const user = jwt.verify(token.split(" ")[1],'MY_SECRET');
        req.user = user;
        next();
    }
    catch(err) {
        res.status(400).json({msg : "Invalid token"})
}})

app.use('/ingredient',ingredientRouter)
app.use('/recipe',recipeRouter)

const connectToDB = async ()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/QuizDB');
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    }
    catch(err) {
        console.log(err);
    }
}
connectToDB();
