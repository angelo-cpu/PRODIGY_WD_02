let startTime, updatedTime, difference, tInterval;
let running = false;
let display = document.getElementById('display');
let lapsList = document.getElementById('laps-list');

document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
    }
});

document.getElementById('pause').addEventListener('click', function() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    display.textContent = '00:00:00';
    difference = 0;
    lapsList.innerHTML = '';  // Clear laps list
});

document.getElementById('lap').addEventListener('click', function() {
    if (running) {
        let lapTime = display.textContent;
        let li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return (unit < 10) ? '0' + unit : unit;
}