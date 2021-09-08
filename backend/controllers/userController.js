/* this controller controls all the operations about the user 
    login, register, display profile etc. */

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utilities/generateToken.js';

// @desc    authenticate a user 
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async (request, response) => {
    /* this function is responsible for authenticating the user 
        i.e. LOG IN */
    
    let { email, password } = request.body;
    // destructure email and password from requst body, which is parsed
   
    // To-do: Add Null Check
    if(email === undefined || password === undefined)
        throw new Error("email and password must be provided");

    // Go find the user in the db
    const user = await User.findOne({ email: email });

    if(user && await user.matchPassword(password)){
        // user is authenticated
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }
    else if (user){
        // user exists but password is incorrent
        response.status(401)
        throw new Error("password is incorrect");
    }
    else {
        // the user does not exist
        response.status(401)
        throw new Error("user not found");
    }

})

// @desc    get user's profile
// @route   GET /api/users/profile
// @access  Private    
const getUserProfile = asyncHandler(async (request, response) => {
    /* this function will give details about the user's profile */

    const user = await User.findById(request.user._id);

    if(user){
        response.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        response.status(404)
        throw new Error("user not found");
    }
})

export { authUser,getUserProfile }

