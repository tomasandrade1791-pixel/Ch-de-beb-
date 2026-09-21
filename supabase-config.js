// Configuração opcional do Supabase.
// Nenhuma imagem da cartinha ou nenhuma animação é alterada aqui.
window.AliceDB = null;

// Remove somente o fundo preto da imagem da Alice em tempo de execução.
document.addEventListener('DOMContentLoaded', function(){
  const alice=document.querySelector('#alice .aliceArt');
  if(!alice) return;

  alice.crossOrigin='anonymous';
  alice.addEventListener('load', function(){
    const w=alice.naturalWidth, h=alice.naturalHeight;
    if(!w || !h) return;

    const canvas=document.createElement('canvas');
    canvas.width=w;
    canvas.height=h;
    const ctx=canvas.getContext('2d');
    if(!ctx) return;

    try{
      ctx.drawImage(alice,0,0,w,h);
      const data=ctx.getImageData(0,0,w,h);
      const p=data.data;

      for(let i=0;i<p.length;i+=4){
        const r=p[i], g=p[i+1], b=p[i+2];
        const m=Math.max(r,g,b);
        // Preto/quase-preto vira transparente; o azul da Alice permanece.
        p[i+3]=m<=10 ? 0 : Math.min(255,Math.round((m-10)*2.2));
      }

      ctx.putImageData(data,0,0);
      alice.src=canvas.toDataURL('image/png');
    }catch(e){
      // Se o navegador bloquear o canvas, mantém a imagem original.
      console.warn('Não foi possível remover o fundo da Alice:',e);
    }
  },{once:true});

  // Se a imagem já estiver em cache quando o listener for registrado.
  if(alice.complete) alice.dispatchEvent(new Event('load'));
});