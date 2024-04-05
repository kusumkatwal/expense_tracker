const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        min:2,
        max: 12, 
        required: true
    },
    lastname: {
       type: String,
       min: 2,
       max: 10,
       required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
     dob: {
        type: Date,
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    }

,{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel
