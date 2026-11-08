const intro = document.getElementById("introScreen");
const main = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const envelopeSeal = document.getElementById("envelopeSeal");
const openBtn = document.getElementById("openBtn");

const musicToggle = document.getElementById("musicToggle");
const music = new Audio("audio2.mpeg");
music.loop = true;


const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let opened = false;

// Wedding ceremony: 30 January 2027 at 3.00 PM Sri Lanka time (UTC+05:30).
const weddingDate = new Date("2027-01-30T15:00:00+05:30").getTime();

function playMusic() {
  music.play().then(() => {
    if (musicToggle) {
      musicToggle.classList.add("playing");
      musicToggle.textContent = "Ⅱ";
      musicToggle.setAttribute("aria-label", "Pause background music");
    }
  }).catch((error) => {
    console.warn("Wedding music could not be played:", error);
    if (musicToggle) {
      musicToggle.classList.remove("playing");
      musicToggle.textContent = "♪";
    musicToggle.setAttribute("aria-label", "Play background music");
      musicToggle.setAttribute("aria-label", "Play background music");
    }
  });
}

function pauseMusic() {
  music.pause();
  if (musicToggle) {
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♪";
    musicToggle.setAttribute("aria-label", "Play background music");
  }
}

function toggleMusic(event) {
  if (event) event.stopPropagation();
  if (music.paused) playMusic();
  else pauseMusic();
}

function openInvitation(event) {
  if (event) event.stopPropagation();
  if (opened) return;

  opened = true;
  if (envelope) envelope.classList.add("open");
  if (envelopeSeal) envelopeSeal.style.opacity = "0";
  playMusic();

  window.setTimeout(() => {
    if (intro) intro.style.display = "none";
    if (main) main.classList.remove("hidden");

    const revealItems = main ? main.querySelectorAll(".reveal") : [];
    revealItems.forEach((item, index) => {
      window.setTimeout(() => item.classList.add("visible"), index * 140);
    });
  }, 850);
}

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const difference = weddingDate - Date.now();

  if (difference <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

if (openBtn) openBtn.addEventListener("click", openInvitation);
if (envelope) envelope.addEventListener("click", openInvitation);
if (musicToggle) musicToggle.addEventListener("click", toggleMusic);

updateCountdown();
window.setInterval(updateCountdown, 1000);
