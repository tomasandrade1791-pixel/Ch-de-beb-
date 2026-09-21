// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

// Não altera cartinha, animação ou regras. Apenas garante a imagem correta da Alice.
document.addEventListener('DOMContentLoaded', function(){
  const alice=document.querySelector('#alice .aliceArt');
  if(alice) alice.src='https://raw.githubusercontent.com/tomasandrade1791-pixel/Ch-de-beb-/main/IMG-20260919-WA0107.jpg?v=20260921';
});
