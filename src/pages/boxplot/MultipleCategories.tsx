import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Notes d'examens par matière - Lycée
// Contexte : Analyse des résultats du Bac blanc de terminale

// Matières du baccalauréat général
const subjects = [
  { name: "Philosophie", color: "#8b5cf6", category: "Lettres" },
  { name: "Français", color: "#6366f1", category: "Lettres" },
  { name: "Mathématiques", color: "#3b82f6", category: "Sciences" },
  { name: "Physique-Chimie", color: "#0ea5e9", category: "Sciences" },
  { name: "SVT", color: "#14b8a6", category: "Sciences" },
  { name: "Histoire-Géo", color: "#f59e0b", category: "Humanités" },
  { name: "Anglais", color: "#ef4444", category: "Langues" },
  { name: "Espagnol", color: "#ec4899", category: "Langues" },
];

// Génération de données réalistes de notes
const generateGrades = () => {
  const gradesData: number[][] = [];

  // Caractéristiques par matière (moyenne, écart-type, taux de notes extrêmes)
  const subjectProfiles = [
    { mean: 9.5, std: 3.2, lowRate: 0.15 }, // Philosophie - difficile, dispersé
    { mean: 11.2, std: 2.8, lowRate: 0.08 }, // Français - modéré
    { mean: 10.8, std: 4.0, lowRate: 0.12 }, // Mathématiques - très dispersé
    { mean: 11.5, std: 3.0, lowRate: 0.1 }, // Physique-Chimie
    { mean: 12.0, std: 2.5, lowRate: 0.06 }, // SVT - plus homogène
    { mean: 11.8, std: 2.2, lowRate: 0.05 }, // Histoire-Géo - peu dispersé
    { mean: 13.2, std: 2.8, lowRate: 0.04 }, // Anglais - meilleure moyenne
    { mean: 12.5, std: 3.0, lowRate: 0.06 }, // Espagnol
  ];

  subjectProfiles.forEach((profile) => {
    const grades: number[] = [];

    // 35 élèves par classe
    for (let i = 0; i < 35; i++) {
      // Distribution normale avec Box-Muller
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      let grade = profile.mean + z * profile.std;

      // Ajouter quelques notes très basses (élèves en difficulté)
      if (Math.random() < profile.lowRate) {
        grade = 3 + Math.random() * 5; // Entre 3 et 8
      }

      // Ajouter quelques excellents élèves
      if (Math.random() < 0.08) {
        grade = 16 + Math.random() * 4; // Entre 16 et 20
      }

      // Borner entre 0 et 20
      grade = Math.max(0, Math.min(20, grade));
      grades.push(Math.round(grade * 10) / 10); // 1 décimale
    }

    gradesData.push(grades);
  });

  return gradesData;
};

// Calcul des statistiques boxplot avec détection des outliers
const calculateBoxplotStats = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  const q1Index = Math.floor(n * 0.25);
  const q2Index = Math.floor(n * 0.5);
  const q3Index = Math.floor(n * 0.75);

  const q1 = sorted[q1Index];
  const median = sorted[q2Index];
  const q3 = sorted[q3Index];

  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  // Valeurs dans les whiskers
  const normalValues = sorted.filter((v) => v >= lowerFence && v <= upperFence);
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);

  const min = normalValues[0];
  const max = normalValues[normalValues.length - 1];

  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  return {
    min: Math.round(min * 10) / 10,
    q1: Math.round(q1 * 10) / 10,
    median: Math.round(median * 10) / 10,
    q3: Math.round(q3 * 10) / 10,
    max: Math.round(max * 10) / 10,
    mean: Math.round(mean * 10) / 10,
    outliers,
    count: values.length,
  };
};

// Génération des données
const gradesData = generateGrades();

// Calcul des stats pour chaque matière
const subjectStats = subjects.map((subject, idx) => ({
  ...subject,
  stats: calculateBoxplotStats(gradesData[idx]),
}));

