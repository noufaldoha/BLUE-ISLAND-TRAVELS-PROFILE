// Blue Island Travels - script.js
(function () {
  "use strict";

  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  var links = menu ? menu.querySelectorAll("a") : [];

  // Mobile menu: open and close
  function setMenu(open) {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Close" : "Menu";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    links.forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // Highlight the menu link of the section being viewed
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        if (id === "vision") id = "about";
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
