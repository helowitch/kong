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
      
      // Catégories existantes
      const nomsCategories = {
        'A': 'Kong show',
        'B': 'Kong des cavernes',
        'C': 'Kong strong',
        'D': 'Kong beauf',
        'E': 'Kongpétiteur',
        'F': 'Mécakong',
      };
  
      const totalCategories = Object.values(categories).reduce((total, valeur) => total + valeur, 0);
  
      for (const categorie in nomsCategories) {
        const pourcentageCategorie = Math.floor((categories[categorie] || 0) / totalCategories * 100);
        const nomCategorie = nomsCategories[categorie];
        const paragraphe = document.createElement('p');
        paragraphe.textContent = `Tu es ${nomCategorie} à ${pourcentageCategorie.toFixed(0)}%.`;
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
    };
  
    return nomsCategories[categorie] || 'Inconnu';
  }
  