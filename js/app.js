


// Set up reference to DOM

const calendar = document.getElementById('calendar');
const aptTable = document.getElementById('apt-table');


// Set up event listeners

calendar.addEventListener('change', print);
aptTable.addEventListener('click', whichRow);


// Set up calendar picker

(function setUpCalendarPicker() {
    let today = new Date();
    
    let in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    let minDate = buildDateString(today);
    let maxDate = buildDateString(in30Days);

    setDateRange(minDate, maxDate);
    selectTodaysDate(minDate);

})();

function buildDateString(date) {
    let dateStr = '';
    dateStr = dateStr + date.getFullYear() + '-';
    if (date.getMonth() + 1 < 10) {
        dateStr += 0;
    }
    dateStr = dateStr + (date.getMonth() + 1) + '-' + date.getDate();
    return dateStr;
}

function setDateRange(minDate, maxDate) {
    calendar.setAttribute('min', minDate);
    calendar.setAttribute('max', maxDate);
}

function selectTodaysDate(date) {
    calendar.value = date;
}


let lastSelection = '';

function whichRow(e) {
    resetLastSelection(lastSelection);
    
    lastSelection = e.target;
    console.log(e.target.getAttribute('data'));
    e.target.style.backgroundColor = 'coral';

}

let counter = 0;
function resetLastSelection(item) {
    if (counter !== 0) {
        item.style.backgroundColor = 'lightGrey';        
    }
    counter++;
}







let apts = [];

const apt1 = new Date(2018, 4, 25, 10);
const apt2 = new Date(2018, 4, 25, 11);
const apt3 = new Date(2018, 4, 25, 12);
const apt4 = new Date(2018, 4, 26, 12);

apts.push(apt1);
apts.push(apt2);
apts.push(apt3);
apts.push(apt4);

console.log(apts);

function checkIfThatDay(apt) {
    console.log(apt.getDate());
    if (apt.getDate() === 25) {
        console.log('ues');
    } else {
        console.log('no');
    }
}

checkIfThatDay(apt1);

for (let i=0; i<apts.length; i++) {
    if (apts[i].getDate() === 25) {
        console.log(apts[i].toString());
    } else {
        console.log('not on the 25th');
    }
}

const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

function checkIfThatHour(apt) {
    if (apt.getHours() === 10) {
        console.log('yes hour');
    } else {
        console.log('no hour');
    }
}

checkIfThatHour(apt1);

function displayAvailableApts(day) {
    let todaysApts = apts.filter(function (val) {
        return val.getDate() === day;
    });
    console.log(todaysApts);

    let takenSlots = [];

    for (let i=0; i<todaysApts.length; i++) {
        takenSlots.push(todaysApts[i].getHours());
    }

    console.log(takenSlots);

    let availableApts = [];

    for (let i=0; i<times.length; i++) {
        if (!takenSlots.includes(times[i])) {
            availableApts.push(times[i]);
        }
    }

    console.log(availableApts);

    for (let i = 0; i < aptTable.rows.length; i++) {
        if (availableApts.includes(Number(aptTable.rows[i].cells[0].getAttribute('data')))) {
            aptTable.rows[i].style.backgroundColor = 'grey';
        } else {
            aptTable.rows[i].style.backgroundColor = 'red';
        }
    }    

}






displayAvailableApts(25);


// Display selected date


function print(e) {
    console.log(e.target.value);
    let selectedDay = e.target.value;
    let trimSelectedDay = selectedDay.slice(selectedDay.length -2, selectedDay.length);
    console.log(trimSelectedDay);
    let day = Number(trimSelectedDay);
    console.log(day);
    displayAvailableApts(day);
}




