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

## Critères de qualité obligatoires

### 🎨 Accessibilité visuelle

- **Contraste minimum 4.5:1** pour tous les textes (titres, labels, légendes)
- **Ne pas utiliser uniquement la couleur** pour distinguer les données : ajouter des symboles différents (`circle`, `rect`, `triangle`, `diamond`), des motifs de lignes (`solid`, `dashed`, `dotted`) ou des labels explicites
- **Taille de police minimum 12px** pour garantir la lisibilité
- **Éviter le rouge/vert seul** pour les daltoniens : combiner avec des icônes (✅/❌) ou des formes différentes

### 🌓 Support Dark/Light Theme

- **Ne pas hardcoder les couleurs de fond ou de texte** : laisser ECharts gérer via le thème
- **Utiliser des couleurs qui fonctionnent dans les deux modes** :
  - Éviter le blanc pur (`#ffffff`) ou le noir pur (`#000000`) pour les éléments principaux
  - Préférer les couleurs de la palette ECharts par défaut qui s'adaptent au thème
- **Exception** : les couleurs sémantiques (rouge alerte, vert succès) peuvent être hardcodées car elles ont un sens métier

### 📱 Responsive et lisibilité

- **Labels non tronqués** : utiliser `axisLabel.rotate` ou `axisLabel.interval` si nécessaire
- **Pas de superposition de texte** : ajuster les marges avec `grid.left`, `grid.right`, `grid.top`, `grid.bottom`
- **Tooltip toujours visible** : utiliser `tooltip.confine: true` si le graphique est dans un conteneur contraint
- **Légende adaptative** : utiliser `legend.type: 'scroll'` si beaucoup de séries

### 🇫🇷 Localisation francophone

- **Dates en français** : "Lun", "Mar", "Mer"... ou "Janvier", "Février"...
- **Nombres avec espace comme séparateur de milliers** : `1 000`, `10 000` (pas `1,000`)
- **Décimales avec virgule** : `3,14` (pas `3.14`)
- **Devises** : `€` après le montant (`1 500 €`)

### ⚡ Performance

- **Limiter à 1000 points visibles maximum** par série pour garantir la fluidité
- **Utiliser `sampling`** pour les grandes séries : `sampling: 'lttb'` (Largest Triangle Three Buckets)
- **Éviter les animations lourdes** sur les grands datasets : `animation: false` ou `animationThreshold: 2000`

### 🧠 Lisibilité et efficacité cognitive

L'objectif est que l'utilisateur comprenne le message principal en **moins de 5 secondes**.

#### Hiérarchie visuelle claire

- **Titre = message principal** : le titre doit répondre à "De quoi parle ce graphique ?"
- **Sous-titre = insight clé** : le sous-titre doit répondre à "Quel est le point important à retenir ?"
- **Le graphique confirme** : les données visualisées doivent supporter le message du titre/sous-titre

#### Réduction de la charge cognitive

- **Maximum 5-7 séries** visibles simultanément (limite de la mémoire de travail)
- **Maximum 2 axes Y** : au-delà, diviser en plusieurs graphiques
- **Éviter les légendes à décoder** : préférer les labels directs sur les séries quand c'est possible
- **Couleurs sémantiques intuitives** : rouge = danger/négatif, vert = succès/positif, bleu = neutre/informatif

#### Guidage visuel

- **Mettre en évidence l'élément clé** : utiliser `emphasis`, couleur contrastée, ou `markPoint` pour attirer l'œil sur le point important
- **Ajouter des repères contextuels** : `markLine` pour moyenne, objectif, ou seuil critique
- **Annotations si nécessaire** : expliquer les anomalies directement sur le graphique

#### Anti-patterns à éviter

- ❌ **Graphique "sapin de Noël"** : trop de couleurs, effets, décorations
- ❌ **Données sans contexte** : des chiffres sans comparaison (vs période précédente, vs objectif, vs moyenne)
- ❌ **Axes trompeurs** : ne pas commencer l'axe Y à une valeur arbitraire sans le signaler
- ❌ **Titre générique** : "Évolution des ventes" → préférer "Ventes T3 2024 : +15 % vs objectif"

### 📖 Dimension pédagogique

Le site a une vocation **éducative**. Chaque graphique doit enseigner quelque chose à l'utilisateur.

#### Le graphique comme support d'apprentissage

