/* Contenu pédagogique — Prépa E4 Sujet 0 (centrale d’air comprimé, fromagerie, ROLLAIR) */
window.PREPA = (() => {
  const SKILLS = [
    { id: "lecture", part: 1, name: "Lire la centrale", short: "500 m³/h, un seul, huile" },
    { id: "circuits", part: 2, name: "Circuits air et huile", short: "4 filtres, récup. énergie" },
    { id: "coupleur", part: 4, name: "Plaque Δ400 / Y690", short: "√3, 131 A, 75,6 A" },
    { id: "demarrage", part: 4, name: "Étoile-triangle et FR1", short: "KM1/2/3, 75,6 A, P7" },
    { id: "surete", part: 5, name: "Sûreté et ROLLAIR 125 V", short: "Redondance, 834 m³/h" },
    { id: "levage", part: 6, name: "Palan et charge Fz", short: "1939 kg → 20 000 N" },
    { id: "flexion", part: 6, name: "Flexion de la poutre", short: "FL/4, σ = 47,34 ≤ 55" },
    { id: "cable", part: 7, name: "Câbles lettre F", short: "K = 0,8692, Ir = 175 A" },
  ];

  const DATA_SUJET = [
    ["Site", "Centrale d’air comprimé · fromagerie (camembert)"],
    ["Compresseurs existants", "2 × Rollair 100 · vis · cylindrée fixe"],
    ["Débit unitaire", "742 m³/h"],
    ["Conso actuelle", "500 m³/h (pointe 600)"],
    ["Nouvelle ligne", "+ 620 m³/h · total 1 120 · pointe 1 390"],
    ["Pression régulée", "8 bar"],
    ["Moteur", "75 kW · IE2 · η = 93,9 % · cos φ = 0,88"],
    ["Plaque", "Δ 400 V · I = 131 A  /  Y 690 V · I = 75,6 A"],
    ["Démarrage M1 / M2", "Étoile-triangle / direct"],
    ["FR1", "75,6 A (enroulements en série = plaque Y)"],
    ["Contacteurs relevés", "KM1 & KM3 : LC1 D80 · KM2 : LC1 D50"],
    ["Bobine manquante", "P7 · 230 V 50/60 Hz"],
    ["VSD à choisir", "(1 390 / 2) × 1,2 = 834 m³/h → ROLLAIR 125 V"],
    ["Masse 125 V", "1 655 kg · H 1 600 · prof. 1 060 · fourches 728 mm"],
    ["Lève-palettes", "PB 20 · 200 kg · 180 kg"],
    ["Palan", "EFAM-20 · 2 000 kg · 104 kg"],
    ["Fz calculé puis retenu", "19 022 N puis 20 000 N"],
    ["Poutre", "IPE 240 · L = 3 m · 30,7 kg/m · Re 275 · S = 5"],
    ["W = I/v", "324 000 mm³"],
    ["Câbles installés", "H07 RNF 1 × 70 mm² · unipolaires · Cablofil"],
    ["Longueurs C1 / C2 / C3", "13,7 / 16,2 / 21,7 m"],
    ["Lettre / K", "F · K1 = 1 · K2 = 0,82 · K3 = 1,06 · K = 0,8692"],
    ["Ir actuel / proposé", "250 A → I′z = 284 A · Ir = 175 A"],
    ["Chute C3", "0,564 % · U = 402,7 V · total 4,13 % < 8 %"],
  ];

  const svgCentrale = `
  <svg class="schema" viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="30" y="40" width="150" height="70" fill="#efe7d6" stroke="#2a2412" stroke-width="2"/>
    <rect x="250" y="40" width="150" height="70" fill="#f4eee0" stroke="#2a2412" stroke-width="2" stroke-dasharray="5 3"/>
    <text x="105" y="70" text-anchor="middle" font-size="13" fill="#1f7a50">C1 en charge</text>
    <text x="105" y="90" text-anchor="middle" font-size="11" fill="#2a2412">742 m³/h</text>
    <text x="325" y="70" text-anchor="middle" font-size="13" fill="#5b4a32">C2 à l’arrêt</text>
    <text x="325" y="90" text-anchor="middle" font-size="11" fill="#5b4a32">secours auto</text>
    <path d="M180,75 L250,75" stroke="#c4473a" stroke-width="2" marker-end="url(#a)"/>
    <text x="230" y="28" font-size="12" fill="#5b4a32">500 m³/h &lt; 742 : un seul suffit</text>
    <text x="30" y="138" font-size="12" fill="#2a2412">LEADAIR équilibre les heures · 8 bar</text>
  </svg>`;

  const svgPoutre = `
  <svg class="schema" viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="50" y1="70" x2="410" y2="70" stroke="#2a2412" stroke-width="8"/>
    <polygon points="50,70 40,95 60,95" fill="#c9b48a" stroke="#2a2412"/>
    <polygon points="410,70 400,95 420,95" fill="#c9b48a" stroke="#2a2412"/>
    <path d="M230,30 L230,66" stroke="#c4473a" stroke-width="2.5"/>
    <text x="240" y="28" font-size="12" fill="#c4473a">Fz = 20 000 N</text>
    <text x="180" y="118" font-size="12" fill="#5b4a32">L = 3 000 mm · charge au milieu</text>
    <text x="70" y="148" font-size="12" fill="#1f7a50">Mf charge = F L / 4 = 15 × 10⁶ N·mm</text>
    <text x="30" y="50" font-size="11" fill="#2a2412">IPE 240</text>
  </svg>`;

  const DIAGNOSTIC = [
    { id: "d1", skill: "lecture",
      q: "La consommation moyenne actuelle de l’entreprise (DP1) vaut :",
      choices: ["1 390 m³/h", "742 m³/h", "500 m³/h", "620 m³/h"], ok: 2,
      why: "DP1 : 500 Nm³/h (pointe 600). 742 est le débit d’un Rollair 100. 620 / 1 390 arrivent après la nouvelle ligne." },
    { id: "d2", skill: "lecture",
      q: "Aujourd’hui, pour assurer 500 m³/h avec deux machines à 742 m³/h chacune :",
      choices: ["Un seul compresseur suffit, l’autre est en secours", "Les deux doivent tourner en permanence", "Il en faut trois", "Aucun ne suffit"], ok: 0,
      why: "500 < 742. La redondance (un à l’arrêt) garantit la sûreté : si l’un tombe, l’autre démarre tout seul." },
    { id: "d3", skill: "circuits",
      q: "Le fluide de refroidissement à l’intérieur du compresseur à vis est :",
      choices: ["Uniquement de l’eau glycolée", "De l’air seulement", "Du freon R134a", "De l’huile"], ok: 3,
      why: "Circuit d’huile sous pression de refoulement. L’eau n’apparaît que sur l’option récupération (échangeur plaques)." },
    { id: "d4", skill: "circuits",
      q: "Hormis les filtres d’admission, le circuit d’air comprimé compte :",
      choices: ["1 filtre", "4 filtres", "Aucun", "12 filtres"], ok: 1,
      why: "Q.2.2 : 4 filtres sur le réseau (hors admission). Les entourer sur DT11, pas inventer une décimale." },
    { id: "d5", skill: "coupleur",
      q: "Δ 400 V / Y 690 V sur la plaque signifie :",
      choices: ["Étoile sous 400 V, triangle sous 690 V", "Deux moteurs différents", "Triangle sous 400 V (I = 131 A), étoile sous 690 V (I = 75,6 A)", "Toujours 400 V, peu importe le couplage"], ok: 2,
      why: "Le réseau usine est 400 V entre phases → on couple en triangle. 690 V serait un autre réseau." },
    { id: "d6", skill: "coupleur",
      q: "La relation entre 690 V et 400 V est :",
      choices: ["690 / 400 = √3", "690 − 400 = 290", "690 × 400 = 276 000", "690 / 400 = 2"], ok: 0,
      why: "√3 ≈ 1,732. C’est la même machine : U_Y = U_Δ × √3, I_Y = I_Δ / √3." },
    { id: "d7", skill: "coupleur",
      q: "I = Pu / (η √3 U cos φ). Sous 400 V, η = 93,9 %, cos φ = 0,88, Pu = 75 kW. I vaut :",
      choices: ["75,6 A", "250 A", "43,7 A", "131 A"], ok: 3,
      why: "75 000 / (0,939 × √3 × 400 × 0,88) ≈ 131 A. 75,6 A est le courant étoile / plaque Y." },
    { id: "d8", skill: "demarrage",
      q: "Types de démarrage : M1 (compresseur) et M2 (ventilateur) :",
      choices: ["Les deux en direct", "M1 étoile-triangle, M2 direct", "Les deux en étoile-triangle", "M1 direct, M2 étoile-triangle"], ok: 1,
      why: "Schéma DT6/DT7 : M1 passe par KM1 + KM2 (Y) puis KM1 + KM3 (Δ). M2 est enclenché avec KM3, en direct." },
    { id: "d9", skill: "demarrage",
      q: "FR1 est en série avec chaque enroulement. On le règle à :",
      choices: ["131 A (courant ligne triangle)", "250 A (disjoncteur amont)", "43,7 A (courant étoile / √3)", "75,6 A (valeur plaque Y)"], ok: 3,
      why: "En série avec l’enroulement, FR1 voit I_enroulement = I_Y plaque = 75,6 A, pas le 131 A de ligne." },
    { id: "d10", skill: "demarrage",
      q: "KM2 sert surtout à :",
      choices: ["Réaliser le point commun étoile de M1", "Alimenter M2 en permanence", "Couper le thermique", "Remplacer Q15"], ok: 0,
      why: "KM1 = ligne M1. KM2 = point étoile. KM3 = triangle M1 et aussi l’alimentation de M2." },
    { id: "d11", skill: "surete",
      q: "Après la nouvelle ligne (1 120 m³/h, pointe 1 390), la sûreté de fonctionnement :",
      choices: ["S’améliore car on consomme plus", "Reste identique", "N’est plus garantie : les deux machines doivent tourner", "Devient inutile"], ok: 2,
      why: "1 120 > 742 : un seul ne suffit plus. Un à pleine charge + l’autre par intermittence. Plus de vrai secours." },
    { id: "d12", skill: "surete",
      q: "Débit mini du VSD, surdimensionné de 20 % sur la moitié de la pointe :",
      choices: ["1 390 m³/h", "834 m³/h", "742 m³/h", "500 m³/h"], ok: 1,
      why: "(1 390 / 2) × 1,2 = 834 m³/h → même gamme : ROLLAIR 125 V. Pas un 100, pas un 200." },
    { id: "d13", skill: "levage",
      q: "Masse totale palan + lève-palettes + 125 V :",
      choices: ["1 655 kg", "180 kg", "20 000 kg", "1 939 kg"], ok: 3,
      why: "104 + 180 + 1 655 = 1 939 kg. Le 20 000 est en newtons, après arrondi du sujet." },
    { id: "d14", skill: "levage",
      q: "Fz charge calculé (1 939 × 9,81), avant l’arrondi du sujet :",
      choices: ["19 022 N", "1 939 N", "20 000 kg", "903 N"], ok: 0,
      why: "1 939 × 9,81 = 19 022 N. Ensuite le sujet impose Fz = 20 000 N. 903 N est le poids de la poutre." },
    { id: "d15", skill: "flexion",
      q: "Charge ponctuelle au milieu d’une poutre sur deux appuis. Mf max =",
      choices: ["F L", "F L / 2", "F L / 4", "q L² / 8"], ok: 2,
      why: "F L / 4. q L² / 8 est le poids propre réparti. Ne pas mélanger les deux modèles." },
    { id: "d16", skill: "flexion",
      q: "Avec Fz = 20 000 N et L = 3 000 mm, Mf charge vaut :",
      choices: ["20 000 N·mm", "15 000 000 N·mm", "338 625 N·mm", "15 338 625 N·mm"], ok: 1,
      why: "20 000 × 3 000 / 4 = 15 × 10⁶ N·mm. 338 625 est Mf poutre. 15 338 625 est le total." },
    { id: "d17", skill: "flexion",
      q: "Re 275, S = 5. σ admissible et σ réelle (W = 324 000 mm³) :",
      choices: ["275 et 15", "55 et 55", "47,34 et 55 (donc rupture)", "55 et 47,34 (donc OK)"], ok: 3,
      why: "275 / 5 = 55 N/mm². σ = 15 338 625 / 324 000 = 47,34 ≤ 55 : le portique passe." },
    { id: "d18", skill: "cable",
      q: "Longueurs C1 / C2 / C3 lues sur DT22 :",
      choices: ["13,7 / 16,2 / 21,7 m", "20 / 20 / 20 m", "70 / 70 / 95 m", "0,5 / 1 / 2,7 m"], ok: 0,
      why: "Sommer les tronçons : C1 = 13,7 · C2 = 16,2 · C3 = 21,7 m. 70/95 sont des sections." },
    { id: "d19", skill: "cable",
      q: "Unipolaires sur chemin Cablofil, 3 circuits, 25 °C. Lettre et K :",
      choices: ["E et K = 0,71", "B et K = 1", "F et K = 0,8692", "F et K = 1"], ok: 2,
      why: "Monoconducteurs sur chemin → F. K1 = 1, K2 = 0,82 (3 circuits), K3 = 1,06 (25 °C) → 0,8692." },
    { id: "d20", skill: "cable",
      q: "Ce sujet écrit I′z = Iz / K. Ir = 250 A, K = 0,8692. I′z et section :",
      choices: ["217 A → 70 mm²", "284 A → 120 mm²", "185 A → 35 mm²", "250 A → 70 mm²"], ok: 1,
      why: "250 / 0,8692 ≈ 284 A (corrigé officiel). Lettre F, PVC3 → 120 mm², pas 70. Autre convention (I′z = Iz · K) : 2024 / NC 2025." },
  ];

  const FICHES = [
    {
      id: "lecture", title: "Un seul suffit… tant qu’on reste à 500 m³/h", skill: "lecture",
      html: `
        ${svgCentrale}
        <p>Deux Rollair 100 à vis, cylindrée fixe, gérés par LEADAIR. Débit unitaire <strong>742 m³/h</strong>. Conso actuelle <strong>500 m³/h</strong> (pointe 600). Pression 8 bar. Un en charge, un à l’arrêt : la redondance <em>est</em> la sûreté.</p>
        <p>Si l’un est en défaut : il s’arrête, l’autre <strong>démarre automatiquement</strong>. Refroidissement interne : <strong>huile</strong> (pas l’eau du réseau sanitaire).</p>
        <div class="trap"><strong>Piège sujet 0.</strong> Lire 600 (pointe), 742 (capacité), 1 120 ou 1 390 (après nouvelle ligne) à la place de 500. Q.1 demande l’état <em>actuel</em>, dossier de présentation.</div>
        <div class="okbox">Marche à vide : pas de compression, ~20 % de la puissance. Marche en charge : plein débit, pleine puissance.</div>
      `,
    },
    {
      id: "circuits", title: "4 filtres, 3 thermostats, récupération d’énergie", skill: "circuits",
      html: `
        <p>Parties 2 et 3 (20 min à deux) : on <strong>suit le fluide</strong> sur DT11 / DT2 / DT3, on ne raconte pas le métier.</p>
        <table>
          <tr><th>Question</th><th>Geste</th></tr>
          <tr><td>Air (un compresseur à l’arrêt)</td><td>Bleu + flèches, 3 bypass fermés, S = sortie utilisation</td></tr>
          <tr><td>Filtres (hors admission)</td><td><strong>4</strong>, entourés en rouge</td></tr>
          <tr><td>Air + huile au démarrage à froid</td><td>Figure A : bleu = air, rouge = huile sous pression de refoulement</td></tr>
        </table>
        <p>Récupération d’énergie = by-pass sur le circuit d’huile pour chauffer l’eau sanitaire. Trois cas de température (cuve 57) :</p>
        <table>
          <tr><th>Cas</th><th>Huile</th><th>Chemin typique</th></tr>
          <tr><td>1</td><td>30 °C en sortie de cuve</td><td>Pas encore vers l’échangeur (huile trop froide)</td></tr>
          <tr><td>2</td><td>65 °C puis 40 °C après plaques</td><td>Passe par l’échangeur eau-huile</td></tr>
          <tr><td>3</td><td>80 °C puis 70 °C après plaques</td><td>Encore l’échangeur, thermostat plus ouvert / autre voie</td></tr>
        </table>
        <div class="trap"><strong>Piège sujet 0.</strong> Colorier les bypass ouverts (l’énoncé les dit fermés). Compter les filtres d’admission. Oublier de mettre à jour le synoptique Q.3.3 (la récupération n’est pas sur DT2).</div>
      `,
    },
    {
      id: "coupleur", title: "Δ 400 V = le réseau usine, I = 131 A", skill: "coupleur",
      html: `
        <p>Plaque 75 kW, IE2, η = <strong>93,9 %</strong>, cos φ = 0,88.</p>
        <p><span class="formule">I = P<sub>u</sub> / (η √3 U cos φ)</span></p>
        <table>
          <tr><th>Couplage</th><th>U</th><th>I calculé</th><th>I plaque</th></tr>
          <tr><td>Triangle Δ</td><td>400 V</td><td>75 000 / (0,939 × √3 × 400 × 0,88) ≈ <strong>131 A</strong></td><td>131 A</td></tr>
          <tr><td>Étoile Y</td><td>690 V</td><td>≈ <strong>75,9 A</strong></td><td>75,6 A</td></tr>
        </table>
        <p>690 / 400 = <strong>√3</strong>. Même machine, autre réseau. Ici le réseau est 400 V → on est en <strong>triangle</strong>.</p>
        <div class="trap"><strong>Piège sujet 0.</strong> Inverser Δ et Y (« étoile sous 400 V »). Oublier η (I explose). Prendre U = 230 V. Confondre 131 A (ligne Δ) et 75,6 A (enroulement / Y).</div>
        <div class="okbox">IE2 sur la plaque = la classe de rendement, et c’est là qu’on lit 93,9 %.</div>
      `,
    },
    {
      id: "demarrage", title: "FR1 = 75,6 A, pas 131 A — bobine P7", skill: "demarrage",
      html: `
        <p>M1 (vis) démarre <strong>étoile-triangle</strong>. M2 (ventilateur) démarre <strong>en direct</strong>, en même temps que le passage triangle.</p>
        <table>
          <tr><th>Repère</th><th>Rôle</th></tr>
          <tr><td>Q15</td><td>Disjoncteur magnéto-thermique (sectionneur + thermique long retard + magnétique court retard)</td></tr>
          <tr><td>KM1</td><td>Contacteur de ligne de M1</td></tr>
          <tr><td>KM2</td><td>Point commun étoile de M1</td></tr>
          <tr><td>KM3</td><td>Triangle de M1 <em>et</em> alimentation de M2</td></tr>
        </table>
        <p>FR1 est <strong>en série avec chaque enroulement</strong> → il voit 75,6 A (plaque Y), pas 131 A.</p>
        <p>Relevé maintenance : KM1 et KM3 = <strong>LC1 D80</strong>, KM2 = <strong>LC1 D50</strong>. C’est cohérent :</p>
        <ul>
          <li>D80 : 75,6 A &lt; 80 A (courant dans les enroulements, pas le 131 A de ligne).</li>
          <li>D50 (étoile) : 75,6 / √3 ≈ 43,7 A &lt; 50 A. On peut aussi dire : l’étoile ne dure que ~5 s.</li>
        </ul>
        <div class="okbox">Il manque la tension de bobine : <strong>P7 = 230 V 50/60 Hz</strong> → LC1 D80 P7 et LC1 D50 P7. Le circuit de commande est à 230 V.</div>
        <div class="trap"><strong>Piège sujet 0.</strong> Régler FR1 à 131 A (il ne déclenchera jamais, ou trop tard). Croire que D80 est « trop petit » parce que 75 kW sous 400 V « demande un D150 ». D150 serait juste <em>si</em> le contacteur voyait le courant de ligne.</div>
      `,
    },
    {
      id: "surete", title: "Redondance perdue → ROLLAIR 125 V à 834 m³/h", skill: "surete",
      html: `
        <p>Nouvelle ligne : + 620 m³/h. Moyenne 1 120, pointe <strong>1 390 m³/h</strong>.</p>
        <p>1 120 &gt; 742 : un seul Rollair 100 ne suffit plus. Les deux tournent (un à fond, l’autre à vide / en charge). <strong>La sûreté n’est plus garantie</strong> : plus de machine de secours.</p>
        <p>Décision : ajouter un VSD. Un fixe + le VSD assurent la prod, l’autre fixe redevient secours.</p>
        <p>Intérêt du VSD ici : <strong>pas de marche à vide</strong>, <strong>moins de démarrages</strong> (chaque départ coûte cher).</p>
        <p>Surdimensionnement constructeur ≈ +20 % sur la moitié de la pointe (un fixe + un VSD) :</p>
        <p><span class="formule">(1 390 / 2) × 1,2 = 834 m³/h</span> → même gamme → <strong>ROLLAIR 125 V</strong>.</p>
        <div class="trap"><strong>Piège sujet 0.</strong> Prendre 1 390 × 1,2 (trop gros). Oublier le 20 %. Répondre « oui, la sûreté est OK » parce qu’il reste deux machines : elles ne sont plus redondantes.</div>
      `,
    },
    {
      id: "levage", title: "1 655 + 180 + 104 = 1 939 kg, puis 20 000 N", skill: "levage",
      html: `
        <p>Pas de chariot : on réarme le portique IPE 240 du local. Choisir lève-palettes + palan, puis la charge sur la poutre.</p>
        <table>
          <tr><th></th><th>Choix</th><th>Pourquoi</th></tr>
          <tr><td>Compresseur 125 V</td><td>1 655 kg · H 1 600 · prof. 1 060 · fourches 728 mm</td><td>DT14</td></tr>
          <tr><td>Lève-palettes</td><td><strong>PB 20</strong> (200 kg, 1 700 mm, fourches 400–1 000, masse 180 kg)</td><td>Hauteur et fourches OK. Option ME04 (1,2 m) possible, pas obligatoire</td></tr>
          <tr><td>Palan</td><td><strong>EFAM-20</strong> (2 000 kg, 104 kg)</td><td>1 655 + 180 &lt; 2 000</td></tr>
        </table>
        <p>Masse sur la poutre : 104 + 180 + 1 655 = <strong>1 939 kg</strong>.</p>
        <p>Fz = 1 939 × 9,81 = <strong>19 022 N</strong>. Le sujet impose ensuite <strong>20 000 N</strong> pour toute la flexion.</p>
        <div class="trap"><strong>Piège sujet 0.</strong> Oublier palan ou lève-palettes (rester à 1 655 kg). Utiliser g = 10 puis garder 19 390 N alors que la suite est calée sur 20 000. Choisir un palan 200 kg (c’est le lève-palettes).</div>
      `,
    },
    {
      id: "flexion", title: "FL/4 + qL²/8 = 15,34 × 10⁶ → 47,34 ≤ 55", skill: "flexion",
      html: `
        ${svgPoutre}
        <p>Deux modèles, deux formules, même unité <strong>N·mm</strong>.</p>
        <table>
          <tr><th>Origine</th><th>Modèle</th><th>Formule</th><th>Valeur</th></tr>
          <tr><td>Charge (palan + …)</td><td>Ponctuelle au milieu</td><td><span class="formule">M<sub>f</sub> = F L / 4</span></td><td>20 000 × 3 000 / 4 = <strong>15 000 000</strong></td></tr>
          <tr><td>Poids propre</td><td>Répartie</td><td>q = 30,7 × 3 × 9,81 = 903 N · <span class="formule">M<sub>f</sub> = q L² / 8</span></td><td>903 × 3 000 / 8 = <strong>338 625</strong></td></tr>
          <tr><td>Total</td><td></td><td>somme</td><td><strong>15 338 625 N·mm</strong></td></tr>
        </table>
        <p>Re 275, S = 5 → σ<sub>adm</sub> = 275 / 5 = <strong>55 N/mm²</strong>.</p>
        <p>Module W = I / v = <strong>324 000 mm³</strong> (DT20, IPE 240).</p>
        <p><span class="formule">σ = M<sub>f max</sub> / W = 15 338 625 / 324 000 = 47,34 N/mm²</span> ≤ 55 → <strong>le portique convient</strong>.</p>
        <div class="trap"><strong>Piège sujet 0.</strong> Appliquer qL²/8 à la charge ponctuelle (ou FL/4 à la poutre). Laisser L en mètres (M explose ou s’écroule). Prendre I (mm⁴) à la place de W = I/v. Comparer 47,34 à 275 sans diviser par 5.</div>
      `,
    },
    {
      id: "cable", title: "Lettre F, I′z = Iz / K, moins cher de baisser Ir", skill: "cable",
      html: `
        <p>H07 RNF 1 × 70 mm², unipolaires, Cablofil, 25 °C, 3 circuits (pire cas). Type constructeur H07 RNF → <strong>RAS</strong>.</p>
        <table>
          <tr><th></th><th>Longueur</th><th>Section installée</th><th>Préconisation</th></tr>
          <tr><td>C1</td><td>13,7 m</td><td>70</td><td>70 OK, longueur non</td></tr>
          <tr><td>C2</td><td>16,2 m</td><td>70</td><td>70 OK, longueur non</td></tr>
          <tr><td>C3</td><td>21,7 m</td><td>70</td><td>95 demandés + longueur</td></tr>
        </table>
        <p>Longueur trop grande → chute de tension, perte de couple. Section trop faible (C3) → échauffement en plus.</p>
        <p>Unipolaires sur chemin → lettre <strong>F</strong>. K1 = 1 · K2 = 0,82 (3 circuits, simple couche) · K3 = 1,06 (25 °C) → <strong>K = 0,8692</strong>.</p>
        <p>Convention de <em>ce</em> sujet (écrite dans Q.7.2) : <span class="formule">I′<sub>z</sub> = I<sub>z</sub> / K</span></p>
        <p>Ir = 250 A → I′z = 250 / 0,8692 ≈ <strong>284 A</strong> (corrigé) → tableau F / PVC3 → <strong>120 mm²</strong> ≫ 70.</p>
        <p>Sens inverse, garder le 70 mm² : I′z cat. = <strong>213 A</strong> → Iz max = 213 × 0,8692 ≈ <strong>185 A</strong>.</p>
        <div class="okbox">Solution économique : baisser Ir sous 185 A → <strong>175 A</strong>, au lieu de tirer du 120 mm². C1/C2 (In = 150 A) passent. C3 (In = 180 A) : 175 A est trop juste — le sujet le fait dire.</div>
        <p>Chute C3 (tableau 2,6 % / 100 m à 200 A, 70 mm²) : 21,7 × 2,6 / 100 = <strong>0,564 %</strong> → U = 405 × (1 − 0,00564) = <strong>402,7 V</strong>. Amont transfo 420 → 405 = 3,57 %. Total <strong>4,13 % &lt; 8 %</strong> (force motrice, poste privé). C1 et C2 : In plus petit et L plus courte → encore mieux, inutile de recalculer.</p>
        <div class="trap"><strong>Piège sujet 0.</strong> Utiliser I′z = Iz × K (convention 2024 / NC 2025) : on trouve 217 A et on « valide » le 70 mm² à tort. Lettre E (multicore). K3 à 45 °C. Sommer 0,5+1+2,7 sans les longs tronçons.</div>
      `,
    },
  ];

  const EXERCICES = [
    { id: "e1", skill: "lecture", title: "Conso actuelle",
      prompt: "Consommation moyenne actuelle (DP1), en m³/h.",
      type: "num", unit: "m³/h", value: 500, tol: 0,
      hint: "Pas la pointe 600, pas le 742 d’un Rollair, pas le 1 120 d’après travaux.",
      corr: "500 m³/h." },
    { id: "e2", skill: "lecture", title: "Combien de machines",
      prompt: "Pour 500 m³/h, chaque Rollair 100 débite 742 m³/h. Combien faut-il en marche ?",
      type: "mcq",
      choices: ["Deux en permanence", "Trois", "Un seul, l’autre en secours", "Aucun, le réseau suffit"],
      ok: 2, hint: "Comparer 500 et 742.",
      corr: "Un seul suffit. L’autre démarre tout seul si le premier tombe." },
    { id: "e3", skill: "circuits", title: "Filtres",
      prompt: "Nombre de filtres sur le circuit d’air, hors admission.",
      type: "num", unit: "", value: 4, tol: 0,
      hint: "DT11, ne pas compter les filtres d’aspiration des deux vis.",
      corr: "4 filtres." },
    { id: "e4", skill: "circuits", title: "Refroidissement interne",
      prompt: "Fluide de refroidissement à l’intérieur du compresseur :",
      type: "mcq",
      choices: ["Huile", "Eau de ville uniquement", "Azote", "Freon"],
      ok: 0, hint: "Circuit sous pression de refoulement, DT2 / DT3.",
      corr: "Huile. L’eau n’arrive que sur l’option récupération." },
    { id: "e5", skill: "coupleur", title: "690 / 400",
      prompt: "690 V / 400 V vaut :",
      type: "mcq",
      choices: ["2", "√2", "3", "√3"],
      ok: 3, hint: "Relation classique étoile / triangle.",
      corr: "√3 ≈ 1,732." },
    { id: "e6", skill: "coupleur", title: "I triangle",
      prompt: "I sous 400 V : Pu = 75 kW, η = 0,939, cos φ = 0,88. Résultat en A (ex. 131).",
      type: "num", unit: "A", value: 131, tol: 1,
      hint: "I = 75 000 / (0,939 × √3 × 400 × 0,88).",
      corr: "≈ 131 A (plaque Δ)." },
    { id: "e7", skill: "coupleur", title: "I étoile",
      prompt: "Même formule sous 690 V. I en A (ex. 75,9).",
      type: "num", unit: "A", value: 75.9, tol: 0.5,
      hint: "Remplacer 400 par 690. La plaque arrondit à 75,6 A.",
      corr: "≈ 75,9 A calculé, 75,6 A sur la plaque." },
    { id: "e8", skill: "demarrage", title: "M1 et M2",
      prompt: "Démarrage de M1 (vis) et de M2 (ventilateur) :",
      type: "mcq",
      choices: ["M1 direct, M2 étoile-triangle", "Les deux en direct", "M1 étoile-triangle, M2 direct", "Les deux en étoile-triangle"],
      ok: 2, hint: "KM3 ferme le triangle et alimente M2.",
      corr: "M1 : Y-Δ. M2 : direct." },
    { id: "e9", skill: "demarrage", title: "Réglage FR1",
      prompt: "Courant de réglage de FR1 (enroulements en série), en A.",
      type: "num", unit: "A", value: 75.6, tol: 0.4,
      hint: "Valeur plaque Y, pas le 131 A de ligne.",
      corr: "75,6 A." },
    { id: "e10", skill: "demarrage", title: "Bobine manquante",
      prompt: "Il manque sur LC1 D80 / D50 :",
      type: "mcq",
      choices: ["La section du câble", "La tension de bobine P7 230 V", "Le degré IP67", "La marque Schneider"],
      ok: 1, hint: "Circuit de commande 230 V.",
      corr: "P7 = 230 V 50/60 Hz." },
    { id: "e11", skill: "surete", title: "Après la nouvelle ligne",
      prompt: "1 120 m³/h en moyenne, machines à 742 m³/h. La redondance :",
      type: "mcq",
      choices: ["Disparaît : les deux doivent tourner", "Reste totale", "S’améliore", "Ne dépend que de LEADAIR"],
      ok: 0, hint: "Comparer 1 120 et 742.",
      corr: "Un seul ne suffit plus. Plus de vrai secours." },
    { id: "e12", skill: "surete", title: "Débit VSD",
      prompt: "(1 390 / 2) × 1,2. Débit mini en m³/h.",
      type: "num", unit: "m³/h", value: 834, tol: 1,
      hint: "Moitié de la pointe, puis +20 %.",
      corr: "834 m³/h → ROLLAIR 125 V." },
    { id: "e13", skill: "levage", title: "Masse sur la poutre",
      prompt: "104 + 180 + 1 655. Masse en kg.",
      type: "num", unit: "kg", value: 1939, tol: 0,
      hint: "Palan + lève-palettes + 125 V.",
      corr: "1 939 kg." },
    { id: "e14", skill: "levage", title: "Fz avant arrondi",
      prompt: "1 939 × 9,81. Force en N (ex. 19022).",
      type: "num", unit: "N", value: 19022, tol: 5,
      hint: "g = 9,81. Ensuite le sujet impose 20 000 N.",
      corr: "19 022 N, puis Fz = 20 000 N." },
    { id: "e15", skill: "flexion", title: "Mf charge",
      prompt: "F = 20 000 N, L = 3 000 mm. Mf = F L / 4 en N·mm.",
      type: "num", unit: "N·mm", value: 15000000, tol: 0,
      hint: "20 000 × 3 000 / 4. Pas qL²/8.",
      corr: "15 000 000 N·mm." },
    { id: "e16", skill: "flexion", title: "Mf poutre",
      prompt: "q = 903 N, L = 3 000 mm. Mf = q L / 8 en N·mm (ex. 338625).",
      type: "num", unit: "N·mm", value: 338625, tol: 20,
      hint: "903 × 3 000 / 8. Le corrigé écrit qL/8 avec L déjà en mm (équivalent à qL²/8 si L en m et conversion).",
      corr: "338 625 N·mm." },
    { id: "e17", skill: "flexion", title: "σ admissible",
      prompt: "Re 275, S = 5. σadm en N/mm².",
      type: "num", unit: "N/mm²", value: 55, tol: 0,
      hint: "275 / 5.",
      corr: "55 N/mm²." },
    { id: "e18", skill: "flexion", title: "σ réelle",
      prompt: "15 338 625 / 324 000. σ en N/mm² (ex. 47,34).",
      type: "num", unit: "N/mm²", value: 47.34, tol: 0.1,
      hint: "σ = Mf / W. W = 324 000 mm³, pas I en mm⁴.",
      corr: "47,34 ≤ 55 : portique OK." },
    { id: "e19", skill: "cable", title: "Longueur C3",
      prompt: "0,5 + 1 + 2,7 + 1 + 5 + 2,5 + 5,5 + 3,5. Longueur C3 en m.",
      type: "num", unit: "m", value: 21.7, tol: 0.05,
      hint: "Tous les tronçons de DT22 jusqu’à C3.",
      corr: "21,7 m (C1 = 13,7 · C2 = 16,2)." },
    { id: "e20", skill: "cable", title: "K",
      prompt: "K1 = 1, K2 = 0,82, K3 = 1,06. K = ?",
      type: "num", unit: "", value: 0.8692, tol: 0.001,
      hint: "Produit. Lettre F, 3 circuits, 25 °C.",
      corr: "0,8692." },
    { id: "e21", skill: "cable", title: "I′z demandé",
      prompt: "I′z = 250 / 0,8692 (convention de ce sujet). Résultat en A (ex. 284).",
      type: "num", unit: "A", value: 284, tol: 4,
      hint: "Iz / K, pas Iz × K. Le corrigé retient 284 A.",
      corr: "≈ 284 A → 120 mm² en lettre F / PVC3." },
    { id: "e22", skill: "cable", title: "Ir économique",
      prompt: "Iz max du 70 mm² ≈ 185 A. Réglage économique proposé (A).",
      type: "num", unit: "A", value: 175, tol: 0,
      hint: "Juste sous 185 A, calibre catalogue du disjoncteur.",
      corr: "175 A. OK pour C1/C2 (150 A), trop juste pour C3 (180 A)." },
  ];

  const DQR = [
    {
      id: "p1", part: "1", title: "Analyse préliminaire", duration: "10 min", skill: "lecture",
      questions: [
        { id: "q11", code: "Q.1-1", dt: "DP1, DT1",
          prompt: "Consommation moyenne actuelle d’air (m³/h).",
          type: "num", unit: "m³/h", value: 500, tol: 0,
          hints: ["DP1, pas le graphique d’après travaux.", "500, pas 600 (pointe)."],
          corr: "500 m³/h (pointe actuelle 600)." },
        { id: "q12", code: "Q.1-2", dt: "DP1, DT1",
          prompt: "Combien de Rollair 100 faut-il en marche pour cette moyenne ? Justifier avec le débit unitaire.",
          type: "text", expect: ["742", "un"],
          hints: ["Débit d’une machine : 742 m³/h.", "Comparer à 500."],
          corr: "Un seul : 742 m³/h > 500 m³/h. Le second est redondant." },
        { id: "q13", code: "Q.1-3", dt: "DP1, DP2",
          prompt: "Que se passe-t-il si l’un des deux est en défaut (plus d’air) ?",
          type: "text", expect: ["demarr", "auto"],
          hints: ["LEADAIR gère l’alternance.", "Le secours n’attend pas un opérateur."],
          corr: "Celui en défaut s’arrête, l’autre démarre automatiquement." },
        { id: "q14", code: "Q.1-4", dt: "DT2",
          prompt: "Nature du (des) fluide(s) de refroidissement à l’intérieur du compresseur.",
          type: "text", expect: ["huile"],
          hints: ["Ce n’est pas l’eau sanitaire.", "Circuit sous pression de refoulement."],
          corr: "Huile." },
      ],
    },
    {
      id: "p2", part: "2", title: "Circuits d’air et d’huile", duration: "10 min", skill: "circuits",
      questions: [
        { id: "q21", code: "Q.2-1", dt: "DT11",
          prompt: "Un compresseur à l’arrêt, 3 bypass fermés. Que représente S, et dans quel sens circule l’air ?",
          type: "text", expect: ["sortie", "utilis"],
          hints: ["S = utilisation usine.", "De la vis vers le réseau, bypass fermés = pas de court-circuit du traitement."],
          corr: "S = sortie d’utilisation. L’air va du compresseur en service vers le traitement puis S. Les 3 bypass restent fermés." },
        { id: "q22", code: "Q.2-2", dt: "DT11",
          prompt: "Nombre de filtres sur ce circuit d’air (hors admission des vis).",
          type: "num", unit: "", value: 4, tol: 0,
          hints: ["Ne pas compter les filtres d’aspiration.", "Les entourer en rouge sur le plan."],
          corr: "4 filtres." },
      ],
    },
    {
      id: "p3", part: "3", title: "Fonctionnement et récupération", duration: "20 min", skill: "circuits",
      questions: [
        { id: "q31", code: "Q.3-1", dt: "DT2, DT4",
          prompt: "Au démarrage à froid : quel fluide est en bleu, lequel est en rouge sur la figure A ?",
          type: "text", expect: ["air", "huile"],
          hints: ["Bleu = air comprimé, fléché.", "Rouge = huile sous pression de refoulement."],
          corr: "Bleu : circuit d’air complet. Rouge : circuit d’huile sous pression de refoulement (démarrage à froid)." },
        { id: "q32", code: "Q.3-2", dt: "DT3, DT4",
          prompt: "Récupération d’énergie, cas 1 (huile 30 °C en sortie de cuve 57) : l’huile passe-t-elle par l’échangeur plaques ?",
          type: "text", expect: ["non", "froid"],
          hints: ["30 °C : huile trop froide pour céder de la chaleur utile.", "Le by-pass / thermostat envoie ailleurs."],
          corr: "Non : à 30 °C l’huile ne passe pas (ou peu) par l’échangeur eau-huile. Les cas 2 (65 → 40 °C) et 3 (80 → 70 °C) oui." },
        { id: "q33", code: "Q.3-3", dt: "DT2, DR4",
          prompt: "Pourquoi faut-il compléter le synoptique constructeur (DR4) ?",
          type: "text", expect: ["recup", "synopt"],
          hints: ["La récupération a été ajoutée sur site.", "DT2 d’origine ne la montre pas."],
          corr: "L’option récupération n’est pas sur le synoptique DT2. DR4 met la doc en phase avec l’installation réelle." },
      ],
    },
    {
      id: "p4", part: "4", title: "Démarrage moteur", duration: "40 min", skill: "demarrage",
      questions: [
        { id: "q41a", code: "Q.4-1-a", dt: "DT5",
          prompt: "Signification exacte de Δ 400 V et Y 690 V (et les courants plaque).",
          type: "text", expect: ["triangle", "400"],
          hints: ["Δ = triangle, Y = étoile.", "IΔ = 131 A, IY = 75,6 A."],
          corr: "Triangle sur réseau 400 V (I = 131 A). Étoile sur réseau 690 V (I = 75,6 A)." },
        { id: "q41b", code: "Q.4-1-b", dt: "DT5",
          prompt: "Relation entre 690 V et 400 V.",
          type: "text", expect: ["690", "400"],
          hints: ["Diviser les deux tensions.", "C’est √3."],
          corr: "690 / 400 = √3." },
        { id: "q41c", code: "Q.4-1-c", dt: "DT5",
          prompt: "Justifier I = 131 A sous 400 V (écrire I calculé, en A).",
          type: "num", unit: "A", value: 131, tol: 1,
          hints: ["I = Pu / (η √3 U cos φ), η = 93,9 % = 0,939, cos φ = 0,88.", "Pu = 75 000 W, U = 400 V."],
          corr: "IΔ ≈ 131 A. Sous 690 V on trouve ≈ 75,9 A (plaque 75,6 A)." },
        { id: "q42a", code: "Q.4-2-a", dt: "DT6, DT7",
          prompt: "Type de démarrage de M1 et de M2.",
          type: "text", expect: ["etoile", "direct"],
          hints: ["M1 = vis, plusieurs contacteurs.", "M2 part avec KM3."],
          corr: "M1 : étoile-triangle. M2 : direct." },
        { id: "q42b", code: "Q.4-2-b", dt: "DT6",
          prompt: "Désignation de Q15 et fonctions de ses éléments.",
          type: "text", expect: ["disjonct", "therm"],
          hints: ["Magnéto-thermique / disjoncteur moteur.", "Sectionneur + thermique + magnétique."],
          corr: "Disjoncteur magnéto-thermique (disjoncteur moteur) : coupure / sectionnement, thermique (long retard), magnétique (court retard)." },
        { id: "q42c", code: "Q.4-2-c", dt: "DT6, DT7",
          prompt: "Fonctions de KM1, KM2 et KM3.",
          type: "text", expect: ["ligne", "etoile"],
          hints: ["KM1 reste collé dès le départ de M1.", "KM3 sert deux moteurs."],
          corr: "KM1 : ligne M1. KM2 : point étoile M1. KM3 : triangle M1 et alimentation de M2." },
        { id: "q44a", code: "Q.4-4-a", dt: "DT5, DT6",
          prompt: "Réglage de FR1 (A) et justification.",
          type: "text", expect: ["75,6", "enroulement"],
          hints: ["FR1 est en série avec chaque enroulement.", "C’est la valeur plaque Y."],
          corr: "75,6 A : courant admissible des enroulements (plaque Y), pas le 131 A de ligne." },
        { id: "q44b", code: "Q.4-4-b", dt: "DT8, DT9, DT10",
          prompt: "LC1 D80 (KM1, KM3) et LC1 D50 (KM2) sont-ils adaptés ?",
          type: "text", expect: ["80", "50"],
          hints: ["Les contacteurs voient 75,6 A, pas 131 A.", "KM2 : 75,6 / √3 ≈ 43,7 A."],
          corr: "Oui. D80 : 75,6 < 80 A. D50 : 43,7 < 50 A (et l’étoile est courte, ~5 s). Un D150 serait le calibre « courant de ligne »." },
        { id: "q44c", code: "Q.4-4-c", dt: "DT10",
          prompt: "Que manque-t-il aux références LC1 D80.. / D50.. ?",
          type: "text", expect: ["p7", "230"],
          hints: ["Tension des bobines.", "Circuit de commande 230 V → suffixe P7."],
          corr: "La tension de bobine P7 (230 V 50/60 Hz) : LC1 D80 P7 et LC1 D50 P7." },
      ],
    },
    {
      id: "p5", part: "5", title: "Dimensionnement du 3ᵉ compresseur", duration: "30 min", skill: "surete",
      questions: [
        { id: "q51", code: "Q.5-1", dt: "DP3, DP4, DT12",
          prompt: "Après la nouvelle ligne, la sûreté de fonctionnement est-elle encore garantie ? Pourquoi ?",
          type: "text", expect: ["non", "deux"],
          hints: ["1 120 > 742.", "Les deux doivent tourner, plus de secours."],
          corr: "Non : les deux machines doivent fonctionner (une à fond, l’autre par intermittence). La redondance a disparu." },
        { id: "q52", code: "Q.5-2", dt: "DT13",
          prompt: "Deux intérêts d’un VSD dans ce cas.",
          type: "text", expect: ["vide", "demarr"],
          hints: ["Marche à vide ≈ 20 % de Pn pour zéro m³/h.", "Chaque démarrage asynchrone coûte cher."],
          corr: "Plus de marche à vide · moins de démarrages (donc moins de surconsommation et de fatigue)." },
        { id: "q53", code: "Q.5-3", dt: "DT13, DT14",
          prompt: "Débit mini du VSD (m³/h) et référence retenue.",
          type: "text", expect: ["834", "125"],
          hints: ["(1 390 / 2) × 1,2.", "Même gamme Rollair."],
          corr: "834 m³/h → ROLLAIR 125 V." },
      ],
    },
    {
      id: "p6", part: "6", title: "Portique et flexion", duration: "50 min", skill: "flexion",
      questions: [
        { id: "q61a", code: "Q.6-1-a", dt: "DT14, DT15",
          prompt: "Lève-palettes retenu (référence) et un argument (masse / hauteur / fourches).",
          type: "text", expect: ["pb", "20"],
          hints: ["125 V : 1 655 kg, H 1 600, fourches 728 mm.", "PB 20 : 200 kg utiles, H 1 700, fourches 400–1 000."],
          corr: "PB 20 (masse 180 kg). Hauteur et écartement OK. ME04 (fourches 1,2 m) possible, pas indispensable." },
        { id: "q61b", code: "Q.6-1-b", dt: "DT16",
          prompt: "Palan retenu (référence).",
          type: "text", expect: ["efam", "2000"],
          hints: ["Il faut soulever ≈ 1,8 t.", "EFAM-20 : 2 000 kg, 104 kg."],
          corr: "EFAM-20, capacité 2 000 kg, masse 104 kg." },
        { id: "q62", code: "Q.6-2", dt: "aucun",
          prompt: "Fz charge calculé (N), avant l’arrondi du sujet.",
          type: "num", unit: "N", value: 19022, tol: 10,
          hints: ["104 + 180 + 1 655 = 1 939 kg.", "× 9,81."],
          corr: "19 022 N. Ensuite on prend 20 000 N." },
        { id: "q63", code: "Q.6-3", dt: "aucun",
          prompt: "Mf charge max (N·mm) avec F = 20 000 N, L = 3 000 mm.",
          type: "num", unit: "N·mm", value: 15000000, tol: 0,
          hints: ["Charge au milieu : F L / 4.", "Garder les mm."],
          corr: "15 000 000 N·mm." },
        { id: "q64", code: "Q.6-4", dt: "DT20",
          prompt: "Poids propre de la poutre Fz poutre (N).",
          type: "num", unit: "N", value: 903, tol: 2,
          hints: ["30,7 kg/m × 3 m × 9,81."],
          corr: "903 N." },
        { id: "q65", code: "Q.6-5", dt: "aucun",
          prompt: "Mf poutre (N·mm).",
          type: "num", unit: "N·mm", value: 338625, tol: 30,
          hints: ["Charge répartie : q L / 8 avec L en mm, ou q L² / 8 cohérent en unités.", "903 × 3 000 / 8."],
          corr: "338 625 N·mm." },
        { id: "q66", code: "Q.6-6", dt: "aucun",
          prompt: "Mf max total (N·mm).",
          type: "num", unit: "N·mm", value: 15338625, tol: 50,
          hints: ["Sommer les deux moments."],
          corr: "15 338 625 N·mm." },
        { id: "q67a", code: "Q.6-7-a", dt: "DT20",
          prompt: "σ admissible (N/mm²), Re 275, S = 5.",
          type: "num", unit: "N/mm²", value: 55, tol: 0,
          hints: ["275 / 5."],
          corr: "55 N/mm²." },
        { id: "q67b", code: "Q.6-7-b", dt: "DT20",
          prompt: "σ réelle (N/mm²), W = 324 000 mm³.",
          type: "num", unit: "N/mm²", value: 47.34, tol: 0.1,
          hints: ["σ = Mf / W.", "15 338 625 / 324 000."],
          corr: "47,34 N/mm²." },
        { id: "q67c", code: "Q.6-7-c", dt: "aucun",
          prompt: "Comparer et conclure sur le portique.",
          type: "text", expect: ["47", "55"],
          hints: ["47,34 ? 55.", "Une phrase de conclusion."],
          corr: "47,34 ≤ 55 N/mm² : le portique est apte à soulever le 125 V." },
      ],
    },
    {
      id: "p7", part: "7", title: "Vérification des câbles", duration: "60 min", skill: "cable",
      questions: [
        { id: "q71a", code: "Q.7-1-a", dt: "DT22",
          prompt: "Longueurs C1, C2, C3 (m). Écrire les trois (ex. 13.7 16.2 21.7).",
          type: "text", expect: ["13", "21"],
          hints: ["Sommer chaque parcours depuis l’armoire.", "C3 a deux tronçons de plus que C1."],
          corr: "C1 = 13,7 m · C2 = 16,2 m · C3 = 21,7 m." },
        { id: "q71b", code: "Q.7-1-b", dt: "DT21",
          prompt: "Bilan type / longueur / section pour C1, C2, C3 (conséquences).",
          type: "text", expect: ["h07", "70"],
          hints: ["Type H07 RNF : conforme.", "C1/C2 : 70 mm² OK, L trop grande. C3 : 70 au lieu de 95, et L trop grande."],
          corr: "Type H07 RNF : RAS. C1/C2 : section OK, longueur non → chute de tension / perte de couple. C3 : 70 au lieu de 95 + longueur → échauffement et chute de tension." },
        { id: "q72", code: "Q.7-2", dt: "DT25, DT26, DT27",
          prompt: "Lettre, K1 K2 K3 K, puis I′z (A) si Ir = 250 A, et section à retenir.",
          type: "text", expect: ["lettre f", "284"],
          hints: ["Unipolaires Cablofil → F. K = 1 × 0,82 × 1,06 = 0,8692.", "I′z = Iz / K = 250 / 0,8692 ≈ 284 A → 120 mm²."],
          corr: "Lettre F · K1 = 1 · K2 = 0,82 · K3 = 1,06 · K = 0,8692. I′z ≈ 284 A → 120 mm², incompatible avec 70 mm²." },
        { id: "q73a", code: "Q.7-3-a", dt: "DT18, DT27",
          prompt: "Pour 70 mm², I′z cat. puis Iz max (A). Donner Iz max (ex. 185).",
          type: "num", unit: "A", value: 185, tol: 2,
          hints: ["Tableau 70 mm², PVC3, lettre F : I′z = 213 A.", "Iz = 213 × 0,8692 ≈ 185 A."],
          corr: "I′z = 213 A · Iz max ≈ 185 A." },
        { id: "q73b", code: "Q.7-3-b", dt: "aucun",
          prompt: "Solution économique autre que changer les câbles, et valeur d’Ir (A).",
          type: "text", expect: ["175", "disjonct"],
          hints: ["Baisser le réglage sous 185 A.", "Calibre 175 A."],
          corr: "Régler les disjoncteurs à Ir = 175 A." },
        { id: "q74", code: "Q.7-4", dt: "DT21",
          prompt: "Ir = 175 A convient-il aux trois In (C1/C2 = 150 A, C3 = 180 A) ?",
          type: "text", expect: ["150", "180"],
          hints: ["Comparer chaque In à 175 A.", "C3 : 180 > 175."],
          corr: "C1 et C2 : 150 < 175, OK. C3 : 180 > 175, le réglage de Q3 ne convient plus." },
        { id: "q75a", code: "Q.7-5-a", dt: "DT28, DT29",
          prompt: "Tension à l’entrée de C3 (V), 70 mm², 21,7 m, 2,6 % / 100 m à 200 A, U armoire = 405 V.",
          type: "num", unit: "V", value: 402.7, tol: 0.3,
          hints: ["Chute = 21,7 / 100 × 2,6 = 0,564 %.", "U = 405 × (1 − 0,00564)."],
          corr: "402,7 V." },
        { id: "q75b", code: "Q.7-5-b", dt: "DT29",
          prompt: "Cette chute totale est-elle acceptable (limite 8 %, transfo 420 V → armoire 405 V) ?",
          type: "text", expect: ["8", "4"],
          hints: ["Amont : (420 − 405) / 420 = 3,57 %.", "Total 3,57 + 0,564 = 4,13 %."],
          corr: "Oui : 4,13 % ≪ 8 % (force motrice, poste privé)." },
        { id: "q75c", code: "Q.7-5-c", dt: "aucun",
          prompt: "Pourquoi ne pas refaire le calcul pour C1 et C2 ?",
          type: "text", expect: ["courant", "longueur"],
          hints: ["In C1/C2 < In C3.", "L C1/C2 < L C3."],
          corr: "In plus faibles et longueurs plus courtes : les chutes sont forcément plus petites, donc acceptables." },
      ],
    },
  ];

  const TRANSFERT = [
    {
      session: "2025-06 · Métropole",
      support: "Transbordeur Stellantis (déjà sur ce site)",
      keep: "Conclure par une phrase chiffrée, lire une plaque, un DT avant de calculer.",
      new: "Plan 12°, chaîne de couples, 4–20 mA, variateur.",
    },
    {
      session: "2024-06 · Métropole",
      support: "Presse ALLTUB (déjà sur ce site)",
      keep: "Lettre de câble, K1 K2 K3, Ib ≤ Ir ≤ Iz.",
      new: "Hydraulique deux pompes, section annulaire, barrière ISO 13855. Attention : I′z = Iz · K (convention inverse du sujet 0).",
    },
    {
      session: "2025-11 · NC",
      support: "Transstockeurs Kloosterboer (déjà sur ce site)",
      keep: "Lettre de pose, K3 selon la température du câble (pas celle du hall).",
      new: "TN-C/S, IR/Ii, Lmax avec V = 230 V, L10.",
    },
  ];

  const CONTRAT = [
    "On n’ouvre pas le corrigé avant d’avoir écrit une réponse.",
    "Un indice utilisé = la question n’est pas « acquise ».",
    "On ne lance pas le blanc 4 h tant que le diagnostic n’est pas à 14/20 (ou le cœur plaque / FR1 / flexion / câble au vert).",
    "Après le blanc, on change d’annale : retenir 834 m³/h ou 47,34 N/mm² par cœur ne rapporte rien le jour J suivant.",
  ];

  return { SKILLS, DATA_SUJET, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT };
})();
