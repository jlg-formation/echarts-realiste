import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Temps de réponse serveur API
// Contexte : Monitoring de performance d'une API REST

// Génération de données de temps de réponse réalistes
const generateResponseTimes = () => {
  const endpoints = [
    { name: "GET /users", baseTime: 45, variance: 20, outlierChance: 0.05 },
    { name: "POST /orders", baseTime: 120, variance: 50, outlierChance: 0.08 },
    { name: "GET /products", baseTime: 65, variance: 25, outlierChance: 0.04 },
    { name: "PUT /cart", baseTime: 85, variance: 35, outlierChance: 0.06 },
    { name: "GET /search", baseTime: 180, variance: 80, outlierChance: 0.1 },
  ];

  const data: number[][] = [];

  endpoints.forEach((endpoint) => {
    const times: number[] = [];

    // Générer 50 mesures par endpoint
    for (let i = 0; i < 50; i++) {
      // Distribution normale
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      let time = endpoint.baseTime + z * endpoint.variance;

      // Ajouter des outliers (pics de latence)
      if (Math.random() < endpoint.outlierChance) {
        time = endpoint.baseTime * (2.5 + Math.random() * 2); // 2.5x à 4.5x le temps normal
      }

      // Minimum 5ms, arrondir
      time = Math.max(5, Math.round(time));
      times.push(time);
    }

    data.push(times);
  });

  return { data, endpoints };
};

const { data: responseTimesData, endpoints } = generateResponseTimes();

// Calcul manuel des statistiques boxplot avec outliers
const calculateBoxplotWithOutliers = (values: number[]) => {
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

  // Séparer les valeurs normales des outliers
  const normalValues = sorted.filter((v) => v >= lowerFence && v <= upperFence);
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);

  const min = Math.max(normalValues[0], lowerFence);
  const max = Math.min(normalValues[normalValues.length - 1], upperFence);

  return { min, q1, median, q3, max, outliers, lowerFence, upperFence };
};

// Calculer les stats pour chaque endpoint
const boxplotStats = responseTimesData.map((times, idx) => ({
  name: endpoints[idx].name,
  ...calculateBoxplotWithOutliers(times),
  count: times.length,
  mean: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
}));

// Préparer les données pour ECharts
const boxplotData = boxplotStats.map((stats) => [
  stats.min,
  stats.q1,
  stats.median,
  stats.q3,
  stats.max,
]);

// Préparer les outliers pour scatter
const outlierData: Array<[number, number]> = [];
boxplotStats.forEach((stats, idx) => {
  stats.outliers.forEach((outlier) => {
    outlierData.push([idx, outlier]);
  });
});

// Seuils de performance
const thresholds = {
  excellent: 50, // < 50ms
  good: 100, // < 100ms
  acceptable: 200, // < 200ms
  slow: 500, // < 500ms
};

