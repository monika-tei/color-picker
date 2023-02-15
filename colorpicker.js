"use strict";

//We are going to use the <input type="color">, and focus on showing info about the selected color.

// Create a webpage where the user can select a color using <input type="color">
// Everytime the user changes the color, the webpage must update the display
// The selected color must be displayed as:
// a color , HEX code , RGB values , HSL values;

window.addEventListener("DOMContentLoaded", start);

const colorInput = document.getElementById("colorInput");
let hex, h, s, l, r, g, b;

// First, we need to listen to what color user picks
function start() {
  console.log("waiting for your selection...");
  inputListener();
}

// the reason why my code didnt react to input before is
// I wrote my event listener as ("input", colorChanged()) with parenthesis

function inputListener() {
  console.log("you chose a color");
  colorInput.addEventListener("input", colorChanged);
}

// Read the value of the color input
function colorChanged() {
  console.log(colorInput.value); // the value is read in hex-code
  hex = colorInput.value; // so let's define it

  // now we can engage the color conversion functions
  HEXtoRGB(hex);
  RGBtoHSL(r, g, b);
  displayToScreen(hex, r, g, b, h, s, l);
  //and display them
}

// Display the colors on the screen
// Showing the color as HEX, RGB, HSL
function displayToScreen(hex, r, g, b, h, s, l) {
  document.querySelector("section").style.backgroundColor = hex;
  document.querySelector("#hex").textContent = `${hex}`;
  document.querySelector("#rgb").textContent = `(${r}, ${g}, ${b})`;
  document.querySelector("#hsl").textContent = `${h.toFixed(0)}, ${s.toFixed(
    0
  )}%, ${l.toFixed(0)}%`;
}

// Converting HEX to RGB
function HEXtoRGB(hex) {
  r = parseInt(hex.substring(1, 3), 16);
  g = parseInt(hex.substring(3, 5), 16);
  b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

// Converting RGB to HSL
function RGBtoHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log(h, s, l); // just for testing
}
