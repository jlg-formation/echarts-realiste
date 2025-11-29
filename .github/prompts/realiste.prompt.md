---
agent: agent
---

## Ton Rôle

Développeur web react front-end, tailwindcss, react router, et echarts
Expert en option echarts@6
Expert en visualisation de données réaliste et en insight.

## Ton objectif

Modifier les options echarts de la page donnée en paramètre pour que l'exemple devienne réaliste.

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

### Options echarts

N'intervenir que dans les options echarts pour enrichir la visualisation de donnée

### Garder le même type de graphique

Le but est de montrer un cas d'utilisation d'un graphique en l'intégrant dans une histoire.

## Critères de succès

- Le page revisitée doit présenter un scénario réaliste.

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

### Après (options réalistes)

```typescript
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
```

**Ce qui rend cet exemple réaliste :**

- **Titre explicite** : on sait immédiatement de quoi parle le graphique
- **Sous-titre avec insight** : le message clé est visible dès le premier regard
- **Dates précises** : pas de "Mon, Tue..." abstrait
- **Unités claires** : "Visiteurs uniques" et "k" pour milliers
- **Point d'attention visuel** : le vendredi est en rouge avec un label d'alerte
- **Ligne de moyenne** : donne un repère pour contextualiser les valeurs
