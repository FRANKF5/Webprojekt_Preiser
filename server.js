const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const db = new sqlite3.Database("./database.db"); // Datei wird automatisch erstellt, falls nicht vorhanden

// Tabelle erstellen
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

// Beispiel-Daten einfügen (nur einmal)
db.run("INSERT INTO users (name) VALUES (?)", ["Fabian"]);
db.run("INSERT INTO users (name) VALUES (?)", ["Anna"]);

// Statische Dateien aus /public bereitstellen
app.use(express.static(path.join(__dirname, "public")));

// API-Route
app.get("/api/users", (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

// Server starten
app.listen(3000, () => console.log("Server läuft: http://localhost:3000"));
