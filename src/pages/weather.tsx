import React, { useEffect, useState } from 'react';

interface WeatherProps {
  setTip?: (tip: string) => void;
}

const Weather: React.FC<WeatherProps> = ({ setTip }) => {
  const [weather, setWeather] = useState<{
    temp_c: number;
    condition: string;
    uv: number;
    pollenCount?: string;
  } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const { latitude, longitude } = position.coords;
        const apiKey = '485f1534a98b4cde9a793925250604'; // your API key
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        const data = await response.json();

        const weatherData = {
          temp_c: data.current.temp_c,
          condition: data.current.condition.text,
          uv: data.current.uv,
        };

        setWeather(weatherData);

        // Set tooltip tip if setTip is provided
        if (setTip) {
          const uv = weatherData.uv;
          let tip = '';

          if (uv >= 8) {
            tip = '🌞 UV Index is very high! Wear sunscreen and a hat!';
          } else if (uv >= 5) {
            tip = '😎 UV Index is moderate. Sunscreen is a good idea!';
          } else {
            tip = '🌥️ UV Index is low. Chill vibes, but stay protected!';
          }

          setTip(tip);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [setTip]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="text-sm text-gray-700">
      <strong>🌡️ {weather.temp_c}°C</strong> · {weather.condition}· <span className="text-yellow-600 font-medium">UV: {weather.uv}</span>
    </div>
  );
};

export default Weather;
