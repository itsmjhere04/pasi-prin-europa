(function(){
  const ids = ["regiune","tara","aventura","gastronomie","natura"];
  ids.forEach(id => {
    const sel = document.getElementById(id);
    if(!sel) return;

    function update(){
      const wrap = sel.closest("div");
      if(!wrap) return;
      if(sel.value && sel.selectedIndex !== 0){
        wrap.classList.add("has-value");
      } else {
        wrap.classList.remove("has-value");
      }
    }

    sel.addEventListener("change", update);
    update();
  });
})();