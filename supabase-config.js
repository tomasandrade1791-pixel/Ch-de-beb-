/* Carrega a configuração que estava estável no backup 4.2 e aplica apenas a nova navegação dos Combinados. */
(function(){
  const BASE='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/backup-4.2/supabase-config.js?v=4.2';
  const s=document.createElement('script');
  s.src=BASE;
  s.onload=function(){
    function installRulesNavigation(){
      const rules=document.getElementById('rules');
      const rp=document.getElementById('rp');
      if(!rules||!rp||rules.dataset.nav42Installed)return;
      rules.dataset.nav42Installed='1';

      const css=document.createElement('style');
      css.textContent=`
        #rules .rulesNav42{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 12px;background:rgba(6,18,36,.97);box-shadow:0 -8px 24px rgba(0,0,0,.35)}
        #rules .rulesNav42 .btn{min-width:112px}
        #rules .rulesNav42 .counter{min-width:70px;text-align:center}
        #rules .rulesPaper> .nav{display:none!important}
        #rules .rulesPaper{padding-bottom:145px!important}
        @media(max-width:650px){#rules .rulesNav42{gap:7px;padding:9px 8px}#rules .rulesNav42 .btn{min-width:105px;padding:11px 14px;font-size:13px}#rules .rulesNav42 .counter{font-size:12px;min-width:58px}}
      `;
      document.head.appendChild(css);

      const nav=document.createElement('div');
      nav.className='rulesNav42';
      nav.innerHTML='<button id="rulesBack42" class="btn">‹ VOLTAR</button><span id="rulesCount42" class="counter">INTRO</span><button id="rulesNext42" class="btn">CONTINUAR ›</button>';
      rules.appendChild(nav);

      const back=document.getElementById('rulesBack42');
      const next=document.getElementById('rulesNext42');
      const count=document.getElementById('rulesCount42');
      let intro=true,step=0,baseNext=null,basePrev=null,baseRender=null;

      function findBaseFunctions(){
        if(!baseNext&&typeof window.next==='function')baseNext=window.next;
        if(!basePrev&&typeof window.prev==='function')basePrev=window.prev;
        if(!baseRender&&typeof window.renderRule==='function')baseRender=window.renderRule;
      }
      function refresh(){
        findBaseFunctions();
        back.disabled=intro;
        count.textContent=intro?'INTRO':String(step+1).padStart(2,'0')+' / 07';
        next.textContent=(!intro&&step>=6)?'VER O CONVITE 💌':'CONTINUAR ›';
      }
      function scrollTop(){window.scrollTo(0,0);const p=rules.querySelector('.rulesPaper');if(p)p.scrollTop=0;}

      back.addEventListener('click',function(){
        findBaseFunctions();
        if(intro)return;
        if(step>0){step--;if(basePrev)basePrev();else if(baseRender)baseRender();}
        else{intro=true;if(basePrev)basePrev();}
        refresh();scrollTop();
      });

      next.addEventListener('click',function(){
        findBaseFunctions();
        if(intro){intro=false;step=0;if(baseNext)baseNext();else if(baseRender)baseRender();refresh();scrollTop();return;}
        if(step<6){step++;if(baseNext)baseNext();else if(baseRender)baseRender();refresh();scrollTop();return;}
        if(typeof window.show==='function')window.show('letter');
      });

      const observer=new MutationObserver(function(){
        if(rules.classList.contains('on')){findBaseFunctions();refresh();}
      });
      observer.observe(rules,{attributes:true,attributeFilter:['class']});
      setTimeout(function(){findBaseFunctions();refresh();},250);
      setTimeout(function(){findBaseFunctions();refresh();},900);
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installRulesNavigation,{once:true});else installRulesNavigation();
  };
  s.onerror=function(){console.error('Não foi possível carregar a base estável 4.2.');};
  document.head.appendChild(s);
})();