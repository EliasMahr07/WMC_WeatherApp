"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const chart_js_1 = require("chart.js");
chart_js_1.Chart.register(...chart_js_1.registerables);
const monthLabels = ['Jan', 'Feb', 'März'];
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (ctx) {
        const data = yield database_1.DB.getData();
        const datasets = Object.keys(data).map(location => {
            const borderColor = location === 'Kitchen' ? '#FF5733' : '#33FF77';
            return {
                label: location,
                data: monthLabels.map(month => data[location][month]),
                borderColor: borderColor,
            };
        });
        new chart_js_1.Chart(ctx, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: datasets,
            },
        });
    }
}));
