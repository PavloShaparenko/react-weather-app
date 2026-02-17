import React from 'react';
import Snowfall from 'react-snowfall';

// --- IMPORTY OBRAZKÓW ---
// Upewnij się, że rozszerzenia są identyczne jak nazwy plików w folderze!
import springBg from '../shared/art/spring.webp';
import summerBg from '../shared/art/summer.webp'; // Zwróć uwagę na rozszerzenie .wbp czy .webp?
import autumnBg from '../shared/art/autumn.jpg';
import winterBg from '../shared/art/snow.jpg';

const WeatherBackground = ({ weatherData }) => {
  // 1. Jeśli brak danych, pokazujemy domyślne tło (np. wiosnę)
  if (!weatherData || !weatherData.current) {
    return <img src={springBg} alt="default-bg" className="bg-video" />;
  }

  const { condition, is_day, temp_c } = weatherData.current;
  const code = condition.code;
  
  // 2. Pobieramy miesiąc z CZASU MIASTA, a nie Twojego komputera
  // Format localtime: "2024-02-17 12:00"
  const locationTime = new Date(weatherData.location.localtime);
  const month = locationTime.getMonth() + 1; // 1-12

  // --- LOGIKA WYBORU TŁA ---
  
  let backgroundSrc = springBg; // Domyślna wartość
  let showSnow = false;
  let overlayColor = 'rgba(0, 0, 0, 0.2)'; // Domyślny cień

  // Kody pogody (WeatherAPI)
  const snowCodes = [1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264];
  const rainCodes = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276];

  // LOGIKA 1: Czy API mówi wprost, że pada śnieg?
  if (snowCodes.includes(code)) {
    backgroundSrc = winterBg;
    showSnow = true;
    overlayColor = 'rgba(0, 0, 0, 0.1)';
  }
  // LOGIKA 2: Czy API mówi, że pada deszcz?
  else if (rainCodes.includes(code)) {
    // Przy deszczu bierzemy tło pory roku, ale mocno przyciemniamy
    backgroundSrc = getSmartSeasonBg(month, temp_c);
    overlayColor = 'rgba(0, 0, 30, 0.6)'; // Efekt mokrej, ciemnej pogody
  }
  // LOGIKA 3: Zwykła pogoda (Słońce/Chmury)
  else {
    backgroundSrc = getSmartSeasonBg(month, temp_c);
    
    // Jeśli jest noc, przyciemniamy tło
    if (is_day === 0) {
      overlayColor = 'rgba(0, 0, 15, 0.7)';
    }
  }

  return (
    <>
      <img 
        src={backgroundSrc} 
        alt="weather-bg" 
        className="bg-video"
        // Dodatkowe filtrowanie jasności CSS dla płynnego efektu
        style={{ 
           filter: is_day === 0 ? 'brightness(0.6)' : 'brightness(0.95)',
           transition: 'filter 1s ease'
        }} 
      />
      
      {/* Warstwa koloru (Tint) */}
      <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh',
          backgroundColor: overlayColor, 
          zIndex: -1, 
          pointerEvents: 'none',
          transition: 'background-color 1s ease'
      }} />
      
      {/* Animacja śniegu (tylko gdy showSnow = true) */}
      {showSnow && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', zIndex: 0, pointerEvents: 'none' }}>
           <Snowfall color="white" snowflakeCount={200} radius={[0.5, 3.0]} speed={[0.5, 3.0]} />
        </div>
      )}
    </>
  );
};

// Funkcja pomocnicza: Inteligentny wybór pory roku
// Bierze pod uwagę miesiąc ORAZ temperaturę
// Funkcja pomocnicza: Inteligentny wybór pory roku
const getSmartSeasonBg = (month, temp) => {
  
  // ZIMA (Grudzień, Styczeń, Luty)
  if (month === 12 || month === 1 || month === 2) {
    // Jeśli jest zima, ale jest ciepło (> 5 stopni), pokazujemy WIOSNĘ
    if (temp > 5) return springBg; 
    return winterBg;
  }

  // WIOSNA (Marzec, Kwiecień, Maj)
  if (month >= 3 && month <= 5) {
    // Nawet jeśli jest lekki mróz, wiosną pokazujemy obrazek wiosenny
    if (temp < -5) return winterBg;
    return springBg;
  }

  // LATO (Czerwiec, Lipiec, Sierpień)
  if (month >= 6 && month <= 8) {
    return summerBg;
  }

  // JESIEŃ (Wrzesień, Październik, Listopad)
  if (month >= 9 && month <= 11) {
    // Jesienią, jeśli nagle zrobi się bardzo ciepło (> 20 stopni), 
    // możemy udawać lato, ale zostawmy jesień dla klimatu
    if (temp < -2) return winterBg;
    return autumnBg;
  }

  return springBg; // Zapasowe wyjście
};
export default WeatherBackground;