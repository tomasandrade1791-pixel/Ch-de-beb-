// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

// Este arquivo não altera as artes principais nem a animação.
// A cartinha fechada e a animação permanecem controladas pelo index.html.
document.addEventListener('DOMContentLoaded', function(){
  const open = document.getElementById('envOpen');

  // A cartinha aberta é EXATAMENTE a nova imagem enviada pelo usuário.
  if (open) open.src = 'file_000000007f04820e9ff7fd2ea074c872.png';
});