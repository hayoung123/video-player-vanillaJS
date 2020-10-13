const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.getElementById("videoFile");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const videoSlider = document.getElementById("video__slider");

function handlePlay() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class = "fas fa-volume-up"></i>';
    //   volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class = "fas fa-volume-mute"></i>';
    //   volumeRange.value = 0;
  }
}

function keyevent(event) {
  const keycode = event.keyCode;
  if (keycode === 32) {
    handlePlay();
  }
}

function formatDate(seconds) {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
  const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
  currentTime.innerText = currentTimeString;
  if (videoPlayer.currentTime === 0) {
    videoSlider.value = 0;
  }
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerText = totalTimeString;
  videoSlider.max = videoPlayer.duration;
}

function handleSlide(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.currentTime = value;
}

function init() {
  playBtn.addEventListener("click", handlePlay);
  volumeBtn.addEventListener("click", handleVolumeClick);
  document.addEventListener("keyup", keyevent);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
  videoSlider.addEventListener("input", handleSlide);
  var timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      console.log("out");
    }, 3000);
  };
}

init();

console.log(videoPlayer.videoTracks);
