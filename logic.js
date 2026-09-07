const q = document.querySelector.bind(document);
const btn = q('#btn-fwd');
const txt = q('#sub-txt');
const signTitle = q('#curr-stat');
const block = q('#blocker');
const fMask = q('#flashlight-mask');
const rBg = q('#room-bg');
let idx = 0;
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let flashlightActive = false;
const a1 = new Audio('src/sounds/train_rattle.mp3');
a1.loop = true;
const a2 = new Audio('src/sounds/heartbeat.mp3');
a2.loop = true;
const a3 = new Audio('src/sounds/door_chime.mp3');
const a4 = new Audio('src/sounds/static.mp3');
a4.loop = true;
const a5 = new Audio('src/sounds/heavy_breathing.mp3');
const st =[
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

if(flashlightActive){
fMask.style.clipPath = `circle(120px at ${mx}px ${my}px)`;
 }
});

block.addEventListener('click', ()=>{
block.style.display = 'none';
a1.play();
a2.play();
a2.volume = 0.1;
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

if(idx === 3){
a1.playbackRate = 0.8;
rBg.style.filter = 'grayscale(100%) contrast(1.5) brightness(0.2)';
}
if(idx === 5){
a3.play();
signTitle.innerHTML = 'きさらぎ';
signTitle.style.color = '#aa0000';
signTitle.style.textShadow = '0 0 20px red';
}
if(idx === 6){
a2.volume = 0.5;
a2.playbackRate = 1.2;
a4.play();
a4.volume = 0.2;
flashlightActive = true;
rBg.style.opacity = '0';
txt.style.color = '#ff4444';
a5.play();
}

if(idx >= st.length){
return;
}

typeW(raw, txt, ()=>{
if(idx < st.length){
btn.style.display = 'inline-block';
  }
 });
}
