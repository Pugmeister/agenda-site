/* ============================================================
   Agenda — интерактив (vanilla JS, прогрессивное улучшение).
   Весь контент виден и без JS: здесь только анимации и мелочи.
   ============================================================ */
(function () {
  'use strict';
  var doc = document;
  var html = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- прелоадер (только страницы с .preloader) ---------- */
  var pre = doc.querySelector('.preloader');
  function pageReady() {
    var hero = doc.querySelector('.hero');
    if (hero) hero.classList.add('ready');
  }
  if (pre) {
    setTimeout(function () { pre.classList.add('hide'); pageReady(); }, 1350);
    setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 2300);
  } else {
    pageReady();
  }

  /* ---------- шапка: фон, скрытие при скролле вниз, прогресс-бар ---------- */
  var header = doc.querySelector('.header');
  var progress = doc.getElementById('progress');
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) {
      header.classList.toggle('scrolled', y > 30);
      var menuOpen = doc.body.classList.contains('no-scroll');
      header.classList.toggle('hidden', y > 600 && y > lastY && !menuOpen);
    }
    if (progress) {
      var h = html.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- бургер-меню ---------- */
  var burger = doc.getElementById('burger');
  var menu = doc.getElementById('mobile-menu');
  var mmClose = doc.getElementById('mm-close');
  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    doc.body.classList.toggle('no-scroll', open);
    if (open) {
      var links = menu.querySelectorAll('.mm-link');
      for (var i = 0; i < links.length; i++) links[i].style.transitionDelay = (120 + i * 70) + 'ms';
      if (mmClose) setTimeout(function () { mmClose.focus({ preventScroll: true }); }, 450);
    } else {
      var links2 = menu.querySelectorAll('.mm-link');
      for (var j = 0; j < links2.length; j++) links2[j].style.transitionDelay = '0ms';
    }
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    if (mmClose) mmClose.addEventListener('click', function () { setMenu(false); burger.focus({ preventScroll: true }); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); return; }
      if (!e.target.closest('button')) setMenu(false); /* тап мимо ссылок тоже закрывает */
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus({ preventScroll: true }); }
    });
    /* подсветка текущей страницы в меню */
    var here = location.pathname.replace(/index\.html$/, '');
    var mlinks = menu.querySelectorAll('.mm-link');
    for (var k = 0; k < mlinks.length; k++) {
      if (mlinks[k].getAttribute('href') === here || mlinks[k].pathname === here) mlinks[k].classList.add('mm-active');
    }
    /* если окно растянули до десктопа с открытым меню — закрыть */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ---------- scroll-reveal ---------- */
  var revealEls = [].slice.call(doc.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' });
    revealEls.forEach(function (el) {
      // сразу показать элементы, которые уже в зоне видимости при загрузке
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80 && rect.bottom > -40) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- счётчики ---------- */
  function fmt(n) { return n.toLocaleString('ru-RU'); }
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = fmt(target) + suffix; return; }
    var t0 = performance.now(), D = 1700;
    (function tick(t) {
      var p = Math.min(1, (t - t0) / D);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * e)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  var counters = [].slice.call(doc.querySelectorAll('[data-counter]'));
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- копирование номера ---------- */
  doc.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-copy]');
    if (!btn) return;
    var text = btn.getAttribute('data-copy');
    var done = function () {
      var old = btn.textContent;
      btn.textContent = 'Скопировано ✓';
      setTimeout(function () { btn.textContent = old; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else { done(); }
  });

  /* ---------- кастомный курсор (только мышь) ---------- */
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches && !reduce) {
    var dot = doc.querySelector('.cursor-dot');
    var ring = doc.querySelector('.cursor-ring');
    if (dot && ring) {
      html.classList.add('has-cursor');
      var x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, seen = false;
      window.addEventListener('mousemove', function (e) {
        x = e.clientX; y = e.clientY;
        if (!seen) { seen = true; dot.style.opacity = 1; ring.style.opacity = 1; }
      }, { passive: true });
      (function loop() {
        rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
        dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
        requestAnimationFrame(loop);
      })();
      doc.addEventListener('mouseover', function (e) {
        var t = e.target.closest && e.target.closest('a,button,.photo-card,.case-card,.case-mini,.av,.stat,.team-card,.service-card');
        html.classList.toggle('cursor-hover', !!t);
      }, { passive: true });
      html.addEventListener('mouseleave', function () {
        seen = false; dot.style.opacity = 0; ring.style.opacity = 0;
      });
    }
  }

  /* ---------- параллакс в hero ---------- */
  var hero = doc.querySelector('.hero');
  if (hero && window.matchMedia('(pointer:fine)').matches && !reduce) {
    var pxEls = [].slice.call(hero.querySelectorAll('[data-px]'));
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      var ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      pxEls.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-px')) || 0;
        el.style.transform = 'translate3d(' + (nx * d) + 'px,' + (ny * d) + 'px,0)';
      });
    });
  }

  /* ---------- параллакс живого фона при скролле ---------- */
  var bgfx = doc.querySelector('.bg-fx');
  if (bgfx && !reduce) {
    var plEls = [].slice.call(bgfx.querySelectorAll('.b1,.b2,.b3,.ring'));
    var plF = [0.06, -0.05, 0.08, 0.11];
    var plTick = false;
    var applyPl = function () {
      plTick = false;
      var y = window.scrollY || 0;
      for (var i = 0; i < plEls.length; i++) {
        plEls[i].style.transform = 'translateY(' + (y * plF[i]).toFixed(1) + 'px)';
      }
    };
    window.addEventListener('scroll', function () {
      if (!plTick) { plTick = true; window.requestAnimationFrame(applyPl); }
    }, { passive: true });
  }
})();