- **Illustrer une fonctionnalité ECharts** : le scénario réaliste doit mettre en valeur la fonctionnalité technique démontrée (ex: `markLine`, `visualMap`, `dataZoom`)
- **Montrer les bonnes pratiques** : le graphique doit être un exemple à suivre, pas juste "un graphique qui marche"
- **Varier les domaines métier** : alterner entre finance, e-commerce, santé, RH, industrie, environnement... pour montrer la polyvalence

#### Cohérence scénario / type de graphique

- **Le scénario doit justifier le type de graphique** : un line chart pour une évolution temporelle, un scatter pour une corrélation, un pie pour des proportions
- **Éviter les scénarios artificiels** : si le scénario ne colle pas naturellement au type de graphique, en choisir un autre
- **Expliquer implicitement le "pourquoi"** : l'utilisateur doit comprendre intuitivement pourquoi ce type de graphique est adapté

#### Progressivité et reproductibilité

- **Code lisible et commenté si complexe** : l'utilisateur doit pouvoir comprendre et reproduire
- **Éviter les hacks obscurs** : préférer les solutions idiomatiques ECharts
- **Données réalistes mais simples** : assez de données pour être crédible, pas trop pour rester lisible (5-15 points idéalement)

#### Valeur ajoutée du scénario

Le scénario réaliste doit apporter une **valeur pédagogique supplémentaire** :

| ❌ Scénario pauvre    | ✅ Scénario riche                                                           |
| --------------------- | --------------------------------------------------------------------------- |
| "Données de ventes"   | "Ventes du Black Friday 2024 : pic record à 14h, serveur saturé à 15h"      |
| "Température"         | "Canicule août 2024 : 5 jours consécutifs > 35°C, alerte rouge déclenchée"  |
| "Utilisateurs actifs" | "Lancement produit : +340 % d'inscriptions J+1, rétention à surveiller J+7" |

Le scénario riche enseigne :

- Comment contextualiser les données
- Comment identifier et mettre en avant les insights
- Comment transformer des chiffres en histoire actionnable

## Critères de succès

- La page revisitée doit présenter un scénario réaliste
- La prop `notes` est ajoutée au composant `ChartEditor` avec une note pédagogique complète
- Tous les critères de qualité obligatoires sont respectés
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
    subtext: "🚨 Chute de 38 % le vendredi : incident serveur détecté",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    confine: true,
    formatter: (params: unknown) => {
      const p = (params as { name: string; value: number }[])[0];
      return `${p.name}<br/>Visiteurs uniques : <b>${p.value.toLocaleString("fr-FR")}</b>`;
    },
  },
  grid: {
    left: 80,
    right: 40,
    bottom: 60,
  },
  xAxis: {
    type: "category",
    name: "Jour",
    nameLocation: "middle",
    nameGap: 35,
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
      formatter: (value: number) =>
        `${(value / 1000).toLocaleString("fr-FR")} k`,
    },
  },
  series: [
    {
      name: "Visiteurs",
      data: [
        { value: 15000, symbol: "circle" },
        { value: 23000, symbol: "circle" },
        { value: 22400, symbol: "circle" },
        { value: 21800, symbol: "circle" },
        {
          value: 13500,
          symbol: "triangle",
          symbolSize: 12,
          itemStyle: { color: "#e74c3c" },
          label: { show: true, formatter: "⚠️ -38 %", position: "top" },
        },
        { value: 14700, symbol: "circle" },
        { value: 26000, symbol: "circle" },
      ],
      type: "line",
      symbolSize: 8,
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

**Ce qui respecte les critères de qualité :**

- **Accessibilité** : le point d'alerte utilise un symbole différent (`triangle`) en plus de la couleur rouge
- **Format français** : nombres formatés avec `toLocaleString("fr-FR")`, espace avant `%`
- **Responsive** : `grid` avec marges explicites, `tooltip.confine: true`
- **Dark/Light** : seule la couleur d'alerte rouge est hardcodée (sens métier), le reste utilise le thème

**Ce qui rend la note pédagogique utile :**

- **Prop `notes`** : la note est passée au composant `ChartEditor` et s'affiche dans l'onglet "Notes"
- **Structure claire** : titres, sous-titres, bullet points pour une lecture rapide
- **Cas d'usage** : explique quand utiliser et quand éviter ce type de graphique
- **Exemples concrets** : aide à transposer dans son propre contexte
- **Erreurs à éviter** : prévient les mauvaises pratiques
