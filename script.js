let stepsHistory = [];
let exerciseHistory = [];
let foodHistory = [];
let waterHistory = [];
let sleepHistory = [];
let totalSteps = 0;

// Helper Functions
function convertToSeconds(timeString) {
  const date = new Date(timeString);
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); // Convert to seconds
}

function convertToTimeFormat(seconds) {
  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const remainingSeconds = date.getUTCSeconds();
  const period = hours >= 12 ? 'PM' : 'AM';
  const twelveHourFormat = hours % 12 || 12;
  return `${twelveHourFormat.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')} ${period}`;
}

// Open Tabs
function openTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
}

// Add event listeners for navigation buttons
document.getElementById('steps-tab').addEventListener('click', () => openTab('steps-tab-content'));
document.getElementById('exercise-tab').addEventListener('click', () => openTab('exercise-tab-content'));
document.getElementById('food-tab').addEventListener('click', () => openTab('food-tab-content'));
document.getElementById('water-tab').addEventListener('click', () => openTab('water-tab-content'));
document.getElementById('sleep-tab').addEventListener('click', () => openTab('sleep-tab-content'));

// Log Steps
function logSteps() {
  const stepsInput = document.getElementById('steps');
  const timeInput = document.getElementById('steps-time');
  const stepsAmount = parseInt(stepsInput.value);
  const timeSpentString = timeInput.value.trim();

  if (isNaN(stepsAmount) || stepsAmount <= 0 || !timeSpentString) {
    alert("Please enter a valid number of steps and time.");
    return;
  }

  const timeSpentInSeconds = convertToSeconds(timeSpentString);
  totalSteps += stepsAmount;
  stepsHistory.push({ steps: stepsAmount, time: timeSpentInSeconds, date: new Date() });

  document.getElementById('steps-display').textContent = totalSteps;

  const stepsHistoryList = document.getElementById('steps-history-list');
  const listItem = document.createElement('li');
  listItem.textContent = `Logged: ${stepsAmount} steps at ${convertToTimeFormat(timeSpentInSeconds)}`;
  stepsHistoryList.appendChild(listItem);

  stepsInput.value = '';
  timeInput.value = '';
}

// Log Exercise
function logExercise() {
  const exerciseNameInput = document.getElementById('exercise-name');
  const exerciseSetsInput = document.getElementById('exercise-sets');
  const exerciseRepsInput = document.getElementById('exercise-reps');
  const exerciseTimeInput = document.getElementById('exercise-time');
  const exerciseName = exerciseNameInput.value.trim();
  const exerciseSets = parseInt(exerciseSetsInput.value);
  const exerciseReps = parseInt(exerciseRepsInput.value);
  const exerciseTime = convertToSeconds(exerciseTimeInput.value.trim());

  if (!exerciseName || isNaN(exerciseTime) || exerciseTime <= 0) {
    alert("Please enter valid exercise details.");
    return;
  }

  let logMessage = `Logged: ${exerciseName}`;

  if (!isNaN(exerciseSets)) {
    logMessage += ` - ${exerciseSets} sets`;
  }

  if (!isNaN(exerciseReps)) {
    logMessage += ` of ${exerciseReps} reps`;
  }

  logMessage += ` at ${convertToTimeFormat(exerciseTime)}`;

  exerciseHistory.push({ name: exerciseName, sets: exerciseSets, reps: exerciseReps, time: exerciseTime, date: new Date() });

  const exerciseHistoryList = document.getElementById('exercise-history-list');
  const listItem = document.createElement('li');
  listItem.textContent = logMessage;
  exerciseHistoryList.appendChild(listItem);

  exerciseNameInput.value = '';
  exerciseSetsInput.value = '';
  exerciseRepsInput.value = '';
  exerciseTimeInput.value = '';
}

// Log Food
function logFood() {
  const foodNameInput = document.getElementById('food-name');
  const foodCaloriesInput = document.getElementById('calories');
  const foodName = foodNameInput.value.trim();
  const foodCalories = parseInt(foodCaloriesInput.value);

  if (!foodName || isNaN(foodCalories) || foodCalories <= 0) {
    alert("Please enter valid food details.");
    return;
  }

  foodHistory.push({ name: foodName, calories: foodCalories, date: new Date() });

  const foodHistoryList = document.getElementById('food-history-list');
  const listItem = document.createElement('li');
  listItem.textContent = `Logged: ${foodName} - ${foodCalories} calories`;
  foodHistoryList.appendChild(listItem);

  foodNameInput.value = '';
  foodCaloriesInput.value = '';
}

// Log Water
function logWater() {
  const waterAmountInput = document.getElementById('water-amount');
  const waterAmount = parseInt(waterAmountInput.value);

  if (isNaN(waterAmount) || waterAmount <= 0) {
    alert("Please enter a valid amount of water.");
    return;
  }

  waterHistory.push({ amount: waterAmount, date: new Date() });

  const waterHistoryList = document.getElementById('water-history-list');
  const listItem = document.createElement('li');
  listItem.textContent = `Logged: ${waterAmount} ml of water`;
  waterHistoryList.appendChild(listItem);

  waterAmountInput.value = '';
}

// Log Sleep
function logSleep() {
  const sleepTimeInput = document.getElementById('sleep-time');
  const sleepHoursInput = document.getElementById('sleep-hours');
  const sleepQualityInput = document.getElementById('sleep-quality');
  const sleepTime = convertToSeconds(sleepTimeInput.value.trim());
  const sleepHours = parseInt(sleepHoursInput.value);
  const sleepQuality = parseInt(sleepQualityInput.value);

  if (isNaN(sleepTime) || sleepTime <= 0 || isNaN(sleepHours) || sleepHours <= 0 || isNaN(sleepQuality) || sleepQuality <= 0 || sleepQuality > 10) {
    alert("Please enter valid sleep details.");
    return;
  }

  sleepHistory.push({ time: sleepTime, hours: sleepHours, quality: sleepQuality, date: new Date() });

  const sleepHistoryList = document.getElementById('sleep-history-list');
  const listItem = document.createElement('li');
  listItem.textContent = `Logged: ${convertToTimeFormat(sleepTime)} for ${sleepHours} hours with quality ${sleepQuality}/10`;
  sleepHistoryList.appendChild(listItem);

  sleepTimeInput.value = '';
  sleepHoursInput.value = '';
  sleepQualityInput.value = '';
}

// Dark Mode and Light Mode Toggle
const toggleButton = document.getElementById('toggle-mode');
const body = document.body;

function toggleMode() {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleButton.innerHTML = '🌞';
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    toggleButton.innerHTML = '🌜';
  }
}

toggleButton.addEventListener('click', toggleMode);
