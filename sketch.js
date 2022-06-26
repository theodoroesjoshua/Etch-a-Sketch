let inkColor = 'black'; // default inkColor
let bgColor = 'white'; // default canvas background color
let mousedown = false; // to know if the mouse is being clicked down

const canvasContainer = document.querySelector('.sketchContainer');

// slider functions
const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.sliderText');
let sliderValue = slider.valueAsNumber;

// create a black canvas with the amount of grids as specified in the slider value
function createCanvas() {
  // Determine the size of each div pixel according to the slider value
  const divWidth = parseInt(getComputedStyle(canvasContainer).width, 10) / sliderValue;
  const divHeight = parseInt(getComputedStyle(canvasContainer).height, 10) / sliderValue;

  // Looping to make each div pixels, the first loop is for each divs line
  for (let i = 0; i < sliderValue; i++) {
    // The canvasContainer has display: flex and flex-direction: column property
    // Each iteration of this loop will create a lineContainer
    // Each line takes the whole container width.
    const lineContainer = document.createElement('div');
    lineContainer.style.display = 'flex'; // each line container is also a flexbox itself
    lineContainer.style.flex = '1'; // the line divs containers will grow and shrink accordingly to fit the container height

    // Create square divs to fit into each lineContainer
    for (let j = 0; j < sliderValue; j++) {
      const div = document.createElement('div');
      div.classList.add('pixel');
      div.style.width = `${divWidth}`;
      div.style.height = `${divHeight}`;
      div.style.backgroundColor = bgColor;
      div.style.flex = '1'; // each square div will grow and shrink accordingly to fit into the lineContainer width.
      div.style.borderStyle = 'solid';
      div.style.borderWidth = 'thin';
      div.style.borderColor = 'black';

      // on click, the div will change its background color to the chosen ink color
      // should also function if the mouse is being dragged while clicked down
      div.addEventListener('click', () => {
         div.style.backgroundColor = inkColor;
       });

       div.addEventListener('mousedown', () => {
         mousedown = true;
       });

       div.addEventListener('mouseup', () => {
         mousedown = false;
      });

      div.addEventListener('mousemove', () => {
        if (mousedown) {
          div.style.backgroundColor = inkColor;
        }
     });
      // append the divs as children to the lineContainer
      lineContainer.appendChild(div);
    }
    // append the lineContainers as children to the canvasContainer
    canvasContainer.appendChild(lineContainer);
  }
}

// remove all the grids in the canvas
function removeCanvas() {
  while (canvasContainer.firstChild) {
    canvasContainer.firstChild.remove();
  }
}
createCanvas();

// Update the current slider value (each time you drag the slider handle)
slider.oninput = () => {
  sliderValue = slider.valueAsNumber;
  sliderText.textContent = `${sliderValue} x ${sliderValue}`;
  removeCanvas();
  createCanvas();
};

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

// Change the background color of each pixel
function changeBackgroundColor(newColor) {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = newColor;
  });
}

// Change text color of all bg color buttons according to the text
// and add an event listener to change the canvas background color
const bgColorButtons = document.querySelector('.bgColorButtons');
const buttons2 = bgColorButtons.querySelectorAll('button');
buttons2.forEach((button) => {
  const color = button.textContent.toLowerCase();
  button.setAttribute('style', `color: ${color}`);
  button.addEventListener('click', () => {
    bgColor = color;
    changeBackgroundColor(bgColor);
  });
});

// Clear button function
// Change the background color of each div to the chosen canvas background color
const clearButton = document.querySelector('.clearButton');
function clear() {
  changeBackgroundColor(bgColor);
}
clearButton.onclick = () => { clear(); };

// Eraser button function
// Simulating an eraser by changing the ink color to be the same as the canvas background color
const eraserButton = document.querySelector('.eraserButton');
function erase() {
  inkColor = bgColor;
}
eraserButton.onclick = () => { erase(); };
