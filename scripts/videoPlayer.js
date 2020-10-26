export const videoPlayerInit = () =>{
//     video-player
// video-button__play
// video-button__stop
// video-time__passed
// video-progress
// video-time__total


const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoTimeTotal = document.querySelector('.video-time__total');
const videoProgress = document.querySelector('.video-progress');
const videoVolume = document.querySelector('.video-volume');
const videoFullscreen = document.querySelector('.fullscreen');
const videoButtonForward = document.querySelector('.video-button__forward');
const videoButtonBackward = document.querySelector('.video-button__backward');

const addZero = n => n < 10 ? '0' + n : n;

const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    NewIcon();
}

const NewIcon = () => {
    if(videoPlayer.paused){
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    } else {
        videoButtonPlay.classList.add('fa-pause');
        videoButtonPlay.classList.remove('fa-play');
    }
}
const playOrPaused = () => {
    if(videoPlayer.paused){
        videoPlayer.play();
        NewIcon()
    } else {
        videoPlayer.pause();
        NewIcon();
    }
}

const changeValue = () => {
    const value = videoProgress.value;
    const duration = videoPlayer.duration;

    videoPlayer.currentTime = (value * duration) / 100;
}



videoPlayer.addEventListener('click', playOrPaused);
videoButtonPlay.addEventListener('click', playOrPaused);
videoButtonStop.addEventListener('click', stopPlay);
videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minPassed = Math.floor(currentTime / 60);
    let secPassed = Math.floor(currentTime % 60);

    let minDuration = Math.floor(duration / 60);
    let secDuration = Math.floor(duration % 60);

    videoTimePassed.textContent = addZero(minPassed) + ':' + addZero(secPassed);
    videoTimeTotal.textContent = addZero(minDuration) + ':' + addZero(secDuration);
})

videoProgress.addEventListener('change', changeValue);

videoVolume.addEventListener( 'input', () =>{
    videoPlayer.volume = videoVolume.value / 100;
    console.log(videoPlayer.volume);
});

videoButtonForward.addEventListener('click', () => {
    const value = videoProgress.value;
    const duration = videoPlayer.duration;

    videoPlayer.currentTime = ((value * duration) / 100) + 5;
});

videoButtonBackward.addEventListener('click', () => {
    const value = videoProgress.value;
    const duration = videoPlayer.duration;

    videoPlayer.currentTime = ((value * duration) / 100) - 5;
});

document.addEventListener('keydown', (event) => {
    if(event.code == 'ArrowLeft'){
        videoVolume.value = (videoPlayer.volume - 0.1) * 100;
        videoPlayer.volume = videoVolume.value / 100;
    } else if(event.code == 'ArrowRight'){
        videoVolume.value = (videoPlayer.volume + 0.1) * 100;
        videoPlayer.volume = videoVolume.value / 100;
    } else if(event.code == 'ArrowDown'){
        const value = videoProgress.value;
        const duration = videoPlayer.duration;

    videoPlayer.currentTime = ((value * duration) / 100) - 5;
    } if(event.code == 'ArrowUp'){
        const value = videoProgress.value;
        const duration = videoPlayer.duration;

        videoPlayer.currentTime = ((value * duration) / 100) + 5;
    } 
})



videoFullscreen.addEventListener('click', () => {
    videoPlayer.webkitEnterFullScreen();
})

videoPlayer.volume = 0.1;

videoVolume.value = videoPlayer.volume * 100;

videoPlayerInit.stop = () => {
    if (!videoPlayer.paused){
        videoPlayer.pause(); 
    }
}
};