function calculerPourcentage() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const categories = {};
  
    checkboxes.forEach(checkbox => {
      const categorie = checkbox.getAttribute('data-categorie');
      categories[categorie] = (categories[categorie] || 0) + 1;
    });
  
    const totalDePhrases = checkboxes.length;
    const totalDeCochees = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const pourcentageGlobal = (totalDeCochees / totalDePhrases) * 100;
  
    const resultatGlobalElement = document.getElementById('resultatGlobal');
    if (totalDeCochees > 0) {
      resultatGlobalElement.textContent = `Tu es kong à ${pourcentageGlobal.toFixed(2)}%.`;
  
      const resultatsCategorieElement = document.getElementById('resultatsCategorie');
      resultatsCategorieElement.innerHTML = '';
      
      // Catégories existantes
      const nomsCategories = {
        'A': 'Kong show',
        'B': 'Kong des cavernes',
        'C': 'Kong strong',
        'D': 'Kong beauf',
        'E': 'Kongpétiteur',
        'F': 'Mécakong',
      };
  
      // Ajouter une catégorie "pas kong"
      nomsCategories['PasKong'] = 'Pas kong';
  
      for (const categorie in nomsCategories) {
        const pourcentageCategorie = (categories[categorie] || 0) / totalDePhrases * 100;
        const nomCategorie = nomsCategories[categorie];
        const paragraphe = document.createElement('p');
        paragraphe.textContent = `Tu es ${nomCategorie} à ${pourcentageCategorie.toFixed(2)}%.`;
        resultatsCategorieElement.appendChild(paragraphe);
      }
  
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
      'PasKong': 'Pas kong',
    };
  
    return nomsCategories[categorie] || 'Inconnu';
  }
  