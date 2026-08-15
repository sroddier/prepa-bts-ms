/* Contenu pédagogique — Prépa E4 2025 NC (transstockeurs Kloosterboer, Harnes, −20 °C) */
window.PREPA = (() => {
  const SKILLS = [
    { id: "terre", part: 1, name: "Schéma TN-C / TN-S", short: "T, N, C, S, défaut" },
    { id: "irii", part: 1, name: "Réglages IR et Ii", short: "200 A / 750 A" },
    { id: "lmax", part: 1, name: "Longueur max du câble", short: "Lmax, V = 230 V" },
    { id: "cable", part: 1, name: "Section et facteurs K", short: "Lettre E, K3 = 0,71" },
    { id: "statique", part: 2, name: "PFS et appuis A/B", short: "P, FA, FB" },
    { id: "galet", part: 2, name: "Rotule, ω, adhérence", short: "Ø 500, T ≤ μN" },
    { id: "cycle", part: 2, name: "Profil de mouvement", short: "t1, +5 %" },
    { id: "l10", part: 3, name: "L10 et joints", short: "(C/P)^k, 0,045 mm" },
  ];

  const DATA_SUJET = [
    ["Site", "Kloosterboer / Harnes · −20 °C"],
    ["Transfo nouvelle partie", "2000 kVA · réseau TNC-S"],
    ["Ib moteur AQ1", "125 A"],
    ["Ancien AQ1", "In = 200 A · IR = 160 A · Ii = 2200 A"],
    ["Nouveau AQ1", "In = 250 A"],
    ["Réglages maintenance", "IR = 0,8 In · Ii = 3 In"],
    ["IR / Ii calculés", "200 A / 750 A"],
    ["Ii retenu pour Lmax", "2250 A"],
    ["Câble AQ1", "4 × 95 mm² Cu · L = 135 m"],
    ["ρ cuivre", "23 × 10⁻³ Ω·mm²·m⁻¹"],
    ["m (rapport sections)", "1"],
    ["Ib / IR (partie câble)", "125 A / 200 A"],
    ["Pose câble", "Multiconducteur · gaine caoutchouc · chemin perforé · 1 circuit · 45 °C"],
    ["Masse ensemble E", "5 t = 5000 kg"],
    ["g", "10 m·s⁻²"],
    ["Poids P", "5,0 × 10⁴ N"],
    ["AG / GB (DR4)", "1,0 m / 1,5 m"],
    ["Galet", "Ø 500 mm"],
    ["V moyenne (ω)", "150 m/min"],
    ["Roulement", "SKF 24122-2CS5/VT143 · C = 540 kN"],
    ["P roulement (sujet)", "3 % de C"],
    ["TA / NA", "2,5 kN / 30 kN"],
    ["Cycle actuel (DT8)", "V = 3 m/s · aller 30 s · AR 70 s · a = 3 m/s²"],
    ["Nouveau mouvement", "a = ±2 m/s² · V = 3 m/s · X = 90 m"],
    ["Tolérance joint", "< 0,2 mm"],
  ];

  const svgCycle = `
  <svg class="schema" viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="30" y1="130" x2="440" y2="130" stroke="#2a2412" stroke-width="1.5"/>
    <line x1="30" y1="130" x2="30" y2="20" stroke="#2a2412" stroke-width="1.5"/>
    <path d="M50,130 L80,40 L380,40 L410,130" stroke="#c4473a" stroke-width="2.5" fill="none"/>
    <text x="8" y="44" font-size="12" fill="#2a2412">V</text>
    <text x="70" y="34" font-size="11" fill="#c4473a">3 m/s</text>
    <text x="55" y="148" font-size="11" fill="#5b4a32">t1=1,5 s</text>
    <text x="200" y="34" font-size="11" fill="#5b4a32">X2=85,5 m · t2=28,5 s</text>
    <text x="360" y="148" font-size="11" fill="#5b4a32">t3=1,5 s</text>
    <text x="160" y="70" font-size="12" fill="#1f7a50">aller = 31,5 s = 30 s + 5 %</text>
  </svg>`;

  const svgAppuis = `
  <svg class="schema" viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="70" y="55" width="300" height="28" fill="#efe7d6" stroke="#2a2412" stroke-width="2"/>
    <circle cx="90" cy="100" r="14" fill="#c9b48a" stroke="#2a2412"/>
    <circle cx="350" cy="100" r="14" fill="#c9b48a" stroke="#2a2412"/>
    <path d="M210,40 L210,70" stroke="#c4473a" stroke-width="2" marker-end="url(#a)"/>
    <text x="218" y="38" font-size="12" fill="#c4473a">P = 50 kN</text>
    <text x="78" y="28" font-size="12" fill="#2a2412">FA = 30 kN</text>
    <text x="318" y="28" font-size="12" fill="#2a2412">FB = 20 kN</text>
    <text x="130" y="140" font-size="12" fill="#5b4a32">1,0 m</text>
    <text x="250" y="140" font-size="12" fill="#5b4a32">1,5 m</text>
    <text x="82" y="118" font-size="11" fill="#2a2412">A</text>
    <text x="344" y="118" font-size="11" fill="#2a2412">B</text>
    <text x="200" y="78" font-size="11" fill="#2a2412">G</text>
  </svg>`;

  const DIAGNOSTIC = [
    { id: "d1", skill: "terre",
      q: "Dans TN-C / TN-S, la lettre T signifie :",
      choices: ["Température", "Terre (neutre relié à la terre au transfo)", "Triphasé uniquement", "Temporisé"], ok: 1,
      why: "T = terre. N = neutre. C = combiné (PEN). S = séparé (PE et N distincts)." },
    { id: "d2", skill: "terre",
      q: "Sur un schéma TN, un défaut d’isolement phase / masse se comporte surtout comme :",
      choices: ["Une simple surcharge thermique", "Un court-circuit (retour par le PE)", "Une coupure du neutre sans courant", "Un défaut 4–20 mA"], ok: 1,
      why: "Le PE ramène le défaut au point neutre mis à la terre : fort courant → déclenchement magnétique (et/ou différentiel)." },
    { id: "d3", skill: "terre",
      q: "QG, QC et INTER désignent typiquement :",
      choices: ["Trois pompes hydrauliques", "Tableau général, coffret, interrupteur-sectionneur", "Trois roulements", "Trois galets"], ok: 1,
      why: "QG = distribution générale. QC = départ / coffret. INTER = isolation / consignation." },
    { id: "d4", skill: "irii",
      q: "IR (long retard) protège surtout contre :",
      choices: ["Le court-circuit franc", "La surcharge (échauffement)", "Le schéma TN-C", "La flexion d’arbre"], ok: 1,
      why: "IR = thermique / surcharge. Ii = magnétique / court-circuit (ou courant de démarrage trop élevé)." },
    { id: "d5", skill: "irii",
      q: "Nouveau disjoncteur In = 250 A, IR = 0,8 In et Ii = 3 In. Les seuils valent :",
      choices: ["160 A et 2200 A", "200 A et 750 A", "125 A et 250 A", "250 A et 2250 A"], ok: 1,
      why: "0,8 × 250 = 200 A ; 3 × 250 = 750 A. 160 / 2200 sont les anciens réglages DT3." },
    { id: "d6", skill: "irii",
      q: "Ib = 125 A. Une surcharge de 20 % fait 150 A. Avec IR = 200 A :",
      choices: ["Le disjoncteur saute forcément", "150 A < 200 A : ce n’est pas la cause des déclenchements", "IR est trop bas", "Il faut baisser IR à 100 A"], ok: 1,
      why: "IR trop haut pour voir +20 %. Les réarmements répétés viennent plutôt de Ii trop bas au démarrage." },
    { id: "d7", skill: "irii",
      q: "Ii = 750 A sur un moteur à Ib = 125 A est surtout dangereux parce que :",
      choices: ["Le câble fond à 125 A", "Le courant de démarrage / accélération peut dépasser 750 A", "TN-S l’interdit", "L10 diminue"], ok: 1,
      why: "Un asynchrone démarre souvent à 5–8 Ib (625 à 1000 A). L’ancien Ii = 2200 A laissait passer ; 750 A coupe en phase d’accélération." },
    { id: "d8", skill: "lmax",
      q: "Dans Lmax = 0,8 V Sph / ((1+m) ρ Ii), V est :",
      choices: ["400 V (composée)", "230 V (phase-neutre)", "2000 kVA", "La vitesse du galet"], ok: 1,
      why: "L’énoncé : V = tension entre phase et neutre. Prendre 400 V surestime Lmax." },
    { id: "d9", skill: "lmax",
      q: "L = 135 m et Lmax ≈ 169 m. On conclut :",
      choices: ["Câble trop long, pas de coupure en bout", "L < Lmax : le CC en extrémité fait bien déclencher", "Il faut du 240 mm²", "On ignore Ii"], ok: 1,
      why: "135 < 169. DT3 donnait déjà Lmax protégée ≈ 166 m (même ordre)." },
    { id: "d10", skill: "cable",
      q: "Multiconducteur sur chemin de câbles perforé. Lettre de sélection :",
      choices: ["B", "C", "E", "F"], ok: 2,
      why: "Échelles / corbeaux / chemin perforé, multicore → E. F est plutôt pour les monoconducteurs." },
    { id: "d11", skill: "cable",
      q: "Gaine caoutchouc, 45 °C. K3 vaut (DT5) :",
      choices: ["1,29", "0,96", "0,71", "1,00"], ok: 2,
      why: "Élastomère / caoutchouc à 45 °C → 0,71. 0,96 est du PR à 35 °C (sujet 2024). Ne pas prendre −20 °C du hall." },
    { id: "d12", skill: "cable",
      q: "Iz minimale à assurer, avec IR = 200 A et Ib = 125 A :",
      choices: ["125 A", "200 A", "750 A", "2250 A"], ok: 1,
      why: "Ib ≤ IR ≤ Iz. C’est IR = 200 A qui impose Iz min." },
    { id: "d13", skill: "statique",
      q: "Masse 5 t, g = 10. Poids de l’ensemble E :",
      choices: ["5 N", "500 N", "5 000 N", "50 000 N"], ok: 3,
      why: "5 t = 5000 kg. P = m g = 5,0 × 10⁴ N." },
    { id: "d14", skill: "statique",
      q: "À l’équilibre, G à 1,0 m de A et 1,5 m de B. L’appui le plus chargé est :",
      choices: ["B, parce que 1,5 > 1", "A (le plus proche de G) : FA = 30 kN", "Les deux égaux à 25 kN", "Aucun, P = 0"], ok: 1,
      why: "Moments en B (ou A) : FA × 2,5 = P × 1,5 → FA = 30 kN, FB = 20 kN." },
    { id: "d15", skill: "galet",
      q: "Le roulement SKF 24122 du galet est un :",
      choices: ["Bille à gorge profonde", "Roulement à rotule sur rouleaux", "Butée à aiguilles", "Roulement linéaire"], ok: 1,
      why: "Série 241 = rotule sur rouleaux. Il accepte le désalignement dû à la flexion de l’arbre." },
    { id: "d16", skill: "galet",
      q: "V = 150 m/min, Ø = 500 mm. ω vaut :",
      choices: ["2,5 rad/s", "10 rad/s", "150 rad/s", "95 rad/s"], ok: 1,
      why: "V = 2,5 m/s, r = 0,25 m, ω = V/r = 10 rad/s. Puis N = 30ω/π ≈ 95,5 tr/min." },
    { id: "d17", skill: "cycle",
      q: "Nouveau profil : a = 2 m/s², V = 3 m/s. Durée d’accélération t1 :",
      choices: ["1,0 s", "1,5 s", "3,0 s", "28,5 s"], ok: 1,
      why: "t1 = V/a = 3/2 = 1,5 s. X1 = ½ a t1² = 2,25 m. L’actuel DT8 accélère en 1 s (a = 3 m/s²)." },
    { id: "d18", skill: "cycle",
      q: "Aller actuel = 30 s, nouvel aller = 31,5 s. Par rapport à la limite +5 % :",
      choices: ["+50 %, hors contrat", "Exactement +5 %, limite respectée", "On a gagné 5 %", "On compare à 70 s et c’est plus court donc faux"], ok: 1,
      why: "31,5 / 30 = 1,05. La production impose « pas plus de +5 % ». On est sur la limite, donc conforme." },
    { id: "d19", skill: "l10",
      q: "L10 (millions de tours) pour un roulement à rouleaux :",
      choices: ["C + P", "(C/P)³", "(C/P)^{10/3}", "60 N / 10⁵"], ok: 2,
      why: "k = 3 (billes) ou 10/3 (rouleaux). Ici rotule sur rouleaux → 10/3. Puis Lh = 10⁶ L10 / (60 N)." },
    { id: "d20", skill: "l10",
      q: "Le joint accepte < 0,2 mm de défaut. Une flexion d’arbre de 0,045 mm :",
      choices: ["Explique l’usure prématurée", "Est inférieure à 0,2 mm : ce n’est pas la cause", "Impose de changer le 24122", "Annule L10"], ok: 1,
      why: "0,045 ≪ 0,2. Chercher ailleurs : pollution, graissage, montage, −20 °C." },
  ];

  const FICHES = [
    {
      id: "terre", title: "Lire un schéma TN-C / TN-S", skill: "terre",
      html: `
        <p>Partie 1 (120 min) : on <strong>nomme</strong> avant de régler. DT1 indique TNC-S, transfo 2000 kVA, neutre BT à la terre.</p>
        <table>
          <tr><th>Lettre</th><th>Sens</th></tr>
          <tr><td>T</td><td>Terre : le neutre du transfo est mis à la terre</td></tr>
          <tr><td>N</td><td>Neutre</td></tr>
          <tr><td>C</td><td>Combiné : un seul conducteur PEN</td></tr>
          <tr><td>S</td><td>Séparé : PE et N distincts</td></tr>
        </table>
        <p>QG = tableau général (3P 3200 A) : distribution et coupure amont. QC = coffret / protection d’un départ. INTER (IG) = interrupteur-sectionneur : isolation, consignation.</p>
        <div class="okbox">Défaut d’isolement en TN : la phase touche le PE → <strong>court-circuit</strong>. Déclencheurs qui réagissent : <strong>magnétique</strong> (fort courant) et <strong>différentiel</strong> (protection des personnes). Pas le thermique.</div>
        <div class="trap"><strong>Piège NC 2025.</strong> Écrire « il ne se passe rien » ou cocher seulement thermique. En TN le PE ramène le défaut : ce n’est pas un IT.</div>
      `,
    },
    {
      id: "irii", title: "IR trop haut, Ii trop bas", skill: "irii",
      html: `
        <p>On a changé AQ1 200 A → 250 A, puis réglé à l’aveugle IR = 0,8 In et Ii = 3 In. Depuis, il faut réarmer souvent.</p>
        <table>
          <tr><th></th><th>Avant (DT3)</th><th>Après (calcul)</th></tr>
          <tr><td>In</td><td>200 A</td><td>250 A</td></tr>
          <tr><td>Ib moteur</td><td>125 A</td><td>125 A</td></tr>
          <tr><td>IR</td><td>160 A</td><td>0,8 × 250 = <strong>200 A</strong></td></tr>
          <tr><td>Ii</td><td>2200 A</td><td>3 × 250 = <strong>750 A</strong></td></tr>
        </table>
        <p>IR = 200 A &gt; Ib = 125 A : pas de déclenchement à vide / en régime. Surcharge +20 % → 150 A encore &lt; 200 A : <strong>ce n’est pas IR</strong> qui fait sauter.</p>
        <p>Ii = 750 A ≈ 6 × Ib. Un démarrage asynchrone vaut souvent 5 à 8 Ib. L’ancien 2200 A laissait passer ; le nouveau coupe <strong>à l’accélération</strong>.</p>
        <div class="okbox">Proposition : garder IR = 200 A (ou 160 A, plus près de 1,25 Ib) et remonter Ii (8 à 10 In, soit 2000–2500 A). L’extrait Lmax utilise d’ailleurs <strong>Ii = 2250 A</strong> : c’est le bon ordre de grandeur.</div>
        <div class="trap"><strong>Piège NC 2025.</strong> Recopier 160 A / 2200 A comme « nouveaux » réglages, ou croire que 0,8 In / 3 In sont toujours justes. 3 In est trop serré sur un moteur qui démarre en charge (−20 °C, galet, palette).</div>
      `,
    },
    {
      id: "lmax", title: "Lmax : V = 230 V, pas 400 V", skill: "lmax",
      html: `
        <p><span class="formule">L<sub>max</sub> = 0,8 V S<sub>ph</sub> / ((1 + m) ρ I<sub>i</sub>)</span></p>
        <p>V = tension <strong>phase-neutre</strong> = 400 / √3 ≈ <strong>230 V</strong>. S<sub>ph</sub> = 95 mm², m = 1, ρ = 0,023, Ii = 2250 A.</p>
        <p>L<sub>max</sub> = 0,8 × 230 × 95 / (2 × 0,023 × 2250) = 17480 / 103,5 ≈ <strong>169 m</strong>.</p>
        <p>L réelle = 135 m &lt; 169 m → un court-circuit en bout de câble fait bien déclencher AQ1.</p>
        <div class="trap"><strong>Piège NC 2025.</strong> Mettre V = 400 V donne ≈ 294 m (encore « OK » mais méthode fausse). Utiliser Ii = 750 A au lieu de 2250 A explose Lmax (~507 m) et rate la question d’enchaînement.</div>
        <div class="okbox">Si L &gt; Lmax : le CC en extrémité n’atteint plus Ii → pas de coupure instantanée, câble et personnes non protégés.</div>
      `,
    },
    {
      id: "cable", title: "Lettre E, K3 = 0,71, 95 mm² juste sous IR", skill: "cable",
      html: `
        <p>Contrainte : <span class="formule">I<sub>b</sub> ≤ I<sub>R</sub> ≤ I<sub>z</sub></span> → I<sub>z</sub> min = <strong>200 A</strong>.</p>
        <p>Pose : multicore, gaine <strong>caoutchouc</strong>, chemin <strong>perforé</strong>, un circuit, simple couche, 45 °C (pas −20 °C).</p>
        <table>
          <tr><th>Facteur</th><th>Valeur</th><th>Lecture</th></tr>
          <tr><td>Lettre</td><td><strong>E</strong></td><td>Multiconducteur sur chemin / échelles</td></tr>
          <tr><td>K1</td><td>1</td><td>E, autres cas</td></tr>
          <tr><td>K2</td><td>1</td><td>Un seul circuit, simple couche</td></tr>
          <tr><td>K3</td><td><strong>0,71</strong></td><td>Élastomère, 45 °C</td></tr>
          <tr><td>K</td><td><strong>0,71</strong></td><td>1 × 1 × 0,71</td></tr>
        </table>
        <p>DT7, 95 mm², lettre E, caoutchouc / PVC 3 conducteurs : I<sub>z</sub> ≈ <strong>258 A</strong>.</p>
        <p>I′<sub>z</sub> = 258 × 0,71 ≈ <strong>183 A</strong> &lt; 200 A. Le 95 mm² <strong>ne convient plus</strong> avec IR = 200 A.</p>
        <p>120 mm², même colonne : I<sub>z</sub> ≈ 299 A → I′<sub>z</sub> ≈ 212 A ≥ 200 A → <strong>passer en 120 mm²</strong>.</p>
        <div class="trap"><strong>Piège NC 2025.</strong> Prendre K3 à −20 °C (le hall) : K3 &gt; 1, le 95 mm² « passe » à tort. L’énoncé impose 45 °C max. Autre erreur : lettre B (encastré) ou F (monocore).</div>
        <div class="okbox">Section trop faible vs IR : le câble chauffe, l’isolant vieillit, risque d’incendie, le thermique du disjoncteur ne protège plus le conducteur.</div>
      `,
    },
    {
      id: "statique", title: "Poids 50 kN, FA 30 kN, FB 20 kN", skill: "statique",
      html: `
        ${svgAppuis}
        <p>m = 5 t = 5000 kg, g = 10 → <span class="formule">P = 5,0 × 10⁴ N</span>. Échelle DR4 : 1 cm ↔ 10 kN → flèche de 5 cm vers le bas en G.</p>
        <p>PFS : Σ F⃗ = 0⃗ et Σ M⃗ = 0⃗. Contacts A, B = ponctuels de normale y (glisseurs verticaux).</p>
        <p>Moments en A, bras AB = 2,5 m, AG = 1,0 m :</p>
        <p><span class="formule">F<sub>B</sub> × 2,5 = P × 1,0</span> → F<sub>B</sub> = 20 kN.</p>
        <p>Projection sur y : F<sub>A</sub> + F<sub>B</sub> − P = 0 → F<sub>A</sub> = <strong>30 kN</strong>.</p>
        <div class="trap"><strong>Piège NC 2025.</strong> Inverser A et B (donner 20 kN à A). G est plus près de A : A est le plus chargé. Oublier de convertir 5 t → 5000 kg donne 50 N.</div>
        <div class="okbox">L’arbre est en <strong>flexion</strong> (charges transversales). D’où les rotules : elles encaissent le désalignement.</div>
      `,
    },
    {
      id: "galet", title: "Rotule, ω = 10 rad/s, pas de glissement", skill: "galet",
      html: `
        <p>Deux roulements identiques, réf. SKF <strong>24122-2CS5/VT143</strong> (DT9 pos. 3, DT11).</p>
        <p>Type : <strong>rotule sur rouleaux</strong>. Liaison : rotule (désaxage admis). Avantage : la flexion de l’arbre ne coince pas le roulement.</p>
        <p>V = 150 m/min = 2,5 m/s. Ø = 500 mm → r = 0,25 m.</p>
        <p><span class="formule">ω = V / r = 10 rad/s</span> · <span class="formule">N = 30 ω / π ≈ 95,5 tr/min</span>.</p>
        <p>Adhérence à l’accélération : T<sub>A</sub> = 2,5 kN, N<sub>A</sub> = 30 kN. T/N = 0,083. Un acier/acier usuel a μ ≈ 0,15–0,25 &gt; 0,083.</p>
        <div class="okbox">Sur DR4 (1 cm ↔ 5 kN) : N = 6 cm, T = 0,5 cm. T est tout petit : le galet <strong>roule sans glisser</strong>.</div>
        <div class="trap"><strong>Piège NC 2025.</strong> Laisser V en m/min dans V = rω (ω = 600 rad/s, n’importe quoi). Prendre le diamètre 180 (logement) au lieu de 500 (galet).</div>
      `,
    },
    {
      id: "cycle", title: "31,5 s = 30 s + 5 % pile", skill: "cycle",
      html: `
        ${svgCycle}
        <p>DT8 (actuel) : V<sub>max</sub> = 3 m/s, aller = 30 s (0 → 30), pause 10 s, retour 30 s → cycle AR = <strong>70 s</strong>. Accélération lue : 0 → 3 m/s en 1 s → a = <strong>3 m/s²</strong>.</p>
        <p>Nouveau (moteur conservé, masse ↑, a baissée) : a = 2 m/s², V = 3 m/s, X = 90 m.</p>
        <table>
          <tr><th>Phase</th><th>Durée</th><th>Distance</th></tr>
          <tr><td>Accélération</td><td>t1 = V/a = 1,5 s</td><td>X1 = ½ a t1² = 2,25 m</td></tr>
          <tr><td>Décélération</td><td>t3 = 1,5 s</td><td>X3 = 2,25 m</td></tr>
          <tr><td>Vitesse constante</td><td>t2 = 28,5 s</td><td>X2 = 90 − 4,5 = 85,5 m</td></tr>
          <tr><td>Aller</td><td colspan="2"><strong>31,5 s</strong></td></tr>
          <tr><td>Aller-retour (mouvement)</td><td colspan="2"><strong>63 s</strong></td></tr>
        </table>
        <p>31,5 / 30 = <strong>1,05</strong>. La production interdit de dépasser +5 %. On est <strong>sur la limite, donc conforme</strong>.</p>
        <div class="trap"><strong>Piège NC 2025.</strong> Oublier les deux X1 (prendre X2 = 90 m, t2 = 30 s) et conclure « rien n’a changé ». Ou comparer 63 s à 70 s (le 70 s contient la pause) et croire qu’on a gagné du temps.</div>
      `,
    },
    {
      id: "l10", title: "L10 énorme, joint à 0,045 mm", skill: "l10",
      html: `
        <p>C = 540 kN (24122-2CS5/VT143). Le sujet impose P = 3 % C = 16,2 kN. k = 10/3 (rouleaux).</p>
        <p><span class="formule">L<sub>10</sub> = (C/P)<sup>k</sup> = (1/0,03)<sup>10/3</sup> ≈ 1,19 × 10⁵ millions de tours</span></p>
        <p><span class="formule">L<sub>h</sub> = 10⁶ L<sub>10</sub> / (60 N)</span> avec N ≈ 95,5 tr/min → L<sub>h</sub> ≈ <strong>2,1 × 10⁷ h</strong>.</p>
        <p>Les roulements supportent largement la hausse de charge : ils sont très sous-chargés (C ≫ P). C’est pour ça que L10 est « absurde ».</p>
        <p>DT10 : déformation max ≈ <strong>4,5 × 10⁻² mm</strong> = 0,045 mm ≪ 0,2 mm. La flexion <strong>n’use pas</strong> le joint.</p>
        <div class="okbox">Autres causes (−20 °C) : graisse figée / inadaptée au froid, joint durci, pollution (givre, poussière), défaut de montage, arbre rayé.</div>
        <div class="trap"><strong>Piège NC 2025.</strong> Prendre k = 3 (billes). Utiliser C en newtons et P en kilonewtons. Lire 4,5 mm au lieu de 4,5 × 10⁻² mm sur l’échelle DT10.</div>
      `,
    },
  ];

  const EXERCICES = [
    { id: "e1", skill: "terre", title: "Lettre C",
      prompt: "Dans TN-C, C signifie :",
      type: "mcq",
      choices: ["Court-circuit", "Combiné (PEN unique)", "Cuivre", "Coffret"],
      ok: 1, hint: "PEN = neutre et protection dans le même conducteur.",
      corr: "Combiné. TN-S = PE et N séparés." },
    { id: "e2", skill: "terre", title: "Défaut d’isolement",
      prompt: "En TN, un défaut phase / masse produit surtout :",
      type: "mcq",
      choices: ["Rien", "Une surcharge lente seulement", "Un court-circuit (retour PE)", "Une baisse de L10"],
      ok: 2, hint: "Le PE est relié au neutre du transfo.",
      corr: "Court-circuit → déclencheur magnétique (et/ou différentiel)." },
    { id: "e3", skill: "irii", title: "IR nouveau",
      prompt: "In = 250 A, IR = 0,8 In. Seuil IR en A ?",
      type: "num", unit: "A", value: 200, tol: 0,
      hint: "0,8 × 250.",
      corr: "200 A." },
    { id: "e4", skill: "irii", title: "Ii nouveau",
      prompt: "In = 250 A, Ii = 3 In. Seuil Ii en A ?",
      type: "num", unit: "A", value: 750, tol: 0,
      hint: "3 × 250. Pas 2200 (l’ancien).",
      corr: "750 A." },
    { id: "e5", skill: "irii", title: "Surcharge +20 %",
      prompt: "Ib = 125 A. Intensité à +20 % (A).",
      type: "num", unit: "A", value: 150, tol: 0,
      hint: "125 × 1,2.",
      corr: "150 A < IR = 200 A : IR ne voit pas cette surcharge." },
    { id: "e6", skill: "lmax", title: "Lmax",
      prompt: "Lmax avec V = 230 V, Sph = 95, m = 1, ρ = 0,023, Ii = 2250. Résultat en m (ex. 169).",
      type: "num", unit: "m", value: 169, tol: 3,
      hint: "0,8 × 230 × 95 / (2 × 0,023 × 2250).",
      corr: "≈ 169 m. 135 m < 169 m : CC en bout OK." },
    { id: "e7", skill: "lmax", title: "Tension V",
      prompt: "V à mettre dans Lmax sur un réseau 400 V tri :",
      type: "mcq",
      choices: ["400 V", "230 V (phase-neutre)", "2000 V", "24 V"],
      ok: 1, hint: "Définition de l’énoncé : phase-neutre.",
      corr: "230 V." },
    { id: "e8", skill: "cable", title: "Iz min",
      prompt: "Iz minimale avec IR = 200 A (A).",
      type: "num", unit: "A", value: 200, tol: 0,
      hint: "Ib ≤ IR ≤ Iz.",
      corr: "200 A." },
    { id: "e9", skill: "cable", title: "K3 à 45 °C",
      prompt: "K3 élastomère / caoutchouc à 45 °C.",
      type: "num", unit: "", value: 0.71, tol: 0.01,
      hint: "DT5, colonne élastomère, ligne 45 °C. Pas −20 °C.",
      corr: "0,71." },
    { id: "e10", skill: "cable", title: "I′z du 95 mm²",
      prompt: "Iz catalogue = 258 A, K = 0,71. I′z en A (ex. 183).",
      type: "num", unit: "A", value: 183, tol: 3,
      hint: "258 × 0,71.",
      corr: "≈ 183 A < 200 A : le 95 mm² est trop juste." },
    { id: "e11", skill: "statique", title: "Poids",
      prompt: "Poids de 5 t avec g = 10, en N.",
      type: "num", unit: "N", value: 50000, tol: 0,
      hint: "5000 × 10. Pas 5 × 10.",
      corr: "50 000 N." },
    { id: "e12", skill: "statique", title: "FB",
      prompt: "Moments en A : FB × 2,5 = 50 000 × 1. FB en N.",
      type: "num", unit: "N", value: 20000, tol: 0,
      hint: "G est à 1 m de A, B à 2,5 m.",
      corr: "20 000 N." },
    { id: "e13", skill: "statique", title: "FA",
      prompt: "FA + 20 000 = 50 000. FA en N.",
      type: "num", unit: "N", value: 30000, tol: 0,
      hint: "A, plus proche de G, est le plus chargé.",
      corr: "30 000 N." },
    { id: "e14", skill: "galet", title: "ω",
      prompt: "V = 2,5 m/s, r = 0,25 m. ω en rad/s.",
      type: "num", unit: "rad/s", value: 10, tol: 0.05,
      hint: "ω = V/r. V = 150/60.",
      corr: "10 rad/s." },
    { id: "e15", skill: "galet", title: "N",
      prompt: "N = 30 ω / π avec ω = 10. Fréquence en tr/min (ex. 95,5).",
      type: "num", unit: "tr/min", value: 95.5, tol: 0.5,
      hint: "30 × 10 / 3,1416.",
      corr: "≈ 95,5 tr/min." },
    { id: "e16", skill: "galet", title: "Adhérence",
      prompt: "TA = 2500 N, NA = 30 000 N. Le galet glisse-t-il si μ ≈ 0,2 ?",
      type: "mcq",
      choices: ["Oui, 2500 > 0,2 × 30000", "Non, 2500 < 6000 : ça roule", "On ne peut pas savoir", "Seulement si g = 9,81"],
      ok: 1, hint: "Comparer T et μN.",
      corr: "μN ≈ 6000 N > 2500 N : pas de glissement." },
    { id: "e17", skill: "cycle", title: "t1",
      prompt: "V = 3 m/s, a = 2 m/s². t1 en s.",
      type: "num", unit: "s", value: 1.5, tol: 0,
      hint: "t = V/a.",
      corr: "1,5 s." },
    { id: "e18", skill: "cycle", title: "X1",
      prompt: "X1 = ½ × 2 × (1,5)² en m.",
      type: "num", unit: "m", value: 2.25, tol: 0.02,
      hint: "½ a t².",
      corr: "2,25 m." },
    { id: "e19", skill: "cycle", title: "Aller nouveau",
      prompt: "Durée d’un aller (s) : 1,5 + 28,5 + 1,5.",
      type: "num", unit: "s", value: 31.5, tol: 0.1,
      hint: "X2 = 85,5 m, t2 = 85,5/3 = 28,5 s.",
      corr: "31,5 s = 30 s + 5 %." },
    { id: "e20", skill: "l10", title: "C du 24122",
      prompt: "Charge dynamique C du 24122-2CS5/VT143 (kN).",
      type: "num", unit: "kN", value: 540, tol: 1,
      hint: "DT11, ligne d = 110, 24122-2CS5/VT143.",
      corr: "540 kN (la ligne CC/W33 voisine est à 539)." },
    { id: "e21", skill: "l10", title: "Joint",
      prompt: "Déformation DT10 ≈ 0,045 mm, tolérance 0,2 mm. La flexion use-t-elle le joint ?",
      type: "mcq",
      choices: ["Oui, 0,045 > 0,2", "Non, 0,045 ≪ 0,2", "Oui car −20 °C", "Seulement si k = 3"],
      ok: 1, hint: "Comparer les deux longueurs, même unité.",
      corr: "Non. Chercher graisse, pollution, montage, froid." },
  ];

  const DQR = [
    {
      id: "p1", part: "1", title: "Protections électriques", duration: "120 min", skill: "irii",
      questions: [
        { id: "q111", code: "Q.1-1-1", dt: "DT1",
          prompt: "Signification de T, N, C et S.",
          type: "text", expect: ["terre", "neutre"],
          hints: ["T et N d’abord, puis C/S = combiné / séparé.", "PEN vs PE+N."],
          corr: "T terre · N neutre · C combiné (PEN) · S séparé (PE et N)." },
        { id: "q112", code: "Q.1-1-2", dt: "DT2",
          prompt: "Désignation et fonction de QG, QC et INTER.",
          type: "text", expect: ["tableau", "interrupteur"],
          hints: ["QG 3P 3200 A = général. INTER = sectionneur.", "QC = coffret / départ secondaire."],
          corr: "QG : tableau général (distribution, coupure amont). QC : coffret / protection d’un départ. INTER : interrupteur-sectionneur (isolation, consignation)." },
        { id: "q113", code: "Q.1-1-3", dt: "DR1",
          prompt: "Lors d’un défaut d’isolement en TN : quel événement, quel type de déclencheur ?",
          type: "text", expect: ["court", "magnet"],
          hints: ["Le PE ramène le défaut au neutre du transfo.", "Fort courant → magnétique. Le différentiel protège aussi les personnes."],
          corr: "Il y a un court-circuit. Déclencheurs : magnétique et/ou différentiel (pas le thermique seul)." },
        { id: "q121", code: "Q.1-2-1", dt: "DT3",
          prompt: "Ib du moteur AQ1 (A), puis IR et Ii AVANT modification (ex. 125 160 2200).",
          type: "text", expect: ["125", "160", "2200"],
          hints: ["Ligne AQ1, « Consommation » = 125 A.", "Ligne IR / Ii : 160 A et 2200 A."],
          corr: "Ib = 125 A · IR = 160 A · Ii = 2200 A." },
        { id: "q122", code: "Q.1-2-2", dt: "DT4",
          prompt: "Nouveaux IR et Ii en A, In = 250 A, IR = 0,8 In, Ii = 3 In (ex. 200 750).",
          type: "text", expect: ["200", "750"],
          hints: ["0,8 × 250 et 3 × 250.", "Pas les valeurs DT3."],
          corr: "IR = 200 A · Ii = 750 A." },
        { id: "q123", code: "Q.1-2-3", dt: "DT3, DT4",
          prompt: "IR = 200 A est-il correct ? Une surcharge de 20 % peut-elle déclencher ?",
          type: "text", expect: ["150", "200"],
          hints: ["Ib = 125 A < 200 A : IR ne coupe pas en régime.", "125 × 1,2 = 150 A encore < 200 A."],
          corr: "IR ≥ Ib : acceptable en régime. +20 % → 150 A < 200 A : ce n’est pas IR qui fait réarmer." },
        { id: "q124", code: "Q.1-2-4", dt: "DT3, DT4",
          prompt: "Ii = 750 A peut-il être la cause des déclenchements ? À quelle phase ?",
          type: "text", expect: ["750", "demarr"],
          hints: ["Ancien Ii = 2200 A. Démarrage ≈ 5–8 Ib.", "Phase d’accélération / démarrage."],
          corr: "Oui : 750 A est trop bas (≈ 6 Ib). Déclenchement à l’accélération / au démarrage. Proposer Ii ≈ 8–10 In (l’enchaînement Lmax utilise 2250 A)." },
        { id: "q131", code: "Q.1-3-1", dt: "DT1, DT3",
          prompt: "Lmax (m) puis conclure (135 m vs Lmax).",
          type: "text", expect: ["169", "135"],
          hints: ["V = 230 V, pas 400 V. Ii = 2250 A.", "Lmax ≈ 169 m > 135 m."],
          corr: "Lmax ≈ 169 m > L = 135 m : la protection CC en extrémité est assurée." },
        { id: "q141", code: "Q.1-4-1", dt: "aucun",
          prompt: "Risques si la section est trop faible par rapport à IR.",
          type: "text", expect: ["chauff", "incendie"],
          hints: ["Le thermique est calé sur IR, pas sur le câble réel.", "Échauffement, vieillissement, feu."],
          corr: "Échauffement du câble, destruction de l’isolant, risque d’incendie : le disjoncteur ne protège plus le conducteur." },
        { id: "q142", code: "Q.1-4-2", dt: "DT5",
          prompt: "Valeur minimale de Iz (A).",
          type: "num", unit: "A", value: 200, tol: 0,
          hints: ["Ib ≤ IR ≤ Iz.", "IR = 200 A est le plus contraignant."],
          corr: "200 A." },
        { id: "q143", code: "Q.1-4-3", dt: "DT5, DT6",
          prompt: "Lettre, K1, K2, K3, K (ex. E 1 1 0.71 0.71).",
          type: "text", expect: ["lettre e", "0,71"],
          hints: ["Chemin perforé, multicore → E.", "K3 élastomère 45 °C = 0,71. Un circuit → K2 = 1."],
          corr: "Lettre E · K1 = 1 · K2 = 1 · K3 = 0,71 · K = 0,71." },
        { id: "q144", code: "Q.1-4-4 / Q.1-4-5", dt: "DT5–DT7",
          prompt: "I′z du 95 mm² (A) et conclusion (conserver / remplacer, quelle section).",
          type: "text", expect: ["183", "120"],
          hints: ["Iz (E, caoutchouc, 3c, 95 mm²) ≈ 258 A. × 0,71 ≈ 183 A.", "183 < 200 → 120 mm² (I′z ≈ 212 A)."],
          corr: "I′z ≈ 183 A < 200 A. Remplacer le 95 mm² par du 120 mm²." },
      ],
    },
    {
      id: "p2", part: "2", title: "Performances du transstockeur", duration: "110 min", skill: "cycle",
      questions: [
        { id: "q211", code: "Q.2-1-1", dt: "DT9, DT11",
          prompt: "Type de roulement, liaison associée, justification.",
          type: "text", expect: ["rotule", "desalign"],
          hints: ["Réf. 24122 = rotule sur rouleaux.", "La flexion d’arbre impose un désalignement."],
          corr: "Rotule sur rouleaux (SKF 24122). Liaison rotule. Avantage : accepte le désalignement / la flexion." },
        { id: "q221", code: "Q.2-2-1", dt: "aucun",
          prompt: "Intensité du poids P (N).",
          type: "num", unit: "N", value: 50000, tol: 0,
          hints: ["5 t = 5000 kg, g = 10."],
          corr: "5,0 × 10⁴ N. Sur DR4 : 5 cm vers le bas (1 cm ↔ 10 kN)." },
        { id: "q223", code: "Q.2-2-3", dt: "DR4",
          prompt: "Intensité de FB à partir des moments en A (N).",
          type: "num", unit: "N", value: 20000, tol: 0,
          hints: ["FB × 2,5 = P × 1,0.", "G est à 1 m de A."],
          corr: "FB = 20 000 N." },
        { id: "q224", code: "Q.2-2-4", dt: "aucun",
          prompt: "Intensité de FA (N).",
          type: "num", unit: "N", value: 30000, tol: 0,
          hints: ["FA + FB = P."],
          corr: "FA = 30 000 N. Sollicitation de l’arbre : flexion." },
        { id: "q226", code: "Q.2-2-6", dt: "DT9",
          prompt: "ω (rad/s) puis N (tr/min). Donner ω (ex. 10).",
          type: "num", unit: "rad/s", value: 10, tol: 0.1,
          hints: ["V = 150/60 = 2,5 m/s, r = 0,25 m.", "N = 30ω/π ≈ 95,5 tr/min."],
          corr: "ω = 10 rad/s · N ≈ 95,5 tr/min." },
        { id: "q227", code: "Q.2-2-7", dt: "DT11",
          prompt: "Charge dynamique C (kN).",
          type: "num", unit: "kN", value: 540, tol: 1,
          hints: ["Ligne 24122-2CS5/VT143, d = 110 mm."],
          corr: "C = 540 kN." },
        { id: "q228", code: "Q.2-2-8", dt: "aucun",
          prompt: "Lh est-elle suffisante pour la hausse de charge ? Pourquoi est-elle si grande ?",
          type: "text", expect: ["3", "c"],
          hints: ["P = 3 % C → C/P = 33, k = 10/3.", "Lh de l’ordre de 10⁷ h : C ≫ P."],
          corr: "Oui, très largement. L10 ≈ 1,2 × 10⁵ millions de tours, Lh ≈ 2 × 10⁷ h, parce que le roulement est très sous-chargé (P = 3 % C)." },
        { id: "q231", code: "Q.2-3-1", dt: "DR4",
          prompt: "Le galet glisse-t-il à l’accélération (TA = 2,5 kN, NA = 30 kN) ?",
          type: "text", expect: ["sans", "gliss"],
          hints: ["T/N = 0,083. μ acier/acier usuel ≈ 0,2.", "Sur le dessin, T est tout petit à côté de N."],
          corr: "Non : T ≪ μN. Le transstockeur roule sans glisser." },
        { id: "q232", code: "Q.2-3-2", dt: "DT8",
          prompt: "Vmax actuelle (m/s), durée d’un aller-retour (s), accélération actuelle (m/s²). Ex. 3 70 3.",
          type: "text", expect: ["3", "70"],
          hints: ["Le graphe plafonne à 3 m/s.", "0 → 70 s avec 10 s de pause. 0 → 3 m/s en 1 s → a = 3."],
          corr: "V = 3 m/s · cycle AR = 70 s · a = 3 m/s²." },
        { id: "q233", code: "Q.2-3-3", dt: "aucun",
          prompt: "t1 (s) et X1 (m) du nouveau profil. Donner t1.",
          type: "num", unit: "s", value: 1.5, tol: 0,
          hints: ["t1 = 3/2. X1 = ½ × 2 × 2,25 = 2,25 m."],
          corr: "t1 = 1,5 s · X1 = 2,25 m. Décélération identique (t3, X3)." },
        { id: "q235", code: "Q.2-3-5", dt: "aucun",
          prompt: "X2 (m) puis t2 (s). Donner X2.",
          type: "num", unit: "m", value: 85.5, tol: 0.2,
          hints: ["X2 = 90 − 2,25 − 2,25.", "t2 = 85,5 / 3 = 28,5 s."],
          corr: "X2 = 85,5 m · t2 = 28,5 s." },
        { id: "q236", code: "Q.2-3-6", dt: "DT8",
          prompt: "Durée d’un aller (s) et conclusion vs +5 %.",
          type: "text", expect: ["31,5", "5"],
          hints: ["1,5 + 28,5 + 1,5 = 31,5 s. Actuel = 30 s.", "31,5/30 = 1,05 : limite respectée."],
          corr: "Aller = 31,5 s (AR mouvement = 63 s). 31,5 s = 30 s + 5 % : conforme à l’exigence production." },
      ],
    },
    {
      id: "p3", part: "3", title: "Boîtiers et joints", duration: "10 min", skill: "l10",
      questions: [
        { id: "q31", code: "Q.3-1", dt: "DT9, DT10",
          prompt: "Déformation au joint (mm) et conclusion vs 0,2 mm.",
          type: "text", expect: ["0,045", "0,2"],
          hints: ["Échelle DT10 : max 4,523 × 10⁻² mm = 0,045 mm.", "0,045 ≪ 0,2 : pas la flexion."],
          corr: "≈ 0,045 mm < 0,2 mm. La flexion de l’arbre n’explique pas l’usure du joint." },
        { id: "q32", code: "Q.3-2", dt: "aucun",
          prompt: "Deux autres causes d’usure prématurée des joints.",
          type: "text", expect: ["graiss", "pollu"],
          hints: ["Le hall est à −20 °C.", "Graisse, pollution, montage, rayure d’arbre."],
          corr: "Graisse inadaptée / figée au froid · pollution (givre, poussière) · défaut de montage · arbre rayé · joint non prévu pour −20 °C." },
      ],
    },
  ];

  const TRANSFERT = [
    {
      session: "2025-06 · Métropole",
      support: "Transbordeur Stellantis (déjà sur ce site)",
      keep: "PFS, V = rω, conclure par une phrase chiffrée.",
      new: "Plan 12°, chaîne de couples, 4–20 mA, variateur.",
    },
    {
      session: "2024-06 · Métropole",
      support: "Presse ALLTUB (déjà sur ce site)",
      keep: "Lettre de câble, K1 K2 K3, IR / long retard.",
      new: "Hydraulique deux pompes, section annulaire, barrière ISO 13855.",
    },
    {
      session: "2023-06 · Métropole",
      support: "Centre Pasquier (déjà sur ce site)",
      keep: "Catalogue roulement (d, D, B, C), conclure.",
      new: "Courroie LAC, huile Rossi, 4–20 mA / API.",
    },
  ];

  const CONTRAT = [
    "On n’ouvre pas le corrigé avant d’avoir écrit une réponse.",
    "Un indice utilisé = la question n’est pas « acquise ».",
    "On ne lance pas le blanc 4 h tant que le diagnostic n’est pas à 14/20 (ou le cœur IR/Ii + câble + cycle au vert).",
    "Après le blanc, on change d’annale : retenir 750 A par cœur ne rapporte rien le jour J suivant.",
  ];

  return { SKILLS, DATA_SUJET, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT };
})();
