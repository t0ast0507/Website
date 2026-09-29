(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");

  function show(el) {
    el.classList.add("is-visible");
  }

  if (reduce) {
    root.classList.add("reduce-motion");
    document.querySelectorAll(".reveal, .reveal-media, .hero-enter").forEach(show);
    return;
  }

  requestAnimationFrame(function () {
    document.body.classList.add("is-ready");
  });

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
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );

  items.forEach(function (el) {
    io.observe(el);
  });
})();
