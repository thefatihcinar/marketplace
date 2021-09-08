import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
    "name": { type: String, required: true },
    "email": { type: String, required: true, unique: true},
    "password": { type: String, required: true },
    "isAdmin": { type: Boolean, required: true, default: false},
    },
    { timestamps : true });

/* also create methods that run on this model */

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

/* create a model, i.e. User model from this schema */
const User = mongoose.model('User', userSchema);

export default User