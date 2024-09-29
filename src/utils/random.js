function seededRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function dateSeed () {
  const date = new Date();
  const seed = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  return seed;
}

export function seededRandomItem(items, seed) {
  return items[Math.floor(seededRandom(seed) * items.length)];
}