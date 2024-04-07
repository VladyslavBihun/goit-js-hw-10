import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// const fieldset = document.querySelector("fieldset");
const form = document.querySelector(".form");
const inputDelay = document.querySelector('input');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
// const inputRejected = document.querySelector('input[value="rejected"]');
// const button = document.querySelector("button");

let delay;

inputDelay.addEventListener("input", (event) => {
    delay = event.currentTarget.value;
});

function handleSubmit (event) {
    event.preventDefault();

    return new Promise((resolve, reject) => {
        if (inputFulfilled.checked) {
            resolve(delay);
        } else {
            reject(delay);
        };
    });
};

form.addEventListener("submit", function(event) {
    handleSubmit(event)
        .then((delay) => {
            setTimeout(() => {
                iziToast.success({
                    message: `Fulfilled promise in ${delay}ms`,
                    theme: 'dark',
                    messageColor: '#fff',
                    messageSize: '16px',
                    messageLineHeight: '1,5',
                    backgroundColor: '#59A10D',
                    position: 'topRight',
                    progressBarColor: '#326101',
                    iconUrl: '../img/success.svg',
                });
            },delay)
        })
        .catch((delay) => {
            setTimeout(() => {
                iziToast.error({
                    message: `Rejected promise in ${delay}ms`,
                    theme: 'dark',
                    messageColor: '#fff',
                    messageSize: '16px',
                    messageLineHeight: '1,5',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                    progressBarColor: '#B51B1B',
                    iconUrl: '../img/error.svg',
                });
            }, delay)
        })
        .finally(() => {
            inputDelay.value = "";
            inputFulfilled.checked = false;
    })
});
