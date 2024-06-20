document.addEventListener('DOMContentLoaded', function() {
  fetchWeatherData();
});

document.getElementById('refreshButton').addEventListener('click', fetchWeatherData);

async function fetchWeatherData() {
  try {
      const response = await fetch('/get-weather');
      const data = await response.json();
      updateWeatherTable(data);
      window.updateChart(data); // Update the chart with the latest data
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}

function updateWeatherTable(data) {
  const tableBody = document.getElementById('weatherTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; 
  data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.id}</td><td>${row.date}</td><td>${row.temperature}</td><td>${row.humidity}</td><td>${row.room}</td>`;
      tableBody.appendChild(tr);
  });
}

document.getElementById('deleteButton').addEventListener('click', async () => {
  try {
      const response = await fetch('/delete-all-data', {
          method: 'POST',
      });
      const result = await response.json();
      if (result.success) {
          alert('Deleted all weather data successfully.');
          fetchWeatherData(); // Refresh data after deletion
      } else {
          alert('Failed to delete weather data.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting weather data.');
  }
});
