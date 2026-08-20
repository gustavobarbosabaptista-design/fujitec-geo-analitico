import { homeRoute, screenById, trailDefinitions, validHashes } from "./content.mjs";

// Trilha linear única: rotas fora da lista (inclusive "inicio") normalizam
// para a primeira tela e as extremidades não saem da trilha.
export const normalizeHash = (hash = "") => {
  const value = String(hash).replace(/^#/, "").trim();
  return validHashes.includes(value) ? value : homeRoute;
};

export const routeFromHash = (hash = "") => normalizeHash(hash);

export const hashForRoute = (route = homeRoute) => `#${normalizeHash(route)}`;

export const trailPosition = (route) => {
  const screen = screenById.get(normalizeHash(route));
  if (!screen?.trail) return null;
  const trail = trailDefinitions[screen.trail];
  const index = trail.slides.findIndex((slide) => slide.id === screen.id);
  return index >= 0 ? { trail, index, total: trail.slides.length } : null;
};

export const adjacentRoute = (route, direction) => {
  const position = trailPosition(route);
  if (!position) return homeRoute;
  const delta = direction > 0 ? 1 : -1;
  const destination = position.index + delta;
  if (destination < 0 || destination >= position.total) return position.trail.slides[position.index].id;
  return position.trail.slides[destination].id;
};

export const lastRouteInTrail = (route) => {
  const position = trailPosition(route);
  if (!position) return homeRoute;
  return position.trail.slides[position.total - 1].id;
};

export const keyboardIntent = (key) => {
  if (["ArrowRight", "ArrowDown", "PageDown"].includes(key)) return "next";
  if (["ArrowLeft", "ArrowUp", "PageUp"].includes(key)) return "previous";
  if (key === "Home" || key === "Escape") return "home";
  if (key === "End") return "last";
  return null;
};

export const themeHref = (file, hash = `#${homeRoute}`) => `${file}${hashForRoute(routeFromHash(hash))}`;

export function createRouteController({
  initialRoute = homeRoute,
  lockMs = 620,
  onChange,
  schedule = (callback, delay) => globalThis.setTimeout(callback, delay),
  cancel = (id) => globalThis.clearTimeout(id)
} = {}) {
  let route = normalizeHash(initialRoute);
  let locked = false;
  let timer = null;
  let destroyed = false;

  const unlock = () => {
    locked = false;
    if (timer !== null) cancel(timer);
    timer = null;
  };

  const goTo = (nextRoute, source = "api", { force = false } = {}) => {
    if (destroyed || (locked && !force)) return false;
    const next = normalizeHash(nextRoute);
    if (next === route) return false;
    const previous = route;
    route = next;
    locked = lockMs > 0;
    if (timer !== null) cancel(timer);
    if (locked) timer = schedule(unlock, lockMs);
    onChange?.({ route, previous, source });
    return true;
  };

  return {
    getRoute: () => route,
    isLocked: () => locked,
    goTo,
    next: (source = "api") => goTo(adjacentRoute(route, 1), source),
    previous: (source = "api") => goTo(adjacentRoute(route, -1), source),
    home: (source = "api") => goTo(homeRoute, source, { force: true }),
    last: (source = "api") => goTo(lastRouteInTrail(route), source),
    unlock,
    destroy: () => {
      destroyed = true;
      unlock();
    }
  };
}

export function scrollableAncestor(target, root) {
  const ElementRef = root?.ownerDocument?.defaultView?.Element ?? globalThis.Element;
  let node = ElementRef && target instanceof ElementRef ? target : null;
  while (node && node !== root) {
    if (node.matches?.("[data-scrollable]")) return node;
    node = node.parentElement;
  }
  return null;
}

export function shouldYieldToScroll(container, deltaY) {
  if (!container || !Number.isFinite(deltaY) || deltaY === 0) return false;
  const max = container.scrollHeight - container.clientHeight;
  if (max <= 1) return false;
  if (deltaY > 0) return container.scrollTop < max - 1;
  return container.scrollTop > 1;
}
