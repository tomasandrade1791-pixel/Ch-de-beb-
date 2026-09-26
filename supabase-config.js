// Configuração segura: não guardar chaves secretas aqui.
window.AliceDB = null;

(function(){
  function fixEnvelopeStage(){
    const closed=document.getElementById('envClosed'), tap=document.getElementById('tapText'), open=document.getElementById('envOpen');
    if(closed){closed.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/IMG-20260919-WA0104.jpg?v=20260920';closed.alt='Cartinha fechada';closed.style.display='block';}
    if(tap){tap.textContent='TOQUE NA CARTINHA PARA ABRIR';tap.style.display='block';tap.style.opacity='1';}
    if(open){open.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/file_000000007f04820e9ff7fd2ea074c872.png?v=20260921';open.alt='Cartinha aberta';open.style.display='block';}
  }

  function initEnvelopeAnimation(){
    const card=document.getElementById('envCard'),closed=document.getElementById('envClosed'),open=document.getElementById('envOpen'),tap=document.getElementById('tapText');
    if(!card||!closed||!open||card.dataset.openAnimationReady)return;
    card.dataset.openAnimationReady='1';
    const style=document.createElement('style');
    style.textContent=`
      .envCard.realOpening{overflow:visible}
      .envCard.realOpening #envClosed{animation:envelopeClosedOut .72s cubic-bezier(.55,.05,.68,.19) forwards!important}
      .envCard.realOpening #envOpen{animation:envelopeOpenIn 1.15s cubic-bezier(.2,.75,.2,1) .08s forwards!important;clip-path:inset(100% 0 0 0);opacity:1!important;transform:translateY(7%) scale(.94)!important;filter:drop-shadow(0 0 0 rgba(215,184,106,0))!important}
      .envCard.realOpening + .tap{animation:tapOut .28s ease forwards}
      @keyframes envelopeClosedOut{0%{opacity:1;transform:scale(1) rotate(0)}55%{opacity:.95;transform:scale(1.025) rotate(-.4deg)}100%{opacity:0;transform:scale(1.055) rotate(-1deg)}}
      @keyframes envelopeOpenIn{0%{clip-path:inset(100% 0 0 0);opacity:1;transform:translateY(7%) scale(.94)}45%{clip-path:inset(35% 0 0 0);opacity:1;transform:translateY(1%) scale(.985)}100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateY(0) scale(1)}}
      @keyframes tapOut{to{opacity:0;visibility:hidden}}
    `;
    document.head.appendChild(style);
    card.addEventListener('click',function(e){
      if(card.dataset.realOpened)return;
      e.preventDefault();e.stopImmediatePropagation();card.dataset.realOpened='1';tap.style.pointerEvents='none';card.classList.add('realOpening');
      setTimeout(function(){
        document.querySelectorAll('.view').forEach(function(v){v.classList.remove('on');});
        const paper=document.getElementById('paperReveal');
        if(paper)paper.classList.add('on');
      },1450);
      setTimeout(function(){
        document.querySelectorAll('.view').forEach(function(v){v.classList.remove('on');});
        const rules=document.getElementById('rules');
        if(rules)rules.classList.add('on');
      },2950);
    },true);
  }

  function initRulesIntroSplit(){
    let tries=0;
    const timer=setInterval(function(){
      tries++;
      if(typeof window.renderRule!=='function'||!document.getElementById('rp')){if(tries>100)clearInterval(timer);return;}
      clearInterval(timer);
      const baseRenderRule=window.renderRule,baseNext=window.next,basePrev=window.prev;
      let intro=true;
      window.renderRule=function(){
        const rp=document.getElementById('rp');if(!rp)return;
        if(intro){
          rp.innerHTML='<h1>Combinados para o<br>⭐ nosso dia ⭐</h1><p class="intro"><strong>Queridos amigos e familiares,</strong><br>Para que possamos aproveitar esse momento tão especial com tranquilidade, carinho e alegria, preparamos alguns pequenos combinados.<br><br>Agradecemos desde já a compreensão e o carinho de todos com nossa família e, principalmente, com a nossa pequena. 💙🍼</p><div class="nav"><button class="btn" disabled>‹ VOLTAR</button><span class="counter">INTRODUÇÃO</span><button class="btn" onclick="next()">COMEÇAR ›</button></div>';
        }else baseRenderRule();
      };
      window.next=function(){if(intro){intro=false;ri=0;window.renderRule();}else baseNext();};
      window.prev=function(){if(!intro&&ri===0){intro=true;window.renderRule();}else if(!intro)basePrev();};
      intro=true;ri=0;window.renderRule();
    },100);
  }

  function init(){fixEnvelopeStage();initEnvelopeAnimation();initRulesIntroSplit();setTimeout(fixEnvelopeStage,500);setTimeout(fixEnvelopeStage,1500);setTimeout(initEnvelopeAnimation,50);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

(function(){
  function restartAliceAnimation(){
    const section=document.getElementById('alice'), stage=document.querySelector('.aliceStage');if(!section||!stage)return;
    const img=stage.querySelector('.aliceArt'), light=stage.querySelector('.aliceLight');
    if(img){img.style.display='block';img.style.animation='none';void img.offsetWidth;img.style.animation='aliceReveal 5.2s ease-in-out both';}
    if(light){light.style.display='block';light.style.animation='none';void light.offsetWidth;light.style.animation='navyLight 5.2s ease-in-out both';}
  }
  function start(){
    if(document.getElementById('cinematicIntro'))return;
    const css=document.createElement('style');css.textContent='#cinematicIntro{position:fixed;inset:0;background:#000;color:#f4ead5;z-index:99999;display:flex;align-items:center;justify-content:center;text-align:center;padding:28px}.cinematicText{font-family:Georgia,"Times New Roman",serif;font-size:clamp(25px,6vw,48px);line-height:1.3;max-width:850px;opacity:0;transition:opacity .4s ease}.cinematicText.show{opacity:1}';document.head.appendChild(css);
    const overlay=document.createElement('div');overlay.id='cinematicIntro';const text=document.createElement('div');text.className='cinematicText';overlay.appendChild(text);document.body.appendChild(overlay);
    const first='Uma pequena história está prestes a começar...';const second='Tem alguém muito especial esperando para conhecer vocês...';const third='Agora fiquem com a surpresa...';const started=performance.now();
    function tick(){const t=(performance.now()-started)/1000;if(t<3){text.classList.remove('show')}else if(t<8){text.textContent=first;text.classList.add('show')}else if(t<13){text.classList.remove('show')}else if(t<18){text.textContent=second;text.classList.add('show')}else if(t<23){text.classList.remove('show')}else if(t<28){text.textContent=third;text.classList.add('show')}else if(t<38){text.classList.remove('show')}else{document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));const alice=document.getElementById('alice');if(alice)alice.classList.add('on');overlay.remove();restartAliceAnimation();return}requestAnimationFrame(tick)}
    requestAnimationFrame(tick);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();

(function(){
  function prepareAlice(){
    const img=document.querySelector('.aliceArt');if(!img||img.dataset.cleaned==='1')return;img.dataset.cleaned='1';const src='IMG-20260919-WA0107.jpg?v=20260925';img.src=src;
    const process=function(){try{const w=img.naturalWidth,h=img.naturalHeight;if(!w||!h)return;const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);const data=ctx.getImageData(0,0,w,h),p=data.data;const samples=[];[[0,0],[w-1,0],[0,h-1],[w-1,h-1],[Math.floor(w*.04),Math.floor(h*.04)],[Math.floor(w*.96),Math.floor(h*.04)],[Math.floor(w*.04),Math.floor(h*.96)],[Math.floor(w*.96),Math.floor(h*.96)]].forEach(([x,y])=>{const i=(y*w+x)*4;samples.push([p[i],p[i+1],p[i+2]])});let br=0,bg=0,bb=0;samples.forEach(s=>{br+=s[0];bg+=s[1];bb+=s[2]});br/=samples.length;bg/=samples.length;bb/=samples.length;const seen=new Uint8Array(w*h),queue=[];const similar=function(k){const i=k*4,r=p[i],g=p[i+1],b=p[i+2];return Math.hypot(r-br,g-bg,b-bb)<88};for(let x=0;x<w;x++){const a=x,b=(h-1)*w+x;if(similar(a)){seen[a]=1;queue.push(a)}if(similar(b)){seen[b]=1;queue.push(b)}}for(let y=1;y<h-1;y++){const a=y*w,b=a+w-1;if(similar(a)){seen[a]=1;queue.push(a)}if(similar(b)){seen[b]=1;queue.push(b)}}for(let q=0;q<queue.length;q++){const k=queue[q],x=k%w,y=Math.floor(k/w),i=k*4;p[i+3]=0;if(x>0){const n=k-1;if(!seen[n]&&similar(n)){seen[n]=1;queue.push(n)}}if(x<w-1){const n=k+1;if(!seen[n]&&similar(n)){seen[n]=1;queue.push(n)}}if(y>0){const n=k-w;if(!seen[n]&&similar(n)){seen[n]=1;queue.push(n)}}if(y<h-1){const n=k+w;if(!seen[n]&&similar(n)){seen[n]=1;queue.push(n)}}}ctx.putImageData(data,0,0);img.src=canvas.toDataURL('image/png');img.style.mixBlendMode='normal'}catch(e){img.style.mixBlendMode='screen'}};if(img.complete)process();else img.addEventListener('load',process,{once:true})
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',prepareAlice);else prepareAlice();
})();

(function(){
  function initAliceToEnvelope(){
    const alice=document.getElementById('alice'),env=document.getElementById('env');if(!alice||!env||alice.dataset.envelopeTransitionReady)return;alice.dataset.envelopeTransitionReady='1';let scheduled=false;
    function goToEnvelope(){if(scheduled)return;scheduled=true;setTimeout(function(){if(!alice.classList.contains('on'))return;document.querySelectorAll('.view').forEach(function(v){v.classList.remove('on')});env.classList.add('on')},6500)}
    const observer=new MutationObserver(function(){if(alice.classList.contains('on'))goToEnvelope()});observer.observe(alice,{attributes:true,attributeFilter:['class']});if(alice.classList.contains('on'))goToEnvelope();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAliceToEnvelope);else initAliceToEnvelope();
})();

(function(){const style=document.createElement('style');style.textContent='.aliceStage .sub{display:none!important}';document.head.appendChild(style)})();
