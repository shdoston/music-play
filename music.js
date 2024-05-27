const audio = document.querySelector(".audio"),
  container = document.querySelector(".container"),
  progressContainer = document.querySelector(".progress__container"),
  progress = document.querySelector(".progress"),
  playBtn = document.querySelector(".play"),
  prevBtn = document.querySelector(".prev"),
  coverImage = document.getElementById("cover-image"),
  nextBtn = document.querySelector(".next"),
  rangeEl = document.querySelector(".range"),
  volumeValue = document.querySelector(".volume-value"),
  currentTimeEl = document.querySelector(".current-time"),
  durationEl = document.querySelector(".duration"),
  voiseWrapper = document.querySelector(".voise__wrapper"),
  title = document.querySelector(".song");
// content

audio.volume = 0.5;
volumeValue.textContent = 50;

const songs = [
  
  // "Sherali-jorayev-birinchi-muhabbatim",
  // "konsta-shokir-ertasi-yoq",
  // "ulig-bek-shomurodov ",
];

let currentSong = 1;

const changeyMusic = (a) => {
  coverImage.src = `./images/${a}.jpg`;
  audio.src = `./musics/${a}.mp3`;
  title.textContent = a;
};

const playMusic = () => {
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fa-solid fa-pause controller"></i>`;
  audio.play();
};
const pauseMusic = () => {
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fa-solid fa-play controller"></i>`;
  audio.pause();
};

const play = () => {
  const state = container.classList.contains("play");

  if (state) {
    pauseMusic();
  } else {
    playMusic();
  }
};

const next = () => {
  if (currentSong > songs.length - 2) {
    currentSong = 0;
  } else {
    currentSong++;
  }

  changeyMusic(songs[currentSong]);
  playMusic();
};
const prev = () => {
  if (currentSong == 0) {
    currentSong = songs.length - 1;
  } else {
    currentSong--;
  }

  changeyMusic(songs[currentSong]);
  playMusic();
};

const changeValue = () => {
  audio.volume = rangeEl.value / 100;
  volumeValue.textContent = rangeEl.value;
};



const changeProgress = (e) => {
  const currentTime = e.target.currentTime;
  let duration = e.target.duration;
  progress.style.width = `${(currentTime / duration) * 100}%`;
  if (currentTime == duration) {
    next();
  }
};
const setProgress = (e) => {
  const widthP = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / widthP) * duration;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const updateDuration = () => {
  durationEl.textContent = formatTime(audio.duration);
  setInterval(() => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
};

// events

playBtn.addEventListener("click", play);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
rangeEl.addEventListener("input", changeValue);
audio.addEventListener("timeupdate", changeProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("loadedmetadata", updateDuration);