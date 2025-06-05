import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const buttonStart = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;
buttonStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      buttonStart.disabled = false;
      checkSelectedDate(selectedDates[0]);
    },
};

flatpickr('#datetime-picker', options);
  buttonStart.addEventListener('click', () => {
    const selectedDate = new Date(inputEl.value);
    inputEl.disabled = true;

    checkSelectedDate(selectedDate);
    buttonStart.disabled = true;
    buttonStart.classList.toggle('isActive');
    startCountdown(selectedDate);
});

function checkSelectedDate(date) {
  if (date < new Date()) {
    iziToast.error({
      // title: 'Error',
      backgroundColor: "#ef4040",
      timeout: 2000,
      position: "topRight",
      message: "Please choose a date in the future",
    });
    buttonStart.disabled = true;
    return;
  }
}

function startCountdown(value) {

  function updateCountdown() {
    const timeLeft = getTimeRemaining(value);
    daysValue.textContent = addLeadingZero(timeLeft.days);
    hoursValue.textContent = addLeadingZero(timeLeft.hours);
    minutesValue.textContent = addLeadingZero(timeLeft.minutes);
    secondsValue.textContent = addLeadingZero(timeLeft.seconds);

    if (timeLeft.total <= 1000) {
      clearInterval(countdownIntervalId);
      buttonStart.disabled = false;
      iziToast.success({
        // title: 'OK',
        backgroundColor: "#b5ea7c",
        timeout: 2000,
        position: "topRight",
        message: 'Successfully inserted record!',
      });
      buttonStart.classList.toggle('isActive');
      buttonStart.disabled = true;
      inputEl.disabled = false;
    }
  }

  updateCountdown();

  countdownIntervalId = setInterval(updateCountdown, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function getTimeRemaining(endValue) {
  const total = endValue.getTime() - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}