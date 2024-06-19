document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
  });
  
  function fetchWeatherData() {
    fetch('/get-weather') 
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('weatherTable').getElementsByTagName('tbody')[0];
        console.log("hahaha");
        tableBody.innerHTML = ''; 
        data.forEach(row => {
            console.log("hahaha");
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${row.id}</td><td>${row.date}</td><td>${row.temperature}</td><td>${row.humidity}</td><td>${row.room}</td>`;
          tableBody.appendChild(tr);
        });
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }