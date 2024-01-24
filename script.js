function calculerPourcentage() {
    // Compter le nombre de cases cochées par catégorie
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const categories = {};
  
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const categorie = checkbox.getAttribute('data-categorie');
        categories[categorie] = (categories[categorie] || 0) + 1;
      }
    });
  
    // Calculer le pourcentage par catégorie
    const totalDePhrases = checkboxes.length;
    const pourcentages = {};
  
    for (const categorie in categories) {
      const nombreDePhrasesPourCategorie = categories[categorie];
      const pourcentage = (nombreDePhrasesPourCategorie / totalDePhrases) * 100;
      pourcentages[categorie] = pourcentage;
    }
  
    // Afficher le résultat
    const resultatElement = document.getElementById('resultat');
    resultatElement.textContent = `Ton pourcentage est de ${pourcentages['A']}% pour la catégorie A, et ${pourcentages['B']}% pour la catégorie B, etc.`;
  
    // Afficher le diagramme en cercle (ou une liste)
    afficherDiagramme(pourcentages);
  }
  
  function afficherDiagramme(pourcentages) {
    const diagrammeElement = document.getElementById('diagramme');
    
    // Crée un tableau pour stocker les données du diagramme
    const data = {
      labels: Object.keys(pourcentages),
      datasets: [{
        data: Object.values(pourcentages),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', /* ... Ajoute des couleurs ... */],
      }],
    };
  
    // Options du diagramme
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };
  
    // Crée un objet de type Doughnut (diagramme en cercle)
    const myDoughnutChart = new Chart(diagrammeElement, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
  