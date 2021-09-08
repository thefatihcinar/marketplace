/* this controller controls all the operations about the user 
    login, register, display profile etc. */

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    authenticate a user 
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async (request, response) => {
    /* this function is responsible for authenticating the user 
        i.e. LOG IN */
    
    console.log(request.body)

    response.send("ok");

})

export { authUser }