const option: EChartsOption = {
  title: [
    {
      text: "⚡ Temps de Réponse API - Monitoring Performance",
      subtext: `50 requêtes par endpoint · Dernières 24h · ${outlierData.length} outliers détectés`,
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
    {
      text: `Whiskers: Q1 - 1.5×IQR / Q3 + 1.5×IQR\nOutliers: points hors des whiskers`,
      borderColor: "#d1d5db",
      borderWidth: 1,
      borderRadius: 4,
      padding: [8, 12],
      textStyle: {
        fontWeight: "normal",
        fontSize: 11,
        lineHeight: 16,
        color: "#6b7280",
      },
      left: "2%",
      top: "85%",
    },
  ],
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
        dataIndex: number;
      };

      if (p.seriesType === "boxplot") {
        const stats = boxplotStats[p.dataIndex];
        const [min, q1, median, q3, max] = p.value;

        // Évaluation de la performance
        let status = "🔴 Lent";
        let statusColor = "#ef4444";
        if (median < thresholds.excellent) {
          status = "🟢 Excellent";
          statusColor = "#22c55e";
        } else if (median < thresholds.good) {
          status = "🟢 Bon";
          statusColor = "#22c55e";
        } else if (median < thresholds.acceptable) {
          status = "🟡 Acceptable";
          statusColor = "#f59e0b";
        } else if (median < thresholds.slow) {
          status = "🟠 Lent";
          statusColor = "#f97316";
        }

        return `
          <div style="min-width: 220px;">
            <b style="font-size: 14px;">${stats.name}</b>
            <br/><span style="color: ${statusColor}; font-weight: bold;">${status}</span>
            <hr style="margin: 8px 0;"/>
            <table style="width: 100%;">
              <tr><td>Whisker max</td><td style="text-align: right;">${max} ms</td></tr>
              <tr><td>Q3 (75%)</td><td style="text-align: right;">${q3} ms</td></tr>
              <tr><td style="color: #3b82f6; font-weight: bold;">Médiane</td><td style="text-align: right; color: #3b82f6; font-weight: bold;">${median} ms</td></tr>
              <tr><td>Q1 (25%)</td><td style="text-align: right;">${q1} ms</td></tr>
              <tr><td>Whisker min</td><td style="text-align: right;">${min} ms</td></tr>
            </table>
            <hr style="margin: 8px 0;"/>
            <table style="width: 100%; font-size: 11px; color: #6b7280;">
              <tr><td>Moyenne</td><td style="text-align: right;">${stats.mean} ms</td></tr>
              <tr><td>Outliers</td><td style="text-align: right;">${stats.outliers.length} détectés</td></tr>
              <tr><td>Échantillon</td><td style="text-align: right;">${stats.count} requêtes</td></tr>
            </table>
          </div>
        `;
      }

      // Outlier scatter
      if (p.seriesType === "scatter") {
        const [idx, time] = p.data;
        const endpointName = endpoints[idx].name;
        return `
          <b style="color: #ef4444;">⚠️ Outlier détecté</b><br/>
          <b>${endpointName}</b><br/>
          Temps: <b>${time} ms</b><br/>
          <span style="font-size: 11px; color: #6b7280;">
            Possible cause: pic de charge, GC, réseau
          </span>
        `;
      }

      return "";
    },
  },
  legend: {
    data: ["Temps de réponse", "Outliers"],
    top: 50,
  },
  grid: {
    left: "12%",
    right: "8%",
    top: 100,
    bottom: "20%",
  },
  xAxis: {
    type: "category",
    data: endpoints.map((e) => e.name),
    boundaryGap: true,
    axisLabel: {
      fontSize: 11,
      rotate: 15,
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
    name: "Temps de réponse (ms)",
    nameLocation: "middle",
    nameGap: 50,
    min: 0,
    splitArea: {
      show: true,
      areaStyle: {
        color: ["#ffffff", "#f9fafb"],
      },
    },
    // Lignes de seuil
    axisLine: {
      show: true,
    },
  },
  // Lignes de seuil de performance
  markLine: {
    silent: true,
    symbol: "none",
    lineStyle: {
      type: "dashed",
    },
  },
  series: [
    {
      name: "Temps de réponse",
      type: "boxplot",
      data: boxplotData,
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
      markLine: {
        symbol: "none",
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
            yAxis: thresholds.excellent,
            lineStyle: { color: "#22c55e" },
            label: { formatter: "Excellent (50ms)", color: "#22c55e" },
          },
          {
            yAxis: thresholds.good,
            lineStyle: { color: "#84cc16" },
            label: { formatter: "Bon (100ms)", color: "#84cc16" },
          },
          {
            yAxis: thresholds.acceptable,
            lineStyle: { color: "#f59e0b" },
            label: { formatter: "Acceptable (200ms)", color: "#f59e0b" },
          },
        ],
      },
    },
    {
      name: "Outliers",
      type: "scatter",
      data: outlierData,
      symbolSize: 10,
      itemStyle: {
        color: "#ef4444",
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          opacity: 1,
          shadowBlur: 10,
          shadowColor: "rgba(239, 68, 68, 0.5)",
        },
      },
    },
  ],
};

// Statistiques globales
const allTimes = responseTimesData.flat();
const globalMedian = [...allTimes].sort((a, b) => a - b)[
  Math.floor(allTimes.length / 2)
];
const globalMean = Math.round(
  allTimes.reduce((a, b) => a + b, 0) / allTimes.length,
);
const p95 = [...allTimes].sort((a, b) => a - b)[
  Math.floor(allTimes.length * 0.95)
];
const p99 = [...allTimes].sort((a, b) => a - b)[
  Math.floor(allTimes.length * 0.99)
];

