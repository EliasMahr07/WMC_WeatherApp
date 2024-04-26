const kitchenData = [10, 15, 3];
const livingroomData = [5, 8, 3];

hourLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',];
monthLabels = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];


// Initialisierung des Liniendiagramms
const ctx = document.getElementById('myChart').getContext('2d');
const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'März'],
        datasets: [
            { label: 'Küche', data: kitchenData, borderColor: '#FF5733' },
            { label: 'Wohnzimmer', data: livingroomData, borderColor: '#33FF77' }
        ],
    },
});