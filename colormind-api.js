
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

generateBtn.addEventListener("click", () => {
  const colorName = userColorInput.value.trim().toLowerCase();
  if (colorName === "") {
    results.innerHTML = `<p style="color:red;"> Enter a color name.</p>`;
    return;
  }

  const rgb = colorNameToRGB(colorName);

  if (!rgb) {
    results.innerHTML = `<p style="color:red;">Invalid color name: "${colorName}". Write any other color name .</p>`;
    return;
  }

  fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({
      model: "default",
      input: [rgb, "N", "N", "N", "N"]
    })
  })
    .then((response) => response.json())
    .then((data) => {
      displayPalette(data.result);
    })
    .catch((error) => {
      results.innerHTML = `<p style="color:red;">Api do not have palette for this word . Try any other color </p>`;
      console.error("unexpected api  error:", error);
    });
});
