const fs = require('fs');
const path = require('path');

const srcDir = 'src/app'; // Le répertoire source de vos composants
const globalCssFile = 'src/styles.css'; // Le fichier où vous souhaitez regrouper les styles

function processComponentFiles(componentDir) {
  const cssFiles = fs.readdirSync(componentDir).filter(file => file.endsWith('.css'));
  const htmlFiles = fs.readdirSync(componentDir).filter(file => file.endsWith('.html'));
  const tsFiles = fs.readdirSync(componentDir).filter(file => file.endsWith('.ts'));

  // Générer une classe générique pour le composant avec un préfixe '_'
  const componentClass = `_${path.basename(componentDir).toLowerCase()}`;

  // Traitement des fichiers CSS
  cssFiles.forEach(cssFile => {
    const cssFilePath = path.join(componentDir, cssFile);
    const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

    // Ajouter la classe générique à chaque début de balise du fichier CSS
    let insideKeyframes = false;
    const modifiedCssContent = cssContent.split('\n').map(line => {
      let indexAccolade = line.lastIndexOf('{');

      if (line.includes('{')) {
        let avantAccolade = line.substring(0, indexAccolade).trim();

        // Trouver le dernier mot avant {
        if (!insideKeyframes && !line.includes("@media") && !line.includes("@keyframe")) {
          return `.${componentClass} ${avantAccolade}{`;
        }

        // Si la ligne contient @keyframes, marquer qu'on est à l'intérieur
        if (line.includes("@keyframes")) {
          insideKeyframes = true;
        }
      }

      // Si la ligne contient une accolade fermante, et que nous étions à l'intérieur d'un bloc @keyframes,
      // marquer qu'on n'est plus à l'intérieur
      if (line.includes('}') && insideKeyframes) {
        // Vérifier si le nombre d'accolades fermantes est supérieur à 2
        if ((line.split('}').length - 1) > 2) {
          insideKeyframes = false;
        }
      }

      // Sinon, laisser la ligne inchangée
      return insideKeyframes ? line : line;
    }).join('\n');

    // Ajouter le contenu modifié au fichier CSS global
    fs.appendFileSync(globalCssFile, modifiedCssContent + '\n', 'utf-8');
  });

  // Traitement des fichiers HTML
  htmlFiles.forEach(htmlFile => {
    const htmlFilePath = path.join(componentDir, htmlFile);
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

    // Ajouter la classe générique à la première balise du fichier HTML
    htmlContent = htmlContent.replace(htmlContent, (match, tag) => {
      return `<object class="${componentClass}">\n${match}\n</object>`;
    });

    // Écrire le contenu modifié dans le fichier HTML
    fs.writeFileSync(htmlFilePath, htmlContent);
  });

  // Traitement des fichiers TypeScript (controllers)
  tsFiles.forEach(tsFile => {
    const tsFilePath = path.join(componentDir, tsFile);
    let tsContent = fs.readFileSync(tsFilePath, 'utf-8');

    // Enlever les dépendances URL de styles
    tsContent = tsContent.replace(/styleUrls:\s*\[[^]*?\]/s, '');

    // Écrire le contenu modifié dans le fichier TypeScript
    fs.writeFileSync(tsFilePath, tsContent);
  });

  // Supprimer les fichiers CSS individuels
  cssFiles.forEach(cssFile => {
    const cssFilePath = path.join(componentDir, cssFile);
    fs.unlinkSync(cssFilePath);
  });
}

// Fonction récursive pour traiter tous les composants et sous-composants
function processComponentsRecursively(dir) {
  const components = fs.readdirSync(dir).filter(component => fs.statSync(path.join(dir, component)).isDirectory());

  components.forEach(component => {
    const componentDir = path.join(dir, component);
    processComponentFiles(componentDir);
    processComponentsRecursively(componentDir); // Appel récursif pour les sous-composants
  });
}

// Traiter tous les composants de manière récursive
processComponentsRecursively(srcDir);

console.log('Le regroupement des styles a été effectué avec succès, et les fichiers individuels ont été supprimés !');
