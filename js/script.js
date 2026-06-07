// ============================================================
// CHROMA — Color Converter & Scheme Generator
// Uses: https://www.thecolorapi.com
// ============================================================


// ============================================================
// 1. LOAD DOM ELEMENTS
// We grab every element we need from the HTML once at the top.
// ============================================================

const hexInput      = document.querySelector('#hexInput');
const hexBtn        = document.querySelector('#hexBtn');
const hexResult     = document.querySelector('#hexResult');

const rInput        = document.querySelector('#rInput');
const gInput        = document.querySelector('#gInput');
const bInput        = document.querySelector('#bInput');
const rgbBtn        = document.querySelector('#rgbBtn');
const rgbResult     = document.querySelector('#rgbResult');

const colorPicker   = document.querySelector('#colorPicker');

const schemeHexInput = document.querySelector('#schemeHexInput');
const schemeMode    = document.querySelector('#schemeMode');
const schemeBtn     = document.querySelector('#schemeBtn');
const schemeResult  = document.querySelector('#schemeResult');

const colorSwatch   = document.querySelector('#colorSwatch');
const colorName     = document.querySelector('#colorName');

const loader        = document.querySelector('#loader');
const errorMsg      = document.querySelector('#errorMsg');



// ============================================================
// 2. HELPER FUNCTIONS
// Small reusable functions that do one thing each.
// ============================================================

// Show/hide the loading indicator
function showLoader() {
    loader.classList.add('visible');
}
function hideLoader() {
    loader.classList.remove('visible');
}

// Show an error message, hide after 3 seconds
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible');
    setTimeout(() => errorMsg.classList.remove('visible'), 3000);
}

// Copy text to clipboard and show a little "Copied!" toast
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);

    // Create a toast element, show it, then remove it
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = `copied: ${text}`;
    document.body.appendChild(toast);

    // Small delay so the CSS transition can play
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 1800);
}

// Update the big color preview at the top (swatch + color name)
// Wir fügen kurz die Klasse 'pop' hinzu -> CSS macht den Bounce-Effekt
function updatePreview(hexColor, name) {
    colorSwatch.style.backgroundColor = hexColor;
    colorName.textContent = name || hexColor;

    // Klasse entfernen falls sie noch läuft, dann neu setzen
    colorSwatch.classList.remove('pop');
    // requestAnimationFrame wartet einen einzelnen Frame -> Animation startet neu
    requestAnimationFrame(() => {
        requestAnimationFrame(() => colorSwatch.classList.add('pop'));
    });
    setTimeout(() => colorSwatch.classList.remove('pop'), 400);
}

// Make sure a hex string is valid (like #1a2b3c or 1a2b3c)
function isValidHex(hex) {
    const cleaned = hex.replace('#', '');
    return /^[0-9A-Fa-f]{6}$/.test(cleaned);
}

// Make sure an RGB value is a number between 0 and 255
function isValidRgbValue(value) {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 255;
}


// ============================================================
// 3. API FUNCTION
// One central function that talks to The Color API.
// It's async, which means it waits for the server response.
//
// WHAT IS async/await?
// Normally JavaScript runs line by line without waiting.
// When we talk to an API, we need to WAIT for the response.
// "async" marks a function as one that can wait.
// "await" pauses that function until we get the answer back.
// ============================================================

async function fetchColorData(queryParam) {
    // queryParam is something like "hex=1a2b3c" or "rgb=26,43,60"
    const url = `https://www.thecolorapi.com/id?${queryParam}&format=json`;

    showLoader();

    try {
        const response = await fetch(url);       // Wait for the server
        const data = await response.json();      // Wait to turn it into JS object

        hideLoader();
        return data; // Return the color info to whoever called this function

    } catch (error) {
        hideLoader();
        showError('Could not connect to the Color API. Check your internet connection.');
        return null; // Return null if something went wrong
    }
}


// ============================================================
// 4. CONVERT HEX → RGB
// Called when the user clicks "Convert" in the HEX → RGB card.
// ============================================================

async function convertHexToRgb() {
    const hex = hexInput.value.trim();

    if (!isValidHex(hex)) {
        showError('Please enter a valid HEX color like #1a2b3c');
        return;
    }

    const cleanHex = hex.replace('#', '');
    const data = await fetchColorData(`hex=${cleanHex}`);

    if (!data) return; // fetchColorData already showed the error

    const rgb = data.rgb;
    const name = data.name.value;
    const fullHex = data.hex.value;

    // Show the result with a copy hint
    hexResult.innerHTML = `
        rgb(${rgb.r}, ${rgb.g}, ${rgb.b})
        <span class="copy-hint" data-copy="rgb(${rgb.r}, ${rgb.g}, ${rgb.b})">copy</span>
    `;

    // Reveal-Animation: Klasse kurz entfernen und neu setzen
    hexResult.classList.remove('reveal');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => hexResult.classList.add('reveal'));
    });

    // Add click to copy
    hexResult.querySelector('.copy-hint').addEventListener('click', function() {
        copyToClipboard(this.dataset.copy);
    });

    // Pre-fill RGB inputs for convenience
    rInput.value = rgb.r;
    gInput.value = rgb.g;
    bInput.value = rgb.b;

    // Update the color scheme input too
    schemeHexInput.value = fullHex;

    // Update the top preview
    updatePreview(fullHex, name);
}


