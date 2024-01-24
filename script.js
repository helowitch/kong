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
  
    // Calculer le pourcentage global
    const totalDePhrases = checkboxes.length;
    const pourcentageGlobal = (Object.keys(categories).length / totalDePhrases) * 100;
  
    // Construire le texte résultat global
    const resultatGlobalElement = document.getElementById('resultat');
    if (Object.keys(categories).length > 0) {
      resultatGlobalElement.textContent = `Tu es kong à ${pourcentageGlobal.toFixed(2)}%.`;
    } else {
      resultatGlobalElement.textContent = "Tu n'es pas kong du tout... quel modèle de pureté !";
    }
  
    // Construire le texte résultat par catégorie
    const resultatsCategorieElement = document.getElementById('resultatsCategorie');
    resultatsCategorieElement.innerHTML = '';
    for (const categorie in categories) {
      const pourcentageCategorie = (categories[categorie] / totalDePhrases) * 100;
      const paragraphe = document.createElement('p');
      paragraphe.textContent = `Tu es ${categorie} à ${pourcentageCategorie.toFixed(2)}%.`;
      resultatsCategorieElement.appendChild(paragraphe);
    }
  
    // Afficher le diagramme en cercle (ou une liste)
    afficherDiagramme(categories);
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
  