import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDelay = document.querySelector('input');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('input[value="rejected"]');

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const delay = inputDelay.value;
    inputDelay.value = ""; 
    
    const state = inputFulfilled.checked ? "fulfilled" : "rejected";
    inputFulfilled.checked = false; 
    inputRejected.checked = false; 
    
    const promise = new Promise((resolve, reject) => {
        if (state === "fulfilled") {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else {
            setTimeout(() => {
                reject(delay);
            }, delay);
        }
    });

    promise
        .then((delay) => {
            iziToast.success({
                message: `Fulfilled promise in ${delay}ms`,
                theme: 'dark',
                messageColor: '#fff',
                messageSize: '16px',
                messageLineHeight: '1.5',
                backgroundColor: '#59A10D',
                position: 'topRight',
                progressBarColor: '#326101',
            });
        })
        .catch((delay) => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
                theme: 'dark',
                messageColor: '#fff',
                messageSize: '16px',
                messageLineHeight: '1.5',
                backgroundColor: '#EF4040',
                position: 'topRight',
                progressBarColor: '#B51B1B',
            });
        });
});
