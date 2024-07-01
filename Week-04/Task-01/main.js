console.log("Hello world!");

// This is a single line comment

// Variables
let age = 20
console.log("Age: " + age);

const salary = 80000;
console.log("Salary: " + salary);

// Datatypes
/*  Primitive Datatypes:
    String
    Number
    Boolean
    Undefined
    Null
    Bigint
    Symbol

    Non-Primitive Datatypes:
    Objects
*/

const person = {
    'firstName': 'John',
    'lastName': 'Doe',
    'age': 30,
    'isEmployed': true
}

console.log("Person: " + person.firstName + " " + person.lastName);

const oddNumbers =[1, 3, 5, 7, 9]
console.log(oddNumbers[2]);

let a = 10;
a = 'Taha'
a = true

console.log(a);

// Operators
let x = 10
let y = 5

console.log(x + y);
console.log(++x);
console.log(--y);

console.log(x !== y);

console.log(y <= x);

const isValidNumber = x > 20 || 8 > y
console.log(isValidNumber);

const isValid = true
console.log(!isValid);

console.log("Raja" + "Taha");

const isEven = 10 % 2 === 0 ? "Number is even" : "Number is Odd";
console.log(isEven);

// Type Conversion: Implicit and Explicit
console.log(2 + '3');
console.log(true + '3');
console.log('4' - '3');
console.log('Raja' - 'Taha');
console.log('5' - true);

console.log(Number('5'));
console.log(parseInt('5'));
console.log(parseFloat('5.05'));
console.log(String('505'));
console.log(String(true));
console.log(String(null));
console.log(String(undefined));
console.log((500).toString());
console.log(Boolean(10));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(' '));

// Equality
const var1 = 10;
const var2 = '10';

console.log(var1 == var2);
console.log(var1 === var2);

// Conditional Statements
const num = -5

if (num > 0) {
    console.log('Number is Positive');
}
else if (num < 0) {
    console.log('Number is Negative');
}
else {
    console.log('Number is Zero');
}

const color = 'red';

switch (color) {
    case 'red':
        console.log('Color is Red');
        break;
    case 'blue':
        console.log('Color is Blue');
        break;
    default:
        console.log('Color is not recognized');
}

// Loops: For, While, Do..while, For..of
for (let i = 1; i <= 5; i++) {
    console.log('For Iteration: ' + i);
}

let j = 1;
while (j <=5 ){
    console.log('While Iteration: ' + j);
    j++;
}

let k = 1;
do {
    console.log('Do..while Iteration: ' + k);
    k++;
} while (k <=5 );

const numbers = [1, 2, 3, 4, 5];
for (const num of numbers) {
    console.log('For...of Iteration: ' + num);
}

// Functions
function greet(name) {
    console.log('Good Morning ' + name);
}

greet('Taha');

const addNumbers = (a, b) => {
    return a + b;
}

/* const addNumbers = (a, b) => a + b; */

const sum = addNumbers(1, 2);
console.log(sum);

// Scope: Block, Function, Global

const myName = 'raja taha';
console.log(myName);

if (true) {
    const myName = 'taha';
    console.log(myName);
}

function testFunction () {
    const myName = 'raja';
    console.log(myName);
}

testFunction();
