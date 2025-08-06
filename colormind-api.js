
const generateBtn = document.querySelector("#generate-palette");
const results = document.querySelector("#results");
const userColorInput = document.querySelector("#user-color");

function colorNameToRGB(name) {
  const temp = document.createElement("div");
  temp.style.color = name;
  document.body.appendChild(temp);

  const computedColor = getComputedStyle(temp).color;
  document.body.removeChild(temp);

  const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!rgbMatch) return null;

  return [
    parseInt(rgbMatch[1]),
    parseInt(rgbMatch[2]),
    parseInt(rgbMatch[3])
  ];
}
