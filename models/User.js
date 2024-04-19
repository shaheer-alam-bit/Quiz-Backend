const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String , required: true, unique: true},
    password: {type: String, required: true},
    isAdmin : {type: Boolean, required: true},
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipie'
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User