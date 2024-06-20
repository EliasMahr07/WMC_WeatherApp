let chart; // Declare a global variable to store the chart instance

document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
});

// Define updateChart as a global function
window.updateChart = function updateChart(weatherData) {
    const processedData = processData(weatherData);
    createLineChart(processedData);
};

function processData(data) {
    const months = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const kitchenData = new Array(12).fill(0).map(() => []);
    const livingroomData = new Array(12).fill(0).map(() => []);
    const monthLabels = months;

    data.forEach(entry => {
        const date = new Date(entry.date);
        const monthIndex = date.getMonth();

        if (entry.room.toLowerCase() === 'kitchen') {
            kitchenData[monthIndex].push(entry.temperature);
        } else if (entry.room.toLowerCase() === 'livingroom') {
            livingroomData[monthIndex].push(entry.temperature);
        }

        monthLabels[monthIndex] = months[monthIndex];
    });

    // Calculate average temperature for each month
    const avgKitchenData = kitchenData.map(monthArray => monthArray.length ? (monthArray.reduce((sum, value) => sum + value, 0) / monthArray.length) : null);
    const avgLivingroomData = livingroomData.map(monthArray => monthArray.length ? (monthArray.reduce((sum, value) => sum + value, 0) / monthArray.length) : null);

    return {
        labels: monthLabels,
        datasets: [
            { label: 'Kitchen', data: avgKitchenData, borderColor: '#FF5733' },
            { label: 'Livingroom', data: avgLivingroomData, borderColor: '#33FF77' }
        ]
    };
}

function createLineChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // If a chart already exists, destroy it before creating a new one
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: data.datasets
        }
    });
}
