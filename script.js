document.addEventListener('DOMContentLoaded', () => {
    // Chargement des réponses sauvegardées au démarrage de la page
    chargerReponses();
  
    // Écouteur d'événement sur le changement de chaque case à cocher
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        calculerPourcentage();
        // Sauvegarde des réponses à chaque changement
        sauvegarderReponses();
      });
    });
  
    // Écouteur d'événement sur le bouton de réinitialisation
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        // Réinitialisation des réponses et sauvegarde
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        calculerPourcentage();
        sauvegarderReponses();
      });
    }
  });
  
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
      afficherDiagramme(categories);
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
  
  function afficherDiagramme(pourcentages) {
    const diagrammeElement = document.getElementById('diagramme');
  
    if (!(diagrammeElement instanceof HTMLCanvasElement)) {
      console.error('L\'élément du diagramme n\'est pas un élément <canvas>.');
      return;
    }
    
    const data = {
      labels: Object.keys(pourcentages).map(categorie => getNomCategorie(categorie)),
      datasets: [{
        data: Object.values(pourcentages),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5733', '#9B59B6', '#C0C0C0' /* ... Ajoute des couleurs ... */],
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
  
  function sauvegarderReponses() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const reponses = {};
  
    checkboxes.forEach(checkbox => {
      const id = checkbox.getAttribute('id');
      reponses[id] = checkbox.checked;
    });
  
    localStorage.setItem('kongReponses', JSON.stringify(reponses));
  }
  
  function chargerReponses() {
    const reponses = localStorage.getItem('kongReponses');
  
    if (reponses) {
      const reponsesParsed = JSON.parse(reponses);
  
      for (const id in reponsesParsed) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = reponsesParsed[id];
        }
      }
    }
  }
  