// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

(function(){
  function restartAliceAnimation(){
    const section=document.getElementById('alice');
    const stage=document.querySelector('.aliceStage');
    if(!section||!stage||!section.classList.contains('on'))return;
    const old=stage.querySelector('.aliceArt'),light=stage.querySelector('.aliceLight'),sub=stage.querySelector('.sub'),logo=stage.querySelector('.aliceLogo');
    if(logo)logo.remove();
    if(old){old.style.display='block';old.style.animation='none';void old.offsetWidth;old.style.animation='aliceReveal 5.2s ease-in-out both';}
    if(light){light.style.display='block';light.style.animation='none';void light.offsetWidth;light.style.animation='navyLight 5.2s ease-in-out both';}
    if(sub)sub.style.display='block';
  }
  function fixAliceStage(){const stage=document.querySelector('.aliceStage');if(!stage)return;const old=stage.querySelector('.aliceArt'),light=stage.querySelector('.aliceLight'),sub=stage.querySelector('.sub');if(old)old.style.display='block';if(light)light.style.display='block';if(sub)sub.style.display='block';const logo=stage.querySelector('.aliceLogo');if(logo)logo.remove();}
  function fixEnvelopeStage(){const closed=document.getElementById('envClosed'),tap=document.getElementById('tapText'),open=document.getElementById('envOpen');if(closed){closed.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/IMG-20260919-WA0104.jpg?v=20260920';closed.alt='Cartinha fechada';closed.style.display='block';}if(tap){tap.textContent='TOQUE NA CARTINHA PARA ABRIR';tap.style.display='block';tap.style.opacity='1';}if(open){open.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/file_000000007f04820e9ff7fd2ea074c872.png?v=20260921';open.alt='Cartinha aberta';open.style.display='block';}}
  function initEnvelopeAnimation(){const card=document.getElementById('envCard'),closed=document.getElementById('envClosed'),open=document.getElementById('envOpen'),tap=document.getElementById('tapText');if(!card||!closed||!open||card.dataset.openAnimationReady)return;card.dataset.openAnimationReady='1';const style=document.createElement('style');style.textContent=`.envCard.realOpening{overflow:visible}.envCard.realOpening #envClosed{animation:envelopeClosedOut .72s cubic-bezier(.55,.05,.68,.19) forwards!important}.envCard.realOpening #envOpen{animation:envelopeOpenIn 1.15s cubic-bezier(.2,.75,.2,1) .08s forwards!important;clip-path:inset(100% 0 0 0);opacity:1!important;transform:translateY(7%) scale(.94)!important;filter:drop-shadow(0 0 0 rgba(215,184,106,0))!important}.envCard.realOpening + .tap{animation:tapOut .28s ease forwards}@keyframes envelopeClosedOut{0%{opacity:1;transform:scale(1) rotate(0)}55%{opacity:.95;transform:scale(1.025) rotate(-.4deg)}100%{opacity:0;transform:scale(1.055) rotate(-1deg)}}@keyframes envelopeOpenIn{0%{clip-path:inset(100% 0 0 0);opacity:1;transform:translateY(7%) scale(.94)}45%{clip-path:inset(35% 0 0 0);opacity:1;transform:translateY(1%) scale(.985)}100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateY(0) scale(1)}}@keyframes tapOut{to{opacity:0;visibility:hidden}}`;document.head.appendChild(style);card.addEventListener('click',function(e){if(card.dataset.realOpened)return;e.preventDefault();e.stopImmediatePropagation();card.dataset.realOpened='1';tap.style.pointerEvents='none';card.classList.add('realOpening');setTimeout(function(){if(typeof show==='function')show('paperReveal')},1450);setTimeout(function(){if(typeof show==='function')show('rules')},2950);},true);}
  function initRulesIntroSplit(){let tries=0;const timer=setInterval(function(){tries++;if(typeof window.renderRule!=='function'||!document.getElementById('rp')){if(tries>100)clearInterval(timer);return;}clearInterval(timer);const baseRenderRule=window.renderRule,baseNext=window.next,basePrev=window.prev;let intro=true;window.renderRule=function(){const rp=document.getElementById('rp');if(!rp)return;if(intro){rp.innerHTML='<h1>Combinados para o<br>⭐ nosso dia ⭐</h1><p class="intro"><strong>Queridos amigos e familiares,</strong><br>Para que possamos aproveitar esse momento tão especial com tranquilidade, carinho e alegria, preparamos alguns pequenos combinados.<br><br>Agradecemos desde já a compreensão e o carinho de todos com nossa família e, principalmente, com a nossa pequena. 💙🍼</p><div class="nav"><button class="btn" disabled>‹ VOLTAR</button><span class="counter">INTRODUÇÃO</span><button class="btn" onclick="next()">COMEÇAR ›</button></div>';}else baseRenderRule();};window.next=function(){if(intro){intro=false;ri=0;window.renderRule();}else baseNext();};window.prev=function(){if(!intro&&ri===0){intro=true;window.renderRule();}else if(!intro)basePrev();};intro=true;ri=0;window.renderRule();},100);}
  function init(){fixAliceStage();fixEnvelopeStage();initEnvelopeAnimation();initRulesIntroSplit();const aliceSection=document.getElementById('alice');if(aliceSection)new MutationObserver(function(){restartAliceAnimation();}).observe(aliceSection,{attributes:true,attributeFilter:['class']});setTimeout(fixEnvelopeStage,500);setTimeout(fixEnvelopeStage,1500);setTimeout(initEnvelopeAnimation,50);setTimeout(restartAliceAnimation,100);setTimeout(restartAliceAnimation,500);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

(function(){
  function startIntro(){
    if(document.getElementById('cinematicIntro'))return;
    const css=document.createElement('style');
    css.textContent='#cinematicIntro{position:fixed;inset:0;background:#000;color:#f4ead5;z-index:99999;display:flex;align-items:center;justify-content:center;text-align:center;padding:28px}.cinematicText{font-family:Georgia,"Times New Roman",serif;font-size:clamp(25px,6vw,48px);line-height:1.3;max-width:850px;opacity:0;transition:opacity .4s ease}.cinematicText.show{opacity:1}';
    document.head.appendChild(css);
    const overlay=document.createElement('div');overlay.id='cinematicIntro';
    const text=document.createElement('div');text.className='cinematicText';overlay.appendChild(text);document.body.appendChild(overlay);
    const first='Uma pequena história está prestes a começar...';
    const second='Tem alguém muito especial esperando para conhecer vocês...';
    const third='Agora fiquem com a surpresa...';
    const at=(ms,fn)=>setTimeout(fn,ms);
    const showText=value=>{text.textContent=value;text.classList.add('show');};
    const hideText=()=>text.classList.remove('show');
    at(3000,()=>showText(first));
    at(8000,hideText);
    at(13000,()=>showText(second));
    at(18000,hideText);
    at(23000,()=>showText(third));
    at(28000,hideText);
    at(38000,()=>{document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));const alice=document.getElementById('alice');if(alice)alice.classList.add('on');restartAliceAnimationDirect();overlay.remove();});
  }
  function restartAliceAnimationDirect(){const section=document.getElementById('alice'),stage=document.querySelector('.aliceStage');if(!section||!stage)return;const old=stage.querySelector('.aliceArt'),light=stage.querySelector('.aliceLight');if(old){old.style.display='block';old.style.animation='none';void old.offsetWidth;old.style.animation='aliceReveal 5.2s ease-in-out both';}if(light){light.style.display='block';light.style.animation='none';void light.offsetWidth;light.style.animation='navyLight 5.2s ease-in-out both';}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startIntro);else startIntro();
})();

(function(){
  function run(){
    const overlay=document.getElementById('cinematicIntro');
    if(!overlay)return;
    const text=overlay.querySelector('.cinematicText');
    const started=performance.now();
    const first='Uma pequena história está prestes a começar...';
    const second='Tem alguém muito especial esperando para conhecer vocês...';
    const third='Agora fiquem com a surpresa...';
    function tick(){
      const t=(performance.now()-started)/1000;
      if(t<3){text.classList.remove('show');}
      else if(t<8){text.textContent=first;text.classList.add('show');}
      else if(t<13){text.classList.remove('show');}
      else if(t<18){text.textContent=second;text.classList.add('show');}
      else if(t<23){text.classList.remove('show');}
      else if(t<28){text.textContent=third;text.classList.add('show');}
      else if(t<38){text.classList.remove('show');}
      else{document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));const alice=document.getElementById('alice');if(alice)alice.classList.add('on');restartAliceAnimationDirectFinal();overlay.remove();return;}
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function restartAliceAnimationDirectFinal(){const section=document.getElementById('alice'),stage=document.querySelector('.aliceStage');if(!section||!stage)return;const old=stage.querySelector('.aliceArt'),light=stage.querySelector('.aliceLight');if(old){old.style.display='block';old.style.animation='none';void old.offsetWidth;old.style.animation='aliceReveal 5.2s ease-in-out both';}if(light){light.style.display='block';light.style.animation='none';void light.offsetWidth;light.style.animation='navyLight 5.2s ease-in-out both';}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();

// Arte correta da revelação da Alice: IMG-20260919-WA0107.jpg
(function(){
  const aliceUrl='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/restauracao-base-estavel/IMG-20260919-WA0107.jpg?v=20260925';
  function forceAliceImage(){
    const img=document.querySelector('#alice .aliceArt');
    if(!img)return;
    img.src=aliceUrl;
    img.alt='Alice';
    img.style.display='block';
  }
  function initAlice(){
    forceAliceImage();
    setTimeout(forceAliceImage,100);
    setTimeout(forceAliceImage,500);
    setTimeout(forceAliceImage,1500);
    const section=document.getElementById('alice');
    if(section)new MutationObserver(function(){if(section.classList.contains('on'))forceAliceImage();}).observe(section,{attributes:true,attributeFilter:['class']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAlice);else initAlice();
})();
