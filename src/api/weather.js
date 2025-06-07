// Fetch weather for a location and date range from Visual Crossing
export async function fetchWeather(location, date, apiKey) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}/${date}?key=${apiKey}&unitGroup=us`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch weather');
  return response.json();
}
