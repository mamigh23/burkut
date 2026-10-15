import React from "react";
import ReactDOM from "react-dom/client";
import "./fonts.css";
import "@fontsource-variable/figtree/wght.css";
import "./styles.css";
import App from "./App";
import ServicePage from "./pages/ServicePage";
import { webService } from "./content/serviceDetails";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") ===
    "/hizmetler/web" ? (
      <ServicePage service={webService} />
    ) : (
      <App />
    )}
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
