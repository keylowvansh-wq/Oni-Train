const q = document.querySelector.bind(document);
const block = q('#blocker');

block.addEventListener('click', ()=>{
block.style.display = 'none';
});