// Préparation des données pour ECharts - 3 trimestres
// On simule 3 trimestres avec des variations
const generateTrimestreData = (baseData: number[][], trimestre: number) => {
  return baseData.map((grades) => {
    // Variation légère par trimestre
    const variation = (trimestre - 2) * 0.3; // T1: -0.3, T2: 0, T3: +0.3
    return grades.map((g) =>
      Math.max(0, Math.min(20, g + variation + (Math.random() - 0.5) * 0.5)),
    );
  });
};

const trimestre1Data = generateTrimestreData(gradesData, 1);
const trimestre2Data = generateTrimestreData(gradesData, 2);
const trimestre3Data = generateTrimestreData(gradesData, 3);

// Calcul boxplot pour chaque trimestre
const calculateAllBoxplotData = (data: number[][]) => {
  return data.map((grades) => {
    const stats = calculateBoxplotStats(grades);
    return [stats.min, stats.q1, stats.median, stats.q3, stats.max];
  });
};

const boxplotT1 = calculateAllBoxplotData(trimestre1Data);
const boxplotT2 = calculateAllBoxplotData(trimestre2Data);
const boxplotT3 = calculateAllBoxplotData(trimestre3Data);

// Seuils de mention
const mentionThresholds = {
  passable: 10, // Admis
  assezBien: 12, // Mention Assez Bien
  bien: 14, // Mention Bien
  tresBien: 16, // Mention Très Bien
};

