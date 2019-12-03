let api = 'http://52.88.188.196:8080/api/api/where/';
let key = '?key=TEST';
let stopID = 'STA_ELMPUBWF';

//Runs On pageload
$(document).ready(start);

function start() {
    getStops();
    console.log(`👩`);
    runApp();
    $("#updateStyle").click(updateStyles);
}

function runApp() {//Add all of your running functions here
    // $("#app").replaceWith(`<div id=app></div>`);
    Displaytime();
    getTable();
}

//Update Style
function updateStyles() {
    let pcolor = $("#pcolor").val();
    let scolor = $("#scolor").val();
    let imageurl = $("#imageurl").val();
    $("body").css("color", `#${pcolor}`);
    $("#curtime").css("color", `#${pcolor}`);
    $("footer").css("color", `#${scolor}`);
    $("#logo").replaceWith(`<img id="logo" src="${imageurl}" alt="logo">`);
}

function Displaytime() {
    $.get(`${api}current-time.json${key}`, function (data) {
        let curtime = formatTime(data.data.entry.time);
        $('#app').append(`
        <div class="jumbotron">
        <h1 id="curtime">${curtime}</h1>
        </div>
        `);
    }, "jsonp");
}

function formatTime(humanreadble) {
    let fulldate = new Date(humanreadble);
    let hours = fulldate.getHours();
    let min = fulldate.getMinutes();
    if (hours > 12) {
        hours = hours - 12;
    };
    if (min < 10) {
        min = `0${min}`;
    };
    return (`${hours}:${min}`);
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
        <tbody id="routesTable">

        </tbody>
        </table>
        `);
        for (let i = 0; i < schedule.length; i++) {
            // console.log(schedule[i].routeId);
            console.log(schedule[i].stopRouteDirectionSchedules[0]);
            // let time = Math.round(schedule[i].stopRouteDirectionSchedules[0].scheduleStopTimes[0].arrivalTime.getTime() / 1000);
            let atime = new Date(schedule[i].stopRouteDirectionSchedules[0].scheduleStopTimes[0].arrivalTime * 1000.0);
            $('#routesTable').append(`
            <tr>
                <th scope="row">${schedule[i].routeId}</th>
                <td>${schedule[i].stopRouteDirectionSchedules[0].tripHeadsign}</td>
                <td>${formatTime(atime)}</td>
                <td>@twitter</td>
            </tr>
            `);
        }
        console.log('hey we got here');
        $("#app").append(`

        `);
    }, "jsonp");
}
//http://52.88.188.196:8080/api/api/where/routes-for-agency/STA.json?key=TEST
function getStops() {
    console.log("WE ARE IN GETSTOPS");
    $.get(`${api}routes-for-agency/STA.json${key}`, function (data) {
        console.log("made it here");
        console.log(data.data);

        let stopName = data.data.list[0].longName;
        console.log(stopName);
    }, "jsonp");
}

// How to update -> setintervals
// Departure Times are the intrested and the Predicted Departure/Arrival/?Actual? Time 
// Promises