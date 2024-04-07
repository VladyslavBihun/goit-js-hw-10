import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("input");
const startBtn = document.querySelector("button");
startBtn.disabled = true;
startBtn.addEventListener("click", handleClick);
const inputDays = document.querySelector("[data-days]");
const inputHours = document.querySelector("[data-hours]");
const inputMinutes = document.querySelector("[data-minutes]");
const inputSeconds = document.querySelector("[data-seconds]");

let userSelectedDate;

const timeDifference = time => {
    const currentUnixTime = Date.now();
    const difference = userSelectedDate - currentUnixTime;
    return difference;
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function handleClick() {

    const intervalId = setInterval(() => {
        const difference = timeDifference(userSelectedDate);
        const resultConvert = convertMs(difference);
        const { days, hours, minutes, seconds } = resultConvert;
        
        inputDays.textContent = addLeadingZero(days);
        inputHours.textContent = addLeadingZero(hours);
        inputMinutes.textContent = addLeadingZero(minutes);
        inputSeconds.textContent = addLeadingZero(seconds);
    }, 1000);

    const difference = timeDifference(userSelectedDate);
    setTimeout(() => {
        clearInterval(intervalId);
        input.disabled = false;
        startBtn.disabled = false;
    }, difference);

    input.disabled = true;
    startBtn.disabled = true;
};

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates,) {
        const unixTime = selectedDates[0].getTime();
        userSelectedDate = unixTime;
        const difference = timeDifference(unixTime);

        const validDate = date => {
            return new Promise((resolve, reject) => {
                if (date < 0) {
                    reject(iziToast.error({
                        message: 'Please choose a date in the future',
                        messageColor: '#fff',
                        messageSize: '16px',
                        messageLineHeight: '1,5',
                        backgroundColor: '#EF4040',
                        position: 'topRight',
                        progressBarColor: '#B51B1B',
                        theme: 'dark',
                        iconUrl: '/img/error.svg',
                    }));
                } else {
                    resolve();
                }
            });
        };
        
        validDate(difference)
            .then(() => {
                startBtn.disabled = false;
            })
            .catch(error => {
                error;
                startBtn.disabled = true;
            });
    },
});

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
};
