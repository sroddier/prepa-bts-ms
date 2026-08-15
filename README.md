# Prépa BTS MS

Parcours autonomes pour le **BTS Maintenance des Systèmes**, option Systèmes de production.

**Site public :** [https://sroddier.github.io/prepa-bts-ms/](https://sroddier.github.io/prepa-bts-ms/)  
**E4 2025 :** [https://sroddier.github.io/prepa-bts-ms/e4/2025/](https://sroddier.github.io/prepa-bts-ms/e4/2025/)

| Dossier | Contenu | Statut |
|---------|---------|--------|
| [e4/2025/](e4/2025/) | E4 juin 2025 — Transbordeur Stellantis | Ouvert |
| `e4/2024/` | E4 juin 2024 — Presse ALLTUB | À venir |
| `e4/2023/` | E4 juin 2023 — Pasquier | À venir |
| `e4/2025-nc/` | E4 nov. 2025 NC — Transstockeurs | À venir |

La liste affichée sur la page d’accueil est dans [`js/sujets.js`](js/sujets.js).

## Publier une modification

1. Modifier les fichiers (dans Cursor / VS Code / le Bloc-notes).
2. Double-cliquer **`publier.bat`**
3. Ou, dans un terminal :

```powershell
cd C:\Users\srodd\prepa-bts-ms
git add -A
git commit -m "Correction schema plan incline"
git push
```

Le site public se met à jour tout seul (GitHub Pages, environ 1 minute).

## Ajouter un nouveau sujet plus tard

1. Copier `e4/2025/` vers `e4/2024/` (ou `e5/2025/`, etc.).
2. Adapter le contenu (`js/content.js`, PDF, textes).
3. Changer la clé `localStorage` dans `js/app.js` (`prepa-e4-2024-v1` par exemple) pour ne pas mélanger les progressions.
4. Ajouter une carte dans `js/sujets.js` avec `statut: "ouvert"`.
5. Lancer `publier.bat`.

## Tester en local

```powershell
cd C:\Users\srodd\prepa-bts-ms
python -m http.server 5500
```

Ouvrir [http://127.0.0.1:5500](http://127.0.0.1:5500)

## Compte rendu pédagogique E4 2025

Voir [e4/2025/README.md](e4/2025/README.md).
