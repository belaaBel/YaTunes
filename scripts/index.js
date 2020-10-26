import {radioPlayerInit} from './radioPlayer.js';
import {audioPlayerInit} from './audioPlayer.js';
import {videoPlayerInit} from './videoPlayer.js';

const player = document.querySelector('.player-btn');
const player_btn = document.querySelectorAll('.player-btn');
const player_block = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactiveBtn = () => {
    temp.style.display = 'none';
    player_btn.forEach(btn => btn.classList.remove('active'));
    player_block.forEach(block => block.classList.remove('active'));

    audioPlayerInit.stop();
    videoPlayerInit.stop();
    radioPlayerInit.stop();
}


player_btn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        deactiveBtn();
        btn.classList.add('active');
        player_block[index].classList.add('active');
    })
});



videoPlayerInit();
audioPlayerInit();
radioPlayerInit();