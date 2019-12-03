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
    time();
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

}
//http://52.88.188.196:8080/api/api/where/routes-for-agency/STA.json?key=TEST
function getStops(){
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