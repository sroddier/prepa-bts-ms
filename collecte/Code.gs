/**
 * Avancement des parcours Prépa BTS MS.
 * La feuille reste privée. Les élèves n’y vont pas : ils parlent à l’application web.
 *
 * Feuille : https://docs.google.com/spreadsheets/d/1z4hLt0lh4Xy0tJWNxcwG29dHM0IYHEnvxl0vutHIU-4/edit
 *
 * 1. Extensions → Apps Script (depuis cette feuille) → coller ce fichier → Enregistrer.
 * 2. Exécuter setup() une fois et autoriser le compte.
 * 3. Déployer → Nouveau déploiement → Application Web.
 *    Exécuter en tant que : Moi
 *    Qui a accès : Tout le monde
 * 4. Copier l’URL se terminant par /exec dans js/profil.js, constante SYNC_URL.
 */

var SHEET_ID = "1z4hLt0lh4Xy0tJWNxcwG29dHM0IYHEnvxl0vutHIU-4";
var ONGLET = "Avancement";
var SUJETS = {
  "prepa-e4-2021-v1": true,
  "prepa-e4-2023-v1": true,
  "prepa-e4-2024-v1": true,
  "prepa-e4-2025-v1": true,
  "prepa-e4-2025-nc-v1": true,
  "prepa-e4-sujet-0-v1": true,
};

function setup() {
  var sh = feuille_();
  if (sh.getLastRow() === 0) {
    sh.appendRow(["profil", "sujet", "updated", "json", "maj"]);
    sh.setFrozenRows(1);
  }
}

function doGet() {
  return json_({ ok: true, service: "prepa-bts-ms-avancement" });
}

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "");
    var profil = String(data.profil || "");
    var sujet = String(data.sujet || "");
    if (!/^[a-z0-9-]{3,40}$/.test(profil) || !SUJETS[sujet]) {
      return json_({ ok: false, erreur: "Profil ou parcours refusé" });
    }
    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      if (data.op === "get") return json_(lire_(profil, sujet));
      if (data.op === "put") return json_(ecrire_(profil, sujet, data));
      return json_({ ok: false, erreur: "Opération inconnue" });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json_({ ok: false, erreur: String(err) });
  }
}

function feuille_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(ONGLET);
  if (!sh) {
    sh = ss.insertSheet(ONGLET);
    sh.appendRow(["profil", "sujet", "updated", "json", "maj"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function trouver_(sh, profil, sujet) {
  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === profil && String(data[i][1]) === sujet) return i + 1;
  }
  return 0;
}

function lire_(profil, sujet) {
  var sh = feuille_();
  var row = trouver_(sh, profil, sujet);
  if (!row) return { ok: true, etat: null, updated: 0 };
  var updated = Number(sh.getRange(row, 3).getValue()) || 0;
  var etat = null;
  try { etat = JSON.parse(String(sh.getRange(row, 4).getValue() || "")); } catch (e) { etat = null; }
  return { ok: true, etat: etat, updated: updated };
}

function ecrire_(profil, sujet, data) {
  var etat = data.etat;
  if (!etat || typeof etat !== "object") return { ok: false, erreur: "Avancement vide" };
  var updated = Number(data.updated || etat.updated) || 0;
  var json = JSON.stringify(etat);
  if (json.length > 49000) return { ok: false, erreur: "Avancement trop volumineux" };
  var sh = feuille_();
  var row = trouver_(sh, profil, sujet);
  if (row) {
    var deja = Number(sh.getRange(row, 3).getValue()) || 0;
    if (deja > updated) return lire_(profil, sujet);
    sh.getRange(row, 3, 1, 3).setValues([[updated, json, new Date()]]);
  } else {
    sh.appendRow([profil, sujet, updated, json, new Date()]);
  }
  return { ok: true, updated: updated };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
