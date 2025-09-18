"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloudy, CloudRain, Thermometer, Droplets } from "lucide-react";

// Define API response type (simplified)
interface WeatherData {
  currentTemperature: number;
  humidity: number;
  weatherCondition: string;
  forecast: { date: string; temperature: number; condition: string }[];
}

const weatherIcons: { [key: string]: React.ReactNode } = {
  "Clear": <Sun className="w-5 h-5 text-yellow-500" />,
  "Clouds": <Cloudy className="w-5 h-5 text-gray-500" />,
  "Rain": <CloudRain className="w-5 h-5 text-blue-500" />,
};

export function WeatherWidget({ city = "Delhi" }: { city?: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY; // put in .env.local
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        // Current weather
        const resCurrent = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const dataCurrent = await resCurrent.json();

        if (dataCurrent.cod !== 200) {
          throw new Error(dataCurrent.message);
        }

        // Forecast (5-day / 3-hour)
        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const dataForecast = await resForecast.json();

        // Pick one forecast per day (at noon)
        const dailyForecast = dataForecast.list.filter((item: any) =>
          item.dt_txt.includes("12:00:00")
        ).slice(0, 5);

        setWeather({
          currentTemperature: Math.round(dataCurrent.main.temp),
          humidity: dataCurrent.main.humidity,
          weatherCondition: dataCurrent.weather[0].main,
          forecast: dailyForecast.map((f: any) => ({
            date: f.dt_txt,
            temperature: Math.round(f.main.temp),
            condition: f.weather[0].main,
          })),
        });
      } catch (err: any) {
        setError(err.message || "Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Local Weather</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Local Weather</CardTitle>
        </CardHeader>
        <CardContent>Error: {error}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather in {city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Current */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
            <div>
              <p className="text-sm text-muted-foreground">Now</p>
              <p className="text-3xl font-bold">{weather.currentTemperature}°C</p>
              <p className="text-sm">{weather.weatherCondition}</p>
            </div>
            <div className="text-6xl opacity-80">
              {weatherIcons[weather.weatherCondition] || (
                <Cloudy className="w-16 h-16 text-gray-500" />
              )}
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <span>{weather.humidity}% Humidity</span>
            </div>
          </div>

          {/* Forecast */}
          <div className="space-y-2">
            <h4 className="font-semibold">5-Day Forecast</h4>
            {weather.forecast.map((forecast) => (
              <div
                key={forecast.date}
                className="flex justify-between items-center text-sm"
              >
                <p>
                  {new Date(forecast.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <div className="flex items-center gap-2">
                  {weatherIcons[forecast.condition] || (
                    <Cloudy className="w-4 h-4 text-gray-500" />
                  )}
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
