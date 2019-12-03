let api = 'http://52.88.188.196:8080/api/api/where/';
let key = '?key=TEST';
let pcolor = '';
let scolor = '';
let imageurl = '';

//Runs On pageload
$(document).ready(start);

function start() {
    console.log(`👩`);
    runApp();
    $("#updateStyle").click(updateStyles);
}

function runApp() {//Add all of your running functions here
    time();
}

//Update Style
function updateStyles() {
    pcolor = $("#pcolor").val();
    scolor = $("#scolor").val();
    imageurl = $("#imageurl").val();
    $("body").css("color", `#${pcolor}`);
    $("#curtime").css("color", `#${pcolor}`);
    $("footer").css("color", `#${scolor}`);
    $("#logo").replaceWith(`<img id="logo" src="${imageurl}" alt="logo">`);
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
        $('#app').append(`
        <div class="jumbotron">
        <h1 id="curtime">${hours}:${min}</h1>
        </div>
        `);
    }, "jsonp");
    return time;
}

// How to update -> setintervals
// Departure Times are the intrested and the Predicted Departure/Arrival/?Actual? Time 
// Promises