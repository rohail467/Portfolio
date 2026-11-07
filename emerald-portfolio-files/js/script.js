/* Professional Personal Portfolio — main script.
   Mobile menu, active-nav highlighting, scroll reveal, project detail toggles,
   dark-mode toggle (localStorage key: portfolio-theme), contact-form validation + mailto handoff. */
(function () {
  "use strict";
  var OWNER_EMAIL = "studentuni725@gmail.com";

  /* Dynamic year */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* Mobile menu */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* Active section highlighting */
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = ["home", "about", "skills", "projects", "education", "journey", "contact"];
  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === id);
    });
  }
  if ("IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) navObs.observe(el);
    });
  }
  setActive("home");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle — persisted in localStorage */
  var themeToggle = document.getElementById("themeToggle");
  function syncThemeToggle(){
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if(!themeToggle) return;
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  syncThemeToggle();
  if(themeToggle){
    themeToggle.addEventListener("click", function(){
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try{ localStorage.setItem("portfolio-theme", next); }catch(e){}
      syncThemeToggle();
    });
  }

  /* Elegant scroll-reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if(reduceMotion || !("IntersectionObserver" in window)){
    revealEls.forEach(function(el){ el.classList.add("revealed"); });
  } else {
    var revealObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add("revealed"); revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function(el){ revealObs.observe(el); });
    /* Safety: reveal anything still hidden after 3.5s (e.g. full-page capture) */
    setTimeout(function(){ revealEls.forEach(function(el){ el.classList.add("revealed"); }); }, 3500);
  }

  /* Project detail toggles */
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("data-toggle"));
      if (!panel) return;
      var open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Hide Details" : "View Project Details";
    });
  });

  /* Back to top */
  var toTop = document.getElementById("toTop");
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* Contact form: validate, then hand off to the visitor's email app via mailto.
     Success feedback is shown only after that handoff is triggered. */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setInvalid(fieldId, invalid) {
    document.getElementById(fieldId).classList.toggle("invalid", invalid);
    return !invalid;
  }
  function validate() {
    var name = document.getElementById("inputName").value.trim();
    var email = document.getElementById("inputEmail").value.trim();
    var subject = document.getElementById("inputSubject").value.trim();
    var message = document.getElementById("inputMessage").value.trim();
    var ok = true;
    ok = setInvalid("f-name", name.length < 2) && ok;
    ok = setInvalid("f-email", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) && ok;
    ok = setInvalid("f-subject", subject.length < 3) && ok;
    ok = setInvalid("f-message", message.length < 10) && ok;
    return ok ? { name: name, email: email, subject: subject, message: message } : null;
  }
  ["inputName", "inputEmail", "inputSubject", "inputMessage"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      this.closest(".field").classList.remove("invalid");
    });
  });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    status.className = "form-status";
    status.textContent = "";
    var data = validate();
    if (!data) {
      status.className = "form-status show-err";
      status.textContent = "Please fix the highlighted fields and try again.";
      var firstInvalid = form.querySelector(".field.invalid input, .field.invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    var body = "Name: " + data.name + "\nEmail: " + data.email + "\n\n" + data.message;
    var mailto = "mailto:" + OWNER_EMAIL +
      "?subject=" + encodeURIComponent(data.subject) +
      "&body=" + encodeURIComponent(body);
    window.location.href = mailto;
    status.className = "form-status show-ok";
    status.textContent = "Your email app should now open with your message addressed to " + OWNER_EMAIL + ". Press send there to deliver it. If nothing opened, email me directly at " + OWNER_EMAIL + ".";
  });
})();
