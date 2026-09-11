import React, { useState, useEffect } from 'react';

import './shared/styles/style.css';
import Header from './widgets/header';
import Footer from './widgets/Footer';
import UpWeatherPc from './widgets/UpWeatherPc';
import WeatherManager from './widgets/WeatherManager';
import WeatherHighlights from './widgets/WeatherHighlights';
import WeatherBackground from './widgets/WeatherBackground'; 
import { fetchWeatherData } from './widgets/WeatherApi';

function App() {
  const [searchedCity, setSearchedCity] = useState('Lublin');
  const [lang, setLang] = useState('en');
  const [weather, setWeather] = useState(null);


  const handleCitySearch = (city) => {
    setSearchedCity(city);
  };

  const changeLanguage = (newLang) => setLang(newLang);

  useEffect(() => {
    // setLoading(true);
    fetchWeatherData(searchedCity)
      .then(data => { 
          setWeather(data); 
          // setLoading(false); 
      })
      .catch(() => {
          // setLoading(false);
      });
  }, [searchedCity]);

  return (
    <div className="app-container">

      
      <WeatherBackground weatherData={weather?.fullRawData} /> 

      <Header onSearch={handleCitySearch} lang={lang} changeLang={changeLanguage} />
      <UpWeatherPc Scity={searchedCity} lang={lang} />
      
      
      <WeatherManager city={searchedCity} lang={lang} />
      
      <WeatherHighlights data={weather?.fullRawData} lang={lang} />
      <Footer />
      
    </div>
  );
}

export default App;
