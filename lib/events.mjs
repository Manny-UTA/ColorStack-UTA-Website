export function upcomingEvents(events, now = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
  return (Array.isArray(events) ? events : [])
    .filter((event) => /^\d{4}-\d{2}-\d{2}$/.test(event.date) && event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
