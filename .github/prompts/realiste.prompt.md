---
agent: agent
---

## Ton Rôle

Développeur web react front-end, tailwindcss, react router, et echarts
Expert en option echarts@6
Expert en visualisation de données réaliste et en insight.

## Ton objectif

Modifier la page donnée en paramètre pour :

1. **Rendre le scénario réaliste** : enrichir les options ECharts avec un contexte métier concret
2. **Ajouter une note pédagogique** : utiliser la prop `notes` du composant `ChartEditor` pour afficher une documentation Markdown dans l'onglet "Notes"

## Syntaxe de la commande

```
/realiste section=<section> titre=<titre>
```

### Fichier de configuration `page-en-cours.md`

Si le fichier `/specifications/page-en-cours.md` existe, les valeurs de `section` et `titre` doivent être lues depuis ce fichier. Le format attendu est :

```markdown
- section="<section>"
- titre="<titre>"
```

**Priorité des paramètres** (de la plus haute à la plus basse) :

1. Paramètres passés en ligne de commande
2. Valeurs du fichier `page-en-cours.md`
3. Valeurs par défaut

**Prérequis** : Le fichier `/src/pages/<slug-section>/<SlugTitre>.tsx` doit exister. Si ce n'est pas le cas, exécutez d'abord la commande `/page`.

**Convention de nommage des slugs :**

- `<slug-section>` : kebab-case en minuscules (ex: `Scatter` → `scatter`, `Basic Line` → `basic-line`)
- `<SlugTitre>` : PascalCase (ex: `Anscombe's quartet` → `AnscombesQuartet`, `Basic Line Chart` → `BasicLineChart`)

### Exemple

```
/realiste section="Scatter" titre="Anscombe's quartet"
```

Cela modifiera les options echarts du fichier : `/src/pages/scatter/AnscombesQuartet.tsx` pour rendre le scénario exposé plus réaliste.

### Valeurs par défaut

- section="Line"
- titre="Basic Line Chart"

## Contraintes

### Scenario Réaliste

Realiste veut en particulier dire que :

- le scénario intègre une histoire et un contexte précis
- celui qui lit la datavisualisation comprend tout de suite de quoi il s'agit
- il y a une grille de lecture
- on comprend tout de suite les unités
- on comprend tout de suite le message transmis
- il y a toujours un message qui est passé et qui indique une décision à prendre ou conscientiser un problème ou une bonne nouvelle.

### Note pédagogique via la prop `notes`

En plus du scénario réaliste, ajouter une **note pédagogique** via la prop `notes` du composant `ChartEditor`.

#### Comment implémenter la note

1. Créer une constante `notes` contenant le texte Markdown de la note pédagogique
2. Passer cette constante à la prop `notes` du composant `ChartEditor`

```tsx
const notes = `
## 📚 Note pédagogique : [Type de graphique]

### ✅ Quand utiliser ce type de diagramme
...

### ❌ Quand ne pas utiliser ce type de diagramme
...
`;

export default function MonGraphique() {
  return (
    <ChartEditor
      title="Mon Graphique"
      section="Section"
      option={option}
      notes={notes} // ← Ajouter cette prop
    />
  );
}
```

#### Contenu de la note pédagogique

La note doit :

- Expliquer **quand utiliser** ce type de diagramme
- Expliquer **quand ne pas utiliser** ce type de diagramme
- Être structurée avec des titres, sous-titres, bullet points et paragraphes explicatifs
- Donner des exemples concrets d'utilisation
- Mentionner les erreurs courantes à éviter

#### Exemple de note pédagogique (pour un graphique en ligne)

```markdown
## 📚 Note pédagogique : Graphique en ligne (Line Chart)

### ✅ Quand utiliser ce type de diagramme

Le graphique en ligne est idéal dans les situations suivantes :

- **Visualiser une évolution temporelle** : suivi de métriques sur des jours, semaines, mois ou années
- **Détecter des tendances** : croissance, décroissance, saisonnalité
- **Identifier des anomalies** : pics ou chutes soudaines dans les données
- **Comparer plusieurs séries** : évolution parallèle de 2-5 variables sur la même période
- **Montrer la continuité** : quand les données ont une progression logique entre les points

**Exemples concrets :**

- Évolution du chiffre d'affaires mensuel
- Suivi de la température sur une journée
- Progression du nombre d'utilisateurs actifs

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le graphique en ligne dans ces cas :

- **Données catégorielles sans ordre** : utilisez plutôt un diagramme en barres
- **Comparaison de proportions** : préférez un camembert ou un treemap
- **Peu de points de données** (< 3) : un tableau ou des indicateurs chiffrés seront plus clairs
- **Données non continues** : si les points n'ont pas de lien logique entre eux
- **Trop de séries** (> 5-6 lignes) : le graphique devient illisible, envisagez des small multiples

**Erreurs courantes à éviter :**

- Ne pas connecter des points qui n'ont pas de relation temporelle
- Ne pas utiliser pour des données cumulées (préférer un area chart)
```

