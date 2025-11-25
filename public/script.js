// Daten speichern
function speichern() {
    const name = document.getElementById("inputName").value;
    localStorage.setItem("username", name);
    alert("Gespeichert!");
}

// Daten laden
function laden() {
    const name = localStorage.getItem("username");
    document.getElementById("demo").innerText = name ? name : "Noch kein Name gespeichert.";
}
