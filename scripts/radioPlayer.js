export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolumeRange = document.querySelector('.radio-volume-range');

    const audio = new Audio();

    audio.type = 'audio/aac';
    radioStop.disabled = true;


    audio.volume = 0.4;
    radioVolumeRange.value =  audio.volume * 100;


    const changeIcon = () => {
        if(audio.paused){
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else{
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    }

    const select = parrent => {
        radioItem.forEach(element => {
            element.classList.remove('select');
        });
        parrent.classList.add('select');
    }

    const play = () => {
        if(audio.paused){
            audio.play();
        } else{
            audio.pause();
        }
        changeIcon();
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const src = target.dataset.radioStantion;
        const parrent = target.closest('.radio-item');
        const title = parrent.querySelector('.radio-name');
        const imgURL = parrent.querySelector('.radio-img');
 
        audio.src = src;
        audio.play();
        
        changeIcon();

        radioStop.disabled = false;

        select(parrent);
        
        radioCoverImg.src = imgURL.src;
        radioHeaderBig.textContent = title.textContent;
    });

    radioStop.addEventListener('click', play);

    radioVolumeRange.addEventListener('input', () => {

        audio.volume = radioVolumeRange.value / 100;
    })

    radioPlayerInit.stop = () => {
        if (!audio.paused){
            audio.pause();
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
            
        }
    }
};