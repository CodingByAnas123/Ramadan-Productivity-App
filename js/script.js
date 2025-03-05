// Save Ibadah Progress
function saveProgress() {
  let prayers = ["fajr", "duhr", "asr", "maghrib", "isha", "tarawih"];
  let progress = {};
  prayers.forEach((prayer) => {
    progress[prayer] = document.getElementById(prayer).checked;
  });
  localStorage.setItem("prayerProgress", JSON.stringify(progress));
}

window.onload = function () {
  let savedProgress = JSON.parse(localStorage.getItem("prayerProgress"));
  if (savedProgress) {
    Object.keys(savedProgress).forEach((prayer) => {
      document.getElementById(prayer).checked = savedProgress[prayer];
    });
  }
};

// Task List
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");
  if (taskInput.value.trim() !== "") {
    let li = document.createElement("li");
    li.textContent = taskInput.value;
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

// Countdown Timer with Next Iftar Time
function updateTimer() {
  let now = new Date();
  let iftarTime = new Date(now);
  iftarTime.setHours(18, 0, 0, 0); // Set Iftar time to 6:00 PM

  if (now > iftarTime) {
    iftarTime.setDate(iftarTime.getDate() + 1); // Move to next day's iftar time
  }

  let diff = iftarTime - now;
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById(
    "timer"
  ).innerText = `${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateTimer, 1000);

// Dark Mode Toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark") ? "enabled" : "disabled"
  );
}

// Load Dark Mode Setting
if (localStorage.getItem("darkMode") === "enabled") {
  document.documentElement.classList.add("dark");
}
