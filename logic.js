const q = document.querySelector.bind(document);
const qAll = document.querySelectorAll.bind(document);
const btn = q('#btn-fwd');
const txt = q('#sub-txt');
const signTitle = q('#curr-stat');
const block = q('#blocker');
const fMask = q('#flashlight-mask');
const rBg = q('#room-bg');
const jW = q('#j-wrap');
const jI = q('#j-img');
const vig = q('#vignette');
let idx = 0;
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let flashlightActive = false;
let isF = false;
const preF1 = new Image();
preF1.src = 'src/graphics/face_frame1.jpg';
const preF2 = new Image();
preF2.src = 'src/graphics/face_frame2.jpg';
const a1 = new Audio('src/sounds/train_rattle.mp3');
a1.loop = true;
const a2 = new Audio('src/sounds/heartbeat.mp3');
a2.loop = true;
const a3 = new Audio('src/sounds/door_chime.mp3');
const a4 = new Audio('src/sounds/static.mp3');
a4.loop = true;
const a5 = new Audio('src/sounds/heavy_breathing.mp3');
const a6 = new Audio('src/sounds/bone_snap.mp3');
const a7 = new Audio('src/sounds/scream_distorted.mp3');

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

if(localStorage.getItem('k_visited') === 'true'){
idx = 7;
st[7] = "また戻ってきたのか？";
st[8] = "逃げられないよ。";
}

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

if(idx >= 7 && idx <= 9){
a2.volume = Math.min(1, a2.volume + 0.2);
a2.playbackRate += 0.2;
txt.classList.add('glitch');
txt.setAttribute('data-text', raw);
vig.style.background = 'radial-gradient(circle, rgba(150,0,0,0.3) 10%, rgba(0,0,0,1) 80%)';
let rn = Math.random();
if(rn > 0.5)
a6.play();
}
if(idx >= st.length){
localStorage.setItem('k_visited', 'true');
trig();
return;
}

typeW(raw, txt, ()=>{
if(idx < st.length){
btn.style.display = 'inline-block';
   }
 });
}
function trig(){
a1.pause();
a2.pause();
a4.pause();
a5.pause();
flashlightActive = false;
fMask.style.display = 'none';
document.body.className = 'flash-red shake-hard';
jW.style.display = 'block';
jI.src = preF1.src;
a7.volume = 1;
a7.play();

let f = 0;
let t = setInterval(()=>{
f++;
if(f % 2 === 0){
jI.src = preF2.src;
jI.style.transform = `scale(${1 + Math.random()*0.5}) translate(${Math.random()*20 - 10}px, ${Math.random()*20 - 10}px)`;
}
else{
jI.src = preF1.src;
jI.style.filter = `invert(${Math.random() * 100}%)`;
}
if(f > 15){
clearInterval(t);
document.body.className = '';
jW.style.display = 'none';
document.body.style.background = '#000';
q('#ui-layer').style.display = 'none';
setTimeout(()=>{
window.location.href = 'about:blank';
},1000);
  }
},50);
}
