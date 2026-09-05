/*
Pig Latin
*/

function igpayAtinlay(str) {
  // Si no se pasa parámetro, leer del DOM
  if (typeof str !== "string") {
    var input = document.getElementById("txtVal");
    str = input ? input.value : "";
  }

  // TODO: Initialize the word array properly
  var returnArray = [],
    wordArray = str.trim().split(/\s+/);

  if (str.trim() === "") {
    if (document.getElementById("pigLatLbl")) {
      document.getElementById("pigLatLbl").innerText = "";
    }
    return "";
  }

  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    //si inicia con vocal, agregar way al final
    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    //si inicia con consonante... 
    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }

    //corta la parte consontante inicial, moverla al final y agregar ay
    var restOfWord = word.slice(beginning.length);
    var translated = restOfWord + beginning + "ay";
    returnArray.push(translated);
  }

  var result = returnArray.join(" ");

  //mostrar
  if (document.getElementById("pigLatLbl")) {
    document.getElementById("pigLatLbl").innerText = result;
  }

  return result;
}

//ejemplos jeje
console.log(igpayAtinlay("pizza")); 
console.log(igpayAtinlay("apple")); 
console.log(igpayAtinlay("happy meal")); 