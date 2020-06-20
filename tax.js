let buttonProceed = document.querySelector('.proceed');
let visual = document.querySelector('.visual');
let instruction = document.querySelector('.instruction');
let inputBox = document.querySelector('.input-box');



buttonProceed.addEventListener('click', () => {
  visual.hidden = true;
  instruction.hidden = true;
  inputBox.hidden = false;
});