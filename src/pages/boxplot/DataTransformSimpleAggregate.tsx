import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Distribution des salaires par département
// Contexte : Analyse RH des rémunérations dans une entreprise tech

// Génération de données de salaires réalistes par département
const generateSalaryData = () => {
  const departements = [
    { nom: "Direction", min: 85000, max: 180000, count: 8 },
    { nom: "Tech - Backend", min: 42000, max: 95000, count: 35 },
    { nom: "Tech - Frontend", min: 40000, max: 88000, count: 28 },
    { nom: "Tech - Data", min: 48000, max: 105000, count: 18 },
    { nom: "Tech - DevOps", min: 50000, max: 98000, count: 12 },
    { nom: "Produit", min: 45000, max: 92000, count: 15 },
    { nom: "Design", min: 38000, max: 75000, count: 10 },
    { nom: "Marketing", min: 35000, max: 72000, count: 14 },
    { nom: "Commercial", min: 32000, max: 85000, count: 22 },
    { nom: "RH", min: 36000, max: 68000, count: 8 },
    { nom: "Finance", min: 42000, max: 88000, count: 10 },
    { nom: "Support", min: 28000, max: 48000, count: 16 },
  ];

  const data: Array<{
    departement: string;
    salaire: number;
    experience: string;
    annee: number;
  }> = [];

  departements.forEach((dept) => {
    for (let i = 0; i < dept.count; i++) {
      // Distribution normale simulée (box-muller simplifié)
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      // Centré au milieu de la fourchette avec écart-type proportionnel
      const mean = (dept.min + dept.max) / 2;
      const std = (dept.max - dept.min) / 4;
      let salaire = Math.round(mean + z * std);

      // Borner aux limites
      salaire = Math.max(dept.min, Math.min(dept.max, salaire));

      // Déterminer l'expérience basée sur le salaire
      const ratio = (salaire - dept.min) / (dept.max - dept.min);
      let experience: string;
      if (ratio < 0.25) experience = "Junior";
      else if (ratio < 0.5) experience = "Confirmé";
      else if (ratio < 0.75) experience = "Senior";
      else experience = "Expert";

      // Année aléatoire (2020-2024)
      const annee = 2020 + Math.floor(Math.random() * 5);

      data.push({
        departement: dept.nom,
        salaire,
        experience,
        annee,
      });
    }
  });

  return data;
};

const salaryData = generateSalaryData();

// Calcul des statistiques boxplot manuellement (sans ecSimpleTransform)
const calculateBoxplotStats = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  const min = sorted[0];
  const max = sorted[n - 1];
  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  const q1Index = Math.floor(n / 4);
  const q3Index = Math.floor((3 * n) / 4);
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];

  return { min, q1, median, q3, max };
};

// Grouper par département et calculer les stats
const boxplotByDept = () => {
  const grouped: Record<string, number[]> = {};

  salaryData.forEach((row) => {
    if (!grouped[row.departement]) {
      grouped[row.departement] = [];
    }
    grouped[row.departement].push(row.salaire);
  });

  const stats = Object.entries(grouped)
    .map(([dept, salaires]) => ({
      departement: dept,
      count: salaires.length,
      ...calculateBoxplotStats(salaires),
    }))
    .sort((a, b) => a.median - b.median);

  return stats;
};

const boxplotStats = boxplotByDept();

// Données pour le scatter (points individuels)
const scatterData = salaryData.map((row) => [
  row.salaire,
  row.departement,
  row.experience,
  row.annee,
]);

// Ordre des départements pour l'axe Y
const departementOrder = boxplotStats.map((s) => s.departement);

// Couleur par niveau d'expérience
const experienceColors: Record<string, string> = {
  Junior: "#22c55e",
  Confirmé: "#3b82f6",
  Senior: "#f59e0b",
  Expert: "#ef4444",
};

