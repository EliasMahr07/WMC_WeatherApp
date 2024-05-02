const kitchenData = [10, 15, 3];
const livingroomData = [5, 8, 3];

const dayLabels = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const hourLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];
const monthLabels = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

const colors = ['#FF5733', '#1E90FF', '#32CD32', '#FFD700', '#8A2BE2', '#FF4500', '#00CED1', '#FF69B4', '#00FF00', '#FF6347', '#4169E1', '#FF7F50', '#7FFF00', '#9932CC', '#00FFFF', '#FF8C00', '#20B2AA', '#FF1493', '#00BFFF', '#2E8B57'];
const datasets = [{ label: 'Küche',      data: kitchenData,    borderColor: '#FF5733' },
            { label: 'Wohnzimmer', data: livingroomData, borderColor: '#33FF77' }];
const loc = ['Küche', 'Wohnzimmer'];


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