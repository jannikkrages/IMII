const API_BASE = "https://www.thecolorapi.com";

const redInput = document.querySelector("#red");
const greenInput = document.querySelector("#green");
const blueInput = document.querySelector("#blue");

const redValue = document.querySelector("#redValue");
const greenValue = document.querySelector("#greenValue");
const blueValue = document.querySelector("#blueValue");

const hexInput = document.querySelector("#hexInput");

const rgbResult = document.querySelector("#rgbResult");
const hexResult = document.querySelector("#hexResult");

const rgbPreview = document.querySelector("#rgbPreview");
const hexPreview = document.querySelector("#hexPreview");

const seedColor = document.querySelector("#seedColor");
const schemeMode = document.querySelector("#schemeMode");
const schemeCount = document.querySelector("#schemeCount");

const schemeStatus = document.querySelector("#schemeStatus");
const palette = document.querySelector("#palette");

function clampChannel(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 0 || number > 255) {
    throw new Error("RGB values must be whole numbers from 0 to 255.");
  }

  return number;
}

function cleanHex(value) {
  const hex = value.trim().replace("#", "");

  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) {
    throw new Error("Please enter a valid 3- or 6-digit HEX value.");
  }

  if (hex.length === 3) {
    return hex
      .split("")
      .map((char) => char + char)
      .join("")
      .toUpperCase();
  }

  return hex.toUpperCase();
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((channel) => channel.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function updateSliderLabels() {
  redValue.textContent = redInput.value;
  greenValue.textContent = greenInput.value;
  blueValue.textContent = blueInput.value;
}

async function getColorInfo(hex) {
  const clean = cleanHex(hex);
  const response = await fetch(`${API_BASE}/id?hex=${clean}`);

  if (!response.ok) {
    throw new Error("Could not fetch colour information.");
  }

  return response.json();
}

async function convertRgbToHex() {
  try {
    updateSliderLabels();

    const r = clampChannel(redInput.value);
    const g = clampChannel(greenInput.value);
    const b = clampChannel(blueInput.value);

    const hex = rgbToHex(r, g, b);

    rgbPreview.style.background = hex;
    seedColor.value = hex;

    const data = await getColorInfo(hex);

    rgbResult.innerHTML = `
      <span>${data.hex.value}</span>
      <span>${data.name.value}</span>
      <span>${data.rgb.value}</span>
    `;
  } catch (error) {
    rgbResult.innerHTML = `<span class="error">${error.message}</span>`;
  }
}

async function convertHexToRgb() {
  try {
    const clean = cleanHex(hexInput.value);
    const hex = `#${clean}`;

    hexPreview.style.background = hex;
    seedColor.value = hex;

    const data = await getColorInfo(hex);

    hexResult.innerHTML = `
      <span>${data.rgb.value}</span>
      <span>${data.hex.value}</span>
      <span>${data.name.value}</span>
    `;
  } catch (error) {
    hexResult.innerHTML = `<span class="error">${error.message}</span>`;
  }
}

async function generateScheme() {
  try {
    const clean = cleanHex(seedColor.value);
    const mode = schemeMode.value;
    const count = Math.min(Math.max(Number(schemeCount.value) || 6, 2), 12);

    schemeStatus.textContent = "Loading scheme...";
    palette.innerHTML = "";

    const response = await fetch(
      `${API_BASE}/scheme?hex=${clean}&mode=${mode}&count=${count}`
    );

    if (!response.ok) {
      throw new Error("Could not generate colour scheme.");
    }

    const data = await response.json();

    schemeStatus.textContent = `${data.mode} scheme based on ${data.seed.hex.value}`;

    palette.innerHTML = data.colors
      .map(
        (color) => `
          <article class="swatch">
            <div class="swatch-color" style="background: ${color.hex.value};"></div>

            <div class="swatch-info">
              <strong>${color.name.value}</strong>

              <div class="color-detail">
                <span>HEX</span>
                <span>${color.hex.value}</span>
              </div>

              <div class="color-detail">
                <span>RGB</span>
                <span>${color.rgb.value}</span>
              </div>

              <div class="color-detail">
                <span>HSL</span>
                <span>${color.hsl.value}</span>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    schemeStatus.innerHTML = `<span class="error">${error.message}</span>`;
  }
}

document.querySelector("#hexToRgbBtn").addEventListener("click", convertHexToRgb);
document.querySelector("#generateBtn").addEventListener("click", generateScheme);

[redInput, greenInput, blueInput].forEach((input) => {
  input.addEventListener("input", convertRgbToHex);
});

seedColor.addEventListener("input", generateScheme);
schemeMode.addEventListener("change", generateScheme);

convertRgbToHex();
convertHexToRgb();
generateScheme();
