import type { MouseEvent } from "react";

export function startProject(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.currentTarget.target === "_blank"
  )
    return;
  const form = document.querySelector<HTMLFormElement>(
    "#iletisim .contact-form",
  );
  if (!form) return; // Preserve the ordinary anchor if the form is unavailable.
  event.preventDefault();
  const enabled = (field: HTMLInputElement | HTMLTextAreaElement) =>
    !field.disabled;
  const invalid = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      '[aria-invalid="true"]',
    ),
  ).find(enabled);
  const choices = Array.from(
    form.querySelectorAll<HTMLInputElement>('[data-field="areas"]'),
  ).filter(enabled);
  const missing = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input[required], textarea[required]",
    ),
  ).find((field) => enabled(field) && !field.value.trim());
  const target =
    invalid ||
    (choices.length && !choices.some((choice) => choice.checked)
      ? choices[0]
      : missing) ||
    form.querySelector<HTMLTextAreaElement>("textarea:not(:disabled)") ||
    form;
  const details = target.closest("details");
  if (details) details.open = true;
  if (target === form) form.tabIndex = -1;
  if (window.location.hash !== "#iletisim")
    window.history.pushState(window.history.state, "", "#iletisim");
  const reduced =
    document.documentElement.dataset.motion === "paused" ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({
    behavior: reduced ? "instant" : "smooth",
    block: "start",
  });
  target.focus({ preventScroll: true });
}
