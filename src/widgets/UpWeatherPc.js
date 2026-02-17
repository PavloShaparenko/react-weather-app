import React, { useState, useEffect } from 'react';
import '../shared/styles/style.css';
import UserCard from '../features/UserCard';
import SearchLocation from '../features/SearchLocation';
import WeatherForecast from '../features/WeatherForecast';

const UpWeatherPc = ({ Scity = "Lublin" }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  
  let Scountry = "Poland";
  
  const [locationInfo, setLocationInfo] = useState({ city: Scity, country: Scountry });

  
  const targetCity = Scity;

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      try {
        setLoading(true);

        
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${targetCity}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Город не найден");
        }

        const { latitude, longitude, name, country } = geoData.results[0];
        
        
        setLocationInfo({ city: name, country: country });

        
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=14`
        );
        const weatherData = await weatherResponse.json();

        const formattedData = weatherData.daily.time.map((date, index) => ({
          date: date,
          condition: mapWmoCodeToCondition(weatherData.daily.weather_code[index]),
          tempDay: Math.round(weatherData.daily.temperature_2m_max[index]),
          tempNight: Math.round(weatherData.daily.temperature_2m_min[index]),
        }));

        setForecast(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка:", error);
        setLoading(false);
      }
    };

    fetchAllWeatherData();
  }, [targetCity]); 

  const mapWmoCodeToCondition = (code) => {
    if (code === 0) return 'sunny';
    if (code >= 1 && code <= 3) return 'cloudy';
    if (code >= 45 && code <= 48) return 'cloudy'; 
    if (code >= 51 && code <= 67) return 'rain';
    if (code >= 71 && code <= 77) return 'snow';
    if (code >= 80 && code <= 82) return 'cloudy_rain';
    if (code >= 85 && code <= 86) return 'cloudy_snow';
    return 'cloudy';
  };

  return (
    <div className="up-weather-pc">
      {/* <UserCard 
        name="Pavel" 
        location={`${locationInfo.city}, ${locationInfo.country}`} 
        avatar="https://randomuser.me/api/portraits/men/1.jpg" 
      /> */}

      <div className="location-search">
        {/* Данные о стране и городе теперь приходят динамически из API геокодирования */}
        <SearchLocation Searchcountry={locationInfo.country} Searchcity={locationInfo.city} />

        {loading ? (
          <div className="loading">loading</div>
        ) : (
          <WeatherForecast data={forecast} />
        )}
      </div>
    </div>
  );
}

export default UpWeatherPc;