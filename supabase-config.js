// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

(function(){
  function fixAliceStage(){
    const stage=document.querySelector('.aliceStage');
    const old=document.querySelector('.aliceArt');
    if(!stage || stage.dataset.aliceFixed) return;
    stage.dataset.aliceFixed='1';
    if(old) old.style.display='none';
    const sub=stage.querySelector('.sub');
    if(sub) sub.style.display='none';
    const style=document.createElement('style');
    style.textContent=`
      .aliceLogo{position:relative;z-index:4;display:flex;align-items:flex-end;justify-content:center;color:#2f61b8;line-height:.8;white-space:nowrap;filter:drop-shadow(0 0 5px rgba(38,88,170,.38)) drop-shadow(0 0 18px rgba(8,36,74,.32));animation:aliceLogoReveal 5.2s ease-in-out both;user-select:none}
      .aliceLogo .aliceWord{font-family:"Brush Script MT","Segoe Script","Snell Roundhand","URW Chancery L",cursive;font-size:clamp(105px,18vw,210px);font-weight:500;letter-spacing:-.075em;transform:scaleX(.92)}
      .aliceLogo .aliceStar{font-family:Georgia,serif;font-size:clamp(70px,11vw,130px);line-height:.75;margin-left:-4px;margin-bottom:4px;transform:rotate(-8deg)}
      @keyframes aliceLogoReveal{0%{opacity:0;transform:scale(.82);filter:blur(8px)}60%{opacity:1;transform:scale(1);filter:blur(0)}}
    `;
    document.head.appendChild(style);
    const logo=document.createElement('div');
    logo.className='aliceLogo';
    logo.setAttribute('aria-label','Alice');
    logo.innerHTML='<span class="aliceWord">Alice</span><span class="aliceStar">★</span>';
    stage.appendChild(logo);
  }

  function restoreClosedEnvelope(){
    const card=document.getElementById('envCard');
    const closed=document.getElementById('envClosed');
    const open=document.getElementById('envOpen');
    const tap=document.getElementById('tapText');
    if(!card || !closed || !open || !tap) return;
    if(!card.dataset.realOpened){
      closed.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/IMG-20260919-WA0104.jpg?v=20260922';
      closed.alt='Cartinha fechada';
      closed.style.setProperty('display','block','important');
      closed.style.setProperty('opacity','1','important');
      closed.style.setProperty('visibility','visible','important');
      closed.style.setProperty('transform','none','important');
      closed.style.setProperty('z-index','2','important');
      open.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/file_000000000fbc820ebc60435059877b79.png?v=20260920';
      open.alt='';
      open.style.setProperty('display','block','important');
      open.style.setProperty('opacity','0','important');
      open.style.setProperty('visibility','hidden','important');
      open.style.setProperty('z-index','1','important');
      tap.textContent='TOQUE NA CARTINHA PARA ABRIR';
      tap.style.setProperty('display','block','important');
      tap.style.setProperty('opacity','1','important');
      tap.style.setProperty('visibility','visible','important');
      tap.style.setProperty('pointer-events','auto','important');
    }
  }

  function initEnvelopeAnimation(){
    const card=document.getElementById('envCard');
    const closed=document.getElementById('envClosed');
    const open=document.getElementById('envOpen');
    const tap=document.getElementById('tapText');
    if(!card || !closed || !open || !tap || card.dataset.openAnimationReady) return;
    card.dataset.openAnimationReady='1';
    const style=document.createElement('style');
    style.textContent=`
      #envCard.realOpening #envClosed{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;width:0!important;height:0!important}
      #envCard.realOpening #envOpen{display:block!important;visibility:visible!important;opacity:1!important;z-index:3!important;animation:envelopeOpenIn 1.55s cubic-bezier(.2,.75,.2,1) forwards!important}
      .envCard.realOpening + .tap{display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;height:0!important;margin:0!important;overflow:hidden!important}
      @keyframes envelopeOpenIn{
        0%{clip-path:inset(100% 0 0 0);opacity:0;transform:translateY(8%) scale(.92)}
        18%{clip-path:inset(82% 0 0 0);opacity:1;transform:translateY(6%) scale(.94)}
        45%{clip-path:inset(52% 0 0 0);transform:translateY(3%) scale(.97)}
        72%{clip-path:inset(24% 0 0 0);transform:translateY(.8%) scale(.99)}
        100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateY(0) scale(1)}
      }
    `;
    document.head.appendChild(style);
    card.addEventListener('click',function(e){
      if(card.dataset.realOpened) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      card.dataset.realOpened='1';

      // Remove fisicamente a cartinha fechada. Ela não fica por baixo da aberta.
      closed.remove();

      // Esconde completamente a frase.
      tap.style.setProperty('display','none','important');
      tap.style.setProperty('opacity','0','important');
      tap.style.setProperty('visibility','hidden','important');
      tap.style.setProperty('pointer-events','none','important');
      tap.textContent='';

      // A partir daqui existe somente a imagem da cartinha aberta.
      open.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/file_000000000fbc820ebc60435059877b79.png?v=20260923';
      open.alt='Cartinha aberta';
      open.style.setProperty('display','block','important');
      open.style.setProperty('visibility','visible','important');
      open.style.setProperty('opacity','1','important');
      open.style.setProperty('z-index','3','important');
      card.classList.add('realOpening');

      // Depois da animação, vai direto para as regras. A cartinha aberta não volta.
      setTimeout(function(){ if(typeof show==='function') show('rules'); },3200);
    },true);
  }

  function initRulesIntroSplit(){
    let tries=0;
    const timer=setInterval(function(){
      tries++;
      if(typeof window.renderRule!=='function' || !document.getElementById('rp')){if(tries>100)clearInterval(timer);return;}
      clearInterval(timer);
      const baseRenderRule=window.renderRule;
      const baseNext=window.next;
      const basePrev=window.prev;
      let intro=true;
      window.renderRule=function(){
        const rp=document.getElementById('rp'); if(!rp)return;
        if(intro){
          rp.innerHTML='<h1>Combinados para o<br>⭐ nosso dia ⭐</h1><p class="intro"><strong>Queridos amigos e familiares,</strong><br>Para que possamos aproveitar esse momento tão especial com tranquilidade, carinho e alegria, preparamos alguns pequenos combinados.<br><br>Agradecemos desde já a compreensão e o carinho de todos com nossa família e, principalmente, com a nossa pequena. 💙🍼</p><div class="nav"><button class="btn" disabled>‹ VOLTAR</button><span class="counter">INTRODUÇÃO</span><button class="btn" onclick="next()">COMEÇAR ›</button></div>';
        }else baseRenderRule();
      };
      window.next=function(){if(intro){intro=false;ri=0;window.renderRule();}else baseNext();};
      window.prev=function(){if(!intro&&ri===0){intro=true;window.renderRule();}else if(!intro)basePrev();};
      intro=true;ri=0;window.renderRule();
    },100);
  }

  function init(){
    fixAliceStage();
    restoreClosedEnvelope();
    initEnvelopeAnimation();
    initRulesIntroSplit();
    setTimeout(restoreClosedEnvelope,300);
    setTimeout(restoreClosedEnvelope,1000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
