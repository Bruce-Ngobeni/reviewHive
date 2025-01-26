import mongoose from "mongoose";
// const passportLocalMongoose = require('passport-local-mongoose');
import passportLocalMongoose from "passport-local-mongoose"


const userSchema = new mongoose.Schema({
    email: {type:String, require:true, unique: true},
    username: {type: String, require: true, unique:true}
});


userSchema.plugin(passportLocalMongoose);


export default mongoose.model('User', userSchema)