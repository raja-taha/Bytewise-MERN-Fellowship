// Nested function scope
let a = 10;
function outer(){
    let b = 20;
    function inner(){
        let c = 30;
        console.log(a, b, c);
    }
    inner();
}
outer();

// Closure
/* function outer2(){
    let counter = 0;
    function inner2(){
        counter++;
        console.log(counter);
    }
    inner2();
}
outer2();
outer2(); */

function outer2(){
    let counter = 0;
    function inner2(){
        counter++;
        console.log(counter);
    }
    return inner2;
}
let fun = outer2();
fun();
fun();

// Function Currying
function sum(a, b, c){
    return a + b + c;
}
console.log(sum(2, 3, 5));

function curry(fn){
    return function(a){
        return function(b){
            return function(c){
                return a + b + c;
            }
        }
    }
}
const curriedSum = curry(sum);
console.log(curriedSum(2)(3)(5));

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
console.log(add5);

// this: Implicit binding, Explicit binding, New binding, Default binding
/* function sayMyName(name){
    console.log(`Hello, my name is ${name}`);
}
sayMyName('Muhammad Taha'); */

const person = {
    name: 'Muhammad Taha',
    sayMyName: function(){
        console.log(`Hello, my name is ${this.name}`);
    }
}
person.sayMyName();

globalThis.name = 'Taha';
function sayMyName(name){
    console.log(`Hello, my name is ${this.name}`);
}
sayMyName.call(person);

function Person (name) {
    this.name = name; 
}
const p1 = new Person('Muhammad Taha');
const p2 = new Person('Raja Taha');
console.log(p1.name);
console.log(p2.name);

sayMyName();

// Prototype
function Person2(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
}
const person1 = new Person2('Umair', 'Habib');
const person2 = new Person2('Jawad', 'Akbar');
Person2.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
}
console.log(person1.getFullName());
console.log(person2.getFullName());

// Prototypal inheritance
function SuperHero(fname, lname){
    Person2.call(this, fname, lname);
    this.isSuperHero = true;
}
SuperHero.prototype.fightCrime = function () {
    console.log('Fighting Crime');
}
SuperHero.prototype = Object.create(Person2.prototype);
const batman = new SuperHero('Bruce', 'Wayne');
SuperHero.prototype.constructor = SuperHero;
console.log(batman.getFullName());

// Class
class Person3 {
    constructor(fName, lName){
        this.fName = fName;
        this.lName = lName;
    }
    sayMyName(){
        console.log(`${this.fName} ${this.lName}`);
    }
}
const classP1 = new Person3('Raja', 'Shujaat');
console.log(classP1.sayMyName());

class SuperHero2 extends Person3 {
    constructor(fName, lName){
        super(fName, lName);
        this.isSuperHero = true;
    }
    fightCrime(){
        console.log('Fighting Crime');
    }
}
const superman = new SuperHero2('Clark', 'Kent');
console.log(superman.sayMyName());

// Iterables and Iterators
const str = 'Taha';
/* for(let i = 0; i < str.length; i++){
    console.log(str.charAt(i));
} */
for (const char of str){
    console.log(char);
}

const arr = ['T', 'A', 'H', 'A'];
/* for(let i = 0; i < str.length; i++){
    console.log(arr[i]);
} */
for (const item of arr){
    console.log(item);
}

const obj = {
    [Symbol.iterator]: function(){
        let step = 0;
        const iterator = {
            next: function(){
                step++;
                if(step === 1){
                    return {value: 'Hello', done: false};
                }
                else if(step === 2){
                    return {value: 'World', done: false};
                }
                return{value: undefined, done: true}
            },
        }
        return iterator
    },
}
for (const word of obj){
    console.log(word);
}

// Generators
function normalFunction() {
    console.log('Hello');
    console.log('World');
}
normalFunction();
normalFunction();

function* generatorFunction() {
    yield 'Raja';
    yield 'Taha';
} 
const generatorObject = generatorFunction();
for (const word of generatorObject) {
    console.log(word);
}