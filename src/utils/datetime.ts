/** Converts a Date to the value format of an <input type="datetime-local">. */
export function toDatetimeLocal(date: Date | null): string {
  if (!date) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

/** Parses an <input type="datetime-local"> value ('' → null). */
export function fromDatetimeLocal(value: string): Date | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const dateTimeFormatter = new Intl.DateTimeFormat('es-CL', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatDateTime(date: Date | null): string {
  return date ? dateTimeFormatter.format(date) : '—'
}
