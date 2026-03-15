"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("detailRoot");
  const mark = document.getElementById("detailMark");
  const params = new URLSearchParams(window.location.search);
  const slug = document.body.dataset.librarySlug || params.get("item") || "";
  const detail = window.LibraryAtlas?.getBySlug(slug) || null;

  if (window.LibraryAtlas?.createLogoMark && mark) {
    mark.innerHTML = window.LibraryAtlas.createLogoMark();
  }

  if (!detail) {
    document.title = "Library Study Page";
    root.innerHTML = `
      <section class="detail-loading">
        <div class="panel-kicker">Not Found</div>
        <h1>That study page is missing.</h1>
        <p class="detail-summary">Go back to the library and pick one of the rebuilt local study pages.</p>
        <div class="detail-chip-row">
          <a class="detail-chip" href="/index.html?panel=library">Back to library</a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${detail.title} | Kings Bible Compass`;

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-copy">
        <div class="panel-kicker">${escapeHtml(detail.kicker)}</div>
        <h1>${escapeHtml(detail.title)}</h1>
        <p class="detail-summary">${escapeHtml(detail.summary)}</p>
        <div class="detail-meta">
          <span class="badge">Local study page</span>
          <span class="badge">Snapshot rebuilt</span>
          <span class="badge">${escapeHtml(detail.motif)}</span>
        </div>
        <div class="detail-chip-row">
          <a class="detail-chip" href="/index.html?panel=library">Back to library</a>
          <a class="detail-chip" href="/index.html">Open main app</a>
        </div>
      </div>
      <div class="detail-art">${window.LibraryAtlas.createLibraryArt(detail)}</div>
    </section>

    <section class="detail-grid">
      <div class="detail-column">
        <article class="detail-card">
          <div class="panel-kicker">Overview</div>
          <h2>How To Use This Page</h2>
          <p>${escapeHtml(detail.overview)}</p>
        </article>

        <article class="detail-card">
          <div class="panel-kicker">Highlights</div>
          <h2>What To Notice</h2>
          <ul>
            ${detail.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
      </div>

      <div class="detail-column">
        <article class="detail-card">
          <div class="panel-kicker">Key Passages</div>
          <h3>Jump Into Reading</h3>
          <div class="detail-reference-grid">
            ${detail.references.map((item) => `
              <div class="detail-ref-card">
                <strong>${escapeHtml(item.label)}</strong>
                <a class="detail-chip" href="${escapeHtml(window.LibraryAtlas.buildAppUrl({ panel: "read", book: item.book, chapter: item.chapter, verse: item.verse }))}">Open in reader</a>
              </div>
            `).join("")}
          </div>
        </article>

        <article class="detail-card">
          <div class="panel-kicker">Next Steps</div>
          <h3>Use The App Tools</h3>
          <div class="detail-link-grid">
            ${detail.actions.map((action) => `
              <div class="detail-link-card">
                <strong>${escapeHtml(action.label)}</strong>
                <a class="detail-chip" href="${escapeHtml(window.LibraryAtlas.buildAppUrl(action))}">Open tool</a>
              </div>
            `).join("")}
          </div>
        </article>
      </div>
    </section>

    <section class="detail-actions">
      <div class="panel-kicker">Source Handling</div>
      <p class="detail-summary">This page stays local. It was rebuilt from the saved library snapshot, but it does not send you back out to the external Kings Bible site.</p>
    </section>
  `;
});

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
