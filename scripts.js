let api = 'http://52.88.188.196:8080/api/api/where/';
let key = '?key=TEST';
let stopID = 'STA_ELMPUBWF';
let pcolor = '';
let scolor = '';
let imageurl = '';

//Runs On pageload
$(document).ready(start);

function start() {
    getStops();
    console.log(`👩`);
    runApp();
    // let timerId = setInterval(() => runApp(), 30000); //30 sec
    // setTimeout(() => { clearInterval(timerId); alert('Clock Stopped'); }, 60000); //One Min
    $("#updateStyle").click(updateStyles);
}

function runApp() {//Add all of your running functions here
    $("#app").replaceWith(`<div id=app></div>`);
    Displaytime();
    getTable();
}

//Update Style
function updateStyles() {
    pcolor = $("#pcolor").val();
    scolor = $("#scolor").val();
    imageurl = $("#imageurl").val();
    $("body").css("color", `#${pcolor}`);
    $("div.jumbotron").css("color", `#${pcolor}`);
    $("footer").css("color", `#${scolor}`);
    $("#logo").replaceWith(`<img id="logo" src="${imageurl}" alt="logo">`);
}

function Displaytime() {
    $.get(`${api}current-time.json${key}`, function (data) {
        let curtime = formatTime(data.data.entry.time);
        $('#app').append(`
        <div class="jumbotron">
        <h1 id="curtime">${curtime}</h1>
        <h2>${stopID}</h2>
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
    // <th scope="col">Departure Time(if different)</th>
    $.get(`${api}schedule-for-stop/${stopID}.json${key}`, function (data) {
        let schedule = data.data.entry.stopRouteSchedules;
        $('#app').append(`
        <table class="table table-bordered">
        <thead id="nextBus">
          <tr>
          <th scope="col">Stops aways</th>
            <th scope="col">Route #</th>
            <th scope="col">Scheduled/Estimated Arrival Time</th>
            <th scope="col">Status</th>
            
          </tr>
        </thead>
        <tbody id="routesTable">

        </tbody>
        </table>
        `);
        getArrival();
        for (let i = 0; i < schedule.length; i++) {
            // let time = Math.round(schedule[i].stopRouteDirectionSchedules[0].scheduleStopTimes[0].arrivalTime.getTime() / 1000);
            let arrivaltime = new Date(schedule[i].stopRouteDirectionSchedules[0].scheduleStopTimes[0].arrivalTime * 1000.0);
            let departuretime = new Date(schedule[i].stopRouteDirectionSchedules[0].scheduleStopTimes[0].departureTime * 1000.0);
            console.log(schedule[i]);
            $('#routesTable').append(`
            <tr>
            <td></td>
                <th scope="row">${schedule[i].routeId} ${schedule[i].stopRouteDirectionSchedules[0].tripHeadsign}</th>
                <td>${formatTime(arrivaltime)}</td>
                <td>Scheduled</td>
            </tr>
            `);
        }

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

function getArrival() {
    $.get(`${api}arrivals-and-departures-for-stop/${stopID}.json${key}`, function (data) {
        if (data.data.entry.arrivalsAndDepartures[0] == null) {
            $('#nextBus').append(`
            <tr  class="bg-danger">
                <th colspan="4"> No Data On Next Bus </th>
            </tr>
            `);
        } else {
            let nextBus = data.data.entry.arrivalsAndDepartures[0];
            let arrivalTime = formatTime(nextBus.predictedArrivalTime);
            let status = nextBus.tripStatus.status
            if (nextBus.tripStatus.status == 'SCHEDULED') {
                status = 'On Time';
            }

            if (nextBus.numberOfStopsAway >= 0) {
                if (nextBus.numberOfStopsAway < 1) {
                    console.log('pop');
                    popUp();
                }
                $('#nextBus').append(`
            <tr  class="bg-warning">
            <td>${nextBus.numberOfStopsAway}</td>
                <th scope="row">${nextBus.routeShortName} - ${nextBus.routeLongName}</th>
                <td>${arrivalTime}</td>
                <td>${status}</td>
                
            </tr>
            `);
            }

        }

    }, "jsonp");

}

function popUp() {
    console.log('up');

    $('.jumbotron').append(`
    <div class="alert alert-warning alert-dismissible fade in">
    <audio autoplay><source src="mysound.mp3" type="audio/mpeg" /></audio>
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
    </div>
`);
}