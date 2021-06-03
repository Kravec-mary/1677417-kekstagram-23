const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.round(Math.random() * (max - min)) + min;
};

getRandom (1, 9);

const checkLengthLine = (line, length) => (line.length <= length);

checkLengthLine('Проверка длины строки', 140);
