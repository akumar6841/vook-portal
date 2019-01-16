var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/akumar6841/image/upload';
var CLOUDINARY_UPLOAD_PRESET = 'd3922pq6';

var file  = document.getElementById('image');


file.addEventListener('change',function(event){

    var status = document.getElementById('status');
    status.innerHTML = "UPLOADING...";
    status.style.color = '#4BBF73';


    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET);

    axios({
        url : CLOUDINARY_URL,
        method : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data : formData
    })
    .then(res=>{

        status.innerHTML = "UPLOADED";
        status.style.color = '#4BBF73';

        var image_url = res.data.url;
        var image_field = document.createElement('input');
        image_field.setAttribute('type','hidden');
        image_field.setAttribute('name','image');
        image_field.setAttribute('value',image_url);
        document.getElementById('book-upload-form').append(image_field);
    })
    .catch(err=>{
        status.innerHTML = "FILE UPLOAD FAILED";
        status.style.color = '#d9534f';
    })
});

// function addBook(e){
//     var isbn = document.getElementById('isbn');
//     alert(isbn);
//     // return false;
//     alert('hELLO');
// }

// form.addEventListener('submit',function(e){
//     e.preventDefault();
//     // console.log(e.target.title.value);


//     const form = document.getElementById('book-upload-form')[0];

// var data = new FormData(form);

//     console.log(data);
    
    
    
// });