const option: EChartsOption = {
  title: {
    text: "📊 Bac Blanc Terminale S - Analyse des Résultats par Matière",
    subtext:
      "35 élèves · 3 trimestres · Comparaison des distributions de notes",
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
        seriesName: string;
        value: number[];
        dataIndex: number;
        seriesType: string;
        data: number[];
      };

      if (p.seriesType === "boxplot") {
        const [min, q1, median, q3, max] = p.value;
        const subject = subjects[p.dataIndex];
        const trimestre = p.seriesName;

        // Évaluation du niveau
        let niveau = "⚠️ En difficulté";
        let niveauColor = "#ef4444";
        if (median >= mentionThresholds.tresBien) {
          niveau = "🏆 Excellent";
          niveauColor = "#22c55e";
        } else if (median >= mentionThresholds.bien) {
          niveau = "✅ Bon";
          niveauColor = "#22c55e";
        } else if (median >= mentionThresholds.assezBien) {
          niveau = "👍 Satisfaisant";
          niveauColor = "#84cc16";
        } else if (median >= mentionThresholds.passable) {
          niveau = "📝 Passable";
          niveauColor = "#f59e0b";
        }

        return `
          <div style="min-width: 200px;">
            <b style="font-size: 14px;">${subject.name}</b>
            <span style="background: ${subject.color}20; color: ${subject.color}; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 8px;">${subject.category}</span>
            <br/><span style="font-size: 11px; color: #6b7280;">${trimestre}</span>
            <br/><span style="color: ${niveauColor}; font-weight: bold;">${niveau}</span>
            <hr style="margin: 8px 0;"/>
            <table style="width: 100%;">
              <tr><td>Note max</td><td style="text-align: right;">${max.toLocaleString("fr-FR")}/20</td></tr>
              <tr><td>Q3 (75%)</td><td style="text-align: right;">${q3.toLocaleString("fr-FR")}/20</td></tr>
              <tr style="color: #3b82f6; font-weight: bold;"><td>Médiane</td><td style="text-align: right;">${median.toLocaleString("fr-FR")}/20</td></tr>
              <tr><td>Q1 (25%)</td><td style="text-align: right;">${q1.toLocaleString("fr-FR")}/20</td></tr>
              <tr><td>Note min</td><td style="text-align: right;">${min.toLocaleString("fr-FR")}/20</td></tr>
            </table>
            <hr style="margin: 8px 0;"/>
            <span style="font-size: 11px; color: #6b7280;">
              Écart interquartile: ${(q3 - q1).toLocaleString("fr-FR")} pts
            </span>
          </div>
        `;
      }

      // Outliers
      if (p.seriesType === "scatter") {
        const [subjectIdx, grade] = p.data;
        const subject = subjects[subjectIdx];
        const isLow = grade < 8;
        return `
          <b style="color: ${isLow ? "#ef4444" : "#22c55e"};">${isLow ? "⚠️ Note atypique basse" : "⭐ Note atypique haute"}</b><br/>
          <b>${subject.name}</b><br/>
          Note: <b>${grade.toLocaleString("fr-FR")}/20</b><br/>
          <span style="font-size: 11px; color: #6b7280;">
            ${isLow ? "Élève en difficulté - accompagnement requis" : "Élève excellent - potentiel mention TB"}
          </span>
        `;
      }

      return "";
    },
  },
  legend: {
    data: ["Trimestre 1", "Trimestre 2", "Trimestre 3"],
    top: 55,
    selectedMode: "multiple",
  },
  grid: {
    left: "10%",
    right: "8%",
    top: 110,
    bottom: "15%",
  },
  xAxis: {
    type: "category",
    data: subjects.map((s) => s.name),
    boundaryGap: true,
    axisLabel: {
      fontSize: 11,
      rotate: 25,
      interval: 0,
    },
    splitArea: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    name: "Notes sur 20",
    nameLocation: "middle",
    nameGap: 40,
    min: 0,
    max: 20,
    interval: 2,
    splitArea: {
      show: true,
      areaStyle: {
        color: ["#ffffff", "#f9fafb"],
      },
    },
  },
  series: [
    {
      name: "Trimestre 1",
      type: "boxplot",
      data: boxplotT1,
      itemStyle: {
        color: "#dbeafe",
        borderColor: "#3b82f6",
        borderWidth: 1.5,
      },
      emphasis: {
        itemStyle: {
          borderColor: "#1d4ed8",
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: "rgba(59, 130, 246, 0.3)",
        },
      },
      boxWidth: ["20%", "35%"],
      markLine: {
        symbol: "none",
        silent: true,
        label: {
          position: "end",
          fontSize: 10,
        },
        lineStyle: {
          type: "dashed",
          width: 1,
        },
        data: [
          {
            yAxis: mentionThresholds.passable,
            lineStyle: { color: "#f59e0b" },
            label: { formatter: "Admis (10)", color: "#f59e0b" },
          },
          {
            yAxis: mentionThresholds.assezBien,
            lineStyle: { color: "#84cc16" },
            label: { formatter: "AB (12)", color: "#84cc16" },
          },
          {
            yAxis: mentionThresholds.bien,
            lineStyle: { color: "#22c55e" },
            label: { formatter: "B (14)", color: "#22c55e" },
          },
          {
            yAxis: mentionThresholds.tresBien,
            lineStyle: { color: "#15803d" },
            label: { formatter: "TB (16)", color: "#15803d" },
          },
        ],
      },
    },
    {
      name: "Trimestre 2",
      type: "boxplot",
      data: boxplotT2,
      itemStyle: {
        color: "#fef3c7",
        borderColor: "#f59e0b",
        borderWidth: 1.5,
      },
      emphasis: {
        itemStyle: {
          borderColor: "#d97706",
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: "rgba(245, 158, 11, 0.3)",
        },
      },
      boxWidth: ["20%", "35%"],
    },
    {
      name: "Trimestre 3",
      type: "boxplot",
      data: boxplotT3,
      itemStyle: {
        color: "#dcfce7",
        borderColor: "#22c55e",
        borderWidth: 1.5,
      },
      emphasis: {
        itemStyle: {
          borderColor: "#16a34a",
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: "rgba(34, 197, 94, 0.3)",
        },
      },
      boxWidth: ["20%", "35%"],
    },
  ],
};

// Statistiques globales pour les notes
const allGrades = gradesData.flat();
const globalMean =
  Math.round((allGrades.reduce((a, b) => a + b, 0) / allGrades.length) * 10) /
  10;
const globalMedian = [...allGrades].sort((a, b) => a - b)[
  Math.floor(allGrades.length / 2)
];
const belowAverage = allGrades.filter((g) => g < 10).length;
const aboveAverage = allGrades.filter((g) => g >= 10).length;
const mentionTB = allGrades.filter((g) => g >= 16).length;

