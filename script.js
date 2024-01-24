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
  
    // Mapping des catégories à leurs noms respectifs
    const nomsCategories = {
      'A': 'Kong show',
      'B': 'Kong des cavernes',
      'C': 'Kong strong',
      'D': 'Kong beauf',
      'E': 'Kongpétiteur',
      'F': 'Mécakong',
      // Ajoute d'autres catégories au besoin
    };
  
    // Calculer le pourcentage global
    const totalDePhrases = checkboxes.length;
    const pourcentageGlobal = (Object.keys(categories).length / totalDePhrases) * 100;
  
    // Construire le texte résultat global
    const resultatGlobalElement = document.getElementById('resultatGlobal');
    if (Object.keys(categories).length > 0) {
      resultatGlobalElement.textContent = `Tu es kong à ${pourcentageGlobal.toFixed(2)}%.`;
  
      // Construire le texte résultat par catégorie
      const resultatsCategorieElement = document.getElementById('resultatsCategorie');
      resultatsCategorieElement.innerHTML = '';
      for (const categorie in categories) {
        const pourcentageCategorie = (categories[categorie] / totalDePhrases) * 100;
        const nomCategorie = getNomCategorie(categorie);
        const paragraphe = document.createElement('p');
        paragraphe.textContent = `Tu es ${nomCategorie} à ${pourcentageCategorie.toFixed(2)}%.`;
        resultatsCategorieElement.appendChild(paragraphe);
      }
  
      // Afficher le diagramme en cercle
      afficherDiagramme(categories);
    } else {
      resultatGlobalElement.textContent = "Tu n'es pas kong du tout... quel modèle de pureté !";
      // Effacer les résultats par catégorie et le diagramme en l'absence de coche
      document.getElementById('resultatsCategorie').innerHTML = '';
      const diagrammeElement = document.getElementById('diagramme');
      if (diagrammeElement instanceof HTMLCanvasElement) {
        const context = diagrammeElement.getContext('2d');
        context.clearRect(0, 0, diagrammeElement.width, diagrammeElement.height);
      }
    }
  }
  
  // Fonction pour obtenir le nom de la catégorie correspondante
  function getNomCategorie(categorie) {
    const nomsCategories = {
      'A': 'Kong show',
      'B': 'Kong des cavernes',
      'C': 'Kong strong',
      'D': 'Kong beauf',
      'E': 'Kongpétiteur',
      'F': 'Mécakong',
      // Ajoute d'autres catégories au besoin
    };
  
    return nomsCategories[categorie] || 'Inconnu';
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
      labels: Object.keys(pourcentages).map(categorie => getNomCategorie(categorie)),
      datasets: [{
        data: Object.values(pourcentages),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5733', '#9B59B6' /* ... Ajoute des couleurs ... */],
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
  