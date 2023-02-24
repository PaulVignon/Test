// Vérifier si l'utilisateur utilise un appareil mobile
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // Vérifier si l'API Web App Manifest est prise en charge
  if (
    "matchMedia" in window &&
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    console.log("L'application est déjà installée en mode autonome");
  } else if (window.navigator.standalone) {
    console.log("L'application est déjà installée en mode plein écran");
  } else {
    // Créer un bouton d'installation
    var installButton = document.getElementById("install-button");
    installButton.style.display = "block";

    // Créer une boîte de dialogue pour installer l'application
    var promptEvent = null;

    window.addEventListener("beforeinstallprompt", function (event) {
      // Empêcher l'affichage de la boîte de dialogue par défaut
      event.preventDefault();

      // Enregistrer l'événement de la boîte de dialogue
      promptEvent = event;

      // Afficher le bouton d'installation
      installButton.style.display = "block";
    });

    // Ajouter un gestionnaire d'événements au bouton d'installation
    installButton.addEventListener("click", function () {
      // Créer un pop-up pour confirmer l'installation
      var popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.bottom = "0";
      popup.style.left = "0";
      popup.style.right = "0";
      popup.style.background = "#fff";
      popup.style.color = "#000";
      popup.style.padding = "10px";
      popup.style.textAlign = "center";
      popup.innerHTML =
        '<p>Voulez-vous ajouter notre application à votre écran d\'accueil ?</p><button onclick="installApp()">Installer</button><button onclick="cancelInstall()">Annuler</button>';
      document.body.appendChild(popup);

      // Enregistrer l'événement de la boîte de dialogue
      window.promptEvent = promptEvent;
    });
  }

  // Fonction pour installer l'application
  function installApp() {
    // Récupérer l'événement
    var event = window.promptEvent;
    if (event) {
      event.prompt();
      event.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === "accepted") {
          console.log(
            "L'utilisateur a accepté l'installation de l'application"
          );
        } else {
          console.log("L'utilisateur a refusé l'installation de l'application");
        }
        // Réinitialiser l'événement de la boîte de dialogue
        window.promptEvent = null;
      });
    }
  }

  // Fonction pour annuler l'installation de l'application
  function cancelInstall() {
    // Supprimer la boîte de dialogue
    var popup = document.querySelector("div");
    popup.parentNode.removeChild(popup);

    // Réinitialiser l'événement de la boîte de dialogue
    window.promptEvent = null;
  }
}
