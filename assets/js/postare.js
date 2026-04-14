(async function(){
  const posts = await window.BLOG.loadPosts();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const p = posts.find(x => x.id === id) || posts[0];

  document.title = `${p.titlu} — Pași prin Europa`;

  const title = document.getElementById('postTitle');
  const meta = document.getElementById('postMeta');
  const featured = document.getElementById('postFeatured');
  const info = document.getElementById('postInfo');
  const text = document.getElementById('postText');
  const gallery = document.getElementById('postGallery');
  const tags = document.getElementById('postTags');

  title.textContent = p.titlu;
  meta.textContent = `${p.regiune} · ${p.tara} · ${p.locatie}`;

  const feat = (p.imagini && p.imagini[0]) ? p.imagini[0] : 'images/pic06.jpg';
  featured.src = feat;

  info.innerHTML = `
    <p>
      <strong>Data publicării:</strong> ${window.BLOG.escapeHtml(window.BLOG.formatDate(p.dataPublicarii))}<br/>
      <strong>Data vizitei:</strong> ${window.BLOG.escapeHtml(window.BLOG.formatDate(p.dataVizitei))}<br/>
      <strong>Data călătoriei:</strong> ${window.BLOG.escapeHtml(p.dataCalatoriei || '—')}<br/>
      <strong>Rating:</strong> ${p.rating && p.rating>0 ? window.BLOG.escapeHtml(p.rating.toFixed(1)) + ' / 5' : '—'}
    </p>
  `;

  text.innerHTML = (p.text || []).map(par => `<p>${window.BLOG.escapeHtml(par)}</p>`).join('');

  const imgs = p.imagini || [];
  gallery.innerHTML = imgs.slice(0,6).map(src => `
    <div class="col-4 col-12-mobile">
      <a href="#" class="image fit"><img src="${src}" alt="" /></a>
    </div>
  `).join('');

  const tagList = []
    .concat([p.regiune, p.tara])
    .concat(p.aventuri || [])
    .concat(p.gastronomie || [])
    .concat(p.natura || []);
  tags.innerHTML = tagList.map(t => `<span class="timestamp">${window.BLOG.escapeHtml(t)}</span>`).join(' · ');
})();
