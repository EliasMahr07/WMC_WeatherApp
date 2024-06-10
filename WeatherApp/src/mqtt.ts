import * as mqtt from 'mqtt';

const mqttBrokerUrl = 'mqtt://192.168.1.100:1883';
const topic = 'TEMPERATURE';

const client = mqtt.connect(mqttBrokerUrl);

client.on('connect', () => {
  console.log('Verbunden mit dem MQTT-Broker');
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Fehler beim Abonnieren des Themas: ${err.message}`);
    } else {
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

export const publishTemperature = (temperature: number) => {
  const message = temperature.toString();
  client.publish(topic, message, () => {
    console.log(`Nachricht "${message}" zu Thema "${topic}" veröffentlicht`);
  });
};

export const subscribeToTemperature = () => {
  client.subscribe(topic, (err) => {
    if (err) {
      return `Fehler beim Abonnieren des Themas: ${err.message}`;
    } else {
      return `Erfolgreich abonniert ${topic}`;
    }
  });
};