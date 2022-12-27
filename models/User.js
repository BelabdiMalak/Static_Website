const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true, 'please enter an email'],
        unique:true, 
        lowercase:true,
        validate: [isEmail, 'please enter a valid email']// take the value of the email and verify with validator (u should install it)
    },

    password:{
        type:String,
        required:[true, 'please enter a password'],
        minlength:[6, 'minimum password length is 6 caracters']
    }, 

});

// fire this function before saving any user (hash passwords)
userSchema.pre('save', async function(next){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

userSchema.statics.login = async function(email, password){

    const user = await this.findOne({email});

    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        else{
            throw Error('Mot de passe incorrect');
        }
    }
    else{
        throw Error('Email incorrect');
    }
}

const User = mongoose.model('user', userSchema); // user : the name must be the singular of whatever we called our collection

module.exports = User;