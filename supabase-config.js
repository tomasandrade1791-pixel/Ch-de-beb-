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
      .aliceLogo{
        position:relative;
        z-index:4;
        display:flex;
        align-items:flex-end;
        justify-content:center;
        gap:0;
        color:#2f61b8;
        line-height:.8;
        white-space:nowrap;
        filter:drop-shadow(0 0 5px rgba(38,88,170,.38))
               drop-shadow(0 0 18px rgba(8,36,74,.32));
        animation:aliceLogoReveal 5.2s ease-in-out both;
        user-select:none;
      }
      .aliceLogo .aliceWord{
        font-family:"Brush Script MT","Segoe Script","Snell Roundhand","URW Chancery L",cursive;
        font-size:clamp(92px,16vw,190px);
        font-weight:500;
        letter-spacing:-.075em;
        transform:scaleX(.92);
        transform-origin:right center;
      }
      .aliceLogo .aliceStar{
        font-family:Georgia,serif;
        font-size:clamp(62px,10vw,120px);
        line-height:.75;
        margin-left:-4px;
        margin-bottom:4px;
        transform:rotate(-8deg);
      }
      @keyframes aliceLogoReveal{
        0%{opacity:0;transform:scale(.82);filter:blur(8px) drop-shadow(0 0 0 transparent)}
        28%{opacity:.18;transform:scale(.9)}
        60%{opacity:1;transform:scale(1);filter:blur(0) drop-shadow(0 0 7px rgba(38,88,170,.45)) drop-shadow(0 0 20px rgba(215,184,106,.3))}
        100%{opacity:1;transform:scale(1)}
      }
      @media(max-width:650px){
        .aliceLogo .aliceWord{font-size:clamp(78px,22vw,145px)}
        .aliceLogo .aliceStar{font-size:clamp(54px,13vw,92px);margin-left:-2px}
      }
    `;
    document.head.appendChild(style);

    const logo = document.createElement('div');
    logo.className = 'aliceLogo';
    logo.setAttribute('aria-label','Alice');
    logo.innerHTML = '<span class="aliceWord">Alice</span><span class="aliceStar">★</span>';
    stage.appendChild(logo);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',fixAliceStage);
  else fixAliceStage();
})();
