#!/usr/bin/env node

const readline = require('readline');

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero is not allowed');
  return a / b;
}

function calculate(expression) {
  const match = expression.trim().match(/^(-?\d+\.?\d*)\s*([\+\-\*\/])\s*(-?\d+\.?\d*)$/);
  if (!match) throw new Error('Invalid expression. Use format: <number> <+|-|*|/> <number>');

  const a = parseFloat(match[1]);
  const op = match[2];
  const b = parseFloat(match[3]);

  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log('Node.js CLI Calculator');
console.log('Enter an expression (e.g. 3 + 5) or "exit" to quit.\n');

function prompt() {
  rl.question('> ', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }
    try {
      console.log('=', calculate(input));
    } catch (err) {
      console.error('Error:', err.message);
    }
    prompt();
  });
}

prompt();

module.exports = { add, subtract, multiply, divide };
