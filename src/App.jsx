import { useState } from 'react';
import WeatherCard from './WeatherCard';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const cityName = city.trim();
    if (!cityName) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=metric`
      );

      const text = await res.text();
      console.log("API raw response:", text);
      if (!res.ok) throw new Error('City not found');

      const data = JSON.parse(text);
      setWeather({
  temp: data.main.temp,
  humidity: data.main.humidity,
  condition: data.weather[0].main,
  description: data.weather[0].description,
  icon: data.weather[0].icon,
  rain: data.rain?.['1h'] || 0,
});

      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px'}}>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city (e.g., delhi, new york)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', width: '200px', marginRight: '10px' }}
      />
      <button onClick={fetchWeather} style={{ padding: '8px 16px' }}>
        Get Weather
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      {weather && <WeatherCard city={city} weather={weather} />}
    </div>
  );
}

export default App;
