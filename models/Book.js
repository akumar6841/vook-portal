const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    uploader : {
        type : String
    },
    isbn : {
        type : Number,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    quantity : {
        type : Number,
        default : 100
    },
    title : {
        type : String,
        trim : true,
        required : true
    },
    author : {
        type : String,
        trim : true,
        required : true
    },
    publisher : {
        type : String,
        trim : true,
        required : true
    },
    class : {
        type : Number,
        required : true
    },
    subject : {
        type : String,
        trim : true,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        trim : true,
    },
    description : {
        type : String,
        trim : true,
    },
    edition : {
        type : Number,
        trim : true
    },
    image : {
        type : String,
        trim : true
    },
    mrp : {
        type : Number,
        trim : true,
        minlength : 10,
        required : true
    },
    discount : {
        type : Number,
        trim : true,
        minlength : 10,
        required : true
    },
    tags : {
        type : String,
        trim : true,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Book = mongoose.model('books',BookSchema);

