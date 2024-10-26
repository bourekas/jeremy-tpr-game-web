function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffle(arr) {
  const shuffled = [...arr];

  for (let i = 0; i < shuffled.length; i++) {
    const unshuffledIndex = randomNumber(i, shuffled.length);
    swap(shuffled, i, unshuffledIndex);
  }

  return shuffled;
}
