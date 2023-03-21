import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    datetimePickerEl: document.querySelector('#datetime-picker'),
    startButEl: document.querySelector('button[data-start]'),
    dayCounter: document.querySelector('span[data-days]'),
    hoursCounter: document.querySelector('span[data-hours]'),
    minutesCounter: document.querySelector('span[data-minutes]'),
    secondsCounter: document.querySelector('span[data-seconds]'),
}

let choosenDate;
refs.startButEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < this.now) {
            window.alert("Please choose a date in the future")
        } else {
            refs.startButEl.disabled = false;
            choosenDate = selectedDates[0];
        }
    },
};

const calendar = flatpickr(refs.datetimePickerEl, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

refs.startButEl.addEventListener('click', onButClickCounterTimeLeft)

function onButClickCounterTimeLeft() {
    setInterval(() => {
        const currentDate = new Date();
        const amountMs = choosenDate - currentDate;
        const timeLeft = convertMs(amountMs);

        refs.dayCounter.textContent = timeLeft.days;
        refs.hoursCounter.textContent = timeLeft.hours;
        refs.minutesCounter.textContent = timeLeft.minutes;
        refs.secondsCounter.textContent = timeLeft.seconds;
    }, 1000)
}

