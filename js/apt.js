// Load appointment data

const aptTimeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let apts = [];

(function loadAppointmentData() {
    const apt1 = new Date(2018, 4, 25, 10);
    const apt2 = new Date(2018, 4, 25, 11);
    const apt3 = new Date(2018, 4, 25, 12);
    const apt4 = new Date(2018, 4, 26, 12);

    apts.push(apt1, apt2, apt3, apt4);
})();


// Set up reference to DOM

const calendar = document.getElementById('calendar');
const aptDiv = document.getElementById('slot-times');
const bookBtnClicked = document.getElementById('book-btn');
const successDiv = document.getElementById('success');
const datePickerDiv = document.getElementById('date-picker');


// Set up event listeners

calendar.addEventListener('change', showApts);
aptDiv.addEventListener('click', selectTime);
bookBtnClicked.addEventListener('click', bookAppointment);


// Set up calendar picker

(function setUpCalendarPicker() {
    let today = new Date();

    let in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    let minDate = buildDateString(today);
    let maxDate = buildDateString(in30Days);

    setDateRange(minDate, maxDate);
    selectTodaysDate(minDate);
    displayAvailableApts(today);

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


// Display selected date
let selectedDay = '';

function showApts(e) {
    selectedDay = e.target.value;
    let trimSelectedDay = selectedDay.slice(selectedDay.length - 2, selectedDay.length);
    let day = Number(trimSelectedDay);
    displayAvailableApts(day);
    resetLastSelection(lastSelection);
}


// Display available time slots

function displayAvailableApts(day) {
    let availableApts = [];
    let takenSlots = [];

    let todaysApts = apts.filter(function (val) {
        return val.getDate() === day;
    });

    for (let i=0; i<todaysApts.length; i++) {
        takenSlots.push(todaysApts[i].getHours());
    }

    for (let i=0; i<aptTimeSlots.length; i++) {
        if (!takenSlots.includes(aptTimeSlots[i])) {
            availableApts.push(aptTimeSlots[i]);
        }
    }

    for (let i=0; i<aptDiv.children.length; i++) {
        let slot = aptDiv.children[i];
        
        if (availableApts.includes(Number(slot.getAttribute('data')))) {
            displayTimeSlot(slot, 'inline-block');
        } else {
            displayTimeSlot(slot, 'none');
        }
    }
}

function displayTimeSlot(cell, displayValue) {
    cell.style.display = displayValue;
}


// Select time slots

let lastSelection = '';

function selectTime(e) {
    if (e.target.getAttribute('class') === 'slot-time') {
        resetLastSelection(lastSelection);
        lastSelection = e.target;
        e.target.classList.add('select');
        // e.target.style.backgroundColor = '#cc9f56';
        // e.target.style.color = '#fff';
    } 
}

let counter = 0;
function resetLastSelection(item) {
    if (counter !== 0 && lastSelection !== '') {
        item.classList.remove('select');
    }
    counter++;
}

// Book Appointment

function bookAppointment() {
    apts.push(createDateString(selectedDay));
    hideAptSchedulingElements();
    displaySuccessMessage();
}

function createDateString(date) {
    let year = Number(date.slice(0, 4));
    let month = Number(date.slice(5, 7) - 1);
    let day = Number(date.slice(8, 10));
    let hours = Number(lastSelection.getAttribute('data'));
    let newApt = new Date(year, month, day, hours);
    return newApt;
}

function hideAptSchedulingElements() {
    aptDiv.style.display = 'none';
    bookBtnClicked.style.display = 'none';
    datePickerDiv.style.display = 'none';
}

function displaySuccessMessage() {
    successDiv.style.display = 'block';
}

// function checkIfThatDay(apt) {
//     console.log(apt.getDate());
//     if (apt.getDate() === 25) {
//         console.log('ues');
//     } else {
//         console.log('no');
//     }
// }

// checkIfThatDay(apt1);

// for (let i = 0; i < apts.length; i++) {
//     if (apts[i].getDate() === 25) {
//         console.log(apts[i].toString());
//     } else {
//         console.log('not on the 25th');
//     }
// }



// function checkIfThatHour(apt) {
//     if (apt.getHours() === 10) {
//         console.log('yes hour');
//     } else {
//         console.log('no hour');
//     }
// }

// checkIfThatHour(apt1);