// ============================================================
// 5. CONVERT RGB → HEX
// Called when the user clicks "Convert" in the RGB → HEX card.
// ============================================================

async function convertRgbToHex() {
    const r = rInput.value;
    const g = gInput.value;
    const b = bInput.value;

    if (!isValidRgbValue(r) || !isValidRgbValue(g) || !isValidRgbValue(b)) {
        showError('Please enter valid RGB values between 0 and 255.');
        return;
    }

    const data = await fetchColorData(`rgb=${r},${g},${b}`);

    if (!data) return;

    const hex = data.hex.value;
    const name = data.name.value;

    // Show the result
    rgbResult.innerHTML = `
        ${hex}
        <span class="copy-hint" data-copy="${hex}">copy</span>
    `;

    // Reveal-Animation
    rgbResult.classList.remove('reveal');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => rgbResult.classList.add('reveal'));
    });

    rgbResult.querySelector('.copy-hint').addEventListener('click', function() {
        copyToClipboard(this.dataset.copy);
    });

    // Pre-fill hex input for convenience
    hexInput.value = hex;

    // Update the scheme input too
    schemeHexInput.value = hex;

    // Update the top preview
    updatePreview(hex, name);
}


// ============================================================
// 6. COLOR PICKER
// When the user uses the native color picker, we sync all inputs.
// The 'input' event fires every time the color changes (live).
// ============================================================

colorPicker.addEventListener('input', async function() {
    const hex = colorPicker.value; // e.g. "#4a90d9"
    hexInput.value = hex;
    schemeHexInput.value = hex;

    // Also fetch to get RGB values and name
    const cleanHex = hex.replace('#', '');
    const data = await fetchColorData(`hex=${cleanHex}`);

    if (!data) return;

    rInput.value = data.rgb.r;
    gInput.value = data.rgb.g;
    bInput.value = data.rgb.b;

    updatePreview(hex, data.name.value);
});


// ============================================================
// 7. SCHEME GENERATOR
// Fetches a color scheme from the API and renders the swatches.
// Uses a DIFFERENT endpoint: /scheme instead of /id
// ============================================================

async function generateScheme() {
    const hex = schemeHexInput.value.trim();
    const mode = schemeMode.value;

    if (!isValidHex(hex)) {
        showError('Please enter a valid HEX color like #1a2b3c');
        return;
    }

    const cleanHex = hex.replace('#', '');
    const count = 5; // How many colors to get back
    const url = `https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${mode}&count=${count}&format=json`;

    showLoader();
    schemeResult.innerHTML = ''; // Clear old results

    try {
        const response = await fetch(url);
        const data = await response.json();
        hideLoader();

        // data.colors is an array of color objects
        // We loop through each one and create a visual chip
        data.colors.forEach(function(color, index) {
            const hex = color.hex.value;
            const name = color.name.value;

            // Create the chip element
            const chip = document.createElement('div');
            chip.classList.add('scheme-chip');

            // Build its inner HTML
            chip.innerHTML = `
                <div class="scheme-color" style="background-color: ${hex}"></div>
                <div class="scheme-hex">${hex}</div>
                <div class="scheme-name">${name}</div>
            `;

            // Clicking a chip copies the hex value
            chip.addEventListener('click', function() {
                copyToClipboard(hex);
            });

            schemeResult.appendChild(chip);

            // Wellen-Eingang: jeder Chip bekommt einen etwas späteren Delay
            // index * 80ms = 0ms, 80ms, 160ms, 240ms, 320ms
            setTimeout(() => chip.classList.add('visible'), index * 80);
        });

    } catch (error) {
        hideLoader();
        showError('Could not load color scheme. Check your internet connection.');
    }
}


// ============================================================
// 8. BUTTON EVENT LISTENERS
// Connect the buttons to the functions above.
// ============================================================

hexBtn.addEventListener('click', convertHexToRgb);
rgbBtn.addEventListener('click', convertRgbToHex);
schemeBtn.addEventListener('click', generateScheme);

// Also allow pressing Enter in the hex input
hexInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') convertHexToRgb();
});

// Allow pressing Enter in any RGB input
[rInput, gInput, bInput].forEach(function(input) {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') convertRgbToHex();
    });
});

schemeHexInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') generateScheme();
});


// ============================================================
// 9. INIT — Run on page load
// Set a default color so the page doesn't look empty.
// ============================================================

async function init() {
    const defaultHex = '4a90d9';
    const data = await fetchColorData(`hex=${defaultHex}`);

    if (data) {
        updatePreview(data.hex.value, data.name.value);
        hexInput.value = data.hex.value;
        schemeHexInput.value = data.hex.value;
        rInput.value = data.rgb.r;
        gInput.value = data.rgb.g;
        bInput.value = data.rgb.b;
    }
}

init();
