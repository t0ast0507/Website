(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  root.classList.add("js");

  function show(el) {
    el.classList.add("is-visible");
  }

  function makeLoader() {
    var bar = document.createElement("div");
    bar.className = "load-bar";
    bar.setAttribute("aria-hidden", "true");
    var spin = document.createElement("div");
    spin.className = "load-spin";
    spin.setAttribute("aria-hidden", "true");
    document.body.prepend(spin);
    document.body.prepend(bar);
    return { bar: bar, spin: spin };
  }

  var loader = makeLoader();

  function startLoad() {
    loader.bar.classList.remove("is-running");
    void loader.bar.offsetWidth;
    loader.bar.classList.add("is-running");
    loader.spin.classList.add("is-on");
  }

  function endLoad() {
    loader.spin.classList.remove("is-on");
  }

  if (!reduce) {
    startLoad();
    window.addEventListener("load", function () {
      window.setTimeout(endLoad, 280);
    });
    if (document.readyState === "complete") {
      window.setTimeout(endLoad, 280);
    }
    document.querySelectorAll(".hero-enter").forEach(function (el) {
      window.setTimeout(function () {
        show(el);
      }, 600);
    });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox && lightbox.querySelector("img");
  var lightboxCap = lightbox && lightbox.querySelector(".lightbox-caption span");
  var lightboxClose = lightbox && lightbox.querySelector(".lightbox-close");

  function closeLightbox() {
    if (!lightbox) return;
    if (typeof lightbox.close === "function") lightbox.close();
    else lightbox.removeAttribute("open");
  }

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCap) lightboxCap.textContent = caption || "";
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
  }

  document.querySelectorAll(".gallery-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.add("is-hit");
      window.setTimeout(function () {
        btn.classList.remove("is-hit");
      }, 180);
      var img = btn.querySelector("img");
      if (!img) return;
      openLightbox(img.currentSrc || img.src, img.alt, btn.getAttribute("data-caption"));
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  if (reduce) {
    root.classList.add("reduce-motion");
    document.querySelectorAll(".reveal, .reveal-media, .hero-enter").forEach(show);
    return;
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === "_blank") return;
    var href = link.getAttribute("href");
    if (!href) return;
    if (
      href.charAt(0) === "#" ||
      href.indexOf("mailto:") === 0 ||
      href.indexOf("tel:") === 0 ||
      href.indexOf("http") === 0
    ) {
      return;
    }
    if (!/\.html($|#|\?)/.test(href) && href.indexOf("index.html") === -1) return;
    event.preventDefault();
    startLoad();
    window.setTimeout(function () {
      window.location.href = link.href;
    }, 140);
  });

  var layers = document.querySelectorAll("[data-parallax]");
  if (layers.length) {
    var ticking = false;
    function shift() {
      var y = window.scrollY || 0;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        el.style.transform = "translate3d(0," + y * speed + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(shift);
          ticking = true;
        }
      },
      { passive: true }
    );
    shift();
  }

  var items = document.querySelectorAll(".reveal, .reveal-media");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach(show);
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "80px 0px 80px 0px" }
  );

  items.forEach(function (el, i) {
    el.style.setProperty("--stagger", String(Math.min(i, 10)));
    io.observe(el);
  });

  window.setTimeout(function () {
    items.forEach(function (el) {
      if (el.classList.contains("is-visible")) return;
      var box = el.getBoundingClientRect();
      if (box.bottom < -40 || box.top > window.innerHeight + 40) return;
      show(el);
      io.unobserve(el);
    });
  }, 250);
})();
