(async function(){
  const posts = await window.BLOG.loadPosts();

  const map = L.map('map').setView([50.1, 12.5], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  function makeIcon(color){
    const svg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
        <path fill="${color}" d="M12 2c-3.86 0-7 3.14-7 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
      </svg>
    `);
    return L.icon({
      iconUrl: 'data:image/svg+xml,' + svg,
      iconSize: [28,28],
      iconAnchor: [14,28],
      popupAnchor: [0,-28]
    });
  }
  const blueIcon = makeIcon('#2f6fff');
  const redIcon = makeIcon('#e03131');

  const pinMeta = document.getElementById('pinMeta');
  const slider = document.getElementById('slider');
  const slideImg = document.getElementById('slideImg');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const readBtn = document.getElementById('readBtn');

  let imgs = [];
  let idx = 0;
  let current = null;

  function show(i){
    if(!imgs.length) return;
    idx = (i + imgs.length) % imgs.length;
    slideImg.src = imgs[idx];
  }

  function showCard(p){
    current = p;
    pinMeta.innerHTML = `
      <strong>titlu locație:</strong> ${window.BLOG.escapeHtml(p.locatie)}<br/>
      <strong>țară:</strong> ${window.BLOG.escapeHtml(p.tara)}<br/>
      <strong>data vizitei:</strong> ${window.BLOG.escapeHtml(window.BLOG.formatDate(p.dataVizitei))}<br/>
      <span class="timestamp">${window.BLOG.escapeHtml(p.titlu)}</span>
    `;

    imgs = p.imagini || [];
    if(imgs.length){
      slider.style.display = 'block';
      show(0);
    } else {
      slider.style.display = 'none';
    }

    readBtn.style.display = 'inline-block';
    readBtn.href = `postare.html?id=${encodeURIComponent(p.id)}`;
    readBtn.textContent = 'citește articolul';
  }

  prev.addEventListener('click', (e)=>{ e.preventDefault(); show(idx-1); });
  next.addEventListener('click', (e)=>{ e.preventDefault(); show(idx+1); });

  posts.forEach(p=>{
    if(!p.coords || p.coords.length !== 2) return;
    const icon = (p.status === 'vizitat') ? blueIcon : redIcon;
    const m = L.marker(p.coords, { icon }).addTo(map);
    m.on('click', ()=> showCard(p));
  });
})();
