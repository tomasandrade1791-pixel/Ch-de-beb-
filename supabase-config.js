// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

(function(){
  function fixAliceStage(){
    const stage = document.querySelector('.aliceStage');
    const old = document.querySelector('.aliceArt');
    if(!stage || stage.dataset.aliceFixed) return;
    stage.dataset.aliceFixed = '1';
    if(old) old.style.display = 'none';
    const sub = stage.querySelector('.sub');
    if(sub) sub.style.display = 'none';

    const style = document.createElement('style');
    style.textContent = `
      .aliceLogo{position:relative;z-index:4;display:flex;align-items:flex-end;justify-content:center;gap:0;color:#2f61b8;line-height:.8;white-space:nowrap;filter:drop-shadow(0 0 5px rgba(38,88,170,.38)) drop-shadow(0 0 18px rgba(8,36,74,.32));animation:aliceLogoReveal 5.2s ease-in-out both;user-select:none}
      .aliceLogo .aliceWord{font-family:"Brush Script MT","Segoe Script","Snell Roundhand","URW Chancery L",cursive;font-size:clamp(105px,18vw,210px);font-weight:500;letter-spacing:-.075em;transform:scaleX(.92);transform-origin:right center}
      .aliceLogo .aliceStar{font-family:Georgia,serif;font-size:clamp(70px,11vw,130px);line-height:.75;margin-left:-4px;margin-bottom:4px;transform:rotate(-8deg)}
      @keyframes aliceLogoReveal{0%{opacity:0;transform:scale(.82);filter:blur(8px) drop-shadow(0 0 0 transparent)}28%{opacity:.18;transform:scale(.9)}60%{opacity:1;transform:scale(1);filter:blur(0) drop-shadow(0 0 7px rgba(38,88,170,.45)) drop-shadow(0 0 20px rgba(215,184,106,.3))}100%{opacity:1;transform:scale(1)}}
      @media(max-width:650px){.aliceLogo .aliceWord{font-size:clamp(92px,25vw,170px)}.aliceLogo .aliceStar{font-size:clamp(60px,14vw,100px);margin-left:-2px}}
    `;
    document.head.appendChild(style);

    const logo = document.createElement('div');
    logo.className = 'aliceLogo';
    logo.setAttribute('aria-label','Alice');
    logo.innerHTML = '<span class="aliceWord">Alice</span><span class="aliceStar">★</span>';
    stage.appendChild(logo);
  }

  function fixEnvelopeStage(){
    const url = 'https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/IMG-20260919-WA0104.jpg?v=20260920';
    const closed = document.getElementById('envClosed');
    const card = document.getElementById('envCard');
    if(closed){
      closed.src = url;
      closed.alt = 'Cartinha fechada';
      closed.style.display = 'block';
    }

    const tap = document.getElementById('tapText');
    if(tap){
      tap.textContent = 'TOQUE NA CARTINHA PARA ABRIR';
      if(card && card.dataset.realOpened){
        tap.style.display = 'none';
        tap.style.opacity = '0';
      }else{
        tap.style.display = 'block';
        tap.style.opacity = '1';
      }
    }

    const open = document.getElementById('envOpen');
    if(open){
      open.src = 'https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/file_000000000fbc820ebc60435059877b79.png?v=20260920';
      open.alt = 'Cartinha aberta';
      open.style.display = 'block';
    }
  }

  function initEnvelopeAnimation(){
    const card = document.getElementById('envCard');
    const closed = document.getElementById('envClosed');
    const open = document.getElementById('envOpen');
    const tap = document.getElementById('tapText');
    if(!card || !closed || !open || card.dataset.openAnimationReady) return;
    card.dataset.openAnimationReady='1';

    const style = document.createElement('style');
    style.textContent = `
      .envCard.realOpening{overflow:visible}
      .envCard.realOpening #envClosed{animation:envelopeClosedOut .72s cubic-bezier(.55,.05,.68,.19) forwards!important}
      .envCard.realOpening #envOpen{animation:envelopeOpenIn 1.45s cubic-bezier(.2,.75,.2,1) .08s forwards!important;clip-path:inset(100% 0 0 0);opacity:1!important;transform:translateY(7%) scale(.94)!important;filter:drop-shadow(0 0 0 rgba(215,184,106,0))!important}
      .envCard.realOpening + .tap{animation:tapOut .28s ease forwards}
      @keyframes envelopeClosedOut{0%{opacity:1;transform:scale(1) rotate(0)}45%{opacity:1;transform:scale(1.018) rotate(-.25deg)}100%{opacity:0;transform:scale(1.045) rotate(-.7deg)}}
      @keyframes envelopeOpenIn{0%{clip-path:inset(100% 0 0 0);opacity:1;transform:translateY(7%) scale(.94);filter:drop-shadow(0 0 0 rgba(215,184,106,0))}35%{clip-path:inset(62% 0 0 0);opacity:1;transform:translateY(3%) scale(.965)}68%{clip-path:inset(22% 0 0 0);opacity:1;transform:translateY(.5%) scale(.992);filter:drop-shadow(0 0 20px rgba(215,184,106,.18))}100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateY(0) scale(1);filter:drop-shadow(0 0 30px rgba(215,184,106,.35))}}
      @keyframes tapOut{to{opacity:0;visibility:hidden}}
    `;
    document.head.appendChild(style);

    // Captura o toque antes do listener antigo do index.html.
    // Depois da abertura, permanece somente a cartinha aberta e então vai direto para as regras.
    card.addEventListener('click',function(e){
      if(card.dataset.realOpened) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      card.dataset.realOpened='1';
      tap.style.pointerEvents='none';
      tap.style.display='none';
      tap.style.opacity='0';
      card.classList.add('realOpening');

      setTimeout(function(){
        if(typeof show==='function') show('rules');
      },3200);
    },true);
  }

  function initRulesIntroSplit(){
    let tries=0;
    const timer=setInterval(function(){
      tries++;
      if(typeof window.renderRule !== 'function' || !document.getElementById('rp')){
        if(tries>100) clearInterval(timer);
        return;
      }
      clearInterval(timer);

      const baseRenderRule=window.renderRule;
      const baseNext=window.next;
      const basePrev=window.prev;
      let intro=true;

      window.renderRule=function(){
        const rp=document.getElementById('rp');
        if(!rp) return;

        if(intro){
          rp.innerHTML='<h1>Combinados para o<br>⭐ nosso dia ⭐</h1>'+
            '<p class="intro"><strong>Queridos amigos e familiares,</strong><br>'+
            'Para que possamos aproveitar esse momento tão especial com tranquilidade, carinho e alegria, preparamos alguns pequenos combinados.<br><br>'+
            'Agradecemos desde já a compreensão e o carinho de todos com nossa família e, principalmente, com a nossa pequena. 💙🍼</p>'+
            '<div class="nav"><button class="btn" disabled>‹ VOLTAR</button><span class="counter">INTRODUÇÃO</span><button class="btn" onclick="next()">COMEÇAR ›</button></div>';
        }else{
          baseRenderRule();
        }
      };

      window.next=function(){
        if(intro){
          intro=false;
          ri=0;
          window.renderRule();
        }else{
          baseNext();
        }
      };

      window.prev=function(){
        if(!intro && ri===0){
          intro=true;
          window.renderRule();
        }else if(!intro){
          basePrev();
        }
      };

      intro=true;
      ri=0;
      window.renderRule();
    },100);
  }

  function init(){
    fixAliceStage();
    fixEnvelopeStage();
    initEnvelopeAnimation();
    initRulesIntroSplit();
    setTimeout(fixEnvelopeStage,500);
    setTimeout(fixEnvelopeStage,1500);
    setTimeout(initEnvelopeAnimation,50);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
