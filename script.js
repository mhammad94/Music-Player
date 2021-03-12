'use strict'

//Declearing Elements 

const songUl = document.querySelector('.audio-player-songs-list-main');
const songPlayPauseBtn = document.querySelector('.PlayPauseBtn');
const songPrevBtn = document.querySelector('.PreviousTrackBtn');
const songNextBtn = document.querySelector('.NextTrackBtn');
const trackPlayer = document.createElement('audio');
const lowerPlayerImg = document.querySelector('.lower-audio-player-img');
const footerPlayerMainDiv = document.querySelector('.audio-player-main');
const trackProgressBar = document.querySelector('.SongProgressBar');
const totalTrackTime = document.querySelector('.audio-player-main-inner-player-seekbar-time-total');
const totalTimeElapsed = document.querySelector('.audio-player-main-inner-player-seekbar-time-elapsed');
const footerPlayPauseBtn = document.querySelector('.PlayPauseBtn');
const artistName = document.querySelector('.audio-player-main-inner-player-song-details-artist-name');
const songName = document.querySelector('.audio-player-main-inner-player-song-details-song-name');




const trackList = [
    {
        TrackId: 0,
        ArtistName: "Tove-Lo",
        TrackName: "Moments-(Seebe Remix)",
        TrackImage: "/Assets/Tove Lo Moments.jpg",
        path: "/Tracks/Tove Lo, Seeb - Moments (Seeb Remix).mp3",

    },
    {
        TrackId: 1,
        ArtistName: "Benny Blanco, Halsey & Khalid",
        TrackName: "East Side",
        TrackImage: "/Assets/Benny Blanco.jpg",
        path: "/Tracks/benny blanco, Halsey & KhalidEastside (official video).mp3",
    },
    {
        TrackId: 2,
        ArtistName: "Kygo, Sasha Sloan",
        TrackName: "l will Wait",
        TrackImage: "/Assets/Sasha Sloan.jpg",
        path: "/Tracks/Kygo, Sasha Sloan - I'll Wait (Lyric Video).mp3",
    },
    {
        TrackId: 3,
        ArtistName: "Hailee Steinfeld",
        TrackName: "Back To Life",
        TrackImage: "/Assets/Back To Life.jpg",
        path: "/Tracks/Hailee Steinfeld - Back to Life (from Bumblebee - Official Lyric Video).mp3",
    },
    {
        TrackId: 4,
        ArtistName: "Hailee Steinfeld, Alesso",
        TrackName: "Let Me Go",
        TrackImage: "/Assets/Let Me Go.jpg",
        path: "/Tracks/Hailee Steinfeld, Alesso - Let Me Go (Personal Collection) ft. Florida Georgia Line, WATT.mp3",
    },
    {
        TrackId: 5,
        ArtistName: "Halsey",
        TrackName: "Colors",
        TrackImage: "/Assets/Halsey Colors.jpg",
        path: "/Tracks/Halsey - Colors.mp3",
    },
    {
        TrackId: 6,
        TrackName: "Kids",
        ArtistName: "One Republic",
        TrackImage: "/Assets/One Republic Kids.jpg",
        path: "/Tracks/OneRepublic - Kids (Official Music Video).mp3",
    },
    {
        TrackId: 7,
        TrackName: "I Like Me Better",
        ArtistName: "Lauv",
        TrackImage: "/Assets/I like me better.jpg",
        path: "/Tracks/Lauv - I Like Me Better [Official Audio].mp3",
    },
    {
        TrackId: 8,
        TrackName: "Be Kind",
        ArtistName: "Marshmello, Halsey",
        TrackImage: "/Assets/Be Kind.jpg",
        path: "/Tracks/Marshmello, Halsey - Be Kind (Halsey Lyric Video).mp3",
    },
    {
        TrackId: 9,
        TrackName: "Kings & Queens",
        ArtistName: "Thirty Seconds To Mars",
        TrackImage: "/Assets/Kings and Queen.jpeg",
        path: "/Tracks/Thirty Seconds To Mars - Kings and Queens (VEVO Presents).mp3",   
    }
];


function loadingTracksInTheGrid(songsArr) {
    const songs = songsArr;
    songs.forEach((song, i) => {
        const html = `  <li class="audio-player-songs-list-main-li">
        <div class="audio-player-songs-list-card">
          <div class="audio-player-songs-list-card-img"><img src="${song.TrackImage}" height="100%" width="100%" alt="" srcset=""></div>
          <div class="audio-player-songs-controls d-flex justify-content-center">
          <div class="audio-player-songs-list-card-play-pause-btn d-none  ${song.TrackId}">
            <a href="#" class="PlayPauseBtn" onclick="playingFromGridandFooter(this)" id="${song.TrackId}"><i class="fas fa-play"></i></a>
          </div>
        </div>
        </div>
      </li>`;
        songUl.insertAdjacentHTML('afterbegin', html);
    });
};

loadingTracksInTheGrid(trackList);



//Audio Player Function 
let updateTimer;
 function loadTrack(songIndex) {
     clearInterval(updateTimer);
      trackPlayer.src = trackList[songIndex].path;
      trackPlayer.load();
      artistName.textContent = trackList[songIndex].ArtistName;
      songName.textContent = trackList[songIndex].TrackName;
      lowerPlayerImg.classList.remove('d-none')
      lowerPlayerImg.src = trackList[songIndex].TrackImage;
      updateTimer = setInterval(timeandProgressUpdate, 1000);
 };



