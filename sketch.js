let inkColor = 'black';
let bgColor = 'white';

// Change text color of all color buttons according to the text
// and add an event listener to change the ink color
const colorButtons = document.querySelector('.colorButtons');
const buttons1 = colorButtons.querySelectorAll('button');
buttons1.forEach((button) => {
  const color = button.textContent.toLowerCase();
  button.setAttribute('style', `color: ${color}`);
  button.addEventListener('click', () => {
    inkColor = color;
  });
});

// Change text color of all bg color buttons according to the text
// and add an event listener to change the board background color
const bgColorButtons = document.querySelector('.bgColorButtons');
const buttons2 = bgColorButtons.querySelectorAll('button');
buttons2.forEach((button) => {
  const color = button.textContent.toLowerCase();
  button.setAttribute('style', `color: ${color}`);
  button.addEventListener('click', () => {
    bgColor = color;
  });
});

const canvas = document.querySelector('.sketchContainer');
const div = document.createElement('div');

// slider functions
const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.sliderText');
// Update the current slider value (each time you drag the slider handle)
slider.oninput = () => {
  sliderText.textContent = `${slider.value} x ${slider.value}`;
};
