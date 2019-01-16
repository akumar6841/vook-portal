const validator = require('validator');
const isEmpty = require('./../utils/isEmpty');


module.exports = function(data){
    let errors = {}

    data.isbn = !isEmpty(data.isbn) ? data.isbn : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.author = !isEmpty(data.author) ? data.author : '';
    data.publisher = !isEmpty(data.publisher) ? data.publisher : '';
    data.class = !isEmpty(data.class) ? data.class : '';
    data.subject = !isEmpty(data.subject) ? data.subject : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.image = !isEmpty(data.image) ? data.image : '';
    data.mrp = !isEmpty(data.mrp) ? data.mrp : '';
    data.discount = !isEmpty(data.discount) ? data.discount : '';
    data.tags = !isEmpty(data.tags) ? data.tags : '';

    
    //VALIDATE ISBN NUMBER OF DIGITS
    if(!validator.isLength(data.isbn,{min : 10, max : 10})){
        errors.isbn = 'ISBN must be 10-digits only';
    }

    //VALIDATE BOOK ISBN
    if(validator.isEmpty(data.isbn)){
        errors.isbn = 'Book 10-digit ISBN is required';
    }

    //VALIDATE BOOK TITLE
    if(validator.isEmpty(data.title)){
        errors.title = 'Book title field is required';
    }

    //VALIDATE BOOK AUTHOR
    if(validator.isEmpty(data.author)){
        errors.author = 'Book author field is required';
    }

    //VALIDATE BOOK PUBLISHER
    if(validator.isEmpty(data.publisher)){
        errors.publisher = 'Book publisher field is required';
    }

    //VALIDATE CLASS
    if(validator.isEmpty(data.class)){
        errors.class = 'Class field is required';
    }

    //VALIDATE SUBJECT
    if(validator.isEmpty(data.subject)){
        errors.subject = 'Subject field is required';
    }

    //VALIDATE CATEGORY
    if(validator.isEmpty(data.category)){
        errors.category = 'Book category field is required';
    }

    if(validator.isEmpty(data.detail)){
        errors.detail = 'Book detail field is required';
    }


    //VALIDATE IMAGE ADDRESS
    if(validator.isEmpty(data.image)){
        errors.image = 'Book Image address is required';
    }

    //VALIDATE EDITION
    if(validator.isEmpty(data.edition)){
        errors.edition = 'Book edition field is required';
    }

    //VALIDATE MRP
    if(validator.isEmpty(data.mrp)){
        errors.mrp = 'MRP field is required';
    }

    //VALIDATE SELLING PRICE
    if(validator.isEmpty(data.discount)){
        errors.discount = 'Book discount field is required';
    }

    //VALIDATE TAGS
    if(validator.isEmpty(data.tags)){
        errors.tags = 'Book tags field is required';
    }

    return {
       errors,
       isValid : isEmpty(errors) 
    }
}