(async function(){
  const posts = await window.BLOG.loadPosts();

  const q = document.getElementById('q');
  const regiune = document.getElementById('regiune');
  const tara = document.getElementById('tara');
  const aventura = document.getElementById('aventura');
  const gastronomie = document.getElementById('gastronomie');
  const natura = document.getElementById('natura');
  const reset = document.getElementById('reset');
  const grid = document.getElementById('postsGrid');

  function uniq(arr){ return [...new Set(arr)]; }
  function norm(s){ return String(s ?? '').toLowerCase().trim(); }

  // populate countries
  const countries = uniq(posts.map(p => p.tara).filter(Boolean)).sort((a,b)=>a.localeCompare(b,'ro'));
  tara.innerHTML = '<option value="">Toate</option>' + countries.map(c=>`<option>${window.BLOG.escapeHtml(c)}</option>`).join('');

  function matches(p){
    const query = norm(q.value);
    const mQuery = !query || norm(p.titlu).includes(query) || norm(p.tara).includes(query);

    const r = norm(regiune.value);
    const mReg = !r || norm(p.regiune) === r;

    const t = norm(tara.value);
    const mTara = !t || norm(p.tara) === t;

    const a = norm(aventura.value);
    const mA = !a || (p.aventuri||[]).map(norm).includes(a);

    const g = norm(gastronomie.value);
    const mG = !g || (p.gastronomie||[]).map(norm).includes(g);

    const n = norm(natura.value);
    const mN = !n || (p.natura||[]).map(norm).includes(n);

    return mQuery && mReg && mTara && mA && mG && mN;
  }

  function card(p){
    const img = (p.imagini && p.imagini[0]) ? p.imagini[0] : 'images/pic01.jpg';
    const meta = `${window.BLOG.escapeHtml(p.regiune)} · ${window.BLOG.escapeHtml(p.tara)} · ${window.BLOG.escapeHtml(p.locatie)}`;
    const date = window.BLOG.formatDate(p.dataPublicarii);
    return `
      <article class="col-4 col-12-mobile special">
        <a href="postare.html?id=${encodeURIComponent(p.id)}" class="image featured"><img src="${img}" alt="" /></a>
        <header><h3><a href="postare.html?id=${encodeURIComponent(p.id)}">${window.BLOG.escapeHtml(p.titlu)}</a></h3></header>
        <p><span class="timestamp">${meta}</span><br/>Publicat: ${window.BLOG.escapeHtml(date)}</p>
        <p><a class="button" href="postare.html?id=${encodeURIComponent(p.id)}">Citește</a></p>
      </article>
    `;
  }

  function render(){
    const filtered = posts
      .slice()
      .sort((a,b)=> new Date(b.dataPublicarii) - new Date(a.dataPublicarii))
      .filter(matches);

    if (!filtered.length){
      grid.innerHTML = `<div class="col-12"><article class="special"><header><h3>Nimic găsit 🥲</h3></header><p>Schimbă filtrele sau caută altceva.</p></article></div>`;
      return;
    }
    grid.innerHTML = filtered.map(card).join('');
  }

  [q,regiune,tara,aventura,gastronomie,natura].forEach(el=>{
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  reset.addEventListener('click', (e)=>{
    e.preventDefault();
    q.value = '';
    regiune.value = '';
    tara.value = '';
    aventura.value = '';
    gastronomie.value = '';
    natura.value = '';
    render();
  });

  render();
})();
