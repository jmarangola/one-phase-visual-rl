# One Phase Is Enough

Project website for **One Phase Is Enough: Sim-to-Real Transfer with Direct Visual Reinforcement Learning**.

Website: https://jmarangola.github.io/one-phase-visual-rl/

Static HTML, CSS and JavaScript with the paper PDF, real-world demonstration videos, animated results, and a browser-local visual policy demo. No backend is needed.

## Publish

In repository Settings → Pages, select **GitHub Actions** as the source. Every push to `main` deploys the current website through `.github/workflows/pages.yml`.

## Preview

Serve this folder with a static web server. The interactive demo requires localhost or HTTPS. A scoped service worker supplies cross-origin isolation on static hosts so supported browsers can use multiple inference threads.

The public package contains the current paper website; editing tools and earlier video variants remain in the original local workspace.
