// Create Appointment class

class Appointment {
    constructor(name, email, phone, service, datetime) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.datetime = datetime;
    }
}


// Load appointment data

const aptTimeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let apts = [];

(function loadLocalStorageData() {
    if (localStorage.getItem('appointments') === null) {
        localStorage.setItem('appointments', JSON.stringify(apts));
    } else {
        apts = JSON.parse(localStorage.getItem('appointments'));
        for (let i=0; i<apts.length; i++) {
            const year = parseInt(apts[i].datetime.toString().substring(0, 4), 10);
            const month = parseInt(apts[i].datetime.toString().substring(5, 7), 10) - 1;
            const day = parseInt(apts[i].datetime.toString().substring(8, 10), 10);
            const hours = parseInt(apts[i].datetime.toString().substring(11, 13), 10);

            const date = new Date(Date.UTC(year, month, day, hours));
            apts[i].datetime = date;
        }
    }
})();

// Declare global variables

let selectedDay = '';
let lastSelection = '';
let counter = 0;


// Set up reference to DOM

const calendar = document.getElementById('calendar');
const aptDiv = document.getElementById('slot-times');
const bookBtnClicked = document.getElementById('book-btn');
const successDiv = document.getElementById('success');
const datePickerDiv = document.getElementById('date-picker');
const aptForm = document.getElementById('apt-form');
const instruction = document.getElementById('instruction');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const haircutInput = document.getElementById('haircut');
const shaveInput = document.getElementById('shave');
const errorMessage = document.getElementById('error');


// Set up event listeners

calendar.addEventListener('change', showApts);
aptDiv.addEventListener('click', selectTime);
bookBtnClicked.addEventListener('click', bookAppointment);


// Set up calendar picker

(function setUpCalendarPicker() {
    const today = new Date();

    let in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    const minDate = buildDateString(today);
    const maxDate = buildDateString(in30Days);

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
    dateStr += date.getMonth() + 1 + '-';
    if (date.getDate() < 10) {
        dateStr += 0;
    }
    dateStr += date.getDate();
    return dateStr;
}

function setDateRange(minDate, maxDate) {
    calendar.setAttribute('min', minDate);
    calendar.setAttribute('max', maxDate);
}

function selectTodaysDate(date) {
    calendar.value = date;
    selectedDay = calendar.value;
}


// Display selected date

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
        return val.datetime.getDate() === day;
    });

    for (let i=0; i<todaysApts.length; i++) {
        takenSlots.push(todaysApts[i].datetime.getHours() + 4);
        // .getHours() + 4 is for the timezone offset EDT
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


function selectTime(e) {
    if (e.target.getAttribute('class') === 'slot-time') {
        resetLastSelection(lastSelection);
        lastSelection = e.target;
        e.target.classList.add('select');
    } 
}

function resetLastSelection(item) {
    if (counter !== 0 && lastSelection !== '') {
        item.classList.remove('select');
    }
    counter++;
}

// Book Appointment

function bookAppointment() {
    if (validateInputs()) {
        const service = getAppointmentService(haircutInput.checked, shaveInput.checked);
        
        const newApt = new Appointment(nameInput.value, emailInput.value, phoneInput.value, service, createDateObject(selectedDay));
        
        apts.push(newApt);
        localStorage.setItem('appointments', JSON.stringify(apts));

        hideAptSchedulingElements();
        displaySuccessMessage();
    }
}

function createDateObject(date) {
    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(5, 7) - 1);
    const day = Number(date.slice(8, 10));
    const hours = Number(lastSelection.getAttribute('data'));
    return new Date(Date.UTC(year, month, day, hours));
}

function hideAptSchedulingElements() {
    aptDiv.style.display = 'none';
    bookBtnClicked.style.display = 'none';
    datePickerDiv.style.display = 'none';
    aptForm.style.display = 'none';
    instruction.style.display = 'none';
    errorMessage.style.display = 'none';
}

function displaySuccessMessage() {
    successDiv.style.display = 'block';
}

// Validate all input fields before creating appointment

function validateInputs() {
    let isValid = false;
    if (nameInput.value && emailInput.value && phoneInput.value && (haircutInput.checked || shaveInput.checked)) {
        isValid = true;
    } else {
        errorMessage.style.display = 'block';
    }
    return isValid;
}

function getAppointmentService(haircut, shave) {
    let serviceStr = '';
    if (haircut && shave) {
        serviceStr = 'haircut and shave';
    } else if (haircut) {
        serviceStr = 'haircut';
    } else if (shave) {
        serviceStr = 'shave';
    }
    return serviceStr;
}

