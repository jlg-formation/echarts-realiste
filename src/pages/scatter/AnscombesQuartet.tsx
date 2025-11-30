import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Le Quartet d'Anscombe : 4 datasets avec MÊMES statistiques descriptives
// mais distributions TRÈS différentes
// Ici contextualisé pour un cours de statistiques appliquées à la gestion

// Dataset I : Relation linéaire classique (Ventes vs Budget pub)
const datasetI = [
  [10, 8.04],
  [8, 6.95],
  [13, 7.58],
  [9, 8.81],
  [11, 8.33],
  [14, 9.96],
  [6, 7.24],
  [4, 4.26],
  [12, 10.84],
  [7, 4.82],
  [5, 5.68],
];

// Dataset II : Relation parabolique (Rendement vs Engrais)
const datasetII = [
  [10, 9.14],
  [8, 8.14],
  [13, 8.74],
  [9, 8.77],
  [11, 9.26],
  [14, 8.1],
  [6, 6.13],
  [4, 3.1],
  [12, 9.13],
  [7, 7.26],
  [5, 4.74],
];

// Dataset III : Linéaire parfait avec outlier (Notes vs Présence + 1 tricheur)
const datasetIII = [
  [10, 7.46],
  [8, 6.77],
  [13, 12.74], // Outlier : tricheur avec notes gonflées
  [9, 7.11],
  [11, 7.81],
  [14, 8.84],
  [6, 6.08],
  [4, 5.39],
  [12, 8.15],
  [7, 6.42],
  [5, 5.73],
];

// Dataset IV : X constant sauf 1 point (Erreur de saisie typique)
const datasetIV = [
  [8, 6.58],
  [8, 5.76],
  [8, 7.71],
  [8, 8.84],
  [8, 8.47],
  [8, 7.04],
  [8, 5.25],
  [19, 12.5], // Outlier : erreur de saisie
  [8, 5.56],
  [8, 7.91],
  [8, 6.89],
];

// Calculs statistiques identiques pour les 4 datasets
// Moyenne X = 9, Moyenne Y ≈ 7.50, Variance X = 11, Régression Y = 3 + 0.5X, R² = 0.67
const stats = {
  moyX: 9,
  moyY: 7.5,
  varX: 11,
  corr: 0.816,
  r2: 0.67,
  slope: 0.5,
  intercept: 3,
};

const createSeriesData = (
  dataset: number[][],
  color: string,
  title: string,
  subtitle: string
) => ({
  title,
  subtitle,
  color,
  data: dataset,
  regression: [
    [4, stats.intercept + stats.slope * 4],
    [14, stats.intercept + stats.slope * 14],
  ],
});

const datasets = [
  createSeriesData(
    datasetI,
    "#3b82f6",
    "I - Relation linéaire",
    "Ventes (M€) vs Budget pub (k€)"
  ),
  createSeriesData(
    datasetII,
    "#22c55e",
    "II - Relation curviligne",
    "Rendement (t/ha) vs Engrais (kg)"
  ),
  createSeriesData(
    datasetIII,
    "#f59e0b",
    "III - Outlier influent",
    "Notes vs Assiduité + 1 tricheur"
  ),
  createSeriesData(
    datasetIV,
    "#ef4444",
    "IV - X quasi-constant",
    "Erreur de saisie typique"
  ),
];

