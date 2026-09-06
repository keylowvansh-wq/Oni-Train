const q = document.querySelector.bind(document);
const btn = q('#btn-fwd');
const txt = q('#sub-txt');
const signTitle = q('#curr-stat');
const block = q('#blocker');
const rBg = q('#room-bg');
let idx = 0;
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
const st = [
"いつもと同じ帰り道だった。",
"電車に乗ってから、もう20分も停まっていない。",
"周りの乗客は全員眠っている。",
"外は真っ暗だ。",
"見知らぬトンネルに入ったようだ。",
"アナウンスが鳴らない。",
"誰かが…後ろの車両から歩いてくる音がする。",
"振り返ってはいけない。",
"振り返ってはいけない。",
"振り返ってはいけない。"
];

document.addEventListener('mousemove',e=>{
mx = e.clientX;
my = e.clientY;
let xPer = (mx / window.innerWidth - 0.5) * 20;
let yPer = (my / window.innerHeight - 0.5) * 20;
rBg.style.transform = `translate(${xPer}px, ${yPer}px) scale(1.1)`;
});

block.addEventListener('click', ()=>{
block.style.display = 'none';
updateT();
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
btn.style.display = 'none';
let raw = st[idx];
if(idx >= st.length){
return;
}
typeW(raw, txt, ()=>{
if(idx < st.length){
btn.style.display = 'inline-block';
  }
});
}
