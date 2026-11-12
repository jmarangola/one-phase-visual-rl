(() => {
  "use strict";
  const frame = document.getElementById("robustness-demo");
  if (!frame) return;
  // Match the viewer host to the local website host.
  if (location.hostname === "127.0.0.1") frame.src = "http://127.0.0.1:8767/?embed=1";
  window.addEventListener("message", (event) => {
    if (!["http://localhost:8767", "http://127.0.0.1:8767"].includes(event.origin) || event.source !== frame.contentWindow) return;
    const data = event.data;
    if (data && data.type === "one-phase-demo-resize" && Number.isFinite(data.height)) {
      frame.style.height = `${Math.ceil(Math.max(240, Math.min(1600, data.height)))}px`;
    }
  });
})();