const notes = `
## 📚 Note pédagogique : Boxplot pour le Monitoring de Performance

### ✅ Quand utiliser ce type de diagramme

Le **boxplot** est idéal pour le monitoring de performance car il montre :

- **Distribution des temps de réponse** : pas seulement la moyenne
- **Variabilité** : écart-type visualisé par la taille de la boîte
- **Outliers** : pics de latence clairement identifiés
- **Percentiles** : Q1, médiane, Q3 en un coup d'œil

**Avantages par rapport à la moyenne seule :**
- La moyenne cache les pics de latence
- Un seul outlier à 5000ms fausse une moyenne de requêtes à 50ms
- Le boxplot révèle la vraie distribution

### ❌ Quand ne pas utiliser

- **Données temps réel** : préférer des gauges ou graphiques live
- **Tendances temporelles** : utiliser des line charts
- **Alerting** : le boxplot est pour l'analyse, pas le monitoring temps réel

### 📊 Analyse de ce graphique

**Performance API - Statistiques globales**

| Métrique | Valeur |
|----------|--------|
| Médiane globale | ${globalMedian} ms |
| Moyenne globale | ${globalMean} ms |
| P95 | ${p95} ms |
| P99 | ${p99} ms |
| Total outliers | ${outlierData.length} |

**Par endpoint :**

| Endpoint | Médiane | Moyenne | Outliers | Évaluation |
|----------|---------|---------|----------|------------|
${boxplotStats.map((s) => `| ${s.name} | ${s.median} ms | ${s.mean} ms | ${s.outliers.length} | ${s.median < 50 ? "🟢" : s.median < 100 ? "🟢" : s.median < 200 ? "🟡" : "🔴"} |`).join("\n")}

### 🔧 Configuration Boxplot avec Transform ECharts

**Transform automatique (méthode recommandée) :**
\`\`\`javascript
dataset: [
  {
    source: [
      [45, 52, 38, ...], // Endpoint 1
      [120, 115, 135, ...], // Endpoint 2
    ]
  },
  {
    transform: {
      type: 'boxplot',
      config: {
        itemNameFormatter: (params) => endpoints[params.value].name
      }
    }
  },
  {
    fromDatasetIndex: 1,
    fromTransformResult: 1 // Récupère les outliers
  }
],
series: [
  { type: 'boxplot', datasetIndex: 1 },
  { type: 'scatter', datasetIndex: 2 } // Outliers
]
\`\`\`

**Calcul manuel des whiskers :**
\`\`\`javascript
const iqr = q3 - q1;
const lowerWhisker = q1 - 1.5 * iqr;
const upperWhisker = q3 + 1.5 * iqr;

// Outliers = valeurs hors des whiskers
const outliers = data.filter(
  v => v < lowerWhisker || v > upperWhisker
);
\`\`\`

### 🎨 Bonnes pratiques de visualisation

**1. Seuils de performance (markLine) :**
\`\`\`javascript
markLine: {
  data: [
    { yAxis: 50, label: { formatter: 'Excellent' } },
    { yAxis: 100, label: { formatter: 'Bon' } },
    { yAxis: 200, label: { formatter: 'Acceptable' } }
  ]
}
\`\`\`

**2. Couleurs par état :**
\`\`\`
🟢 Excellent : < 50ms (vert)
🟢 Bon : < 100ms (vert clair)
🟡 Acceptable : < 200ms (jaune)
🟠 Lent : < 500ms (orange)
🔴 Critique : > 500ms (rouge)
\`\`\`

**3. Outliers mis en évidence :**
\`\`\`javascript
{
  type: 'scatter',
  data: outlierData,
  itemStyle: { color: '#ef4444' },
  symbolSize: 10
}
\`\`\`

### 📐 Métriques de performance clés

**Percentiles vs Moyenne :**
\`\`\`
P50 (médiane) : 50% des requêtes plus rapides
P95 : 95% des requêtes plus rapides
P99 : 99% des requêtes plus rapides

Pourquoi P95/P99 ?
- Plus représentatif de l'expérience utilisateur
- Capture les pics de latence
- SLA souvent basés sur P99
\`\`\`

**SLA typiques :**
\`\`\`
P50 < 100ms (réponse perçue "instantanée")
P95 < 500ms (acceptable pour API REST)
P99 < 1000ms (limite haute)
\`\`\`

### 💡 Cas d'usage DevOps/SRE

**1. Comparaison avant/après déploiement**
\`\`\`
- Boxplot version N vs version N+1
- Détecter les régressions de performance
- Valider les optimisations
\`\`\`

**2. Identification des goulots d'étranglement**
\`\`\`
- Endpoint avec médiane élevée → optimiser la requête
- Beaucoup d'outliers → problème de ressources
- Grande variance → comportement non déterministe
\`\`\`

**3. Capacity planning**
\`\`\`
- Évolution des boxplots dans le temps
- Dégradation progressive = besoin de scale
- Pics à certaines heures = auto-scaling
\`\`\`

### ⚠️ Pièges à éviter

**1. Ignorer les outliers**
\`\`\`
❌ "La moyenne est bonne, tout va bien"
✅ Analyser les outliers : pourquoi ces pics ?
\`\`\`

**2. Comparer des échantillons de tailles différentes**
\`\`\`
❌ 10 requêtes vs 10000 requêtes
✅ Normaliser ou indiquer la taille d'échantillon
\`\`\`

**3. Métriques côté serveur seulement**
\`\`\`
❌ Temps serveur uniquement
✅ Temps client (inclut réseau, parsing)
\`\`\`

### 🔍 Investigation des outliers

**Causes fréquentes de pics de latence :**
\`\`\`
1. Garbage Collection (GC pause)
2. Cold start (containers/lambdas)
3. Cache miss (première requête)
4. Contention base de données
5. Réseau (retransmissions TCP)
6. Throttling (rate limiting)
7. Slow queries SQL
\`\`\`

### 📋 Données pour ce graphique

\`\`\`javascript
const endpoints = [
  { name: 'GET /users', baseTime: 45, variance: 20 },
  { name: 'POST /orders', baseTime: 120, variance: 50 },
  { name: 'GET /products', baseTime: 65, variance: 25 },
  { name: 'PUT /cart', baseTime: 85, variance: 35 },
  { name: 'GET /search', baseTime: 180, variance: 80 }
];

// 50 mesures par endpoint avec distribution normale
// + outliers aléatoires (pics de latence)
\`\`\`
`;

export default function BoxplotLightVelocity() {
  return (
    <ChartEditor
      title="Boxplot Light Velocity"
      section="Boxplot"
      option={option}
      notes={notes}
    />
  );
}
