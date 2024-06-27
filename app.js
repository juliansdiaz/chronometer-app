//Select DOM elements
const chronometer = document.getElementById("chronometer");
const startPauseBtn = document.getElementById("start-pause-btn");
const restartBtn = document.getElementById("restart-btn");

//Declare time variables
let [hours, minutes, seconds] = [0, 0, 0];
let timeRange;

//Set chronometer status
let chronometerStatus = "Paused";

function UpdateChronometer() {
  seconds++;

  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;

    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }

  //Set time format
  const formattedSeconds = AsignFormat(seconds);
  const formattedMinutes = AsignFormat(minutes);
  const formattedHours = AsignFormat(hours);

  //Update time format
  chronometer.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function AsignFormat(timeUnit) {
  return timeUnit < 10 ? '0' + timeUnit : timeUnit
}

function ChangeStartButton() {
  startPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'
  startPauseBtn.classList.remove("start");
  startPauseBtn.classList.add("pause");
  chronometerStatus = "Counting";
}

function ChangePauseButton() {
  startPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
  startPauseBtn.classList.remove("pause");
  startPauseBtn.classList.add("start");
  chronometerStatus = "Paused";
}

startPauseBtn.addEventListener('click', function () {
  if (chronometerStatus === "Paused") {
    timeRange = window.setInterval(UpdateChronometer, 1000); //Start chronometer
    ChangeStartButton();
  }
  else {
    window.clearInterval(timeRange); //Pause chronometer
    ChangePauseButton();
  }
})

restartBtn.addEventListener('click', function () {
  window.clearInterval(timeRange);

  hours = 0;
  minutes = 0;
  seconds = 0;

  chronometer.innerText = "00:00:00";
  ChangePauseButton();
});