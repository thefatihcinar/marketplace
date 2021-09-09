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

// @desc    register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (request, response) => {
    /* this action creates a new user
        i.e. Register */
    let { name, email, password } = request.body;

    // 1. Check whether user exists or not
    let userExists = await User.findOne({ email: email });

    if(userExists){
        response.status(400)
        throw new Error("user already exists")
    }

    // 2. User does not exist, create the user
        // Check whether email is valid or not
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if(!emailRegexp.test(email)){
            response.status(400)
            throw new Error("email not in the right format");
        }
        
        let user = await User.create({name, email, password});

        if(user){
            // if there were no problems and the user has been created
            response.status(201)
            response.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else{
            response.status(400);
            throw new Error("invalid user data");
        }

})

// @ desc   Update user
// @ route  PUT /api/users/profile
// @ access Private    
const updateUserProfile = asyncHandler (async (request, response) => {
    /* this action gets new information about the user
        and updates the changed fields, 
        unchanged fields remain the same */
    
    let user = await User.findById(request.user._id);
    
    if(request.user){
        // if the user exists, comes from the middleware

        const { newPassword: password, newEmail: email, newName: name } = request.body;

        // these data field might be unchanged, so check this
        
        user.name = request.body.name || user.name;
        user.email = request.body.email || user.email;
        if(request.body.password){
            user.password = request.body.password;  // automatically hashed
        }

        const updatedUser = await user.save();

        console.log("updated user");
        console.log(updatedUser);

        response.status(200)
        response.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }
    else{
        response.status(404)
        throw new Error("user not found");
    }


    
} )  

export { authUser,getUserProfile, registerUser, updateUserProfile }

