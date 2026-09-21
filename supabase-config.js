// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

// Corrige apenas as imagens usadas pelo convite. A animação continua sendo controlada pelo index.html.
document.addEventListener('DOMContentLoaded', function(){
  const base='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/';
  const alice=document.querySelector('#alice .aliceArt');
  const closed=document.getElementById('envClosed');
  const open=document.getElementById('envOpen');
  const reveal=document.querySelector('#paperReveal img');
  if(alice) alice.src=base+'IMG-20260919-WA0107.jpg?v=20260921';
  if(closed) closed.src=base+'IMG-20260919-WA0104.jpg?v=20260921';
  if(open) open.src=base+'file_000000007f04820e9ff7fd2ea074c872.png?v=20260921';
  if(reveal) reveal.src=base+'file_000000007f04820e9ff7fd2ea074c872.png?v=20260921';
});