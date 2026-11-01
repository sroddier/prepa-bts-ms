/* Nom de profil et sauvegarde de l’avancement, partagés par le sommaire et chaque parcours.
   SYNC_URL : coller l’URL /exec après le déploiement de collecte/Code.gs. */
(() => {
  const SYNC_URL = "";
  const NOM_KEY = "prepa-profil-nom";
  const SUJETS = [
    "prepa-e4-2021-v1",
    "prepa-e4-2023-v1",
    "prepa-e4-2024-v1",
    "prepa-e4-2025-v1",
    "prepa-e4-2025-nc-v1",
    "prepa-e4-sujet-0-v1",
  ];
  const timers = {};
  const attente = {};

  const slugify = (nom) => String(nom || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  const nom = () => localStorage.getItem(NOM_KEY) || "";
  const slug = () => slugify(nom());
  const cle = (sujet) => "prepa-etat:" + slug() + ":" + sujet;
  const flagCle = (sujet) => "prepa-ouvert:" + slug() + ":" + sujet;

  const parse = (raw) => {
    try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
  };

  const aDuTravail = (s) => {
    if (!s) return false;
    const d = s.diagnostic || {};
    const b = s.blanc || {};
    return Object.keys(d.answers || {}).length > 0 || d.submitted
      || Object.keys(s.fiches || {}).length > 0
      || Object.keys(s.exo || {}).length > 0
      || Object.keys(s.dqr || {}).length > 0
      || Object.keys(b.answers || {}).length > 0
      || b.submitted || b.elapsed;
  };

  const css = document.createElement("style");
  css.textContent = `
    #prepa-barre { display: flex; flex-direction: column; align-items: flex-start; gap: 0.35rem; width: 100%; margin-bottom: 0.45rem; }
    header.top #prepa-barre { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin: 0.8rem 0 0; }
    #prepa-barre button {
      background: none; border: 0; padding: 0; color: var(--muted, #7a655c);
      cursor: pointer; font: inherit; text-align: left;
    }
    #prepa-barre button:hover { color: var(--accent, #983830); }
    #prepa-sync { color: var(--muted, #7a655c); font-size: 0.75rem; }
    .prepa-voile {
      position: fixed; inset: 0; z-index: 40; background: rgba(44, 28, 24, 0.45);
      display: grid; place-items: center; padding: 1rem;
    }
    .prepa-carte {
      width: min(440px, 100%); background: var(--card, #fffdfb); color: var(--text, #2c1c18);
      border-radius: 16px; padding: 1.2rem 1.25rem 1.1rem; box-shadow: 0 16px 40px rgba(44, 28, 24, 0.18);
    }
    .prepa-carte h2 { font-family: var(--serif, Georgia, serif); margin: 0 0 0.4rem; font-size: 1.45rem; }
    .prepa-carte p { margin: 0 0 0.8rem; color: var(--muted, #7a655c); }
    .prepa-carte label { display: block; font-size: 0.85rem; font-weight: 650; margin-bottom: 0.7rem; }
    .prepa-carte input, .prepa-carte textarea {
      display: block; width: 100%; margin-top: 0.3rem; padding: 0.55rem 0.65rem;
      border: 1px solid var(--line, #e0d0c4); border-radius: 10px; background: #fff;
    }
    .prepa-carte textarea { min-height: 4.5rem; resize: vertical; }
    .prepa-slug { font-family: var(--mono, Consolas, monospace); color: var(--text, #2c1c18); }
    .prepa-err { color: var(--bad, #c4473a); font-size: 0.85rem; }
    .prepa-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
    .prepa-carte button[type="submit"], .prepa-carte button.prepa-go {
      background: var(--accent, #983830); color: #fffdfb; border: 0; border-radius: 999px;
      padding: 0.45rem 0.9rem; font-weight: 700; cursor: pointer;
    }
    .prepa-carte button.prepa-ghost { background: none; border: 0; color: var(--muted, #7a655c); cursor: pointer; }
  `;
  document.head.appendChild(css);

  const statut = (mode) => {
    const el = document.getElementById("prepa-sync");
    if (!el) return;
    el.textContent = mode === "ok" ? "Enregistré en ligne"
      : mode === "cours" ? "Enregistrement…"
      : mode === "err" ? "Sur ce poste seulement"
      : "Sur ce poste";
  };

  const paint = () => {
    const bouton = document.getElementById("prepa-profil-btn");
    if (bouton) bouton.textContent = nom() || "Choisir un profil";
    const sauve = document.getElementById("prepa-save-btn");
    if (sauve) sauve.hidden = !nom();
    if (!document.getElementById("prepa-sync")?.textContent) statut("local");
  };

  const bindBar = () => {
    document.getElementById("prepa-profil-btn").onclick = () => showModal(true);
    document.getElementById("prepa-save-btn").onclick = () => showSave();
  };

  const mount = () => {
    if (document.getElementById("prepa-barre")) return;
    const foot = document.querySelector(".sidebar-foot");
    const host = foot || document.querySelector("header.top");
    if (!host) return;
    const barre = document.createElement("div");
    barre.id = "prepa-barre";
    barre.innerHTML = `<button type="button" id="prepa-profil-btn"></button><button type="button" id="prepa-save-btn">Sauvegarde</button><span id="prepa-sync"></span>`;
    if (foot) foot.prepend(barre);
    else host.appendChild(barre);
    bindBar();
    paint();
  };

  const voile = (id) => {
    let el = document.getElementById(id);
    if (el) return el;
    el = document.createElement("div");
    el.id = id;
    el.className = "prepa-voile";
    document.body.appendChild(el);
    return el;
  };

  const showWait = (texte) => {
    const el = voile("prepa-attente");
    el.innerHTML = `<div class="prepa-carte"><h2>${texte}</h2></div>`;
    el.hidden = false;
  };
  const hideWait = () => {
    const el = document.getElementById("prepa-attente");
    if (el) el.remove();
  };

  async function appel(payload) {
    const res = await fetch(SYNC_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!json || json.ok === false) throw new Error((json && json.erreur) || "sync");
    return json;
  }

  function lireLocal(sujet) {
    const actuel = parse(localStorage.getItem(cle(sujet)));
    if (aDuTravail(actuel) || actuel.updated) return actuel;
    const marque = "prepa-legacy-fait:" + sujet;
    if (localStorage.getItem(marque)) return actuel;
    localStorage.setItem(marque, "1");
    const ancien = parse(localStorage.getItem(sujet));
    if (!aDuTravail(ancien)) return actuel;
    if (!ancien.updated) ancien.updated = 1;
    localStorage.setItem(cle(sujet), JSON.stringify(ancien));
    return ancien;
  }

  async function tirer(sujet) {
    const json = await appel({ op: "get", profil: slug(), sujet });
    return json && json.etat ? json.etat : null;
  }

  async function envoyer(sujet, state) {
    const json = await appel({
      op: "put",
      profil: slug(),
      sujet,
      updated: state.updated || 0,
      etat: state,
    });
    if (json && json.etat && (json.updated || 0) > (state.updated || 0)) {
      document.dispatchEvent(new CustomEvent("prepa-distant", { detail: { sujet, etat: json.etat } }));
    }
    statut("ok");
  }

  async function flush(sujet) {
    const state = attente[sujet];
    if (!state) return;
    delete attente[sujet];
    statut("cours");
    try {
      await envoyer(sujet, state);
    } catch {
      attente[sujet] = state;
      statut("err");
    }
  }

  function pousser(sujet, state) {
    if (!SYNC_URL || !slug()) return;
    attente[sujet] = state;
    clearTimeout(timers[sujet]);
    timers[sujet] = setTimeout(() => flush(sujet), 1200);
  }

  async function ouvrir(sujet) {
    showWait("Récupération de l’avancement…");
    try {
      const local = lireLocal(sujet);
      let distant = null;
      if (SYNC_URL) {
        try { distant = await tirer(sujet); } catch { statut("err"); }
      }
      const lu = local && (local.updated || (aDuTravail(local) ? 1 : 0)) || 0;
      const du = distant && (distant.updated || 0) || 0;
      if (distant && du > lu) {
        localStorage.setItem(cle(sujet), JSON.stringify(distant));
        if (SYNC_URL) statut("ok");
      } else if (SYNC_URL && aDuTravail(local) && lu > du) {
        try { await envoyer(sujet, local); } catch { statut("err"); }
      }
    } finally {
      sessionStorage.setItem(flagCle(sujet), "1");
      hideWait();
    }
  }

  function viderFlags() {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith("prepa-ouvert:")) sessionStorage.removeItem(k);
    }
  }

  function bytesToB64url(buf) {
    let bin = "";
    for (let i = 0; i < buf.length; i += 2048) {
      bin += String.fromCharCode.apply(null, buf.subarray(i, i + 2048));
    }
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  async function pack(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"));
    const buf = new Uint8Array(await new Response(stream).arrayBuffer());
    return "PREPA1." + bytesToB64url(buf);
  }

  async function unpack(code) {
    const clean = String(code || "").trim().replace(/\s+/g, "");
    if (!clean.startsWith("PREPA1.")) throw new Error("code");
    const b64 = clean.slice("PREPA1.".length).replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
    const bin = atob(b64 + pad);
    const buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    const stream = new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"));
    const data = JSON.parse(await new Response(stream).text());
    if (!data || typeof data.sujets !== "object") throw new Error("code");
    return data.sujets;
  }

  function bundle() {
    const sujets = {};
    for (const sujet of SUJETS) {
      const raw = localStorage.getItem(cle(sujet));
      if (raw) sujets[sujet] = parse(raw);
    }
    return { v: 1, profil: slug(), sujets };
  }

  function appliquerSujets(sujets) {
    for (const sujet of SUJETS) {
      if (!sujets[sujet]) continue;
      const incoming = sujets[sujet];
      const local = parse(localStorage.getItem(cle(sujet)));
      if ((local.updated || 0) > (incoming.updated || 0)) continue;
      localStorage.setItem(cle(sujet), JSON.stringify(incoming));
      pousser(sujet, incoming);
    }
  }

  async function appliquerNom(raw, code) {
    const display = String(raw || "").trim().replace(/\s+/g, " ");
    const id = slugify(display);
    const err = document.getElementById("prepa-err");
    if (id.length < 3) {
      if (err) { err.hidden = false; err.textContent = "Écris le prénom et le nom."; }
      return;
    }
    let sujets = null;
    if (code && String(code).trim()) {
      try { sujets = await unpack(code); }
      catch {
        if (err) { err.hidden = false; err.textContent = "Ce code de sauvegarde ne se lit pas."; }
        return;
      }
    }
    localStorage.setItem(NOM_KEY, display);
    viderFlags();
    if (sujets) appliquerSujets(sujets);
    if (window.PREPA_SUJET) await ouvrir(window.PREPA_SUJET);
    location.reload();
  }

  function showModal(deja) {
    const el = voile("prepa-modal");
    el.hidden = false;
    el.innerHTML = `
      <form class="prepa-carte" id="prepa-form">
        <h2>Nom de profil</h2>
        <p>Les ordinateurs de la salle changent. Écris ton prénom et ton nom. Le même nom, avec le code de sauvegarde, retrouve l’avancement sur un autre poste.</p>
        <label>Prénom et nom
          <input id="prepa-nom" name="nom" autocomplete="name" maxlength="60" required>
        </label>
        <p>Profil enregistré sous <span class="prepa-slug" id="prepa-slug">…</span></p>
        <label>Code de sauvegarde, si tu changes d’ordinateur
          <textarea id="prepa-code" placeholder="Colle le code copié sur l’autre poste"></textarea>
        </label>
        <p class="prepa-err" id="prepa-err" hidden></p>
        <div class="prepa-actions">
          ${deja ? `<button type="button" class="prepa-ghost" id="prepa-annuler">Annuler</button>` : ""}
          <button type="submit">Continuer</button>
        </div>
      </form>`;
    const input = document.getElementById("prepa-nom");
    input.value = nom();
    const majSlug = () => {
      const id = slugify(input.value);
      document.getElementById("prepa-slug").textContent = id || "…";
    };
    input.addEventListener("input", majSlug);
    majSlug();
    input.focus();
    const annuler = document.getElementById("prepa-annuler");
    if (annuler) annuler.onclick = () => el.remove();
    document.getElementById("prepa-form").onsubmit = (ev) => {
      ev.preventDefault();
      appliquerNom(input.value, document.getElementById("prepa-code").value);
    };
  }

  async function showSave() {
    const el = voile("prepa-sauve");
    let code = "";
    try { code = await pack(bundle()); }
    catch { code = ""; }
    el.innerHTML = `
      <form class="prepa-carte" id="prepa-form-sauve">
        <h2>Sauvegarde</h2>
        <p>Profil <span class="prepa-slug">${slug() || "…"}</span>. Copie ce code avant de quitter le poste, puis colle-le sur le nouvel ordinateur avec le même nom.</p>
        <textarea id="prepa-code-sortie" readonly>${code.replace(/</g, "")}</textarea>
        <p class="prepa-err" id="prepa-sauve-msg" hidden></p>
        <div class="prepa-actions">
          <button type="button" class="prepa-ghost" id="prepa-sauve-fermer">Fermer</button>
          <button type="submit" class="prepa-go">Copier le code</button>
        </div>
      </form>`;
    document.getElementById("prepa-sauve-fermer").onclick = () => el.remove();
    document.getElementById("prepa-form-sauve").onsubmit = async (ev) => {
      ev.preventDefault();
      const zone = document.getElementById("prepa-code-sortie");
      const msg = document.getElementById("prepa-sauve-msg");
      zone.focus();
      zone.select();
      let ok = false;
      try { await navigator.clipboard.writeText(zone.value); ok = true; } catch { ok = false; }
      msg.hidden = false;
      msg.style.color = ok ? "var(--ok, #2f9e6b)" : "var(--bad, #c4473a)";
      msg.textContent = ok ? "Code copié." : "Sélectionne le code et copie-le.";
    };
    const zone = document.getElementById("prepa-code-sortie");
    const reprise = document.createElement("label");
    reprise.innerHTML = `Coller un code repris sur un autre poste<textarea id="prepa-code-reprise" placeholder="PREPA1…"></textarea>`;
    zone.after(reprise);
    const reprendre = document.createElement("button");
    reprendre.type = "button";
    reprendre.className = "prepa-ghost";
    reprendre.textContent = "Reprendre ce code";
    reprendre.onclick = async () => {
      const msg = document.getElementById("prepa-sauve-msg");
      try {
        appliquerSujets(await unpack(document.getElementById("prepa-code-reprise").value));
      } catch {
        msg.hidden = false;
        msg.style.color = "var(--bad, #c4473a)";
        msg.textContent = "Ce code de sauvegarde ne se lit pas.";
        return;
      }
      viderFlags();
      location.reload();
    };
    document.querySelector("#prepa-form-sauve .prepa-actions").prepend(reprendre);
  }

  window.addEventListener("pagehide", () => {
    if (!SYNC_URL) return;
    for (const sujet of Object.keys(attente)) {
      const state = attente[sujet];
      if (!state) continue;
      fetch(SYNC_URL, {
        method: "POST",
        redirect: "follow",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ op: "put", profil: slug(), sujet, updated: state.updated || 0, etat: state }),
      }).catch(() => {});
    }
  });

  window.Profil = { nom, slug, cle, ouvrir, pousser };
  mount();
  if (!nom()) showModal(false);
})();