function pauseTrack() {
    trackPlayer.pause();
}

function playSong() {
    trackPlayer.play();
}


function seekTrack(){
    let seekTo = trackPlayer.duration * (trackProgressBar.value / 100);
    trackPlayer.currentTime = seekTo;
    console.log()
}

let currSongIndex = 0;
let isPlaying = false;
let isPaused = false;
//Playing Tracks From the Grid and the Footer Player 
function playingFromGridandFooter(e){
    let currentSongID = Number(e.id);
    let currentSongDiv = e.parentElement;
    let currentSongDivArr = [...document.querySelectorAll('.audio-player-songs-list-card-play-pause-btn')];
    let currGridbox = currentSongDivArr.find((el) => el.classList.contains(`${currentSongID}`));

     footerPlayPauseSync();
   
    if(isPlaying === false){
        e.innerHTML = '<i class="fas fa-pause">';
        footerPlayPauseBtn.innerHTML = '<i class="fas fa-pause">';
        footerPlayPauseBtn.setAttribute('id', currentSongID);
        currGridbox.classList.remove('d-none');
        currGridbox.classList.add('d-flex');
        currGridbox.children[0].innerHTML = '<i class="fas fa-pause">';

        if(isPaused === false){
        currentSongDiv.classList.remove('d-none');
        currentSongDiv.classList.add('d-flex');
        currGridbox.children[0].innerHTML = '<i class="fas fa-pause">';
        loadTrack(currentSongID);
        playSong();
        currSongIndex = currentSongID;
        isPlaying = true;
        }else if(currSongIndex !== currentSongID){
            loadTrack(currentSongID);
            playSong();
            e.innerHTML = '<i class="fas fa-pause">';
            footerPlayPauseBtn.innerHTML = '<i class="fas fa-pause">';
            currGridbox.children[0].innerHTML = '<i class="fas fa-pause">';
            currSongIndex = currentSongID;
            currentSongDiv.classList.remove('d-none');
            currentSongDiv.classList.add('d-flex');
        }else{
            playSong();
            currentSongDiv.classList.remove('d-none');
            currentSongDiv.classList.add('d-flex');
            currGridbox.classList.remove('d-none');
            currGridbox.classList.add('d-flex');
            currGridbox.children[0].innerHTML = '<i class="fas fa-pause">';
            isPaused = false;
        }
        isPlaying = true;
    }else{
        e.innerHTML = '<i class="fas fa-play">';
        footerPlayPauseBtn.innerHTML = '<i class="fas fa-play">';
        trackPlayer.pause();
        isPlaying = false;
        isPaused = true;
    }

}



function footerPlayPauseSync(){
    let currentSongDivArr = [...document.querySelectorAll('.audio-player-songs-list-card-play-pause-btn')];
    let currGridbox = currentSongDivArr.find((el) => el.classList.contains(`${currSongIndex}`));
    currentSongDivArr.forEach((el, i) => {
        el.classList.remove('d-flex');
        el.classList.add('d-none');
        el.children[0].innerHTML = '<i class="fas fa-play">';
       });

if(isPlaying === true){
    footerPlayPauseBtn.innerHTML = '<i class="fas fa-pause">';
    currGridbox.classList.remove('d-none');
    currGridbox.classList.add('d-flex');
    currGridbox.children[0].innerHTML = '<i class="fas fa-pause">';
}
}

function nextTrack(){
    isPlaying = true;
    currSongIndex--;
    footerPlayPauseBtn.setAttribute('id', currSongIndex);
    loadTrack(currSongIndex);
    footerPlayPauseSync();
    playSong();
  
};

function previousTrack(){
    isPlaying = true;
    currSongIndex++;
    footerPlayPauseBtn.setAttribute('id', currSongIndex);
    loadTrack(currSongIndex);
    footerPlayPauseSync()
    playSong();
    
}


// Progress and SeekBar Function

    
  function timeandProgressUpdate() {
     let seekPosition = 0;
    if (isPlaying === true) {
         seekPosition = trackPlayer.currentTime * (100 / trackPlayer.duration);
         trackProgressBar.value = seekPosition;
        let CurrentMinutes = Math.floor(trackPlayer.currentTime / 60);
        let CurrentSeconds = Math.floor(trackPlayer.currentTime - CurrentMinutes * 60);
        let DurationMinutes = Math.floor(trackPlayer.duration / 60);
        let DurationSeconds = Math.floor(trackPlayer.duration - DurationMinutes * 60);

        if (CurrentSeconds < 10) { CurrentSeconds = `0${CurrentSeconds}` };
        if (DurationSeconds < 10) { DurationSeconds = `0${DurationSeconds}` };
        if (DurationMinutes < 10) { DurationMinutes = `0${DurationMinutes}` };
        if (CurrentMinutes < 10) { CurrentMinutes = `0${CurrentMinutes}` };
        totalTrackTime.textContent = `${DurationMinutes}:${DurationSeconds}`;
        totalTimeElapsed.textContent = `${CurrentMinutes}:${CurrentSeconds}`;


        let TotalDurationTime = Number(DurationMinutes * 60) + Number(DurationSeconds);
        let TotalCurrentTime = Number(CurrentMinutes * 60) + Number(CurrentSeconds);
        let TotalPercentTime = (TotalCurrentTime / TotalDurationTime * 100);
        trackProgressBar.style.backgroundSize = `${TotalPercentTime}%`;

        if (TotalCurrentTime === TotalDurationTime) {
                 nextTrack();
        };
    }
  }
 