---
agent: agent
---

## Ton Rôle

Tu es un développeur web React front-end expert en :

- React, TypeScript, TailwindCSS, React Router
- Apache ECharts pour la visualisation de données
- Pédagogie de la data visualisation et insights métier

## Ton Objectif

Ajouter un système de **documentation pédagogique** pour chaque exemple de graphique du site.

### Fonctionnalité à implémenter

1. **Nouvel onglet "Notes"** dans `CodePanel.tsx`
   - Ajouter un onglet "Notes" après l'onglet existant "Option Preview"
   - Cet onglet affiche un contenu Markdown explicatif propre à chaque dataviz

2. **Prop `notes` dans `ChartEditor`**
   - Ajouter une prop optionnelle `notes?: string` au composant `ChartEditor`
   - Cette prop contient le texte Markdown à afficher dans l'onglet "Notes"
   - Si `notes` n'est pas fourni, l'onglet "Notes" ne doit pas apparaître

3. **Rendu Markdown**
   - Utiliser une librairie légère pour parser le Markdown (ex: `react-markdown`)
   - Styliser le rendu avec TailwindCSS (prose ou classes personnalisées)
   - **Le conteneur doit être scrollable** : utiliser `overflow-auto` et `flex-1` pour que le contenu défile verticalement si le texte est trop long

### Exemple d'utilisation

```tsx
// src/pages/line/BasicLineChart.tsx
const notes = `
## Quand utiliser un graphique linéaire simple ?

Le **line chart basique** est idéal pour :
- Visualiser une tendance temporelle
- Comparer l'évolution d'une seule métrique
- Montrer des variations continues

### Bonnes pratiques
- Limiter à 7-10 points de données pour la lisibilité
- Utiliser un axe Y commençant à 0 pour éviter les distorsions
- Ajouter des marqueurs aux points clés

### Insights possibles
Ce graphique montre l'activité hebdomadaire avec un pic le dimanche (260) 
et un creux le vendredi (135).
`;

export default function BasicLineChart() {
  return (
    <ChartEditor
      title="Basic Line Chart"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
```

## Contraintes

- Utiliser `bun` (pas npm) pour installer les dépendances
- Respecter le format Prettier du projet (`bun format`)
- Utiliser TailwindCSS pour le styling (éviter le CSS natif)
- Le contenu Markdown doit être scrollable si trop long
- Conserver le comportement existant des autres onglets

## Fichiers à modifier

1. `src/components/chart-editor/ChartEditor.tsx` - Ajouter la prop `notes` et la passer à `CodePanel`
2. `src/components/chart-editor/CodePanel.tsx` - Ajouter l'onglet "Notes" et le rendu Markdown
3. `package.json` - Ajouter la dépendance Markdown si nécessaire

## Critères de succès

- [ ] L'onglet "Notes" apparaît uniquement si la prop `notes` est fournie
- [ ] Le Markdown est correctement rendu avec un style cohérent
- [ ] Le contenu est scrollable pour les longs textes
- [ ] Les autres onglets (Edit Code, Full Code, Option Preview) fonctionnent toujours
- [ ] Le code passe `bun format` sans erreur
- [ ] Pas de régression visuelle sur les pages existantes
