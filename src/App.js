import React, { useState, useEffect } from 'react';
// import bgGif from './shared/art/spring.webp'; // <--- TO USUŃ
import './shared/styles/style.css';
import Header from './widgets/header';
import Footer from './widgets/Footer';
import UpWeatherPc from './widgets/UpWeatherPc';
import WeatherManager from './widgets/WeatherManager';
import WeatherHighlights from './widgets/WeatherHighlights';
import WeatherBackground from './widgets/WeatherBackground'; // <--- IMPORTUJ NOWY KOMPONENT
import { fetchWeatherData } from './widgets/WeatherApi';

function App() {
  const [searchedCity, setSearchedCity] = useState('Lublin');
  const [lang, setLang] = useState('en');
  const [weather, setWeather] = useState(null);
  // const [loading, setLoading] = useState(true); // Opcjonalne, jeśli używasz loadera

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

      {/* --- NOWE DYNAMICZNE TŁO --- */}
      {/* Przekazujemy pełne dane pogodowe do komponentu tła */}
      <WeatherBackground weatherData={weather?.fullRawData} /> 

      <Header onSearch={handleCitySearch} lang={lang} changeLang={changeLanguage} />
      <UpWeatherPc Scity={searchedCity} />
      
      {/* WeatherManager wciąż działa po swojemu */}
      <WeatherManager city={searchedCity} lang={lang} />
      
      <WeatherHighlights data={weather?.fullRawData} lang={lang} />
      <Footer />
      
    </div>
  );
}

export default App;