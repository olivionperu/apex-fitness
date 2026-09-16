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