const notes = `
## 📚 Note pédagogique : Boxplot Multiple pour Comparaison de Distributions

### ✅ Quand utiliser ce type de diagramme

Le **boxplot multiple** est idéal pour :

- **Comparer des distributions** entre plusieurs catégories (matières, groupes, périodes)
- **Visualiser la dispersion** : médiane, quartiles, étendue, outliers en un coup d'œil
- **Identifier les écarts** entre groupes (homogénéité vs hétérogénéité)
- **Détecter les valeurs atypiques** : élèves en difficulté ou excellents
- **Suivre une évolution** : comparaison T1/T2/T3

**Avantages du boxplot :**
- Plus informatif qu'une simple moyenne
- Révèle la forme de la distribution
- Met en évidence les valeurs extrêmes
- Permet des comparaisons visuelles rapides

### ❌ Quand ne pas utiliser

- **Données continues détaillées** : préférer un violin plot ou un histogramme
- **Très peu de données** (< 10 valeurs) : le boxplot perd son sens statistique
- **Distributions multimodales** : le boxplot ne révèle pas les "bosses"
- **Tendances temporelles détaillées** : utiliser un line chart

### 📊 Analyse de ce graphique

**Contexte : Bac blanc de Terminale S - 35 élèves · 8 matières**

| Métrique | Valeur |
|----------|--------|
| Moyenne générale | ${globalMean.toLocaleString("fr-FR")}/20 |
| Médiane générale | ${globalMedian.toLocaleString("fr-FR")}/20 |
| Élèves sous la moyenne | ${belowAverage} (${Math.round((belowAverage / allGrades.length) * 100)} %) |
| Élèves au-dessus | ${aboveAverage} (${Math.round((aboveAverage / allGrades.length) * 100)} %) |
| Notes ≥ 16 (TB) | ${mentionTB} |

**Par matière (trimestre 2) :**

| Matière | Médiane | Q1 | Q3 | Dispersion |
|---------|---------|----|----|------------|
${subjectStats.map((s) => `| ${s.name} | ${s.stats.median}/20 | ${s.stats.q1} | ${s.stats.q3} | ${(s.stats.q3 - s.stats.q1).toFixed(1)} pts |`).join("\n")}

### 🔧 Configuration Multiple Boxplot avec ECharts

**Méthode avec plusieurs séries :**
\`\`\`javascript
series: [
  {
    name: 'Trimestre 1',
    type: 'boxplot',
    data: [
      [min, q1, median, q3, max], // Matière 1
      [min, q1, median, q3, max], // Matière 2
      ...
    ],
    itemStyle: {
      color: '#dbeafe',
      borderColor: '#3b82f6'
    },
    boxWidth: ['20%', '35%'] // Largeur min/max
  },
  {
    name: 'Trimestre 2',
    type: 'boxplot',
    data: [...],
    itemStyle: {
      color: '#fef3c7',
      borderColor: '#f59e0b'
    }
  }
]
\`\`\`

**Avec dataset et transform (recommandé) :**
\`\`\`javascript
dataset: [
  {
    // Données brutes par catégorie
    source: [
      [note1, note2, ...], // Matière 1
      [note1, note2, ...], // Matière 2
    ]
  },
  {
    // Transform automatique
    transform: {
      type: 'boxplot',
      config: {
        itemNameFormatter: ({ value }) => subjects[value].name
      }
    }
  },
  {
    fromDatasetIndex: 1,
    fromTransformResult: 1 // Outliers
  }
],
series: [
  { type: 'boxplot', datasetIndex: 1 },
  { type: 'scatter', datasetIndex: 2 } // Outliers
]
\`\`\`

### 🎨 Bonnes pratiques de visualisation

**1. Lignes de seuil (markLine) :**
\`\`\`javascript
markLine: {
  data: [
    { yAxis: 10, label: { formatter: 'Admis' } },
    { yAxis: 12, label: { formatter: 'AB' } },
    { yAxis: 14, label: { formatter: 'Bien' } },
    { yAxis: 16, label: { formatter: 'TB' } }
  ]
}
\`\`\`

**2. Couleurs par période :**
\`\`\`
Trimestre 1 : Bleu (#3b82f6) - période de référence
Trimestre 2 : Orange (#f59e0b) - période intermédiaire
Trimestre 3 : Vert (#22c55e) - progression attendue
\`\`\`

**3. BoxWidth pour éviter le chevauchement :**
\`\`\`javascript
boxWidth: ['20%', '35%']
// [min, max] en pourcentage de la catégorie
\`\`\`

### 📐 Lecture d'un Boxplot

\`\`\`
    │ Maximum (whisker)
    │
   ┌┴┐ Q3 (75% des valeurs en dessous)
   │ │
   │─│ Médiane (50%)
   │ │
   └┬┘ Q1 (25% des valeurs en dessous)
    │
    │ Minimum (whisker)

   ⚫ Outliers (hors 1.5×IQR)
\`\`\`

**Interquartile Range (IQR) :**
\`\`\`
IQR = Q3 - Q1

Whisker bas = max(min, Q1 - 1.5×IQR)
Whisker haut = min(max, Q3 + 1.5×IQR)

Outliers = valeurs hors des whiskers
\`\`\`

### 💡 Cas d'usage pédagogique

**1. Identification des matières problématiques**
\`\`\`
- Grande dispersion = classe hétérogène
- Médiane basse = difficulté collective
- Beaucoup d'outliers bas = élèves à accompagner
\`\`\`

**2. Suivi de progression**
\`\`\`
- Comparer T1 vs T2 vs T3
- Médiane qui monte = progression
- Dispersion qui diminue = homogénéisation
\`\`\`

**3. Préparation au bac**
\`\`\`
- Identifier les matières sous le seuil des mentions
- Cibler les révisions sur les points faibles
- Repérer les élèves en danger (outliers bas)
\`\`\`

### ⚠️ Pièges à éviter

**1. Confondre moyenne et médiane**
\`\`\`
❌ "La moyenne est de 12"
✅ "La médiane est de 11, la moyenne de 12"
    → Quelques très bonnes notes tirent la moyenne
\`\`\`

**2. Ignorer la dispersion**
\`\`\`
❌ "Même médiane = même niveau"
✅ Regarder aussi l'IQR et les outliers
    → Une classe homogène n'est pas gérée pareil
\`\`\`

**3. Trop de catégories**
\`\`\`
❌ 20 matières sur le même graphique
✅ Regrouper par domaine ou faire plusieurs graphiques
\`\`\`

### 📋 Données utilisées

\`\`\`javascript
const subjects = [
  { name: 'Philosophie', mean: 9.5, std: 3.2 },
  { name: 'Français', mean: 11.2, std: 2.8 },
  { name: 'Mathématiques', mean: 10.8, std: 4.0 },
  { name: 'Physique-Chimie', mean: 11.5, std: 3.0 },
  { name: 'SVT', mean: 12.0, std: 2.5 },
  { name: 'Histoire-Géo', mean: 11.8, std: 2.2 },
  { name: 'Anglais', mean: 13.2, std: 2.8 },
  { name: 'Espagnol', mean: 12.5, std: 3.0 }
];

// 35 élèves par matière
// Distribution normale + outliers réalistes
\`\`\`

### 🎯 Insights clés de ce graphique

1. **Philosophie** présente la plus grande dispersion et la médiane la plus basse → matière difficile nécessitant un renforcement
2. **Anglais** a la meilleure médiane → les élèves sont à l'aise dans cette matière
3. **Mathématiques** a une forte dispersion → classe très hétérogène, besoin de différenciation pédagogique
4. **Histoire-Géo** est la plus homogène → l'enseignement est efficace pour tous les niveaux
5. **Progression T1→T3** visible → les révisions portent leurs fruits
`;

export default function MultipleCategories() {
  return (
    <ChartEditor
      title="Multiple Categories"
      section="Boxplot"
      option={option}
      notes={notes}
    />
  );
}
