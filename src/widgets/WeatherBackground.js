import React from 'react';
import Snowfall from 'react-snowfall';


import springBg from '../shared/art/spring.webp';
import summerBg from '../shared/art/summer.webp'; 
import autumnBg from '../shared/art/autumn.jpg';
import winterBg from '../shared/art/snow.jpg';

const WeatherBackground = ({ weatherData }) => {
  
  if (!weatherData || !weatherData.current) {
    return <img src={springBg} alt="default-bg" className="bg-video" />;
  }

  const { condition, is_day, temp_c } = weatherData.current;
  const code = condition.code;
  
  
  const locationTime = new Date(weatherData.location.localtime);
  const month = locationTime.getMonth() + 1; 

  
  
  let backgroundSrc = springBg; 
  let showSnow = false;
  let overlayColor = 'rgba(0, 0, 0, 0.2)'; 

 
  const snowCodes = [1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264];
  const rainCodes = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276];


  if (snowCodes.includes(code)) {
    backgroundSrc = winterBg;
    showSnow = true;
    overlayColor = 'rgba(0, 0, 0, 0.1)';
  }

  else if (rainCodes.includes(code)) {
    
    backgroundSrc = getSmartSeasonBg(month, temp_c);
    overlayColor = 'rgba(0, 0, 30, 0.6)'; 
  }
  
  else {
    backgroundSrc = getSmartSeasonBg(month, temp_c);
    
    
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
        
        style={{ 
           filter: is_day === 0 ? 'brightness(0.6)' : 'brightness(0.95)',
           transition: 'filter 1s ease'
        }} 
      />
      
      
      <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh',
          backgroundColor: overlayColor, 
          zIndex: -1, 
          pointerEvents: 'none',
          transition: 'background-color 1s ease'
      }} />
      
      
      {showSnow && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', zIndex: 0, pointerEvents: 'none' }}>
           <Snowfall color="white" snowflakeCount={200} radius={[0.5, 3.0]} speed={[0.5, 3.0]} />
        </div>
      )}
    </>
  );
};


const getSmartSeasonBg = (month, temp) => {
  
  
  if (month === 12 || month === 1 || month === 2) {
    
    if (temp > 5) return springBg; 
    return winterBg;
  }

  
  if (month >= 3 && month <= 5) {
    
    if (temp < -5) return winterBg;
    return springBg;
  }

 
  if (month >= 6 && month <= 8) {
    return summerBg;
  }

  
  if (month >= 9 && month <= 11) {
    
    if (temp < -2) return winterBg;
    return autumnBg;
  }

  return springBg; 
};
export default WeatherBackground;