### Options echarts

N'intervenir que dans les options echarts pour enrichir la visualisation de donnée.

**Important** : Ne pas utiliser `graphic` pour afficher la note pédagogique dans le graphique. La note doit être passée via la prop `notes` du composant `ChartEditor` et s'affichera dans l'onglet "Notes" dédié.

### Garder le même type de graphique

Le but est de montrer un cas d'utilisation d'un graphique en l'intégrant dans une histoire.

## Critères de succès

- La page revisitée doit présenter un scénario réaliste
- La prop `notes` est ajoutée au composant `ChartEditor` avec une note pédagogique complète
- Aucun problème d'accessibilité (couleur, contraste, taille de caractères, etc.)
- Pas de texte tronqué
- Pas de recouvrement de texte
- Pas de `graphic` utilisé pour la note pédagogique (utiliser la prop `notes` à la place)

## Exemple avant/après

### Avant (options basiques)

```typescript
const option: EChartsOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
```

### Après (options réalistes + note pédagogique)

```tsx
import { ChartEditor } from "@/components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Fréquentation du site e-commerce - Semaine 47",
    subtext: "🚨 Chute de 38% le vendredi : incident serveur détecté",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b}<br/>Visiteurs uniques : <b>{c}</b>",
  },
  xAxis: {
    type: "category",
    name: "Jour",
    data: [
      "Lun 18/11",
      "Mar 19/11",
      "Mer 20/11",
      "Jeu 21/11",
      "Ven 22/11",
      "Sam 23/11",
      "Dim 24/11",
    ],
  },
  yAxis: {
    type: "value",
    name: "Visiteurs uniques",
    axisLabel: {
      formatter: "{value} k",
    },
  },
  series: [
    {
      name: "Visiteurs",
      data: [
        { value: 15000 },
        { value: 23000 },
        { value: 22400 },
        { value: 21800 },
        {
          value: 13500,
          itemStyle: { color: "#e74c3c" },
          label: { show: true, formatter: "⚠️ -38%", position: "top" },
        },
        { value: 14700 },
        { value: 26000 },
      ],
      type: "line",
      markLine: {
        data: [{ type: "average", name: "Moyenne" }],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Graphique en ligne (Line Chart)

### ✅ Quand utiliser ce type de diagramme

Le graphique en ligne est idéal dans les situations suivantes :

- **Visualiser une évolution temporelle** : suivi de métriques sur des jours, semaines, mois ou années
- **Détecter des tendances** : croissance, décroissance, saisonnalité
- **Identifier des anomalies** : pics ou chutes soudaines dans les données
- **Comparer plusieurs séries** : évolution parallèle de 2-5 variables sur la même période
- **Montrer la continuité** : quand les données ont une progression logique entre les points

**Exemples concrets :**

- Évolution du chiffre d'affaires mensuel
- Suivi de la température sur une journée
- Progression du nombre d'utilisateurs actifs

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le graphique en ligne dans ces cas :

- **Données catégorielles sans ordre** : utilisez plutôt un diagramme en barres
- **Comparaison de proportions** : préférez un camembert ou un treemap
- **Peu de points de données** (< 3) : un tableau ou des indicateurs chiffrés seront plus clairs
- **Données non continues** : si les points n'ont pas de lien logique entre eux
- **Trop de séries** (> 5-6 lignes) : le graphique devient illisible, envisagez des small multiples

**Erreurs courantes à éviter :**

- Ne pas connecter des points qui n'ont pas de relation temporelle
- Ne pas utiliser pour des données cumulées (préférer un area chart)
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

**Ce qui rend cet exemple réaliste :**

- **Titre explicite** : on sait immédiatement de quoi parle le graphique
- **Sous-titre avec insight** : le message clé est visible dès le premier regard
- **Dates précises** : pas de "Mon, Tue..." abstrait
- **Unités claires** : "Visiteurs uniques" et "k" pour milliers
- **Point d'attention visuel** : le vendredi est en rouge avec un label d'alerte
- **Ligne de moyenne** : donne un repère pour contextualiser les valeurs

**Ce qui rend la note pédagogique utile :**

- **Prop `notes`** : la note est passée au composant `ChartEditor` et s'affiche dans l'onglet "Notes"
- **Structure claire** : titres, sous-titres, bullet points pour une lecture rapide
- **Cas d'usage** : explique quand utiliser et quand éviter ce type de graphique
- **Exemples concrets** : aide à transposer dans son propre contexte
- **Erreurs à éviter** : prévient les mauvaises pratiques
