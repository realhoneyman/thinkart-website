document.addEventListener('DOMContentLoaded', function () {
  try {
    // mobile nav toggle
    var burger = document.getElementById('burgerBtn');
    var navList = document.getElementById('navList');
    if (burger && navList) {
      burger.addEventListener('click', function () { navList.classList.toggle('open'); });
      navList.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { navList.classList.remove('open'); });
      });
    }

    // gallery filter (only present on gallery page)
    var filterBtns = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery-item');
    if (filterBtns.length && items.length) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var f = btn.dataset.filter;
          items.forEach(function (item) {
            item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
          });
        });
      });
    }

    // Optional fade-in-on-scroll: everything is visible by default (see
    // style.css). Only elements currently BELOW the fold get pre-hidden
    // and then revealed as the user scrolls to them - content is never
    // hidden waiting on JS that might not run.
    if ('IntersectionObserver' in window) {
      var revealEls = document.querySelectorAll('.reveal');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.remove('pre-hide');
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });

      revealEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var belowFold = rect.top > window.innerHeight;
        if (belowFold) {
          el.classList.add('pre-hide');
          io.observe(el);
        }
      });
    }
    // Lightbox for gallery images
    var galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
      var overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
      document.body.appendChild(overlay);

      var lbImg = overlay.querySelector('img');
      var lbClose = overlay.querySelector('.lightbox-close');

      galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
          var src = item.querySelector('img').src;
          var alt = item.querySelector('img').alt;
          lbImg.src = src;
          lbImg.alt = alt;
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      lbClose.addEventListener('click', closeLightbox);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
      });
    }

  } catch (err) {
    // never let an error hide content
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.remove('pre-hide');
      el.classList.add('visible');
    });
    console.error(err);
  }
});
