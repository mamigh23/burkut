/* global window, document, PerformanceObserver, performance, requestAnimationFrame */
// Copied only into .qa-dist by prepare-performance.mjs.
(() => {
  let lcp = null;
  let cls = 0;
  let sessionValue = 0;
  let firstShift = 0;
  let lastShift = 0;
  const observers = [];
  const supported = PerformanceObserver.supportedEntryTypes;
  function observe(type, consume) {
    if (!supported.includes(type)) return;
    const observer = new PerformanceObserver((list) =>
      consume(list.getEntries()),
    );
    observer.observe({ type, buffered: true });
    observers.push(observer);
  }
  observe("largest-contentful-paint", (entries) => {
    for (const entry of entries) lcp = entry.startTime;
  });
  observe("layout-shift", (entries) => {
    for (const entry of entries) {
      if (entry.hadRecentInput) continue;
      if (
        entry.startTime - lastShift < 1000 &&
        entry.startTime - firstShift < 5000
      ) {
        sessionValue += entry.value;
      } else {
        sessionValue = entry.value;
        firstShift = entry.startTime;
      }
      lastShift = entry.startTime;
      cls = Math.max(cls, sessionValue);
    }
  });
  window.addEventListener(
    "load",
    async () => {
      await document.fonts.ready;
      const report = document.createElement("script");
      report.id = "performance-report";
      report.type = "application/json";
      document.body.append(report);
      const button = document.createElement("button");
      button.textContent = "Ölçümü kaydet";
      button.id = "performance-save";
      Object.assign(button.style, {
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: "9999",
        padding: "12px 16px",
        color: "#fff",
        background: "#14231d",
        borderRadius: "12px",
        border: "1px solid #b9d8c4",
      });
      document.body.append(button);
      const snapshot = () => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        report.textContent = JSON.stringify({
          viewport: { width: window.innerWidth, height: window.innerHeight },
          fcpMs:
            performance.getEntriesByName("first-contentful-paint")[0]
              ?.startTime ?? null,
          lcpMs: lcp,
          cls,
          domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? null,
          loadMs: navigation?.loadEventEnd ?? null,
          resourceCount: resources.length,
          resourceTransferBytes: resources.reduce(
            (sum, entry) => sum + entry.transferSize,
            0,
          ),
          resources: resources.map((entry) => ({
            path: new window.URL(entry.name).pathname,
            transferBytes: entry.transferSize,
            durationMs: entry.duration,
          })),
          supported: {
            lcp: supported.includes("largest-contentful-paint"),
            cls: supported.includes("layout-shift"),
          },
          note: "Local production-build sample with inline measurement code. No CPU/network throttling; cache may be warm. Not a Lighthouse score, field data, or INP measurement.",
        });
      };
      button.addEventListener("click", snapshot);
      requestAnimationFrame(() => requestAnimationFrame(snapshot));
      window.addEventListener(
        "pagehide",
        () => observers.forEach((observer) => observer.disconnect()),
        { once: true },
      );
    },
    { once: true },
  );
})();
