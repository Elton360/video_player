const screen = document.querySelector(".screen");
const controls = document.querySelector(".controls");
const play_pause = document.querySelector("#play_pause");
const expand = document.querySelector("#expand");
const progress = document.querySelector(".progress");
const timestamp = document.querySelector(".timestamp");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");

//initially append the play/pause button to pause
const play = document.createElement("i");
play.classList.add("fa", "fa-play", "fa-2x");
play_pause.append(play);

function is_touch() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

const timeConverter = (time) => {
  let mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return `${mins}:${secs}`;
};

let timeout;
const toggleVideoStatus = (e) => {
  clearTimeout(timeout);
  if (is_touch() && e.target.tagName === "VIDEO") {
    if (controls.classList.contains("visible_menu"))
      controls.classList.remove("visible_menu");
    else {
      controls.classList.add("visible_menu");
      timeout = setTimeout(
        () => controls.classList.remove("visible_menu"),
        3500
      );
    }
    return;
  }

  if (screen.paused) {
    screen.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  } else {
    screen.pause();
    play.classList.add("fa-play");
    play.classList.remove("fa-pause");
  }
};

const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;
  timestamp.innerText = `${timeConverter(screen.currentTime)}/${timeConverter(
    screen.duration
  )}`;
};

const setVideoProgress = () =>
  (screen.currentTime = (+progress.value * video.duration) / 100);

screen.addEventListener("click", toggleVideoStatus);
screen.addEventListener("timeupdate", updateProgress);
screen.addEventListener("ended", () => play.classList.add("fa-play"));
//spacebar play/pause
document.body.onkeyup = (e) => e.keyCode === 32 && toggleVideoStatus();

play_pause.addEventListener("click", toggleVideoStatus);
progress.addEventListener("change", setVideoProgress);

plus.addEventListener("click", () => (screen.currentTime += 15));
minus.addEventListener("click", () => (screen.currentTime -= 15));
expand.addEventListener("click", () => screen.webkitRequestFullScreen());
