// Déclarer myDoughnutChart en dehors de la fonction afficherDiagramme
let myDoughnutChart;

function calculerPourcentage() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const categories = {};

  checkboxes.forEach(checkbox => {
    const categorie = checkbox.getAttribute('data-categorie') || 'Inconnu';
    categories[categorie] = (categories[categorie] || 0) + (checkbox.checked ? 1 : 0);
  });

  const totalDeCochees = document.querySelectorAll('input[type="checkbox"]:checked').length;
  const pourcentageGlobal = Math.ceil((totalDeCochees / checkboxes.length) * 100);

  const resultatGlobalElement = document.getElementById('resultatGlobal');
  if (totalDeCochees > 0) {
    resultatGlobalElement.textContent = `Tu es kong à ${pourcentageGlobal.toFixed(0)}%.`;

    const resultatsCategorieElement = document.getElementById('resultatsCategorie');
    resultatsCategorieElement.innerHTML = '';

    // Trouver les deux catégories principales
    const nomsCategories = {
      'A': 'Kong show',
      'B': 'Kong des cavernes',
      'C': 'Kong strong',
      'D': 'Kong beauf',
      'E': 'Kongpétiteur',
      'F': 'Mécakong',
    };

    const categoriesTriees = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    const deuxCategoriesPrincipales = categoriesTriees.slice(0, 2).map(cat => nomsCategories[cat[0]]);

    // Afficher les deux catégories principales
    const phrasePrincipales = document.createElement('p');
    phrasePrincipales.textContent = `À l'intérieur de toi, il y a deux principaux kongs : ${deuxCategoriesPrincipales.join(' et ')}.`;
    resultatsCategorieElement.appendChild(phrasePrincipales);

    // Afficher le diagramme en cercle
    myDoughnutChart = afficherDiagramme(categories);
  } else {
    resultatGlobalElement.textContent = "Tu n'es pas kong du tout... quel modèle de pureté !";
    document.getElementById('resultatsCategorie').innerHTML = '';
    const diagrammeElement = document.getElementById('diagramme');
    if (diagrammeElement instanceof HTMLCanvasElement) {
      const context = diagrammeElement.getContext('2d');
      context.clearRect(0, 0, diagrammeElement.width, diagrammeElement.height);
    }
  }
}

// Écouteur d'événement sur le clic de chaque section du diagramme
const diagrammeElement = document.getElementById('diagramme');
diagrammeElement.addEventListener('click', (event) => {
  if (myDoughnutChart) {
    const activeElement = myDoughnutChart.getElementAtEvent(event)[0];

    if (activeElement) {
      // Récupérer la catégorie de la section cliquée
      const categorie = myDoughnutChart.data.labels[activeElement._index];
      afficherDescriptionCategorie(categorie);
    }
  }
});

function afficherDiagramme(pourcentages) {
  const diagrammeElement = document.getElementById('diagramme');

  if (!(diagrammeElement instanceof HTMLCanvasElement)) {
    console.error('L\'élément du diagramme n\'est pas un élément <canvas>.');
    return;
  }

  const categories = Object.keys(pourcentages).map(categorie => getNomCategorie(categorie));
  const couleurs = categories.map(categorie => getColorForCategory(categorie));

  const data = {
    labels: categories,
    datasets: [{
      data: Object.values(pourcentages),
      backgroundColor: couleurs,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const myDoughnutChart = new Chart(diagrammeElement, {
    type: 'doughnut',
    data: data,
    options: options,
  });

  return myDoughnutChart;
}

function getColorForCategory(categorie) {
  const colorsMapping = {
    'Kong show': '#FF6384',
    'Kong des cavernes': '#36A2EB',
    'Kong strong': '#FFCE56',
    'Kong beauf': '#4CAF50',
    'Kongpétiteur': '#FF5733',
    'Mécakong': '#9B59B6',
  };

  return colorsMapping[categorie] || '#C0C0C0'; // Couleur par défaut
}
