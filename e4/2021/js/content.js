/* Contenu pédagogique — Prépa E4 2021 (suremballeuse PAKER, Lactalis Andrézieux) */
window.PREPA = (() => {
  const SKILLS = [
    { id: "puis", part: 1, name: "Circuit de puissance", short: "DM, KM, GV2, LC1" },
    { id: "variat", part: 1, name: "Variateur VAR0502", short: "AI1, LI1, OLF, ItH" },
    { id: "reseau", part: 1, name: "API et Ethernet", short: "masque, 192.168.55.0" },
    { id: "secu", part: 1, name: "Sécurité PNOZ", short: "BT4101, redondance" },
    { id: "courroie", part: 2, name: "Courroie HTD", short: "C, Ft, Fpt, 35 Hz" },
    { id: "pneu", part: 3, name: "Schéma pneumatique", short: "5/2, RDU, vérin Ø32" },
    { id: "effort", part: 3, name: "Effort et pression", short: "FPE, 3,7 bar, 6 bar" },
    { id: "colle", part: 3, name: "Colle et sonde", short: "0,16 s, 6,3 V, Ni120" },
  ];

  const DATA_SUJET = [
    ["Machine", "Suremballeuse PAKER — packs de 2 ou 4 yaourts"],
    ["Lieu", "Lactalis Nestlé Ultra Frais, Andrézieux-Bouthéon"],
    ["Moteur M0501", "P = 0,55 kW"],
    ["Contacteur en stock", "LC1D09 — 4 kW sous 400 V"],
    ["Disjoncteur en stock", "GV2 ME08 — thermique 2,5 à 4 A"],
    ["Courant moteur (Q.1-1-2)", "In = 2,1 A"],
    ["Réglage ItH (corrigé)", "ItH = 0,55 A"],
    ["API", "192.168.55.41 · masque 255.255.255.0"],
    ["Écran", "192.168.55.45 · même masque"],
    ["Courroie", "HDT 1040-8M-20 · b = 20 mm · Zb = 130 · Lp = 1,040 m"],
    ["Effort carton / rayon", "F = 50 N · R = 115 mm"],
    ["dK1 poulie motrice", "66,21 mm"],
    ["Fréquence mesurée", "25 Hz"],
    ["Longueur du brin", "L = 385 mm"],
    ["Vérin collage", "Ø32 / tige 12 × course 40"],
    ["Écrasement maxi d’un pot", "200 N · s = 1,33"],
    ["Pression d’alimentation actuelle", "6 bar"],
    ["Cordon de colle", "Lcc = 100 mm · Ø buse = 1,02 mm"],
    ["Vitesse des packs", "625 mm/s"],
    ["Temps pistolet relevé", "0,25 s"],
    ["Consigne EVPROP1 relevée", "6,3 V"],
    ["Températures mesurées", "Réservoir 150 · pompe 150 · tuyau 155 · pistolet 95 °C"],
    ["Consigne pistolet (ibd)", "Tb = 160 °C"],
    ["Sonde", "Ni120 · R mesurée à 20 °C = 172 Ω"],
  ];

  const DIAGNOSTIC = [
    { id: "d1", skill: "puis",
      q: "Le repère DM0501, sur le circuit de puissance, désigne un :",
      choices: ["Moteur asynchrone", "Disjoncteur sectionneur", "Variateur de vitesse", "Contacteur"], ok: 1,
      why: "Il protège contre les courts-circuits et les surcharges, et il isole du réseau." },
    { id: "d2", skill: "puis",
      q: "La fonction principale de KM8501 est de :",
      choices: ["Convertir l’énergie électrique en énergie mécanique", "Commander le moteur", "Piloter une vitesse variable", "Mesurer un courant 4–20 mA"], ok: 1,
      why: "Contacteur : ordre marche / arrêt. La conversion, c’est M0501." },
    { id: "d3", skill: "puis",
      q: "Un LC1D09 (4 kW sous 400 V) face au moteur M0501 de 0,55 kW est :",
      choices: ["Incompatible, 4 kW est trop juste", "Compatible : le contacteur est dimensionné au-dessus de la puissance moteur", "Un disjoncteur, donc hors sujet", "Incompatible parce que In = 2,1 A"], ok: 1,
      why: "On compare des puissances : 4 kW > 0,55 kW." },
    { id: "d4", skill: "puis",
      q: "Le GV2 ME08 (thermique réglable de 2,5 à 4 A) et un moteur d’In = 2,1 A :",
      choices: ["Sont compatibles, 2,1 A est dans la plage", "Ne sont pas compatibles : 2,1 A est sous le minimum 2,5 A", "Sont compatibles car P = 4 kW", "Se règlent à 0,55 A"], ok: 1,
      why: "On ne peut pas caler le thermique sur 2,1 A. Le contacteur, lui, convient." },
    { id: "d5", skill: "variat",
      q: "Les bornes COM et AI1 de VAR0502 portent :",
      choices: ["Un ordre Stop/Run tout ou rien", "La consigne de vitesse, en signal analogique", "Le bus Profibus", "Le masque 255.255.255.0"], ok: 1,
      why: "AI1 est l’entrée analogique 0–10 V (Altivar 312). COM est le commun." },
    { id: "d6", skill: "variat",
      q: "La borne LI1 du variateur est :",
      choices: ["Une consigne 0–10 V", "L’ordre Stop/Run, en tout ou rien, à raccorder à la borne 11 du module X20DO6322", "Une entrée 4–20 mA", "La sonde Ni120"], ok: 1,
      why: "LI = entrée logique. Le corrigé indique la borne 11 de la carte de sorties API." },
    { id: "d7", skill: "variat",
      q: "Le défaut OLF sur VAR0502 a pour causes probables :",
      choices: ["Un masque Ethernet faux", "Un courant moteur trop élevé, ou un paramètre rSC erroné", "Une courroie à 25 Hz", "Une pression de 6 bar"], ok: 1,
      why: "OLF = surcharge moteur. ItH se règle ensuite sur le courant nominal." },
    { id: "d8", skill: "reseau",
      q: "L’information 255.255.255.0 est :",
      choices: ["L’adresse de l’API", "Le masque de sous-réseau", "L’adresse de broadcast", "Le nom du logiciel"], ok: 1,
      why: "API .41 et écran .45 partagent ce masque." },
    { id: "d9", skill: "reseau",
      q: "L’adresse réseau de l’ensemble API + écran est :",
      choices: ["192.168.55.41", "192.168.55.255", "192.168.55.45", "192.168.55.0"], ok: 3,
      why: "Avec /24, l’adresse réseau se termine par .0. .41 et .45 sont des hôtes." },
    { id: "d10", skill: "reseau",
      q: "L’API et l’écran peuvent communiquer parce que :",
      choices: ["Ils ont la même adresse IP", "Ils ont la même adresse réseau", "L’un est en .0 et l’autre en .255", "Ils sont tous les deux sur la borne LI1"], ok: 1,
      why: "Même réseau 192.168.55.0, adresses d’hôtes différentes." },
    { id: "d11", skill: "reseau",
      q: "Pour le PC de programmation, quelle adresse est interdite ?",
      choices: ["192.168.55.100", "192.168.55.10", "192.168.55.41", "192.168.55.50"], ok: 2,
      why: ".41 est déjà l’API. Sont aussi interdites .0, .45 (écran) et .255 (broadcast)." },
    { id: "d12", skill: "secu",
      q: "L’élément qui supprime les sécurités portes zone 1 ou zone 2 est :",
      choices: ["Le variateur VAR0502", "Le commutateur BT4101", "Le silencieux 1.1", "La sonde du pistolet"], ok: 1,
      why: "BT4101 shunte les carters pour la maintenance. Ce n’est pas un organe de production." },
    { id: "d13", skill: "secu",
      q: "La critique de redondance du module PNOZ XV3P, sur cette machine, est :",
      choices: ["Deux contacteurs de puissance en série, schéma conforme", "Pas de redondance sur les entrées (S21 et S22) ni sur les sorties (un seul contacteur K4102)", "Le masque Ethernet est trop court", "Il manque le vérin Ø32"], ok: 1,
      why: "Un seul canal capteur et un seul contacteur : la catégorie annoncée par le module n’est pas tenue par le câblage." },
    { id: "d14", skill: "courroie",
      q: "Le couple résistant sur la poulie réceptrice (F = 50 N, R = 115 mm, η = 1) vaut :",
      choices: ["5,75 N·m", "174 N", "87 N", "35 Hz"], ok: 0,
      why: "C = F × R = 50 × 0,115 = 5,75 N·m. Le rayon est en mètres." },
    { id: "d15", skill: "courroie",
      q: "Avec FT = 174 N et la règle du DT11 §4, la prétension Fpt vaut :",
      choices: ["348 N", "174 N", "87 N", "25 Hz"], ok: 2,
      why: "Fpt = FT / 2 = 87 N." },
    { id: "d16", skill: "courroie",
      q: "Le technicien mesure 25 Hz. La fréquence à obtenir est 35 Hz. Il doit :",
      choices: ["Laisser la courroie : 25 Hz est au-dessus", "Détendre la courroie", "Retendre la courroie : 25 Hz est très en dessous de 35 Hz", "Changer le variateur"], ok: 2,
      why: "Prétension insuffisante : risque de saut de dents. On retend." },
    { id: "d17", skill: "pneu",
      q: "Le composant 1.3 du circuit de collage à l’arrêt est un :",
      choices: ["Silencieux", "Réducteur de débit unidirectionnel", "Distributeur 5/2 monostable, commande électropneumatique et manuelle", "Vérin Ø32"], ok: 2,
      why: "1.4 et 1.5 sont les réducteurs. 1.6 est le vérin. 1.1 est le silencieux." },
    { id: "d18", skill: "effort",
      q: "Fécrasement maxi = 200 N et s = 1,33. La force pratique FPE vaut environ :",
      choices: ["266 N", "200 N", "150 N", "32 N"], ok: 2,
      why: "FPE = 200 / 1,33 ≈ 150 N. Le coefficient divise, il ne multiplie pas." },
    { id: "d19", skill: "effort",
      q: "Le cas le plus défavorable pour l’écrasement des pots est :",
      choices: ["Le lot de 4, parce que FMV = 600 N", "Le lot de 2 : pmaxi = 3,7 bar, alors que la machine est à 6 bar", "Les deux lots, dès que la pression dépasse 7,4 bar", "Aucun, le régulateur est déjà en place"], ok: 1,
      why: "À 6 bar le lot de 2 est écrasé (3,7 bar maxi). Le lot de 4 tient jusqu’à 7,4 bar. Aucun limiteur n’existe encore." },
    { id: "d20", skill: "colle",
      q: "Les bavures de colle (excès) viennent surtout :",
      choices: ["D’une consigne EVPROP1 fausse (elle n’est pas à 6,3 V)", "D’un temps de commande de 0,25 s au lieu de 0,16 s", "De la sonde Ni120 à 172 Ω", "D’une courroie à 25 Hz"], ok: 1,
      why: "U = 6,3 V est déjà la bonne consigne. Le pistolet reste ouvert trop longtemps. La sonde explique l’autre panne (colle qui durcit)." },
  ];

  const FICHES = [
    {
      id: "puis", title: "Nommer le circuit de puissance", skill: "puis",
      html: `
        <p>Partie 1, on <strong>nomme</strong> avant de comparer. DT1.</p>
        <table>
          <tr><th>Repère</th><th>Nom</th><th>Fonction</th></tr>
          <tr><td>DM0501</td><td>Disjoncteur sectionneur</td><td>Protéger (CC et surcharge) et isoler</td></tr>
          <tr><td>KM8501</td><td>Contacteur</td><td>Commander le moteur</td></tr>
          <tr><td>M0501</td><td>Moteur</td><td>Convertir We en Wm</td></tr>
          <tr><td>DJ0502</td><td>Disjoncteur</td><td>Protéger contre les courts-circuits (la surcharge ItH est dans le variateur)</td></tr>
          <tr><td>VAR0502</td><td>Variateur</td><td>Piloter le moteur à vitesse variable</td></tr>
        </table>
        <p>Stock atelier, moteur 0,55 kW, In = 2,1 A :</p>
        <table>
          <tr><th>Composant</th><th>Donnée utile</th><th>Verdict</th></tr>
          <tr><td>LC1D09</td><td>4 kW sous 400 V</td><td><strong>Compatible</strong> (4 &gt; 0,55)</td></tr>
          <tr><td>GV2 ME08</td><td>Thermique 2,5 à 4 A</td><td><strong>Incompatible</strong> (2,1 A &lt; 2,5 A)</td></tr>
        </table>
        <div class="trap"><strong>Piège 2021.</strong> Comparer le contacteur à un courant, ou le disjoncteur à une puissance. Chaque appareil a sa grandeur : kW pour le LC1, ampères pour le GV2.</div>
      `,
    },
    {
      id: "variat", title: "Lire le bornier Altivar", skill: "variat",
      html: `
        <p>VAR0502 est un Altivar 312. DT3 et DT5.</p>
        <table>
          <tr><th>Borne</th><th>Rôle</th><th>Nature</th></tr>
          <tr><td>COM / AI1</td><td>Consigne de vitesse</td><td>Analogique 0–10 V</td></tr>
          <tr><td>LI1</td><td>Stop / Run</td><td>Tout ou rien, borne 11 du X20DO6322</td></tr>
        </table>
        <p>Défaut <strong>OLF</strong> : courant moteur trop élevé, ou paramètre <strong>rSC</strong> erroné. Le thermique moteur du variateur se règle à <span class="formule">ItH = In</span>.</p>
        <div class="trap"><strong>Piège 2021.</strong> Le corrigé écrit deux courants. Pour le GV2, In = <strong>2,1 A</strong>. Pour ItH, il écrit <strong>0,55 A</strong>. Le jour J on recopie la plaque du DT1, puis on écrit ItH = ce courant-là. Ici, retenir les deux phrases du corrigé, pas les mélanger.</div>
      `,
    },
    {
      id: "reseau", title: "Même réseau, adresses différentes", skill: "reseau",
      html: `
        <p>Relevé du sujet :</p>
        <table>
          <tr><th></th><th>Adresse</th><th>Masque</th></tr>
          <tr><td>API</td><td>192.168.55.41</td><td>255.255.255.0</td></tr>
          <tr><td>Écran</td><td>192.168.55.45</td><td>255.255.255.0</td></tr>
        </table>
        <p>255.255.255.0 est le <strong>masque</strong>. L’adresse <strong>réseau</strong> est 192.168.55.0. Ils communiquent parce qu’ils sont sur ce même réseau.</p>
        <p>PC de programmation : 192.168.55.x sauf <strong>.0</strong> (réseau), <strong>.41</strong> (API), <strong>.45</strong> (écran) et <strong>.255</strong> (broadcast). Exemple : 192.168.55.50.</p>
        <p>Sur le schéma DT6, à nommer : alimentation TSXPSY1610M (alimenter en 24 V), processeur TSXP572623M (traiter), carte Profibus TSXPBY100 (communiquer), écran XBTGT6330 (dialoguer).</p>
        <div class="trap"><strong>Piège 2021.</strong> Répondre 192.168.55.41 comme « adresse réseau ». C’est une adresse d’hôte.</div>
      `,
    },
    {
      id: "secu", title: "PNOZ : trois couleurs, une critique", skill: "secu",
      html: `
        <p>Module Pilz PNOZ XV3P. Sur DR2 :</p>
        <ul>
          <li>vert : boucle d’autocontrôle (Reset / Start) ;</li>
          <li>bleu : circuit des entrées (capteurs de portes) ;</li>
          <li>rouge : circuit des sorties.</li>
        </ul>
        <p>Le shunt maintenance des carters zone 1 ou 2 est le commutateur <strong>BT4101</strong>.</p>
        <div class="okbox">Critique : les contacts capteurs n’utilisent pas les deux entrées S21 et S22, et la sortie ne commande qu’un contacteur (K4102). Pas de redondance ni en entrée ni en sortie.</div>
      `,
    },
    {
      id: "courroie", title: "De 50 N à 35 Hz", skill: "courroie",
      html: `
        <p>Courroie HDT1040-8M-20. Le pas 8 mm donne le nombre de dents : 1040 / 8 = <strong>130</strong>. Largeur b = 20 mm. Lp = 1,040 m.</p>
        <table>
          <tr><th>Grandeur</th><th>Application</th><th>Résultat</th></tr>
          <tr><td>Masse linéique</td><td>m = 6,2 × 20 / 1000</td><td><strong>0,124 kg/m</strong></td></tr>
          <tr><td>Constante</td><td>K = 400 × 0,124 / 20</td><td><strong>2,48</strong></td></tr>
          <tr><td>Couple</td><td>C = 50 × 0,115</td><td><strong>5,75 N·m</strong></td></tr>
          <tr><td>Force tangentielle</td><td>Ft = 2000 × 5,75 / 66,21</td><td><strong>174 N</strong></td></tr>
          <tr><td>Prétension</td><td>Fpt = Ft / 2</td><td><strong>87 N</strong></td></tr>
          <tr><td>Fréquence</td><td>√(100 × 87 / (2,48 × 20 × 0,385²))</td><td><strong>35 Hz</strong></td></tr>
        </table>
        <p>Le 2000 vient de Ft = 2C / d avec d en <em>mètres</em>, soit 2000 C / d<sub>mm</sub>. L = 385 mm = 0,385 m.</p>
        <div class="trap"><strong>Piège 2021.</strong> Laisser R = 115 (sans passer en mètres) donne un couple cent fois trop grand. Et 25 Hz n’est pas « à peu près 35 » : on retend.</div>
        <div class="okbox">Prétension trop faible : saut de dents, usure des bords, rupture. Trop forte : paliers surchargés, bruit, usure des dentures, axes qui peuvent se désaligner.</div>
      `,
    },
    {
      id: "pneu", title: "Lire le collage à l’arrêt", skill: "pneu",
      html: `
        <p>DT12. Le vérin est repéré <strong>Ø32 / 12 × 40</strong> : piston 32 mm, tige 12 mm, course 40 mm.</p>
        <table>
          <tr><th>Repère</th><th>Désignation</th><th>Fonction</th></tr>
          <tr><td>1.1</td><td>Silencieux</td><td>Atténuer l’échappement (donné)</td></tr>
          <tr><td>1.3</td><td>Distributeur 5/2 monostable</td><td>Orienter l’air vers le vérin (électro + manuel)</td></tr>
          <tr><td>1.4</td><td>Réducteur de débit unidirectionnel</td><td>Vitesse de <strong>rentrée</strong></td></tr>
          <tr><td>1.5</td><td>Réducteur de débit unidirectionnel</td><td>Vitesse de <strong>sortie</strong></td></tr>
          <tr><td>1.6</td><td>Vérin double effet</td><td>Amortisseurs de fin de course réglables</td></tr>
        </table>
        <div class="trap"><strong>Piège 2021.</strong> Inverser 1.4 et 1.5. Le corrigé affecte 1.4 à la rentrée et 1.5 à la sortie.</div>
      `,
    },
    {
      id: "effort", title: "3,7 bar, pas 6 bar", skill: "effort",
      html: `
        <p><span class="formule">FPE = F<sub>écrasement</sub> / s = 200 / 1,33 ≈ 150 N</span></p>
        <p>La force est répartie sur les pots : FMV = n × FPE.</p>
        <table>
          <tr><th>Lot</th><th>FMV</th><th>pmaxi = FMV / S</th><th>Face à 6 bar</th></tr>
          <tr><td>2 pots</td><td>300 N</td><td>300 × 4 / (π × 32²) = <strong>3,7 bar</strong></td><td>6 &gt; 3,7 : écrasement</td></tr>
          <tr><td>4 pots</td><td>600 N</td><td><strong>7,4 bar</strong></td><td>7,4 &gt; 6 : pas d’écrasement</td></tr>
        </table>
        <p>S = π d² / 4 avec d = 32 mm. Le cas défavorable est le <strong>lot de 2</strong> (la force totale autorisée est la plus faible). Rien ne limite aujourd’hui : on ajoute un <strong>régulateur de pression</strong> et un <strong>manomètre</strong>.</p>
        <div class="okbox">Réglage : sortir le vérin, attendre la montée en pression, amener le manomètre à 3,7 bar, faire rentrer le vérin.</div>
        <div class="trap"><strong>Piège 2021.</strong> Choisir un réducteur de débit pour « limiter la force ». Le débit règle une vitesse. La force, ici, se limite par la pression.</div>
      `,
    },
    {
      id: "colle", title: "Deux pannes de colle, deux causes", skill: "colle",
      html: `
        <p>Paramètres relevés sur DP3 : V = 625 mm/s, Lcc = 100 mm, t = 0,25 s, U = 6,3 V.</p>
        <table>
          <tr><th>Grandeur</th><th>Calcul</th><th>Résultat</th></tr>
          <tr><td>Volume du cordon</td><td>π × 1,02² × 100 / 4</td><td><strong>82 mm³</strong></td></tr>
          <tr><td>Temps utile</td><td>100 / 625</td><td><strong>0,16 s</strong></td></tr>
          <tr><td>Débit</td><td>82 / 0,16</td><td><strong>512,5 mm³/s</strong></td></tr>
        </table>
        <p>La suite du sujet impose Q = 510 mm³/s. Les courbes donnent alors P ≈ <strong>3,8 bar</strong> et U = <strong>6,3 V</strong>. La consigne relevée est déjà 6,3 V : elle est bonne. L’excès de colle vient du temps <strong>0,25 s au lieu de 0,16 s</strong>. On corrige le programmateur à cames du pistolet 1.</p>
        <p>Deuxième panne, plus tard : le pistolet est à 95 °C au lieu de <strong>160 °C</strong> (réservoir, pompe et tuyau sont dans la zone 150–155 °C). Sonde <strong>Ni120</strong> (120 Ω à 0 °C), bornes P1:5/:9 et P1:3/:12. À 20 °C la courbe donne <strong>142 Ω</strong>. On mesure 172 Ω, ce qui correspond à environ 60 °C. La sonde est défaillante : on la remplace.</p>
        <div class="trap"><strong>Piège 2021.</strong> Attribuer les bavures à la sonde, ou la colle qui fige à un temps de pistolet trop long. Ce sont deux défauts successifs, deux causes.</div>
      `,
    },
  ];

  const EXERCICES = [
    { id: "e1", skill: "puis", title: "LC1D09",
      prompt: "Moteur 0,55 kW, contacteur LC1D09 donné pour 4 kW en 400 V. Verdict ?",
      type: "mcq",
      choices: ["Incompatible", "Compatible", "Il manque le masque", "Seulement si In = 4 A"],
      ok: 1, hint: "Comparer des kW, pas des ampères.",
      corr: "4 kW > 0,55 kW : compatible." },
    { id: "e2", skill: "puis", title: "GV2 ME08",
      prompt: "Thermique 2,5–4 A, In moteur = 2,1 A. Le GV2 convient-il ?",
      type: "mcq",
      choices: ["Oui, 2,1 est proche de 2,5", "Non, 2,1 A est sous la plage", "Oui, car 4 kW", "Oui, ItH = 0,55 A est dans la plage"],
      ok: 1, hint: "Le mini de la plage doit pouvoir descendre jusqu’à In.",
      corr: "Incompatible." },
    { id: "e3", skill: "variat", title: "Nature de AI1",
      prompt: "COM et AI1, c’est quel type de signal ?",
      type: "mcq",
      choices: ["Tout ou rien", "Analogique", "Profibus", "Numérique mot de 16 bits"],
      ok: 1, hint: "Entrée 0–10 V de l’Altivar.",
      corr: "Consigne de vitesse analogique." },
    { id: "e4", skill: "variat", title: "Borne LI1",
      prompt: "Numéro de borne du module X20DO6322 pour LI1.",
      type: "num", unit: "", value: 11, tol: 0,
      hint: "Sortie API indiquée dans le corrigé.",
      corr: "Borne 11." },
    { id: "e5", skill: "variat", title: "ItH du corrigé",
      prompt: "Valeur de ItH écrite dans le corrigé officiel (A).",
      type: "num", unit: "A", value: 0.55, tol: 0,
      hint: "Le corrigé écrit ItH = In = … A. Ne pas prendre les 2,1 A du GV2.",
      corr: "0,55 A. Le 2,1 A sert uniquement à la comparaison GV2." },
    { id: "e6", skill: "reseau", title: "Adresse réseau",
      prompt: "Adresse réseau de l’ensemble (écrire 192.168.55.0).",
      type: "mcq",
      choices: ["192.168.55.41", "192.168.55.45", "192.168.55.0", "192.168.55.255"],
      ok: 2, hint: "Masque /24 : le dernier octet de l’adresse réseau est 0.",
      corr: "192.168.55.0." },
    { id: "e7", skill: "reseau", title: "PC interdit",
      prompt: "Laquelle de ces adresses ne peut pas être donnée au PC ?",
      type: "mcq",
      choices: ["192.168.55.20", "192.168.55.45", "192.168.55.60", "192.168.55.100"],
      ok: 1, hint: ".45 est déjà l’écran.",
      corr: "192.168.55.45 est prise. .0, .41 et .255 aussi." },
    { id: "e8", skill: "secu", title: "Shunt des portes",
      prompt: "Repère de l’organe qui supprime les sécurités zone 1 ou 2.",
      type: "mcq",
      choices: ["VAR0502", "BT4101", "K4102 seulement, sans repère de shunt", "M0501"],
      ok: 1, hint: "Commutateur sur le schéma sécurité carters.",
      corr: "Commutateur BT4101." },
    { id: "e9", skill: "courroie", title: "Masse linéique",
      prompt: "m = 6,2 × b / 1000 avec b = 20 mm. Résultat en kg/m.",
      type: "num", unit: "kg/m", value: 0.124, tol: 0.002,
      hint: "6,2 × 20 = 124, puis / 1000.",
      corr: "0,124 kg/m." },
    { id: "e10", skill: "courroie", title: "Couple",
      prompt: "C = 50 N × 0,115 m. Résultat en N·m.",
      type: "num", unit: "N·m", value: 5.75, tol: 0.05,
      hint: "115 mm = 0,115 m.",
      corr: "5,75 N·m." },
    { id: "e11", skill: "courroie", title: "Force tangentielle",
      prompt: "Ft = 2000 × 5,75 / 66,21. Résultat en N (le sujet arrondit).",
      type: "num", unit: "N", value: 174, tol: 2,
      hint: "Environ 173,7, retenu 174.",
      corr: "174 N." },
    { id: "e12", skill: "courroie", title: "Fréquence cible",
      prompt: "Fréquence de vibration à obtenir (Hz).",
      type: "num", unit: "Hz", value: 35, tol: 1,
      hint: "√(100 × 87 / (2,48 × 20 × 0,385²)).",
      corr: "35 Hz. La mesure 25 Hz est trop basse : on retend." },
    { id: "e13", skill: "pneu", title: "1.5",
      prompt: "Le réducteur 1.5 règle la vitesse de :",
      type: "mcq",
      choices: ["Rentrée du vérin", "Sortie du vérin", "La pompe à colle", "L’échappement 1.1"],
      ok: 1, hint: "1.4 = rentrée, 1.5 = sortie.",
      corr: "Sortie du vérin." },
    { id: "e14", skill: "effort", title: "FPE",
      prompt: "200 / 1,33. Force pratique en N (valeur du corrigé).",
      type: "num", unit: "N", value: 150, tol: 2,
      hint: "On divise par le coefficient de sécurité.",
      corr: "150 N." },
    { id: "e15", skill: "effort", title: "Pression lot de 2",
      prompt: "pmaxi du lot de 2 pots, en bar.",
      type: "num", unit: "bar", value: 3.7, tol: 0.15,
      hint: "300 × 4 / (π × 32²), puis en bar.",
      corr: "3,7 bar. L’alimentation à 6 bar est trop haute." },
    { id: "e16", skill: "colle", title: "Volume du cordon",
      prompt: "Cylindre Ø 1,02 mm, longueur 100 mm. Volume en mm³.",
      type: "num", unit: "mm³", value: 82, tol: 1,
      hint: "π d² L / 4.",
      corr: "82 mm³." },
    { id: "e17", skill: "colle", title: "Temps utile",
      prompt: "t = Lcc / V = 100 / 625. Résultat en s.",
      type: "num", unit: "s", value: 0.16, tol: 0.005,
      hint: "Les deux grandeurs sont déjà en mm et mm/s.",
      corr: "0,16 s, à comparer aux 0,25 s relevés." },
    { id: "e18", skill: "colle", title: "Sonde à 20 °C",
      prompt: "Résistance attendue de la Ni120 à 20 °C (Ω).",
      type: "num", unit: "Ω", value: 142, tol: 2,
      hint: "Courbe du DR9, pas la mesure 172 Ω.",
      corr: "142 Ω. 172 Ω correspond à environ 60 °C : sonde à remplacer." },
  ];

  const DQR = [
    {
      id: "p1", part: "1", title: "Puissance et variateur", duration: "35 min", skill: "puis",
      questions: [
        { id: "q111", code: "Q.1-1-1", dt: "DT1",
          prompt: "Nom et fonction de DM0501, KM8501, M0501, DJ0502 et VAR0502.",
          type: "text", expect: ["disjonct", "contact", "moteur", "variat"],
          hints: ["DM isole et protège. KM commande. M convertit.", "DJ0502 = courts-circuits. VAR = vitesse variable."],
          corr: "DM0501 disjoncteur sectionneur (protéger et isoler). KM8501 contacteur (commander). M0501 moteur (We → Wm). DJ0502 disjoncteur (CC). VAR0502 variateur (vitesse variable)." },
        { id: "q112", code: "Q.1-1-2", dt: "DT1, DT2",
          prompt: "LC1D09 et GV2 ME08 sont-ils compatibles avec M0501 ? Justifier.",
          type: "text", expect: ["4", "0,55", "2,5", "2,1"],
          hints: ["Contacteur : comparer les kW sous 400 V.", "GV2 : la plage 2,5–4 A ne contient pas In = 2,1 A."],
          corr: "LC1D09 compatible (4 kW > 0,55 kW). GV2 ME08 incompatible (2,1 A < 2,5 A)." },
        { id: "q113", code: "Q.1-1-3", dt: "DT1, DT3, DT5",
          prompt: "COM/AI1 et LI1 : fonction, nature du signal, et borne API pour LI1.",
          type: "text", expect: ["analog", "tout ou rien", "11"],
          hints: ["AI1 = 0–10 V, consigne de vitesse.", "LI1 = Stop/Run, borne 11 du X20DO6322."],
          corr: "COM/AI1 : consigne de vitesse analogique. LI1 : Stop/Run tout ou rien, borne 11." },
        { id: "q114", code: "Q.1-1-4", dt: "DT1, DT4",
          prompt: "Causes probables du défaut OLF, et valeur ItH du corrigé (A).",
          type: "text", expect: ["courant", "rsc", "0,55"],
          hints: ["OLF = surcharge moteur, ou rSC faux.", "Le corrigé écrit ItH = 0,55 A, distinct des 2,1 A du GV2."],
          corr: "Courant moteur trop élevé ou rSC erroné. ItH = 0,55 A." },
      ],
    },
    {
      id: "p2", part: "1", title: "Commande, réseau, sécurité", duration: "25 min", skill: "reseau",
      questions: [
        { id: "q121", code: "Q.1-2-1", dt: "DT6 → DR1",
          prompt: "Sur le schéma automate : nommer l’alimentation, le processeur, la carte Profibus et l’écran, avec leur fonction.",
          type: "text", expect: ["tsxpsy", "572623", "pby", "xbt"],
          hints: ["Alimenter / traiter / communiquer / dialoguer.", "TSXPSY1610M, TSXP572623M, TSXPBY100, XBTGT6330."],
          corr: "Alim TSXPSY1610M (24 V). Processeur TSXP572623M (traiter). Profibus TSXPBY100 (communiquer). Écran XBTGT6330 (dialoguer). Le nombre d’E/S maxi et le nom du logiciel se relèvent sur le DT6." },
        { id: "q122", code: "Q.1-2-2", dt: "DT7",
          prompt: "Que vaut 255.255.255.0 ? Adresse réseau ? Pourquoi API et écran communiquent-ils ? Proposer une IP de PC.",
          type: "text", expect: ["masque", "192.168.55.0", "192.168.55."],
          hints: ["Même masque → même réseau .0.", "Exclure .0, .41, .45 et .255."],
          corr: "Masque. Réseau 192.168.55.0. Ils communiquent car même adresse réseau. PC par exemple 192.168.55.50." },
        { id: "q124", code: "Q.1-2-4", dt: "DR2",
          prompt: "Quel organe shunte les sécurités portes ? Critiquer la redondance.",
          type: "text", expect: ["bt4101", "redond", "k4102"],
          hints: ["Commutateur sur les zones 1 et 2.", "Entrées S21/S22 non doublées, une seule sortie K4102."],
          corr: "Commutateur BT4101. Pas de redondance d’entrée (S21 et S22) ni de sortie (seul K4102)." },
      ],
    },
    {
      id: "p3", part: "2", title: "Courroie HTD", duration: "60 min", skill: "courroie",
      questions: [
        { id: "q211", code: "Q.2-1-1", dt: "aucun",
          prompt: "Citer un problème si la prétension est trop faible, et un si elle est trop forte.",
          type: "text", expect: ["dent", "palier"],
          hints: ["Trop faible : la denture monte, saut de dents.", "Trop forte : paliers, bruit, usure."],
          corr: "Trop faible : saut de dents, usure des bords, rupture par allongement. Trop forte : surcharge des paliers, bruit, usure des dentures, désalignement possible." },
        { id: "q212", code: "Q.2-1-2", dt: "DT9 à DT11",
          prompt: "Caractéristiques : b (mm), Zb, m (kg/m), Lp (m), K. Écrire au moins m et K.",
          type: "text", expect: ["0,124", "2,48"],
          hints: ["b = 20, Zb = 130, Lp = 1,040 m.", "m = 6,2 × 20 / 1000. K = 400 × m / b."],
          corr: "b = 20 mm, Zb = 130, m = 0,124 kg/m, Lp = 1,040 m, K = 2,48." },
        { id: "q213", code: "Q.2-1-3", dt: "DT9, DT10",
          prompt: "Couple C (N·m) puis force tangentielle Ft (N). dK1 = 66,21 mm.",
          type: "text", expect: ["5,75", "174"],
          hints: ["C = 50 × 0,115.", "Ft = 2000 × C / 66,21."],
          corr: "C = 5,75 N·m. Ft = 174 N. La suite impose Ft = 174 N et K = 2,48 même si votre calcul diffère." },
        { id: "q214", code: "Q.2-1-4", dt: "DT11",
          prompt: "Fpt (N) puis fréquence f (Hz). L = 385 mm.",
          type: "text", expect: ["87", "35"],
          hints: ["Fpt = Ft / 2.", "f = √(100 × Fpt / (K × b × L²)) avec L = 0,385 m."],
          corr: "Fpt = 87 N. f = 35 Hz." },
        { id: "q215", code: "Q.2-1-5", dt: "aucun",
          prompt: "La mesure vaut 25 Hz. Que décide le technicien ?",
          type: "text", expect: ["retend", "25", "35"],
          hints: ["Comparer 25 et 35.", "Trop lâche : on retend, on ne change pas la courroie d’office."],
          corr: "25 Hz << 35 Hz : courroie insuffisamment tendue, il faut la retendre." },
      ],
    },
    {
      id: "p4", part: "3", title: "Pneumatique et écrasement", duration: "50 min", skill: "effort",
      questions: [
        { id: "q311", code: "Q.3-1-1", dt: "DT12 → DR4",
          prompt: "Identifier 1.3, 1.4, 1.5 et 1.6 (1.1 est le silencieux, déjà donné).",
          type: "text", expect: ["distribut", "reduct", "verin"],
          hints: ["1.3 est un 5/2 monostable.", "1.4 rentrée, 1.5 sortie, 1.6 vérin double effet."],
          corr: "1.3 distributeur 5/2. 1.4 RDU de rentrée. 1.5 RDU de sortie. 1.6 vérin double effet Ø32/12×40." },
        { id: "q321", code: "Q.3-2-1", dt: "DT12",
          prompt: "FPE (N), puis FMV pour 2 pots et pour 4 pots.",
          type: "text", expect: ["150", "300", "600"],
          hints: ["FPE = 200 / 1,33.", "FMV = nombre de pots × FPE."],
          corr: "FPE = 150 N. Lot de 2 : 300 N. Lot de 4 : 600 N." },
        { id: "q322", code: "Q.3-2-2", dt: "DT12",
          prompt: "pmaxi du cas le plus défavorable (bar), et peut-on éviter l’écrasement aujourd’hui ?",
          type: "text", expect: ["3,7", "6", "non"],
          hints: ["Le lot de 2 autorise la plus petite force.", "p = F / S avec d = 32 mm. Alimentation actuelle = 6 bar."],
          corr: "Cas défavorable : lot de 2, pmaxi = 3,7 bar. 6 bar est trop haut et aucun limiteur n’existe. Lot de 4 : 7,4 bar, pas d’écrasement." },
        { id: "q323", code: "Q.3-2-3", dt: "aucun → DR5",
          prompt: "Quels composants ajouter, et quelle procédure de réglage ?",
          type: "text", expect: ["regulat", "manomet", "3,7"],
          hints: ["Pas un réducteur de débit : on limite une pression.", "Sortir, monter en pression, régler, rentrer."],
          corr: "Régulateur de pression + manomètre. Sortir le vérin, attendre, régler 3,7 bar, rentrer." },
      ],
    },
    {
      id: "p5", part: "3", title: "Dépose de colle et sonde", duration: "70 min", skill: "colle",
      questions: [
        { id: "q331", code: "Q.3-3-1", dt: "aucun",
          prompt: "Pourquoi une commande proportionnelle plutôt qu’un régulateur manuel ?",
          type: "text", expect: ["reglage", "format"],
          hints: ["Plusieurs formats, 2 pots et 4 pots.", "Une infinité de consignes avec un seul composant."],
          corr: "Réglage continu, un seul composant, adapté quand la cadence et le format changent." },
        { id: "q333", code: "Q.3-3-3", dt: "DP3",
          prompt: "Relever V (mm/s), Lcc (mm), t (s) et U (V).",
          type: "text", expect: ["625", "100", "0,25", "6,3"],
          hints: ["Ce sont les réglages actuels, pas encore les valeurs recalculées.", "t relevé = 0,25 s, pas 0,16 s."],
          corr: "V = 625 mm/s, Lcc = 100 mm, t = 0,25 s, U = 6,3 V." },
        { id: "q334", code: "Q.3-3-4", dt: "aucun",
          prompt: "Volume vcc du cordon (mm³), Ø = 1,02 mm, L = 100 mm.",
          type: "num", unit: "mm³", value: 82, tol: 1,
          hints: ["π d² L / 4.", "Arrondir à 82."],
          corr: "82 mm³." },
        { id: "q335", code: "Q.3-3-5", dt: "aucun",
          prompt: "Temps de commande recalculé (s), puis débit (mm³/s).",
          type: "text", expect: ["0,16", "512"],
          hints: ["t = 100 / 625.", "Q = 82 / 0,16. La suite impose 510."],
          corr: "t = 0,16 s. Q = 512,5 mm³/s. On continue avec 510 mm³/s." },
        { id: "q336", code: "Q.3-3-6", dt: "DR8",
          prompt: "Tension de consigne U (V) lue sur les courbes pour ce débit.",
          type: "num", unit: "V", value: 6.3, tol: 0.2,
          hints: ["Q ≈ 510 → P ≈ 3,8 bar, puis la droite U(P).", "La valeur tombe sur la consigne déjà relevée."],
          corr: "U = 6,3 V (P ≈ 3,8 bar)." },
        { id: "q337", code: "Q.3-3-7", dt: "aucun",
          prompt: "Origine de l’excès de colle et action corrective.",
          type: "text", expect: ["0,25", "0,16", "came"],
          hints: ["La tension 6,3 V est bonne.", "Le temps relevé est plus long que le temps calculé."],
          corr: "Temps de commande trop long (0,25 s au lieu de 0,16 s) : cordon trop long. Corriger le programmateur à cames du pistolet 1." },
        { id: "q339", code: "Q.3-3-9", dt: "DR7",
          prompt: "Quelle zone est froide, et quelle température devrait-elle avoir ?",
          type: "text", expect: ["pistolet", "160", "95"],
          hints: ["Comparer les quatre mesures aux consignes de l’ibd.", "Réservoir et pompe à 150, tuyau à 155 : seuls le pistolet décroche."],
          corr: "Pistolet 1 : 95 °C au lieu de 160 °C." },
        { id: "q3310", code: "Q.3-3-10", dt: "DT13",
          prompt: "Type de sonde et signification. Bornes à débrancher.",
          type: "text", expect: ["ni120", "120", "p1"],
          hints: ["Ni = nickel, 120 Ω à 0 °C.", "Bornes P1:5/:9 et P1:3/:12."],
          corr: "Ni120 : nickel, 120 Ω à 0 °C. Bornes P1:5/:9 et P1:3/:12." },
        { id: "q3311", code: "Q.3-3-11", dt: "DR9",
          prompt: "R mesurée = 172 Ω à 20 °C. La sonde est-elle bonne ?",
          type: "text", expect: ["142", "172", "remplac"],
          hints: ["À 20 °C la courbe vaut 142 Ω.", "172 Ω se lit vers 60 °C."],
          corr: "À 20 °C on devrait lire 142 Ω. 172 Ω correspond à environ 60 °C : sonde défaillante, à remplacer." },
      ],
    },
  ];

  const TRANSFERT = [
    {
      session: "2023-06 · Métropole",
      support: "Centre de pétrissage Pasquier (déjà sur ce site)",
      keep: "Lire un catalogue, conclure par une comparaison chiffrée.",
      new: "Courroie SPA, classes d’équivalence, 4–20 mA.",
    },
    {
      session: "2024-06 · Métropole",
      support: "Presse à compacter ALLTUB (déjà sur ce site)",
      keep: "Nommer un schéma avant de calculer. Convertir les unités.",
      new: "Deux pompes, section annulaire, câble et barrière immatérielle.",
    },
    {
      session: "2025-06 · Métropole",
      support: "Transbordeur Stellantis (déjà sur ce site)",
      keep: "Chaîne d’énergie, consigne analogique, phrase de conclusion.",
      new: "Plan incliné, frein, couple, 4–20 mA.",
    },
  ];

  const CONTRAT = [
    "On n’ouvre pas le corrigé avant d’avoir écrit une réponse.",
    "Un indice utilisé = la question n’est pas « acquise ».",
    "On ne lance pas le blanc 4 h tant que le diagnostic n’est pas à 14/20.",
    "Après le blanc, on change d’annale. Retenir 35 Hz ou 3,7 bar par cœur ne sert pas le jour J suivant.",
  ];

  return { SKILLS, DATA_SUJET, DIAGNOSTIC, FICHES, EXERCICES, DQR, TRANSFERT, CONTRAT };
})();
