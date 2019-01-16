var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
        name : {
            type : String,
            trim : true
        },
        username : {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        email : {
            type : String,
            trim : true,
            
        },
        number : {
            type : String,
            trim : true,
            required : true
        },
        password : {
            type : String,
            required : true,
            trim : true
        },
        avatar : {
            type : String
        },
        balance :{
            type : Number,
            default : 50
        },
        createAccountCouponCode : {
            type : String
        },
        date : {
            type : Date,
            default : Date.now()
        },



});

module.exports = User = mongoose.model('users',UserSchema);

