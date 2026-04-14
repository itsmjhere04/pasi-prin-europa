(async function(){
  async function loadPosts(){
    const res = await fetch('data/posts.json');
    return await res.json();
  }
  function formatDate(iso){
    if(!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('ro-RO', { year:'numeric', month:'long', day:'2-digit' });
  }
  function escapeHtml(s){
    return String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  window.BLOG = { loadPosts, formatDate, escapeHtml };
})();
