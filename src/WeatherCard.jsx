export default function WeatherCard({ city, weather }) {
  return (
    <div style={{
      marginTop: '30px',
      border: '1px solid #ccc',
      padding: '20px',
      width: '250px',
      margin: '30px auto',
      borderRadius: '8px',
      backgroundColor: '#f0f8ff',
    }}>
      <h2>{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
      <p>🌡 Temperature: {weather.temp}°C</p>
      <p>💧 Humidity: {weather.humidity}%</p>
      <p>☁️ Condition: {weather.condition}</p>
      <p>📝 Description: {weather.description}</p>
      <p>🌧 Rain (1h): {weather.rain || '0'} mm</p>
    </div>
  );
}
