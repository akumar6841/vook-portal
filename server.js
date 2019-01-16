//IMPORT MODULES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const cors = require('cors');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
const app = express();
var port  = process.env.PORT || 3000;

//IMPORT VALIDATION
const validateBookInput = require('./validations/book');


//SESSION
// app.use(cookieParser());
// app.use(session({
//     secret: 'thisissecret',
//     resave: false,
//     saveUninitialized: false
// }));

app.set('trust proxy', 1)

app.use(cookieSession({
    name: 'session',
    keys: ['secretkey'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))


//SET VIEW ENGINE
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use(cors());

//IMPORT MODEL
const Book = require('./models/Book');


//IMPORT DATABASE URL
const db = require('./config/keys').mongoURI;



//CHECK CONNECTION TO DATABASE
mongoose.connect(db,{ useNewUrlParser: true }).then(()=>{
    console.log("Database connection successfull");
}).catch((err)=>{
    console.log(err);
});

//USE BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/add',(req,res)=>{
    if(req.session.key){
        res.render('add.hbs',{
            title : 'Add Book | Vook',
            username : req.session.key
        });
    }else{
        res.redirect('/login');
    }
    
});

app.get('/',(req,res)=>{
    if(req.session.key){
        Book.find({uploader:req.session.key})
        .then(books=>{
            res.render('index.hbs',{
                title : 'Dashboard | Vook',
                username : req.session.key,
                books : books
            });
        })
        
    }else{
        res.redirect('/login');
    }
})

app.get('/login',(req,res)=>{
    if(req.session.key){
        res.redirect('/');
    }else{
        res.render('login.hbs',{
            title : 'Login | Vook'
        });
    }
    
});

app.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    
    
    if(username!=='akumar' && password!=='anil@123'){
        res.json({message : 'Incorrect username or password!!'});
    }else if(username!=='agupta' && password!=='Arun#$34'){
        res.json({message : 'Incorrect username or password!!'});
    }else{
        req.session.key = username;
        res.json({success : true});
    }

    
});

app.get('/logout',(req,res)=>{
    req.session.key = null;
    res.redirect('/login');
})

app.post('/',(req,res)=>{
    const {isValid, errors} = validateBookInput(req.body);
    if(!isValid){
        res.json(errors);
    }else{
        Book.findOne({isbn : req.body.isbn})
        .then(book=>{
            if(book){
                res.json({message : 'This book already exist'})
            }else{
                const newBook = new Book({
                    uploader : req.session.key,
                    isbn : req.body.isbn,
                    quantity : req.body.quantity,
                    title : req.body.title,
                    author : req.body.author,
                    publisher : req.body.publisher,
                    class : req.body.class,
                    subject : req.body.subject,
                    category : req.body.category,
                    detail : req.body.detail,
                    description : req.body.description,
                    image : req.body.image,
                    mrp : req.body.mrp,
                    discount : req.body.discount,
                    tags : req.body.tags,
                    date : req.body.date
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
    }

    
});

app.get('/books',(req,res)=>{
    Book.find({uploader : req.session.key}).sort({date:-1})
    .then(books=>{
        if(!books){
            res.json({message : 'You added no book yet!!'});
        }else{
            res.json(books);
        }
        
    })
})


app.get('/edit',(req,res)=>{
    const bookId = req.query.id;
    Book.findById(bookId)
    .then(book=>{
        if(!book){
            res.send("No book found for this ID");
        }else{
            res.render('edit.hbs',{
                id : bookId,
                title : book.title,
                isbn : book.isbn,
                author : book.author,
                publisher : book.publisher,
                detail : book.detail,
                description : book.description,
                mrp : book.mrp,
                discount : book.discount,
                tags : book.tags,
                image : book.image
            });
        }
    })

})


app.put('/edit',(req,res)=>{
    const bookId = req.query.id;
    Book.findById(bookId)
    .then(book=>{
        if(!book){
            res.status(200).json({message : 'No book found'});
        }else{
            Book.findByIdAndUpdate(bookId,{
                isbn : req.body.isbn,
                title : req.body.title,
                author : req.body.author,
                publisher : req.body.publisher,
                class : req.body.class,
                subject : req.body.subject,
                category : req.body.category,
                detail : req.body.detail,
                description : req.body.description,
                image : req.body.image,
                mrp : req.body.mrp,
                discount : req.body.discount,
                tags : req.body.tags,
                date : req.body.date
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








//LISTEN APP
app.listen(port,()=>{
    console.log(`Server stated at port ${port}`);
});
