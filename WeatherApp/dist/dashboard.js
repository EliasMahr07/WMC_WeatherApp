"use strict";
/*import { DB } from './database';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const monthLabels = ['Jan', 'Feb', 'März'];

document.addEventListener('DOMContentLoaded', async () => {
  const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
  if (ctx) {
    const data = await DB.getData();

    const datasets = Object.keys(data).map(location => {
      const borderColor = location === 'Kitchen' ? '#FF5733' : '#33FF77';
      return {
        label: location,
        data: monthLabels.map(month => data[location][month]),
        borderColor: borderColor,
      };
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: datasets,
      },
    });
  }
});
*/ 
