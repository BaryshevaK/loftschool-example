var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var serveIndex = require('serve-index');

var users = [];


app.use(express.json());       // to support JSON-encoded bodies

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/users', function(req, res){
    const myUser = req.body;
    myUser.userId = uuidv4();
    console.log(myUser)
    res.send(myUser);
});

app.get('/users', function(req, res){
    res.send(users);
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

app.get('/requester.js', function(req, res){
    res.sendFile(__dirname + '/requester.js');
});

app.use('/images', express.static('images'));



io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg, user, time){
        io.emit('chat message', msg, user, time);
    });
    socket.on('login', function(FIO, nickname){
        newId = this.id
        newUser = { FIO: FIO, nickname: nickname, userId:newId, imgSrc:'/images/emptyUser.png'}
        users.push(newUser)
        io.emit('login', FIO, nickname, this.id, users.length);
        console.log(`User ${nickname} (${FIO}) logged in. Id is ${this.id}`);
        console.log(`Currently in chat: ${users.length} users`)
    });
    socket.on('disconnect', function(){
        console.log('User' + this.id + 'disconnected');
        users = users.filter(user => user.userId!== this.id);
        console.log(`Currently in chat: ${users.length} users`)
        io.emit('logoff', this.id, users.length);
    });

    socket.on('changePic', function(userId, imgsrc){
        io.emit('changePic', userId, imgsrc);
    });
});

io.emit('some event', { for: 'everyone' });



http.listen(3000, function(){
  console.log('listening on *:3000');
});


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }