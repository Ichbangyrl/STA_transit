let api = 'http://52.88.188.196:8080/api/api/where/';
let key = '?key=TEST';
let pcolor = '';
let scolor = '';
let imageurl = '';
let stopID = 'STA_ELMPUBWF';

//Runs On pageload
$(document).ready(start);

function start() {
    console.log(`👩`);
    runApp();
    $("#updateStyle").click(updateStyles);
}

function runApp() {//Add all of your running functions here
    // $("#app").replaceWith(`<div id=app></div>`);
    time();
    getTable();
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
}

function getTable() {
    $.get(`${api}schedule-for-stop/${stopID}.json${key}`, function (data) {
        let schedule = data.data.entry.stopRouteSchedules;
        console.log(schedule);
        $('#app').append(`
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Route #</th>
            <th scope="col">Arrival</th>
            <th scope="col">Departure</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        </table>
        `);
        for (let i = 0; i < schedule.length; i++) {
            console.log(schedule[i].routeId);
            console.log(schedule[i]);
            $('#app').append(`
            <tr>
            <th scope="col">Route #</th>
            <th scope="col">Arrival</th>
            <th scope="col">Departure</th>
            <th scope="col">Status</th>
          </tr>
            `);
        }
        console.log('hey we got here');
        $("#app").append(`
        </tbody>
        <p> WOO </p>

        `);
    }, "jsonp");
}

// How to update -> setintervals
// Departure Times are the intrested and the Predicted Departure/Arrival/?Actual? Time 
// Promises