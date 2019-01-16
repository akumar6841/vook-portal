var validator = require('validator');
var isEmpty = require('./../utils/isEmpty');

module.exports = function validateRegisterInput(data){
    
    let errors = {};
    
    
    data.username = !isEmpty(data.username) ? data.username : '';
    data.number = !isEmpty(data.number) ? data.number : '';
    data.password1 = !isEmpty(data.password1) ? data.password1 : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    
    if(!validator.isLength(data.username,{min : 2, max : 15})){
        errors.username = 'Username characters length must be between 2 and 15'
    }

    if(validator.isEmpty(data.username)){
        errors.username = 'Username field is required';
    }

    if(!validator.isLength(data.number,{min:10,max:10})){
        errors.number = 'Number digits must be 10-digits';
    }

    if(validator.isEmpty(data.number)){
        errors.number = 'Number field is required';
    }

    if(validator.isEmpty(data.password1)){
        errors.password = 'Password field is required';
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password field is required';
    }

    if(data.password1!=data.password2){
        errors.password2 = 'Both the passwords are not same';
    }

   

    

    


    return {
        errors,
        isValid : isEmpty(errors)
    }
}