import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/figtree/wght.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-ext-400.css";
import "./styles.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get("audit") === "a11y"
) {
  void import("./dev/accessibility").then(({ startAccessibilityAudit }) =>
    startAccessibilityAudit(),
  );
}
