// Returns the next date for a given day of week (0=Sunday, 1=Monday, ...)
export function getNextDate(dayOfWeek, offsetWeeks = 0) {
  const today = new Date();
  const result = new Date(today);
  const currentDay = today.getDay();
  let daysUntil = dayOfWeek - currentDay;
  if (daysUntil < 0) daysUntil += 7;
  daysUntil += offsetWeeks * 7;
  result.setDate(today.getDate() + daysUntil);
  return result;
}

export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export function addOneDay(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
