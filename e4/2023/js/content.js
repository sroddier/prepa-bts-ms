/* Contenu pédagogique — Prépa E4 2023 (centre de pétrissage Pasquier Étoile) */
window.PREPA = (() => {
  const SKILLS = [
    { id: "cinematique", part: 1, name: "Classes d’équivalence", short: "Solides, pivots, DR1" },
    { id: "roulement", part: 1, name: "Roulements catalogue", short: "d, D, B, C" },
    { id: "clavette", part: 1, name: "Clavettes", short: "Couple arbre / moyeu" },
    { id: "poulie", part: 2, name: "Décoder une poulie", short: "PBT, SPA, D, 2G" },
    { id: "courroie", part: 2, name: "Longueur de courroie", short: "LAC, SPA 2650" },
    { id: "huile", part: 3, name: "Rossi et huile", short: "B3 ≠ montage réel" },
    { id: "kp", part: 3, name: "Kp et Compabloc", short: "AGMA II, réf. 3331" },
    { id: "mesure", part: 4, name: "4–20 mA et API", short: "Quantum, %IW, Ladder" },
  ];

  const DATA_SUJET = [
    ["Poulie 12", "PBT SPA-A D.100 2G"],
    ["Poulie 15", "PBT SPA-A D560 2G"],
    ["Entraxe 12–15", "780 mm"],
    ["Formule LAC", "2E + 1,57(D+d) + (D−d)²/(4E)"],
    ["LAC calculé", "≈ 2664 mm"],
    ["Courroie à commander", "SPA 2650 · 2 courroies"],
    ["Motoréducteur existant", "Rossi MR 2I 5-90S 4 B5 / 274"],
    ["Volume écrit en gamme", "1,2 L (incorrect)"],
    ["Taille Rossi", "5"],
    ["Huile taille 5", "B3 = 1,2 L · V6 = 1,7 L · V5 = 2,0 L"],
    ["Moteur", "4 kW · 4 pôles"],
    ["Ns recherchée", "274 min⁻¹"],
    ["Durée journalière", "10 h/j"],
    ["Application AGMA", "Malaxeur / pétrin · classe II"],
    ["Kp requis", "1,4"],
    ["Choix Compabloc (extrait 3 kW)", "réf. 3331 · Ns = 261 · Kp = 1,40"],
    ["Sonde", "PT100 + convertisseur 4–20 mA"],
    ["Plage convertisseur", "20 °C → 100 °C"],
    ["Consigne évacuation", "65 °C ± 3 °C"],
    ["API", "Schneider TSX57 · AEY800 rack 1 pos. 5 voie 3"],
    ["Codage", "12 bits"],
  ];

  const svgCourroie = `
  <svg class="schema" viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="90" cy="110" rx="28" ry="28" fill="#efe7d6" stroke="#2a2412" stroke-width="2"/>
    <ellipse cx="320" cy="110" rx="78" ry="78" fill="#efe7d6" stroke="#2a2412" stroke-width="2"/>
    <path d="M90,82 L320,32" stroke="#c4473a" stroke-width="3" fill="none"/>
    <path d="M90,138 L320,188" stroke="#c4473a" stroke-width="3" fill="none"/>
    <path d="M90,145 L320,145" stroke="#5b4a32" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="180" y="140" font-size="12" fill="#5b4a32">E = 780 mm</text>
    <text x="62" y="72" font-size="12" fill="#2a2412">d = 100</text>
    <text x="300" y="22" font-size="12" fill="#2a2412">D = 560</text>
    <text x="20" y="195" font-size="12" fill="#1f7a50">LAC = 2E + 1,57(D+d) + (D−d)² / (4E)</text>
  </svg>`;

  const svgMesure = `
  <svg class="schema" viewBox="0 0 460 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="50" y1="140" x2="420" y2="140" stroke="#2a2412" stroke-width="1.5"/>
    <line x1="50" y1="140" x2="50" y2="20" stroke="#2a2412" stroke-width="1.5"/>
    <path d="M90,120 L370,40" stroke="#c4473a" stroke-width="2.5"/>
    <circle cx="90" cy="120" r="4" fill="#c4473a"/>
    <circle cx="370" cy="40" r="4" fill="#c4473a"/>
    <circle cx="237" cy="78" r="4" fill="#1f7a50"/>
    <circle cx="258" cy="72" r="4" fill="#1f7a50"/>
    <text x="70" y="155" font-size="12" fill="#2a2412">20 °C</text>
    <text x="350" y="155" font-size="12" fill="#2a2412">100 °C</text>
    <text x="12" y="124" font-size="12" fill="#2a2412">4</text>
    <text x="12" y="44" font-size="12" fill="#2a2412">20</text>
    <text x="245" y="68" font-size="11" fill="#1f7a50">62 / 68 °C</text>
    <text x="160" y="20" font-size="12" fill="#5b4a32">I = 4 + 16 (T − 20) / 80</text>
  </svg>`;

  const DIAGNOSTIC = [
    { id: "d1", skill: "cinematique",
      q: "Une classe d’équivalence cinématique regroupe des pièces :",
      choices: ["De la même couleur sur le plan", "Sans mouvement relatif entre elles", "De même puissance", "Du même fournisseur"], ok: 1,
      why: "Pièces rigidement liées = un seul solide cinématique. On les colorie ensemble sur DR1." },
    { id: "d2", skill: "cinematique",
      q: "Colorier les classes d’équivalence avant une intervention sert surtout à :",
      choices: ["Décorer le dossier", "Repérer les solides et les guidages avant de démonter", "Calculer LAC", "Régler un Kp"], ok: 1,
      why: "On sait ce qui tourne avec quoi. On évite de séparer deux pièces d’une même classe, ou d’oublier un roulement de pivot." },
    { id: "d3", skill: "roulement",
      q: "Pour un roulement catalogue, les quatre grandeurs à relever (Q.1-2) sont :",
      choices: ["Prix, couleur, marque, masse", "d intérieur, D extérieur, largeur, charge dynamique C", "Iz, Io, Ir, Im", "Kp, Ns, Pu, B5"], ok: 1,
      why: "DT3 / DT4 : d, D (ou d1/d2), B (ou l1), C. Co est utile, ce n’est pas demandé ici." },
    { id: "d4", skill: "roulement",
      q: "La charge dynamique de base C d’un roulement sert principalement à :",
      choices: ["Régler un disjoncteur", "Dimensionner la capacité / une durée de vie", "Mesurer une température", "Choisir une lettre de câble"], ok: 1,
      why: "Donnée catalogue pour la capacité de charge. On la lit, on ne la calcule pas le jour J." },
    { id: "d5", skill: "clavette",
      q: "Le rôle typique d’une clavette arbre / moyeu est de :",
      choices: ["Mesurer une température", "Transmettre un couple (et caler angulairement)", "Limiter une pression", "Coder un mot image"], ok: 1,
      why: "Entraînement en rotation + indexage. Clavettes A et B du DT7 : poulie / arbre." },
    { id: "d6", skill: "poulie",
      q: "Dans PBT SPA-A D.100 2G, le « 2G » indique :",
      choices: ["Deux pôles moteur", "Deux gorges (donc deux courroies)", "Un entraxe de 2 m", "Un Kp de 2"], ok: 1,
      why: "Nombre de gorges = nombre de courroies à commander. SPA = section, D.100 = diamètre primitif 100 mm, PBT = moyeu amovible." },
    { id: "d7", skill: "poulie",
      q: "L’entraxe entre les poulies 12 et 15 se lit :",
      choices: ["Sur la plaque moteur (4 kW)", "Dans DP3 / nomenclature : 780 mm", "Dans le tableau AGMA", "Sur la carte AEY800"], ok: 1,
      why: "DP3, valeurs « entraxe -12- -15- : 780 mm ». On ne le mesure pas sur le schéma 3D." },
    { id: "d8", skill: "courroie",
      q: "La longueur approximative d’une courroie trapézoïdale (formule n° 4 du DT2) dépend de :",
      choices: ["U et I seulement", "Des diamètres primitifs D, d et de l’entraxe E", "De ρ acier seulement", "Du quantum 12 bits"], ok: 1,
      why: "LAC = 2E + 1,57(D+d) + (D−d)²/(4E). Puis on choisit la longueur ISO la plus proche." },
    { id: "d9", skill: "courroie",
      q: "Avec LAC ≈ 2664 mm en section SPA, on commande :",
      choices: ["SPA 2582 (déjà en stock ailleurs)", "SPA 2650, 2 courroies", "SPA 2800, 1 courroie", "SPC 2650, 4 courroies"], ok: 1,
      why: "DT8 : SPA 2650 est la plus proche de 2664. 2G → deux courroies. SPA 2582 est une autre transmission (repère 8)." },
    { id: "d10", skill: "huile",
      q: "Décoder MR 2I 5-90S 4 B5 / 274 donne notamment :",
      choices: ["Un courant Ib = 274 A", "Taille 5, 2 trains, 4 pôles, Ns = 274 min⁻¹, bride moteur B5", "Une courroie SPA 274", "Un rack API n° 274"], ok: 1,
      why: "Chaque champ a un sens (DT11). B5 est la forme moteur, pas la position du réducteur." },
    { id: "d11", skill: "huile",
      q: "Le volume d’huile d’un réducteur Rossi dépend surtout de :",
      choices: ["La tension 400 V", "La taille et de la position de montage réelle", "Uniquement de la couleur d’huile", "Du quantum"], ok: 1,
      why: "Table DT11 : colonnes B3 / (B6 B7 B8 V6) / V5. Même taille, volumes différents." },
    { id: "d12", skill: "huile",
      q: "La gamme indique 1,2 L. Cette valeur correspond à :",
      choices: ["V5 taille 5", "B3 taille 5 (défaut catalogue, pas le montage réel)", "V6 taille 7", "Toujours le bon volume, quelle que soit la position"], ok: 1,
      why: "1,2 L = taille 5 en B3. B3 est le défaut (non écrit dans la référence). Le DT montre un montage vertical → autre colonne." },
    { id: "d13", skill: "kp",
      q: "Pour un malaxeur / pétrin 10 h/j, le tableau AGMA et DT13 donnent :",
      choices: ["Classe I, Kp = 1", "Classe II, Kp = 1,4", "Classe III, Kp = 2", "Kp = 0"], ok: 1,
      why: "DT14 : malaxeurs à densité variable et pétrins, 10 h/j → II. DT13 : classe II → Kp = 1,4." },
    { id: "d14", skill: "kp",
      q: "Pour valider une référence Compabloc de remplacement, on exige :",
      choices: ["Ns la plus loin possible et Kp < Kp requis", "Pu / pôles respectés, Ns la plus proche, Kp choisi ≥ Kp requis", "Uniquement le plus petit prix", "Uniquement B5"], ok: 1,
      why: "Énoncé Q.3-2-2. Extrait 3 kW : 3331, Ns = 261 (proche de 274), Kp = 1,40." },
    { id: "d15", skill: "mesure",
      q: "Le signal qui arrive sur la carte AEY800 est :",
      choices: ["Numérique TOR 0/1", "Analogique de courant 4–20 mA", "Triphasé 400 V", "Une pression en bars"], ok: 1,
      why: "PT100 → convertisseur → 4–20 mA. Grandeur continue normalisée." },
    { id: "d16", skill: "mesure",
      q: "Surveiller 65 °C ± 3 °C, c’est surveiller l’intervalle :",
      choices: ["62 à 68 °C", "65 à 68 °C", "60 à 65 °C", "20 à 100 °C"], ok: 0,
      why: "Consigne ± tolérance. 20–100 °C est la plage du convertisseur, pas la consigne process." },
    { id: "d17", skill: "mesure",
      q: "Quantum d’un CAN 12 bits sur une plage 16 mA (méthode DT20) :",
      choices: ["16 × 4096 mA", "16 / (2¹² − 1) ≈ 3,91 µA", "12 / 16 mA", "4096 mA"], ok: 1,
      why: "q = plage / (2ⁿ − 1). 16 / 4095 ≈ 3,91 µA. L’approx. 16/4096 est acceptée." },
    { id: "d18", skill: "mesure",
      q: "En 4–20 mA pour 20–100 °C, I(62 °C) vaut :",
      choices: ["4 mA", "12,4 mA", "16 mA", "20 mA"], ok: 1,
      why: "I = 4 + 16 × (62 − 20) / 80 = 4 + 8,4 = 12,4 mA. I(68 °C) = 13,6 mA." },
    { id: "d19", skill: "mesure",
      q: "Carte AEY800, rack 1, position 5, voie 3. Le mot image, sur le modèle DT17, s’écrit :",
      choices: ["%QW204.3", "192.168.0.35", "%IW105.3", "%M16"], ok: 2,
      why: "Exemple officiel : %IW102.5 = rack 1, pos. 2, voie 5. Donc rack 1, pos. 5, voie 3 → %IW105.3." },
    { id: "d20", skill: "mesure",
      q: "Le bit %M16 doit passer à 1 lorsque la température sort des seuils. Le Ladder compare :",
      choices: ["Le mot image aux mots %MW1150 et %MW1151", "LAC à 2650", "Kp à 1,4", "Ib à Iz"], ok: 0,
      why: "Q.4-1-9 : %MW1150 / %MW1151 stockent les seuils. Comparaison → %M16." },
  ];

  const FICHES = [
    {
      id: "cinematique", title: "Classes d’équivalence et pivots", skill: "cinematique",
      html: `
        <p>Partie 1 : on <strong>lit le plan</strong> avant de commander un roulement. Une classe d’équivalence = pièces <em>sans mouvement relatif</em>.</p>
        <table>
          <tr><th>Question</th><th>Où lire</th><th>Réflexe</th></tr>
          <tr><td>Q.1-1 roulements de pivot</td><td>DT5 + DT6 + DT7</td><td>Repérer le pivot, puis les roulements entre ce pivot et l’ensemble fixe</td></tr>
          <tr><td>Q.1-4 coloriage</td><td>DR1</td><td>Bleu = fouet court (2) · rouge = fouet long (10) · vert = pivot (30)</td></tr>
        </table>
        <p>Sur DT7, les trois pivots (2), (10), (30) sont dessinés par rapport à l’ensemble fixe : chaque pivot a ses propres roulements.</p>
        <div class="okbox">Fouet court (2) : roulements (1) et (3). Fouet long (10) : (9) et (17). Pivot (30) : ceux qui le lient au bâti (lire DT5/DT6, ne pas inventer).</div>
        <div class="trap"><strong>Piège 2023.</strong> Colorier une poulie avec son arbre alors qu’une clavette transmet le couple : poulie et arbre sont bien de la même classe (pas de mouvement relatif). En revanche deux arbres liés par une courroie sont deux classes distinctes.</div>
      `,
    },
    {
      id: "roulement", title: "Lire un catalogue de roulements", skill: "roulement",
      html: `
        <p>Q.1-2 demande quatre grandeurs pour (1), (3), (9), (17). On ouvre DT6 pour la référence, DT3 ou DT4 pour les cotes.</p>
        <table>
          <tr><th>Repère</th><th>Référence</th><th>d (mm)</th><th>D (mm)</th><th>B (mm)</th><th>C (kN)</th></tr>
          <tr><td>(1) et (17)</td><td>3308B.2RSR.TVH (DT3)</td><td>40</td><td>90</td><td>36,5</td><td>67</td></tr>
          <tr><td>(3) et (9)</td><td>NU2210 ECP (DT4)</td><td>50</td><td>90</td><td>23</td><td>90</td></tr>
        </table>
        <p>DT3 parle de d1 / d2 / l1 : ce sont d, D et la largeur. C = charge dynamique de base.</p>
        <div class="trap"><strong>Piège 2023.</strong> Confondre C et C₀ (statique), ou lire la ligne 3308-B-2RS-TNH (C = 69 kN) au lieu de 3308B-2RSR-TVH (C = 67 kN). La référence DT6 tranche.</div>
      `,
    },
    {
      id: "clavette", title: "Clavettes A et B", skill: "clavette",
      html: `
        <p>DT7 : clavette A et clavette B entre arbres et poulies du mélangeur.</p>
        <p>Deux fonctions, toujours les mêmes :</p>
        <ol>
          <li><strong>Transmettre le couple</strong> de l’arbre au moyeu (entraînement en rotation).</li>
          <li><strong>Indexer</strong> angulairement (position de calage de la poulie).</li>
        </ol>
        <p>Ce n’est ni un frein, ni un capteur, ni un limiteur de pression.</p>
        <div class="okbox">En maintenance : clavette cisailée = plus de transmission. On relève la forme (disque, parallèle) et on remplace à l’identique.</div>
      `,
    },
    {
      id: "poulie", title: "Décoder PBT SPA-A D.100 2G", skill: "poulie",
      html: `
        <p>DT2 donne la clé. On l’applique aux poulies 12 et 15 (DT1 / DP3).</p>
        <table>
          <tr><th>Champ</th><th>Poulie 12</th><th>Poulie 15</th></tr>
          <tr><td>Type (moyeu)</td><td>PBT (moyeu amovible SER-SIT)</td><td>PBT</td></tr>
          <tr><td>Section / courroie</td><td>SPA-A (étroite SPA)</td><td>SPA-A</td></tr>
          <tr><td>Diamètre primitif</td><td>100 mm</td><td>560 mm</td></tr>
          <tr><td>Gorges</td><td>2G → 2</td><td>2G → 2</td></tr>
        </table>
        <p>Entraxe 12–15 : <strong>780 mm</strong> (DP3, pas le dessin 3D).</p>
        <div class="trap"><strong>Piège 2023.</strong> Prendre le diamètre extérieur « à l’œil » ou confondre avec la poulie 13 (D.118) ou la courroie 8 (SPA 2582). Ici c’est bien 12 et 15.</div>
      `,
    },
    {
      id: "courroie", title: "LAC puis longueur normalisée", skill: "courroie",
      html: `
        ${svgCourroie}
        <p><span class="formule">LAC = 2E + 1,57 (D + d) + (D − d)² / (4E)</span> (mm)</p>
        <p>D = 560, d = 100, E = 780 :</p>
        <table>
          <tr><th>Terme</th><th>Calcul</th></tr>
          <tr><td>2E</td><td>1560</td></tr>
          <tr><td>1,57 (D+d)</td><td>1,57 × 660 = 1036,2</td></tr>
          <tr><td>(D−d)² / (4E)</td><td>460² / 3120 ≈ 67,8</td></tr>
          <tr><td>LAC</td><td><strong>2664 mm</strong></td></tr>
        </table>
        <p>DT8, colonne SPA : plus proche = <strong>SPA 2650</strong>. 2 gorges → <strong>2 courroies</strong>.</p>
        <div class="trap"><strong>Piège 2023.</strong> Recopier SPA 2582 (repère 8, autre transmission). Oublier le terme (D−d)². Commander une seule courroie alors que 2G = 2 brins. Inverser D et d change peu LAC (le carré est le même) mais 1,57(D+d) reste correct si on additionne.</div>
        <div class="okbox">Rupture sans stock = ligne arrêtée. D’où le calcul d’urgence : on ne peut pas « estimer à la ficelle » une référence ISO.</div>
      `,
    },
    {
      id: "huile", title: "Décoder Rossi et corriger l’huile", skill: "huile",
      html: `
        <p>Référence : <span class="formule">MR 2I 5 - 90S 4 B5 / 274</span> (DT11).</p>
        <table>
          <tr><th>Champ</th><th>Sens</th></tr>
          <tr><td>MR</td><td>Motoréducteur</td></tr>
          <tr><td>2I</td><td>2 trains d’engrenages cylindriques</td></tr>
          <tr><td>5</td><td>Taille (grandeur) 5</td></tr>
          <tr><td>90S</td><td>Carcasse moteur 90S</td></tr>
          <tr><td>4</td><td>4 pôles</td></tr>
          <tr><td>B5</td><td>Forme constructive <em>du moteur</em> (bride)</td></tr>
          <tr><td>/ 274</td><td>Vitesse de sortie 274 min⁻¹</td></tr>
        </table>
        <p>Position du <strong>réducteur</strong> : sauf mention, Rossi livre en <strong>B3</strong> et ne l’écrit pas (DT10). Or DP3 / DT9 montrent le motoréducteur 10 <em>suspendu</em>, arbre de sortie vers le haut → montage <strong>vertical V6</strong>.</p>
        <p>DT11, taille 5 :</p>
        <table>
          <tr><th>Position</th><th>Volume</th></tr>
          <tr><td>B3</td><td>1,2 L ← valeur erronée de la gamme</td></tr>
          <tr><td>B6 / B7 / B8 / V6</td><td><strong>1,7 L</strong></td></tr>
          <tr><td>V5</td><td>2,0 L</td></tr>
        </table>
        <div class="trap"><strong>Piège 2023.</strong> Croire que B5 (bride moteur) est la position du réducteur. Recopier 1,2 L parce que « c’est dans la gamme ». 1,2 L est juste pour B3 taille 5 — ce n’est pas le montage réel. Un sous-niveau casse le réducteur ; un trop-plein chauffe et fuit.</div>
        <div class="okbox">Anomalie Q.3-1-2 : référence décodée = B3 par défaut ; réalité DT = V6. Volume à retenir : <strong>1,7 L</strong>.</div>
      `,
    },
    {
      id: "kp", title: "Kp AGMA et choix Compabloc", skill: "kp",
      html: `
        <p>Q.3-2-1 : remplir le tableau DR2 <em>avant</em> d’ouvrir DT15.</p>
        <table>
          <tr><th>Donnée</th><th>Valeur</th><th>Source</th></tr>
          <tr><td>Puissance moteur</td><td>4 kW</td><td>DP3 / DT1 (MA112 4 kW)</td></tr>
          <tr><td>Ns</td><td>274 min⁻¹</td><td>Référence Rossi / 274</td></tr>
          <tr><td>Heures / jour</td><td>10 h</td><td>DP3</td></tr>
          <tr><td>Application</td><td>Malaxeur / pétrin</td><td>DT14 AGMA</td></tr>
          <tr><td>Classe</td><td>II</td><td>10 h/j, densité variable</td></tr>
          <tr><td>Démarrages / h</td><td>négligeable si variateur</td><td>Énoncé</td></tr>
          <tr><td>Kp requis</td><td><strong>1,4</strong></td><td>DT13 : classe II → 1,4</td></tr>
        </table>
        <p>DT15 est un extrait <strong>Compabloc 3 kW / 4 pôles</strong> : on choisit <em>dans cette table</em>.</p>
        <p>Parmi les lignes à Kp ≥ 1,4, Ns la plus proche de 274 : <strong>261 min⁻¹</strong>, Kp = 1,40, réf. <strong>3331</strong>.</p>
        <div class="trap"><strong>Piège 2023.</strong> Prendre 254 min⁻¹ (Kp = 1,28 &lt; 1,4) ou 287 (Kp = 1,35 &lt; 1,4). Le « plus proche » sans le filtre Kp est hors contrat. Autre erreur : classe I parce que « agroalimentaire » — le tableau dit II.</div>
      `,
    },
    {
      id: "mesure", title: "4–20 mA, quantum, mot image, Ladder", skill: "mesure",
      html: `
        ${svgMesure}
        <p>Chaîne : PT100 → convertisseur 20–100 °C → <strong>4–20 mA</strong> → AEY800 (rack 1, pos. 5, voie 3) → mot image.</p>
        <p><span class="formule">I = 4 + 16 × (T − 20) / 80</span></p>
        <p>I(62 °C) = 12,4 mA · I(68 °C) = 13,6 mA.</p>
        <p>Quantum 12 bits, méthode DT20 : <span class="formule">q = 16 mA / (2¹² − 1) = 16 / 4095 ≈ 3,91 µA</span>.</p>
        <p>Limites utilisateur du module (DT22, 4–20 mA, Min = 20 °C, Max = 100 °C) :</p>
        <p><span class="formule">± 5 % × (Max − Min) / 2 = ± 2 °C</span> → <strong>18 °C et 102 °C</strong>.</p>
        <p>Mot image, modèle de l’exemple %IW102.5 : <span class="formule">%IW105.3</span>.</p>
        <p>Mots numériques (4 mA → 0, 20 mA → 4095) :</p>
        <p>N = (I − 4) / 16 × 4095 → N(12,4) ≈ <strong>2150</strong> · N(13,6) = <strong>2457</strong>.</p>
        <p>Ladder : comparer le mot image à %MW1150 (seuil haut) et %MW1151 (seuil bas) → %M16 = 1 hors plage.</p>
        <div class="trap"><strong>Piège 2023.</strong> Utiliser 0–20 mA (I = 20 × T/100). Oublier le −20 °C. Prendre 2¹² = 4096 au dénominateur sans lire DT20 (écart minime sur q, plus visible sur N). Écrire %QW… (c’est une entrée). Confondre 62/68 °C (consigne) et 18/102 °C (limites module).</div>
        <div class="okbox">Q.4-1-2 (économique) : on veut un transmetteur PT100 → 4–20 mA couvrant 20–100 °C. Parmi DT18–19, le n° 2 (~64 €) est le moins cher qui convertit déjà. Une sonde nue (n° 3 ou 6) ne fournit pas le 4–20 mA.</div>
      `,
    },
  ];

  const EXERCICES = [
    { id: "e1", skill: "cinematique", title: "Définition",
      prompt: "Une classe d’équivalence cinématique, c’est :",
      type: "mcq",
      choices: ["Les pièces de même couleur de peinture", "Les pièces sans mouvement relatif", "Les pièces de même prix", "Les poulies seules"],
      ok: 1, hint: "Un seul solide cinématique.",
      corr: "Pièces rigidement liées, sans mouvement relatif." },
    { id: "e2", skill: "cinematique", title: "Coloriage DR1",
      prompt: "Sur DR1, la classe du pivot fouet long (10) se colorie en :",
      type: "mcq",
      choices: ["Bleu", "Rouge", "Vert", "On ne colorie pas (10)"],
      ok: 1, hint: "Q.1-4 : bleu = (2), rouge = (10), vert = (30).",
      corr: "Rouge pour le fouet long (10)." },
    { id: "e3", skill: "roulement", title: "Cotes 3308B",
      prompt: "Pour 3308B.2RSR.TVH, le diamètre de bague intérieure d (mm) ?",
      type: "num", unit: "mm", value: 40, tol: 0,
      hint: "DT3, ligne 3308B-2RSR-TVH (pas 3308-B-2RS-TNH).",
      corr: "d = 40 mm (D = 90, B = 36,5, C = 67 kN)." },
    { id: "e4", skill: "roulement", title: "Charge C du NU2210",
      prompt: "Charge dynamique C du NU2210 ECP (kN).",
      type: "num", unit: "kN", value: 90, tol: 0,
      hint: "DT4, d = 50 mm.",
      corr: "C = 90 kN." },
    { id: "e5", skill: "clavette", title: "Rôle",
      prompt: "Les clavettes A et B servent surtout à :",
      type: "mcq",
      choices: ["Mesurer 65 °C", "Transmettre le couple arbre / poulie", "Limiter l’huile à 1,2 L", "Adresser %IW105.3"],
      ok: 1, hint: "Liaison d’entraînement en rotation.",
      corr: "Transmission de couple (+ calage angulaire)." },
    { id: "e6", skill: "poulie", title: "Diamètre poulie 15",
      prompt: "Diamètre primitif de la poulie 15 (mm).",
      type: "num", unit: "mm", value: 560, tol: 0,
      hint: "PBT SPA-A D560 2G.",
      corr: "560 mm." },
    { id: "e7", skill: "poulie", title: "Nombre de gorges",
      prompt: "Nombre de gorges (donc de courroies) des poulies 12 et 15.",
      type: "num", unit: "", value: 2, tol: 0,
      hint: "2G dans la référence.",
      corr: "2." },
    { id: "e8", skill: "courroie", title: "Terme 2E",
      prompt: "Avec E = 780 mm, calculer 2E (mm).",
      type: "num", unit: "mm", value: 1560, tol: 0,
      hint: "Premier terme de LAC.",
      corr: "1560 mm." },
    { id: "e9", skill: "courroie", title: "LAC",
      prompt: "LAC avec D = 560, d = 100, E = 780 (mm). On accepte 2660 à 2670.",
      type: "num", unit: "mm", value: 2664, tol: 6,
      hint: "2E + 1,57(D+d) + (D−d)²/(4E).",
      corr: "1560 + 1036,2 + 67,8 ≈ 2664 mm." },
    { id: "e10", skill: "courroie", title: "Référence ISO",
      prompt: "Longueur SPA normalisée à commander (mm).",
      type: "num", unit: "mm", value: 2650, tol: 0,
      hint: "DT8, plus proche de 2664. Pas 2582.",
      corr: "SPA 2650." },
    { id: "e11", skill: "huile", title: "Ns décodée",
      prompt: "Vitesse de sortie lue dans MR … / 274 (min⁻¹).",
      type: "num", unit: "min⁻¹", value: 274, tol: 0,
      hint: "Le nombre après la barre.",
      corr: "274 min⁻¹." },
    { id: "e12", skill: "huile", title: "Volume B3 taille 5",
      prompt: "Volume d’huile Rossi taille 5 en B3 (L). C’est la valeur erronée de la gamme.",
      type: "num", unit: "L", value: 1.2, tol: 0.05,
      hint: "DT11, première colonne, ligne 5.",
      corr: "1,2 L — juste en B3, faux sur le mélangeur." },
    { id: "e13", skill: "huile", title: "Bon volume",
      prompt: "Volume à retenir pour le montage réel V6, taille 5 (L).",
      type: "num", unit: "L", value: 1.7, tol: 0.05,
      hint: "Colonne B6/B7/B8/V6, ligne 5.",
      corr: "1,7 L." },
    { id: "e14", skill: "kp", title: "Kp requis",
      prompt: "Facteur de service Kp pour un malaxeur / pétrin 10 h/j (classe II).",
      type: "num", unit: "", value: 1.4, tol: 0.01,
      hint: "DT13 : I → 1 ; II → 1,4 ; III → 2.",
      corr: "1,4." },
    { id: "e15", skill: "kp", title: "Ns choisie",
      prompt: "Ns Compabloc retenue (min⁻¹), plus proche de 274 avec Kp ≥ 1,4.",
      type: "num", unit: "min⁻¹", value: 261, tol: 0,
      hint: "DT15, ligne 261 / Kp = 1,40 / 3331.",
      corr: "261 min⁻¹." },
    { id: "e16", skill: "mesure", title: "I à 62 °C",
      prompt: "I (mA) pour T = 62 °C, plage 20–100 °C → 4–20 mA.",
      type: "num", unit: "mA", value: 12.4, tol: 0.05,
      hint: "I = 4 + 16 × (T−20)/80.",
      corr: "12,4 mA." },
    { id: "e17", skill: "mesure", title: "I à 68 °C",
      prompt: "I (mA) pour T = 68 °C.",
      type: "num", unit: "mA", value: 13.6, tol: 0.05,
      hint: "Même droite : 4 + 16 × 48/80.",
      corr: "13,6 mA." },
    { id: "e18", skill: "mesure", title: "Quantum",
      prompt: "Quantum 12 bits sur 16 mA, en µA (ex. 3,91). Méthode DT20.",
      type: "num", unit: "µA", value: 3.91, tol: 0.03,
      hint: "16 / 4095 × 1000. 16/4096 est dans la tolérance.",
      corr: "≈ 3,91 µA." },
    { id: "e19", skill: "mesure", title: "Limite basse module",
      prompt: "Limite basse utilisateur (°C) pour Min = 20 °C et Max = 100 °C (DT22).",
      type: "num", unit: "°C", value: 18, tol: 0,
      hint: "Min − 5 % × (Max−Min)/2 = 20 − 2.",
      corr: "18 °C (haute = 102 °C)." },
    { id: "e20", skill: "mesure", title: "Mot image",
      prompt: "Mot image, rack 1, position 5, voie 3, sur le modèle %IW102.5 :",
      type: "mcq",
      choices: ["%QW204.3", "%IW153", "%IW105.3", "%M16"],
      ok: 2, hint: "Même gabarit que l’exemple DT17 : rack + position 2 chiffres + voie.",
      corr: "%IW105.3." },
    { id: "e21", skill: "mesure", title: "Mot à 13,6 mA",
      prompt: "Valeur entière N pour I = 13,6 mA sur 12 bits (0 → 4 mA, 4095 → 20 mA).",
      type: "num", unit: "", value: 2457, tol: 2,
      hint: "N = (I−4)/16 × 4095.",
      corr: "2457. Pour 12,4 mA : ≈ 2150." },
  ];

  const DQR = [
    {
      id: "p1", part: "1", title: "Analyse cinématique", duration: "40 min", skill: "cinematique",
      questions: [
        { id: "q11", code: "Q.1-1", dt: "DT5, DT6, DT7",
          prompt: "Donner les numéros des roulements qui créent les guidages en rotation : pivot fouet court (2) / ensemble fixe ; pivot fouet long (10) / ensemble fixe. Écrire par exemple 1 et 3 pour le premier.",
          type: "text", expect: ["1", "3"],
          hints: ["DT6 : (2) = pivot fouet court, encadré par (1) et (3).", "Fouet long (10) : (9) et (17)."],
          corr: "Fouet court (2) : roulements (1) et (3). Fouet long (10) : (9) et (17). Pivot (30) : lire sur DT5 les roulements qui le lient au bâti (ne pas inventer hors nomenclature)." },
        { id: "q12", code: "Q.1-2", dt: "DT3, DT4, DT6",
          prompt: "Pour le roulement (1) = 3308B.2RSR.TVH, donner d, D, largeur, C (ex. 40 90 36.5 67).",
          type: "text", expect: ["40", "90", "67"],
          hints: ["DT3, ligne 3308B-2RSR-TVH — pas la ligne TNH au-dessus.", "(3) et (9) = NU2210 ECP : 50 / 90 / 23 / 90."],
          corr: "(1) et (17) : 40 mm · 90 mm · 36,5 mm · C = 67 kN. (3) et (9) : 50 · 90 · 23 · C = 90 kN." },
        { id: "q13", code: "Q.1-3", dt: "DT7",
          prompt: "Rôle des clavettes A et B.",
          type: "text", expect: ["couple"],
          hints: ["Arbre ↔ moyeu de poulie.", "Deux fonctions possibles."],
          corr: "Transmettre le couple arbre / poulie et caler angulairement le moyeu." },
        { id: "q14", code: "Q.1-4", dt: "DT5, DT6 → DR1",
          prompt: "Quelle couleur pour quelle classe ? (2), (10), (30).",
          type: "text", expect: ["bleu", "rouge", "vert"],
          hints: ["Consigne officielle Q.1-4.", "Bleu = fouet court, rouge = fouet long, vert = pivot (30)."],
          corr: "Bleu = classe du pivot fouet court (2). Rouge = fouet long (10). Vert = pivot (30). On colorie toutes les pièces sans mouvement relatif avec le pivot." },
      ],
    },
    {
      id: "p2", part: "2", title: "Choix et remplacement d’une courroie", duration: "40 min", skill: "courroie",
      questions: [
        { id: "q21", code: "Q.2-1", dt: "DT1, DT2",
          prompt: "Les 4 paramètres des poulies 12 et 15 (type, section, diamètre, gorges).",
          type: "text", expect: ["pbt", "spa", "100", "560"],
          hints: ["PBT + SPA-A + D + 2G.", "12 = D.100 ; 15 = D560."],
          corr: "12 : PBT, SPA-A, 100 mm, 2 gorges. 15 : PBT, SPA-A, 560 mm, 2 gorges." },
        { id: "q22", code: "Q.2-2", dt: "DP3",
          prompt: "Entraxe entre les poulies 12 et 15 (mm).",
          type: "num", unit: "mm", value: 780, tol: 0,
          hints: ["DP3, valeurs « entraxe -12- -15- ».", "Pas l’entraxe 5–13."],
          corr: "780 mm." },
        { id: "q23", code: "Q.2-3", dt: "DT2",
          prompt: "Longueur approximative LAC (mm).",
          type: "num", unit: "mm", value: 2664, tol: 8,
          hints: ["LAC = 2E + 1,57(D+d) + (D−d)²/(4E).", "1560 + 1036 + 68."],
          corr: "≈ 2664 mm." },
        { id: "q24", code: "Q.2-4", dt: "DT8",
          prompt: "Référence ISO à commander et nombre de courroies (ex. SPA 2650 2).",
          type: "text", expect: ["2650", "2"],
          hints: ["Plus proche de 2664 dans la colonne SPA.", "2G → 2 courroies. Pas SPA 2582."],
          corr: "SPA 2650, 2 courroies (les plus proches ; 2 gorges sur chaque poulie)." },
      ],
    },
    {
      id: "p3", part: "3", title: "Huile Rossi et Compabloc", duration: "70 min", skill: "huile",
      questions: [
        { id: "q311", code: "Q.3-1-1", dt: "DT9–DT11",
          prompt: "Décoder MR 2I 5-90S 4 B5 / 274 (taille, pôles, Ns, forme moteur) et en déduire la position de montage *écrite* (ou le défaut).",
          type: "text", expect: ["5", "274", "b3"],
          hints: ["B5 = bride moteur, pas le réducteur.", "Position réducteur non écrite = B3 par défaut (DT10)."],
          corr: "MR, 2 trains, taille 5, moteur 90S 4 pôles bride B5, Ns = 274 min⁻¹. Position réducteur déduite : B3 (défaut, absente de la référence)." },
        { id: "q312", code: "Q.3-1-2", dt: "DT9, DP3",
          prompt: "Quelle est l’anomalie entre la position déduite et le montage réel ?",
          type: "text", expect: ["b3", "v6"],
          hints: ["Référence → B3 horizontal.", "DT9 / DP3 : motoréducteur 10 suspendu, arbre vers le haut → V6."],
          corr: "La référence implique B3 ; le dossier montre un montage vertical V6 (arbre de sortie vers le haut)." },
        { id: "q313", code: "Q.3-1-3", dt: "DT10, DT11",
          prompt: "Bon volume d’huile (L) et justification courte.",
          type: "text", expect: ["1,7", "1.7", "v6"],
          hints: ["Taille 5, colonne V6 (avec B6/B7/B8) = 1,7 L.", "1,2 L = B3, c’est l’erreur de la gamme."],
          corr: "1,7 L (taille 5, V6). 1,2 L n’est valable qu’en B3." },
        { id: "q321", code: "Q.3-2-1", dt: "DP1, DP3, DT12–DT14",
          prompt: "Compléter : Pu, Ns, h/j, classe AGMA, Kp (ex. 4 kW 274 10 II 1.4).",
          type: "text", expect: ["4 kw", "274", "1,4", "1.4"],
          hints: ["Malaxeur / pétrin, 10 h/j → classe II.", "DT13 : II → Kp = 1,4."],
          corr: "4 kW · 274 min⁻¹ · 10 h/j · classe II · démarrages négligeables si variateur · Kp = 1,4." },
        { id: "q322", code: "Q.3-2-2", dt: "DT15",
          prompt: "Référence Compabloc, Ns et Kp retenus (ex. 3331 261 1.40).",
          type: "text", expect: ["3331", "261"],
          hints: ["Filtrer Kp ≥ 1,4 puis Ns la plus proche de 274.", "Ligne 261 / 1,40 / 3331. 254 et 287 ont un Kp trop bas sur leur première ligne."],
          corr: "Réf. 3331 · Ns = 261 min⁻¹ · Kp = 1,40 (≥ 1,4, Ns la plus proche dans l’extrait 3 kW / 4 pôles)." },
      ],
    },
    {
      id: "p4", part: "4", title: "Nouvelle recette · température · API", duration: "90 min", skill: "mesure",
      questions: [
        { id: "q411", code: "Q.4-1-1", dt: "DT20",
          prompt: "Nature du signal qui arrive sur la carte AEY800.",
          type: "text", expect: ["4", "20", "analog"],
          hints: ["Après le convertisseur, plus la résistance PT100 brute.", "Courant normalisé."],
          corr: "Analogique de courant 4–20 mA." },
        { id: "q412", code: "Q.4-1-2", dt: "DT18, DT19",
          prompt: "Choix économique parmi les solutions proposées (justifier en une phrase).",
          type: "text", expect: ["4", "20"],
          hints: ["Il faut PT100 + sortie 4–20 mA + plage qui couvre 20–100 °C.", "Le n° 2 (~64 €) convertit déjà. Une sonde nue (3 ou 6) est moins chère mais incomplète."],
          corr: "Transmetteur n° 2 (≈ 64 €) : PT100 → 4–20 mA, plage jusqu’à 100 °C. Moins cher que n° 1 et 5 ; plus complet qu’une sonde seule." },
        { id: "q413", code: "Q.4-1-3", dt: "DT20",
          prompt: "Quantum 12 bits sur 16 mA, en µA (ex. 3,91).",
          type: "num", unit: "µA", value: 3.91, tol: 0.03,
          hints: ["q = 16 / (2¹² − 1).", "16/4095 ≈ 3,91 µA."],
          corr: "q ≈ 3,91 µA." },
        { id: "q414", code: "Q.4-1-4", dt: "DT21, DT22",
          prompt: "Limites utilisateur du module (°C) pour Min = 20 et Max = 100. Écrire les deux (ex. 18 102).",
          type: "text", expect: ["18", "102"],
          hints: ["DT22 : ± 5 % × (Max−Min)/2.", "2 °C de chaque côté de 20–100."],
          corr: "18 °C et 102 °C." },
        { id: "q415", code: "Q.4-1-5", dt: "DQ5",
          prompt: "Températures inférieure et supérieure à surveiller pour 65 ± 3 °C.",
          type: "text", expect: ["62", "68"],
          hints: ["Consigne ± tolérance, pas les 18/102 du module."],
          corr: "62 °C et 68 °C." },
        { id: "q416", code: "Q.4-1-6", dt: "DT20",
          prompt: "I (mA) à 62 °C puis à 68 °C (ex. 12.4 13.6).",
          type: "text", expect: ["12,4", "12.4", "13,6", "13.6"],
          hints: ["I = 4 + 16(T−20)/80.", "On peut aussi les lire sur la droite DR4."],
          corr: "12,4 mA et 13,6 mA." },
        { id: "q418", code: "Q.4-1-8", dt: "DT16, DT17",
          prompt: "Mot image de l’entrée analogique choisie (rack 1, pos. 5, voie 3).",
          type: "text", expect: ["iw105.3"],
          hints: ["Modèle : %IW102.5 = rack 1, pos. 2, voie 5.", "Même gabarit."],
          corr: "%IW105.3 (mot image 16 bits de l’entrée voie 3)." },
        { id: "q419", code: "Q.4-1-9", dt: "aucun",
          prompt: "Principe du Ladder : quand %M16 passe à 1 ?",
          type: "text", expect: ["mw1150", "mw1151"],
          hints: ["Comparer le mot image aux deux seuils stockés.", "Hors intervalle → alarme."],
          corr: "%M16 = 1 si le mot image > %MW1150 ou < %MW1151 (hors [62 °C ; 68 °C] convertis)." },
        { id: "q4111", code: "Q.4-1-11", dt: "DR5",
          prompt: "Valeurs entières à reporter pour 12,4 mA et 13,6 mA (12 bits, 0→4 mA, 4095→20 mA). Ex. 2150 2457.",
          type: "text", expect: ["2150", "2457"],
          hints: ["N = (I−4)/16 × 4095.", "13,6 mA tombe juste sur 2457."],
          corr: "≈ 2150 et 2457." },
      ],
    },
  ];

  const TRANSFERT = [
    {
      session: "2025-06 · Métropole",
      support: "Transbordeur Stellantis (déjà sur ce site)",
      keep: "4–20 mA, mot image, conclure par une phrase.",
      new: "Statique, plan 12°, chaîne de couples, variateur.",
    },
    {
      session: "2024-06 · Métropole",
      support: "Presse à compacter ALLTUB (déjà sur ce site)",
      keep: "Lire le DT, convertir, valider un composant.",
      new: "Hydraulique deux pompes, section annulaire, câble, barrière ISO 13855.",
    },
    {
      session: "2025-11 · NC",
      support: "Transstockeurs Kloosterboer",
      keep: "Catalogue, conclusion chiffrée.",
      new: "Schéma TN, disjoncteur, durée de vie L10, −20 °C.",
    },
  ];

  const CONTRAT = [
    "On n’ouvre pas le corrigé avant d’avoir écrit une réponse.",
    "Un indice utilisé = la question n’est pas « acquise ».",
    "On ne lance pas le blanc 4 h tant que le diagnostic n’est pas à 14/20 (ou le cœur courroie / huile / mesure au vert).",
    "Après le blanc, on change d’annale : retenir SPA 2650 par cœur ne rapporte rien le jour J suivant.",
  ];

  return { SKILLS, DATA_SUJET, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT };
})();
