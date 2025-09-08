1. Difference between var, let, and const
Keyword	Scope	Redeclare	Reassign	Hoisting	Use Case
var	Function scoped	✅	✅	Hoisted (initialized as undefined)	পুরোনো JS কোডে বেশি
let	Block scoped	❌	✅	Hoisted (TDZ এ থাকে)	যখন reassign দরকার
const	Block scoped	❌	❌	Hoisted (TDZ এ থাকে)	যখন মান constant রাখতে হবে
```js
var a = 10;
var a = 20; // allowed ✅

let b = 30;
b = 40; // allowed ✅

const c = 50;
// c = 60; ❌ not allowed
```



2. Difference between forEach(), map(), and filter()

forEach() → শুধু loop চালায়, কিছু return করে না

map() → প্রতিটি element transform করে নতুন array return করে

filter() → condition true হলে সেই elements দিয়ে নতুন array return করে
```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((n) => console.log(n)); 
// শুধু print করবে, কিছু return করবে না

const squares = numbers.map((n) => n * n);
console.log(squares); // [1, 4, 9, 16, 25]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]
```
3. Arrow Functions

Arrow function → shorter syntax + surrounding scope থেকে this inherit করে।
```js
// Normal Function
function add(a, b) {
  return a + b;
}

// Arrow Function
const addArrow = (a, b) => a + b;


✅ Advantages:

Shorter & cleaner

this context fix করে (no binding issues)

Callbacks, array methods এ বেশি ব্যবহার হয়
```
4. Destructuring Assignment

Destructuring → Array/Object থেকে value unpack করে variable এ রাখা যায়।
```js
// Array Destructuring
const numbers = [10, 20, 30];
const [x, y, z] = numbers;
console.log(x, y, z); // 10 20 30

// Object Destructuring
const user = { name: "Riyaz", age: 21 };
const { name, age } = user;
console.log(name, age); // Riyaz 21
```
5. Template Literals

Template literals → backtick (`) দিয়ে লেখা হয়।

Features:

Expression/variable embed করা যায় → ${}

Multi-line string লেখা যায়
```js
const name = "Plabon Chandro Modak";
const age = 21;

const text1 = "My name is " + name + " and I am " + age + " years old.";
const text2 = `My name is ${name} and I am ${age} years old.`;

console.log(text1);
console.log(text2);
```
