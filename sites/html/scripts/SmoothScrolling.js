//import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  smooth: true,
  easing: (t) => 1 - Math.pow(1 - t, 3)
});

window.lenis = lenis

// RAF loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/**
 * Smooth anchor scrolling with Lenis
 */
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute("href");

  // ignore empty hashes or #
  if (hash === "#" || hash.length === 1) return;

  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();

  lenis.scrollTo(target, {
    offset: 0,
    immediate: false,
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Update URL without jumping
  history.pushState(null, "", hash);
});


