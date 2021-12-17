const playBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const popup = document.querySelector(".popupWrap");
const result = document.querySelector(".text");
const secText = document.querySelector(".sec");
const count = document.querySelector(".count");
const container = document.querySelector(".container");
const containerRect = container.getBoundingClientRect();
const gameItem = [
    { name: "carrot", count: 10 },
    { name: "bug", count: 7 }
];

let play = false;
let countNum = 10;
let sec = 10;
let timeInterval;

const bgSound = new Audio("sound/bg.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const winSound = new Audio("sound/game_win.mp3");

replayBtn.addEventListener("click", () => {
    play = false;

    playBtn.classList.remove("fa-stop-circle");
    playBtn.classList.add("fa-play-circle");
    popup.classList.add("d-none");

    sec = 10;
    countNum = 10;
    timeNCountText(sec, countNum);
});

playBtn.addEventListener("click", e => {
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-stop-circle");
    if (play) {
        stopSound(bgSound);
        playSound(alertSound);
        clearInterval(timeInterval);
        resultPopup("REPLAY ?");
    } else {
        play = true;
        playSound(bgSound);
        container.innerHTML = "";
        timeInterval = setInterval(() => {
            sec--;
            timeNCountText(sec, countNum);
            if (sec === 0) {
                stopSound(bgSound);
                playSound(alertSound);
                resultPopup("YOU LOSE!💫");
            }
        }, 1000);
        gameItem.forEach(ele => {
            createCarrotNBug(ele.name, ele.count);
        });
    }
});

container.addEventListener("click", e => {
    if (!play) return;
    if (e.target.localName !== "img") return;
    if (e.target.matches(".carrot")) {
        playSound(carrotSound);
        e.target.remove();
        countNum--;
        timeNCountText(sec, countNum);
        if (countNum === 0) {
            stopSound(bgSound);
            playSound(winSound);
            resultPopup("YOU WIN!🎉");
        }
    } else {
        stopSound(bgSound);
        playSound(bugSound);
        playSound(alertSound);
        resultPopup("YOU LOSE!💫");
    }
});

function resultPopup(text) {
    clearInterval(timeInterval);
    popup.classList.remove("d-none");
    result.textContent = text;
}

function createCarrotNBug(name, count) {
    for (let i = 0; i < count; i++) {
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", "img/" + name + ".png");
        imgTag.setAttribute("class", name);
        container.appendChild(imgTag);

        let x = Math.floor(Math.random() * (containerRect.width - 80));
        let y = Math.floor(Math.random() * (containerRect.height - 80));
        imgTag.style.transform = "translate(" + x + "px," + y + "px)";
    }
}

function timeNCountText(sec, countNum) {
    secText.textContent = sec;
    count.textContent = countNum;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}
