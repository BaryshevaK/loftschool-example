import requestUsers from './requester.js'
import { fillUser, setCount } from './filler.js'
import imageHandler from './imageHandler.js'
var myUser = {
    socketId: '',
    nickname: '',
    FIO: '',
    imgsrc: '/images/emptyUser.png',
}



async function main() {
    var socket = io();
    requestUsers();
    $('#cancel').click(async function(e){
        e.preventDefault();
    });
    $('#upload').click(async function(e){
        e.preventDefault();
    });
    $('#enter').click(async function(e){
        e.preventDefault(); // prevents page reloading
        myUser.nickname = $('#nickname').val();
        
        myUser.FIO = $('#FIO').val();
        console.log('User logged in:')
        console.log(myUser)
        $('#messageInput').removeAttr('disabled');
        socket.emit('login',  myUser.FIO, myUser.nickname);
        document.getElementById("overlay").style.display = "none";

        $('#currentUser').text( myUser.FIO)
        var image = document.getElementById("img_currentUser");
        imageHandler(myUser, socket)
        return false;
    });
    socket.on('chat message', function(msg, user, time){
        $('#messages').append($(`<img class="img_${user.nickname}" src="${user.imgsrc}" height=25 weight=25> <div> ${time} </div>`));
        $('#messages').append($(`<li class="msg_${user.nickname}">`).text(user.nickname + ': ' + msg));
    })

    socket.on('login', function(FIO, nickname, id, count){
        fillUser(nickname, FIO, id, count)
    })

    socket.on('changePic', function(nickname, imgSrc){
        Array.from(document.getElementsByClassName(`img_${nickname}`)).forEach(image=>{
            console.log(image);
            image.src=imgSrc;
        });
    })

    socket.on('logoff', function(id, count){
        setCount(count)
        $(`#img_${id}`).remove();
        $(`#${id}`).remove();
    })

    $('#send').submit(function(e){
        e.preventDefault(); // prevents page reloading
        var today = new Date();
        var time = pad(today.getHours()) + ":" + pad(today.getMinutes())
        socket.emit('chat message', $('#messageInput').val(), myUser, time);
        $('#messageInput').val('');
        return false;
    });

};
main();

function pad(n) {
    return n < 10 ? '0' + n : n;
}