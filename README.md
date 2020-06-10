# e-shop
Multer 
Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
Installation
$ npm install --save multer
Usage
Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
var upload = multer({ dest: 'uploads/' })

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

In case you need to handle a text-only multipart form, you should use the .none() method:
var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/profile', upload.none(), function (req, res, next) {
  // req.body contains the text fields
})

API
File information
Each file contains the following information:
Key
Description
Note
fieldname
Field name specified in the form


originalname
Name of the file on the user's computer


encoding
Encoding type of the file


mimetype
Mime type of the file


size
Size of the file in bytes


destination
The folder to which the file has been saved
DiskStorage
filename
The name of the file within the destination
DiskStorage



path
The full path to the uploaded file
DiskStorage
buffer
A Buffer of the entire file
MemoryStorage


multer(opts)
Multer accepts an options object, the most basic of which is the dest property, which tells Multer where to upload the files. In case you omit the options object, the files will be kept in memory and never written to disk.
By default, Multer will rename the files so as to avoid naming conflicts. The renaming function can be customized according to your needs.
The following are the options that can be passed to Multer.
Key
Description
dest or storage
Where to store the files
fileFilter
Function to control which files are accepted
limits
Limits of the uploaded data
preservePath
Keep the full path of files instead of just the base name
In an average web app, only dest might be required, and configured as shown in the following example.
var upload = multer({ dest: 'uploads/' })
If you want more control over your uploads, you'll want to use the storage option instead of dest. Multer ships with storage engines DiskStorage and MemoryStorage; More engines are available from third parties.
WARNING: Make sure that you always handle the files that a user uploads. Never 
add multer as a global middleware since a malicious user could upload files to a route that you didn't anticipate. Only use this function on routes where you are handling the uploaded files.


storage
DiskStorage
The disk storage engine gives you full control on storing files to disk.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,new Date().toISOString() + file.originalname);
  }
})

var upload = multer({ storage: storage })
There are two options available, destination and filename. They are both functions that determine where the file should be stored.
destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.
Note: You are responsible for creating the directory when providing destination as a function. When passing a string, multer will make sure that the directory is created for you.
filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.
Note: Multer will not append any file extension for you, your function should return a filename complete with an file extension.
Each function gets passed both the request (req) and some information about the file (file) to aid with the decision.
Note that req.body might not have been fully populated yet. It depends on the order that the client transmits fields and files to the server.

MemoryStorage
The memory storage engine stores the files in memory as Buffer (temporary) objects. It doesn't have any options.
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
When using memory storage, the file info will contain a field called buffer that contains the entire file.
WARNING: Uploading very large files, or relatively small files in large numbers very quickly, can cause your application to run out of memory when memory storage is used, thus memoryStorage is not recommended.

fileFilter
Set this to a function to control which files should be uploaded and which should be skipped. The function should look like this:
function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  cb(null, false)
	// if(file.mimetype === ‘image/jpeg’ || file.mimetype === ’image.png’)

  // To accept the file pass `true`, like so:
  cb(null, true)

  // You can always pass an error if something goes wrong:
  cb(new Error('I don\'t have a clue!'))

}
Multer initialization final
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 *1024 * 10 },
	fileFilter: fileFilter
});
Error handling
When encountering an error, Multer will delegate the error to Express. You can display a nice error page using the standard express way.
If you want to catch errors specifically from Multer, you can call the middleware function by yourself. Also, if you want to catch only the Multer errors, you can use the MulterError class that is attached to the multer object itself (e.g. err instanceof multer.MulterError).
var multer = require('multer')
var upload = multer().single('avatar')

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  })
})


