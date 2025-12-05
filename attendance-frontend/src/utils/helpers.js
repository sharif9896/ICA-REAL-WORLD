export function formatDateToISO(date) {
  if(typeof date === 'string') return date
  return date.toISOString().slice(0,10)
}
