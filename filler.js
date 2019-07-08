export function fillUser(nickname, FIO, id, count) {
    setCount(count)
    //$('#users').append($(`<img id="img_${id}" src='/images/emptyUser.png' width=50 height=50>`));
    $('#users').append($(`<li id="${id}">`).text(`${nickname} (${FIO})`));
}

export function setCount(count) {
    if (count !== 0) {
        $('#participants').text(`Участники (${count}):`)
    }
    else {
        $('#participants').text('')
    }
}