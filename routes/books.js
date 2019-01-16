const express = require('express');

const router = express.Router();

//IMPORT MODEL
const Book = require('./../models/Book');

//IMPORT VALIDATIONS
const validateBookInput = require('./../validations/book');


// @ROUTE POST api/books/
// @desc ADD BOOK
// @access PRIVATE
router.post('/',(req,res)=>{
    const {isValid, errors} = validateBookInput(req.body);
    if(!isValid){
        res.send(errors);
    }
    Book.findOne({isbn10 : req.body.isbn10})
    .then(book=>{
        if(book){
            res.status(400).json({message : 'This book already exist'})
        }else{
            const newBook = new Book({
                isbn10 : req.body.isbn10,
                title : req.body.title,
                author : req.body.author,
                publisher : req.body.publisher,
                class : req.body.class,
                subject : req.body.subject,
                category : req.body.category,
                detail : req.body.detail,
                description : req.body.description,
                imageAddress : req.body.imageAddress,
                mrp : req.body.mrp,
                sellingPrice : req.body.sellingPrice,
                tags : req.body.tags,
                date : req.body.date,
            });
            newBook.save()
            .then(book=>{
                res.status(200).json({message : 'Book Added Successfully', success : true});
            })
            .catch(err=>{
                res.status(400).json(err);
            });
        }
    });
});

// @ROUTE GET api/books/id:
// @desc GET BOOK DETAIL BY ID
// @access PUBLIC
router.get('/',(req,res)=>{
    const bookId = req.query.id;
    Book.findById({_id:bookId})
    .then(book=>{
        if(!book){
            res.status(404).json({error : 'Book not found'});
        }else{
            res.status(200).json(book);
        }
    })
    .catch(err=>{
        res.status(400).json({error : 'Bad request'});
    });
});

// @ROUTE PUT api/books/id:
// @desc UPDATE BOOK DETAILS BY ID
// @access PRIVATE
router.put('/',(req,res)=>{
    const bookId = req.query.id;
    Book.findById(bookId)
    .then(book=>{
        if(!book){
            res.status(404).json({error : 'Book not found'});
        }else{
            Book.findByIdAndUpdate(bookId,{
                isbn10 : req.body.isbn10,
                title : req.body.title,
                author : req.body.author,
                publisher : req.body.publisher,
                class : req.body.class,
                subject : req.body.subject,
                category : req.body.category,
                detail : req.body.detail,
                description : req.body.description,
                imageAddress : req.body.imageAddress,
                mrp : req.body.mrp,
                sellingPrice : req.body.sellingPrice,
                tags : req.body.tags,
                date : req.body.date,
            })
            .then(book=>{
                res.json({message : 'Book Details Updated Successfully', success : true});
            })
            .catch(err=>{
                res.status(400).json({error : 'Updation failed'});
            })
        }
    })
    .catch(err=>{
        res.status(400).json({error : 'Bad request'});
    });
});

// @ROUTE DELETE api/books/:id
// @desc DELETE BOOK BY ID
// @access PRIVATE
router.delete('/',(req,res)=>{
    const bookId = req.query.id;
    //res.send(bookId);
    Book.findById(bookId)
    .then(book=>{
        if(!book){
            res.json({error : 'Book not found'});
        }else{
            Book.findByIdAndRemove(bookId)
            .then(book=>{
                res.json({message : 'Book Details Deleted Successfully', success : true});
            })
            .catch(err=>{
                res.status(400).json({error : 'Deletion failed'});
            })
        }
        

    })
    .catch(err=>{
        res.status(400).json({error : 'Bad request'});
    });
});

module.exports = router;