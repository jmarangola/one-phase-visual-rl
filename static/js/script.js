/* Small, dependency-free page enhancements. Content stays in index.html. */
"use strict";

const hero = document.querySelector(".hero");
const stickyHeader = document.getElementById("sticky-header");
const toc = document.getElementById("dynamic-toc");
const headings = [...document.querySelectorAll("main [data-toc][id]")];
const tocLinks = [];

if (toc && headings.length) {
  const label = document.createElement("span");
  label.className = "toc-title";
  label.textContent = "Contents";
  const list = document.createElement("ul");
  let sectionItem = null;
  for (const heading of headings) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.dataset.toc || heading.textContent;
    item.append(link);
    if (heading.tagName === "H3" && sectionItem) {
      let children = sectionItem.querySelector("ul");
      if (!children) {
        children = document.createElement("ul");
        children.className = "toc-subsections";
        sectionItem.append(children);
      }
      item.className = "toc-subsection";
      children.append(item);
    } else {
      item.className = "toc-section";
      list.append(item);
      sectionItem = item;
    }
    tocLinks.push(link);
  }
  toc.append(label, list);
  toc.hidden = false;
}

let scheduled = false;
function updateNavigation() {
  scheduled = false;
  if (hero && stickyHeader) {
    stickyHeader.hidden = hero.getBoundingClientRect().bottom > 0;
  }
  let current = 0;
  headings.forEach((heading, index) => {
    if (heading.getBoundingClientRect().top <= window.innerHeight * 0.3) current = index;
  });
  toc?.querySelectorAll(".toc-section").forEach(item => item.classList.remove("toc-section-active"));
  tocLinks.forEach((link, index) => {
    if (index === current) {
      link.setAttribute("aria-current", "location");
      link.closest(".toc-section")?.classList.add("toc-section-active");
    }
    else link.removeAttribute("aria-current");
  });
}

function scheduleNavigation() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateNavigation);
}
window.addEventListener("scroll", scheduleNavigation, { passive: true });
window.addEventListener("resize", scheduleNavigation);
window.addEventListener("load", scheduleNavigation);
updateNavigation();

// Enable a button by adding the citation and removing its disabled attribute.
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    const status = document.getElementById("copy-status");
    if (!source || !status) return;
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      status.textContent = "Citation copied.";
    } catch {
      // Keep the citation selectable when clipboard permission is unavailable.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(source);
      selection?.removeAllRanges();
      selection?.addRange(range);
      status.textContent = "Select and copy the citation manually.";
    }
  });
});

// Escape dismisses the announcement without following the author link.
document.querySelectorAll('.author-with-card').forEach(author => {
  const clear = () => author.removeAttribute('data-dismissed');
  author.addEventListener('pointerleave', clear);
  author.addEventListener('focusout', event => { if (!author.contains(event.relatedTarget)) clear(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (author.matches(':hover') || author.contains(document.activeElement))) {
      if (author.querySelector('.author-card').contains(document.activeElement)) author.querySelector('.author').focus();
      author.setAttribute('data-dismissed', '');
    }
  });
});

// Copy only on an explicit press; keep the address selectable if access is denied.
document.querySelectorAll('[data-copy-email]').forEach(button => {
  let restoreTimer;
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.author-copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail);
      button.setAttribute('data-copied', '');
      button.setAttribute('aria-label', 'Email copied');
      button.title = 'Copied';
      status.textContent = 'Email address copied.';
      clearTimeout(restoreTimer);
      restoreTimer = setTimeout(() => {
        button.removeAttribute('data-copied');
        button.setAttribute('aria-label', 'Copy email address');
        button.title = 'Copy email address';
        status.textContent = '';
      }, 2000);
    } catch {
      status.textContent = 'Copy unavailable. Select the email address to copy it.';
      button.title = 'Select the email address to copy it';
    }
  });
});
