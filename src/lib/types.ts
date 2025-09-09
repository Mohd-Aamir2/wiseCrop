export interface Weather {
  currentTemperature: number;
  humidity: number;
  weatherCondition: string;
  temperatureForecast: {
    date: string;
    temperature: number;
  }[];
}

export interface HistoricalOutcome {
  cropType: string;
  yield: number;
  fertilizerUsed: string;
}
