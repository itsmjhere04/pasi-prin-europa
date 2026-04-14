(async function(){
  const posts = await window.BLOG.loadPosts();
  posts.sort((a,b)=> new Date(b.dataPublicarii) - new Date(a.dataPublicarii));
  const latest = posts.slice(0,3);

  const el = document.getElementById('latestPosts');
  if (!el) return;

  const fmt = (iso)=> window.BLOG.formatDate(iso);
  const esc = (s)=> window.BLOG.escapeHtml(s);

  el.innerHTML = latest.map(p => {
    const img = (p.imagini && p.imagini[0]) ? p.imagini[0] : 'images/pic01.jpg';
    const meta = `${esc(p.locatie)}, ${esc(p.tara)} · ${esc(fmt(p.dataPublicarii))}`;
    return `
      <article class="col-4 col-12-mobile special">
        <a href="postare.html?id=${encodeURIComponent(p.id)}" class="image featured"><img src="${img}" alt="" /></a>
        <header>
          <h3><a href="postare.html?id=${encodeURIComponent(p.id)}">${esc(p.titlu)}</a></h3>
        </header>
        <p>${meta}</p>
        <footer>
          <a href="postare.html?id=${encodeURIComponent(p.id)}" class="button">Citește postarea</a>
        </footer>
      </article>
    `;
  }).join('');
})();
