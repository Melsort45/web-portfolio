// Exercise 1: Hello World
console.log("=== Exercise 1 ===");
console.log("Hello World!");


// Exercise 2: Star Wars Quotes
console.log("\n=== Exercise 2 ===");
const sw = require('star-wars-quotes');
console.log(sw());


// Exercise 3: Epic Battle (Superheroes vs Supervillains)
console.log("\n=== Exercise 3 ===");
const superheroes = require('superheroes');
const supervillains = require('supervillains');

const hero = superheroes.random();
const villain = supervillains.random();

console.log(`${hero} vs ${villain}!`);


// Exercise 4: Read File
console.log("\n=== Exercise 4 ===");
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.log("Error reading file:", err.message);
    return;
  }
  console.log("Secret message:", data);
});