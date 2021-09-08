import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const protect = asyncHandler( async (request, response, next) => {
    /* this middleware verifies the JWT tokens,
       in order to implement authorization logic to user-specific pages
       use this middleware */
    
    if( request.headers.authorization 
        && request.headers.authorization.startsWith('Bearer') )
    {
        // Validate this token
        let token;

        try{
            token = request.headers.authorization.replace('Bearer ', '');

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user with this user is from the database
            request.user = await User.findById(decoded.id).select('-password -updatedAt -createdAt -__v');

            next();
        }
        catch(error){

            response.status(401);
            throw new Error("not authorized, token not verified");
        }
    }
    else {
        // Token not provided
        response.status(401)
        throw new Error("not authorized, token must be provided")
    } 
})



export { protect }