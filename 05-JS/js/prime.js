/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  //leer desde el html el input
  if (n === undefined) {
    var inputVal = document.getElementById("num").value;
    n = parseInt(inputVal, 10);
  }

  var sequence = [];

  if (isNaN(n) || n < 2) {
    if (document.getElementById("pf")) {
      document.getElementById("pf").innerText = "Please enter a valid number >= 2";
    }
    return sequence;
  }

  //Si n es divisible entre 2, guardas 2 y divides n/2
  while (n % 2 === 0) {
    sequence.push(2);
    n = n / 2;
  }

  //N debe ser impar, probar impares desde 3 hasta raiz de n 
  for (var i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
      sequence.push(i);
      n = n / i;
    }
  }

  // Si n es un num primo mayor a 2 
  if (n > 2) {
    sequence.push(n);
  }

  
  if (document.getElementById("pf")) {
    document.getElementById("pf").innerText = "Prime Factors: " + sequence.join(", ");
  }

  return sequence;
};

//ej en consola
console.log(getPrimeFactors(30030));