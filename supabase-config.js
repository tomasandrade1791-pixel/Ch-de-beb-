// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

// Correções de arquivos sem alterar as artes ou a animação da Alice.
document.addEventListener('DOMContentLoaded', function(){
  const alice = document.querySelector('#alice .aliceArt');
  const closed = document.getElementById('envClosed');
  const open = document.getElementById('envOpen');
  const card = document.getElementById('envCard');
  const tap = document.getElementById('tapText');

  // Arquivos que realmente existem no repositório.
  if (alice) alice.src = 'IMG-20260919-WA0107.jpg';
  if (closed) closed.src = 'IMG-20260919-WA0104.jpg';
  if (open) open.src = 'file_000000007f04820e9ff7fd2ea074c872.png';

  // Mantém a animação da cartinha, mas depois da abertura vai direto
  // para as regras. Não passa pela tela da cartinha fechada novamente.
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
        const rules = document.getElementById('rules');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('on'));
        if (rules) rules.classList.add('on');
        window.scrollTo(0,0);
      }, 1500);
    });
  }
});