// API URL und Schlüssel
const apiKey = '870b0d97ae8a182f9052b82adf97f49e';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric&lang=de`;

const apiUrlLinz = `https://api.openweathermap.org/data/2.5/weather?q=Linz&appid=${apiKey}&units=metric&lang=de`;

const apiUrlWien = `https://api.openweathermap.org/data/2.5/weather?q=Wien&appid=${apiKey}&units=metric&lang=de`;
const apiUrlRechberg = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric&lang=de`;
const apiUrlTokyo = `https://api.openweathermap.org/data/2.5/weather?q=Tokio&appid=${apiKey}&units=metric&lang=de`;
const apiUrlToronto = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=metric&lang=de`;

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

async function fetchWeatherLinz() {
    try {
        const response = await fetch(apiUrlLinz);
        const data = await response.json();

        if (response.ok) {
            displayWeatherLinz(data);
        } else {
            document.getElementById('weatherLinz').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weatherLinz').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeatherLinz(data) {
    const weatherDiv = document.getElementById('weatherLinz');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}

async function fetchWeatherWien() {
    try {
        const response = await fetch(apiUrlWien);
        const data = await response.json();

        if (response.ok) {
            displayWeatherWien(data);
        } else {
            document.getElementById('weatherWien').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weatherWien').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeatherWien(data) {
    const weatherDiv = document.getElementById('weatherWien');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}

async function fetchWeatherRechberg() {
    try {
        const response = await fetch(apiUrlRechberg);
        const data = await response.json();

        if (response.ok) {
            displayWeatherRechberg(data);
        } else {
            document.getElementById('weatherRechberg').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weatherRechberg').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeatherRechberg(data) {
    const weatherDiv = document.getElementById('weatherRechberg');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}

async function fetchWeatherTokyo() {
    try {
        const response = await fetch(apiUrlTokyo);
        const data = await response.json();

        if (response.ok) {
            displayWeatherTokyo(data);
        } else {
            document.getElementById('weatherTokyo').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weatherTokyo').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeatherTokyo(data) {
    const weatherDiv = document.getElementById('weatherTokyo');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}

async function fetchWeatherToronto() {
    try {
        const response = await fetch(apiUrlToronto);
        const data = await response.json();

        if (response.ok) {
            displayWeatherToronto(data);
        } else {
            document.getElementById('weatherToronto').innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weatherToronto').innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeatherToronto(data) {
    const weatherDiv = document.getElementById('weatherToronto');
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}
window.onload = function () {
    fetchWeather();
    fetchWeatherLinz();
    fetchWeatherWien();
    fetchWeatherRechberg();
    fetchWeatherTokyo();
    fetchWeatherToronto();
}