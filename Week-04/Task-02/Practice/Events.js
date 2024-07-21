// Event Listener
// Example 1
// const buttonTwo = document.querySelector('.btn-2');

// const alertbtn = () => {
//     alert('Button 2 clicked!');
// }

// buttonTwo.addEventListener('click', alertbtn);

// const boxThree = document.querySelector('.box-3');

// const changeBGColor = () => {
//     boxThree.style.backgroundColor = 'blue';
// }

// boxThree.addEventListener('mouseover', changeBGColor);

// Example 2
// const revealBtn = document.querySelector('.reveal-btn');
// const hiddenContent = document.querySelector('.hidden-content');

// const revealContent = () => {
//     if (hiddenContent.classList.contains('reveal-btn')){
//         hiddenContent.classList.remove('reveal-btn');
//     }
//     else {
//         hiddenContent.classList.add('reveal-btn');
//     }
// }

// revealBtn.addEventListener('click', revealContent);

// Event Propagation
// window.addEventListener('click', function(){
//     console.log('Window');
// }, false);

// document.addEventListener('click', function(){
//     console.log('document');
// }, false);

// document.querySelector('.div2').addEventListener('click', function(e){
//     // e.stopPropagation();
//     console.log('div 2');
// }, {once: true});

// document.querySelector('.div1').addEventListener('click', function(){
//     console.log('div 1');
// }, false);

// document.querySelector('button').addEventListener('click', function(){
//     console.log('button');
// }, false);

// Event Propagation
document.querySelector('#sports').addEventListener('click', function(e){
    console.log(e.target.getAttribute('id') + ' is clicked');
    
    if(e.target.matches('li')){
        e.target.style.backgroundColor = 'lightgrey';
    }
});

const sports = document.querySelector('#sports');
const newSport = document.createElement('li');

newSport.innerText = 'rugby';
newSport.setAttribute('id', 'rugby');

sports.appendChild(newSport);