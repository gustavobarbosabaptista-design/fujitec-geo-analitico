import { homeRoute, slides, trailDefinitions } from "./content.mjs";
import {
  adjacentRoute,
  createRouteController,
  hashForRoute,
  keyboardIntent,
  normalizeHash,
  routeFromHash,
  scrollableAncestor,
  shouldYieldToScroll,
  themeHref,
  trailPosition
} from "./navigation.mjs";

const THEME_FILES = Object.freeze({
  light: "fujitec-apresentacao-geo-analitico.html",
  dark: "fujitec-apresentacao-geo-analitico-dark.html"
});

const esc = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[character]));

const arrowIcon = (direction = "right") => `<svg viewBox="0 0 32 16" aria-hidden="true" focusable="false" class="icon icon--arrow icon--${direction}"><path d="M1 8h28M22 1l7 7-7 7"/></svg>`;

const routeLink = ({ href, title, detail, label = "Explorar" }) => `<a class="route-action" href="#${esc(href)}" data-route-link="${esc(href)}"><span>${esc(label)}</span>${arrowIcon()}<span class="sr-only">${esc(title)} — ${esc(detail)}</span></a>`;

const mediaImage = (slide, className = "visual-image") => `<img class="${className}" src="${esc(slide.media)}" alt="${esc(slide.alt)}" loading="eager">`;

function renderNexoOverview(slide) {
  const map = slide.video
    ? `<video class="visual-image" muted loop playsinline preload="metadata" poster="${esc(slide.media)}" aria-label="${esc(slide.alt)}"><source src="${esc(slide.video)}" type="video/mp4"></video>`
    : mediaImage(slide);
  return `<div class="overview-visual">
    <figure class="overview-visual__map">${map}<span class="map-scan" aria-hidden="true"></span></figure>
    <div class="resource-grid">${slide.resources.map(([name, text]) => {
      const development = text === "Em Desenvolvimento";
      return `<article class="resource-item${development ? " resource-item--development" : ""}"><h3>${esc(name)}</h3>${development ? `<strong>${esc(text)}</strong>` : `<p>${esc(text)}</p>`}</article>`;
    }).join("")}</div>
  </div>`;
}

function renderVideoPair(slide) {
  return `<div class="video-pair">${slide.videos.map((video) => `<figure class="video-panel">
    <video muted loop playsinline preload="metadata" aria-label="Demonstração de Video Analytics: ${esc(video.label)}">
      <source src="${esc(video.file)}" type="video/mp4">
    </video>
    <figcaption><strong>${esc(video.label)}</strong><span>${esc(video.caption)}</span></figcaption>
  </figure>`).join("")}</div>`;
}

function renderZoneMap(slide) {
  const map = slide.video
    ? `<video muted loop playsinline preload="metadata" poster="${esc(slide.media)}" aria-label="${esc(slide.alt)}"><source src="${esc(slide.video)}" type="video/mp4"></video>`
    : mediaImage(slide);
  return `<figure class="zone-map">
    ${map}
    <div class="zone-map__routes" aria-hidden="true"><span></span><span></span><span></span></div>
    <figcaption>${slide.points.map((point, index) => `<span style="--zone-index:${index}">${esc(point)}</span>`).join("")}</figcaption>
  </figure>`;
}

function renderPeopleMap(slide) {
  return `<div class="people-map">
    <figure>${mediaImage(slide)}<span class="location-pulse location-pulse--one" aria-hidden="true"></span><span class="location-pulse location-pulse--two" aria-hidden="true"></span></figure>
    <div class="people-map__list">${slide.points.map(([title, text]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}</div>
  </div>`;
}

function renderDualMap(slide) {
  return `<div class="dual-map">${slide.media.map((item) => `<figure><img src="${esc(item.file)}" alt="${esc(item.alt)}"><figcaption><strong>${esc(item.label)}</strong><span>${esc(item.caption)}</span></figcaption></figure>`).join("")}</div>`;
}

