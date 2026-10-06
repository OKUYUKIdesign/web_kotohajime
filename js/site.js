/* 日本語を文節の区切りで改行する（BudouX） */
(function () {
  if (!window.budouxJa) return;
  var targets = document.querySelectorAll('main p, main h1, main h2, main h3, main li, main dd, main figcaption, .cc-title, .toc-title, .pg-t');
  Array.prototype.forEach.call(targets, function (el) {
    if (el.closest('svg, .bn')) return;
    if (el.querySelector('p, li, h1, h2, h3, div, b + span')) return;
    try { window.budouxJa.applyToElement(el); } catch (e) {}
  });
})();

/* ページを開いたら一番上から表示する（埋め込み表示でも） */
(function () {
  if (location.hash) return;
  window.scrollTo(0, 0);
  try { document.documentElement.scrollIntoView({ block: 'start' }); } catch (e) {}
})();

/* 目次：狭い画面ではたたむ */
(function () {
  var toc = document.querySelector('.toc');
  if (!toc) return;
  var narrow = window.matchMedia('(max-width: 960px)');
  if (narrow.matches) toc.open = false;
  if (narrow.addEventListener) {
    narrow.addEventListener('change', function () { if (!narrow.matches) toc.open = true; });
  }
  /* 広い画面では、いつも開いたままにする */
  toc.querySelector('summary').addEventListener('click', function (e) { if (!narrow.matches) e.preventDefault(); });
  /* 目次から移動したら、たたむ */
  toc.addEventListener('click', function (e) {
    if (narrow.matches && e.target.closest('.toc-parts a')) toc.open = false;
  });
})();
