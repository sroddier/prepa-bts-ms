(() => {
  const { SKILLS, DATA_SUJET, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT } = window.PREPA;
  const KEY = "prepa-e4-sujet-0-v1";
  const $app = document.getElementById("app");
  const $nav = document.getElementById("main-nav");
  const $title = document.getElementById("topbar-title");
  const $sidebar = document.getElementById("sidebar");
  const $backdrop = document.getElementById("drawer-backdrop");

  const emptyState = () => ({
    diagnostic: { answers: {}, submitted: false },
    fiches: {},
    exo: {},
    dqr: {},
    blanc: { start: null, elapsed: 0, running: false, answers: {}, submitted: false },
  });

  const load = () => {
    try {
      return { ...emptyState(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    } catch {
      return emptyState();
    }
  };
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  let state = load();
  if (!state.blanc) state.blanc = emptyState().blanc;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

  const closeMenu = () => {
    $sidebar.classList.remove("open");
    $backdrop.hidden = true;
  };
  document.getElementById("btn-menu").onclick = () => {
    $sidebar.classList.toggle("open");
    $backdrop.hidden = !$sidebar.classList.contains("open");
  };
  $backdrop.onclick = closeMenu;

  document.getElementById("btn-reset").onclick = () => {
    if (confirm("Effacer toute la progression enregistrée dans ce navigateur ?")) {
      state = emptyState();
      save();
      location.hash = "#/";
      render();
    }
  };

  const parseHash = () => {
    const raw = (location.hash || "#/").replace(/^#/, "");
    const parts = raw.split("/").filter(Boolean);
    return { path: parts[0] || "home", id: parts[1] || "", extra: parts[2] || "" };
  };

  const skillById = (id) => SKILLS.find((s) => s.id === id);

  const levelOf = (ratio) => {
    if (ratio == null) return "none";
    if (ratio >= 0.75) return "ok";
    if (ratio >= 0.5) return "warn";
    return "bad";
  };
  const levelLabel = (lvl) => ({ ok: "Maîtrisé", warn: "Fragile", bad: "À reprendre", none: "Non évalué" }[lvl]);

  const diagnosticScores = () => {
    if (!state.diagnostic.submitted) return {};
    const out = {};
    SKILLS.forEach((s) => {
      const qs = DIAGNOSTIC.filter((q) => q.skill === s.id);
      const ok = qs.filter((q) => state.diagnostic.answers[q.id] === q.ok).length;
      out[s.id] = { ok, total: qs.length, ratio: qs.length ? ok / qs.length : 0 };
    });
    return out;
  };

  const diagnosticTotal = () => {
    if (!state.diagnostic.submitted) return null;
    const ok = DIAGNOSTIC.filter((q) => state.diagnostic.answers[q.id] === q.ok).length;
    return { ok, total: DIAGNOSTIC.length, ratio: ok / DIAGNOSTIC.length };
  };

  const exoStats = (skillId) => {
    const list = EXERCICES.filter((e) => e.skill === skillId);
    let done = 0, ok = 0;
    list.forEach((e) => {
      const st = state.exo[e.id];
      if (st && st.checked) {
        done += 1;
        if (st.correct && !st.hinted) ok += 1;
        else if (st.correct) ok += 0.5;
      }
    });
    return { done, total: list.length, ok };
  };

  const dqrStats = (partId) => {
    const part = DQR.find((p) => p.id === partId);
    if (!part) return { done: 0, total: 0, clean: 0 };
    let done = 0, clean = 0;
    part.questions.forEach((q) => {
      const st = state.dqr[q.id];
      if (st && st.checked) {
        done += 1;
        if (st.correct && (st.hints || 0) === 0) clean += 1;
      }
    });
    return { done, total: part.questions.length, clean };
  };

  const part2Ready = () => {
    const sc = diagnosticScores();
    const ids = ["coupleur", "demarrage", "flexion", "cable"];
    if (!state.diagnostic.submitted) return false;
    const ok = ids.reduce((a, id) => a + (sc[id]?.ok || 0), 0);
    const tot = ids.reduce((a, id) => a + (sc[id]?.total || 0), 0);
    return tot && ok / tot >= 0.7;
  };

  const navDot = (kind) => {
    if (kind === "diag") {
      const t = diagnosticTotal();
      if (!t) return "none";
      return levelOf(t.ratio);
    }
    if (kind === "fiches") {
      const n = Object.keys(state.fiches).length;
      if (!n) return "none";
      return n >= FICHES.length ? "ok" : "warn";
    }
    if (kind === "exo") {
      const done = Object.values(state.exo).filter((x) => x.checked).length;
      if (!done) return "none";
      return done >= EXERCICES.length * 0.7 ? "ok" : "warn";
    }
    if (kind === "dqr") {
      const all = DQR.reduce((a, p) => a + p.questions.length, 0);
      const done = Object.values(state.dqr).filter((x) => x.checked).length;
      if (!done) return "none";
      return done >= all * 0.7 ? "ok" : "warn";
    }
    if (kind === "blanc") return state.blanc.submitted ? "ok" : (state.blanc.start ? "warn" : "none");
    return "none";
  };

  const drawNav = (active) => {
    const items = [
      ["label", "Parcours"],
      ["home", "Accueil", "diag"],
      ["diagnostic", "0 · Diagnostic", "diag"],
      ["competences", "Carte de compétences", "diag"],
      ["label", "Travail autonome"],
      ["fiches", "1 · Fiches méthode", "fiches"],
      ["exercices", "2 · Micro-exercices", "exo"],
      ["dqr", "3 · DQR guidé", "dqr"],
      ["blanc", "4 · Blanc 4 h", "blanc"],
      ["transfert", "5 · Transfert", "none"],
      ["label", "Aide"],
      ["formules", "Carnet de formules", "none"],
      ["prof", "Espace enseignant", "none"],
    ];
    $nav.innerHTML = items.map(([id, label, kind]) => {
      if (id === "label") return `<div class="nav-label">${label}</div>`;
      const cls = id === active ? "active" : "";
      const dot = kind && kind !== "none" ? `<span class="dot ${navDot(kind)}"></span>` : "";
      return `<a class="${cls}" href="#/${id}">${esc(label)}${dot}</a>`;
    }).join("");
  };

  const numOk = (given, expected, tol) => {
    const n = Number(String(given).replace(",", "."));
    if (Number.isNaN(n)) return false;
    return Math.abs(n - expected) <= (tol ?? 0);
  };

  const textOk = (given, keys) => {
    const t = (given || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (t.trim().length < 8) return false;
    const hit = keys.filter((k) => t.includes(k.toLowerCase())).length;
    return hit >= Math.min(2, keys.length);
  };

  /* ---------- VIEWS ---------- */
  const viewHome = () => {
    const tot = diagnosticTotal();
    const next = !state.diagnostic.submitted
      ? { href: "#/diagnostic", label: "Commencer le diagnostic (15 min)" }
      : recommendedNext();
    return `
      <section class="hero">
        <div class="kicker">BTS MS · option A · E4 Sujet 0</div>
        <h1>Préparer l’E4 sujet 0<br>sans attendre le prof.</h1>
        <p>Centrale d’air comprimé d’une fromagerie, Rollair 100 puis 125&nbsp;V. 4&nbsp;h, coefficient 6. Un parcours calé sur <em>ce</em> sujet : plaque Δ400/Y690, étoile-triangle, flexion IPE, câble lettre F.</p>
        <div class="row">
          <a class="btn" href="${next.href}">${esc(next.label)}</a>
          <a class="btn secondary" href="#/formules">Carnet de formules</a>
        </div>
      </section>
      <div class="grid cols-3">
        <article class="card"><div class="tiny">Épreuve</div><div class="stat">4 h</div><p>U4 Analyse technique · coef. 6</p></article>
        <article class="card"><div class="tiny">Cœur du sujet</div><div class="stat">150 min</div><p>Parties 4, 6 et 7 : moteur, poutre, câble</p></article>
        <article class="card"><div class="tiny">Diagnostic</div><div class="stat">${tot ? tot.ok + "/" + tot.total : "—"}</div><p>${tot ? "Dernier passage enregistré" : "Pas encore passé"}</p></article>
      </div>
      <div class="card" style="margin-top:1rem">
        <h2>Les 5 paliers</h2>
        <div class="list-item"><div><strong>0 · Diagnostic</strong><div class="tiny">20 questions · carte de compétences</div></div><a class="btn sm" href="#/diagnostic">Ouvrir</a></div>
        <div class="list-item"><div><strong>1 · Fiches</strong><div class="tiny">Une méthode, un piège sujet 0, un exemple</div></div><a class="btn sm ghost" href="#/fiches">Ouvrir</a></div>
        <div class="list-item"><div><strong>2 · Micro-exercices</strong><div class="tiny">Même physique, nombres parfois décalés</div></div><a class="btn sm ghost" href="#/exercices">Ouvrir</a></div>
        <div class="list-item"><div><strong>3 · DQR guidé</strong><div class="tiny">Vrai déroulé, indices puis corrigé</div></div><a class="btn sm ghost" href="#/dqr">Ouvrir</a></div>
        <div class="list-item"><div><strong>4 · Blanc puis transfert</strong><div class="tiny">4 h sans aide, puis une autre annale</div></div><a class="btn sm ghost" href="#/blanc">Ouvrir</a></div>
      </div>
      <div class="card" style="margin-top:1rem">
        <h2>Contrat</h2>
        <ol class="contract">${CONTRAT.map((c) => `<li>${esc(c)}</li>`).join("")}</ol>
      </div>
    `;
  };

  function recommendedNext() {
    const sc = diagnosticScores();
    const weak = SKILLS.find((s) => sc[s.id] && sc[s.id].ratio < 0.75);
    if (weak) {
      const exo = EXERCICES.find((e) => e.skill === weak.id && !state.exo[e.id]?.correct);
      if (exo) return { href: `#/exercices/${exo.id}`, label: `Reprendre : ${weak.short}` };
      return { href: `#/fiches/${weak.id}`, label: `Fiche : ${weak.name}` };
    }
    const dqrLeft = DQR.find((p) => dqrStats(p.id).done < p.questions.length);
    if (dqrLeft) return { href: `#/dqr/${dqrLeft.id}`, label: `DQR partie ${dqrLeft.part}` };
    if (!state.blanc.submitted) return { href: "#/blanc", label: "Lancer le blanc 4 h" };
    return { href: "#/transfert", label: "Passer au transfert" };
  }

  const viewDiagnostic = () => {
    if (state.diagnostic.submitted) {
      return `<div class="paper">
        <p class="tiny">Diagnostic déjà soumis.</p>
        <div class="actions">
          <a class="btn" href="#/competences">Voir la carte</a>
          <button class="btn secondary" type="button" id="redo-diag">Repasser le diagnostic</button>
        </div>
      </div>`;
    }
    const i = Number(sessionStorage.getItem("diag-i-sujet-0") || 0);
    const q = DIAGNOSTIC[Math.min(i, DIAGNOSTIC.length - 1)];
    const chosen = state.diagnostic.answers[q.id];
    return `
      <div class="paper">
        <div class="q-head">
          <div class="tiny">Question ${i + 1} / ${DIAGNOSTIC.length} · ${esc(skillById(q.skill).name)}</div>
          <div class="tiny">15–20 min · une seule réponse</div>
        </div>
        <div class="progress-track"><span style="width:${((i) / DIAGNOSTIC.length) * 100}%"></span></div>
        <h2 style="margin:1rem 0 0.6rem">${esc(q.q)}</h2>
        <div class="choices">
          ${q.choices.map((c, idx) => `
            <button type="button" class="choice ${chosen === idx ? "selected" : ""}" data-idx="${idx}">
              <span class="letter">${"ABCD"[idx]}</span><span>${esc(c)}</span>
            </button>`).join("")}
        </div>
        <div class="actions">
          <button class="btn secondary" type="button" id="diag-prev" ${i === 0 ? "disabled" : ""}>Précédent</button>
          <button class="btn" type="button" id="diag-next">${i === DIAGNOSTIC.length - 1 ? "Terminer" : "Suivant"}</button>
        </div>
      </div>`;
  };

  const bindDiagnostic = () => {
    const redo = document.getElementById("redo-diag");
    if (redo) {
      redo.onclick = () => {
        state.diagnostic = { answers: {}, submitted: false };
        sessionStorage.setItem("diag-i-sujet-0", "0");
        save();
        render();
      };
      return;
    }
    let i = Number(sessionStorage.getItem("diag-i-sujet-0") || 0);
    const q = DIAGNOSTIC[i];
    if (!q) return;
    document.querySelectorAll(".choice").forEach((btn) => {
      btn.onclick = () => {
        state.diagnostic.answers[q.id] = Number(btn.dataset.idx);
        save();
        render();
      };
    });
    const go = (n) => {
      sessionStorage.setItem("diag-i-sujet-0", String(n));
      render();
    };
    document.getElementById("diag-prev")?.addEventListener("click", () => go(Math.max(0, i - 1)));
    document.getElementById("diag-next")?.addEventListener("click", () => {
      if (state.diagnostic.answers[q.id] == null) {
        alert("Choisissez une réponse avant de continuer.");
        return;
      }
      if (i === DIAGNOSTIC.length - 1) {
        state.diagnostic.submitted = true;
        save();
        location.hash = "#/competences";
      } else go(i + 1);
    });
  };

  const viewCompetences = () => {
    const sc = diagnosticScores();
    const tot = diagnosticTotal();
    if (!tot) {
      return `<div class="paper"><p>Passez d’abord le diagnostic : il ouvre la carte.</p>
        <a class="btn" href="#/diagnostic">Lancer le diagnostic</a></div>`;
    }
    const weak = SKILLS.filter((s) => sc[s.id].ratio < 0.75);
    return `
      <div class="hero">
        <div class="kicker">Résultat</div>
        <h1>${tot.ok} / ${tot.total}</h1>
        <p>${tot.ok >= 14 ? "Vous pouvez attaquer le DQR guidé, en commençant par les compétences orange ou rouges." : "Reprenez d’abord les fiches et micro-exercices des compétences rouges. Le DQR partie 2 attendra."}</p>
        <a class="btn" href="${weak[0] ? "#/fiches/" + weak[0].id : "#/dqr"}">${weak[0] ? "Fiche prioritaire : " + weak[0].name : "Aller au DQR"}</a>
      </div>
      <div class="grid cols-4">
        ${SKILLS.map((s) => {
          const r = sc[s.id];
          const lvl = levelOf(r.ratio);
          return `<article class="card skill-card">
            <span class="tag">Partie ${s.part}</span>
            <strong>${esc(s.name)}</strong>
            <span class="lvl ${lvl}">${r.ok}/${r.total} · ${levelLabel(lvl)}</span>
            <div class="bar"><i style="width:${r.ratio * 100}%;background:${lvl === "ok" ? "#3dcc8a" : lvl === "warn" ? "var(--accent)" : "#e25b4f"}"></i></div>
          </article>`;
        }).join("")}
      </div>
      <p class="tiny" style="margin-top:1rem">Vert ≥ 75 % · orange ≥ 50 % · rouge en dessous. Une compétence rouge = fiche puis 3 exercices avant le DQR correspondant.</p>
    `;
  };

  const viewFiches = () => `
    <div class="grid cols-2">
      ${FICHES.map((f) => `
        <a class="card" href="#/fiches/${f.id}" style="color:inherit">
          <span class="tag">${esc(skillById(f.skill).name)}</span>
          <h3>${esc(f.title)}</h3>
          <p class="tiny">${state.fiches[f.id] ? "Déjà ouverte" : "À lire · sujet 0"}</p>
        </a>`).join("")}
    </div>`;

  const viewFiche = (id) => {
    const f = FICHES.find((x) => x.id === id);
    if (!f) return `<p>Fiche inconnue.</p>`;
    state.fiches[id] = true;
    save();
    const idx = FICHES.findIndex((x) => x.id === id);
    const next = FICHES[idx + 1];
    const firstExo = EXERCICES.find((e) => e.skill === f.skill);
    return `
      <article class="paper fiche">
        <div class="tiny">Fiche méthode · partie ${skillById(f.skill).part}</div>
        <h2>${esc(f.title)}</h2>
        ${f.html}
        <div class="actions">
          <a class="btn" href="#/exercices/${firstExo ? firstExo.id : ""}">S’entraîner sur cette compétence</a>
          ${next ? `<a class="btn secondary" href="#/fiches/${next.id}">Fiche suivante</a>` : ""}
          <a class="btn ghost" href="#/fiches">Toutes les fiches</a>
        </div>
      </article>`;
  };

  const viewExercices = () => `
    <p class="muted">Même physique que le sujet 0, parfois les vrais nombres, parfois un décalage pour éviter le par cœur.</p>
    ${SKILLS.map((s) => {
      const list = EXERCICES.filter((e) => e.skill === s.id);
      const st = exoStats(s.id);
      return `<div class="card" style="margin-bottom:.8rem">
        <div class="q-head"><h3>${esc(s.name)}</h3><span class="tiny">${st.done}/${st.total} faits</span></div>
        ${list.map((e) => {
          const x = state.exo[e.id];
          const mark = !x?.checked ? "—" : x.correct && !x.hinted ? "Juste" : x.correct ? "Juste avec indice" : "À revoir";
          return `<div class="list-item">
            <div><strong>${esc(e.title)}</strong><div class="tiny">${mark}</div></div>
            <a class="btn sm ghost" href="#/exercices/${e.id}">Ouvrir</a>
          </div>`;
        }).join("")}
      </div>`;
    }).join("")}`;

  const viewExercice = (id) => {
    const e = EXERCICES.find((x) => x.id === id);
    if (!e) return `<p>Exercice inconnu.</p>`;
    const st = state.exo[id] || {};
    const idx = EXERCICES.findIndex((x) => x.id === id);
    const prev = EXERCICES[idx - 1];
    const next = EXERCICES[idx + 1];
    let body = "";
    if (e.type === "mcq") {
      body = `<div class="choices">${e.choices.map((c, i) => `
        <button type="button" class="choice ${st.given === i ? "selected" : ""} ${st.checked && i === e.ok ? "good" : ""} ${st.checked && st.given === i && i !== e.ok ? "bad" : ""}" data-idx="${i}">
          <span class="letter">${"ABCD"[i]}</span><span>${esc(c)}</span>
        </button>`).join("")}</div>`;
    } else {
      body = `<div class="input-row">
        <input id="exo-val" type="text" inputmode="decimal" value="${esc(st.given ?? "")}" placeholder="Votre valeur" ${st.checked ? "disabled" : ""} />
        <span class="unit">${esc(e.unit)}</span>
      </div>`;
    }
    return `<article class="paper">
      <div class="tiny">${esc(skillById(e.skill).name)} · ${idx + 1}/${EXERCICES.length}</div>
      <h2>${esc(e.title)}</h2>
      <p>${esc(e.prompt)}</p>
      ${body}
      ${st.hinted && !st.checked ? `<div class="hint"><strong>Indice.</strong> ${esc(e.hint)}</div>` : ""}
      ${st.checked ? `<div class="feedback ${st.correct ? "ok" : "bad"}">${st.correct ? "Correct." : "Pas encore."} ${e.corr}</div>` : ""}
      <div class="actions">
        ${!st.checked ? `<button class="btn" type="button" id="exo-ok">Vérifier</button>` : ""}
        ${!st.checked && !st.hinted ? `<button class="btn secondary" type="button" id="exo-hint">Indice</button>` : ""}
        ${st.checked ? `<button class="btn secondary" type="button" id="exo-retry">Réessayer</button>` : ""}
        ${prev ? `<a class="btn ghost" href="#/exercices/${prev.id}">Précédent</a>` : ""}
        ${next ? `<a class="btn ghost" href="#/exercices/${next.id}">Suivant</a>` : `<a class="btn" href="#/dqr">Passer au DQR</a>`}
      </div>
    </article>`;
  };

  const bindExercice = (id) => {
    const e = EXERCICES.find((x) => x.id === id);
    if (!e) return;
    const st = state.exo[id] || { hinted: false };
    document.querySelectorAll(".choice").forEach((btn) => {
      btn.onclick = () => {
        if (st.checked) return;
        state.exo[id] = { ...st, given: Number(btn.dataset.idx) };
        save();
        render();
      };
    });
    document.getElementById("exo-hint")?.addEventListener("click", () => {
      state.exo[id] = { ...st, hinted: true, given: st.given ?? document.getElementById("exo-val")?.value };
      save();
      render();
    });
    document.getElementById("exo-retry")?.addEventListener("click", () => {
      state.exo[id] = { hinted: false, checked: false };
      save();
      render();
    });
    document.getElementById("exo-ok")?.addEventListener("click", () => {
      const given = e.type === "mcq" ? state.exo[id]?.given : document.getElementById("exo-val").value;
      const correct = e.type === "mcq" ? given === e.ok : numOk(given, e.value, e.tol);
      state.exo[id] = { ...st, given, checked: true, correct, hinted: !!st.hinted };
      save();
      render();
    });
  };

  const viewDqrList = () => {
    const warn = state.diagnostic.submitted && !part2Ready();
    return `
      ${warn ? `<div class="card" style="margin-bottom:1rem;border-color:#8a5a00">
        <strong>Conseil.</strong> Le diagnostic plaque / FR1 / flexion / câble n’est pas encore assez solide. Vous pouvez ouvrir le DQR, mais les parties 4, 6 et 7 risquent de vous bloquer. Mieux : fiche Δ400 + fiche FL/4 + 3 exercices.
        <div class="actions"><a class="btn sm" href="#/fiches/coupleur">Fiche plaque moteur</a></div>
      </div>` : ""}
      <p class="muted">Dossier d’entraînement calé sur le sujet 0 — pas une copie du DQR officiel. Gardez le PDF à côté pour les schémas DT.</p>
      <div class="grid cols-2">
        ${DQR.map((p) => {
          const st = dqrStats(p.id);
          return `<a class="card" href="#/dqr/${p.id}" style="color:inherit">
            <span class="tag">Partie ${p.part} · ${p.duration}</span>
            <h3>${esc(p.title)}</h3>
            <p class="tiny">${st.done}/${st.total} traitées · ${st.clean} sans indice</p>
          </a>`;
        }).join("")}
      </div>`;
  };

  const viewDqrPart = (id, qid) => {
    const part = DQR.find((p) => p.id === id);
    if (!part) return `<p>Partie inconnue.</p>`;
    const qi = Math.max(0, part.questions.findIndex((q) => q.id === qid));
    const q = part.questions[qi >= 0 && qid ? qi : 0];
    const st = state.dqr[q.id] || { hints: 0 };
    const idx = part.questions.findIndex((x) => x.id === q.id);
    let field = "";
    if (q.type === "num") {
      field = `<div class="input-row"><input id="dqr-val" type="text" inputmode="decimal" value="${esc(st.given ?? "")}" ${st.checked ? "disabled" : ""} /><span class="unit">${esc(q.unit || "")}</span></div>`;
    } else if (q.type === "mcq") {
      field = `<div class="choices">${q.choices.map((c, i) => `
        <button type="button" class="choice ${Number(st.given) === i ? "selected" : ""} ${st.checked && i === q.ok ? "good" : ""} ${st.checked && Number(st.given) === i && i !== q.ok ? "bad" : ""}" data-idx="${i}">
          <span class="letter">${"ABCD"[i]}</span><span>${esc(c)}</span>
        </button>`).join("")}</div>`;
    } else {
      field = `<textarea id="dqr-val" ${st.checked ? "disabled" : ""} placeholder="Rédigez ici…">${esc(st.given ?? "")}</textarea>`;
    }
    const hintsHtml = (st.hints ? q.hints.slice(0, st.hints) : []).map((h, i) =>
      `<div class="hint"><strong>Indice ${i + 1}.</strong> ${esc(h)}</div>`).join("");
    return `<article class="paper">
      <div class="q-head">
        <div class="tiny">Partie ${part.part} · ${esc(part.title)} · ${idx + 1}/${part.questions.length}</div>
        <div class="tiny">${esc(part.duration)}</div>
      </div>
      <div class="progress-track"><span style="width:${(idx / part.questions.length) * 100}%"></span></div>
      <h2>${esc(q.code)}</h2>
      <div class="dt-box"><strong>Document à consulter</strong>${esc(q.dt)}</div>
      <p>${esc(q.prompt)}</p>
      ${field}
      ${hintsHtml}
      ${st.checked ? `<div class="feedback ${st.correct ? "ok" : "bad"}"><strong>${st.correct ? "Réponse acceptable." : "Écart avec le corrigé."}</strong><div>${q.corr}</div>
        ${(st.hints || 0) > 0 ? `<div class="tiny">Indices utilisés : ${st.hints} — cette question reste « fragile ».</div>` : ""}
      </div>` : ""}
      <div class="actions">
        ${!st.checked ? `<button class="btn" type="button" id="dqr-ok">Vérifier</button>` : ""}
        ${!st.checked && (st.hints || 0) < q.hints.length ? `<button class="btn secondary" type="button" id="dqr-hint">Indice ${(st.hints || 0) + 1}</button>` : ""}
        ${st.checked ? `<button class="btn secondary" type="button" id="dqr-retry">Réessayer sans indice</button>` : ""}
        ${idx > 0 ? `<a class="btn ghost" href="#/dqr/${part.id}/${part.questions[idx - 1].id}">Précédente</a>` : `<a class="btn ghost" href="#/dqr">Parties</a>`}
        ${idx < part.questions.length - 1 ? `<a class="btn ghost" href="#/dqr/${part.id}/${part.questions[idx + 1].id}">Suivante</a>` : `<a class="btn" href="#/blanc">Blanc 4 h</a>`}
      </div>
    </article>`;
  };

  const bindDqr = (id, qid) => {
    const part = DQR.find((p) => p.id === id);
    if (!part) return;
    const q = part.questions.find((x) => x.id === qid) || part.questions[0];
    const st = state.dqr[q.id] || { hints: 0 };
    document.querySelectorAll(".choice").forEach((btn) => {
      btn.onclick = () => {
        if (st.checked) return;
        state.dqr[q.id] = { ...st, given: Number(btn.dataset.idx) };
        save();
        render();
      };
    });
    document.getElementById("dqr-hint")?.addEventListener("click", () => {
      const given = q.type === "mcq" ? st.given : document.getElementById("dqr-val")?.value;
      state.dqr[q.id] = { ...st, given, hints: (st.hints || 0) + 1 };
      save();
      render();
    });
    document.getElementById("dqr-retry")?.addEventListener("click", () => {
      state.dqr[q.id] = { hints: 0, checked: false };
      save();
      render();
    });
    document.getElementById("dqr-ok")?.addEventListener("click", () => {
      const given = q.type === "mcq" ? state.dqr[q.id]?.given : document.getElementById("dqr-val").value;
      let correct = false;
      if (q.type === "num") correct = numOk(given, q.value, q.tol);
      else if (q.type === "mcq") correct = Number(given) === q.ok;
      else correct = textOk(given, q.expect);
      state.dqr[q.id] = { ...st, given, checked: true, correct, hints: st.hints || 0 };
      save();
      render();
    });
  };

  const blancQuestions = () => DQR.flatMap((p) => p.questions.map((q) => ({ ...q, part: p.part, ptitle: p.title })));

  const blancElapsed = () => {
    const b = state.blanc;
    if (!b.start) return b.elapsed || 0;
    if (!b.running) return b.elapsed || 0;
    return (b.elapsed || 0) + (Date.now() - b.start);
  };

  const fmtTime = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const viewBlanc = () => {
    const b = state.blanc;
    const qs = blancQuestions();
    if (!b.start && !b.submitted) {
      const ready = part2Ready() || (diagnosticTotal() && diagnosticTotal().ok >= 14);
      return `<div class="paper">
        <h2>Blanc E4 Sujet 0 — conditions d’examen</h2>
        <p>4 heures, aucune aide, calculatrice type collège. Travaillez comme le jour J : lisez le DT, rédigez, passez si vous bloquez.</p>
        <table>
          <tr><th>Partie</th><th>Budget</th><th>Si dépassé</th></tr>
          <tr><td>1 Lecture</td><td>10 min</td><td>500 m³/h, un seul, huile</td></tr>
          <tr><td>2–3 Circuits</td><td>30 min</td><td>4 filtres, 3 cas d’huile</td></tr>
          <tr><td>4 Démarrage</td><td>40 min</td><td>131 A / 75,6 A · FR1 = 75,6 · P7</td></tr>
          <tr><td>5 Sûreté / 125 V</td><td>30 min</td><td>Redondance perdue · 834 m³/h</td></tr>
          <tr><td>6 Levage + flexion</td><td>50 min</td><td>FL/4 · 47,34 ≤ 55</td></tr>
          <tr><td>7 Câbles</td><td>60 min</td><td>Lettre F · I′z = Iz/K · Ir = 175 A</td></tr>
          <tr><td>Relecture</td><td>20 min</td><td>20 000 N pas 19 022 · 70 ≠ 120 mm²</td></tr>
        </table>
        ${!ready ? `<div class="trap"><strong>Avertissement.</strong> Diagnostic encore fragile. Vous pouvez lancer le blanc, mais le contrat pédagogique conseille 14/20 au diagnostic d’abord.</div>` : ""}
        <div class="actions">
          <button class="btn" type="button" id="blanc-go">Démarrer le chrono 4 h</button>
          <a class="btn secondary" href="assets/E4-sujet-0.pdf" target="_blank">Ouvrir le PDF officiel</a>
        </div>
      </div>`;
    }
    const left = 4 * 3600 * 1000 - blancElapsed();
    const groups = {};
    qs.forEach((q) => {
      groups[q.part] = groups[q.part] || [];
      groups[q.part].push(q);
    });
    if (b.submitted) {
      let ok = 0;
      qs.forEach((q) => {
        const g = b.answers[q.id];
        if (q.type === "num" && numOk(g, q.value, q.tol)) ok += 1;
        else if (q.type === "mcq" && Number(g) === q.ok) ok += 1;
        else if (q.type === "text" && textOk(g, q.expect)) ok += 1;
      });
      return `<div class="hero"><div class="kicker">Blanc terminé</div>
        <h1>${ok} / ${qs.length} acceptables</h1>
        <p>Ce n’est pas le barème officiel (certaines questions sont qualitatives). Relisez les écarts, puis changez d’annale.</p>
        <a class="btn" href="#/transfert">Palier 5 · Transfert</a>
        <button class="btn secondary" type="button" id="blanc-reset">Refaire le blanc</button>
      </div>
      ${qs.map((q) => {
        const g = b.answers[q.id];
        let good = false;
        if (q.type === "num") good = numOk(g, q.value, q.tol);
        else if (q.type === "mcq") good = Number(g) === q.ok;
        else good = textOk(g, q.expect);
        return `<div class="paper" style="margin-bottom:.7rem">
          <div class="tiny">${q.code} · ${good ? "Acceptable" : "À revoir"}</div>
          <p>${esc(q.prompt)}</p>
          <p><strong>Votre réponse :</strong> ${esc(g ?? "—")}</p>
          <div class="feedback ${good ? "ok" : "bad"}">${q.corr}</div>
        </div>`;
      }).join("")}`;
    }
    return `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1rem">
        <div><strong>Blanc en cours</strong><div class="tiny">Restez sur cette page ou le chrono continue en arrière-plan.</div></div>
        <div class="timer ${left < 30 * 60 * 1000 ? "warn" : ""}" id="blanc-timer">${fmtTime(left)}</div>
        <div class="row">
          <button class="btn sm ghost" type="button" id="blanc-pause">${b.running ? "Pause" : "Reprendre"}</button>
          <button class="btn sm" type="button" id="blanc-end">Terminer et corriger</button>
        </div>
      </div>
      ${Object.entries(groups).map(([part, list]) => `
        <div class="paper" style="margin-bottom:1rem">
          <h2>Partie ${esc(part)} — ${esc(list[0].ptitle)}</h2>
          ${list.map((q) => `
            <div style="margin:1rem 0 1.2rem;padding-top:.6rem;border-top:1px solid var(--paper-line)">
              <div class="tiny">${esc(q.code)} · DT : ${esc(q.dt)}</div>
              <p>${esc(q.prompt)}</p>
              ${q.type === "mcq"
                ? `<div class="choices">${q.choices.map((c, i) => `
                    <label class="choice ${Number(b.answers[q.id]) === i ? "selected" : ""}">
                      <input type="radio" name="${q.id}" value="${i}" ${Number(b.answers[q.id]) === i ? "checked" : ""} style="margin-top:.2rem"/>
                      <span><span class="letter">${"ABCD"[i]}</span> ${esc(c)}</span>
                    </label>`).join("")}</div>`
                : q.type === "num"
                  ? `<div class="input-row"><input class="blanc-in" data-id="${q.id}" type="text" value="${esc(b.answers[q.id] ?? "")}" /><span class="unit">${esc(q.unit || "")}</span></div>`
                  : `<textarea class="blanc-in" data-id="${q.id}">${esc(b.answers[q.id] ?? "")}</textarea>`}
            </div>`).join("")}
        </div>`).join("")}
    `;
  };

  const bindBlanc = () => {
    document.getElementById("blanc-go")?.addEventListener("click", () => {
      state.blanc = { start: Date.now(), elapsed: 0, running: true, answers: {}, submitted: false };
      save();
      render();
    });
    document.getElementById("blanc-reset")?.addEventListener("click", () => {
      state.blanc = emptyState().blanc;
      save();
      render();
    });
    document.getElementById("blanc-pause")?.addEventListener("click", () => {
      if (state.blanc.running) {
        state.blanc.elapsed = blancElapsed();
        state.blanc.running = false;
        state.blanc.start = null;
      } else {
        state.blanc.start = Date.now();
        state.blanc.running = true;
      }
      save();
      render();
    });
    document.getElementById("blanc-end")?.addEventListener("click", () => {
      document.querySelectorAll(".blanc-in").forEach((el) => {
        state.blanc.answers[el.dataset.id] = el.value;
      });
      state.blanc.elapsed = blancElapsed();
      state.blanc.running = false;
      state.blanc.submitted = true;
      save();
      render();
    });
    document.querySelectorAll(".blanc-in").forEach((el) => {
      el.addEventListener("change", () => {
        state.blanc.answers[el.dataset.id] = el.value;
        save();
      });
    });
    document.querySelectorAll("input[type=radio]").forEach((el) => {
      el.addEventListener("change", () => {
        state.blanc.answers[el.name] = Number(el.value);
        save();
      });
    });
    const timer = document.getElementById("blanc-timer");
    if (timer && state.blanc.running) {
      window._blancTick && clearInterval(window._blancTick);
      window._blancTick = setInterval(() => {
        const left = 4 * 3600 * 1000 - blancElapsed();
        timer.textContent = fmtTime(left);
        if (left <= 0) {
          clearInterval(window._blancTick);
          document.getElementById("blanc-end")?.click();
        }
      }, 1000);
    }
  };

  const viewTransfert = () => `
    <div class="hero">
      <div class="kicker">Palier 5</div>
      <h1>Changer d’annale.</h1>
      <p>Si vous réussissez le blanc sujet 0, vous avez appris <em>un</em> sujet. Le jury changera le support. Ce qui reste : lire le DT, isoler un modèle, conclure.</p>
    </div>
    <div class="grid cols-2">
      ${TRANSFERT.map((t) => `<article class="card">
        <span class="tag">${esc(t.session)}</span>
        <h3>${esc(t.support)}</h3>
        <p><strong>On réinvestit.</strong> ${esc(t.keep)}</p>
        <p><strong>On apprend.</strong> ${esc(t.new)}</p>
      </article>`).join("")}
    </div>
    <div class="card" style="margin-top:1rem">
      <p>Après cette annale, ouvrez le parcours 2025 (transbordeur) ou 2024 (presse) : la méthode est la même, le métier change. Ne mémorisez pas 834 m³/h par cœur.</p>
    </div>`;

  const viewFormules = () => `
    <article class="paper">
      <h2>Carnet de formules — E4 Sujet 0</h2>
      <table>
        <tr><th>Besoin</th><th>Formule</th></tr>
        <tr><td>Courant triphasé</td><td><span class="formule">I = P<sub>u</sub> / (η √3 U cos φ)</span></td></tr>
        <tr><td>Plaque Δ / Y</td><td>U<sub>Y</sub> / U<sub>Δ</sub> = √3 · I<sub>Y</sub> = I<sub>Δ</sub> / √3</td></tr>
        <tr><td>FR1 (enroulements en série)</td><td>I plaque Y (75,6 A), pas I de ligne Δ</td></tr>
        <tr><td>Débit VSD</td><td><span class="formule">(Q<sub>pointe</sub> / 2) × 1,2</span></td></tr>
        <tr><td>Poids</td><td><span class="formule">P = m g</span> (g = 9,81 puis Fz = 20 000 N)</td></tr>
        <tr><td>Mf charge milieu</td><td><span class="formule">M<sub>f</sub> = F L / 4</span> (N·mm)</td></tr>
        <tr><td>Mf poids propre</td><td><span class="formule">M<sub>f</sub> = q L / 8</span> (q = poids total, L en mm)</td></tr>
        <tr><td>Contrainte</td><td><span class="formule">σ = M<sub>f</sub> / W</span> · <span class="formule">σ<sub>adm</sub> = Re / S</span></td></tr>
        <tr><td>Câble (ce sujet)</td><td><span class="formule">I′<sub>z</sub> = I<sub>z</sub> / K</span> · K = K1 K2 K3 · lettre F</td></tr>
        <tr><td>Chute de tension</td><td>% = (L / 100) × %<sub>100 m</sub> · total &lt; 8 % (force motrice, poste privé)</td></tr>
      </table>
      <h3>Données du sujet à avoir sous les yeux</h3>
      <table>${DATA_SUJET.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</table>
    </article>`;

  const viewProf = () => `
    <article class="paper">
      <h2>Espace enseignant</h2>
      <p>Ce site est conçu pour tourner tout seul en salle info ou à la maison. Votre plus-value : la plaque Δ/Y au tableau, le piège FR1 = 75,6 A, et I′z = Iz / K (convention inverse des annales 2024 / NC 2025).</p>
      <h3>Usage type</h3>
      <ol>
        <li>Semaine 1 : 20 min de présentation de la centrale (500 vs 1 390 m³/h), puis diagnostic en silence.</li>
        <li>Les étudiants suivent les pastilles rouges. Vous ne recalculez plus 131 A à la chaîne.</li>
        <li>Une séance salle sur DT5–DT7 (étoile-triangle, FR1, P7) et une sur DT20 + DT27 (flexion + lettre F).</li>
        <li>Blanc surveillé (PDF officiel + site, ou PDF seul).</li>
        <li>30 min de copies types, puis transfert 2024 (même K, autre formule I′z).</li>
      </ol>
      <h3>Trois pièges à traiter en classe</h3>
      <p><strong>FR1 = 75,6 A, pas 131 A.</strong> Le relais est en série avec les enroulements. LC1 D80 / D50 sont justes ; il manque P7 (230 V).</p>
      <p><strong>47,34 ≤ 55, mais seulement en N·mm et avec W = 324 000 mm³.</strong> FL/4 pour la charge, qL/8 pour la poutre. Ne pas appliquer 19 022 N à la suite : le sujet impose 20 000 N.</p>
      <p><strong>I′z = Iz / K sur ce sujet.</strong> 250 / 0,8692 ≈ 284 A → 120 mm². La convention 2024 / NC 2025 (I′z = Iz · K) « valide » le 70 mm² à tort. Solution économique : Ir = 175 A, trop juste pour C3 (180 A).</p>
      <h3>Hébergement</h3>
      <p>Depuis la racine du dépôt :</p>
      <p><span class="formule">python -m http.server 5500</span> puis ouvrir <span class="formule">http://127.0.0.1:5500/e4/sujet-0/</span></p>
      <p>La progression est stockée dans le navigateur de l’élève, clé <span class="formule">prepa-e4-sujet-0-v1</span> (séparée des autres annales). En salle, prévoir un poste par étudiant ou un profil navigateur.</p>
      <p class="tiny">Les corrigés complets sont dans les fiches, le DQR et le blanc. Ne pas projeter l’espace enseignant pendant le blanc.</p>
    </article>`;

  const titles = {
    home: "Accueil",
    diagnostic: "Diagnostic",
    competences: "Carte de compétences",
    fiches: "Fiches méthode",
    exercices: "Micro-exercices",
    dqr: "DQR guidé",
    blanc: "Blanc 4 h",
    transfert: "Transfert",
    formules: "Carnet de formules",
    prof: "Espace enseignant",
  };

  function render() {
    if (window._blancTick) {
      clearInterval(window._blancTick);
      window._blancTick = null;
    }
    const { path, id, extra } = parseHash();
    $title.textContent = titles[path] || "Prépa E4 Sujet 0";
    drawNav(path);
    closeMenu();
    if (path === "home") $app.innerHTML = viewHome();
    else if (path === "diagnostic") { $app.innerHTML = viewDiagnostic(); bindDiagnostic(); }
    else if (path === "competences") $app.innerHTML = viewCompetences();
    else if (path === "fiches" && id) $app.innerHTML = viewFiche(id);
    else if (path === "fiches") $app.innerHTML = viewFiches();
    else if (path === "exercices" && id) { $app.innerHTML = viewExercice(id); bindExercice(id); }
    else if (path === "exercices") $app.innerHTML = viewExercices();
    else if (path === "dqr" && id) { $app.innerHTML = viewDqrPart(id, extra || id && DQR.find((p) => p.id === id)?.questions[0].id); bindDqr(id, extra); }
    else if (path === "dqr") $app.innerHTML = viewDqrList();
    else if (path === "blanc") { $app.innerHTML = viewBlanc(); bindBlanc(); }
    else if (path === "transfert") $app.innerHTML = viewTransfert();
    else if (path === "formules") $app.innerHTML = viewFormules();
    else if (path === "prof") $app.innerHTML = viewProf();
    else $app.innerHTML = viewHome();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  if (!location.hash) location.hash = "#/";
  render();
})();
