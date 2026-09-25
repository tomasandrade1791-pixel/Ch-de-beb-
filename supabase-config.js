// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

(function(){
  function restartAliceAnimation(){
    const section = document.getElementById('alice');
    const stage = document.querySelector('.aliceStage');
    if(!section || !stage || !section.classList.contains('on')) return;
    const old = stage.querySelector('.aliceArt');
    const light = stage.querySelector('.aliceLight');
    const sub = stage.querySelector('.sub');
    const logo = stage.querySelector('.aliceLogo');
    if(logo) logo.remove();
    if(old){
      old.style.display = 'block';
      old.style.animation = 'none';
      void old.offsetWidth;
      old.style.animation = 'aliceReveal 5.2s ease-in-out both';
    }
    if(light){
      light.style.display = 'block';
      light.style.animation = 'none';
      void light.offsetWidth;
      light.style.animation = 'navyLight 5.2s ease-in-out both';
    }
    if(sub) sub.style.display = 'block';
  }

  function fixAliceStage(){
    const stage = document.querySelector('.aliceStage');
    if(!stage) return;
    const old = stage.querySelector('.aliceArt');
    const light = stage.querySelector('.aliceLight');
    const sub = stage.querySelector('.sub');
    if(old) old.style.display = 'block';
    if(light) light.style.display = 'block';
    if(sub) sub.style.display = 'block';
    const logo = stage.querySelector('.aliceLogo');
    if(logo) logo.remove();
  }

  function fixEnvelopeStage(){
    const url = 'https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/IMG-20260919-WA0104.jpg?v=20260920';
    const closed = document.getElementById('envClosed');
    if(closed){ closed.src=url; closed.alt='Cartinha fechada'; closed.style.display='block'; }
    const tap = document.getElementById('tapText');
    if(tap){ tap.textContent='TOQUE NA CARTINHA PARA ABRIR'; tap.style.display='block'; tap.style.opacity='1'; }
    const open = document.getElementById('envOpen');
    if(open){ open.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/file_000000007f04820e9ff7fd2ea074c872.png?v=20260921'; open.alt='Cartinha aberta'; open.style.display='block'; }
  }

  function initEnvelopeAnimation(){
    const card=document.getElementById('envCard'), closed=document.getElementById('envClosed'), open=document.getElementById('envOpen'), tap=document.getElementById('tapText');
    if(!card || !closed || !open || card.dataset.openAnimationReady) return;
    card.dataset.openAnimationReady='1';
    const style=document.createElement('style');
    style.textContent=`
      .envCard.realOpening{overflow:visible}
      .envCard.realOpening #envClosed{animation:envelopeClosedOut .72s cubic-bezier(.55,.05,.68,.19) forwards!important}
      .envCard.realOpening #envOpen{animation:envelopeOpenIn 1.15s cubic-bezier(.2,.75,.2,1) .08s forwards!important;clip-path:inset(100% 0 0 0);opacity:1!important;transform:translateY(7%) scale(.94)!important;filter:drop-shadow(0 0 0 rgba(215,184,106,0))!important}
      .envCard.realOpening + .tap{animation:tapOut .28s ease forwards}
      @keyframes envelopeClosedOut{0%{opacity:1;transform:scale(1) rotate(0)}55%{opacity:.95;transform:scale(1.025) rotate(-.4deg)}100%{opacity:0;transform:scale(1.055) rotate(-1deg)}}
      @keyframes envelopeOpenIn{0%{clip-path:inset(100% 0 0 0);opacity:1;transform:translateY(7%) scale(.94);filter:drop-shadow(0 0 0 rgba(215,184,106,0))}45%{clip-path:inset(35% 0 0 0);opacity:1;transform:translateY(1%) scale(.985);filter:drop-shadow(0 0 20px rgba(215,184,106,.18))}100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateY(0) scale(1);filter:drop-shadow(0 0 30px rgba(215,184,106,.35))}}
      @keyframes tapOut{to{opacity:0;visibility:hidden}}
    `;
    document.head.appendChild(style);
    card.addEventListener('click',function(e){
      if(card.dataset.realOpened) return;
      e.preventDefault(); e.stopImmediatePropagation(); card.dataset.realOpened='1'; tap.style.pointerEvents='none'; card.classList.add('realOpening');
      setTimeout(function(){if(typeof show==='function') show('paperReveal')},1450);
      setTimeout(function(){if(typeof show==='function') show('rules')},2950);
    },true);
  }

  function initRulesIntroSplit(){
    let tries=0;
    const timer=setInterval(function(){
      tries++;
      if(typeof window.renderRule !== 'function' || !document.getElementById('rp')){ if(tries>100) clearInterval(timer); return; }
      clearInterval(timer);
      const baseRenderRule=window.renderRule, baseNext=window.next, basePrev=window.prev;
      let intro=true;
      window.renderRule=function(){
        const rp=document.getElementById('rp'); if(!rp) return;
        if(intro){
          rp.innerHTML='<h1>Combinados para o<br>⭐ nosso dia ⭐</h1><p class="intro"><strong>Queridos amigos e familiares,</strong><br>Para que possamos aproveitar esse momento tão especial com tranquilidade, carinho e alegria, preparamos alguns pequenos combinados.<br><br>Agradecemos desde já a compreensão e o carinho de todos com nossa família e, principalmente, com a nossa pequena. 💙🍼</p><div class="nav"><button class="btn" disabled>‹ VOLTAR</button><span class="counter">INTRODUÇÃO</span><button class="btn" onclick="next()">COMEÇAR ›</button></div>';
        }else baseRenderRule();
      };
      window.next=function(){if(intro){intro=false;ri=0;window.renderRule();}else baseNext();};
      window.prev=function(){if(!intro&&ri===0){intro=true;window.renderRule();}else if(!intro)basePrev();};
      intro=true; ri=0; window.renderRule();
    },100);
  }

  // Nova abertura cinematográfica. A cena da Alice só começa depois das três frases.
  function initOpeningSequence(){
    if(window.__aliceOpeningReady) return;
    window.__aliceOpeningReady=true;
    const open=document.getElementById('open');
    const op=document.getElementById('op');
    const alice=document.getElementById('alice');
    if(!open || !op || !alice) return;

    const originalShow=window.show;
    let introActive=true;
    let timer=null;

    const style=document.createElement('style');
    style.textContent=`
      #open.cinematic{background:#000!important;color:#f4ead5!important}
      #open.cinematic .phrase{opacity:0;transition:opacity .65s ease;font-size:clamp(25px,6vw,48px);line-height:1.3;max-width:850px}
      #open.cinematic .phrase.visible{opacity:1}
      #open.cinematic .phrase.fade{opacity:0}
    `;
    document.head.appendChild(style);
    open.classList.add('cinematic');

    function hideAll(){document.querySelectorAll('.view').forEach(v=>v.classList.remove('on')); open.classList.add('on');}
    function black(){op.textContent='';op.classList.remove('visible');op.classList.add('fade');}
    function phrase(text){op.textContent=text;op.classList.remove('fade');requestAnimationFrame(()=>op.classList.add('visible'));}
    function wait(ms){return new Promise(r=>{timer=setTimeout(r,ms);});}

    window.show=function(id){
      if(introActive){
        if(id==='alice') return;
        return;
      }
      return originalShow.apply(this,arguments);
    };

    (async function(){
      hideAll();
      black();
      await wait(3000);

      phrase('Uma pequena história está prestes a começar...');
      await wait(3600);
      black();
      await wait(1000);

      phrase('Tem alguém muito especial esperando para conhecer vocês...');
      await wait(3600);
      black();
      await wait(1000);

      phrase('Agora fiquem com a surpresa...');
      await wait(2800);
      black();
      await wait(2200);

      introActive=false;
      originalShow('alice');
      setTimeout(restartAliceAnimation,50);
    })();
  }

  function init(){
    fixAliceStage(); fixEnvelopeStage(); initEnvelopeAnimation(); initRulesIntroSplit();
    const aliceSection=document.getElementById('alice');
    if(aliceSection){new MutationObserver(function(){restartAliceAnimation();}).observe(aliceSection,{attributes:true,attributeFilter:['class']});}
    setTimeout(fixEnvelopeStage,500); setTimeout(fixEnvelopeStage,1500); setTimeout(initEnvelopeAnimation,50); setTimeout(restartAliceAnimation,100); setTimeout(restartAliceAnimation,500);
    initOpeningSequence();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
