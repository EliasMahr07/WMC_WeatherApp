// API URL und Schlüssel
let counter = 0;
const apiKey = '870b0d97ae8a182f9052b82adf97f49e';
function plus(where){
    const weatherDiv = document.getElementById(where);
    weatherDiv.innerHTML = `<label for="fname">Search City: </label>
        <input type="text" id="tmp${counter}" name="fname">
        <button type="button" name="login" class="fa fa-search" id="login2" onclick="login('${where}','tmp${counter}')" "></button>
    `;
    counter++;
}
function login(where, where2){
    console.log("login");
    const userInput = document.getElementById(where2).value;
    fetchWeather(userInput, where);
}
// Funktion, um Wetterdaten zu holen
async function fetchWeather(userInput, where) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric&lang=de`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data, where, userInput);
        } else {
            document.getElementById(where).innerText = `Fehler: ${data.message}`;
        }
    } catch (error) {
        document.getElementById(where).innerText = `Fehler: ${error.message}`;
    }
}

// Funktion, um Wetterdaten anzuzeigen
function displayWeather(data, where, userInput) {
    const weatherDiv = document.getElementById(where);
    const { main, weather, wind } = data;

    weatherDiv.innerHTML = `
        <h1>Weather in ${userInput} </h1>
        <p><strong>Temperatur:</strong> ${main.temp}°C</p>
        <p><strong>Wetter:</strong> ${weather[0].description}</p>
        <p><strong>Windgeschwindigkeit:</strong> ${wind.speed} m/s</p>
        <p><strong>Luftfeuchtigkeit:</strong> ${main.humidity}%</p>
    `;
}
document.getElementById("login2").addEventListener("click", login);

window.onload = function () {
    console.log("onload");
}