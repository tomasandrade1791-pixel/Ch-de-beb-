// Cole aqui SOMENTE a URL do projeto e a chave pública (publishable/anon).
// Nunca coloque service_role ou qualquer chave secreta neste arquivo.
window.AliceDB = null;

// Mantém todas as animações no index.html e apenas corrige a transparência visual da imagem da Alice.
document.addEventListener('DOMContentLoaded', function(){
  const img=document.querySelector('#alice .aliceArt');
  if(!img) return;
  img.style.mixBlendMode='screen';
});