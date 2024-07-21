// DOM Manipulation

// getElementById()
// const title = document.getElementById('main-heading');
// console.log(title);

//getElementsByClassName()
// const listItems = document.getElementsByClassName('list-items');
// console.log(listItems);

// getElementsByTagName()
// const listItems = document.getElementsByTagName('li');
// console.log(listItems);

// querySelector()
// const container = document.querySelector('div');
// console.log(container);

// querySelectorAll()
// const container = document.querySelectorAll('div');
// console.log(container);

// const title = document.querySelector('#main-heading');
// title.style.color = 'red';
// console.log(title.getAttribute('id'));

// const listItems = document.querySelectorAll('.list-items');
// listItems.forEach((item) => {
//     item.style.fontSize = '2rem';
// });

// const firstListItem = document.querySelector('.list-items');
// console.log(firstListItem.innerText);
// console.log(firstListItem.textContent);
// console.log(firstListItem.innerHTML);

// const ul = document.querySelector('ul');
// const li = document.createElement('li');
// ul.append(li);

// li.innerText = 'X-men'
// li.setAttribute('id', 'main-heading');
// li.removeAttribute('id');

// li.classList.add('list-items');
// li.classList.remove('list-items');
// console.log(li.classList.contains('list-items'));

// li.remove();

// let ul = document.querySelector('ul');

// console.log(ul.parentNode.parentNode);
// console.log(ul.parentElement.parentElement);

// console.log(ul.childNodes);
// console.log(ul.firstChild);
// console.log(ul.lastChild);

// ul.childNodes[1].style.backgroundColor = 'blue';

// console.log(ul.children);
// console.log(ul.firstElementChild);
// console.log(ul.lastElementChild);

let ul = document.querySelector('ul');
let div = document.querySelector('div');

console.log(div.childNodes);

console.log(ul.previousSibling);
console.log(div.nextSibling);