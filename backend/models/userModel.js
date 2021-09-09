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

userSchema.pre('save', async function(next){
    /* this piece of mongoose middleware will
       hash the password just before creating the user */

    if(!this.isModified('password')){
        // if the password is not modified do not do anything again
        // definitely do not hash the password again, NEVER
        next()
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.post('save', function(createdDocument, next){
    /* this piece of mongoose middleware will
        warn the console when a new user registers */
   
    next();
})

/* create a model, i.e. User model from this schema */
const User = mongoose.model('User', userSchema);

export default User