const option: EChartsOption = {
  title: {
    text: "Le Quartet d'Anscombe : pourquoi visualiser est essentiel",
    subtext: `4 jeux de données · Statistiques IDENTIQUES (x̄=9, ȳ=7,5, R²=0,67) · Distributions TRÈS différentes`,
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
    },
  },
  tooltip: {
    trigger: "item",
    confine: true,
    formatter: (params: unknown) => {
      const p = params as {
        data: number[];
        seriesName: string;
        seriesIndex: number;
      };
      if (p.seriesName.includes("Régression")) return "";
      const x = p.data[0];
      const y = p.data[1];
      const predicted = stats.intercept + stats.slope * x;
      const residual = y - predicted;
      const isOutlier = Math.abs(residual) > 2;
      return `
        <b>${p.seriesName}</b><br/><br/>
        X : <b>${x}</b><br/>
        Y : <b>${y.toFixed(2)}</b><br/>
        Y prédit : <b>${predicted.toFixed(2)}</b><br/>
        Résidu : <b style="color: ${isOutlier ? "#ef4444" : "#22c55e"}">${residual > 0 ? "+" : ""}${residual.toFixed(2)}</b>
        ${isOutlier ? "<br/><span style='color: #ef4444'>⚠️ Outlier détecté</span>" : ""}
      `;
    },
  },
  grid: [
    { left: "7%", right: "53%", top: 80, height: "35%" },
    { left: "57%", right: "3%", top: 80, height: "35%" },
    { left: "7%", right: "53%", top: "58%", height: "35%" },
    { left: "57%", right: "3%", top: "58%", height: "35%" },
  ],
  xAxis: datasets.map((_, i) => ({
    type: "value" as const,
    gridIndex: i,
    min: 2,
    max: 20,
    name: "X",
    nameLocation: "middle" as const,
    nameGap: 25,
    axisLabel: {
      fontSize: 10,
    },
  })),
  yAxis: datasets.map((_, i) => ({
    type: "value" as const,
    gridIndex: i,
    min: 2,
    max: 14,
    name: "Y",
    axisLabel: {
      fontSize: 10,
    },
  })),
  series: datasets.flatMap((ds, i) => [
    // Points
    {
      name: ds.title,
      type: "scatter" as const,
      xAxisIndex: i,
      yAxisIndex: i,
      data: ds.data,
      symbolSize: 10,
      itemStyle: {
        color: ds.color,
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
    // Ligne de régression (identique pour tous)
    {
      name: `Régression ${i + 1}`,
      type: "line" as const,
      xAxisIndex: i,
      yAxisIndex: i,
      data: ds.regression,
      symbol: "none",
      lineStyle: {
        color: ds.color,
        width: 2,
        type: "dashed" as const,
        opacity: 0.6,
      },
      emphasis: {
        disabled: true,
      },
    },
  ]),
  graphic: datasets.map((ds, i) => ({
    type: "text" as const,
    left: i % 2 === 0 ? "7%" : "57%",
    top: i < 2 ? 60 : "56%",
    style: {
      text: `${ds.title}\n${ds.subtitle}`,
      fontSize: 11,
      fontWeight: "bold" as const,
      fill: ds.color,
    },
  })),
};

const notes = `
## 📚 Note pédagogique : Le Quartet d'Anscombe

### 🎯 Pourquoi ce graphique est légendaire

Le **Quartet d'Anscombe** (1973) est un exemple classique en statistiques montrant 4 jeux de données avec des statistiques descriptives **strictement identiques** :

| Statistique | Valeur |
|-------------|--------|
| Moyenne de X | 9 |
| Moyenne de Y | 7,50 |
| Variance de X | 11 |
| Variance de Y | 4,13 |
| Corrélation | 0,816 |
| Régression | Y = 3 + 0,5X |
| R² | 0,67 |

**Pourtant, les 4 graphiques sont radicalement différents !**

### ✅ Ce que ce graphique nous enseigne

**1. Toujours visualiser avant d'analyser**
Les statistiques descriptives seules peuvent être trompeuses. Un R² de 0,67 peut masquer :
- Une relation parfaitement linéaire (Dataset I)
- Une relation curviligne (Dataset II)
- Un outlier influent (Dataset III)
- Une structure aberrante (Dataset IV)

**2. Importance de l'analyse exploratoire**
Avant tout modèle, faire :
- Scatter plot des variables
- Histogrammes des distributions
- Boxplots pour détecter les outliers
- QQ-plot pour vérifier la normalité

**3. Méfiance envers les "metrics" automatiques**
Excel, R, Python... calculent aveuglément. C'est à l'analyste de vérifier la pertinence.

### 📊 Analyse de chaque dataset

**Dataset I - Relation linéaire ✅**
- Le cas idéal pour une régression linéaire
- Résidus aléatoires, pas de pattern
- Le R² = 0,67 est significatif et fiable

**Dataset II - Relation curviligne ⚠️**
- Une courbe en cloche, pas une droite
- La régression linéaire est inappropriée
- Il faudrait un modèle polynomial ou logarithmique

**Dataset III - Outlier influent 🚨**
- 10 points parfaitement alignés + 1 outlier
- L'outlier tire la droite vers lui
- Sans lui : R² ≈ 1 (parfaitement linéaire)

**Dataset IV - X quasi-constant ❌**
- Tous les X = 8 sauf un point à X = 19
- La "corrélation" n'a aucun sens
- Un seul point définit toute la pente

### ❌ Erreurs classiques à éviter

- **Se fier aveuglément au R²** : il peut masquer des problèmes
- **Ignorer les outliers** : un seul point peut changer tout le modèle
- **Appliquer un modèle linéaire par défaut** : tester d'autres formes
- **Ne pas vérifier les hypothèses** : normalité, homoscédasticité
- **Automatiser sans visualiser** : les outils ne détectent pas tout

### 🔧 Fonctionnalités ECharts utilisées

- **Multi-grid layout** : 4 graphiques dans un seul canvas
- **xAxisIndex/yAxisIndex** : associer chaque série à sa grille
- **graphic** : texte personnalisé pour les titres
- **Regression line** : droite y = 3 + 0,5x pour tous

### 💡 Extension moderne : le "Datasaurus Dozen"

En 2017, Alberto Cairo a créé le **Datasaurus Dozen** : 12 datasets avec les mêmes statistiques que le Quartet d'Anscombe, dont un qui forme... un dinosaure ! 🦕

**Message clé** : les données peuvent raconter n'importe quelle histoire si on ne regarde que les chiffres.

### 🎓 Applications pédagogiques

Ce graphique est parfait pour enseigner :
- L'importance de la visualisation en data science
- Les limites des statistiques descriptives
- La détection d'outliers et leur impact
- Le choix du bon modèle de régression
- L'analyse exploratoire avant modélisation

### 📖 Référence

> Anscombe, F. J. (1973). "Graphs in Statistical Analysis". *American Statistician*. 27 (1): 17–21.
`;

export default function AnscombesQuartet() {
  return (
    <ChartEditor
      title="Anscombe's Quartet"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
