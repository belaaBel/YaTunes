import {addZero} from './addZero.js';

export const audioPlayerInit = () => {

  

    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioButtonPrev = document.querySelector('.audio-button__prev');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioButtonNext = document.querySelector('.audio-button__next');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioProgressTime = document.querySelector('.audio-progress__timing');
    const audioList = ['flow', 'hello', 'speed'];
    let itemAudio = 0;
    
    const changeIcon = () => {
        audio.classList.toggle('play');
        audioButtonPlay.classList.toggle('fa-play');
        audioButtonPlay.classList.toggle('fa-pause');
    }

    const checkPaused = (pauses) => {
        if(pauses){
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        changeIcon();
    }

    const audioChange = (itemAudio) => {
        let track = audioList[itemAudio];
        
        audioImg.src = `./audio/${track}.jpg`;
        audioPlayer.src = `./audio/${track}.mp3`;
        audioHeader.textContent = track;       
    }

    const nextAudio = () => {
        if (itemAudio != audioList.length-1){
            itemAudio++;
        } else {
            itemAudio = 0;
        }
        
        
        audioChange(itemAudio);
    }

    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        let pauses = audioPlayer.paused;

        if (target.classList.contains('audio-button__play')){
            if (audioPlayer.paused){
               
                let track = audioList[itemAudio];
                audioImg.src = `./audio/${track}.jpg`;
                audioPlayer.src = `./audio/${track}.mp3`;
                audioHeader.textContent = track;
                audioPlayer.play();
            } else{
               
                audioPlayer.pause();

            }
            changeIcon();
        } 

        if (target.classList.contains('audio-button__prev')){
            if (itemAudio != 0){
                itemAudio--;
            } else {
                itemAudio = audioList.length - 1;
            }

            changeIcon();
            audioChange(itemAudio);
            checkPaused(pauses);
        }

        if (target.classList.contains('audio-button__next')){
            changeIcon();
            nextAudio();
            checkPaused(pauses);   
        }
    })

    audioPlayer.addEventListener('timeupdate', () => {
        let currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        let longCur = (currentTime / duration) * 100;

        let minCur = Math.floor(currentTime / 60);
        let secCur = Math.floor(currentTime % 60);

        let minDur = Math.floor(duration / 60);
        let secDur = Math.floor(duration % 60);

        audioTimePassed.textContent = addZero(minCur) + ':' + addZero(secCur);
        audioTimeTotal.textContent = addZero(minDur) + ':' + addZero(secDur);
        audioProgressTime.style.width = longCur + '%';
    })

    audioProgress.addEventListener('click', event => {
        let x = event.offsetX;
        let longDur = audioProgress.clientWidth;
        let duration = audioPlayer.duration;

        let longCur  = (x * duration) / longDur;

        audioPlayer.currentTime = longCur;
        
    })

    audioPlayer.addEventListener('ended', () => {
        nextAudio();
        audioPlayer.play();
    })

    audioPlayerInit.stop = () => {
        if (!audioPlayer.paused){
            audioPlayer.pause();
            audio.classList.remove('.play');
            audioButtonPlay.classList.remove('.pause');
            audioButtonPlay.classList.add('.play');
            
        }
    }
}