(async function(){
  const posts = await window.BLOG.loadPosts();
  posts.sort((a,b)=> new Date(b.dataPublicarii) - new Date(a.dataPublicarii));

  const reel = document.getElementById('reel');
  if (reel){
    reel.innerHTML = posts.slice(0,10).map(p => {
      const img = (p.imagini && p.imagini[0]) ? p.imagini[0] : 'images/pic01.jpg';
      return `
        <article>
          <a href="postare.html?id=${encodeURIComponent(p.id)}" class="image featured"><img src="${img}" alt="" /></a>
          <header><h3><a href="postare.html?id=${encodeURIComponent(p.id)}">${window.BLOG.escapeHtml(p.titlu)}</a></h3></header>
          <p>${window.BLOG.escapeHtml(p.tara)} · ${window.BLOG.escapeHtml(p.locatie)}</p>
        </article>
      `;
    }).join('');
  }

  const footerPosts = document.getElementById('footerPosts');
  if (footerPosts){
    footerPosts.innerHTML = posts.slice(0,5).map(p => `
      <li><a href="postare.html?id=${encodeURIComponent(p.id)}">${window.BLOG.escapeHtml(p.titlu)}</a></li>
    `).join('');
  }

  const footerPhotos = document.getElementById('footerPhotos');
  if (footerPhotos){
    const imgs = posts.flatMap(p => p.imagini || []).slice(0,6);
    footerPhotos.innerHTML = imgs.map(src => `
      <div class="col-4"><a href="#" class="image fit"><img src="${src}" alt="" /></a></div>
    `).join('');
  }
})();
