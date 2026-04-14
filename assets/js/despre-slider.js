(function(){
  const root = document.getElementById('portraitSlider');
  if (!root) return;

  const slidesEl = root.querySelector('.slides');
  const imgs = Array.from(slidesEl.querySelectorAll('img'));
  if (imgs.length <= 1) return;

  let i = 0;
  imgs.forEach((img, idx) => { img.style.display = (idx === 0) ? 'block' : 'none'; });

  function show(next){
    imgs[i].style.display = 'none';
    i = (next + imgs.length) % imgs.length;
    imgs[i].style.display = 'block';
  }

  setInterval(() => show(i + 1), 3200);
})();
