(function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  var fill = preloader.querySelector('.preloader-bar-fill');
  var percentEl = preloader.querySelector('.preloader-percent');
  var content = preloader.querySelector('.preloader-content');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('is-loading');

  var progress = 0;
  var done = false;
  var startTime = Date.now();
  var minVisible = 900;

  function setProgress(p) {
    progress = p;
    if (fill) fill.style.width = p + '%';
    if (percentEl) percentEl.textContent = Math.round(p) + '%';
  }

  var tick = setInterval(function () {
    if (progress < 90) setProgress(progress + (90 - progress) * 0.08 + 0.4);
  }, 100);

  function onMouseMove(e) {
    var x = (e.clientX / window.innerWidth - 0.5) * 16;
    var y = (e.clientY / window.innerHeight - 0.5) * 16;
    content.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
  }
  var canHover = !reduceMotion && window.matchMedia('(hover: hover)').matches;
  if (content && canHover) document.addEventListener('mousemove', onMouseMove);

  function finish() {
    if (done) return;
    done = true;
    clearInterval(tick);
    document.removeEventListener('mousemove', onMouseMove);
    setProgress(100);
    var wait = Math.max(0, minVisible - (Date.now() - startTime));
    setTimeout(function () {
      preloader.classList.add('is-hidden');
      document.documentElement.classList.remove('is-loading');
      setTimeout(function () {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 700);
    }, wait + 200);
  }

  window.addEventListener('load', finish);
  setTimeout(finish, 4000);
})();

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var prevBtn = document.querySelector('.hero-arrow-prev');
  var nextBtn = document.querySelector('.hero-arrow-next');
  if (slides.length) {
    var current = 0;
    var slideTimer;

    var goToSlide = function (index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    };

    var startAutoplay = function () {
      clearInterval(slideTimer);
      slideTimer = setInterval(function () { goToSlide(current + 1); }, 10000);
    };

    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(current + 1); startAutoplay(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goToSlide(i); startAutoplay(); });
    });

    startAutoplay();
  }

  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var msg = 'Hola APEX, soy ' + name + '. ' + form.querySelector('#message').value.trim();
      window.open('https://wa.me/51999999999?text=' + encodeURIComponent(msg), '_blank');
    });
  }
});
