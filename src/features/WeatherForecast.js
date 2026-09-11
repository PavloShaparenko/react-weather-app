import React from 'react';
import '../shared/styles/style.css';

const WeatherForecast = ({ data }) => {
  
  if (!data || data.length === 0) return <div className="forecast-container">Loading...</div>;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rain': return '🌧️';
      case 'snow': return '❄️';
      case 'cloudy_snow': return '🌨️';
      case 'sun_snow': return '🌦️';
      case 'sun_rain': return '🌦️';
      case 'cloudy_rain': return '🌧️';
      default: return '☁️';
    }
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-EN', { weekday: 'short' }).format(date);
  };

  return (
    <div className="forecast-container">
      {data.map((item, index) => (
        <div key={index} className={`forecast-day ${index === 0 ? 'active' : ''}`}>
          <span className="day-name">{getDayName(item.date)}</span>
          
          <div className="weather-icon">
            {getWeatherIcon(item.condition)}
          </div>
          
          <div className="temp-group">
            <span className="temp-day">{item.tempDay}°</span>
            <span className="temp-night">{item.tempNight}°</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
