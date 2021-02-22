"use strict";

const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
// const fullscreen = document.getElementById("fullscreen");
// const controls = document.getElementById("controls");

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
  } else {
    play.innerHTML = `<i class="fas fa-pause fa-2x"></i>`;
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let currentMinute = Math.floor(video.currentTime / 60);
  currentMinute =
    currentMinute < 10 ? "0" + String(currentMinute) : String(currentMinute);

  let currentSecond = Math.floor(video.currentTime % 60);
  currentSecond =
    currentSecond < 10 ? "0" + String(currentSecond) : String(currentSecond);

  let totalMinute = Math.floor(video.duration / 60);
  totalMinute =
    totalMinute < 10 ? "0" + String(totalMinute) : String(totalMinute);

  let totalSecond = Math.floor(video.duration % 60);
  totalSecond =
    totalSecond < 10 ? "0" + String(totalSecond) : String(totalSecond);

  timestamp.innerText = `${currentMinute}:${currentSecond} / ${totalMinute}:${totalSecond}`;
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

// fullscreen.addEventListener("click", () => {
//   video.style.width = "100vw";
//   video.style.height = "100vh";
//   controls.style.width = "100%";
// });
