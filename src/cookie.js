/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    filter();
});

addButton.addEventListener('click', () => {
    addCookie();
});

function addCookieToTable(name, value) {
    var trElemCount = listTable.children.length;

    for (let i = 0; i < trElemCount; i++) {
        if (listTable.children[i].children[0].textContent === name) {
            listTable.children[i].children[1].textContent = value;

            return;
        }
    }

    const newItem = document.createElement('tr');
    const nameItem = document.createElement('td');
    const valueItem = document.createElement('td');
    const buttonTd = document.createElement('td');
    const buttonDel = document.createElement('button');

    valueItem.textContent = value;
    nameItem.textContent = name;
    buttonDel.textContent = 'Удалить';

    buttonTd.appendChild(buttonDel);
    newItem.appendChild(nameItem);
    newItem.appendChild(valueItem);
    newItem.appendChild(buttonTd);

    listTable.appendChild(newItem);
    buttonDel.addEventListener('click', () => {
        deleteCookie(nameItem.textContent);
        listTable.removeChild(newItem);
    });
}

function deleteCookie(name) {
    var date = new Date(0);

    document.cookie = name + '=; expires=' + date.toUTCString();
}

function isMatching(name, value, chunk) {
    if (( name.indexOf( chunk ) + 1 ) || ( value.indexOf( chunk ) + 1 )) {
        return true;
    }

    return false;
}

function getCookies() {
    var pairs = document.cookie.split('; ');
    var cookies = [];

    for (var i=0; i<pairs.length; i++) {
        var pair = pairs[i].split('=');

        cookies.push(pair)
    }

    return cookies;
}

var filter = function() {
    var cookies = getCookies()

    listTable.innerHTML = '';
    cookies.map(cookie => (isMatching(cookie[0], cookie[1], filterNameInput.value) 
        && addCookieToTable(cookie[0], cookie[1])))
}

var addCookie = function() {
    var name = addNameInput.value;
    var value = addValueInput.value;

    document.cookie = name+'='+value;
    isMatching(name, value, filterNameInput.value) && addCookieToTable(name, value);
    filter();
}
