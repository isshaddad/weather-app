// Returns the next date for a given day of week (0=Sunday, 1=Monday, ...)
export function getNextDate(dayOfWeek, offsetWeeks = 0) {
  const today = new Date();
  const result = new Date(today);
  const currentDay = today.getDay();
  let daysUntil = dayOfWeek - currentDay;
  if (daysUntil < 0) daysUntil += 7;
  daysUntil += offsetWeeks * 7;
  result.setDate(today.getDate() + daysUntil + 2);
  return result;
}

export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDateWithSuffix(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  // Get ordinal suffix
  const j = day % 10,
    k = day % 100;
  let suffix = 'th';
  if (j === 1 && k !== 11) suffix = 'st';
  else if (j === 2 && k !== 12) suffix = 'nd';
  else if (j === 3 && k !== 13) suffix = 'rd';
  return `${month} ${day}${suffix}`;
}
