export function success(value: any) {
  const now = new Date()
  const timestamp = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)

  return { data: value, timestamp: timestamp }
}
