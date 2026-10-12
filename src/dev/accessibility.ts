import axe from "axe-core";

// Available only with Vite dev mode and the explicit ?audit=a11y query.
// Reports stay in this document; nothing is sent to an external service.
export async function startAccessibilityAudit() {
  await document.fonts.ready;
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  const report = document.createElement("script");
  report.id = "accessibility-report";
  report.type = "application/json";
  document.body.append(report);
  const button = document.createElement("button");
  button.id = "accessibility-audit-button";
  button.textContent = "Erişilebilirliği tara";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "16px",
    left: "16px",
    zIndex: "9999",
    padding: "12px 16px",
    background: "#14231d",
    color: "#fff",
    border: "1px solid #b9d8c4",
    borderRadius: "12px",
  });
  document.body.append(button);
  const run = async () => {
    button.disabled = true;
    report.textContent = JSON.stringify({ status: "running" });
    try {
      const result = await axe.run(document, {
        runOnly: {
          type: "tag",
          values: [
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa",
            "wcag22aa",
            "best-practice",
          ],
        },
      });
      const summarize = (items: typeof result.violations) =>
        items.map((item) => ({
          id: item.id,
          impact: item.impact,
          help: item.help,
          helpUrl: item.helpUrl,
          nodes: item.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        }));
      report.textContent = JSON.stringify({
        status: "complete",
        version: result.testEngine.version,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        violations: summarize(result.violations),
        incomplete: summarize(result.incomplete),
        passedRules: result.passes.length,
      });
    } catch (error) {
      report.textContent = JSON.stringify({
        status: "error",
        message: String(error),
      });
    } finally {
      button.disabled = false;
    }
  };
  button.addEventListener("click", run);
  await run();
}