const option: EChartsOption = {
  title: {
    text: "💰 Distribution des Salaires par Département",
    subtext: `Entreprise TechCorp · ${salaryData.length} employés · Données 2020-2024`,
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#6b7280",
    },
  },
  tooltip: {
    trigger: "item",
    confine: true,
    formatter: (params: unknown) => {
      const p = params as {
        seriesName: string;
        name: string;
        value: number[];
        data: number[];
        componentType: string;
        seriesType: string;
      };

      if (p.seriesType === "boxplot") {
        const dept = p.name;
        const stats = boxplotStats.find((s) => s.departement === dept);
        if (!stats) return "";

        return `
          <div style="min-width: 200px;">
            <b style="font-size: 14px;">📊 ${dept}</b>
            <br/><span style="color: #6b7280;">${stats.count} employés</span>
            <hr style="margin: 8px 0;"/>
            <table style="width: 100%;">
              <tr><td>Maximum</td><td style="text-align: right;"><b>${stats.max.toLocaleString("fr-FR")} €</b></td></tr>
              <tr><td>Q3 (75%)</td><td style="text-align: right;">${stats.q3.toLocaleString("fr-FR")} €</td></tr>
              <tr><td style="color: #3b82f6;">Médiane</td><td style="text-align: right; color: #3b82f6;"><b>${stats.median.toLocaleString("fr-FR")} €</b></td></tr>
              <tr><td>Q1 (25%)</td><td style="text-align: right;">${stats.q1.toLocaleString("fr-FR")} €</td></tr>
              <tr><td>Minimum</td><td style="text-align: right;"><b>${stats.min.toLocaleString("fr-FR")} €</b></td></tr>
            </table>
            <hr style="margin: 8px 0;"/>
            <span style="font-size: 11px; color: #9ca3af;">Écart interquartile: ${(stats.q3 - stats.q1).toLocaleString("fr-FR")} €</span>
          </div>
        `;
      }

      // Scatter point
      if (p.seriesType === "scatter") {
        const [salaire, , experience, annee] = p.data;
        return `
          <b>${experience}</b><br/>
          Salaire: <b>${salaire.toLocaleString("fr-FR")} €</b><br/>
          Année: ${annee}
        `;
      }

      return "";
    },
  },
  legend: {
    data: ["Boxplot", "Junior", "Confirmé", "Senior", "Expert"],
    top: 50,
    left: "center",
    selected: {
      Boxplot: true,
      Junior: true,
      Confirmé: true,
      Senior: true,
      Expert: true,
    },
  },
  grid: {
    left: "15%",
    right: "10%",
    top: 100,
    bottom: 80,
  },
  xAxis: {
    name: "Salaire annuel brut (€)",
    nameLocation: "middle",
    nameGap: 35,
    type: "value",
    min: 25000,
    max: 200000,
    axisLabel: {
      formatter: (value: number) => `${(value / 1000).toFixed(0)}K`,
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#e5e7eb",
      },
    },
  },
  yAxis: {
    type: "category",
    data: departementOrder,
    axisLabel: {
      fontSize: 11,
    },
  },
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: 0,
    },
    {
      type: "slider",
      xAxisIndex: 0,
      height: 20,
      bottom: 30,
      showDetail: true,
      labelFormatter: (value: number) => `${(value / 1000).toFixed(0)}K €`,
    },
  ],
  series: [
    // Boxplot
    {
      name: "Boxplot",
      type: "boxplot",
      data: boxplotStats.map((s) => ({
        name: s.departement,
        value: [s.min, s.q1, s.median, s.q3, s.max],
      })),
      itemStyle: {
        color: "#dbeafe",
        borderColor: "#3b82f6",
        borderWidth: 2,
      },
      emphasis: {
        itemStyle: {
          borderColor: "#1d4ed8",
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: "rgba(59, 130, 246, 0.3)",
        },
      },
    },
    // Scatter points par niveau d'expérience
    ...Object.entries(experienceColors).map(([exp, color]) => ({
      name: exp,
      type: "scatter" as const,
      data: scatterData.filter((d) => d[2] === exp),
      symbolSize: 8,
      itemStyle: {
        color: color,
        opacity: 0.7,
      },
      emphasis: {
        itemStyle: {
          opacity: 1,
          shadowBlur: 5,
          shadowColor: color,
        },
      },
      encode: {
        x: 0,
        y: 1,
      },
    })),
  ],
};

// Calcul des statistiques globales
const allSalaries = salaryData.map((d) => d.salaire);
const globalStats = calculateBoxplotStats(allSalaries);
const avgSalary = Math.round(
  allSalaries.reduce((a, b) => a + b, 0) / allSalaries.length
);

