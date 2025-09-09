"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyWeather } from "@/lib/dummy-data";
import { Sun, Cloudy, CloudRain, Thermometer, Droplets } from "lucide-react";

const weatherIcons: { [key: string]: React.ReactNode } = {
  "Sunny": <Sun className="w-5 h-5 text-yellow-500" />,
  "Partly Cloudy": <Cloudy className="w-5 h-5 text-gray-500" />,
  "Rainy": <CloudRain className="w-5 h-5 text-blue-500" />,
};

export function WeatherWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
            <div>
              <p className="text-sm text-muted-foreground">Now</p>
              <p className="text-3xl font-bold">{dummyWeather.currentTemperature}°C</p>
              <p className="text-sm">{dummyWeather.weatherCondition}</p>
            </div>
            <div className="text-6xl opacity-80">
                {weatherIcons[dummyWeather.weatherCondition] || <Cloudy className="w-16 h-16 text-gray-500" />}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <span>{dummyWeather.humidity}% Humidity</span>
            </div>
          </div>
          <div className="space-y-2">
             <h4 className="font-semibold">3-Day Forecast</h4>
            {dummyWeather.temperatureForecast.map((forecast) => (
              <div key={forecast.date} className="flex justify-between items-center text-sm">
                <p>{new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-muted-foreground" />
                  <p className="font-medium">{forecast.temperature}°C</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
