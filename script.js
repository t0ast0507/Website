(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  root.classList.add("js");

  function show(el) {
    el.classList.add("is-visible");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
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
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  items.forEach(function (el, i) {
    el.style.setProperty("--stagger", String(Math.min(i, 10)));
    io.observe(el);
  });
})();
