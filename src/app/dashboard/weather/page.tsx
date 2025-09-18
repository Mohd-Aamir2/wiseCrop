"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WeatherData {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      // Group forecast by day (pick one reading per day, e.g. 12:00)
      const daily: WeatherData[] = [];
      const map = new Map();

      for (let item of data.list) {
        const date = item.dt_txt.split(" ")[0];
        if (!map.has(date) && item.dt_txt.includes("12:00:00")) {
          map.set(date, true);
          daily.push({
            date,
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          });
        }
      }

      setForecast(daily.slice(0, 5)); // Only 5 days
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        5-Day Weather Forecast
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="px-4 py-2 rounded-lg outline-none"
        />
        <button
          onClick={fetchWeather}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
        >
          Get Forecast
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-4xl">
        {forecast.map((day, i) => (
          <motion.div
            key={i}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg text-white"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-semibold">{day.date}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="mx-auto"
            />
            <p className="text-xl font-bold">{day.temp}°C</p>
            <p className="capitalize">{day.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
