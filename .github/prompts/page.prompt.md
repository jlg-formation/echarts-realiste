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

- **Structure en 2 colonnes** :
  - **Panneau gauche** : Éditeur de code affichant l'objet `option` d'ECharts (avec onglets JS/TS, bouton Run)
  - **Panneau droit** : Zone de prévisualisation du graphique avec options (Dark Mode, Decal Pattern, Render)
- **Barre d'actions en bas du panneau droit** : Boutons Download, Screenshot, Share
- **Footer** : Horodatage et temps de génération du graphique

### Routing

- Mettre à jour `/src/pages/Home.tsx` pour que la carte correspondante (`<section>/<titre>`) contienne un lien vers le nouveau composant créé.
- Ajouter la route dans le router (ex: `/scatter/anscombes-quartet` → `AnscombesQuartet.tsx`)

## Exception

- Pas d'exception pour l'instant

## Critères de succès

- Le site développé doit ressembler au maximum à `/specifications/screenshots/dataviz.png`
