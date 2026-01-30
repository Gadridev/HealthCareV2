const btn = document.getElementById("btn");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const motif = document.getElementById("motif");
const date = document.getElementById("date");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const form = document.getElementById("form");

function init() {
  showAllvalues();
}
function showAllvalues() {
  if (
    !nom.value ||
    !prenom.value ||
    !telephone.value ||
    !email.value ||
    !motif.value ||
    !date.value
  ) {
    alert("les champs obligatoire");
    return;
  }
  const formData = {
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    telephone: telephone.value.trim(),
    email: email.value.trim(),
    motif: motif.value.trim(),
    date: date.value.trim(),
  };
  let healthData = JSON.parse(localStorage.getItem("healthData")) || [];
  let exist;
  exist = healthData.some(
    (item) =>
      item.nom === nom.value ||
      item.prenom === prenom.value ||
      item.email === email.value,
  );
  if (exist) {
    alert("email or nom or prenom is exist");
    return;
  }
  healthData.push(formData);
  localStorage.setItem("healthData", JSON.stringify(healthData));
  window.location.href = "./table.html";
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  init();
});

console.log("testing");
