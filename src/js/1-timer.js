import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button");
startBtn.disabled = true;

let userSelectedDate;


const timeChange = time => {
    const userSelectedDateString = userSelectedDate.join("");
    const currentUnixTime = Date.now();
    const timeDifference = userSelectedDateString - currentUnixTime;
    return timeDifference;
};


flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates,) {
        const unixTime = selectedDates[0].getTime();
        userSelectedDate = [unixTime];
        const difference = timeChange(unixTime);
        console.log(difference);
        
        const validDate = date => {
            return new Promise((resolve, reject) => {
                if (date < 0) {
                    reject(alert("Please choose a date in the future"));
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




// startBtn.addEventListener("click", )


// const input = document.querySelector("input");




// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
