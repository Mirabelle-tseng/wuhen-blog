/* 森林蓋木屋 — forest-material Tetris with a dog companion */
(function(){
const FORM='https://docs.google.com/forms/d/e/1FAIpQLSfjXKOn1nvSMdetusW0KpozCOLbfhQbauV6mxngq8V0IxiDgQ/formResponse';
const F_NAME='entry.439708661',F_SCORE='entry.270775091',F_GAME='entry.709660828';
const CSV='https://docs.google.com/spreadsheets/d/e/2PACX-1vRhYEsmvZrfso_C_cgfIj-x_PjTTkNIohmhMoNlzBzZTjj2I_yklwfhjCGEIU8Icm3vNaRXiA_cWYg8/pub?output=csv';
const GAME_TAG='tetris';
const BADW=['幹','靠北','靠杯','操','屌','雞巴','機掰','雞掰','屁眼','賤','婊','妓','死','殺','去死','白癡','白痴','智障','垃圾','腦殘','色情','約砲','援交','做愛','性交','奶子','fuck','shit','bitch','dick','pussy','sex','porn','nigg','http','www','.com','line','加賴'];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const track=(e,p)=>{try{gtag('event',e,p||{})}catch(_){}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function clean(n){n=(n||'').replace(/[\s​]+/g,'').slice(0,8);const low=n.toLowerCase();if(!n)return '';if(BADW.some(w=>low.includes(w)))return null;if(/\d{6,}/.test(n)||/@/.test(n))return null;return n}

/* ---------- pieces: forest materials ---------- */
const MAT={
 I:{name:'水滴',base:'#6FB7D9',dark:'#3F86AD'},
 O:{name:'石頭',base:'#ABA69C',dark:'#7E796F'},
 T:{name:'花',base:'#F2A7B8',dark:'#C9738A'},
 S:{name:'苔蘚',base:'#86B65E',dark:'#5D8A3C'},
 Z:{name:'屋瓦',base:'#C86F4D',dark:'#934630'},
 J:{name:'木頭',base:'#B9824F',dark:'#835532'},
 L:{name:'樹葉',base:'#5F9E52',dark:'#3E7034'}};
const SHAPES={I:[[0,1],[1,1],[2,1],[3,1]],O:[[1,0],[2,0],[1,1],[2,1]],T:[[1,0],[0,1],[1,1],[2,1]],S:[[1,0],[2,0],[0,1],[1,1]],Z:[[0,0],[1,0],[1,1],[2,1]],J:[[0,0],[0,1],[1,1],[2,1]],L:[[2,0],[0,1],[1,1],[2,1]]};
const COLS=10,ROWS=20;
const tex={};
function rnd(seed){let x=seed;return()=>{x=(x*9301+49297)%233280;return x/233280}}
function makeTex(k,c){const cv=document.createElement('canvas');cv.width=cv.height=c;const g=cv.getContext('2d'),m=MAT[k],r=rnd(k.charCodeAt(0)*7);
 const rr=c*.18;g.fillStyle=m.base;g.beginPath();g.roundRect?g.roundRect(1,1,c-2,c-2,rr):g.rect(1,1,c-2,c-2);g.fill();
 g.save();g.clip();
 if(k==='J'){g.strokeStyle='rgba(90,55,25,.45)';g.lineWidth=Math.max(1,c*.05);for(let i=0;i<3;i++){const y=c*(.25+i*.25);g.beginPath();g.moveTo(0,y);g.bezierCurveTo(c*.3,y-c*.08,c*.6,y+c*.08,c,y);g.stroke()}
   g.beginPath();g.ellipse(c*.68,c*.42,c*.1,c*.06,0,0,7);g.stroke()}
 if(k==='O'){for(let i=0;i<9;i++){g.fillStyle=r()<.5?'rgba(255,255,255,.25)':'rgba(60,55,50,.25)';g.beginPath();g.arc(r()*c,r()*c,c*(.04+r()*.05),0,7);g.fill()}
   g.strokeStyle='rgba(70,65,60,.35)';g.lineWidth=Math.max(1,c*.04);g.beginPath();g.moveTo(c*.15,c*.6);g.lineTo(c*.45,c*.5);g.lineTo(c*.6,c*.75);g.stroke()}
 if(k==='S'){for(let i=0;i<10;i++){g.fillStyle=r()<.5?'#A3CC77':'#4E7A30';g.beginPath();g.arc(r()*c,r()*c,c*(.05+r()*.06),0,7);g.fill()}}
 if(k==='L'){g.fillStyle='#7DBA68';g.beginPath();g.ellipse(c/2,c/2,c*.32,c*.18,-.7,0,7);g.fill();g.strokeStyle='#3E7034';g.lineWidth=Math.max(1,c*.04);g.beginPath();g.moveTo(c*.27,c*.73);g.lineTo(c*.73,c*.27);g.stroke()}
 if(k==='T'){g.fillStyle='#FFF6F8';for(let i=0;i<5;i++){const a=i/5*Math.PI*2;g.beginPath();g.arc(c/2+Math.cos(a)*c*.17,c/2+Math.sin(a)*c*.17,c*.13,0,7);g.fill()}g.fillStyle='#F2C14E';g.beginPath();g.arc(c/2,c/2,c*.1,0,7);g.fill()}
 if(k==='Z'){g.strokeStyle='rgba(110,45,25,.55)';g.lineWidth=Math.max(1,c*.05);for(let y=0;y<2;y++)for(let x=-1;x<3;x++){g.beginPath();g.arc(x*c*.5+(y%2)*c*.25,y*c*.5+c*.25,c*.25,0,Math.PI);g.stroke()}}
 if(k==='I'){g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.moveTo(c/2,c*.18);g.bezierCurveTo(c*.75,c*.48,c*.72,c*.78,c/2,c*.8);g.bezierCurveTo(c*.28,c*.78,c*.25,c*.48,c/2,c*.18);g.fill();
   g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=Math.max(1,c*.04);g.beginPath();g.moveTo(c*.1,c*.9);g.quadraticCurveTo(c*.3,c*.82,c*.5,c*.9);g.quadraticCurveTo(c*.7,c*.98,c*.9,c*.9);g.stroke()}
 g.restore();
 g.fillStyle='rgba(255,255,255,.28)';g.fillRect(c*.12,c*.08,c*.76,c*.07);
 g.strokeStyle=m.dark;g.lineWidth=Math.max(1,c*.05);g.beginPath();g.roundRect?g.roundRect(1.5,1.5,c-3,c-3,rr):g.rect(1.5,1.5,c-3,c-3);g.stroke();
 return cv}

/* ---------- DOM ---------- */
const ICON={L:'<path d="M15 5 8 12l7 7"/>',R:'<path d="m9 5 7 7-7 7"/>',ROT:'<path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M19 4v4h-4"/>',D:'<path d="M12 5v13"/><path d="m6 12 6 6 6-6"/>',H:'<path d="m6 6 6 6 6-6"/><path d="m6 12 6 6 6-6"/>'};
const svg=k=>`<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
const root=document.createElement('div');root.id='tg';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','森林蓋木屋小遊戲');
root.innerHTML=`<div class="tg-top"><button type="button" class="tg-x" data-tclose aria-label="關閉遊戲">×</button><h2>森林蓋木屋</h2><div class="tg-stat"><span>木屋 <b id="tg-floors">0</b> 層</span><span>分數 <b id="tg-score">0</b></span></div></div>
<div class="tg-main"><div class="tg-boardwrap"><canvas id="tg-board"></canvas></div>
<div class="tg-side"><p class="tg-lab">下一塊</p><canvas id="tg-next"></canvas><canvas id="tg-house"></canvas><p class="tg-lab" id="tg-level">第 1 關</p></div></div>
<div class="tg-ctrl"><button type="button" data-k="L" aria-label="向左">${svg('L')}</button><button type="button" data-k="ROT" aria-label="旋轉">${svg('ROT')}</button><button type="button" data-k="R" aria-label="向右">${svg('R')}</button><button type="button" data-k="D" aria-label="加速往下">${svg('D')}</button><button type="button" data-k="H" aria-label="直接落下">${svg('H')}</button></div>
<div class="tg-card" id="tg-card"></div>`;
document.body.appendChild(root);
const $=id=>document.getElementById(id);
const bc=$('tg-board'),bx=bc.getContext('2d'),nc=$('tg-next'),nx=nc.getContext('2d'),hc=$('tg-house'),hx=hc.getContext('2d');

/* ---------- state ---------- */
let S={},cell=24,dpr=Math.min(2,window.devicePixelRatio||1),raf=0,last=0,acc=0,bag=[];
function newBag(){bag=Object.keys(SHAPES).sort(()=>Math.random()-.5)}
function take(){if(!bag.length)newBag();return bag.pop()}
function piece(k){return {k,cells:SHAPES[k].map(c=>c.slice()),x:3,y:k==='I'?-1:0}}
function rotCells(p){if(p.k==='O')return p.cells;const n=p.k==='I'?4:3;return p.cells.map(([x,y])=>[n-1-y,x])}
function fits(cells,px,py){return cells.every(([x,y])=>{const X=px+x,Y=py+y;return X>=0&&X<COLS&&Y<ROWS&&(Y<0||!S.grid[Y][X])})}
function reset(){S={grid:Array.from({length:ROWS},()=>Array(COLS).fill(null)),cur:null,next:take(),score:0,lines:0,level:1,on:true,over:false,paused:false,dog:{jump:0,say:0,sad:false},flash:[]};spawn();updStat();}
function spawn(){S.cur=piece(S.next);S.next=take();if(!fits(S.cur.cells,S.cur.x,S.cur.y))gameOver();drawNext()}
function speed(){return Math.max(90,820-(S.level-1)*75)}
function lock(){S.cur.cells.forEach(([x,y])=>{const Y=S.cur.y+y;if(Y>=0)S.grid[Y][S.cur.x+x]=S.cur.k});
 if(S.cur.cells.some(([x,y])=>S.cur.y+y<0)){gameOver();return}
 const full=[];for(let y=0;y<ROWS;y++)if(S.grid[y].every(Boolean))full.push(y);
 if(full.length){full.forEach(y=>{S.grid.splice(y,1);S.grid.unshift(Array(COLS).fill(null))});
  S.lines+=full.length;S.score+=[0,100,300,500,800][full.length]*S.level;S.level=1+Math.floor(S.lines/10);
  S.dog.jump=1;S.dog.say=1.6;buzz(20)}
 updStat();spawn()}
function move(dx,dy){if(!S.on||S.paused)return false;if(fits(S.cur.cells,S.cur.x+dx,S.cur.y+dy)){S.cur.x+=dx;S.cur.y+=dy;return true}return false}
function rotate(){if(!S.on||S.paused)return;const r=rotCells(S.cur);for(const k of [0,-1,1,-2,2])if(fits(r,S.cur.x+k,S.cur.y)){S.cur.cells=r;S.cur.x+=k;return}}
function soft(){if(move(0,1)){S.score+=1;updStat()}else lock();acc=0}
function hard(){if(!S.on||S.paused)return;let n=0;while(move(0,1))n++;S.score+=n*2;lock();acc=0;buzz(8)}
function ghostY(){let y=S.cur.y;while(fits(S.cur.cells,S.cur.x,y+1))y++;return y}
function buzz(ms){try{navigator.vibrate&&navigator.vibrate(ms)}catch(_){}}
function updStat(){$('tg-floors').textContent=S.lines;$('tg-score').textContent=S.score;$('tg-level').textContent='第 '+S.level+' 關'}

/* ---------- layout ---------- */
function layout(){const W=root.clientWidth,H=root.clientHeight;const top=root.querySelector('.tg-top').offsetHeight,ctrl=root.querySelector('.tg-ctrl').offsetHeight;
 const availH=H-top-ctrl-22,sideW=Math.min(130,Math.max(86,W*.24)),availW=W-sideW-36;
 cell=Math.max(14,Math.floor(Math.min(availH/ROWS,availW/COLS,34)));
 bc.style.width=cell*COLS+'px';bc.style.height=cell*ROWS+'px';bc.width=cell*COLS*dpr;bc.height=cell*ROWS*dpr;bx.setTransform(dpr,0,0,dpr,0,0);
 const nw=Math.round(sideW-12);nc.style.width=nw+'px';nc.style.height=Math.round(nw*.66)+'px';nc.width=nw*dpr;nc.height=Math.round(nw*.66)*dpr;nx.setTransform(dpr,0,0,dpr,0,0);
 const hh=Math.max(120,cell*ROWS-nw*.66-60);hc.style.width=nw+'px';hc.style.height=hh+'px';hc.width=nw*dpr;hc.height=hh*dpr;hx.setTransform(dpr,0,0,dpr,0,0);
 Object.keys(MAT).forEach(k=>tex[k]=makeTex(k,cell*dpr));drawNext()}

/* ---------- drawing ---------- */
function drawCell(g,k,x,y,c,alpha){g.globalAlpha=alpha==null?1:alpha;g.drawImage(tex[k],x,y,c,c);g.globalAlpha=1}
function drawBoard(){const w=cell*COLS,h=cell*ROWS;bx.clearRect(0,0,w,h);
 bx.fillStyle='rgba(255,253,248,.55)';bx.fillRect(0,0,w,h);
 bx.strokeStyle='rgba(120,150,170,.14)';bx.lineWidth=1;for(let x=1;x<COLS;x++){bx.beginPath();bx.moveTo(x*cell+.5,0);bx.lineTo(x*cell+.5,h);bx.stroke()}for(let y=1;y<ROWS;y++){bx.beginPath();bx.moveTo(0,y*cell+.5);bx.lineTo(w,y*cell+.5);bx.stroke()}
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++)if(S.grid[y][x])drawCell(bx,S.grid[y][x],x*cell,y*cell,cell);
 if(S.cur&&S.on){const gy=ghostY();S.cur.cells.forEach(([x,y])=>{const Y=gy+y;if(Y>=0){bx.strokeStyle=MAT[S.cur.k].dark;bx.globalAlpha=.45;bx.lineWidth=2;bx.setLineDash([4,3]);bx.strokeRect((S.cur.x+x)*cell+3,Y*cell+3,cell-6,cell-6);bx.setLineDash([]);bx.globalAlpha=1}});
  S.cur.cells.forEach(([x,y])=>{const Y=S.cur.y+y;if(Y>=0)drawCell(bx,S.cur.k,(S.cur.x+x)*cell,Y*cell,cell)})}}
function drawNext(){if(!S.next)return;const w=nc.width/dpr,h=nc.height/dpr;nx.clearRect(0,0,w,h);const c=Math.min(w/5,(h-14)/2.6),cs=SHAPES[S.next];
 const xs=cs.map(a=>a[0]),ys=cs.map(a=>a[1]),cw=(Math.max(...xs)-Math.min(...xs)+1)*c,ch=(Math.max(...ys)-Math.min(...ys)+1)*c;
 const ox=(w-cw)/2-Math.min(...xs)*c,oy=(h-14-ch)/2-Math.min(...ys)*c;cs.forEach(([x,y])=>nx.drawImage(tex[S.next]||makeTex(S.next,c*dpr),ox+x*c,oy+y*c,c,c));
 nx.font='600 11px "Noto Sans TC",sans-serif';nx.fillStyle='#6B7A8C';nx.textAlign='center';nx.fillText(MAT[S.next].name,w/2,h-4)}
function drawHouse(t){const w=hc.width/dpr,h=hc.height/dpr;hx.clearRect(0,0,w,h);
 const ground=h-8;hx.fillStyle='#86B65E';hx.beginPath();hx.ellipse(w/2,ground,w*.48,7,0,0,7);hx.fill();
 const floors=S.lines||0,maxShow=Math.max(1,Math.floor((h-110)/9)),shown=Math.min(floors,maxShow),fh=Math.min(14,Math.max(6,(h-110)/Math.max(shown,1)));
 const hw=w*.52,x0=w*.12;let y=ground-2;
 for(let i=0;i<shown;i++){y-=fh;hx.fillStyle=i%2?'#B9824F':'#A97342';hx.fillRect(x0,y,hw,fh);hx.strokeStyle='rgba(90,55,25,.4)';hx.lineWidth=1;hx.strokeRect(x0+.5,y+.5,hw-1,fh-1);
  if(fh>=8){hx.fillStyle='#FFE3A3';hx.fillRect(x0+hw*.2,y+fh*.25,hw*.16,fh*.5);hx.fillRect(x0+hw*.64,y+fh*.25,hw*.16,fh*.5)}}
 if(floors>shown){hx.font='700 11px "Noto Sans TC",sans-serif';hx.fillStyle='#8A6A3A';hx.textAlign='center';hx.fillText('↑ '+floors+' 層',x0+hw/2,y-30)}
 hx.fillStyle='#C86F4D';hx.beginPath();hx.moveTo(x0-6,y);hx.lineTo(x0+hw/2,y-24);hx.lineTo(x0+hw+6,y);hx.closePath();hx.fill();
 if(floors===0){hx.font='500 11px "Noto Sans TC",sans-serif';hx.fillStyle='#6B7A8C';hx.textAlign='center';hx.fillText('消一排蓋一層',w/2,26)}
 drawDog(w*.72,ground-2,t)}
function drawDog(cx,gy,t){const d=S.dog;const jump=d.jump>0?Math.sin((1-d.jump)*Math.PI)*16:0;const by=gy-jump,wag=Math.sin(t/90)*(d.say>0?.9:.35);const g=hx;
 g.fillStyle='rgba(40,40,40,.12)';g.beginPath();g.ellipse(cx,gy,13-jump*.3,3,0,0,7);g.fill();
 g.save();g.translate(cx,by);
 g.strokeStyle='#D9964F';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(-9,-10);g.quadraticCurveTo(-17,-16+wag*4,-12,-21+wag*3);g.stroke();
 g.fillStyle='#E3A35E';g.beginPath();g.ellipse(-1,-9,11,7,0,0,7);g.fill();
 g.fillStyle='#FFF4E6';g.beginPath();g.ellipse(2,-6,6,4,0,0,7);g.fill();
 g.fillStyle='#E3A35E';[-6,4].forEach(x=>{g.fillRect(x,-4,4,5)});
 const hy=d.sad?-16:-19;g.beginPath();g.arc(8,hy,8,0,7);g.fill();
 g.beginPath();g.moveTo(3,hy-5);g.lineTo(4,hy-13);g.lineTo(8,hy-7);g.fill();g.beginPath();g.moveTo(10,hy-7);g.lineTo(14,hy-13);g.lineTo(14,hy-4);g.fill();
 g.fillStyle='#FFF4E6';g.beginPath();g.ellipse(10,hy+3,5,3.6,0,0,7);g.fill();
 g.fillStyle='#2B2420';g.beginPath();g.arc(6,hy-1,1.2,0,7);g.arc(12,hy-1,1.2,0,7);g.fill();g.beginPath();g.arc(11,hy+1.6,1.3,0,7);g.fill();
 if(d.say>0){g.strokeStyle='#2B2420';g.lineWidth=1;g.beginPath();g.arc(10,hy+4,2,0,Math.PI);g.stroke()}
 g.restore();
 if(d.say>0){g.fillStyle='#fff';g.strokeStyle='#C9A06A';g.lineWidth=1.2;const bx_=cx-22,by_=by-50;g.beginPath();g.roundRect?g.roundRect(bx_,by_,36,18,8):g.rect(bx_,by_,36,18);g.fill();g.stroke();
  g.font='700 11px "Noto Sans TC",sans-serif';g.fillStyle='#8A6A3A';g.textAlign='center';g.fillText('汪！',bx_+18,by_+13)}}

/* ---------- loop ---------- */
function loop(t){raf=requestAnimationFrame(loop);const dt=Math.min(100,t-(last||t));last=t;
 if(S.on&&!S.paused){acc+=dt;if(acc>=speed()){acc=0;if(!move(0,1))lock()}}
 if(S.dog.jump>0)S.dog.jump=Math.max(0,S.dog.jump-dt/600);if(S.dog.say>0)S.dog.say=Math.max(0,S.dog.say-dt/1000);
 drawBoard();drawHouse(t)}

/* ---------- leaderboard ---------- */
const RK={rows:null,mine:[],tab:'month'};
async function rkLoad(force){if(RK.rows&&!force)return;try{const txt=await (await fetch(CSV+'&t='+Math.floor(Date.now()/60000),{cache:'no-store'})).text();const rows=[];let row=[],cur='',q=false;
 for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'){if(txt[i+1]==='"'){cur+='"';i++}else q=false}else cur+=c}else if(c==='"')q=true;else if(c===','){row.push(cur);cur=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(cur);rows.push(row);row=[];cur=''}else cur+=c}
 if(cur||row.length){row.push(cur);rows.push(row)}
 RK.rows=rows.slice(1).filter(r=>(r[3]||'')===GAME_TAG).map(r=>{const m=(r[0]||'').match(/(\d{4})\/(\d{1,2})\//);return{name:clean(r[1]),score:Math.min(9999,parseInt(r[2],10)||0),ym:m?m[1]+'-'+m[2].padStart(2,'0'):''}}).filter(x=>x.name&&x.score>0)}catch(_){RK.rows=RK.rows||[]}}
const ymNow=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')};
function rkTop(){const all=[...(RK.rows||[]),...RK.mine].filter(x=>RK.tab==='all'||x.ym===ymNow()),best={};all.forEach(x=>{const k=x.name.toLowerCase();if(!best[k]||x.score>best[k].score)best[k]=x});return Object.values(best).sort((a,b)=>b.score-a.score).slice(0,10)}
function rkList(){if(RK.rows==null)return '<p class="tg-fine">排行榜讀取中…</p>';const top=rkTop(),me=(LS.get('wh-rank-name','')||'').toLowerCase();
 if(!top.length)return `<p class="tg-fine">${RK.tab==='month'?'這個月':'目前'}還沒有人上榜，當第一名吧！</p>`;
 return `<ol class="tg-lb">${top.map((x,i)=>`<li class="${x.name.toLowerCase()===me?'me':''}"><b>${i+1}</b><span>${esc(x.name)}</span><span>${x.score} 層</span></li>`).join('')}</ol>`}
function rkBox(){return `<div class="tg-tabs"><button type="button" data-rt="month" aria-pressed="${RK.tab==='month'}">本月排行</button><button type="button" data-rt="all" aria-pressed="${RK.tab==='all'}">總排行</button></div><div id="tg-lbl">${rkList()}</div>`}
function rkRefresh(){const l=$('tg-lbl');if(l)l.innerHTML=rkList();root.querySelectorAll('[data-rt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.rt===RK.tab))}
async function rkSubmit(){const inp=$('tg-name'),msg=$('tg-msg'),btn=$('tg-send');const n=clean(inp.value);
 if(n===''){msg.textContent='先填一個暱稱吧。';inp.focus();return}if(n===null){msg.textContent='這個暱稱不能用，換一個吧。';inp.focus();return}
 if(S.sent)return;S.sent=true;btn.disabled=true;btn.textContent='送出中…';
 const fd=new URLSearchParams();fd.append(F_NAME,n);fd.append(F_SCORE,String(S.lines));fd.append(F_GAME,GAME_TAG);
 try{await fetch(FORM,{method:'POST',mode:'no-cors',body:fd});LS.set('wh-rank-name',n);RK.mine.push({name:n,score:S.lines,ym:ymNow()});
  msg.className='tg-msg ok';msg.textContent='上榜了！';btn.textContent='已送出';track('island_tetris_submit',{floors:S.lines});const b=$('tg-rkbox');if(b)b.innerHTML=rkBox();rkLoad(true).then(rkRefresh)}
 catch(_){S.sent=false;btn.disabled=false;btn.textContent='送出成績';msg.textContent='送出失敗，請確認網路後再試一次。'}}

/* ---------- screens ---------- */
const card=$('tg-card');
function intro(){S.on=false;card.hidden=false;const best=LS.get('wh-best-tetris',0);
 card.innerHTML=`<h3>森林蓋木屋</h3><p>用森林裡的木頭、石頭、苔蘚、樹葉、花、水滴和屋瓦拼拼看。<br>每消掉一整排，木屋就蓋高一層，狗狗也會開心地叫一聲。</p>
 <ul class="tg-how"><li><b>${svg('L')}${svg('R')}</b>左右移動</li><li><b>${svg('ROT')}</b>旋轉</li><li><b>${svg('D')}</b>加速往下</li><li><b>${svg('H')}</b>直接落下</li></ul><p class="tg-fine">手機也可以直接在方塊區滑動：左右滑移動、點一下旋轉、快速往下滑直接落下。</p><p class="tg-fine">電腦可以用方向鍵，空白鍵直接落下。${best?`你的最佳紀錄：${best} 層`:''}</p>
 <div class="tg-btns"><button type="button" class="tg-go" data-tstart>開始蓋木屋</button><button type="button" class="tg-ghost" data-tboard>看排行榜</button></div>`}
function board(){card.hidden=false;card.innerHTML=`<h3>森林蓋木屋排行榜</h3><div id="tg-rkbox">${rkBox()}</div><p class="tg-fine">以木屋層數排名，同一個暱稱只算最好的一次。新成績約幾分鐘後會出現在大家的排行榜上。</p><div class="tg-btns"><button type="button" class="tg-go" data-tstart>開始蓋木屋</button><button type="button" class="tg-ghost" data-tclose>回到森林</button></div>`;rkLoad().then(rkRefresh)}
function gameOver(){S.on=false;S.over=true;S.dog.sad=true;const fl=S.lines,best=Math.max(fl,LS.get('wh-best-tetris',0));LS.set('wh-best-tetris',best);track('island_tetris_end',{floors:fl,score:S.score});
 const title=fl>=40?'森林建築大師':fl>=20?'木屋工頭':fl>=8?'認真小木匠':'新手小木匠';const nm=LS.get('wh-rank-name','');
 card.hidden=false;card.innerHTML=`<p class="tg-k">木屋蓋好了</p><h3>${fl} 層・${title}</h3><p>分數 ${S.score}・最佳紀錄 ${best} 層</p>
 ${fl>0?`<div class="tg-sub"><label for="tg-name">留下暱稱上排行榜</label><div class="tg-row"><input id="tg-name" maxlength="8" placeholder="最多 8 個字" value="${esc(nm)}" autocomplete="nickname"><button type="button" id="tg-send" class="tg-go sm">送出成績</button></div><p class="tg-msg" id="tg-msg"></p></div>`:''}
 <div id="tg-rkbox">${rkBox()}</div><div class="tg-btns"><button type="button" class="tg-go" data-tstart>再蓋一次</button><button type="button" class="tg-ghost" data-tclose>回到森林</button></div>`;
 const sb=$('tg-send');if(sb)sb.addEventListener('click',rkSubmit);rkLoad().then(rkRefresh)}
function start(){card.hidden=true;newBag();reset();acc=0;S.sent=false;track('island_tetris_start')}
function open(){root.hidden=false;document.documentElement.style.overflow='hidden';layout();if(!S.grid)reset(),S.on=false;intro();cancelAnimationFrame(raf);last=0;raf=requestAnimationFrame(loop);track('island_tetris_open');rkLoad()}
function close(){root.hidden=true;document.documentElement.style.overflow='';S.on=false;cancelAnimationFrame(raf)}
window.openTetris=open;

/* ---------- input ---------- */
root.addEventListener('click',e=>{const t=e.target.closest('[data-tstart],[data-tboard],[data-tclose],[data-rt]');if(!t)return;
 if(t.dataset.rt){RK.tab=t.dataset.rt;rkRefresh();return}if(t.hasAttribute('data-tstart'))start();else if(t.hasAttribute('data-tboard'))board();else if(t.hasAttribute('data-tclose'))close()});
const act={L:()=>move(-1,0),R:()=>move(1,0),ROT:rotate,D:soft,H:hard};
root.querySelectorAll('.tg-ctrl button').forEach(b=>{let rep=0,hold=0;const k=b.dataset.k;
 const down=e=>{e.preventDefault();act[k]();if(k==='L'||k==='R'||k==='D'){hold=setTimeout(()=>{rep=setInterval(act[k],k==='D'?45:75)},190)}};
 const up=()=>{clearTimeout(hold);clearInterval(rep)};
 b.addEventListener('touchstart',down,{passive:false});b.addEventListener('mousedown',e=>{if(e.button===0)down(e)});
 ['touchend','touchcancel','mouseup','mouseleave'].forEach(ev=>b.addEventListener(ev,up));
 b.addEventListener('contextmenu',e=>e.preventDefault())});
root.addEventListener('selectstart',e=>e.preventDefault());
/* swipe on board */
let sx=0,sy=0,st=0,moved=false;bc.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;st=Date.now();moved=false;e.preventDefault()},{passive:false});
bc.addEventListener('touchmove',e=>{const t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>cell*.9){move(dx>0?1:-1,0);sx=t.clientX;moved=true}else if(dy>cell*.9){soft();sy=t.clientY;moved=true}e.preventDefault()},{passive:false});
bc.addEventListener('touchend',e=>{const t=e.changedTouches[0],dy=t.clientY-sy;if(!moved&&Date.now()-st<250)rotate();else if(dy>cell*3&&Date.now()-st<300)hard()});
addEventListener('keydown',e=>{if(root.hidden)return;const m={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'ROT',ArrowDown:'D',' ':'H',x:'ROT',z:'ROT'};
 if(e.key==='Escape'){close();return}if(m[e.key]&&S.on){e.preventDefault();act[m[e.key]]()}});
addEventListener('resize',()=>{if(!root.hidden)layout()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.on)S.paused=true;else if(S.paused)S.paused=false});
})();
