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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherservice_1 = require("./weatherservice");
const historyservice_1 = require("./historyservice");
const userservice_1 = require("./userservice");
const dayjs = require('dayjs');
const weatherworldservice_1 = require("./weatherworldservice");
//import { authRouter } from './auth-router';
//import { isAdmin, isAuthenticated } from './auth-handler';
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_router_1 = require("./auth-router");
const SECRET_KEY = "secrete_key";
const app = (0, express_1.default)();
__dirname = path_1.default.resolve();
const rootDir = path_1.default.join(__dirname, "./public");
app.use(express_1.default.json());
app.post("/api/register", userservice_1.createUser);
app.use("/api/auth", auth_router_1.authRouter);
app.use('../assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
app.post('/api/auth/token', (req, res) => {
    const { secretKey } = req.body;
    if (secretKey === "YOUR_SECRET_KEY") {
        const token = jsonwebtoken_1.default.sign({ userId: 1 }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});
// Route
app.get('/', (req, res, next) => {
    if (true) {
        res.sendFile('index.html', { root: rootDir });
    }
    else {
        next();
    }
});
app.post('/add-weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { temperature, humidity, room } = req.body;
    const nowDate = dayjs().toISOString();
    yield (0, weatherservice_1.addWeatherData)(nowDate, temperature, humidity, room);
    res.send('Weather data added successfully');
}));
app.get('/get-weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weatherData = yield (0, weatherservice_1.getWeatherData)();
        res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
    }
    catch (error) {
        res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der Wetterdaten');
    }
}));
app.get('/get-getUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weatherData = yield (0, userservice_1.getUsers)();
        res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
    }
    catch (error) {
        res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der User');
    }
}));
app.post('/add-city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, city } = req.body;
    yield (0, weatherworldservice_1.addCity)(userid, city);
    res.send('City data added successfully');
}));
app.get('/get-getCitys', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.body;
        const weatherData = yield (0, weatherworldservice_1.getCitys)(userid);
        res.json(weatherData); // Sendet die Wetterdaten als JSON zurück
    }
    catch (error) {
        res.status(500).send('Ein Fehler ist aufgetreten beim Abrufen der Städte');
    }
}));
app.post('/delete-all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, weatherservice_1.deleteAllData)();
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting weather data:', error);
        res.json({ success: false });
    }
}));
app.get('/weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const weatherData = await getWeatherData();
    res.sendFile('index.html', { root: rootDir });
    //res.render('index.html', { weatherData });
}));
/*
app.get('/admin', isAuthenticated, isAdmin, (req, res, next) => {
    res.send('Hello, Admin!');
});
*/
app.use(express_1.default.static('public'));
// Verbinde den Router mit deiner Express-App
//app.use('/api/auth', authRouter);
// Starte den Server
const port = process.env.PORT || 3000;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, weatherservice_1.createDatabase)();
    yield (0, historyservice_1.createHistroyTable)();
    yield (0, userservice_1.createUserTable)();
    yield (0, userservice_1.deleteUser)("Leopoldd");
    //await addUsers("testapi", "leopold.mistelberger@gmx.at", "1234", "admin");
    //await login("Leopold", "1234");
    //await changePwd("Leopoldd", "12345");
    //await changeRole("Leopolddd", "client");
    console.log(`Server läuft auf Port ${port}`);
}));
