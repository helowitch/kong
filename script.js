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

function getNomCategorie(categorie) {
  const nomsCategories = {
    'A': 'Kong show',
    'B': 'Kong des cavernes',
    'C': 'Kong strong',
    'D': 'Kong beauf',
    'E': 'Kongpétiteur',
    'F': 'Mécakong',
  };

  return nomsCategories[categorie] || 'Inconnu';
}

function afficherDescriptionCategorie(categorie) {
  const descriptions = {
    'Kong show': 'Tu casses trop les couilles car tu fais trop de bruit et tu prends trop de place. Tel un chad de lycée américain, tu fais partie des Alpha Kong qui se donnent en spectacle. Mais les gens t\'admirent en secret. Tu es celui ou celle qui ne cache pas son singe intérieur.',
    'Kong des cavernes': 'Tu reviens littéralement à tes racines de singe car tu cèdes à tes pulsions innées. Tu as laissé tomber ton cerveau mais tu t\'amuses dans ton petit monde. Tu restes quand même un Beta Kong.',
    'Kong strong': '💪🔥 LES MUSCLES 🤜💥 LA CASTAGNE. Tu veux être le plus gros singe du groupe et montrer que t\'es le plus fort. Tu fais partie des Alpha Kong. N\'oublie pas qu\'il y a sûrement un petit coeur derrière cette montagne de muscles...',
    'Kong beauf': 'Littéralement l\'oncle gênant, tu es le singe Bigard, un gros Beta Kong, mais sûrement le singe le plus répandu. Il te faut juste le bon public pour être aimé·e tel·le que tu es.',
    'Kongpétiteur': 'A l\'intérieur de toi tu sais que tu es le plus fort des singes. Mais personne ne semble le remarquer. Tu ne veux pas d\'ami·e·s. Tu veux juste mettre une vitesse à tout le monde, comme le Sigma Kong que tu es.',
    'Mécakong': 'Vroummmmm vroummmm breuummmm breummm vroum... ces mots résonnent en toi comme du miel divin. Tu aimes lustrer ton véhicule et humer la douce odeur du pot d\'échappement... Tu trouves qu\'un V8 est plus beau que Henry Cavill et tu l\'assumes. Vive les gros vroum, merde.',
    'Inconnu': 'Description inconnue...',
  };
 
  const descriptionElement = document.getElementById('descriptionCategorie');
  if (descriptionElement) {
    descriptionElement.textContent = descriptions[categorie] || 'Description non disponible.';
  }
}
