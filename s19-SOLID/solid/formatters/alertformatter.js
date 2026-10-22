export class AlertFormatter {
    static formatText(sensorData) {
        return `[ALERT] Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
    }

    static formatHTML(sensorData) {
        return `<h1>Alert</h1><p>Sensor <b>${sensorData.id}</b> reached <i>${sensorData.reading}</i></p>`;
    }

    static formatSocialMedia (sensorData) {
        return `🚨 ALERT: Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
    }
}
