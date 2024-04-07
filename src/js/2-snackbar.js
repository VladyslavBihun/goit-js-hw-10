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
                    title: 'Success',
                    message: `✅ Fulfilled promise in ${delay}ms`
                });
            },delay)
        })
        .catch((delay) => {
            setTimeout(() => {
                iziToast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${delay}ms`
                });
            }, delay)
        })
        .finally(() => {
            inputDelay.value = "";
            inputFulfilled.checked = false;
    })
});
