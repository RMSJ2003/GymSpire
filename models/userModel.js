const mongoose = require('mongoose');
const { type } = require('os');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8, // length of passwords is more important than crazy symbols
        select: false // If we read all users then password field won't show up but if we sign up user it will still show up (encrypted version)
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        // Custom Validator to confirm password.
        validate: {
            // THIS ONLY WORKS ON CREATE AND SAVE !!! (.save and .create in mongoose)
            // We can't use arrow function cuz we need this keyword
            // A validator function returns a boolean if it's validated
            validator: function (el) {
                // If passwordConfirm == password, from doc
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    userType: {
        type: String,
        enum: ['user', 'judge', 'admin'],
        default: 'user'
    },
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        // NOT SURE ABOUT THESE:
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username must be at most 20 characters'],
        match: [/^[a-zA-Z0-9._-]+$/, 'Username may only contain letters, numbers, dots, underscores, and hyphens']
    },
    activeStatus: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    friends: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    friendRequests: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    quote: {
        type: String,
        trim: true // *is this really needed?
    },
    beforeImgUrl: String,
    beforeWeight: Number,
    afterImgUrl: String,
    afterWeight: Number
});
