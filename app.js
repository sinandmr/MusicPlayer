'use strict';
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const volume = document.querySelector('#volume');
const mixBtn = document.querySelector('#mix');

// Song titles
const songs = ['belki', 'yalan', 'bubicim'];

// Keep track of songs
let songIndex = 0;

// Initially load song info DOM

loadSong(songs[songIndex]);

// Update song details
// FUNCTIONS

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// START second to minute and second
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' saat, ' : ' saat, ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? '. dakika, ' : '. dakika, ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? '. saniye' : '. saniye') : '';
  return hDisplay + mDisplay + sDisplay;
}
// FINISH second to minute and second

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  title.innerText = `${songs[songIndex]} - ${secondsToHms(currentTime)}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function mute() {
  const durum = volume
    .querySelector('i.fas')
    .classList.contains('fa-volume-up');
  if (durum) {
    volume.querySelector('i.fas').classList.add('fa-volume-off');
    volume.querySelector('i.fas').classList.remove('fa-volume-up');
    audio.muted = true;
  } else {
    volume.querySelector('i.fas').classList.add('fa-volume-up');
    volume.querySelector('i.fas').classList.remove('fa-volume-off');
    audio.muted = false;
  }
}
// Event Listeners

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song events

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

volume.addEventListener('click', mute);
mixBtn.addEventListener('click', mixSong);

function mixSong() {
  let randomNumber = Math.floor(Math.random() * songs.length);
  while (randomNumber === songIndex) {
    randomNumber = Math.floor(Math.random() * songs.length);
  }
  if (randomNumber !== songIndex) {
    songIndex = randomNumber;
    loadSong(songs[songIndex]);
    playSong();
  }
}
