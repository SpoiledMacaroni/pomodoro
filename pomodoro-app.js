const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes'); 
let myInterval; 
let timerIsOff = true; //is timer off
let timerIsPaused = false; //is timer paused


const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent)

  if(timerIsOff) {
    timerIsOff = false; //timer is on
    let totalSeconds = sessionAmount * 60;
    
    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');
        
      let minutesLeft = Math.floor(totalSeconds/60);
      let secondsLeft = totalSeconds % 60;
    
      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`

      if (!timerIsPaused) { //do something if not paused
        totalSeconds--;
        if(minutesLeft === 0 && secondsLeft === 0) {
          bells.play()
          clearInterval(myInterval);
        }
      }
    }
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.')
  }
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', () => {
  // Toggle the boolean variable
  timerIsPaused = !timerIsPaused;
  console.log("Paused!");
  if (timerIsPaused === true) {pauseBtn.textContent = "Resume"} else {pauseBtn.textContent = "Pause"}});
resetBtn.addEventListener('click', () => {
  clearInterval(myInterval); //timer is not ticking
  timerIsOff = true; //timer is off
  timerIsPaused = false; //timer is not paused 
  minuteDiv = document.querySelector('.minutes');
  minuteDiv.textContent = '25';
  secondDiv = document.querySelector('.seconds');
  secondDiv.textContent = '00';
  if (timerIsPaused === true) {pauseBtn.textContent = "Resume"} else {pauseBtn.textContent = "Pause"}
});