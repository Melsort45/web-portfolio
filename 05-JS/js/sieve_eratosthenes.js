/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function (n) {
  "use strict";

  //leer el input...
  if (n === undefined) {
    var inputVal = document.getElementById("num").value;
    n = parseInt(inputVal, 10);
  }

  var array = [],
    primes = [],
    i,
    j;

  if (isNaN(n) || n <= 2) {
    if (document.getElementById("primes")) {
      document.getElementById("primes").innerText = "Please enter a number greater than 2.";
    }
    return primes;
  }

  //inicial arreglo bool tamaño n, true todo
  for (i = 0; i < n; i++) {
    array.push(true);
  }

  //0 y 1 no son primos
  array[0] = false;
  array[1] = false;

  //algoritmo criba de Eratóstenes
  for (i = 2; i * i < n; i++) {
    if (array[i]) {
      for (j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }

  //agarrar todos los indices q sigan siendo true
  for (i = 2; i < n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }

  //mostrar el resultado
  if (document.getElementById("primes")) {
    document.getElementById("primes").innerText = primes.join(", ");
  }

  return primes;
};

console.log(sieve(1000000));