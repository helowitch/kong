function calculerPourcentage() {
    // Compter le nombre de cases cochées
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const nombreDeCasesCochées = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  
    // Calculer le pourcentage
    const totalDePhrases = checkboxes.length;
    const pourcentage = (nombreDeCasesCochées / totalDePhrases) * 100;
  
    // Afficher le résultat
    const resultatElement = document.getElementById('resultat');
    resultatElement.textContent = `Ton pourcentage est de ${pourcentage.toFixed(2)}%`;
  }
  