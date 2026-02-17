// weatherApi.js
const API_KEY = '86f7352254b44be6841171331263001';

export const fetchWeatherData = async (city) => {
  let query = city ? city.trim() : '';
  // sanitize common stray characters (e.g. accidental '>' from paste)
  query = query.replace(/[<>]/g, '').trim();
  const qLower = query.toLowerCase();
  if (qLower === 'vinnytsia' || qLower === 'вінниця') query = 'Vinnitsa';
  if (qLower === 'kiev' || qLower === 'киев' || qLower === 'київ') query = 'Kyiv';

  try {
    // DODANO: &aqi=yes na końcu linku
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=2&aqi=yes`
    );

    if (!response.ok) throw new Error('City not found');
    const json = await response.json();

    const combinedHours = [
      ...json.forecast.forecastday[0].hour,
      ...json.forecast.forecastday[1].hour
    ];

    return {
      chartData: combinedHours.map(h => ({
        fullTime: h.time,
        time: h.time.split(' ')[1],
        temp: h.temp_c,
        feelsLike: h.feelslike_c,
        icon: h.condition.icon
      })),
      astro: json.forecast.forecastday[0].astro,
      locationName: json.location.name,
      fullRawData: json // Przekazujemy surowe dane dla komponentu Highlights
    };
  } catch (error) {
    throw error;
  }
};