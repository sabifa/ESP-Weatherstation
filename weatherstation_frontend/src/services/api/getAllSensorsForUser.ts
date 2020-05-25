import httpClient from '../httpClient/httpClient';

export type Sensor = {
  macAddress: string;
  name: string;
  location: string;
  sensorData: SensorData[];
}

export type SensorData = {
  sensorDataId: string;
  temperature: number;
  humidity: number;
  measuredAt: Date;
}

export const getAllSensorsForUser = (): Promise<Sensor[]> => httpClient.get('/sensors/mySensors');
