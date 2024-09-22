const audio = document.querySelector('#audio');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

const music = document.querySelector('#music');
const image = document.querySelector('.audio__image');
const audioAuthor = document.querySelector('.audio__author');
const audioName = document.querySelector('.audio__name');

const audioProgress = document.querySelector('.audio__progress');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.audio__currentTime');
const audioDurationEl = document.querySelector('.audio__duration');

const songs = [
  { author: 'Aaron Smith', songName: 'Dancin' },
  { author: 'Imagine Dragons', songName: 'Believer' },
  { author: 'Maneskin', songName: 'Beggin' },
];

let songIndex = 0;

function updateSong(songIndex) {
  const song = songs[songIndex];
  image.src = `assets/images/${song.songName}.jpg`;
  music.src = `assets/audios/${song.songName}.mp3`;
  audioAuthor.innerText = song.author;
  audioName.innerText = song.songName;
  document.body.style.backgroundImage = `url("assets/images/${song.songName}.jpg")`;
}

playBtn.addEventListener('click', () => {
  const isPlaying = audio.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  audio.classList.add('play');
  playBtn.querySelector('.fa-solid').classList.remove('fa-play');
  playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
  music.play();
}

function pauseSong() {
  audio.classList.remove('play');
  playBtn.querySelector('.fa-solid').classList.add('fa-play');
  playBtn.querySelector('.fa-solid').classList.remove('fa-pause');
  music.pause();
}

prevBtn.addEventListener('click', () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  updateSong(songIndex);
  playSong();
});

function playNextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  updateSong(songIndex);
  playSong();
}

nextBtn.addEventListener('click', playNextSong);

music.addEventListener('ended', playNextSong);

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

music.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.innerText = formatTime(currentTime);
  if (duration) {
    audioDurationEl.innerText = formatTime(duration);
  }
}

audioProgress.addEventListener('click', setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}