function renderBadgeSystem(slide) {
  return `<div class="badge-system">
    <figure class="badge-system__map">${mediaImage(slide)}</figure>
    <div class="badge-system__device" role="img" aria-label="Crachá conectado ao mapa operacional">
      <span class="badge-signal badge-signal--one" aria-hidden="true"></span>
      <span class="badge-signal badge-signal--two" aria-hidden="true"></span>
      <div class="badge-card"><img src="assets/fujitec-global/brand/fujitec-logo.png" alt=""><span>Identidade conectada</span><i aria-hidden="true"></i></div>
    </div>
    <div class="badge-system__points">${slide.points.map(([title, text]) => {
      const development = text === "Em Desenvolvimento";
      return `<article${development ? ' class="resource-item--development"' : ""}><h3>${esc(title)}</h3>${development ? `<strong>${esc(text)}</strong>` : `<p>${esc(text)}</p>`}</article>`;
    }).join("")}</div>
  </div>`;
}

function renderCorrelation(slide) {
  const report = slide.report;
  return `<div class="correlation" role="group" aria-label="Correlação operacional e saída do NEXO">
    <div class="correlation__flow" role="img" aria-label="Fluxo que correlaciona evento, zona, pessoa e resposta">
    <div class="correlation__line" aria-hidden="true"></div>
    ${slide.chain.map(([title, text], index) => `<article style="--chain-index:${index}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
    </div>
    ${report ? `<aside class="correlation__report" data-report aria-labelledby="${esc(slide.id)}-report-title">
      <a class="correlation__report-preview" href="${esc(report.file)}" target="_blank" rel="noopener" aria-label="Abrir relatório de análise de vídeo em PDF">
        <img src="${esc(report.media)}" alt="${esc(report.alt)}" width="510" height="720">
      </a>
      <div class="correlation__report-copy">
        <span>Saída do NEXO</span>
        <h3 id="${esc(slide.id)}-report-title">${esc(report.title)}</h3>
        <p>${esc(report.detail)}</p>
      </div>
      <a class="correlation__report-link" href="${esc(report.file)}" target="_blank" rel="noopener">Abrir PDF ${arrowIcon()}</a>
    </aside>` : ""}
  </div>`;
}

const visualRenderer = Object.freeze({
  "nexo-overview": renderNexoOverview,
  "video-pair": renderVideoPair,
  "zone-map": renderZoneMap,
  "people-map": renderPeopleMap,
  "dual-map": renderDualMap,
  "badge-system": renderBadgeSystem,
  correlation: renderCorrelation
});

const renderCoverTitle = (slide) => {
  const { title, emphasis } = slide;
  const start = emphasis ? title.indexOf(emphasis) : -1;
  if (start < 0) return esc(title);
  return `${esc(title.slice(0, start))}<em>${esc(emphasis)}</em>${esc(title.slice(start + emphasis.length))}`;
};

function renderCoverSlide(slide) {
  return `<section id="${esc(slide.id)}" class="screen slide slide--cover" data-screen="${esc(slide.id)}" data-trail="${esc(slide.trail)}" data-position="1" aria-labelledby="${esc(slide.id)}-title" aria-hidden="true" inert>
    <div class="slide__inner" data-scrollable>
      <div class="slide__copy slide__copy--cover">
        <span class="cover-kicker">${esc(slide.kicker)}</span>
        <h2 id="${esc(slide.id)}-title">${renderCoverTitle(slide)}</h2>
        <p>${esc(slide.lead)}</p>
        <span class="cover-signature">${esc(slide.signature)}</span>
      </div>
    </div>
  </section>`;
}

function renderSlide(slide) {
  if (slide.visual === "cover") return renderCoverSlide(slide);
  const renderVisual = visualRenderer[slide.visual];
  const trail = trailDefinitions[slide.trail];
  const position = trail.slides.findIndex((item) => item.id === slide.id) + 1;
  return `<section id="${esc(slide.id)}" class="screen slide slide--${esc(slide.visual)}" data-screen="${esc(slide.id)}" data-trail="${esc(slide.trail)}" data-position="${position}" aria-labelledby="${esc(slide.id)}-title" aria-hidden="true" inert>
    <div class="slide__inner" data-scrollable>
      <div class="slide__copy">
        <h2 id="${esc(slide.id)}-title">${esc(slide.title)}</h2>
        <p>${esc(slide.lead)}</p>
        ${slide.close ? routeLink({ href: homeRoute, title: slide.close, detail: "Início da apresentação", label: slide.close }) : ""}
      </div>
      <div class="slide__visual">${renderVisual ? renderVisual(slide) : ""}</div>
    </div>
  </section>`;
}

export function renderPresentation() {
  return slides.map(renderSlide).join("");
}

const setActive = (node, active) => {
  node.setAttribute("aria-hidden", String(!active));
  node.toggleAttribute("inert", !active);
  if (active) node.dataset.active = "true";
  else delete node.dataset.active;
};

const setHash = (windowRef, route, replace = false) => {
  const hash = hashForRoute(route);
  if (windowRef.location.hash === hash) return;
  windowRef.history[replace ? "replaceState" : "pushState"](null, "", hash);
};

function createMotion({ root, reducedMotion, gsapRef = globalThis.gsap } = {}) {
  let timeline = null;
  const animate = (screen) => {
    timeline?.kill?.();
    if (reducedMotion || !gsapRef?.timeline || !screen) return Promise.resolve();
    const copy = [...screen.querySelectorAll(":scope .slide__copy > *")];
    const visual = screen.querySelector(":scope .slide__visual");
    return new Promise((resolve) => {
      timeline = gsapRef.timeline({ onComplete: () => { timeline = null; resolve(); } });
      timeline.fromTo(copy, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58, stagger: 0.055, ease: "expo.out" }, 0);
      if (visual) timeline.fromTo(visual, { clipPath: "inset(0 7% 0 0)", opacity: 0.72 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.78, ease: "expo.out" }, 0.06);
    });
  };
  return { animate, destroy: () => { timeline?.kill?.(); timeline = null; } };
}

export function mountPresentation(root, {
  windowRef = root?.ownerDocument?.defaultView ?? globalThis.window,
  documentRef = root?.ownerDocument ?? globalThis.document
} = {}) {
  if (!root?.querySelector) throw new TypeError("A apresentação requer um elemento raiz.");
  const track = root.querySelector("[data-track]");
  if (!track) throw new Error("Shell da apresentação Fujitec incompleto.");
  track.innerHTML = renderPresentation();

  const screens = [...track.querySelectorAll("[data-screen]")];
  const screenMap = new Map(screens.map((screen) => [screen.dataset.screen, screen]));
  const previousButton = root.querySelector("[data-prev]");
  const nextButton = root.querySelector("[data-next]");
  const counter = root.querySelector("[data-counter]");
  const trailLabel = root.querySelector("[data-trail-label]");
  const progress = root.querySelector("[data-progress]");
  const footer = root.querySelector("[data-footer]");
  const live = root.querySelector("[data-live-region]");
  const themeLink = root.querySelector("[data-theme-link]");
  const menuToggle = root.querySelector("[data-menu-toggle]");
  const menu = root.querySelector("[data-menu]");
  const reducedMotion = Boolean(windowRef.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
  const motion = createMotion({ root, reducedMotion, gsapRef: windowRef.gsap ?? globalThis.gsap });
  let disposed = false;
  let wheelDelta = 0;
  let wheelReset = null;
  let pointerStart = null;

  const updateThemeLink = (route) => {
    if (!themeLink) return;
    const otherFile = root.dataset.theme === "dark" ? THEME_FILES.light : THEME_FILES.dark;
    themeLink.href = themeHref(otherFile, `#${route}`);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menu || !menuToggle) return;
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    menu.toggleAttribute("inert", true);
    menuToggle.setAttribute("aria-expanded", "false");
    root.dataset.menuOpen = "false";
    if (restoreFocus) menuToggle.focus();
  };

  const openMenu = () => {
    if (!menu || !menuToggle) return;
    menu.hidden = false;
    menu.removeAttribute("aria-hidden");
    menu.removeAttribute("inert");
    menuToggle.setAttribute("aria-expanded", "true");
    root.dataset.menuOpen = "true";
    menu.querySelector("a")?.focus();
  };

  const syncMedia = (activeScreen) => {
    screens.forEach((screen) => screen.querySelectorAll("video").forEach((video) => video.pause()));
    if (reducedMotion || documentRef.hidden) return;
    activeScreen?.querySelectorAll("video").forEach((video) => video.play().catch(() => {}));
  };

  const updateNavigation = (route) => {
    const position = trailPosition(route);
    if (!position) return;
    footer?.removeAttribute("hidden");
    root.dataset.activeTrail = position.trail.id;
    const { index, total, trail } = position;
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    if (trailLabel) trailLabel.textContent = trail.label;
    if (progress) {
      progress.style.setProperty("--progress", String((index + 1) / total));
      progress.setAttribute("aria-valuenow", String(index + 1));
      progress.setAttribute("aria-valuemax", String(total));
      progress.setAttribute("aria-valuetext", `Tela ${index + 1} de ${total} na trilha ${trail.label}`);
    }
    if (previousButton) previousButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === total - 1;
    updateThemeLink(route);
  };

  const activateRoute = async ({ route, previous, source }) => {
    if (disposed) return;
    const active = screenMap.get(route) ?? screenMap.get(homeRoute);
    screens.forEach((screen) => setActive(screen, screen === active));
    root.dataset.route = route;
    updateNavigation(route);
    syncMedia(active);
    closeMenu();
    if (!["initial", "hash", "popstate"].includes(source)) setHash(windowRef, route, false);
    if (live && source !== "initial") {
      const position = trailPosition(route);
      live.textContent = `${position.trail.label}, tela ${position.index + 1} de ${position.total}`;
    }
    await motion.animate(active);
    controller.unlock();
    root.dataset.busy = "false";
    root.removeAttribute("aria-busy");
  };

  const initial = routeFromHash(windowRef.location.hash);
  const controller = createRouteController({
    initialRoute: initial,
    lockMs: reducedMotion ? 0 : 660,
    onChange: (change) => {
      root.dataset.busy = "true";
      root.setAttribute("aria-busy", "true");
      activateRoute(change);
    }
  });

  const goTo = (route, source = "api", force = false) => controller.goTo(normalizeHash(route), source, { force });

  const onRouteClick = (event) => {
    const link = event.target.closest?.("[data-route-link]");
    if (!link || !root.contains(link)) return;
    event.preventDefault();
    goTo(link.dataset.routeLink, "link", true);
  };

  const onPrevious = () => goTo(adjacentRoute(controller.getRoute(), -1), "button");
  const onNext = () => goTo(adjacentRoute(controller.getRoute(), 1), "button");

  const onKeydown = (event) => {
    if (event.defaultPrevented || event.target.closest?.('[role="tablist"]')) return;
    if (root.dataset.menuOpen === "true" && event.key === "Escape") {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }
    const intent = keyboardIntent(event.key);
    if (!intent) return;
    event.preventDefault();
    if (intent === "next") controller.next("keyboard");
    if (intent === "previous") controller.previous("keyboard");
    if (intent === "home") controller.home("keyboard");
    if (intent === "last") controller.last("keyboard");
  };

  const onWheel = (event) => {
    if (root.dataset.menuOpen === "true") return;
    const scrollable = scrollableAncestor(event.target, root);
    if (shouldYieldToScroll(scrollable, event.deltaY)) return;
    event.preventDefault();
    wheelDelta += Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(wheelDelta) < 52) return;
    const direction = wheelDelta > 0 ? 1 : -1;
    wheelDelta = 0;
    if (direction > 0) controller.next("wheel");
    else controller.previous("wheel");
    if (wheelReset !== null) windowRef.clearTimeout(wheelReset);
    wheelReset = windowRef.setTimeout(() => { wheelDelta = 0; wheelReset = null; }, 140);
  };

  const onPointerDown = (event) => {
    if (event.pointerType && event.pointerType !== "touch") return;
    pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = (event) => {
    if (!pointerStart || (event.pointerId !== undefined && event.pointerId !== pointerStart.id)) return;
    const start = pointerStart;
    pointerStart = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 54 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) controller.next("swipe");
    else controller.previous("swipe");
  };

  const onLocationChange = () => {
    const route = routeFromHash(windowRef.location.hash);
    if (route !== controller.getRoute()) goTo(route, "popstate", true);
  };

  const onVisibilityChange = () => syncMedia(screenMap.get(controller.getRoute()));
  const onMenuToggle = () => root.dataset.menuOpen === "true" ? closeMenu({ restoreFocus: true }) : openMenu();

  root.addEventListener("click", onRouteClick);
  root.addEventListener("wheel", onWheel, { passive: false });
  root.addEventListener("pointerdown", onPointerDown, { passive: true });
  root.addEventListener("pointerup", onPointerUp, { passive: true });
  documentRef.addEventListener("keydown", onKeydown);
  documentRef.addEventListener("visibilitychange", onVisibilityChange);
  windowRef.addEventListener("popstate", onLocationChange);
  windowRef.addEventListener("hashchange", onLocationChange);
  previousButton?.addEventListener("click", onPrevious);
  nextButton?.addEventListener("click", onNext);
  menuToggle?.addEventListener("click", onMenuToggle);

  closeMenu();
  screens.forEach((screen) => setActive(screen, screen.dataset.screen === initial));
  root.dataset.ready = "true";
  root.dataset.route = initial;
  root.dataset.motion = reducedMotion ? "reduced" : (windowRef.gsap ? "gsap" : "native");
  root.dataset.screenCount = String(screens.length);
  updateNavigation(initial);
  syncMedia(screenMap.get(initial));
  if (windowRef.location.hash !== hashForRoute(initial)) setHash(windowRef, initial, true);
  motion.animate(screenMap.get(initial));

  const api = {
    getRoute: () => controller.getRoute(),
    goTo: (route) => goTo(route, "api", true),
    next: () => controller.next("api"),
    previous: () => controller.previous("api"),
    reducedMotion,
    screenCount: screens.length
  };
  windowRef.__FUJITEC_GEO__ = api;

  return () => {
    disposed = true;
    root.removeEventListener("click", onRouteClick);
    root.removeEventListener("wheel", onWheel);
    root.removeEventListener("pointerdown", onPointerDown);
    root.removeEventListener("pointerup", onPointerUp);
    documentRef.removeEventListener("keydown", onKeydown);
    documentRef.removeEventListener("visibilitychange", onVisibilityChange);
    windowRef.removeEventListener("popstate", onLocationChange);
    windowRef.removeEventListener("hashchange", onLocationChange);
    previousButton?.removeEventListener("click", onPrevious);
    nextButton?.removeEventListener("click", onNext);
    menuToggle?.removeEventListener("click", onMenuToggle);
    if (wheelReset !== null) windowRef.clearTimeout(wheelReset);
    motion.destroy();
    controller.destroy();
    delete windowRef.__FUJITEC_GEO__;
  };
}

if (typeof document !== "undefined") {
  const root = document.querySelector("[data-presentation]");
  if (root) mountPresentation(root);
}
