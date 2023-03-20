const refs = {
    butStartEl: document.querySelector('button[data-start]'),
    butStopEl: document.querySelector('button[data-stop]'),
};
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onButStartElClick() {
    refs.butStartEl.disabled = true;
    intervalId = setInterval(() => {
        const colorId = getRandomHexColor();
        document.body.style.backgroundColor = colorId;
    }, 1000)
}
function onButStopElClick() {
    refs.butStartEl.disabled = false;
    clearInterval(intervalId);
}

refs.butStartEl.addEventListener('click', onButStartElClick)

refs.butStopEl.addEventListener('click', onButStopElClick)