(() => {
  "use strict";
  const games = document.querySelector("[data-games]"); if (!games) return;
  const sections = [...games.children].filter(e => e.tagName === "SECTION" && e.id), nav = document.createElement("nav");
  nav.className = "zg-topic-nav"; nav.setAttribute("aria-label", document.documentElement.lang.startsWith("zh") ? "物理工具" : "Physics tasks");
  const short = document.documentElement.lang.startsWith("zh") ? {"g-hl":"半衰期","g-tof":"TOF-ICR","g-pi":"PI-ICR","g-mr":"MR-TOF","g-rfq":"RFQ","g-quiz":"问答"} : { "g-hl": "Half-life", "g-tof": "TOF-ICR", "g-pi": "PI-ICR", "g-mr": "MR-TOF", "g-rfq": "RFQ", "g-quiz": "Quiz" };
  sections.forEach(section => { const link = document.createElement("a"); link.href = "#" + section.id; link.textContent = short[section.id] || section.querySelector("h2").textContent; nav.appendChild(link); });
  games.prepend(nav);
  const select = (id, scroll = false) => { if (!sections.some(s => s.id === id)) id = "g-tof"; sections.forEach(s => s.hidden = s.id !== id); [...nav.children].forEach(a => a.setAttribute("aria-current", a.hash === "#" + id ? "true" : "false")); const hunt = games.querySelector(".g-hunt"); if (hunt) hunt.hidden = id !== "g-tof"; if (scroll) document.getElementById(id).scrollIntoView({ block: "start" }); dispatchEvent(new Event("resize")); };
  nav.addEventListener("click", e => { const link = e.target.closest("a"); if (!link) return; e.preventDefault(); history.replaceState(null, "", link.hash); select(link.hash.slice(1)); });
  addEventListener("hashchange", () => select(location.hash.slice(1), true)); select(location.hash.slice(1));
})();
