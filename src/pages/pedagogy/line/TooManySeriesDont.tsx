import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Ventes mensuelles par catégorie de produits - 2024
// Données réalistes d'un e-commerce français
const mois = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

// Trop de séries (12 catégories) rend le graphique illisible
const categories = [
  {
    name: "Électronique",
    data: [125, 118, 132, 145, 138, 152, 148, 135, 162, 175, 210, 245],
  },
  {
    name: "Mode Homme",
    data: [82, 78, 95, 88, 92, 85, 72, 68, 98, 105, 135, 142],
  },
  {
    name: "Mode Femme",
    data: [95, 88, 112, 105, 118, 108, 92, 85, 125, 138, 168, 175],
  },
  {
    name: "Maison & Déco",
    data: [68, 62, 75, 82, 78, 72, 65, 58, 85, 92, 115, 125],
  },
  {
    name: "Sport",
    data: [45, 52, 68, 75, 85, 92, 88, 82, 72, 65, 78, 85],
  },
  {
    name: "Beauté",
    data: [58, 55, 62, 68, 72, 75, 78, 72, 82, 88, 105, 118],
  },
  {
    name: "Jouets",
    data: [32, 28, 25, 22, 18, 15, 12, 15, 28, 45, 125, 185],
  },
  {
    name: "Livres",
    data: [42, 45, 48, 42, 38, 35, 32, 38, 52, 58, 72, 82],
  },
  {
    name: "Jardin",
    data: [18, 22, 45, 68, 85, 92, 78, 65, 48, 32, 22, 15],
  },
  {
    name: "Bricolage",
    data: [28, 32, 48, 55, 62, 68, 58, 52, 45, 42, 38, 35],
  },
  {
    name: "Alimentation",
    data: [88, 85, 92, 95, 98, 102, 105, 108, 98, 102, 115, 125],
  },
  {
    name: "Animalerie",
    data: [35, 38, 42, 45, 48, 52, 55, 52, 58, 62, 68, 72],
  },
];

// Couleurs difficiles à distinguer
const colors = [
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#6366f1",
  "#84cc16",
  "#06b6d4",
  "#a855f7",
];

const option: EChartsOption = {
  title: {
    text: "Ventes mensuelles par catégorie - BonMarché.fr 2024",
    subtext: "⚠️ 12 séries : impossible de distinguer les tendances !",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#dc2626",
    },
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: categories.map((c) => c.name),
    bottom: 0,
    type: "scroll",
    textStyle: {
      fontSize: 10,
    },
  },
  grid: {
    left: 60,
    right: 30,
    bottom: 80,
    top: 80,
  },
  xAxis: {
    type: "category",
    data: mois,
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    name: "Ventes (k€)",
    nameLocation: "middle",
    nameGap: 45,
    axisLabel: {
      formatter: "{value}",
    },
  },
  color: colors,
  series: categories.map((cat) => ({
    name: cat.name,
    type: "line" as const,
    data: cat.data,
    smooth: true,
    lineStyle: {
      width: 2,
    },
    symbol: "circle",
    symbolSize: 4,
  })),
};

const notes = `
## 📚 Note pédagogique : Trop de séries sur un graphique

### ❌ Pourquoi c'est une mauvaise pratique

Ce graphique avec **12 séries simultanées** présente plusieurs problèmes majeurs :

**Problèmes visuels :**
- Les lignes se **croisent et se chevauchent** constamment
- Impossible de **suivre une tendance** particulière
- Les couleurs deviennent **difficiles à distinguer** (surtout pour les daltoniens)
- La légende prend trop de place et reste difficilement mémorisable

**Problèmes cognitifs :**
- **Surcharge informationnelle** : le cerveau ne peut pas traiter 12 séries à la fois
- Aucun **message clair** ne ressort du graphique
- Le lecteur ne sait pas **où regarder**

**Règle des 4-5 séries maximum :**
- Au-delà de 5 séries, un graphique linéaire devient illisible
- Si vous avez plus de données, envisagez d'autres visualisations

### 🔧 Solutions alternatives

1. **Small multiples** : un petit graphique par catégorie
2. **Regroupement** : fusionner les catégories similaires
3. **Focus** : ne montrer que les 3-4 catégories les plus importantes
4. **Interaction** : permettre de sélectionner les séries à afficher
5. **Heatmap** : pour voir toutes les valeurs sans superposition

### 📊 Solution

Voir la version "Do" avec un regroupement intelligent des catégories.
`;

export default function TooManySeriesDont() {
  return (
    <ChartEditor
      title="❌ Trop de séries (mauvaise pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
