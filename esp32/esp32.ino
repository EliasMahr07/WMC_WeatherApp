#include <WiFi.h>
#include <Wire.h>
#include <PubSubClient.h>



//const char* wifi_ssid = "HH72VM_BFBE_5G";
//const char* wifi_password = "h73cHVdV";

const char* wifi_ssid = "HH72VM_BFBE_5G";
const char* wifi_password = "h73cHVdV";

const char* mqtt_server = "192.168.1.106";

#define humidity_topic "sensor/DHT11/humidity"
#define temperature_celsius_topic "sensor/DHT11/temperature_celsius"
#define temperature_fahrenheit_topic "sensor/DHT11/temperature_fahrenheit"

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}
