/* Contenu pédagogique — Prépa E4 2025 (transbordeur Stellantis Sochaux) */
window.PREPA = (() => {
  const SKILLS = [
    { id: "cadence", part: 1, name: "Cadence & taux de charge", short: "Pauses, cycle, marge" },
    { id: "statique", part: 2, name: "Poids, adhérence, frottement", short: "μ_a ≠ μ_frot" },
    { id: "incline", part: 2, name: "Plan incliné 12°", short: "Psinα, N = Pcosα" },
    { id: "couple", part: 2, name: "Couple & doigt de retaquage", short: "C = F · r" },
    { id: "frein", part: 2, name: "Chaîne de couples & frein", short: "i, η, même arbre" },
    { id: "cinematique", part: 3, name: "Pignon-crémaillère & ω", short: "V = rω" },
    { id: "variateur", part: 3, name: "Variateur ATV 312", short: "Choix, Ith, LI" },
    { id: "mesure", part: 4, name: "4–20 mA & API", short: "Droite, mot image" },
  ];

  const DATA_2025 = [
    ["Masse {luge + ancienne caisse}", "680 kg"],
    ["Surmasse nouvelles caisses", "+200 kg"],
    ["g (donné)", "10 m·s⁻²"],
    ["μ_adh acier/acier", "0,2"],
    ["μ_frot acier/acier", "0,1"],
    ["Angle de basculement", "12°"],
    ["sin 12° / cos 12°", "0,208 / 0,978"],
    ["Force doigt (nouvelles caisses)", "950 N"],
    ["Bras d’action du doigt", "177 mm"],
    ["Ø primitif pignon balancelle", "48 mm"],
    ["V ouverture pince", "0,2 m·s⁻¹"],
    ["Motoréducteur balancelle", "0,37 kW · 1380 / 126 tr·min⁻¹"],
    ["Motoréducteur retaquage", "0,37 kW · 1380 / 13 · i = 104,37 · η = 0,76"],
    ["Frein (arbre moteur)", "5 N·m (400 V AC)"],
    ["Couple de sortie 50 Hz", "265 N·m (capacité réducteur)"],
    ["Engrenage 1", "Z_P = 42 · Z_R = 55 · η = 0,98"],
    ["Pignons doigts", "Z = 36 / 36 · r₂ = 1 · η = 0,98"],
    ["Cadence demandée", "960 véh./j"],
    ["Temps de cycle (essais)", "52 s"],
    ["Télémètre", "SICK DT500 · 4–20 mA · 1,0 à 2,5 m"],
  ];

  const svgHoriz = `
  <svg class="schema" viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="130" y="48" width="170" height="80" fill="#f3e2b0" stroke="#2a2412" stroke-width="2"/>
    <text x="215" y="95" text-anchor="middle" font-size="14" fill="#2a2412">G</text>
    <line x1="40" y1="128" x2="420" y2="128" stroke="#5b4a32" stroke-width="6"/>
    <line x1="215" y1="88" x2="215" y2="168" stroke="#c4473a" stroke-width="2.4" marker-end="url(#ah)"/>
    <text x="226" y="168" fill="#c4473a" font-size="14">P</text>
    <line x1="215" y1="128" x2="215" y2="28" stroke="#2f9e6b" stroke-width="2.4" marker-end="url(#ah)"/>
    <text x="226" y="30" fill="#1f7a50" font-size="14">N</text>
    <line x1="130" y1="88" x2="70" y2="88" stroke="#3b6ea5" stroke-width="2.4" marker-end="url(#ah)"/>
    <text x="48" y="80" fill="#3b6ea5" font-size="14">F</text>
    <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
  </svg>`;

  const svgIncline = `
  <svg class="schema" viewBox="0 0 540 255" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <marker id="arrP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c4473a"/></marker>
      <marker id="arrN" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f7a50"/></marker>
      <marker id="arrT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3b6ea5"/></marker>
      <marker id="arrAx" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5b4a32"/></marker>
    </defs>
    <polygon points="40,95 500,193 40,193" fill="#efe7d6" stroke="#5b4a32" stroke-width="2.5"/>
    <line x1="40" y1="95" x2="175" y2="95" stroke="#5b4a32" stroke-width="1.2" stroke-dasharray="5 4"/>
    <path d="M 108,95 A 68,68 0 0 1 105.1,109.4" fill="none" stroke="#5b4a32" stroke-width="1.3"/>
    <text x="118" y="118" fill="#5b4a32" font-size="14">α = 12°</text>
    <polygon points="226.9,65.3 359.9,93.5 345.7,160.1 212.7,131.9" fill="#f3e2b0" stroke="#2a2412" stroke-width="2"/>
    <circle cx="286.3" cy="112.7" r="3.2" fill="#2a2412"/>
    <text x="268" y="108" fill="#2a2412" font-size="14" font-weight="700">G</text>
    <line x1="286.3" y1="112.7" x2="286.3" y2="198" stroke="#c4473a" stroke-width="2.4" marker-end="url(#arrP)"/>
    <text x="296" y="204" fill="#c4473a" font-size="14" font-weight="700">P</text>
    <line x1="286.3" y1="112.7" x2="362" y2="129" stroke="#3b6ea5" stroke-width="2.4" marker-end="url(#arrT)"/>
    <text x="366" y="148" fill="#3b6ea5" font-size="14" font-weight="700">P sin α</text>
    <line x1="286.3" y1="112.7" x2="302" y2="42" stroke="#1f7a50" stroke-width="2.4" marker-end="url(#arrN)"/>
    <text x="308" y="38" fill="#1f7a50" font-size="14" font-weight="700">N = P cos α</text>
    <line x1="448" y1="182" x2="492" y2="191.4" stroke="#5b4a32" stroke-width="1.5" marker-end="url(#arrAx)"/>
    <text x="478" y="210" fill="#5b4a32" font-size="13">x₁</text>
    <line x1="448" y1="182" x2="456.7" y2="141" stroke="#5b4a32" stroke-width="1.5" marker-end="url(#arrAx)"/>
    <text x="462" y="138" fill="#5b4a32" font-size="13">y₁</text>
  </svg>`;

  const DIAGNOSTIC = [
    { id: "d1", skill: "cadence",
      q: "Un système a un temps de cycle de 52 s. Combien de cycles complets peut-il réaliser en 1 heure de fonctionnement continu ?",
      choices: ["52", "environ 69", "120", "960"], ok: 1,
      why: "3600 / 52 ≈ 69,2 → 69 cycles complets." },
    { id: "d2", skill: "cadence",
      q: "Le taux de charge d’une installation se calcule typiquement par :",
      choices: ["temps d’arrêt / temps de fonctionnement", "cadence demandée / capacité maximale", "masse transportée / masse max admissible", "puissance moteur / puissance réseau"], ok: 1,
      why: "τ = cadence demandée / N_max. Ici 960 / N_max." },
    { id: "d3", skill: "cadence",
      q: "Une marge de taux de charge (installation non saturée) peut servir notamment à :",
      choices: ["Augmenter la masse unitaire sans frein", "Réaliser de la maintenance corrective sans perdre la cadence", "Supprimer les capteurs de position", "Réduire le coefficient d’adhérence"], ok: 1,
      why: "C’est exactement l’esprit de Q.1-4 / Q.1-5 du sujet 2025." },
    { id: "d4", skill: "statique",
      q: "Avec m = 680 kg et g = 10 m·s⁻², le poids P vaut :",
      choices: ["68 N", "680 N", "6800 N", "68 000 N"], ok: 2,
      why: "P = m g = 680 × 10 = 6800 N. Ne pas oublier g = 10 (donné)." },
    { id: "d5", skill: "statique",
      q: "Sur un plan horizontal, la normale N au contact (solide posé, équilibre vertical) est :",
      choices: ["Nulle", "Égale à μ · P", "Égale au poids P", "Égale à P sin α"], ok: 2,
      why: "Équilibre vertical : N = P. μ n’intervient que sur la tangente." },
    { id: "d6", skill: "statique",
      q: "La force minimale pour vaincre l’adhérence et démarrer le glissement (plan horizontal) est :",
      choices: ["μ_frot · P", "μ_adh · P", "P / μ_adh", "μ_adh / μ_frot"], ok: 1,
      why: "Au démarrage on utilise μ_adh. Ici 0,2 × 6800 = 1360 N." },
    { id: "d7", skill: "statique",
      q: "Une fois le glissement établi, la force de frottement (plan horizontal) est :",
      choices: ["μ_adh · P", "μ_frot · P", "P", "0"], ok: 1,
      why: "Glissement établi → μ_frot. Ici 0,1 × 6800 = 680 N." },
    { id: "d8", skill: "incline",
      q: "Sur un plan incliné d’un angle α, la composante du poids parallèle au plan (tendance à faire glisser) est :",
      choices: ["P cos α", "P sin α", "P tan α", "P / sin α"], ok: 1,
      why: "Parallèle au plan : P sin α. Perpendiculaire : P cos α = N." },
    { id: "d9", skill: "incline",
      q: "Si P sin α > μ_adh · P cos α, sans retenue mécanique la charge :",
      choices: ["Reste forcément immobile", "A tendance à glisser", "Lévite", "Ne peut glisser que si α > 45°"], ok: 1,
      why: "La composante motrice dépasse l’adhérence disponible. C’est Q.2-1-3." },
    { id: "d10", skill: "couple",
      q: "Le rôle principal des doigts de retaquage lorsque la table bascule à 12° est :",
      choices: ["Uniquement décoratif", "Positionner / retenir la luge pour empêcher le glissement", "Alimenter le motoréducteur en 400 V", "Mesurer la distance de la balancelle"], ok: 1,
      why: "Ils retiennent {luge + caisse} qui tend à glisser sur la table inclinée." },
    { id: "d11", skill: "couple",
      q: "Le couple résistant créé par une force F appliquée à une distance r de l’axe est :",
      choices: ["C = F / r", "C = F · r", "C = F · 2r (toujours le diamètre)", "C = m g r²"], ok: 1,
      why: "C = F · r. r = 177 mm = 0,177 m — jamais le diamètre 48 mm du pignon." },
    { id: "d12", skill: "frein",
      q: "Un mécanisme de transmission non irréversible :",
      choices: ["Se bloque toujours seul sous charge", "Peut reculer sous l’effet de la charge → un frein est souvent nécessaire", "N’a jamais d’engrenages", "A un rendement nul"], ok: 1,
      why: "Le motoréducteur à couple conique du sujet n’est pas irréversible : d’où le frein." },
    { id: "d13", skill: "frein",
      q: "Pour comparer frein disponible et besoin, on raisonne en général en :",
      choices: ["Ampères uniquement", "Couples (N·m) ramenés sur le même arbre", "Litres d’huile", "Décibels"], ok: 1,
      why: "Toujours le même arbre, en N·m, avec i et η." },
    { id: "d14", skill: "frein",
      q: "Avec un pignon menant Z_P = 42 et une roue menée Z_R = 55, le rapport i = Z_R / Z_P vaut environ :",
      choices: ["0,76", "1,31", "42", "97"], ok: 1,
      why: "55 / 42 ≈ 1,31. L’autre rapport 42/55 ≈ 0,76 est N_menée / N_menante." },
    { id: "d15", skill: "cinematique",
      q: "Pour un système pignon–crémaillère, la vitesse linéaire de la crémaillère est :",
      choices: ["V = ω / r", "V = r · ω", "V = 2π r / ω", "V = ω² r"], ok: 1,
      why: "Rappel écrit dans le sujet Q.3 : V = r ω, avec r le rayon primitif." },
    { id: "d16", skill: "cinematique",
      q: "La relation entre N (tr/min) et ω (rad/s) est :",
      choices: ["ω = 2π N", "ω = (2π N) / 60", "ω = 60 N / (2π)", "ω = N / 60"], ok: 1,
      why: "Un tour = 2π rad, une minute = 60 s." },
    { id: "d17", skill: "variateur",
      q: "Un moteur asynchrone tourne à 1380 tr/min sous 50 Hz. Pour environ la moitié de cette vitesse (glissement négligé), on règle le variateur à :",
      choices: ["100 Hz", "50 Hz", "25 Hz", "5 Hz"], ok: 2,
      why: "N ∝ f. Moitié de 50 Hz → 25 Hz." },
    { id: "d18", skill: "variateur",
      q: "Pour choisir un variateur ATV 312 dans le catalogue, les deux premiers critères sont :",
      choices: ["Couleur du boîtier et masse", "Puissance moteur et tension du réseau", "Marque de l’API et longueur du câble", "Indice IP du télémètre"], ok: 1,
      why: "Ici 0,37 kW et 400 V triphasé. Le reste (calibre, CEM) vient ensuite." },
    { id: "d19", skill: "mesure",
      q: "Un signal de capteur 4–20 mA est un signal :",
      choices: ["Numérique tout-ou-rien", "Analogique de courant normalisé", "De puissance triphasée 400 V", "De freinage moteur"], ok: 1,
      why: "Courant analogique normalisé, robuste aux parasites de ligne." },
    { id: "d20", skill: "mesure",
      q: "Un convertisseur analogique-numérique 12 bits peut distinguer, au maximum :",
      choices: ["12 valeurs", "1024 valeurs", "4096 valeurs", "12 000 valeurs"], ok: 2,
      why: "2¹² = 4096 combinaisons (0 à 4095). Attention : le sujet configure ensuite 0 à 1023." },
  ];

  const FICHES = [
    {
      id: "cadence",
      title: "Cadence, pauses et taux de charge",
      skill: "cadence",
      html: `
        <p>La partie 1 du sujet 2025 tient en 25 minutes si la méthode est mécanique. Tout se lit dans <strong>DT1</strong>.</p>
        <h3>Méthode en 4 lignes</h3>
        <ol>
          <li>Relever le temps brut (2 tournées de 8 h).</li>
          <li>Retrancher <em>toutes</em> les pauses de <em>chaque</em> tournée.</li>
          <li>Convertir en secondes, puis N<sub>max</sub> = t<sub>utile</sub> / t<sub>cycle</sub>.</li>
          <li>τ = cadence demandée / N<sub>max</sub>. La marge sert à la maintenance corrective.</li>
        </ol>
        <div class="trap"><strong>Piège 2025.</strong> Chaque tournée a 2 pauses de 10 min <em>et</em> 1 pause de 20 min. Deux tournées → 2 × 40 min = 80 min de pauses, pas 40. Temps utile = 960 − 80 = <strong>880 min</strong>.</div>
        <p>Exemple voisin (pas le résultat d’examen) : 1 poste de 7 h avec 30 min de pause, cycle 60 s → t<sub>utile</sub> = 390 min = 23 400 s → N<sub>max</sub> = 390 cycles.</p>
        <div class="okbox">Q.1-4 attend des <em>usages</em> de la marge : maintenance corrective, aléas, essais d’un nouveau modèle — pas « augmenter μ ».</div>
      `,
    },
    {
      id: "statique",
      title: "Poids, adhérence, frottement",
      skill: "statique",
      html: `
        ${svgHoriz}
        <p>Les rouleaux de la table sont <strong>bloqués</strong> tant que la luge est en position. Il n’y a donc <em>pas de roulement</em> : contact avec adhérence puis frottement.</p>
        <table>
          <tr><th>Instant</th><th>Coefficient</th><th>Formule (plan horizontal)</th></tr>
          <tr><td>Avant glissement (démarrage)</td><td>μ<sub>adh</sub> = 0,2</td><td><span class="formule">F<sub>adh</sub> = μ<sub>adh</sub> · N = μ<sub>adh</sub> · P</span></td></tr>
          <tr><td>Glissement établi</td><td>μ<sub>frot</sub> = 0,1</td><td><span class="formule">F<sub>frot</sub> = μ<sub>frot</sub> · N = μ<sub>frot</sub> · P</span></td></tr>
        </table>
        <div class="trap"><strong>Piège 2025.</strong> μ<sub>adh</sub> ≥ μ<sub>frot</sub> toujours. Confondre les deux inverse Q.2-1-1 et Q.2-1-4. Et P = m g avec <em>g = 10</em>, pas 9,81.</div>
        <p>Application type : m = 680 kg → P = 6800 N → F<sub>adh</sub> = 1360 N → F<sub>frot</sub> = 680 N.</p>
      `,
    },
    {
      id: "incline",
      title: "Plan incliné à 12°",
      skill: "incline",
      html: `
        ${svgIncline}
        <p>Dès que la table bascule, on change de base. On projette <strong>avant</strong> de calculer.</p>
        <table>
          <tr><th>Grandeur</th><th>Formule</th><th>Rôle</th></tr>
          <tr><td>Composante parallèle</td><td><span class="formule">P sin α</span></td><td>Tend à faire glisser</td></tr>
          <tr><td>Normale</td><td><span class="formule">N = P cos α</span></td><td>Appui sur la table</td></tr>
          <tr><td>Adhérence max</td><td><span class="formule">μ<sub>adh</sub> N</span></td><td>S’oppose au démarrage</td></tr>
        </table>
        <p>Test de glissement : si <span class="formule">P sin α &gt; μ<sub>adh</sub> P cos α</span> → ça glisse, un doigt est nécessaire.</p>
        <div class="trap"><strong>Piège 2025.</strong> Q.2-1-3 demande de comparer P sin 12° à la F<sub>adh</sub> <em>horizontale</em> de Q.2-1-1 (1414 N vs 1360 N). Le raisonnement rigoureux recalcule N = P cos 12° ≈ 6650 N puis F<sub>adh</sub> ≈ 1330 N. Les deux conclusions sont les mêmes : ça glisse. Mentionner N = P cos α rapporte des points de méthode.</div>
        <p>Valeurs utiles : sin 12° ≈ 0,208 · cos 12° ≈ 0,978.</p>
      `,
    },
    {
      id: "couple",
      title: "Doigt de retaquage et couple",
      skill: "couple",
      html: `
        <p>Le doigt avant retient la charge qui glisse. La force sur le doigt, suivant le plan, est le <em>reste</em> une fois le frottement déduit :</p>
        <p><span class="formule">F<sub>doigt</sub> = P sin α − μ<sub>frot</sub> · P cos α</span></p>
        <p>Anciennes caisses : ≈ 1414 − 665 ≈ <strong>749 N</strong>. Pour les nouvelles, le sujet <em>donne</em> 950 N (ne pas recalculer).</p>
        <p>Passage force → couple sur l’axe du doigt :</p>
        <p><span class="formule">C = F · r</span> avec r = 177 mm = <strong>0,177 m</strong> → C ≈ 950 × 0,177 ≈ <strong>168 N·m</strong>.</p>
        <div class="trap"><strong>Piège 2025.</strong> 177 mm n’est pas 177 m. Ce n’est pas non plus le diamètre 48 mm du pignon de balancelle (autre partie). Un oubli de 10³ et le frein « ne suffit plus ».</div>
      `,
    },
    {
      id: "frein",
      title: "Chaîne de couples, rendements, frein",
      skill: "frein",
      html: `
        <p>Le motoréducteur à couple conique <strong>n’est pas irréversible</strong> : sans frein, la charge peut reculer. On vérifie que le frein actuel retient les nouvelles caisses.</p>
        <h3>Lire le DT5 sans se tromper</h3>
        <table>
          <tr><th>Ligne catalogue</th><th>Valeur</th><th>Sens</th></tr>
          <tr><td>Rapport de réduc. total [i]</td><td>104,37</td><td>À relever (Q.2-2-2)</td></tr>
          <tr><td>Couple de sortie 50 Hz</td><td>265 N·m</td><td>Capacité du réducteur en marche, <em>pas</em> le frein</td></tr>
          <tr><td>Frein · 400 AC / couple</td><td><strong>5 N·m</strong></td><td>Couple de freinage sur l’<em>arbre moteur</em></td></tr>
          <tr><td>η<sub>mot</sub></td><td>0,76</td><td>DT6</td></tr>
        </table>
        <p>On remonte le couple de freinage disponible vers le doigt, <strong>toujours sur le même arbre</strong> pour comparer :</p>
        <ol>
          <li>Sortie motoréducteur : <span class="formule">C<sub>rs</sub> = 5 × 104,37 × 0,76 ≈ 397 N·m</span></li>
          <li>Doigt arrière (i<sub>1</sub> = 55/42, η = 0,98) : <span class="formule">C<sub>ar</sub> = C<sub>rs</sub> × 1,31 × 0,98</span></li>
          <li>Doigt avant (r<sub>2</sub> = 1, η = 0,98) : <span class="formule">C<sub>av</sub> = C<sub>ar</sub> × 0,98</span></li>
          <li>Comparer C<sub>av</sub> (≈ 499 N·m) à C<sub>besoin</sub> (168 N·m) → le frein suffit.</li>
        </ol>
        <div class="trap"><strong>Piège 2025.</strong> Prendre 265 N·m comme couple de frein fait rater Q.2-2-2 et toute la chaîne. 265 est le couple de sortie nominal à 50 Hz.</div>
      `,
    },
    {
      id: "cinematique",
      title: "Pignon-crémaillère et vitesses",
      skill: "cinematique",
      html: `
        <p>Le sujet écrit les formules. Il n’y a plus qu’à enchaîner les unités.</p>
        <table>
          <tr><th>Étape</th><th>Formule</th></tr>
          <tr><td>Rayon primitif</td><td><span class="formule">r = d / 2 = 48 / 2 = 24 mm = 0,024 m</span></td></tr>
          <tr><td>Vitesse angulaire</td><td><span class="formule">ω = V / r</span> (V = 0,2 m·s⁻¹)</td></tr>
          <tr><td>Fréquence de rotation</td><td><span class="formule">N = (ω × 60) / (2π)</span> en tr/min</td></tr>
          <tr><td>Traversée du réducteur</td><td><span class="formule">N<sub>moteur</sub> = N<sub>sortie</sub> × (1380 / 126)</span></td></tr>
          <tr><td>Fréquence variateur</td><td><span class="formule">f = 50 × N<sub>moteur</sub> / 1380</span></td></tr>
        </table>
        <p>Ordre de grandeur attendu : ω ≈ 8,33 rad/s · N<sub>sr</sub> ≈ 80 tr/min · N<sub>sm</sub> ≈ 872 tr/min · f ≈ 31,6 Hz.</p>
        <div class="trap"><strong>Piège 2025.</strong> Oublier de passer 24 mm en mètres donne un ω 1000 fois trop grand. Le 1380/126 est le rapport du motoréducteur de <em>balancelle</em> (DT4), pas le 1380/13 du retaquage.</div>
      `,
    },
    {
      id: "variateur",
      title: "Choisir et régler l’ATV 312",
      skill: "variateur",
      html: `
        <p>On ne « sent » pas le variateur : on lit DT10 (choix), DT11 (départ-moteur), DT12 (paramètres), DT8–DT9 (schéma).</p>
        <h3>Choix</h3>
        <ol>
          <li>Puissance moteur : <strong>0,37 kW</strong>.</li>
          <li>Réseau : <strong>400 V triphasé</strong> → tableau 380…500 V.</li>
          <li>Référence catalogue : ATV312H037N4 (filtre CEM intégré).</li>
        </ol>
        <p>Le magasin a un ATV312H075N4 (0,75 kW, même tension). Il est <em>surlarge</em> mais convient : In de sortie plus élevé, on peut quand même régler Ith = I<sub>n</sub> moteur.</p>
        <h3>Repères du schéma (Q.3-7)</h3>
        <table>
          <tr><th>Repère</th><th>Désignation</th><th>Rôle</th></tr>
          <tr><td>QFBR93</td><td>Disjoncteur</td><td>Protéger l’alimentation moteur / variateur</td></tr>
          <tr><td>KMBR93</td><td>Contacteur</td><td>Commander le moteur de balancelle</td></tr>
          <tr><td>QFFR93</td><td>Disjoncteur</td><td>Protéger le circuit du frein</td></tr>
          <tr><td>KMFR93</td><td>Contacteur</td><td>Commander le frein (donné)</td></tr>
        </table>
        <p>Protection thermique : <span class="formule">Ith = I<sub>n</sub> moteur</span> ≈ 1,3 A (400 V étoile). Plage 0,2 I<sub>n sortie</sub> à 1,5 I<sub>n sortie</sub> : vérifier que 1,3 A est dedans.</p>
        <p>LI1 = marche avant · LI2 = marche arrière · LI3 et LI4 désactivées → consigne par potentiomètre (0–50 Hz).</p>
        <div class="trap"><strong>Piège 2025.</strong> Choisir un ATV monophasé 200–240 V alors que le réseau usine est du 400 V tri. Lire le <em>bandeau</em> du tableau DT10.</div>
      `,
    },
    {
      id: "mesure",
      title: "Télémètre 4–20 mA et API",
      skill: "mesure",
      html: `
        <p>Le télémètre SICK est configuré de <strong>1,0 m à 2,5 m</strong> → <strong>4 mA à 20 mA</strong>. C’est une droite affine.</p>
        <p><span class="formule">I = 4 + 16 × (L − 1,0) / (2,5 − 1,0)</span> avec L en mètres, I en mA.</p>
        <p>Exemple (distance fermée 1400 mm = 1,4 m) : I = 4 + 16 × 0,4 / 1,5 ≈ <strong>8,27 mA</strong>.</p>
        <h3>Numérique</h3>
        <ul>
          <li>Carte 12 bits → 2¹² = 4096 codes (0 à 4095) : Q.4-4.</li>
          <li>Ils <em>configurent</em> ensuite 1 m → 0 et 2,5 m → 1023. Ce n’est plus 4095.</li>
          <li><span class="formule">N = 1023 × (L − 1,0) / 1,5</span></li>
        </ul>
        <p>Balancelle ouverte : 1400 + 800 = <strong>2200 mm</strong> → N ≈ 1023 × 1,2 / 1,5 ≈ <strong>818</strong>.</p>
        <h3>Adressage (DT15–DT16)</h3>
        <p>Carte AEY 800 dans le rack d’adresse <strong>2</strong>, position <strong>1</strong>, voie <strong>4</strong> :</p>
        <p><span class="formule">%IW214.4</span> (mot image de l’entrée analogique).</p>
        <p>Condition d’ouverture : <span class="formule">%M16 = 1 si distance mesurée = %MW2180 + %MW2150</span></p>
        <div class="trap"><strong>Piège 2025.</strong> Réflexe « 12 bits = 4095 » sur Q.4-6 / Q.4-9 alors que la config demandée est 0–1023. Et 800 mm n’est pas la distance télémètre : c’est le <em>déplacement</em>, à ajouter aux 1400 mm.</div>
      `,
    },
  ];

  const EXERCICES = [
    { id: "e1", skill: "cadence", title: "Temps utile d’une tournée",
      prompt: "Une tournée dure 8 h, avec 2 pauses de 10 min et 1 pause de 20 min. Quel est le temps de fonctionnement utile, en minutes ?",
      type: "num", unit: "min", value: 440, tol: 0,
      hint: "8 h = 480 min. Retrancher 10+10+20.",
      corr: "480 − 40 = 440 min." },
    { id: "e2", skill: "cadence", title: "Deux tournées — sujet 2025",
      prompt: "Même organisation, deux tournées par jour. Temps de fonctionnement quotidien en minutes ?",
      type: "num", unit: "min", value: 880, tol: 0,
      hint: "Deux fois le résultat de l’exercice précédent. Ne pas compter les pauses une seule fois.",
      corr: "2 × 440 = 880 min (c’est Q.1-1)." },
    { id: "e3", skill: "cadence", title: "Capacité maximale",
      prompt: "Avec 880 min utiles et un cycle de 52 s, combien de véhicules au maximum par jour ? (entier)",
      type: "num", unit: "véh./j", value: 1015, tol: 1,
      hint: "Passer 880 min en secondes, puis diviser par 52.",
      corr: "880 × 60 = 52 800 s ; 52 800 / 52 ≈ 1015,4 → 1015 cycles complets." },
    { id: "e4", skill: "cadence", title: "Taux de charge",
      prompt: "Cadence demandée 960 véh./j, N_max = 1015. Taux de charge en % (un chiffre après la virgule accepté, ex. 94,6).",
      type: "num", unit: "%", value: 94.6, tol: 0.4,
      hint: "τ = 960 / 1015 × 100.",
      corr: "960 / 1015 ≈ 0,9458 → 94,6 %." },
    { id: "e5", skill: "statique", title: "Poids",
      prompt: "m = 680 kg, g = 10 m·s⁻². Calculer P en newtons.",
      type: "num", unit: "N", value: 6800, tol: 0,
      hint: "P = m g. g est donné égal à 10.",
      corr: "P = 6800 N." },
    { id: "e6", skill: "statique", title: "Vaincre l’adhérence",
      prompt: "Plan horizontal, μ_adh = 0,2, P = 6800 N. Force minimale pour démarrer le glissement ?",
      type: "num", unit: "N", value: 1360, tol: 2,
      hint: "F = μ_adh × N et N = P à l’horizontal.",
      corr: "0,2 × 6800 = 1360 N." },
    { id: "e7", skill: "statique", title: "Frottement établi",
      prompt: "Même situation, glissement établi, μ_frot = 0,1. Force de frottement ?",
      type: "num", unit: "N", value: 680, tol: 2,
      hint: "On change de coefficient : μ_frot, pas μ_adh.",
      corr: "0,1 × 6800 = 680 N." },
    { id: "e8", skill: "incline", title: "Composante parallèle",
      prompt: "P = 6800 N, α = 12°, sin 12° = 0,208. Calculer P sin α (N).",
      type: "num", unit: "N", value: 1414, tol: 8,
      hint: "Multiplication directe. On accepte 1410 à 1415.",
      corr: "6800 × 0,208 = 1414,4 N." },
    { id: "e9", skill: "incline", title: "Normale sur le plan",
      prompt: "P = 6800 N, cos 12° = 0,978. Calculer N = P cos α (N).",
      type: "num", unit: "N", value: 6650, tol: 15,
      hint: "N n’est plus égal à P dès que le plan est incliné.",
      corr: "6800 × 0,978 = 6650 N environ." },
    { id: "e10", skill: "incline", title: "Est-ce que ça glisse ?",
      prompt: "P sin α = 1414 N et μ_adh · N = 1330 N. Sans doigt, la charge glisse-t-elle ?",
      type: "mcq",
      choices: ["Non, car μ_adh > μ_frot", "Oui, car 1414 > 1330", "Non, 12° est trop petit", "Oui, seulement si g = 9,81"],
      ok: 1,
      hint: "Comparer la composante motrice à l’adhérence disponible sur le plan.",
      corr: "1414 > 1330 : la charge a tendance à glisser. Les doigts sont nécessaires." },
    { id: "e11", skill: "incline", title: "Force sur le doigt",
      prompt: "F_doigt = P sin α − μ_frot N, avec 1414 N et μ_frot N = 665 N. Valeur de F_doigt ?",
      type: "num", unit: "N", value: 749, tol: 8,
      hint: "Le frottement aide le doigt : on le retranche.",
      corr: "1414 − 665 = 749 N (anciennes caisses)." },
    { id: "e12", skill: "couple", title: "Conversion du bras",
      prompt: "Le bras d’action du doigt mesure 177 mm. Quelle valeur utiliser en mètres dans C = F · r ?",
      type: "num", unit: "m", value: 0.177, tol: 0.0005,
      hint: "Diviser par 1000, pas par 100.",
      corr: "177 mm = 0,177 m." },
    { id: "e13", skill: "couple", title: "Couple des nouvelles caisses",
      prompt: "F = 950 N, r = 0,177 m. Calculer le couple résistant sur l’axe du doigt avant (N·m).",
      type: "num", unit: "N·m", value: 168, tol: 2,
      hint: "C = F × r. Ne pas utiliser le diamètre 48 mm.",
      corr: "950 × 0,177 = 168,15 N·m ≈ 168 N·m." },
    { id: "e14", skill: "frein", title: "Couple disponible en sortie réducteur",
      prompt: "Frein = 5 N·m sur l’arbre moteur, i = 104,37, η_mot = 0,76. Calculer C_rs (N·m).",
      type: "num", unit: "N·m", value: 397, tol: 6,
      hint: "C_rs = C_frein × i × η. Ne pas partir de 265 N·m.",
      corr: "5 × 104,37 × 0,76 = 396,6 N·m ≈ 397 N·m." },
    { id: "e15", skill: "frein", title: "Rapport d’engrenage 1",
      prompt: "Z_P = 42 (menant), Z_R = 55 (menée). Calculer i₁ = Z_R / Z_P (arrondi à 2 décimales, ex. 1,31).",
      type: "num", unit: "", value: 1.31, tol: 0.02,
      hint: "Les couples sont multipliés par Z_menée / Z_menante.",
      corr: "55 / 42 ≈ 1,31." },
    { id: "e16", skill: "cinematique", title: "Rayon primitif",
      prompt: "Diamètre primitif 48 mm. Rayon en mètres ?",
      type: "num", unit: "m", value: 0.024, tol: 0.0002,
      hint: "Rayon = diamètre / 2, puis mm → m.",
      corr: "24 mm = 0,024 m." },
    { id: "e17", skill: "cinematique", title: "ω du pignon",
      prompt: "V = 0,2 m·s⁻¹, r = 0,024 m. Calculer ω = V / r (rad·s⁻¹).",
      type: "num", unit: "rad·s⁻¹", value: 8.33, tol: 0.08,
      hint: "Division directe. On accepte 8,3 à 8,4.",
      corr: "0,2 / 0,024 = 8,333 rad·s⁻¹." },
    { id: "e18", skill: "cinematique", title: "Fréquence variateur",
      prompt: "Le moteur tourne à 872 tr/min. À 50 Hz il ferait 1380 tr/min. Quelle fréquence régler (Hz) ?",
      type: "num", unit: "Hz", value: 31.6, tol: 0.4,
      hint: "Proportionnalité : f / 50 = 872 / 1380.",
      corr: "f = 50 × 872 / 1380 ≈ 31,6 Hz." },
    { id: "e19", skill: "variateur", title: "Critères de choix",
      prompt: "Moteur 0,37 kW, réseau 400 V tri. Quelle référence est la plus adaptée dans la gamme ATV 312 (380–500 V, filtre CEM) ?",
      type: "mcq",
      choices: ["ATV312H037M2 (mono 230 V)", "ATV312H037N4", "ATV312HU30N4 (3 kW)", "ATV312H075M2"],
      ok: 1,
      hint: "Même puissance, même famille de tension que le réseau usine.",
      corr: "ATV312H037N4 : 0,37 kW, 380–500 V tri, filtre CEM." },
    { id: "e20", skill: "mesure", title: "Courant à 1,4 m",
      prompt: "4 mA à 1,0 m, 20 mA à 2,5 m. Quel courant (mA) pour L = 1,40 m ?",
      type: "num", unit: "mA", value: 8.27, tol: 0.15,
      hint: "I = 4 + 16 × (1,4 − 1,0) / 1,5.",
      corr: "4 + 16 × 0,4 / 1,5 = 4 + 4,267 = 8,27 mA." },
    { id: "e21", skill: "mesure", title: "Distance balancelle ouverte",
      prompt: "À l’arrêt (pince fermée) le télémètre lit 1400 mm. L’ouverture décale le bras de 800 mm. Distance à mesurer, ouverte ?",
      type: "num", unit: "mm", value: 2200, tol: 0,
      hint: "On ajoute le déplacement à la lecture fermée.",
      corr: "1400 + 800 = 2200 mm." },
    { id: "e22", skill: "mesure", title: "Mot image",
      prompt: "Carte analogique : rack d’adresse 2, position 1, voie 4. Quel est le mot image de l’entrée ?",
      type: "mcq",
      choices: ["%IW102.5", "%QW204.3", "%IW214.4", "%MW2180"],
      ok: 2,
      hint: "Syntaxe DT16 : %IW + rack + position + .voie. I = entrée, W = mot.",
      corr: "%IW214.4 — comme %IW102.5 dans l’exemple, adapté à rack 2, pos. 1, voie 4." },
  ];

  const DQR = [
    {
      id: "p1",
      part: "1",
      title: "Analyse préliminaire",
      duration: "30 min",
      skill: "cadence",
      questions: [
        { id: "q11", code: "Q.1-1", dt: "DT1",
          prompt: "Calculer le temps de fonctionnement du transbordeur par jour (le système est arrêté pendant les pauses).",
          type: "num", unit: "min", value: 880, tol: 0,
          hints: [
            "2 tournées de 8 h. Chaque tournée : 2 × 10 min + 1 × 20 min de pause.",
            "t = 2 × (480 − 40).",
          ],
          corr: "8 h = 480 min, pauses = 40 min/tournée → 440 min. Deux tournées : <strong>880 min</strong> (52 800 s)." },
        { id: "q12", code: "Q.1-2", dt: "aucun (enchaînement)",
          prompt: "Le temps de cycle relevé est de 52 s. Calculer le nombre maximum de véhicules que le système peut transborder par jour.",
          type: "num", unit: "véh./j", value: 1015, tol: 1,
          hints: ["N_max = t_utile / t_cycle. Homogénéiser les unités.", "52 800 / 52."],
          corr: "52 800 / 52 ≈ 1015,4 → <strong>1015</strong> véhicules/jour." },
        { id: "q13", code: "Q.1-3", dt: "aucun",
          prompt: "La cadence nécessaire est de 960 véhicules par jour. Calculer le taux de charge de l’installation (en %).",
          type: "num", unit: "%", value: 94.6, tol: 0.5,
          hints: ["τ = cadence / N_max.", "960 / 1015."],
          corr: "960 / 1015 ≈ 94,6 %." },
        { id: "q14", code: "Q.1-4", dt: "aucun",
          prompt: "Proposer deux axes d’utilisation de la marge résiduelle du taux de charge.",
          type: "text",
          expect: ["maintenance", "corrective", "aléa", "essai"],
          hints: [
            "La question ne demande pas un calcul, mais un usage industriel de la marge.",
            "Penser maintenance et aléas de production, pas « augmenter μ ».",
          ],
          corr: "Maintenance corrective sans perdre les 960 véh./j ; absorption des aléas / essais d’un nouveau modèle / prévention légère en journée." },
        { id: "q15", code: "Q.1-5", dt: "aucun",
          prompt: "Calculer le temps maximum de maintenance corrective que l’on peut effectuer tout en transbordant 960 véhicules par jour (en minutes).",
          type: "num", unit: "min", value: 48, tol: 1,
          hints: ["Temps pour 960 cycles : 960 × 52 s. Le comparer à 880 min.", "52 800 − 49 920 = 880 s = 14,7 min ? Attention : 960 × 52 = 49 920 s = 832 min ; 880 − 832 = 48 min."],
          corr: "960 × 52 = 49 920 s = 832 min. Marge = 880 − 832 = <strong>48 min</strong>." },
      ],
    },
    {
      id: "p21",
      part: "2-1",
      title: "Retaquage — anciennes caisses",
      duration: "45 min",
      skill: "incline",
      questions: [
        { id: "q211", code: "Q.2-1-1", dt: "aucun — données DQR2",
          prompt: "Ensemble {luge + ancienne caisse} à l’horizontal, rouleaux bloqués. Déterminer la force minimale pour vaincre l’adhérence et déplacer selon x. (N)",
          type: "num", unit: "N", value: 1360, tol: 5,
          hints: ["P = m g. N = P à l’horizontal. F = μ_adh N.", "μ_adh = 0,2, pas 0,1."],
          corr: "P = 6800 N ; F<sub>adh</sub> = 0,2 × 6800 = <strong>1360 N</strong>." },
        { id: "q212", code: "Q.2-1-2", dt: "aucun",
          prompt: "La table est maintenant inclinée de 12°. Déterminer la composante sur l’axe x₁ du poids (P sin α), en N.",
          type: "num", unit: "N", value: 1414, tol: 10,
          hints: ["sin 12° ≈ 0,208.", "Ne pas utiliser cos ici : on veut la parallèle au plan."],
          corr: "6800 × 0,208 ≈ <strong>1414 N</strong>." },
        { id: "q213", code: "Q.2-1-3", dt: "aucun",
          prompt: "Comparer Q.2-1-2 et Q.2-1-1 : l’ensemble va-t-il se déplacer seul sur le plan à 12° ? (oui / non, puis une justification courte)",
          type: "text",
          expect: ["oui", "gliss", "1414", "1360"],
          hints: [
            "Comparez 1414 N et 1360 N. Le plus rigoureux recalcule μ_adh · P cos 12° ≈ 1330 N.",
            "Si la composante parallèle dépasse l’adhérence, ça glisse.",
          ],
          corr: "<strong>Oui, ça glisse.</strong> 1414 N > 1360 N (comparaison demandée). Plus rigoureux : N = P cos 12° ≈ 6650 N, F<sub>adh max</sub> ≈ 1330 N &lt; 1414 N." },
        { id: "q214", code: "Q.2-1-4", dt: "aucun",
          prompt: "Retour à l’horizontal, glissement établi. Force minimale pour maintenir le glissement (N).",
          type: "num", unit: "N", value: 680, tol: 5,
          hints: ["Glissement établi → μ_frot = 0,1.", "N = P encore, on est à l’horizontal."],
          corr: "F<sub>frot</sub> = 0,1 × 6800 = <strong>680 N</strong>." },
        { id: "q215", code: "Q.2-1-5", dt: "aucun",
          prompt: "Sur le plan à 12°, frottement s’opposant au glissement. Calculer F_charge/doigt suivant x₁ (N).",
          type: "num", unit: "N", value: 749, tol: 12,
          hints: ["F = P sin α − μ_frot · P cos α.", "μ_frot · N ≈ 0,1 × 6650 = 665 N."],
          corr: "1414 − 665 ≈ <strong>749 N</strong>. Le doigt retient ce qui reste après le frottement." },
      ],
    },
    {
      id: "p22",
      part: "2-2",
      title: "Frein — nouvelles caisses",
      duration: "45 min",
      skill: "frein",
      questions: [
        { id: "q221", code: "Q.2-2-1", dt: "DT6",
          prompt: "Pour les nouvelles caisses, F_charge/doigt = 950 N. Calculer le couple résistant C_r sur l’axe du doigt avant (N·m).",
          type: "num", unit: "N·m", value: 168, tol: 3,
          hints: ["C = F · r avec r = 177 mm lu sur DT6.", "r = 0,177 m."],
          corr: "950 × 0,177 = <strong>168 N·m</strong>." },
        { id: "q222", code: "Q.2-2-2", dt: "DT5",
          prompt: "Relever le rapport de réduction total [i] du motoréducteur. (nombre décimal, ex. 104.37)",
          type: "num", unit: "", value: 104.37, tol: 0.05,
          hints: ["Ligne « Rapport de réduc. total [i] » du catalogue SEW.", "Ne pas prendre 1380/13 = 106, ni 265."],
          corr: "<strong>i = 104,37</strong>. Le couple de frein à relever à côté est <strong>5 N·m</strong> (400 AC / 5), pas 265 N·m." },
        { id: "q223", code: "Q.2-2-3", dt: "DT6",
          prompt: "Avec [i] et η_mot = 0,76, calculer le couple de freinage C_rs disponible sur l’arbre de sortie du motoréducteur (N·m). Frein moteur = 5 N·m.",
          type: "num", unit: "N·m", value: 397, tol: 8,
          hints: ["C_rs = C_frein × i × η_mot.", "5 × 104,37 × 0,76."],
          corr: "5 × 104,37 × 0,76 = <strong>397 N·m</strong> environ." },
        { id: "q224", code: "Q.2-2-4", dt: "DT6",
          prompt: "En tenant compte de r₁ = Z_R/Z_P et η_eng1 = 0,98, calculer C_r ar sur l’arbre du doigt arrière (N·m).",
          type: "num", unit: "N·m", value: 509, tol: 12,
          hints: ["Z_R/Z_P = 55/42 ≈ 1,31.", "C_ar = C_rs × 1,31 × 0,98."],
          corr: "397 × (55/42) × 0,98 ≈ <strong>509 N·m</strong>." },
        { id: "q225", code: "Q.2-2-5", dt: "DT6",
          prompt: "Calculer C_r av disponible sur l’arbre du doigt avant (r₂ = 1, η_eng2 = 0,98), en N·m.",
          type: "num", unit: "N·m", value: 499, tol: 12,
          hints: ["Les deux pignons ont 36 dents : r₂ = 1, mais le rendement reste 0,98.", "C_av = C_ar × 1 × 0,98."],
          corr: "509 × 0,98 ≈ <strong>499 N·m</strong>." },
        { id: "q226", code: "Q.2-2-6", dt: "aucun",
          prompt: "Conclure sur l’aptitude du frein actuel à retenir les nouvelles caisses plus lourdes.",
          type: "text",
          expect: ["suff", "oui", "499", "168"],
          hints: ["Comparer C_av disponible et C_r besoin (Q.2-2-1) sur le même arbre.", "Une phrase : disponible ? besoin ? conclusion."],
          corr: "C<sub>av</sub> ≈ 499 N·m ≫ C<sub>besoin</sub> ≈ 168 N·m. <strong>Le frein actuel est capable</strong> de retenir les nouvelles caisses." },
      ],
    },
    {
      id: "p3",
      part: "3",
      title: "Synchronisation ouverture balancelle",
      duration: "60 min",
      skill: "cinematique",
      questions: [
        { id: "q31", code: "Q.3-1", dt: "DT4",
          prompt: "V = 0,2 m·s⁻¹, d = 48 mm. Calculer ω du pignon de crémaillère (rad·s⁻¹).",
          type: "num", unit: "rad·s⁻¹", value: 8.33, tol: 0.1,
          hints: ["r = 24 mm = 0,024 m.", "ω = V / r."],
          corr: "ω = 0,2 / 0,024 = <strong>8,33 rad·s⁻¹</strong>." },
        { id: "q32", code: "Q.3-2", dt: "DT4",
          prompt: "Calculer N_sr, fréquence de rotation en sortie du motoréducteur (tr·min⁻¹).",
          type: "num", unit: "tr·min⁻¹", value: 79.6, tol: 1,
          hints: ["N = ω × 60 / (2π).", "8,33 × 60 / 6,28."],
          corr: "N<sub>sr</sub> ≈ <strong>79,6 tr/min</strong>." },
        { id: "q33", code: "Q.3-3", dt: "DT4",
          prompt: "Calculer N_sm, fréquence de rotation du moteur (entrée du réducteur, tr·min⁻¹). Rapport 1380/126.",
          type: "num", unit: "tr·min⁻¹", value: 872, tol: 8,
          hints: ["N_sm = N_sr × (1380/126).", "Le 1380/13 est l’autre motoréducteur (retaquage)."],
          corr: "79,6 × 1380 / 126 ≈ <strong>872 tr/min</strong>." },
        { id: "q34", code: "Q.3-4", dt: "aucun",
          prompt: "À 50 Hz le moteur fait 1380 tr/min. Fréquence de réglage du variateur pour N_sm (Hz) ?",
          type: "num", unit: "Hz", value: 31.6, tol: 0.4,
          hints: ["f / 50 = N_sm / 1380."],
          corr: "f = 50 × 872 / 1380 ≈ <strong>31,6 Hz</strong>." },
        { id: "q35", code: "Q.3-5", dt: "DT8, DT9, DT10",
          prompt: "Donner les 2 principaux critères de choix du variateur, puis la référence la plus adaptée (0,37 kW, 400 V tri, CEM).",
          type: "text",
          expect: ["0,37", "400", "H037N4"],
          hints: ["Puissance plaque + tension réseau.", "Tableau 380…500 V avec filtre CEM : ATV312H037N4."],
          corr: "Critères : <strong>P = 0,37 kW</strong> et <strong>réseau 400 V tri</strong>. Référence : <strong>ATV312H037N4</strong>." },
        { id: "q36", code: "Q.3-6", dt: "DT8–DT10",
          prompt: "On a en magasin un ATV312H075N4. Peut-il convenir ? Justifier.",
          type: "text",
          expect: ["oui", "0,75", "surl"],
          hints: ["Même famille 380–500 V, puissance supérieure.", "On pourra régler Ith à I_n moteur."],
          corr: "<strong>Oui.</strong> 0,75 kW ≥ 0,37 kW, même tension. Variateur surdimensionné mais compatible ; Ith = I<sub>n</sub> moteur." },
        { id: "q37", code: "Q.3-8", dt: "DT8, DT9, DT12",
          prompt: "Repère du paramètre de protection thermique du moteur MOBR93, et sa valeur de réglage (A).",
          type: "text",
          expect: ["ith", "1,3"],
          hints: ["Menu SET → Ith = I nominal moteur.", "Plaque 400 Y : 1,3 A (DT4) ou 1,24 A (DT5)."],
          corr: "Paramètre <strong>Ith</strong> = I<sub>n</sub> ≈ <strong>1,3 A</strong> (1,24 A acceptable si on cite DT5)." },
        { id: "q38", code: "Q.3-11", dt: "DT12",
          prompt: "Fonction de LI1, de LI2, et de LI3/LI4 lorsqu’elles sont désactivées.",
          type: "text",
          expect: ["avant", "arrière", "potentiom"],
          hints: ["DT12, paragraphe câblage.", "LI3+LI4 inactives → vitesse par potentiomètre."],
          corr: "LI1 : marche avant. LI2 : marche arrière. LI3/LI4 désactivées : consigne 0–50 Hz par potentiomètre." },
      ],
    },
    {
      id: "p4",
      part: "4",
      title: "Mesure de position de la balancelle",
      duration: "60 min",
      skill: "mesure",
      questions: [
        { id: "q41", code: "Q.4-1", dt: "DT13",
          prompt: "Quelle est la nature du signal transmis par le télémètre à la carte AEY 800 ?",
          type: "text",
          expect: ["4", "20", "analog"],
          hints: ["Sortie courant du DT500, configurée 4–20 mA dans l’énoncé.", "Ce n’est pas un TOR."],
          corr: "Signal <strong>analogique de courant 4–20 mA</strong> (configurable 0–20 mA sur la notice)." },
        { id: "q43", code: "Q.4-3", dt: "DT14 + DQR13",
          prompt: "À l’arrivée, le télémètre mesure 1400 mm (pince fermée). Courant transmis (mA) ? Plage 1,0–2,5 m → 4–20 mA.",
          type: "num", unit: "mA", value: 8.27, tol: 0.15,
          hints: ["L = 1,40 m.", "I = 4 + 16 × (1,4 − 1) / 1,5."],
          corr: "I ≈ <strong>8,27 mA</strong>." },
        { id: "q44", code: "Q.4-4", dt: "aucun",
          prompt: "Le CAN code sur 12 bits. Donner la plage possible de codage en décimal (valeur max).",
          type: "num", unit: "", value: 4095, tol: 0,
          hints: ["2¹² = 4096 combinaisons, de 0 à …", "Ce n’est pas encore la config 0–1023."],
          corr: "0 à <strong>4095</strong>." },
        { id: "q47", code: "Q.4-7", dt: "DT15, DT16",
          prompt: "Mot image de l’entrée analogique : rack adresse 2, position 1, voie 4.",
          type: "mcq",
          choices: ["%IW102.5", "%IW214.4", "%QW214.4", "%I214.4"],
          ok: 1,
          hints: ["I = entrée, W = mot 16 bits, puis rack, position, .voie.", "Exemple DT16 : %IW102.5."],
          corr: "<strong>%IW214.4</strong>." },
        { id: "q48", code: "Q.4-8", dt: "aucun",
          prompt: "Déplacement du bras à l’ouverture : 800 mm. Distance totale mesurée, balancelle ouverte (mm) ?",
          type: "num", unit: "mm", value: 2200, tol: 0,
          hints: ["Ajouter 800 mm à la lecture fermée 1400 mm."],
          corr: "1400 + 800 = <strong>2200 mm</strong>." },
        { id: "q49", code: "Q.4-9", dt: "aucun",
          prompt: "1 m → 0 et 2,5 m → 1023. Valeur numérique à 2200 mm (balancelle ouverte) ?",
          type: "num", unit: "", value: 818, tol: 6,
          hints: ["N = 1023 × (2,2 − 1,0) / 1,5.", "Ne pas utiliser 4095."],
          corr: "1023 × 1,2 / 1,5 ≈ <strong>818</strong>." },
        { id: "q410", code: "Q.4-10", dt: "DT3",
          prompt: "Écrire la condition de mise à 1 de %M16 (pince ouverte).",
          type: "text",
          expect: ["MW2180", "MW2150"],
          hints: ["%MW2180 = distance fermée stockée. %MW2150 = dimension d’ouverture.", "On active %M16 quand la mesure atteint la somme."],
          corr: "<strong>%M16 = 1 si %IW214.4 = %MW2180 + %MW2150</strong> (ou si la distance convertie égale cette somme)." },
      ],
    },
  ];

  const TRANSFERT = [
    {
      session: "2025-11 · Nouvelle-Calédonie",
      support: "Transstockeurs Kloosterboer (−20 °C, déjà sur ce site)",
      keep: "Même esprit E4 : lire le DT, valider une modification, conclure.",
      new: "Schéma de terre TN, disjoncteur (Ir / Ii), section de câble, durée de vie L10 d’un galet, cycle frigorifique.",
    },
    {
      session: "2024-06 · Métropole",
      support: "Presse à compacter ALLTUB",
      keep: "Chaîne de puissance, choix de composant, conclusion chiffrée.",
      new: "Hydraulique (Q = V·S, F = p·S), GRAFCET, électrique triphasé.",
    },
    {
      session: "2023-06 · Métropole",
      support: "Centre de pétrissage Pasquier (déjà sur ce site)",
      keep: "4–20 mA et API : réinvestissement direct de la partie 4 de 2025.",
      new: "Classes d’équivalence, courroies, lubrification motoréducteur.",
    },
    {
      session: "2022-06 · Métropole",
      support: "Ligne de conditionnement Nataïs",
      keep: "Cadence, capacité, disponibilité — même réflexe que la partie 1.",
      new: "SysML, implantation, flux.",
    },
  ];

  const CONTRAT = [
    "On n’ouvre pas le corrigé avant d’avoir écrit une réponse.",
    "Un indice utilisé = la question n’est pas « acquise » (pastille orange).",
    "On ne lance pas le blanc 4 h tant que le diagnostic partie 2 n’est pas au vert, ou au moins à 14/20 au global.",
    "Après le blanc, on change d’annale : retenir 6800 N par cœur ne rapporte rien le jour J suivant.",
  ];

  return { SKILLS, DATA_2025, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT, svgHoriz, svgIncline };
})();
