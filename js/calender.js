
// Calculating time 

const getTime = () => {
    let dateObj = new Date();
    var time = dateObj.toLocaleTimeString();
    document.getElementById('time').innerText = time;
}
setInterval(getTime, 1000);


function today() {
    location.reload();
}

// getting user location
const getMyLocation = async (myApi) => {

    let response = await fetch(myApi);
    let resObj = await response.json();
    let res = resObj.results;

    let output = "";
    res.map((element) => {
        output += element.components.city + ", " + element.components.state + ", " + element.components.country;
    })
    // console.log(output);
    document.getElementById('location').innerText = output;
}

function getCoordinates(position) {
    // console.log(position);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var myApi = "https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=c316905d0d394c0b8b5769c73f6609de";
    getMyLocation(myApi);

}

const displayLocation = () => {
    getTime();
    reloadCalender();
    navigator.geolocation.getCurrentPosition(getCoordinates);
}

// getting year 
var dtObj = new Date();
let yearOptag = document.getElementById('year');
for (let i = 1922; i <= 2122; i++) {
    let yrOptag = document.createElement('option');
    yrOptag.textContent = i;
    yrOptag.value = i;
    yearOptag.appendChild(yrOptag);
    if (i == dtObj.getFullYear()) {
        yrOptag.setAttribute('selected', 'selected');
    }

}

// getting month 

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let monthOptag = document.getElementById('month');
for (let i = 0; i < months.length; i++) {
    let mnthopTag = document.createElement('option');
    mnthopTag.textContent = months[i];
    mnthopTag.value = months[i];
    monthOptag.appendChild(mnthopTag);
    if (months[dtObj.getMonth()] == months[i]) {
        // console.log(months[dtObj.getMonth()], months[i] + " h");
        mnthopTag.setAttribute('selected', 'selected');
    }
}

// Rendering Calender
const reloadCalender = () => {
    dtObj.setDate(1);

    let tDysInMnth = new Date(
        dtObj.getFullYear(),
        dtObj.getMonth() + 1,
        0
    ).getDate();

    let prevDay = new Date(
        dtObj.getFullYear(),
        dtObj.getMonth(),
        0
    ).getDate();

    let firstDayIndex = dtObj.getDay();

    let lastDayIndex = new Date(
        dtObj.getFullYear(),
        dtObj.getMonth() + 1,
        0
    ).getDay();

    let nextDays = 7 - lastDayIndex - 1;
    document.getElementById('calHeading').innerText = months[dtObj.getMonth()] + " " + dtObj.getFullYear();
    let dates = "";

    for (let j = firstDayIndex; j > 0; j--) {
        dates += "<p class='inactive' data-bs-toggle='tooltip' data-bs-placement='top' title='Add Event' >" + `${prevDay - j + 1}` + "</p>";
    }

    for (i = 1; i <= tDysInMnth; i++) {
        if (i == new Date().getDate() && dtObj.getMonth() == new Date().getMonth() && dtObj.getFullYear() == new Date().getFullYear()) {
            dates += "<p class='active pic' data-bs-toggle='tooltip' data-bs-placement='top' title='Add Event'>" + i + "</p>";
        } else {
            dates += "<p data-bs-toggle='tooltip' data-bs-placement='top' title='Add Event'>" + i + "</p>";
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        dates += "<p class='inactive pic' data-bs-toggle='tooltip' data-bs-placement='top' title='Add Event'> >" + j + "</p>";

    }
    document.getElementById('days').innerHTML = dates;
}
const prevMonth = () => {
    dtObj.setMonth(dtObj.getMonth() - 1);
    reloadCalender();
}

const nextMonth = () => {
    dtObj.setMonth(dtObj.getMonth() + 1);
    reloadCalender();
}

const changeYear = () => {
    let year = document.getElementById("year").value;
    dtObj.setFullYear(year);
    reloadCalender();
}

const changeMonth = () => {
    let month = document.getElementById('month').value;
    let monthKey = months.indexOf(month);
    // console.log(monthKey);
    dtObj.setMonth(monthKey);
    reloadCalender();
}




function getLocalStrgArrData() {
    return JSON.parse(localStorage.getItem('events'));
}

function setLocalStrgArrData(arr) {
    localStorage.setItem('events', JSON.stringify(arr));
}

function deleteEvent(delId) {
    let arr = getLocalStrgArrData();
    arr.splice(delId, 1);
    setLocalStrgArrData(arr);
    showEvents();
}
function confirmation(delId) {

    if (confirm("Are you sure want to delete this event...?") == true) {
        deleteEvent(delId);
    }
}
function showEvents() {

    let arr = getLocalStrgArrData();
    // console.log(arr + " no");
    if (arr != null) {
        let evList = "";
        let sno = 1;
        for (let i in arr) {

            evList += `
            <li >${arr[i]} &nbsp;&nbsp;&nbsp; <span class="fa fa-close text-danger" onclick="confirmation(${i})"> </span></li>`;
        }
        document.getElementById('evList').innerHTML = evList;
    }
}


const addEvent = (cdate) => {

    let inputEvent = prompt("Add your event below....");

    id = "";
    if (inputEvent) { // promt true
        if (inputEvent.length > 2) {

            if (id == '') { // Addition

                dtObj.setDate(cdate);
                let eventDate = dtObj.getDate();
                let eventMonth = dtObj.getMonth();
                let eventYear = dtObj.getFullYear();
                let eventVal = eventDate + "~" + eventMonth + "~" + eventYear + " " + inputEvent;

                let arr = getLocalStrgArrData();
                if (arr == null) {
                    let data = [eventVal];
                    setLocalStrgArrData(data);
                } else {
                    arr.push(eventVal);
                    setLocalStrgArrData(arr);
                }

                alert("data inserted");
            } else { // Updation/Edit

            }

        } else {
            alert('please enter word more than length 3');
        }
    } else { // prompt false
        console.log(inputEvent);
    }
    showEvents();
}
showEvents();

let p = document.querySelectorAll('p');
for (item of p) {
    item.addEventListener('click', (e) => {
        pText = e.target.innerText;
        let intVal = parseInt(pText);
        addEvent(intVal);
    })
    break;
}

let liLength = getLocalStrgArrData();
if (liLength.length < 1) {
    document.getElementById('evList').innerHTML = "<h6 >No event added...😧</h6>";
}


// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