const notes = `
## 📚 Note pédagogique : Boxplot avec agrégation de données

### ✅ Quand utiliser ce type de diagramme

Le **boxplot** (boîte à moustaches) est idéal pour :

- **Visualiser la distribution** d'une variable numérique
- **Comparer des distributions** entre groupes/catégories
- **Identifier les valeurs aberrantes** (outliers)
- **Résumer les statistiques** : médiane, quartiles, étendue

**Caractéristiques clés :**
- Boîte = 50% central des données (Q1 à Q3)
- Ligne centrale = médiane
- Moustaches = étendue (min/max ou 1.5×IQR)
- Points = outliers potentiels

### ❌ Quand ne pas utiliser

- **Données catégorielles** : pas de distribution à analyser
- **Faible échantillon** (< 5 points) : statistiques peu fiables
- **Public non averti** : interprétation moins intuitive qu'un bar chart
- **Focus sur la moyenne** : le boxplot montre la médiane

### 📊 Analyse de ce graphique

**Distribution des salaires - TechCorp (${salaryData.length} employés)**

| Statistique | Valeur |
|-------------|--------|
| Salaire minimum | ${globalStats.min.toLocaleString("fr-FR")} € |
| Premier quartile (Q1) | ${globalStats.q1.toLocaleString("fr-FR")} € |
| **Médiane** | **${globalStats.median.toLocaleString("fr-FR")} €** |
| Troisième quartile (Q3) | ${globalStats.q3.toLocaleString("fr-FR")} € |
| Salaire maximum | ${globalStats.max.toLocaleString("fr-FR")} € |
| **Moyenne** | **${avgSalary.toLocaleString("fr-FR")} €** |

**Par département (triés par médiane croissante) :**

| Département | Effectif | Médiane | Écart Q1-Q3 |
|-------------|----------|---------|-------------|
${boxplotStats.map((s) => `| ${s.departement} | ${s.count} | ${s.median.toLocaleString("fr-FR")} € | ${(s.q3 - s.q1).toLocaleString("fr-FR")} € |`).join("\n")}

### 🔧 Configuration Boxplot ECharts

**Structure des données boxplot :**
\`\`\`javascript
series: [{
  type: 'boxplot',
  data: [
    {
      name: 'Département',
      value: [min, Q1, médiane, Q3, max]
    }
  ]
}]
\`\`\`

**Avec Data Transform (agrégation automatique) :**
\`\`\`javascript
// Nécessite ecSimpleTransform
echarts.registerTransform(ecSimpleTransform.aggregate);

dataset: [
  { id: 'raw', source: rawData },
  {
    id: 'aggregated',
    fromDatasetId: 'raw',
    transform: {
      type: 'ecSimpleTransform:aggregate',
      config: {
        resultDimensions: [
          { name: 'min', from: 'Salaire', method: 'min' },
          { name: 'Q1', from: 'Salaire', method: 'Q1' },
          { name: 'median', from: 'Salaire', method: 'median' },
          { name: 'Q3', from: 'Salaire', method: 'Q3' },
          { name: 'max', from: 'Salaire', method: 'max' },
          { name: 'Département', from: 'Département' }
        ],
        groupBy: 'Département'
      }
    }
  }
]
\`\`\`

**Superposer scatter et boxplot :**
\`\`\`javascript
series: [
  {
    type: 'boxplot',
    data: boxplotStats
  },
  {
    type: 'scatter',
    data: individualPoints,
    symbolSize: 6
  }
]
\`\`\`

### 🎨 Bonnes pratiques de design

**1. Orientation**
\`\`\`
Horizontal (comme ici) :
- Idéal pour comparer beaucoup de catégories
- Labels lisibles
- Valeurs numériques sur X

Vertical :
- Idéal pour séries temporelles
- Convient pour peu de catégories
\`\`\`

**2. Ordre des catégories**
\`\`\`javascript
// Trier par médiane croissante
.sort((a, b) => a.median - b.median)

// Ou par effectif
.sort((a, b) => b.count - a.count)
\`\`\`

**3. Points individuels**
\`\`\`
- Transparence pour éviter la surcharge
- Jittering vertical si beaucoup de points
- Couleur par dimension supplémentaire (expérience)
\`\`\`

### 📐 Interprétation des statistiques

**Quartiles et IQR :**
\`\`\`
Q1 (25e percentile) : 25% gagnent moins
Q2/Médiane (50e) : 50% gagnent moins
Q3 (75e percentile) : 75% gagnent moins

IQR = Q3 - Q1 (écart interquartile)
- IQR faible = distribution serrée
- IQR élevé = grande dispersion
\`\`\`

**Détection d'outliers :**
\`\`\`
Outlier bas : < Q1 - 1.5 × IQR
Outlier haut : > Q3 + 1.5 × IQR
\`\`\`

### 💡 Cas d'usage RH

**1. Équité salariale**
\`\`\`
- Comparer médiane homme/femme
- Identifier les disparités par département
- Suivre l'évolution année après année
\`\`\`

**2. Benchmarking marché**
\`\`\`
- Position de l'entreprise vs marché
- Attractivité des packages
- Zones de sur/sous-rémunération
\`\`\`

**3. Budget prévisionnel**
\`\`\`
- Estimation des augmentations
- Impact des recrutements
- Simulation scénarios
\`\`\`

### ⚠️ Pièges à éviter

**1. Échantillons trop petits**
\`\`\`
❌ Boxplot avec 3 valeurs
✅ Minimum 10-15 valeurs par groupe
\`\`\`

**2. Échelles incompatibles**
\`\`\`
❌ Comparer départements de tailles très différentes
✅ Normaliser ou afficher l'effectif
\`\`\`

**3. Ignorer les outliers**
\`\`\`
❌ Supprimer automatiquement
✅ Investiguer : erreur ou cas réel ?
\`\`\`

### 📋 Données pour ce graphique

\`\`\`javascript
// Structure des données brutes
const salaryData = [
  { departement: "Tech - Backend", salaire: 55000, experience: "Confirmé", annee: 2023 },
  { departement: "Direction", salaire: 150000, experience: "Expert", annee: 2024 },
  // ...
];

// Calcul boxplot manuel
const calculateBoxplotStats = (values) => {
  const sorted = values.sort((a, b) => a - b);
  const n = sorted.length;
  
  return {
    min: sorted[0],
    q1: sorted[Math.floor(n / 4)],
    median: sorted[Math.floor(n / 2)],
    q3: sorted[Math.floor(3 * n / 4)],
    max: sorted[n - 1]
  };
};
\`\`\`
`;

export default function DataTransformSimpleAggregate() {
  return (
    <ChartEditor
      title="Data Transform Simple Aggregate"
      section="Boxplot"
      option={option}
      notes={notes}
    />
  );
}
