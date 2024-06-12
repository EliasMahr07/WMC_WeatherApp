"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToTemperature = exports.publishTemperature = void 0;
const mqtt = __importStar(require("mqtt"));
const mqttBrokerUrl = 'mqtt://192.168.1.100:1883';
const topic = 'TEMPERATURE';
const client = mqtt.connect(mqttBrokerUrl);
client.on('connect', () => {
    console.log('Verbunden mit dem MQTT-Broker');
    client.subscribe(topic, (err) => {
        if (err) {
            console.error(`Fehler beim Abonnieren des Themas: ${err.message}`);
        }
        else {
            console.log(`Thema "${topic}" abonniert`);
        }
    });
});
client.on('message', (topic, message) => {
    console.log(`Nachricht empfangen [${topic}]: ${message.toString()}`);
});
client.on('error', (err) => {
    console.error(`MQTT-Fehler: ${err.message}`);
});
const publishTemperature = (temperature) => {
    const message = temperature.toString();
    client.publish(topic, message, () => {
        console.log(`Nachricht "${message}" zu Thema "${topic}" veröffentlicht`);
    });
};
exports.publishTemperature = publishTemperature;
const subscribeToTemperature = () => {
    client.subscribe(topic, (err) => {
        if (err) {
            return `Fehler beim Abonnieren des Themas: ${err.message}`;
        }
        else {
            return `Erfolgreich abonniert ${topic}`;
        }
    });
};
exports.subscribeToTemperature = subscribeToTemperature;
