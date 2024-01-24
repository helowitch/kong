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
  
      // Ajoute uniquement les pourcentages positifs
      if (pourcentage > 0) {
        pourcentages[categorie] = pourcentage;
      }
    }
  
    // Afficher le résultat
    const resultatElement = document.getElementById('resultat');
    
    // Construire le texte résultat en fonction des catégories avec des pourcentages positifs
    let texteResultat = 'Ton pourcentage est de ';
    const categoriesPositives = Object.keys(pourcentages);
  
    if (categoriesPositives.length > 0) {
      categoriesPositives.forEach((categorie, index) => {
        texteResultat += `${pourcentages[categorie].toFixed(2)}% pour la catégorie ${categorie}`;
        
        // Ajouter une virgule si ce n'est pas la dernière catégorie
        if (index < categoriesPositives.length - 1) {
          texteResultat += ', et ';
        }
      });
    } else {
      texteResultat += '0% pour aucune catégorie';
    }
  
    resultatElement.textContent = texteResultat;
  
    // Afficher le diagramme en cercle (ou une liste)
    afficherDiagramme(pourcentages);
  }
  
  function afficherDiagramme(pourcentages) {
    const diagrammeElement = document.getElementById('diagramme');
  
    // Vérifie si l'élément est un élément <canvas>
    if (!(diagrammeElement instanceof HTMLCanvasElement)) {
      console.error('L\'élément du diagramme n\'est pas un élément <canvas>.');
      return;
    }
    
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
  