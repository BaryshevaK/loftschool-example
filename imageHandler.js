
var dropZone = $('#dropZone'),
maxFileSize = 524288; // максимальный размер файла - 1 КБ.

function changePic(socket, myUser) {
    var image = document.getElementById("img_currentUser");
    image.src = myUser.imgsrc;
    socket.emit('changePic',  myUser.nickname, myUser.imgsrc);
}


export default function(myUser, socket) {

    if (typeof(window.FileReader) == 'undefined') {
        dropZone.text('Не поддерживается браузером!');
        dropZone.addClass('error');
    }

    dropZone[0].ondragover = function() {
        dropZone.addClass('hover');
        return false;
    };
        
    dropZone[0].ondragleave = function() {
        dropZone.removeClass('hover');
        return false;
    };

    dropZone[0].ondrop = function(event) {
        event.preventDefault();
        dropZone.removeClass('hover');
        dropZone.addClass('drop');

        var file = event.dataTransfer.files[0];

        if (file.size > maxFileSize) {
            dropZone.text('Файл слишком большой!');
            dropZone.addClass('error');
            return false;
        }
        $('#upload').click(async function(e){
            var headers = Object.assign(
                {'nickname': myUser.nickname}
            )
            const data = new FormData();
            data.append('file', file);
            const response = await fetch('/upload', {
                method: 'post',
                headers: headers,
                body: data,
            }).then(r => r.json())
            const newUrl = response.destination + response.filename
            myUser.imgsrc = newUrl;
            changePic(socket, myUser)
        });
    };
};
