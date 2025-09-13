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

export interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  unit: string;
  change: number;
  location: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  link: string;
}
