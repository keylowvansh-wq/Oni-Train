const q = document.querySelector.bind(document);
const btn = q('#btn-fwd');
const txt = q('#sub-txt');
const signTitle = q('#curr-stat');
const block = q('#blocker');
const rBg = q('#room-bg');
let idx = 0;
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;

document.addEventListener('mousemove', e=>{
mx = e.clientX;
my = e.clientY;
let xPer = (mx / window.innerWidth - 0.5) * 20;
let yPer = (my / window.innerHeight - 0.5) * 20;
rBg.style.transform = `translate(${xPer}px, ${yPer}px) scale(1.1)`;
});

block.addEventListener('click', ()=>{
block.style.display = 'none';
});
btn.addEventListener('click', ()=>{
idx++;
updateT();
});

function typeW(str, el, cb){
el.innerHTML = '';
el.className = '';
let i = 0;
let s = Math.random() * 50 + 30;
function p(){
if(i < str.length){
el.innerHTML += str.charAt(i);
i++;
setTimeout(p, s);
}
else{
if(cb)
cb();
 }
}
p();
}
function updateT(){
btn.style.display = 'nonze';
}
