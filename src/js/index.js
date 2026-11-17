'use strict';
document.querySelector('[data-print]').addEventListener('click', () => window.print());
// Приклад математичних операцій
const a = 12;
const b = 5;

const sum = a + b;               
const power = Math.pow(a, 2);    
const root = Math.sqrt(144);     
const rounded = Math.round(4.7); 

console.log('Результати обчислень:', { sum, power, root, rounded });