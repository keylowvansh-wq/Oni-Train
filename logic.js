const q = document.querySelector.bind(document);
const block = q('#blocker');
const rBg = q('#room-bg');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
document.addEventListener('mousemove',e=>{
mx = e.clientX;
my = e.clientY;
let xPer = (mx / window.innerWidth - 0.5) * 20;
let yPer = (my / window.innerHeight - 0.5) * 20;
rBg.style.transform = `translate(${xPer}px, ${yPer}px) scale(1.1)`;
});
block.addEventListener('click', ()=>{
block.style.display = 'none';
});
