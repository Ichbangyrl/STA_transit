let api = 'http://52.88.188.196:8080/api/api/where/';
let key = '?key=TEST';
//Runs On pageload
console.log(`👩`);
runApp();


function runApp() {
    time();
}

function time() {
    $.get(`${api}current-time.json${key}`, function (data) {
        let curtime = new Date(data.data.entry.readableTime);
        let hours = curtime.getHours()
        if (hours > 12) {
            hours = hours - 12;
        }
        $('#app').append(`<h1>${hours}:${curtime.getMinutes()}</h1>`);
    }, "jsonp");
    return time;
}

// How to update -> setintervals
