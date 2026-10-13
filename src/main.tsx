import React from "react";
import ReactDOM from "react-dom/client";
import "./fonts.css";
import "@fontsource-variable/figtree/wght.css";
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
