export function formatTime(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()

  const diffMs = now.getTime() - date.getTime()
  const minutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'только что'
  if (minutes < 60) return `${minutes} мин. н.`
  if (hours < 24) return `${hours} ч. н.`
  if (days < 7) return `${days} дн. н,`

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: now.getFullYear() === date.getFullYear() ? undefined : 'numeric',
  }

  return date.toLocaleDateString('ru-RU', options)
}
