// // Timeouts and Intervals
// function greet(name){
//     console.log(`Hello ${name}`);
// }
// const timeoutID = setTimeout(greet, 2000, 'Taha');
// clearTimeout(timeoutID);

// const intervalID = setInterval(greet, 2000, 'Taha');
// clearInterval(intervalID);

// // Callbacks
// function greet(name){
//     console.log(`Hello ${name}`);
// }

// function greetTaha(greetFn){
//     const name = 'Taha';
//     greetFn(name);
// }

// greetTaha(greet);

// // Promises
// const onFullfilment = (result) => {
//     console.log(result);
//     console.log('Setup Table');
// };

// const onRejection = (error) => {
//     console.log(error);
//     console.log('Cook Pasta');
// };

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve("Bringing Tacos")
//         reject("Not Bringing Tacos");
//     }, 2000)
// });

// // promise.then(onFullfilment, onRejection);
// promise.then(onFullfilment);
// promise.catch(onRejection);

// // Async
// async function greet(){
//     return 'Hello ';
// }
// console.log(greet());

// async function greet(){
//     return Promise.resolve('Hello ');
// }
// greet().then((value) => console.log(value));

// Await
// async function greet(){
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Hello');
//         }, 2000)
//     });

//     let result = await promise;
//     console.log(result);
// }
// greet();

// Event loop

// // Synchronous Code
// console.log('First');
// console.log('Second');
// console.log('Third');

// // Async setTimeout code
// console.log('First');

// setTimeout(() => {
//     console.log('Second');
// }, 2000);

// console.log('Third');

// // Async Promise code
// console.log('First');

// const promise = fetch('');
// promise.then((value) => console.log('Promise value is: ', value));

// console.log('Second');

// Async setTimeout + Promise code
setTimeout(() => {
    console.log('First');
}, 0);

const promise = fetch('');
promise.then((value) => console.log('Promise value is: ', value));

let i = 0
while (i < 1000000000) {
    i++;
}

console.log('Second');