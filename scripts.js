let api = 'http://52.88.188.196:8080/api/api/where/';
let key = '?key=TEST';
//Runs On pageload
console.log(`👩`);
runApp();


function runApp() {//Add all of your functionss here
    time();
}

function time() {
    $.get(`${api}current-time.json${key}`, function (data) {
        let curtime = new Date(data.data.entry.readableTime);
        let hours = curtime.getHours();
        let min = curtime.getMinutes();
        if (hours > 12) {
            hours = hours - 12;
        };
        if (min < 10) {
            min = `0${min}`;
        };
        $('#app').append(`<h1>${hours}:${min}</h1>`);
    }, "jsonp");
    return time;
}

// How to update -> setintervals
// Departure Times are the intrested and the Predicted Departure/Arrival/?Actual? Time 
// Promises