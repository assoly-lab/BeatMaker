class Daw{
    constructor(){
        this.playBtn = document.querySelector(".play");
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio =document.querySelector(".hihat-sound");
        this.tomAudio =document.querySelector(".tom-sound");
        this.muteBtn = document.querySelectorAll(".mute");
        this.fillTwoKickBtn = document.querySelector(".fill-two-kick");
        this.fillTwoSnareBtn = document.querySelector(".fill-two-snare");
        this.fillTwoHihatBtn = document.querySelector(".fill-two-hihat");
        this.fillTwoTomBtn = document.querySelector(".fill-two-tom");
        this.resetBtn = document.querySelector(".reset-button");
        this.selects= document.querySelectorAll("select");
        this.index = 0;
        this.bpm =128;
        this.tempoController = document.querySelector(".tempo")
        this.kickPads =document.querySelectorAll(".pad.kick-pad");
        this.snarePads =document.querySelectorAll(".pad.snare-pad");
        this.hihatPads = document.querySelectorAll(".pad.hihat-pad");
        this.tomPads = document.querySelectorAll(".pad.tom-pad");
        this.isPlaying = null;
    }
    resetAllPads(){
        this.pads.forEach(pad =>{
            if(pad.classList.contains("active")){
                pad.classList.remove("active");
                clearInterval(this.isPlaying);
                this.isPlaying = null;
                this.playBtn.innerText = "Play";
                this.playBtn.classList.remove("active");
            }
        });
    }
    fillEachTwo(e){
        switch(e.target.parentElement.classList.value){ 
            case "kick":
                
                 this.kickPads.forEach( kick=>{
                    for(let i=0;i<=7;i+=2){
                        if(kick.classList[2] === `b${i}`){
                            kick.classList.toggle("active");
                        }
                    }

                });
                break;
        case "snare":
            this.snarePads.forEach( snare=>{
                for(let i=0;i<=7;i+=2){
                    if(snare.classList[2] === `b${i}`){
                        snare.classList.toggle("active");
                    }
                }

            });
            break;
       case "hihat":
                this.hihatPads.forEach( hihat=>{
                    for(let i=0;i<=7;i+=2){
                        if(hihat.classList[2] === `b${i}`){
                            hihat.classList.toggle("active");
                        }
                    }
            
                });
                break;
        case "tom":
            this.tomPads.forEach( tom=>{
                for(let i=0;i<=7;i+=2){
                    if(tom.classList[2] === `b${i}`){
                        tom.classList.toggle("active");
                    }
                }
        
            });

    }

    }
    activatePad(){
        this.classList.toggle("active");

    }
    loop(){
        const step = this.index % 8;
        // console.log(step,this.index);
        const activePads = document.querySelectorAll(`.b${step}`);
        activePads.forEach(pad=>{
            pad.style.animation ="animate 500ms alternate ease-in-out 2"
            if(pad.classList.contains("active")){
                if(pad.classList.contains("kick-pad")){
                    this.kickAudio.currentTime =0;
                    this.kickAudio.play();
                }
                if(pad.classList.contains("snare-pad")){
                    this.snareAudio.currentTime =0;
                    this.snareAudio.play();
                }
                if(pad.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime =0;
                    this.hihatAudio.play();
                }
                if(pad.classList.contains("tom-pad")){
                    this.tomAudio.currentTime =0;
                    this.tomAudio.play();
                }
            }
        })
        this.index=this.index + 1;
    }
    changeAudio(e){
        const selectName = e.target.name;
        const selectVal = e.target.value;
        switch(selectName){
            case "kick-selection":
                this.kickAudio.src = selectVal;
                break;
            case "snare-selection":
                this.snareAudio.src = selectVal;
                break;
            case "hihat-selection":
                this.hihatAudio.src = selectVal;
                break;
            case "tom-selection":
                this.tomAudio.src = selectVal;
        }
    }
    muteTrack(e){
        e.target.classList.toggle("active");
        const muteIndex=e.target.classList[1];
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "track0":
                    this.kickAudio.volume =0;
                    break;
                case "track1":
                    this.snareAudio.volume=0;
                    break;
                case "track2":
                    this.hihatAudio.volume=0;
                    break;
                case "track3":
                    this.tomAudio.volume=0;
                    break;
            }
        }else{
            switch(muteIndex){
                case "track0":
                    this.kickAudio.volume =1;
                    break;
                case "track1":
                    this.snareAudio.volume=1;
                    break;
                case "track2":
                    this.hihatAudio.volume=1;
                    break;
                case "track3":
                    this.tomAudio.volume=1;
                    break;
            }
        }

    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying=null;
        if(this.playBtn.classList.contains("active")){
            this.Start();
        }

    }
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updatePlayingBtn(){
        if(this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
        else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    Start(){
        const speed = (60 / this.bpm) * 1000;
        if(!this.isPlaying){ 
        this.isPlaying = setInterval(() =>{
            this.loop();
        },speed);
    }else{
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
    }
}

const fruityLoops =  new Daw();
fruityLoops.playBtn.addEventListener("click",()=>{
    fruityLoops.Start();
    fruityLoops.updatePlayingBtn();
});
// console.log(fruityLoops.pads)
fruityLoops.pads.forEach(pad => {
    pad.addEventListener("click",fruityLoops.activatePad)
    pad.addEventListener("animationend",function(){
        this.style.animation="";
    });
    
});
 fruityLoops.fillTwoKickBtn.addEventListener("click",function(e){
     fruityLoops.fillEachTwo(e);
 });
 fruityLoops.fillTwoSnareBtn.addEventListener("click",function(e){
     fruityLoops.fillEachTwo(e);
 });
 fruityLoops.fillTwoHihatBtn.addEventListener("click",function(e){
     fruityLoops.fillEachTwo(e);
 });
 fruityLoops.fillTwoTomBtn.addEventListener("click",function(e){
     fruityLoops.fillEachTwo(e);
 });
fruityLoops.resetBtn.addEventListener("click",()=>{
    fruityLoops.resetAllPads();
});
fruityLoops.selects.forEach(select =>{
    select.addEventListener("change",function(e){
        fruityLoops.changeAudio(e);
    });
});
fruityLoops.muteBtn.forEach(button =>{
    button.addEventListener("click",function(e){
        fruityLoops.muteTrack(e);
    });
});
fruityLoops.tempoController.addEventListener("input",function(e){
    fruityLoops.changeTempo(e);
});
fruityLoops.tempoController.addEventListener("change",function(e){
    fruityLoops.updateTempo();
})
