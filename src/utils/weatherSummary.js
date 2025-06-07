// Extracts a summary from Visual Crossing weather data
export function getSummary(data) {
  if (!data || !data.days || !data.days[0])
    return { desc: 'No data', temp: '--', wind: '--', rain: '--' };
  const d = data.days[0];
  return {
    desc: d.conditions || 'N/A',
    temp: `${Math.round(d.temp)}°F`,
    wind: `winds ${Math.round(d.windspeed)}mph`,
    rain: d.precipprob ? `${d.precipprob}% chance rain` : 'no rain',
  };
}
