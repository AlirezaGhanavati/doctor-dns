(() => {
  const root = document.documentElement;
  const switcher = document.getElementById("langSwitch");
  const menu = document.getElementById("mainNav");
  const menuButton = document.getElementById("menuToggle");

  function setLanguage(language) {
    const lang = language === "en" ? "en" : "fa";
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
    document.querySelectorAll("[data-fa][data-en]").forEach((element) => {
      element.innerHTML = element.dataset[lang];
    });
    switcher.textContent = lang === "fa" ? "EN" : "FA";
    switcher.setAttribute("aria-label", lang === "fa" ? "Switch to English" : "تغییر زبان به فارسی");
    document.title = lang === "fa"
      ? "MrPing | مسیر هوشمند، اتصال بهتر"
      : "MrPing | Smarter routes, better connections";
    try { localStorage.setItem("mrping-language", lang); } catch (_) {}
  }

  switcher.addEventListener("click", () => {
    setLanguage(root.lang === "fa" ? "en" : "fa");
  });

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  let initialLanguage = "fa";
  try {
    const saved = localStorage.getItem("mrping-language");
    if (saved === "en" || saved === "fa") initialLanguage = saved;
  } catch (_) {}
  setLanguage(initialLanguage);
})();
