import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    /* this function will create a JSON Web Token 
       with the payload containing the user id */
    return jwt.sign({id: id}, process.env.JWT_SECRET, { expiresIn: '2m'});
}

export default generateToken;