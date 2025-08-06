const generateBtn = document.querySelector("#generate-palette");
const results = document.querySelector("#results");
const userColorInput = document.querySelector("#user-color");


// Declared a function colorNameToRGB which  converts a color name into an RGB array.
function colorNameToRGB(name) {
  const temp = document.createElement("div");
  temp.style.color = name;
  document.body.appendChild(temp);

  const computedColor = getComputedStyle(temp).color;
  document.body.removeChild(temp);

    // Using regex to extract the RGB values from the string
  const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  // If the rgb string value is invalid return null
  if (!rgbMatch) return null;

 //returning  the rgb value in the form array of number
  return [ 
    parseInt(rgbMatch[1]),
    parseInt(rgbMatch[2]),
    parseInt(rgbMatch[3])
  ];
}

generateBtn.addEventListener("click", () => {
    // getting the exact user input
  const colorName = userColorInput.value.trim().toLowerCase();

  // show an error message if the color name is not entered
  if (colorName === "") {
    results.innerHTML = `<p style="color:red;"> Enter a color name.</p>`;
    return;
  }

  const rgb = colorNameToRGB(colorName);

  //show the error message if the color is invalid
  if (!rgb) {
    results.innerHTML = `<p style="color:red;">Invalid color name: "${colorName}". Write any other color name .</p>`;
    return;
  }
//Send a POST request to the Colormind API 
  fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({
      model: "default",
      input: [rgb, "N", "N", "N", "N"]
    })
  })
    .then((response) => response.json())
    .then((data) => {
        //show the color palette on the page 
      displayPalette(data.result);
    })

    //show an error message if something goes wrong 
    .catch((error) => {
      results.innerHTML = `<p style="color:red;">Api do not have palette for this word . Try any other color </p>`;
      console.error("unexpected api  error:", error);
    });
});


//declared a function to show the result on the webpage 
function displayPalette(palette) {
  results.innerHTML = "";

  //using foreach loop to go through each color  in the palette 
  palette.forEach((color, index) => {
    const [r, g, b] = color;
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    swatch.textContent = `Color ${index + 1}: rgb(${r}, ${g}, ${b})`;
    results.appendChild(swatch);
  });
}
