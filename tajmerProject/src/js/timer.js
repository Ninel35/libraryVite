import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const input = document.querySelector("#datetime-picker");
const button = document.querySelector("[data-start]");
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
flatpickr(input, options);
function handleStart(evt) {
  if (userSelectedDate != null) {
    button.disabled = false;
  }
}
button.addEventListener("click", handleStart);
