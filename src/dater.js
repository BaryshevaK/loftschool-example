export default () => {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); 
    var year = currentDate.getFullYear();
    var yyyymmdd = year + '.' + pad(month + 1) + '.' + pad(date);
    var time = currentDate.toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    return yyyymmdd + ' ' + time
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}