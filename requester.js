import {fillUser} from './filler.js'

export default async (url = '/users') => {
// Значения по умолчанию обозначены знаком *
    var users  = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    })
    .then(response => response.json()); // парсит JSON ответ в Javascript объект
   
    users.forEach(user => {
        fillUser(user.nickname, user.FIO, user.id, users.length)
    });
    console.log(users)
}