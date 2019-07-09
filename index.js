var express = require('express')
var multer  = require('multer')
require( 'string.prototype.startswith' );

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var serveIndex = require('serve-index');

var users = [];

var upload = multer( { dest: 'uploads/' } );


app.use(express.json());       // to support JSON-encoded bodies

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/users', function(req, res){
    res.send(users);
});

app.post('/upload', upload.single( 'file' ), function(req, res, next) {
    if ( !req.file.mimetype.startsWith( 'image/' ) ) {
        return res.status( 422 ).json( {
          error : 'The uploaded file must be an image'
        } );
      }
    console.log(req.headers)
    console.log(req.file); // the uploaded file object
    res.status( 200 ).send( req.file )
});

app.get('/app.js', function(req, res){
    res.sendFile(__dirname + '/app.js');
});

app.get('/filler.js', function(req, res){
    res.sendFile(__dirname + '/filler.js');
});

app.get('/index.css', function(req, res){
    res.sendFile(__dirname + '/index.css');
});

app.get('/imageHandler.js', function(req, res){
    res.sendFile(__dirname + '/imageHandler.js');
});

app.get('/requester.js', function(req, res){
    res.sendFile(__dirname + '/requester.js');
});

app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));



io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg, user, time){
        io.emit('chat message', msg, user, time);
    });
    socket.on('login', function(FIO, nickname){
        const socketId = this.id
        newUser = { FIO: FIO, nickname: nickname, socketId:socketId, imgSrc:'/images/emptyUser.png'}
        users.push(newUser)
        io.emit('login', FIO, nickname, this.id, users.length);
        console.log(`User ${nickname} (${FIO}) logged in. Id is ${this.id}`);
        console.log(`Currently in chat: ${users.length} users`)
    });
    socket.on('disconnect', function(){
        console.log('User' + this.id + 'disconnected');
        users = users.filter(user => user.socketId !== this.id);
        console.log(`Currently in chat: ${users.length} users`)
        io.emit('logoff', this.id, users.length);
    });

    socket.on('changePic', function(nickname, imgsrc){
        io.emit('changePic', nickname, imgsrc);
    });
});

io.emit('some event', { for: 'everyone' });



http.listen(3000, function(){
  console.log('listening on *:3000');
});
