import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données brutes des patients
const rawData = [
  // [id, nom, âge, groupe_sanguin, tension_systolique, glycémie]
  [1, "Martin Dupont", 45, "A+", 135, 1.05],
  [2, "Sophie Bernard", 32, "O+", 118, 0.92],
  [3, "Jean Petit", 58, "B+", 152, 1.28],
  [4, "Marie Lambert", 41, "A+", 128, 0.98],
  [5, "Pierre Moreau", 67, "AB+", 145, 1.35],
  [6, "Julie Dubois", 29, "O-", 112, 0.88],
  [7, "François Leroy", 53, "A+", 141, 1.12],
  [8, "Claire Martin", 38, "B-", 125, 0.95],
  [9, "Michel Thomas", 71, "O+", 158, 1.42],
  [10, "Isabelle Roux", 44, "A-", 131, 1.01],
  [11, "Alain Garcia", 62, "AB-", 148, 1.25],
  [12, "Nathalie Simon", 35, "O+", 115, 0.91],
  [13, "Philippe Laurent", 49, "A+", 138, 1.08],
  [14, "Catherine Faure", 56, "B+", 143, 1.18],
  [15, "Olivier Morel", 73, "O-", 165, 1.55],
];

const option: EChartsOption = {
  title: {
    text: "Analyse des patients par groupe sanguin",
    subtext:
      "Relation entre tension artérielle et glycémie - Filtrage interactif",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#666",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: function (params: unknown) {
      const p = params as { data: (string | number)[] };
      const data = p.data;
      return `<b>${data[1]}</b><br/>
              Âge: ${data[2]} ans<br/>
              Groupe: <b>${data[3]}</b><br/>
              Tension: ${data[4]} mmHg<br/>
              Glycémie: ${data[5]} g/L`;
    },
  },
  legend: {
    data: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    top: 55,
    itemGap: 20,
    textStyle: {
      fontSize: 11,
    },
    selectedMode: "multiple",
  },
  grid: {
    left: "10%",
    right: "10%",
    bottom: "15%",
    top: "22%",
  },
  xAxis: {
    type: "value",
    name: "Tension systolique (mmHg)",
    nameLocation: "middle",
    nameGap: 35,
    min: 100,
    max: 180,
    axisLine: {
      lineStyle: {
        color: "#666",
      },
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#eee",
      },
    },
  },
  yAxis: {
    type: "value",
    name: "Glycémie (g/L)",
    nameLocation: "middle",
    nameGap: 45,
    min: 0.8,
    max: 1.7,
    axisLine: {
      lineStyle: {
        color: "#666",
      },
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#eee",
      },
    },
  },
  dataset: [
    {
      source: rawData,
    },
    // Datasets filtrés par groupe sanguin
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "A+" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "A-" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "B+" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "B-" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "O+" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "O-" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "AB+" },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: 3, value: "AB-" },
      },
    },
  ],
  series: [
    {
      name: "A+",
      type: "scatter",
      datasetIndex: 1,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#e74c3c" },
    },
    {
      name: "A-",
      type: "scatter",
      datasetIndex: 2,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#c0392b" },
    },
    {
      name: "B+",
      type: "scatter",
      datasetIndex: 3,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#3498db" },
    },
    {
      name: "B-",
      type: "scatter",
      datasetIndex: 4,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#2980b9" },
    },
    {
      name: "O+",
      type: "scatter",
      datasetIndex: 5,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#27ae60" },
    },
    {
      name: "O-",
      type: "scatter",
      datasetIndex: 6,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#1e8449" },
    },
    {
      name: "AB+",
      type: "scatter",
      datasetIndex: 7,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#9b59b6" },
    },
    {
      name: "AB-",
      type: "scatter",
      datasetIndex: 8,
      encode: { x: 4, y: 5, tooltip: [1, 2, 3, 4, 5] },
      symbolSize: 15,
      itemStyle: { color: "#8e44ad" },
    },
  ],
  graphic: [
    {
      type: "text",
      right: 20,
      bottom: 10,
      style: {
        text: "💡 Cliquez sur la légende pour filtrer par groupe sanguin.\ndata transform filter : filtre les données côté client.",
        fontSize: 11,
        fill: "#666",
        backgroundColor: "#f5f5f5",
        padding: [6, 10],
        borderRadius: 4,
      },
    },
    {
      type: "rect",
      left: "10%",
      top: "22%",
      shape: {
        width: 120,
        height: 35,
      },
      style: {
        fill: "#fff3cd",
        stroke: "#ffc107",
        lineWidth: 1,
      },
    },
    {
      type: "text",
      left: "11%",
      top: "23%",
      style: {
        text: "⚠️ Zone à risque\nTension > 140 & Glycémie > 1.2",
        fontSize: 9,
        fill: "#856404",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Data Transform Filter

### ✅ Quand utiliser ce type de transformation

Le \`data transform filter\` est idéal pour :

- **Filtrer des données par catégorie** : afficher/masquer des sous-ensembles
- **Créer des vues multiples** : même dataset, différents filtres
- **Analyse exploratoire** : permettre à l'utilisateur de zoomer sur certaines catégories
- **Données médicales** : segmenter par groupe sanguin, pathologie, service
- **Segmentation client** : filtrer par tranche d'âge, région, statut

**Caractéristiques techniques :**
- \`dataset.transform.type: "filter"\` : filtre les lignes selon une condition
- \`config.dimension\` : index de la colonne à filtrer
- \`config.value\` : valeur exacte à conserver
- Supporte aussi \`config.reg\` pour des regex

### ❌ Quand ne pas utiliser cette technique

Évitez data transform filter :

- **Gros volumes de données** : préférez un filtrage côté serveur
- **Filtres complexes** : combinez avec JavaScript plutôt que du transform
- **Temps réel** : le transform est recalculé à chaque render

### 📊 Analyse de ce graphique

Ce graphique visualise les données de 15 patients :

- **Axe X** : Tension systolique (mmHg) - normale < 140 mmHg
- **Axe Y** : Glycémie (g/L) - normale entre 0.7 et 1.1 g/L
- **Couleurs** : 8 groupes sanguins (A±, B±, O±, AB±)

**Observations cliniques :**
- Les patients **O+** (vert) ont généralement une bonne tension
- Les patients **O-** âgés (Michel Thomas, 73 ans) présentent des valeurs élevées
- La zone jaune identifie les patients à risque cardiovasculaire

**Fonctionnement du filtrage :**
1. Le dataset source contient toutes les données brutes
2. Chaque groupe sanguin a son propre dataset filtré
3. La légende permet d'activer/désactiver chaque groupe
4. Les séries utilisent \`datasetIndex\` pour pointer vers le bon filtre

**Applications médicales :**
- Dépistage de patients à risque
- Études de cohorte par groupe sanguin
- Suivi longitudinal de marqueurs biologiques
`;

export default function DataTransformFilter() {
  return (
    <ChartEditor
      title="Data Transform Filter"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
