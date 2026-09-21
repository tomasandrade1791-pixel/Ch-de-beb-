// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

// Correção isolada da cartinha: não altera a arte da Alice nem a cartinha fechada.
document.addEventListener('DOMContentLoaded', function(){
  const open = document.getElementById('envOpen');
  const card = document.getElementById('envCard');
  const tap = document.getElementById('tapText');

  // Nova imagem da cartinha ABERTA.
  if (open) open.src = 'file_000000007f04820e9ff7fd2ea074c872.png';

  // Substitui somente o comportamento do clique para que, depois da
  // animação, a cartinha aberta desapareça e vá direto para as regras.
  // A cartinha fechada (#envClosed) não é modificada.
  if (card) {
    const cleanCard = card.cloneNode(true);
    card.replaceWith(cleanCard);

    let opened = false;
    cleanCard.addEventListener('click', function(){
      if (opened) return;
      opened = true;
      cleanCard.classList.add('opening');
      if (tap) tap.textContent = '';

      setTimeout(function(){
        document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('on'); });
        const rules = document.getElementById('rules');
        if (rules) rules.classList.add('on');
        window.scrollTo(0,0);
      }, 1500);
    });
  }
});