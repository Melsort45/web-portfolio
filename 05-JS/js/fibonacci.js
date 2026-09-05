/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
var memo = {};

function fibonacci() {
  "use strict";
  var inputVal = document.getElementById("num").value;
  var n = parseInt(inputVal, 10);
  
  if (isNaN(n) || n < 0) {
    document.getElementById("fibonacciLbl").innerText = "Please enter a valid non-negative number.";
    return;
  }

  var val = f(n);
  document.getElementById("fibonacciLbl").innerText = "Result: " + val;
  return val;
}

function f(n) {
  var value;
  //ver si el arreglo en memoria ya tiene el numero, si si, devolverlo
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //casos
    if (n === 0) {
      value = 0;
    } else if (n === 1) {
      value = 1;
    } else {
      value = f(n - 1) + f(n - 2);
    }

    memo[n] = value;
  }

  return value;
}