let gameSeq = [];
let userSeq = [];
let btn = ["bg-orange-300", "bg-pink-300", "bg-lime-300", "bg-cyan-300"];

const audio1 = new Audio('./elements/btn1.mp3');
const audio2 = new Audio('./elements/btn2.mp3');
const audio3 = new Audio('./elements/btn3.mp3');
const audio4 = new Audio('./elements/btn4.mp3');


let level = 0;
let gameStarted = false;

levelDisplay = document.querySelector("#level");
let Buttons = document.querySelectorAll(".button");

for(button of Buttons){
    button.addEventListener("click", buttonPressed);
}

document.addEventListener("keypress", function(){
    setTimeout(() => {
        if (gameStarted == false){
            levelUp();
            gameStarted = true;
            console.log("game is started");
        }
    }, 800);
});

function levelUp(){

    userSeq = [];
    level++;
    levelDisplay.innerText = "Level " + level;

    let randomIndex = Math.floor(Math.random() * 4);
    let randColor = btn[randomIndex];
    let randButton = document.querySelector(`.${randColor}`)
    buttonFlash(randButton);
    gameSeq.push(randColor);
    console.log(randButton);

}

function buttonFlash(bnn){

    let classList = bnn.classList;
    console.log(classList)
    let colorClass = Array.from(classList).find(cls => cls.startsWith("bg-"));
    let audioClass = Array.from(classList).find(audio => audio.startsWith("audio"));

    let [_ ,color, shade] = colorClass.split("-");
    let [audio, number] = audioClass.split("-");
    if(shade == 300){
        let newClass = `clr-${color}-100`;
        let playingAudio = `audio${number}`;
        // console.log(newClass)
        classList.remove(colorClass)
        classList.add(newClass)
        
        if(playingAudio == "audio1"){
            audio1.play();
        } else if (playingAudio == "audio2"){
            audio2.play();
        } else if (playingAudio == "audio3"){
            audio3.play();
        } else {
            audio4.play();
        }
        
        // button.classList.replace(colorClass, newClass);

        setTimeout(function(){
            classList.replace(newClass, colorClass);
        }, 350);
    
    }
}

function buttonPressed(){
    console.log("Button is pressed");
    let buttonPressed = this;
    buttonFlash(buttonPressed);

    let userColor = buttonPressed.getAttribute("id");
    let userbtn = document.getElementById(userColor);
    let colorClass = userbtn.classList;
    let colorPressed = Array.from(colorClass).find(clr => clr.startsWith("clr-"));

    let[_, color, shade] = colorPressed.split("-")
    let pushingColor = `bg-${color}-300`

    // console.log(pushingColor);
    userSeq.push(pushingColor);
    checkAnswer(userSeq.length - 1);
}

function checkAnswer(idx){
    // console.log("Current level", `${level}`);

    // let idx = level-1;
    if(userSeq[idx] == gameSeq[idx]){
        // console.log("Same Value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1200); 
        }
    } else {
        levelDisplay.innerHTML = `Game over.<br>Your Score Was <b>${level}</b><br> Press Any Key To Restart !!`;
        setTimeout(reset, 1000)
    }
}

function reset(){
    
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    // flashPattern();
}

// function flashPattern(){
//     let flashing = setInterval(() => {
//         patternBtn()
//     }, 350);

//     setTimeout(function(){clearInterval(flashing)}, 1780);

// }

// function patternBtn(){
//     for (btn of Buttons){
//         buttonFlash(btn);}
