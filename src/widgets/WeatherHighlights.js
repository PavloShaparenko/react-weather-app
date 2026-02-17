import React from 'react';
import '../shared/styles/style.css';
import { translations } from '../translations';

const WeatherHighlights = ({ data, lang = 'en' }) => {
  if (!data || !data.current) return null;
  const { current } = data;
  const t = translations[lang] || translations.en;

  const getAirQualityLabel = (index) => {
    const levels = {
      1: { text: 'Excellent', color: '#4ade80' },
      2: { text: 'Good', color: '#a3e635' },
      3: { text: 'Moderate', color: '#facc15' },
      4: { text: 'Poor', color: '#fb923c' },
      5: { text: 'Very Poor', color: '#f87171' },
      6: { text: 'Hazardous', color: '#b91c1c' }
    };
    return levels[index] || { text: 'No data', color: '#fff' };
  };

  const aqi = getAirQualityLabel(current.air_quality?.['us-epa-index']);

  return (
    <div className="highlights-grid">
      {/* Wind */}
      <div className="highlight-card">
        <span className="highlight-title">{t.windStatus}</span>
        <div className="highlight-value">
          {current.wind_kph} <small>km/h</small>
        </div>
        <div className="highlight-footer">
          <span 
            className="wind-arrow" 
            style={{ transform: `rotate(${current.wind_degree}deg)` }}
          >
            ⬆️
          </span>
          <span>{current.wind_dir}</span>
        </div>
      </div>

      {/* AQI */}
      <div className="highlight-card">
        <span className="highlight-title">{t.airQuality}</span>
        <div className="highlight-value" style={{ color: aqi.color }}>
          {aqi.text}
        </div>
        <div className="highlight-footer">
          {t.epaIndex}: {current.air_quality?.['us-epa-index'] || 'N/A'}
        </div>
      </div>

      {/* Humidity */}
      <div className="highlight-card">
        <span className="highlight-title">{t.humidity}</span>
        <div className="highlight-value">{current.humidity}%</div>
        <div className="highlight-footer">
          {t.dewPoint}: {current.dewpoint_c}°C
        </div>
      </div>
    </div>
  );
};

export default WeatherHighlights;