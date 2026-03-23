export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}
export function formatTime(time: string): string {
  if (!time) return "Invalid time"

  const [hour, minute] = time.split(":").map(Number)

  if (hour === undefined || minute === undefined) {
    return "Invalid time"
  }

  const date = new Date()
  date.setHours(hour, minute)

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}
