---
agent: agent
---

## Ton Rôle

Développeur web react front-end, tailwindcss, react router, et echarts
Expert en visualisation de données réaliste et en insight.

## Ton objectif

Créer le composant de page pour la dataviz donnée en entrée par son titre et sa section

## Syntaxe de la commande

```
/page section=<section> titre=<titre>
```

Créer si nécessaire le répertoire `/src/pages/<slug-section>` et le composant de page (router) `/src/pages/<slug-section>/<SlugTitre>.tsx`

### Convention de nommage

- **Répertoires** : kebab-case (ex: `scatter`, `basic-line`)
- **Fichiers de composants** : PascalCase (ex: `AnscombesQuartet.tsx`, `BasicLineChart.tsx`)

### Exemple

```
/page section="Scatter" titre="Anscombe's quartet"
```

Cela créera : `/src/pages/scatter/AnscombesQuartet.tsx`

### Valeurs par défaut

- section="Line"
- titre="Basic Line Chart"

## Contraintes

### Architecture - Composant partagé `ChartEditor`

Avant de créer une page, vérifier si le composant `ChartEditor` existe dans `/src/components/chart-editor/`. Si non, le créer avec la structure suivante :

```
/src/components/chart-editor/
├── ChartEditor.tsx          # Composant principal (layout 2 colonnes)
├── CodePanel.tsx            # Panneau gauche (éditeur de code)
├── PreviewPanel.tsx         # Panneau droit (graphique + options)
└── ActionBar.tsx            # Barre d'actions (Download, Screenshot, Share)
```

#### Interface des props

```tsx
interface ChartEditorProps {
  title: string;
  section: string;
  option: EChartsOption;
}
```

#### Utilisation dans les pages

Chaque page créée doit simplement importer et utiliser `ChartEditor` :

```tsx
// Exemple : /src/pages/scatter/AnscombesQuartet.tsx
import { ChartEditor } from "../../components/chart-editor/ChartEditor";

const option: EChartsOption = {
  // ... configuration ECharts spécifique au graphique
};

export default function AnscombesQuartet() {
  return (
    <ChartEditor title="Anscombe's Quartet" section="Scatter" option={option} />
  );
}
```

### Layout de la page (implémenté dans `ChartEditor`)

Le composant de page doit reproduire le layout de `/specifications/screenshots/dataviz.png` (basé sur `https://echarts.apache.org/examples/en/editor.html?c=line-simple`) :

- **Structure en 2 colonnes redimensionnables** :
  - **Panneau gauche (`CodePanel`)** : Éditeur de code affichant l'objet `option` d'ECharts (avec onglets JS/TS, bouton Run)
  - **Panneau droit (`PreviewPanel`)** : Zone de prévisualisation du graphique avec options (Dark Mode, Decal Pattern, Render)
  - **Séparateur ajustable** : Un diviseur vertical draggable entre les deux panneaux permettant à l'utilisateur de redimensionner la largeur de chaque panneau en temps réel
- **Barre d'actions en bas du panneau droit** : Boutons Download, Screenshot, Share
- **Footer** : Horodatage et temps de génération du graphique

### Panneaux redimensionnables

Le `ChartEditor` doit implémenter un système de redimensionnement des panneaux :

- **Séparateur draggable** : Une barre verticale (4-6px de large) entre `CodePanel` et `PreviewPanel` que l'utilisateur peut glisser horizontalement
- **Curseur de redimensionnement** : Le curseur doit changer en `col-resize` au survol du séparateur
- **Largeur minimale** : Chaque panneau doit avoir une largeur minimale (ex: 300px) pour éviter qu'il soit complètement réduit
- **Persistance optionnelle** : La position du séparateur peut être sauvegardée en `localStorage` pour être restaurée à la prochaine visite
- **Responsive** : Le graphique dans `PreviewPanel` doit se redimensionner automatiquement quand la largeur du panneau change

### Routing

- Mettre à jour `/src/pages/Home.tsx` pour que la carte correspondante (`<section>/<titre>`) contienne un lien vers le nouveau composant créé.
- Ajouter la route dans le router (ex: `/scatter/anscombes-quartet` → `AnscombesQuartet.tsx`)

## Exceptions

### CodePanel - Barre d'outils simplifiée

Dans le composant `CodePanel`, la barre d'outils doit être minimaliste :

- **Supprimer** : Les onglets de sélection de langage (JS/TS), les boutons de formatage, "Open with CodePen", "Open with CodeSandbox" et autres outils secondaires
- **Conserver uniquement** : Le bouton "Run" pour exécuter le code

### CodePanel - Onglets de vue (comme sur le site original)

Le `CodePanel` doit implémenter 3 onglets de vue en haut du panneau, identiques à ceux du site original (`https://echarts.apache.org/examples/en/editor.html?c=line-simple`) :

1. **Edit Code** (onglet par défaut) :
   - Affiche uniquement le contenu de l'objet `option` dans l'éditeur de code
   - C'est le code que l'utilisateur peut modifier directement
   - Exemple : `{ xAxis: { type: 'category', ... }, yAxis: { ... }, series: [...] }`

2. **Full Code** :
   - Affiche le code JavaScript/TypeScript complet et autonome pour créer le graphique
   - Inclut les imports, l'initialisation du DOM, la création de l'instance ECharts, et l'appel à `setOption()`
   - Exemple :

     ```javascript
     import * as echarts from "echarts";

     var chartDom = document.getElementById("main");
     var myChart = echarts.init(chartDom);
     var option;

     option = {
       // ... le contenu de l'option
     };

     option && myChart.setOption(option);
     ```

   - Ce code est en lecture seule (non éditable) et sert à montrer comment utiliser le graphique dans un projet réel

3. **Option Preview** :
   - Affiche l'objet `option` **complet et résolu** tel qu'il est réellement appliqué au graphique par ECharts
   - Cela inclut toutes les propriétés : celles définies explicitement par l'utilisateur ET celles générées par défaut par ECharts (couleurs, styles, marges, animations, etc.)
   - Pour obtenir cet objet complet, utiliser la méthode `chart.getOption()` sur l'instance ECharts après le rendu
   - Format JSON prettifié et en lecture seule
   - Utile pour inspecter la configuration finale complète du graphique, y compris les valeurs par défaut appliquées automatiquement

#### Style des onglets

- Les onglets doivent être affichés horizontalement en haut du `CodePanel`
- L'onglet actif doit être visuellement distinct (texte plus foncé, bordure inférieure colorée)
- Les onglets inactifs doivent avoir un style plus discret (gris clair)

## Critères de succès

- Le site développé doit ressembler au maximum à `/specifications/screenshots/dataviz.png`
