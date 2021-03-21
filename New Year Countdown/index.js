const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.innerText = currentYear + 1;

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = ~~(diff / 1000 / 60 / 60 / 24);
  const h = ~~(diff / 1000 / 60 / 60) % 24;
  const m = ~~(diff / 1000 / 60) % 60;
  const s = ~~(diff / 1000) % 60;

  days.innerText = d < 10 ? `0${d}` : d;
  hours.innerText = h < 10 ? `0${h}` : h;
  minutes.innerText = m < 10 ? `0${m}` : m;
  seconds.innerText = s < 10 ? `0${s}` : s;
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

setInterval(updateCountdown, 1000);
