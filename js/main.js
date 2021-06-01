
// function getRandom (min, max) {
//   min = Math.ceil(min); // вычисляет и возвращает наименьшее целое число, которое больше или равно переданному числу (округляет число вверх)
//   max = Math.floor(max); // вычисляет и возвращает наибольшее целое число, которое меньше или равно переданному числу (округляет число вниз)
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// console.log(getRandom(0, 10));




// function checkLengthLine (line, maxLine) {
//   let maxLine = 140;
//   if (line > maxLine) {
//     console.log('максимальная длина 140 символов')
//   }
// }

// checkLengthLine ();

const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min]
  }

  return Math.round(Math.random() * (max - min)) + min;
}

getRandom (1, 9);

const checkLengthLine = (line, length) => {
  return (line.length <= length);
}

checkLengthLine('Проверка длины строки', 140);
