import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot, Label,
  ReferenceArea // Dodano ReferenceArea
} from 'recharts';
import { translations } from '../translations';

// --- KOMPONENTY POMOCNICZE ---

const CustomizedDot = (props) => {
  const { cx, cy, payload, index, interval } = props;
  if (index % interval !== 0) return null;
  const iconSize = interval >= 4 ? 40 : 48; 

  return (
    <svg x={cx - iconSize / 2} y={cy - iconSize - 10} width={iconSize} height={iconSize}>
      <image href={`https:${payload.icon}`} width="100%" height="100%" />
    </svg>
  );
};

const SunIcon = ({ x, y, type }) => {
  const iconSize = 34;
  const iconUrl = type === 'sunrise' 
    ? "https://cdn.weatherapi.com/weather/64x64/day/113.png" 
    : "https://cdn.weatherapi.com/weather/64x64/night/113.png";
  
  return (
    <g>
      <circle cx={x} cy={y + 15} r="18" fill="rgba(0,0,0,0.3)" filter="blur(3px)" />
      <svg x={x - iconSize / 2} y={y} width={iconSize} height={iconSize}>
        <image href={iconUrl} width="100%" height="100%" />
      </svg>
    </g>
  );
};

// --- KOMPONENT WYKRESU ---

const WeatherChart = ({ data, astroToday, astroTomorrow, t }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let iconInterval = 2;
  let hourInterval = 0;
  if (windowWidth < 528) {
    iconInterval = 6;
    hourInterval = 6;
  }
  else if (windowWidth < 768) {
    iconInterval = 6;
    hourInterval = 3;
  }
  else if (windowWidth < 890) {
    hourInterval = 2;
  } else if (windowWidth < 1465) {
    iconInterval = 4;
    hourInterval = 1;
  }

  const now = new Date();
  const currentFullTime = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:00`;
  const currentDataPoint = data.find(d => d.fullTime === currentFullTime);

  const formatAstroTime = (timeStr, dateStr) => {
    if (!timeStr || !dateStr) return null;
    const [time, modifier] = timeStr.split(' ');
    let [hours] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    const formattedHour = hours.toString().padStart(2, '0');
    const target = `${dateStr} ${formattedHour}:00`;
    return data.some(d => d.fullTime === target) ? target : null;
  };

  const sunX1 = formatAstroTime(astroToday?.sunrise, astroToday?.date);
  const sunX2 = formatAstroTime(astroToday?.sunset, astroToday?.date);
  const sunX3 = formatAstroTime(astroTomorrow?.sunrise, astroTomorrow?.date);
  const sunX4 = formatAstroTime(astroTomorrow?.sunset, astroTomorrow?.date);

  return (
    <div className="chart-wrapper glass-panel" >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 80, right: 20, left: -20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorFeels" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />

          {/* --- STREFY NOCNE (PRZYCIEMNIENIE) --- */}
          {/* Noc 1: Od początku do pierwszego wschodu */}
          {sunX1 && <ReferenceArea x1={data[0]?.fullTime} x2={sunX1} fill="rgba(0, 0, 30, 0.3)" isFront={false} />}
          
          {/* Noc 2: Od dzisiejszego zachodu do jutrzejszego wschodu */}
          {sunX2 && sunX3 && <ReferenceArea x1={sunX2} x2={sunX3} fill="rgba(0, 0, 30, 0.3)" isFront={false} />}
          
          {/* Noc 3: Od jutrzejszego zachodu do końca wykresu */}
          {sunX4 && <ReferenceArea x1={sunX4} x2={data[data.length - 1]?.fullTime} fill="rgba(0, 0, 30, 0.3)" isFront={false} />}
          
          <XAxis 
            dataKey="fullTime" 
            tickFormatter={(str) => str.split(' ')[1]} 
            stroke="rgba(255,255,255,0.5)" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            interval={hourInterval} 
            minTickGap={10} 
            dy={10}
          />
          
          <YAxis 
            hide={false}
            orientation="left"
            stroke="rgba(255,255,255,0.5)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => `${val}°`}
            domain={['dataMin - 3', 'dataMax + 3']}
          />
          
          {sunX1 && (
            <ReferenceLine x={sunX1} stroke="#ffd700" strokeDasharray="5 5" strokeWidth={2}>
            </ReferenceLine>
          )}
          {sunX2 && (
            <ReferenceLine x={sunX2} stroke="#ff4500" strokeDasharray="5 5" strokeWidth={2}>
            </ReferenceLine>
          )}

          {sunX3 && (
            <ReferenceLine x={sunX3} stroke="#ffd700" strokeDasharray="5 5" strokeWidth={2}>
            </ReferenceLine>
          )}
          {sunX4 && (
            <ReferenceLine x={sunX4} stroke="#ff4500" strokeDasharray="5 5" strokeWidth={2}>
            </ReferenceLine>
          )}

          {currentDataPoint && (
            <ReferenceLine x={currentFullTime} stroke="#00f2ff" strokeWidth={2} strokeDasharray="3 3">
              <Label value={t?.now || 'NOW'} position="top" fill="#00f2ff" fontSize={12} fontWeight="bold" offset={25} />
            </ReferenceLine>
          )}

          <Tooltip 
            labelFormatter={(label) => `Time: ${label}`}
            contentStyle={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', border: 'none', borderRadius: '10px', color: '#fff' }} 
            itemStyle={{ color: '#fff' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="temp" 
            stroke="#8884d8" 
            strokeWidth={4} 
            fill="url(#colorTemp)" 
            dot={<CustomizedDot interval={iconInterval} />} 
            isAnimationActive={false}
          />

          <Area 
            type="monotone" 
            dataKey="feelsLike" 
            stroke="#82ca9d" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            fill="url(#colorFeels)" 
            isAnimationActive={false}
          />

          {currentDataPoint && (
            <ReferenceDot 
              x={currentFullTime} 
              y={currentDataPoint.temp} 
              r={6} 
              fill="#00f2ff" 
              stroke="#fff" 
              strokeWidth={2} 
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- GŁÓWNY KOMPONENT MANAGERA ---

const WeatherManager = ({ city = 'Vinnytsia', lang = 'en' }) => {
  const [chartData, setChartData] = useState([]);
  const [astroData, setAstroData] = useState({ today: null, tomorrow: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '86f7352254b44be6841171331263001';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        let query = city ? city.trim() : '';
        // remove stray characters (e.g. accidental '>' from paste) and normalize
        query = query.replace(/[<>]/g, '').trim();
        const qLower = query.toLowerCase();
        if (qLower === 'vinnytsia' || qLower === 'вінниця') query = 'Vinnitsa';
        if (qLower === 'kiev' || qLower === 'киев' || qLower === 'київ') query = 'Kyiv';
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=2`
        );
        if (!response.ok) throw new Error('City not found');
        const json = await response.json();
        
        setAstroData({
          today: { ...json.forecast.forecastday[0].astro, date: json.forecast.forecastday[0].date },
          tomorrow: { ...json.forecast.forecastday[1].astro, date: json.forecast.forecastday[1].date }
        });
        
        const combinedHours = [
          ...json.forecast.forecastday[0].hour,
          ...json.forecast.forecastday[1].hour
        ];

        const formatted = combinedHours.map(h => ({
          fullTime: h.time,
          time: h.time.split(' ')[1],
          temp: h.temp_c,
          feelsLike: h.feelslike_c,
          icon: h.condition.icon
        }));

        setChartData(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const t = translations[lang] || translations.en;
  if (loading) return <div style={{color: '#fff'}}>{t.loading}</div>;
  if (error) return <div style={{color: '#f00'}}>{error}</div>;

  return (
    <div className="chart-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '10px' }}>
        <div style={{ fontSize: '12px', textAlign: 'right' }}>
          {t.sunrise}: {astroData.today?.sunrise} | {t.sunset}: {astroData.today?.sunset}
          {astroData.tomorrow && (
            <span> &nbsp;|&nbsp; {t.sunrise} (tomorrow): {astroData.tomorrow?.sunrise}</span>
          )}
        </div>
      </div>
      <div>
        <WeatherChart 
          data={chartData} 
          astroToday={astroData.today} 
          astroTomorrow={astroData.tomorrow} 
          t={t}
        />
      </div>
    </div>
  );
};

export default WeatherManager;