function seededRandom (seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function dateSeed () {
  const date = new Date()
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  const seed = date.getFullYear() + dayOfYear
  return seed
}

export function seededRandomItem (items, seed) {
  return items[Math.floor(seededRandom(seed) * items.length)]
}
