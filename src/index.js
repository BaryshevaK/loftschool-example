/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
var sum = function(num, index, arr){
  console.log(num + 1);
}

forEach(numbers, sum);
*/
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

function map(array, fn) {
    var results = [];

    for (let i = 0; i < array.length; i++ ) {
        let result = fn(array[i], i, array);

        results.push(result);
    }

    return results; 
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    var i = 0;

    var result = initial;

    if (result == undefined) {
        result = array[i];
        i = i + 1;
    }

    while (i < array.length) {
        result = fn(result, array[i], i, array);
        i = i + 1;
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var array = [];

    for (var key in obj) {
        key = key.toUpperCase();
        array.push(key);
    }

    return array;
}
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from = 0, to = array.length) {
    if (from < -array.length) {
        from = 0;
    }

    if (to > array.length) {
        to = array.length;
    }

    if (from < 0) {
        from = array.length + from;
    }

    if (to < 0) {
        to = array.length + to;
    }

    var newarray = [];

    for (from; from < to; from++) {
        newarray.push(array[from]);
    }

    return newarray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
