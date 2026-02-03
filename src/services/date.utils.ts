export function today() {
  return new Date().toISOString();
}

export function daysFromToday(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isFuture(date: string) {
  const d = new Date(date)
  const today = new Date()

  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)

  return d > today
}