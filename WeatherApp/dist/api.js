// API URL und Schlüssel
const apiKey = '870b0d97ae8a182f9052b82adf97f49e';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric&lang=de`;

const apiUrlLinz = `https://api.openweathermap.org/data/2.5/weather?q=Linz&appid=${apiKey}&units=metric&lang=de`;

const apiUrlWien = `https://api.openweathermap.org/data/2.5/weather?q=Wien&appid=${apiKey}&units=metric&lang=de`;
// Funktion, um Wetterdaten zu holen
async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            document.getElementById('weather').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weather').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            document.getElementById('weather').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weather').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}

// Wetterdaten holen, wenn die Seite geladen ist
window.onload = fetchWeather;

// Wetterdaten holen, wenn die Seite geladen ist
window.onload = fetchWeather;


