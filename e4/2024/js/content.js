/* Contenu pédagogique — Prépa E4 2024 (presse ALLTUB Saumur) */
window.PREPA = (() => {
  const SKILLS = [
    { id: "hydro", part: 1, name: "Schéma hydraulique", short: "D1, R1, B4, pressions" },
    { id: "debit", part: 1, name: "Débits et vitesses", short: "Q = V·S, deux pompes" },
    { id: "cycle", part: 1, name: "Cycle et GRAFCET", short: "Y10–Y14, pain, B4" },
    { id: "force", part: 1, name: "Force de compactage", short: "F = p·S, bar → Pa" },
    { id: "porte", part: 2, name: "Porte et vérin", short: "ρV, section annulaire" },
    { id: "puiss", part: 3, name: "Bilan de puissances", short: "P, Q, S, I" },
    { id: "cable", part: 3, name: "Câble et disjoncteur", short: "Iz, Io, Ir, Im" },
    { id: "securite", part: 4, name: "Barrière et réseau", short: "ISO 13855, IP" },
  ];

  const DATA_SUJET = [
    ["Pompe grande", "95 L/min"],
    ["Pompe petite", "37 L/min"],
    ["Débit approche (les deux)", "132 L/min"],
    ["Ø piston compacteur", "180 mm"],
    ["Pression compactage (B4)", "220 bar"],
    ["Limiteurs R1 / R2", "285 bar"],
    ["Ouverture porte (R3)", "200 bar"],
    ["Fermeture porte (R4)", "180 bar"],
    ["Porte (modèle)", "500 × 500 × 50 mm"],
    ["ρ acier", "7800 kg·m⁻³"],
    ["g (partie porte)", "9,81 m·s⁻²"],
    ["Porte, valeur d’enchaînement", "P = 1000 N"],
    ["F levage", "10 × P_porte"],
    ["ØAL / ØMM vérin porte", "63 mm / 45 mm"],
    ["p levage", "200 bar"],
    ["Pt / Qt (suite élec.)", "22 kW / 14 kVAr"],
    ["Ib presse", "38 A"],
    ["Câble existant", "6 mm² / phase · U1000 R02V · chemin perforé · θ ≤ 35 °C"],
    ["NS100 + STR22SE", "In = 40 A · Io = 0,63 · Ir = 0,8"],
    ["Barrière", "C4C-SA/EA 18010 · 14 mm · 10 m · 1800 mm · 20 ms"],
    ["Arrêt basculeur", "220 ms"],
    ["Distance lieux", "570 mm"],
    ["Réseau zone prod. 1", "192.168.0.0 / 24"],
  ];

  const svgVerin = `
  <svg class="schema" viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="40" y="50" width="220" height="50" fill="#efe7d6" stroke="#2a2412" stroke-width="2"/>
    <rect x="160" y="58" width="210" height="34" fill="#c9b48a" stroke="#2a2412" stroke-width="2"/>
    <text x="90" y="80" font-size="13" fill="#2a2412">Piston Ø 180</text>
    <text x="280" y="80" font-size="13" fill="#2a2412">Tige</text>
    <path d="M70,40 L70,110" stroke="#c4473a" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="48" y="30" font-size="12" fill="#c4473a">S = πd²/4</text>
    <text x="200" y="140" font-size="12" fill="#5b4a32">Q = V · S  →  V = Q / S</text>
  </svg>`;

  const svgAnneau = `
  <svg class="schema" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="130" cy="100" r="70" fill="#efe7d6" stroke="#2a2412" stroke-width="2"/>
    <circle cx="130" cy="100" r="42" fill="#f6f1e6" stroke="#2a2412" stroke-width="2"/>
    <text x="118" y="96" font-size="12" fill="#5b4a32">ØMM</text>
    <text x="118" y="112" font-size="12" fill="#5b4a32">45 mm</text>
    <text x="175" y="48" font-size="12" fill="#2a2412">ØAL 63 mm</text>
    <text x="20" y="190" font-size="13" fill="#1f7a50">S utile = π (ØAL² − ØMM²) / 4</text>
  </svg>`;

  const DIAGNOSTIC = [
    { id: "d1", skill: "hydro",
      q: "Sur un schéma hydraulique, un composant noté Y10 (bobine d’un distributeur) est un :",
      choices: ["Capteur de fin de course", "Pré-actionneur (pilote du distributeur)", "Moteur électrique", "Pressostat"], ok: 1,
      why: "Y10…Y14 pilotent les tiroirs. Ce sont des pré-actionneurs." },
    { id: "d2", skill: "hydro",
      q: "Le pressostat B4 taré à 220 bar sert principalement à :",
      choices: ["Limiter la pression à 285 bar en permanence", "Détecter le seuil de pression de compactage (fin de phase / formation du pain)", "Mesurer un débit", "Ouvrir la porte"], ok: 1,
      why: "B4 = information de pression. R1/R2 à 285 bar sont les limiteurs de sécurité." },
    { id: "d3", skill: "hydro",
      q: "D’après le DT2, la pression maximale dans le vérin de porte à l’ouverture est :",
      choices: ["180 bar", "200 bar", "220 bar", "285 bar"], ok: 1,
      why: "R3 est taré à 200 bar (ouverture). R4 = 180 bar (fermeture)." },
    { id: "d4", skill: "debit",
      q: "La relation entre débit Q, vitesse de piston V et section S est :",
      choices: ["Q = V / S", "Q = V · S", "Q = V + S", "Q = S / V"], ok: 1,
      why: "Q = V · S donc V = Q / S. Unités : m³/s, m/s, m²." },
    { id: "d5", skill: "debit",
      q: "La presse a deux pompes 95 L/min et 37 L/min. En approche rapide (Y14), le débit de compactage vaut :",
      choices: ["37 L/min seulement", "95 L/min seulement", "132 L/min (les deux pompes)", "220 L/min"], ok: 2,
      why: "Y14 met les deux pompes en parallèle : 95 + 37 = 132 L/min. En mise en pression, seule la petite reste." },
    { id: "d6", skill: "debit",
      q: "L’intérêt de deux débits sur une presse est surtout :",
      choices: ["Éliminer le pressostat", "Approche rapide puis effort de compactage (petit débit, haute pression)", "Remplacer le câble", "Mesurer 4–20 mA"], ok: 1,
      why: "Architecture classique : gros débit = vitesse, petit débit = force." },
    { id: "d7", skill: "cycle",
      q: "Dans le diagramme d’états, l’avance compacteur pilote :",
      choices: ["Y12 seul", "Y10 et Y14", "Y11 seul", "Y13 et Y14"], ok: 1,
      why: "DT1 : do / Y10 = 1 ; Y14 = 1. Y14 = grand débit." },
    { id: "d8", skill: "cycle",
      q: "La formation du pain en fin de compactage est validée par :",
      choices: ["B1 uniquement", "B4 et le tempo de compactage", "B11 uniquement", "X40 uniquement"], ok: 1,
      why: "GRAFCET / DT1 : transition « B4 · tempo compactage »." },
    { id: "d9", skill: "force",
      q: "220 bar, en pascals, valent :",
      choices: ["220 Pa", "2,2 × 10⁴ Pa", "2,2 × 10⁷ Pa", "2,2 × 10⁵ Pa"], ok: 2,
      why: "1 bar = 10⁵ Pa → 220 × 10⁵ = 2,2 × 10⁷ Pa." },
    { id: "d10", skill: "force",
      q: "Force d’un vérin (pression p, section utile S) :",
      choices: ["F = p / S", "F = p · S", "F = p + S", "F = S / p"], ok: 1,
      why: "F = p · S. Homogénéiser Pa et m² pour obtenir des newtons." },
    { id: "d11", skill: "porte",
      q: "Masse d’une plaque d’acier :",
      choices: ["m = U I cos φ", "m = ρ · Volume", "m = μ N", "m = p S"], ok: 1,
      why: "m = ρ V avec V = L × l × e." },
    { id: "d12", skill: "porte",
      q: "Le levage de la porte se fait en entrée de tige. La section utile est :",
      choices: ["π ØAL² / 4", "π ØMM² / 4", "π (ØAL² − ØMM²) / 4", "π (ØAL + ØMM) / 2"], ok: 2,
      why: "La tige occupe une partie de la section. ØAL = 63 mm, ØMM = 45 mm." },
    { id: "d13", skill: "porte",
      q: "L’hypothèse F_levage = 10 P_porte traduit surtout :",
      choices: ["Un rendement 10 %", "Les frottements pain / porte (effort très supérieur au seul poids)", "Une masse volumique", "Un facteur de câble K3"], ok: 1,
      why: "Le pain frotte sur la porte : le vérin ne soulève pas « juste » 1000 N." },
    { id: "d14", skill: "puiss",
      q: "Puissance active triphasée équilibrée :",
      choices: ["P = U I", "P = √3 U I cos φ", "P = U / I", "P = 3 U I sin φ"], ok: 1,
      why: "P = √3 U I cos φ (U composée, I de ligne)." },
    { id: "d15", skill: "puiss",
      q: "Puissance apparente S en fonction de P et Q :",
      choices: ["S = P + Q", "S = √(P² + Q²)", "S = P / Q", "S = Q − P"], ok: 1,
      why: "Triangle des puissances. Puis I = S / (√3 U)." },
    { id: "d16", skill: "cable",
      q: "Le déclencheur « long retard » protège surtout contre :",
      choices: ["Les chutes de tension", "Les surcharges (échauffement)", "La viscosité d’huile", "Les défauts d’isolement uniquement"], ok: 1,
      why: "Long retard = thermique / surcharge. Court retard = court-circuit." },
    { id: "d17", skill: "cable",
      q: "Avec In = 40 A, Io = 0,63 et Ir = 0,8, le seuil long retard vaut :",
      choices: ["40 A", "20 A", "38 A", "32 A"], ok: 1,
      why: "40 × 0,63 × 0,8 = 20,16 A. Très inférieur à Ib = 38 A → déclenchements intempestifs." },
    { id: "d18", skill: "securite",
      q: "Distance minimale ISO 13855 (approche perpendiculaire, formule de base) :",
      choices: ["S = 2000 T + 8 (d − 14) en mm", "S = p · S_verin", "S = √3 U I", "S = Q / V"], ok: 0,
      why: "T en secondes, d = résolution en mm. Si S > 500 mm, on recalcule avec 1600 T." },
    { id: "d19", skill: "securite",
      q: "La barrière choisie C4C-SA18010 a une résolution de :",
      choices: ["30 mm", "14 mm", "1800 mm", "10 m"], ok: 1,
      why: "DT11 : résolution 14 mm, portée 10 m, hauteur 1800 mm, temps de réponse 20 ms." },
    { id: "d20", skill: "securite",
      q: "Sur un réseau 192.168.0.0 / 255.255.255.0, on ne doit pas attribuer :",
      choices: ["192.168.0.35", "192.168.0.0 ni 192.168.0.255", "192.168.0.40", "192.168.0.100"], ok: 1,
      why: ".0 = adresse de réseau, .255 = broadcast. Les deux sont réservées." },
  ];

  const FICHES = [
    {
      id: "hydro", title: "Lire le schéma hydraulique", skill: "hydro",
      html: `
        <p>La partie 1 commence par <strong>nommer</strong> avant de calculer. DT2 + DR1.</p>
        <table>
          <tr><th>Repère</th><th>Désignation</th><th>Rôle</th></tr>
          <tr><td>D1</td><td>Distributeur 4/3 (Y10 / Y11)</td><td>Orienter le fluide vers le compacteur</td></tr>
          <tr><td>R1</td><td>Limiteur de pression (285 bar)</td><td>Protéger le circuit (tarage max)</td></tr>
          <tr><td>B4</td><td>Pressostat (220 bar)</td><td>Informer l’API du seuil de compactage</td></tr>
        </table>
        <p>Pressions dans les vérins (Q.1-1-2) :</p>
        <table>
          <tr><th>Action</th><th>Pression</th><th>Où la lire</th></tr>
          <tr><td>Compactage</td><td><strong>220 bar</strong></td><td>B4, pas R1</td></tr>
          <tr><td>Ouverture porte</td><td><strong>200 bar</strong></td><td>R3</td></tr>
          <tr><td>Fermeture porte</td><td><strong>180 bar</strong></td><td>R4</td></tr>
        </table>
        <div class="trap"><strong>Piège 2024.</strong> 285 bar (R1/R2) n’est <em>pas</em> la pression de compactage. Le process est limité par B4 à 220 bar. Qui écrit 285 à Q.1-1-2 et à la force se trompe de 30 %.</div>
      `,
    },
    {
      id: "debit", title: "Deux pompes, deux vitesses", skill: "debit",
      html: `
        ${svgVerin}
        <p><span class="formule">Q = V · S</span> donc <span class="formule">V = Q / S</span>. Convertir <em>avant</em> de diviser.</p>
        <table>
          <tr><th>Grandeur</th><th>Conversion</th></tr>
          <tr><td>132 L/min</td><td>132 / 60 000 = 2,20 × 10⁻³ m³/s</td></tr>
          <tr><td>37 L/min</td><td>37 / 60 000 = 6,17 × 10⁻⁴ m³/s</td></tr>
          <tr><td>Ø 180 mm</td><td>S = π (0,18)² / 4 ≈ 2,545 × 10⁻² m²</td></tr>
        </table>
        <p>Y14 en parallèle = les <strong>deux</strong> pompes (approche) : Q₁ = 95 + 37 = <strong>132 L/min</strong> → V₁ ≈ 8,6 cm/s.</p>
        <p>Mise en pression : petite pompe seule : Q₂ = <strong>37 L/min</strong> → V₂ ≈ 2,4 cm/s.</p>
        <div class="trap"><strong>Piège 2024.</strong> Oublier d’additionner les pompes (rester sur 95 et 37) ou laisser les L/min et les mm dans la même formule. Le sujet écrit Q en m³/s.</div>
        <div class="okbox">Intérêt : aller vite à vide, puis pousser fort (petit débit, la pression peut monter jusqu’à B4).</div>
      `,
    },
    {
      id: "cycle", title: "Cycle : qui pilote quoi", skill: "cycle",
      html: `
        <p>Le DT1 donne les <code>do / Y… = 1</code>. On recopie sur DR1. Y12 (ouverture porte) est déjà coché pour montrer le principe.</p>
        <table>
          <tr><th>Action</th><th>Pilotes</th></tr>
          <tr><td>Ouverture porte</td><td>Y12 (donné)</td></tr>
          <tr><td>Fermeture porte</td><td>Y13</td></tr>
          <tr><td>Avance compacteur</td><td>Y10 + Y14</td></tr>
          <tr><td>Recul compacteur</td><td>Y11</td></tr>
          <tr><td>Mise en pression</td><td>Y10 (sans Y14)</td></tr>
        </table>
        <p>Formation du pain : on ne se fie pas à B2 (fin de course avant). Le pain est « bon » quand la <strong>pression</strong> est là <em>et</em> qu’elle a tenu un <strong>tempo</strong>.</p>
        <div class="okbox">Q.1-2-2 : B4 · tempo compactage. Q.1-2-3 : manomètre + réglage de B4 jusqu’à basculement à 220 bar, puis verrouillage / marquage.</div>
      `,
    },
    {
      id: "force", title: "Force de compactage", skill: "force",
      html: `
        <p>B4 limite le compactage à 220 bar. La force max est donc celle de cette pression, pas de 285 bar.</p>
        <p><span class="formule">p = 220 × 10⁵ = 2,2 × 10⁷ Pa</span></p>
        <p><span class="formule">S = π (0,18)² / 4 ≈ 2,545 × 10⁻² m²</span></p>
        <p><span class="formule">F = p S ≈ 5,60 × 10⁵ N ≈ 560 kN</span></p>
        <div class="trap"><strong>Piège 2024.</strong> Oublier 10⁵ (rester en bar) donne 5,6 N. Utiliser 285 bar donne ~725 kN : cohérent mathématiquement, faux vis-à-vis du process.</div>
      `,
    },
    {
      id: "porte", title: "Porte : masse, levage, section annulaire", skill: "porte",
      html: `
        ${svgAnneau}
        <p>Modèle : plaque 500 × 500 × 50 mm, ρ = 7800 kg·m⁻³, g = <strong>9,81</strong> (ici ce n’est pas 10).</p>
        <p>V = 0,5 × 0,5 × 0,05 = 0,0125 m³ → m = 97,5 kg → P ≈ 956 N.</p>
        <p>Le sujet impose ensuite <strong>P = 1000 N</strong>, puis F<sub>levage</sub> = 10 P = <strong>10 000 N</strong> (frottement du pain sur la porte).</p>
        <p>Levage <em>en entrée de tige</em>, ØAL = 63 mm, ØMM = 45 mm (ligne 63 du DT3) :</p>
        <p><span class="formule">S = π (0,063² − 0,045²) / 4 ≈ 1,53 × 10⁻³ m²</span></p>
        <p><span class="formule">F = 200 × 10⁵ × S ≈ 30 500 N</span> ≫ 10 000 N → le CDH3 convient.</p>
        <div class="trap"><strong>Piège 2024.</strong> Prendre S = π × 63² / 4 (sortie de tige) double presque la force. Ce n’est pas le bon côté du vérin.</div>
      `,
    },
    {
      id: "puiss", title: "Bilan P, Q, S, I", skill: "puiss",
      html: `
        <p>DR3 : pour chaque moteur, <span class="formule">P<sub>abs</sub> = √3 U I cos φ</span> et <span class="formule">Q = √3 U I sin φ</span> (sin φ = √(1 − cos²φ)). On additionne la ligne « Divers » (5500 W / 4125 VAr).</p>
        <p>Ordre de grandeur : Pt ≈ 21,6 kW et Qt ≈ 14,2 kVAr. Le sujet impose ensuite <strong>Pt = 22 kW</strong>, <strong>Qt = 14 kVAr</strong>.</p>
        <p><span class="formule">S<sub>t</sub> = √(22² + 14²) = √680 ≈ 26,1 kVA</span></p>
        <p><span class="formule">I<sub>t</sub> = S / (√3 U) = 26100 / (1,732 × 400) ≈ 37,7 A</span> → cohérent avec Ib = 38 A.</p>
        <div class="trap"><strong>Piège 2024.</strong> Confondre Pu (plaque, 11 kW) et Pabs. η sert à comprendre, le courant plaque sert à calculer Pabs. Et I = S/(√3 U), pas P/(√3 U) en oubliant Q.</div>
      `,
    },
    {
      id: "cable", title: "Câble 6 mm² et réglages NS100", skill: "cable",
      html: `
        <p>Câble U1000 R02V = isolant <strong>PR</strong>, multiconducteur, <strong>chemin perforé</strong> → lettre de sélection <strong>E</strong> (DT6).</p>
        <p>K1 = 1 (autres cas) · K2 = 1 (un circuit) · K3 = 0,96 (PR, 35 °C) → K = 0,96.</p>
        <p>Iz (6 mm², PR, E) ≈ 51 A → I′z = 51 × 0,96 ≈ 49 A &gt; Ib = 38 A. Le 6 mm² <strong>se conserve</strong>.</p>
        <p>NS100 In = 40 A : Ib ≤ In, le boîtier se conserve. Le déclencheur STR22SE aussi (calibre 40 A prévu).</p>
        <p>Réglages actuels : Io = 0,63 et Ir = 0,8 → seuil = 40 × 0,63 × 0,8 ≈ <strong>20 A</strong> &lt; 38 A → déclenchements intempestifs. Trop haut (si on mettait 63 A) : plus de protection.</p>
        <p>Proposition : Io = 1 et Ir = 1 (seuil 40 A ≥ 38 A), ou Io = 1 et Ir = 0,98.</p>
        <p>Long retard = surcharge. Court retard = court-circuit. Im sur 8 : Im = 8 × Ir. Imag admissible = 310 A (longueur de câble, schéma IT).</p>
        <div class="trap"><strong>Piège 2024.</strong> Oublier K3 (35 °C) ou prendre la lettre B (goulotte) au lieu de E (chemin perforé). Et laisser Io/Ir d’usine : la presse saute au premier cycle.</div>
      `,
    },
    {
      id: "securite", title: "Barrière immatérielle et adresse IP", skill: "securite",
      html: `
        <p>Choix C4C-SA18010 : résolution 14 mm, portée 10 m, hauteur de champ <strong>1800 mm</strong> — c’est exactement « haut. à la dist. la plus défavorable : 1800 mm » du DP3. Portée 10 m ≫ l’implantation.</p>
        <p>Temps de réponse = 20 ms. Arrêt machine (hors barrière) = 220 ms → T = 0,24 s.</p>
        <p><span class="formule">S = 2000 × 0,24 + 8 (14 − 14) = 480 mm</span></p>
        <p>480 ≤ 500 : on garde 480 mm. Distance disponible = 570 mm &gt; 480 → <strong>installable sans modifier les lieux</strong>.</p>
        <p>Au franchissement : le relais UE48 coupe les contacteurs du <strong>basculeur</strong> (KM2). Pas de redémarrage sans dégagement + acquittement.</p>
        <p>Réseau zone prod. 1 : 192.168.0.0 / 24. Adresses prises : .31 (routeur), .33, .34, .36. Utilisables : .1–.254 sauf celles-là. Ex. API <strong>192.168.0.35</strong>, IHM <strong>192.168.0.37</strong>.</p>
        <div class="trap"><strong>Piège 2024.</strong> Oublier d’ajouter les 20 ms, ou appliquer 1600 T alors que S = 480 ≤ 500. Côté IP : donner .0, .255, ou une adresse déjà prise.</div>
      `,
    },
  ];

  const EXERCICES = [
    { id: "e1", skill: "hydro", title: "Rôle de B4",
      prompt: "B4 est taré à 220 bar. Que fait-il dans le cycle ?",
      type: "mcq",
      choices: ["Il limite mécaniquement à 285 bar", "Il bascule quand la pression de compactage atteint le seuil (info API)", "Il mesure le débit de la pompe 95 L/min", "Il ouvre Y12"],
      ok: 1, hint: "Pressostat = capteur à seuil, pas limiteur.",
      corr: "Information de pression pour l’API / la transition GRAFCET. Les 285 bar sont R1/R2." },
    { id: "e2", skill: "hydro", title: "Pression d’ouverture de porte",
      prompt: "Relever la pression max du vérin porte à l’ouverture (bar).",
      type: "num", unit: "bar", value: 200, tol: 0,
      hint: "DT2 : limiteur R3 sur la ligne d’ouverture.",
      corr: "R3 = 200 bar." },
    { id: "e3", skill: "debit", title: "Section du piston 180 mm",
      prompt: "Calculer S = π d² / 4 avec d = 0,18 m (m²). On accepte 0,0254 à 0,0255.",
      type: "num", unit: "m²", value: 0.02545, tol: 0.0002,
      hint: "d en mètres, pas 180.",
      corr: "π × 0,0324 / 4 ≈ 0,02545 m²." },
    { id: "e4", skill: "debit", title: "Débit d’approche",
      prompt: "Les deux pompes débiteront ensemble. Débit d’approche en L/min ?",
      type: "num", unit: "L/min", value: 132, tol: 0,
      hint: "95 + 37. Y14 met les pompes en parallèle.",
      corr: "132 L/min." },
    { id: "e5", skill: "debit", title: "Vitesse d’approche",
      prompt: "Q = 132 L/min, S = 0,02545 m². V en m/s (ex. 0,086).",
      type: "num", unit: "m/s", value: 0.0864, tol: 0.003,
      hint: "132 / 60 000 = 0,0022 m³/s puis V = Q / S.",
      corr: "0,0022 / 0,02545 ≈ 0,086 m/s." },
    { id: "e6", skill: "cycle", title: "Pilotes de l’avance",
      prompt: "Quels pré-actionneurs pour « Avance compacteur » ?",
      type: "mcq",
      choices: ["Y12", "Y10 et Y14", "Y11", "Y13"],
      ok: 1, hint: "DT1 : do / Y10 = 1 ; Y14 = 1.",
      corr: "Y10 (direction) + Y14 (grand débit)." },
    { id: "e7", skill: "cycle", title: "Validation du pain",
      prompt: "Quelle condition valide la formation du pain ?",
      type: "mcq",
      choices: ["B2 seul", "B4 et tempo compactage", "B1 et B3", "X40 seul"],
      ok: 1, hint: "Pression tenue pendant un temps, pas seulement la fin de course.",
      corr: "B4 · tempo compactage." },
    { id: "e8", skill: "force", title: "220 bar en Pa",
      prompt: "Convertir 220 bar en pascals (écrire 22000000 ou 2.2e7).",
      type: "num", unit: "Pa", value: 22000000, tol: 1,
      hint: "1 bar = 100 000 Pa.",
      corr: "2,2 × 10⁷ Pa." },
    { id: "e9", skill: "force", title: "Force à 220 bar",
      prompt: "F = p S avec p = 2,2×10⁷ Pa et S = 0,02545 m². Résultat en kN (ex. 560).",
      type: "num", unit: "kN", value: 560, tol: 8,
      hint: "Newtons puis / 1000. Pas 285 bar.",
      corr: "≈ 5,60 × 10⁵ N = 560 kN." },
    { id: "e10", skill: "porte", title: "Volume de la porte",
      prompt: "500 × 500 × 50 mm. Volume en m³ (ex. 0,0125).",
      type: "num", unit: "m³", value: 0.0125, tol: 0.0001,
      hint: "Tout en mètres : 0,5 × 0,5 × 0,05.",
      corr: "0,0125 m³." },
    { id: "e11", skill: "porte", title: "Masse de la porte",
      prompt: "ρ = 7800 kg/m³, V = 0,0125 m³. Masse en kg.",
      type: "num", unit: "kg", value: 97.5, tol: 0.3,
      hint: "m = ρ V.",
      corr: "97,5 kg." },
    { id: "e12", skill: "porte", title: "Effort de levage imposé",
      prompt: "Avec P = 1000 N et le facteur 10 du sujet, F_levage en N ?",
      type: "num", unit: "N", value: 10000, tol: 0,
      hint: "Frottement pain / porte : 10 fois le poids.",
      corr: "10 000 N." },
    { id: "e13", skill: "porte", title: "Section annulaire",
      prompt: "ØAL = 63 mm, ØMM = 45 mm. S utile en m² (ex. 0,00153).",
      type: "num", unit: "m²", value: 0.001527, tol: 0.00004,
      hint: "π/4 × (0,063² − 0,045²).",
      corr: "≈ 1,53 × 10⁻³ m²." },
    { id: "e14", skill: "porte", title: "Le vérin suffit-il ?",
      prompt: "F_verin ≈ 30 500 N, F_besoin = 10 000 N. Le CDH3 convient-il ?",
      type: "mcq",
      choices: ["Non, 30 500 < 10 000", "Oui, 30 500 ≫ 10 000", "On ne peut pas conclure", "Seulement si g = 10"],
      ok: 1, hint: "Comparer F disponible et F nécessaire, même unité.",
      corr: "Oui, marge importante. Le vérin initial convient." },
    { id: "e15", skill: "puiss", title: "St à partir de Pt et Qt",
      prompt: "Pt = 22 kW, Qt = 14 kVAr. St en kVA (ex. 26,1).",
      type: "num", unit: "kVA", value: 26.1, tol: 0.2,
      hint: "√(22² + 14²) = √680.",
      corr: "≈ 26,1 kVA." },
    { id: "e16", skill: "puiss", title: "Courant total",
      prompt: "St = 26,1 kVA, U = 400 V tri. I en A (ex. 37,7).",
      type: "num", unit: "A", value: 37.7, tol: 0.5,
      hint: "I = S / (√3 U).",
      corr: "26100 / (1,732 × 400) ≈ 37,7 A." },
    { id: "e17", skill: "cable", title: "Seuil Io × Ir",
      prompt: "In = 40 A, Io = 0,63, Ir = 0,8. Seuil long retard en A.",
      type: "num", unit: "A", value: 20.16, tol: 0.3,
      hint: "Produit des trois.",
      corr: "20,16 A — incompatible avec Ib = 38 A." },
    { id: "e18", skill: "cable", title: "Lettre de sélection",
      prompt: "Multiconducteur PR sur chemin de câbles perforé. Lettre ?",
      type: "mcq",
      choices: ["B", "C", "E", "F"],
      ok: 2, hint: "DT6, ligne « échelles, corbeaux, chemin perforé ».",
      corr: "E." },
    { id: "e19", skill: "securite", title: "Temps total T",
      prompt: "Arrêt machine 220 ms + réponse barrière 20 ms. T en secondes (ex. 0,24).",
      type: "num", unit: "s", value: 0.24, tol: 0.001,
      hint: "Sommer puis passer en secondes.",
      corr: "240 ms = 0,24 s." },
    { id: "e20", skill: "securite", title: "Distance S",
      prompt: "S = 2000 × 0,24 + 8 × (14 − 14). Résultat en mm.",
      type: "num", unit: "mm", value: 480, tol: 0,
      hint: "d = 14 mm → le second terme est nul.",
      corr: "480 mm. 480 ≤ 500 et 480 < 570 : implantation OK." },
    { id: "e21", skill: "securite", title: "Adresse interdite",
      prompt: "Quelle adresse est interdite pour l’API ?",
      type: "mcq",
      choices: ["192.168.0.35", "192.168.0.255", "192.168.0.40", "192.168.0.100"],
      ok: 1, hint: "Broadcast de 192.168.0.0/24.",
      corr: "192.168.0.255 (et 192.168.0.0) sont réservées." },
  ];

  const DQR = [
    {
      id: "p1", part: "1", title: "Hydraulique et cycle", duration: "70 min", skill: "hydro",
      questions: [
        { id: "q111", code: "Q.1-1-1", dt: "DT2 → DR1",
          prompt: "Donner la désignation et le rôle de D1, R1 et B4.",
          type: "text", expect: ["distribut", "limiteur", "pressostat"],
          hints: ["D1 a des pilotes Y10/Y11. R1 est taré 285 bar. B4 est à 220 bar.", "Distributeur / limiteur de pression / pressostat."],
          corr: "D1 : distributeur 4/3 (avance/recul compacteur). R1 : limiteur 285 bar (protection). B4 : pressostat 220 bar (seuil de compactage)." },
        { id: "q112", code: "Q.1-1-2", dt: "DT2",
          prompt: "Pression max dans le vérin : compactage, ouverture porte, fermeture porte (bar). Écrire les trois nombres séparés par des espaces, ex. 220 200 180.",
          type: "text", expect: ["220", "200", "180"],
          hints: ["Compactage = B4, pas R1.", "Porte : R3 ouverture, R4 fermeture."],
          corr: "220 bar (B4) · 200 bar (R3) · 180 bar (R4)." },
        { id: "q114", code: "Q.1-1-4", dt: "DT1–DT2",
          prompt: "Deux débits possibles dans le circuit de compactage (L/min) et l’avantage de l’installation.",
          type: "text", expect: ["132", "37", "rapide"],
          hints: ["Y14 en parallèle = somme des pompes.", "95 + 37 et 37 seul."],
          corr: "132 L/min (approche) et 37 L/min (mise en pression). Avantage : vitesse à vide + force de compactage." },
        { id: "q115", code: "Q.1-1-5", dt: "aucun",
          prompt: "V₁ (grande, 132 L/min) et V₂ (37 L/min) en m/s, Ø = 180 mm. Donner V₁ (ex. 0,086).",
          type: "num", unit: "m/s", value: 0.0864, tol: 0.004,
          hints: ["S ≈ 0,02545 m². Q en m³/s = L/min / 60000.", "V = Q / S."],
          corr: "V₁ ≈ 0,086 m/s ; V₂ ≈ 0,024 m/s." },
        { id: "q121", code: "Q.1-2-1", dt: "DT1",
          prompt: "Cocher les pilotes : fermeture porte, avance, recul, mise en pression (Y10…Y14). Y12 est déjà donné pour l’ouverture.",
          type: "text", expect: ["y13", "y10", "y11"],
          hints: ["DT1 : chaque état a un do / Y…", "Avance = Y10+Y14 ; mise en pression = Y10 seul ; recul = Y11 ; fermeture = Y13."],
          corr: "Fermeture Y13 · Avance Y10+Y14 · Recul Y11 · Mise en pression Y10." },
        { id: "q122", code: "Q.1-2-2", dt: "DP4, DT1",
          prompt: "Conditions qui valident la formation du pain en fin de compactage.",
          type: "text", expect: ["b4", "tempo"],
          hints: ["Ce n’est pas seulement B2 (fin de course).", "Pression + temps."],
          corr: "B4 (pressostat) ET tempo compactage." },
        { id: "q123", code: "Q.1-2-3", dt: "DT2",
          prompt: "Proposer une procédure de réglage de B4 à 220 bar.",
          type: "text", expect: ["manom", "220", "règl"],
          hints: ["Il faut une mesure de pression et un réglage itératif.", "Marquer / plomber ensuite."],
          corr: "Manomètre sur le circuit compacteur → lancer une mise en pression → régler B4 jusqu’à basculement à 220 bar → verrouiller / marquer." },
        { id: "qforce", code: "Force max", dt: "enchaînement Q.1-2-3",
          prompt: "Force max de compactage à 220 bar, Ø 180 mm, en kN.",
          type: "num", unit: "kN", value: 560, tol: 10,
          hints: ["p = 2,2×10⁷ Pa, S ≈ 0,02545 m².", "F = pS puis /1000."],
          corr: "≈ 560 kN." },
      ],
    },
    {
      id: "p2", part: "2", title: "Porte de sortie", duration: "30 min", skill: "porte",
      questions: [
        { id: "q21", code: "Q.2-1", dt: "aucun",
          prompt: "Masse de la porte 500×500×50 mm, ρ = 7800 kg/m³ (kg).",
          type: "num", unit: "kg", value: 97.5, tol: 0.5,
          hints: ["V = 0,5×0,5×0,05 = 0,0125 m³.", "m = ρV."],
          corr: "97,5 kg." },
        { id: "q22", code: "Q.2-2", dt: "aucun",
          prompt: "Poids de la porte avec g = 9,81 (N).",
          type: "num", unit: "N", value: 956, tol: 6,
          hints: ["P = m g. Ici g n’est pas 10.", "97,5 × 9,81."],
          corr: "≈ 956 N. La suite impose P = 1000 N." },
        { id: "q23", code: "Q.2-3", dt: "aucun",
          prompt: "Avec P = 1000 N et F = 10 P, force de levage nécessaire (N).",
          type: "num", unit: "N", value: 10000, tol: 0,
          hints: ["Le facteur 10 vient du frottement pain / porte."],
          corr: "10 000 N." },
        { id: "q24", code: "Q.2-4", dt: "DT3",
          prompt: "Relever ØMM pour ØAL = 63 mm (mm).",
          type: "num", unit: "mm", value: 45, tol: 0,
          hints: ["Tableau CDH3, ligne 63."],
          corr: "45 mm." },
        { id: "q25", code: "Q.2-5", dt: "DT3",
          prompt: "Force du vérin en entrée de tige à 200 bar (N), puis conclure (convient / ne convient pas).",
          type: "text", expect: ["30", "convien"],
          hints: ["S = π(0,063²−0,045²)/4 ≈ 1,53×10⁻³ m².", "F ≈ 30 500 N ≫ 10 000 N."],
          corr: "F ≈ 30 500 N ≫ 10 000 N : le vérin CDH3 convient." },
      ],
    },
    {
      id: "p3", part: "3", title: "Alimentation électrique", duration: "70 min", skill: "puiss",
      questions: [
        { id: "q311", code: "Q.3-1-1", dt: "DR3",
          prompt: "Pour le moteur PRESSE (I = 21,5 A, cos φ = 0,86), Pabs en W (√3 U I cosφ).",
          type: "num", unit: "W", value: 12807, tol: 80,
          hints: ["√3 × 400 × 21,5 × 0,86.", "Ne pas prendre 11 000 W (c’est Pu)."],
          corr: "≈ 12 800 W." },
        { id: "q313", code: "Q.3-1-3", dt: "aucun (Pt=22 kW, Qt=14 kVAr)",
          prompt: "Puissance apparente St (kVA).",
          type: "num", unit: "kVA", value: 26.1, tol: 0.2,
          hints: ["√(22²+14²)."],
          corr: "26,1 kVA." },
        { id: "q313b", code: "Q.3-1-3 suite", dt: "aucun",
          prompt: "Intensité totale It sous 400 V (A).",
          type: "num", unit: "A", value: 37.7, tol: 0.5,
          hints: ["I = S / (√3 U)."],
          corr: "≈ 37,7 A (Ib = 38 A)." },
        { id: "q323", code: "Q.3-2-3", dt: "DT6–DT7",
          prompt: "Lettre de sélection du câble (chemin perforé, multicore PR) + le 6 mm² se conserve-t-il ? (ex. E oui)",
          type: "text", expect: ["lettre e", "6"],
          hints: ["DT6 : chemin perforé → E. K3 = 0,96 à 35 °C.", "I′z ≈ 49 A > 38 A."],
          corr: "Lettre E, K ≈ 0,96, I′z ≈ 49 A > Ib : le 6 mm² se conserve." },
        { id: "q331", code: "Q.3-3-1", dt: "DT9",
          prompt: "Type de défaut protégé par le déclencheur long retard.",
          type: "text", expect: ["surcharge"],
          hints: ["Thermique / échauffement, pas le court-circuit."],
          corr: "Surcharge (échauffement des conducteurs)." },
        { id: "q332", code: "Q.3-3-2", dt: "DT9",
          prompt: "Io=0,63 et Ir=0,8 sont-ils compatibles avec Ib=38 A ? Pourquoi, et quels réglages proposer ?",
          type: "text", expect: ["20", "intempest", "1"],
          hints: ["Seuil = 40×0,63×0,8 ≈ 20 A.", "Trop bas = déclenchements. Proposer Io=1, Ir=1 (ou 0,98)."],
          corr: "Non : seuil ≈ 20 A < 38 A → déclenchements intempestifs. Proposer Io = 1 et Ir ≈ 1." },
        { id: "q333", code: "Q.3-3-3", dt: "DT9",
          prompt: "Type de défaut protégé par le court retard.",
          type: "text", expect: ["court"],
          hints: ["Magnétique / court-circuit."],
          corr: "Court-circuit." },
      ],
    },
    {
      id: "p4", part: "4", title: "Barrière immatérielle", duration: "50 min", skill: "securite",
      questions: [
        { id: "q411", code: "Q.4-1-1", dt: "DP3, DT10",
          prompt: "Justifier le choix C4C-SA18010 (hauteur et portée).",
          type: "text", expect: ["1800", "10"],
          hints: ["DP3 : 1800 mm à la distance la plus défavorable. DT10 : champ 1800 mm, portée 10 m."],
          corr: "Hauteur de champ 1800 mm = besoin DP3. Portée 10 m largement suffisante." },
        { id: "q412", code: "Q.4-1-2", dt: "DT10–DT11",
          prompt: "Résolution de la barrière (mm).",
          type: "num", unit: "mm", value: 14, tol: 0,
          hints: ["DT11, ligne Résolution."],
          corr: "14 mm." },
        { id: "q422", code: "Q.4-2-2", dt: "DT4, DT5",
          prompt: "Sur quels composants la barrière agit-elle ? Effet sur le basculeur ?",
          type: "text", expect: ["basculeur", "km2"],
          hints: ["Relais de sécurité → contacteurs du basculeur.", "Arrêt du mouvement, pas de redémarrage sans acquittement."],
          corr: "Relais UE48 → KM2 (basculeur). Le basculeur s’arrête ; reprise après dégagement + bouton." },
        { id: "q431", code: "Q.4-3-1", dt: "DT11",
          prompt: "Temps de réponse de la barrière (ms), puis temps total T (ms) avec 220 ms d’arrêt machine.",
          type: "text", expect: ["20", "240"],
          hints: ["DT11 : 20 ms. Sommer à 220 ms."],
          corr: "20 ms ; T = 240 ms = 0,24 s." },
        { id: "q432", code: "Q.4-3-2", dt: "DT12–DT14, DP3",
          prompt: "Distance minimale S (mm). Peut-on installer sans modifier les lieux (570 mm) ?",
          type: "text", expect: ["480", "oui"],
          hints: ["S = 2000×0,24 + 8(14−14) = 480 mm.", "480 ≤ 500 et 480 < 570."],
          corr: "S = 480 mm. 570 > 480 : oui, sans modifier l’implantation." },
      ],
    },
    {
      id: "p5", part: "5", title: "Réseau informatique", duration: "20 min", skill: "securite",
      questions: [
        { id: "q511", code: "Q.5-1-1", dt: "DT18",
          prompt: "Adresse IP du réseau de la zone de production 1.",
          type: "text", expect: ["192.168.0.0"],
          hints: ["Masque 255.255.255.0, machines en 192.168.0.x.", "Adresse de réseau = x.x.x.0."],
          corr: "192.168.0.0 (masque 255.255.255.0)." },
        { id: "q512", code: "Q.5-1-2", dt: "DT18",
          prompt: "Nombre d’adresses d’hôtes possibles (hors réseau et broadcast).",
          type: "num", unit: "", value: 254, tol: 0,
          hints: ["2⁸ − 2 = 256 − 2."],
          corr: "254." },
        { id: "q513", code: "Q.5-1-3", dt: "DT18",
          prompt: "Proposer une IP pour l’API et une pour l’IHM (zone prod. 1), non utilisées.",
          type: "text", expect: ["192.168.0."],
          hints: ["Prises : .31, .33, .34, .36. Interdites : .0 et .255.", "Ex. 192.168.0.35 et 192.168.0.37."],
          corr: "Par exemple 192.168.0.35 (API) et 192.168.0.37 (IHM)." },
      ],
    },
  ];

  const TRANSFERT = [
    {
      session: "2025-06 · Métropole",
      support: "Transbordeur Stellantis (déjà sur ce site)",
      keep: "Lire le DT, convertir les unités, conclure par une phrase.",
      new: "Statique, plan 12°, chaîne de couples, 4–20 mA.",
    },
    {
      session: "2023-06 · Métropole",
      support: "Centre de pétrissage Pasquier (déjà sur ce site)",
      keep: "Lecture de catalogue, moteur, 4–20 mA.",
      new: "Courroies, classes d’équivalence, lubrification.",
    },
    {
      session: "2025-11 · NC",
      support: "Transstockeurs Kloosterboer",
      keep: "Disjoncteur, câble, conclusion chiffrée.",
      new: "Schéma TN, durée de vie L10, froid −20 °C.",
    },
  ];

  const CONTRAT = [
    "On n’ouvre pas le corrigé avant d’avoir écrit une réponse.",
    "Un indice utilisé = la question n’est pas « acquise ».",
    "On ne lance pas le blanc 4 h tant que le diagnostic n’est pas à 14/20 (ou le cœur hydro/porte au vert).",
    "Après le blanc, on change d’annale : retenir 560 kN par cœur ne rapporte rien le jour J suivant.",
  ];

  return { SKILLS, DATA_SUJET, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT };
})();
