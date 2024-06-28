import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const input = document.querySelector("#datetime-picker");
const button = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert("Please choose a date in the future");
      button.disabled = true;
    } else button.disabled = false;
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(input, options);

function handleStart(evt) {
  if (userSelectedDate != null) {
    button.disabled = false;
  }
  const timerId = setInterval(() => {
    let timeLeft = fp.selectedDates[0].getTime() - Date.now();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      return;
    }
    timeLeft = convertMs(timeLeft);
    days.textContent =
      timeLeft.days === 0
        ? "00"
        : timeLeft.days < 10
        ? "0" + timeLeft.days
        : timeLeft.days;

    hours.textContent =
      timeLeft.hours === 0
        ? "00"
        : timeLeft.hours < 10
        ? "0" + timeLeft.hours
        : timeLeft.hours;
    minutes.textContent =
      timeLeft.minutes === 0
        ? "00"
        : timeLeft.minutes < 10
        ? "0" + timeLeft.minutes
        : timeLeft.minutes;
    seconds.textContent =
      timeLeft.seconds === 0
        ? "00"
        : timeLeft.seconds < 10
        ? "0" + timeLeft.seconds
        : timeLeft.seconds;
  }, 1000);
}
button.addEventListener("click", handleStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
