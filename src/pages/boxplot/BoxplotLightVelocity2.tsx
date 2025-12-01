import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Latence réseau par datacenter
// Contexte : Monitoring de performance réseau entre datacenters d'une infrastructure cloud

// Génération de données de latence réseau réalistes
const generateNetworkLatency = () => {
  const datacenters = [
    {
      name: "Paris (EU-West)",
      baseLatency: 2.5,
      variance: 0.8,
      outlierChance: 0.03,
      description: "DC principal Europe",
    },
    {
      name: "Frankfurt (EU-Central)",
      baseLatency: 8.2,
      variance: 2.1,
      outlierChance: 0.04,
      description: "DC secondaire Europe",
    },
    {
      name: "Londres (EU-North)",
      baseLatency: 12.8,
      variance: 3.2,
      outlierChance: 0.05,
      description: "DC backup Europe",
    },
    {
      name: "New York (US-East)",
      baseLatency: 89.5,
      variance: 8.5,
      outlierChance: 0.08,
      description: "DC principal USA",
    },
    {
      name: "Tokyo (APAC)",
      baseLatency: 142.3,
      variance: 15.2,
      outlierChance: 0.12,
      description: "DC Asie-Pacifique",
    },
  ];

  const data: number[][] = [];

  datacenters.forEach((datacenter) => {
    const latencies: number[] = [];

    // Générer 100 mesures de ping par datacenter
    for (let i = 0; i < 100; i++) {
      // Distribution log-normale pour latence réseau
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      let latency = datacenter.baseLatency + z * datacenter.variance;

      // Ajouter des outliers (perte de paquets, congestion)
      if (Math.random() < datacenter.outlierChance) {
        // Timeout ou retransmission TCP (spike de latence)
        latency = datacenter.baseLatency * (3 + Math.random() * 4); // 3x à 7x la latence normale
      }

      // Minimum physiquement possible (vitesse lumière)
      latency = Math.max(0.1, parseFloat(latency.toFixed(1)));
      latencies.push(latency);
    }

    data.push(latencies);
  });

  return { data, datacenters };
};

const { data: latencyData, datacenters } = generateNetworkLatency();

// Calcul des statistiques boxplot avec outliers
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

  // Séparer valeurs normales des outliers
  const normalValues = sorted.filter((v) => v >= lowerFence && v <= upperFence);
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);

  const min = Math.max(normalValues[0], lowerFence);
  const max = Math.min(normalValues[normalValues.length - 1], upperFence);

  return { min, q1, median, q3, max, outliers };
};

// Calculer les stats pour chaque datacenter
const boxplotStats = latencyData.map((latencies, idx) => ({
  name: datacenters[idx].name,
  description: datacenters[idx].description,
  ...calculateBoxplotWithOutliers(latencies),
  count: latencies.length,
  mean: parseFloat(
    (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(1),
  ),
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

// Seuils SLA de latence réseau
const slaThresholds = {
  excellent: 10, // < 10ms (même région)
  good: 50, // < 50ms (inter-région Europe)
  acceptable: 100, // < 100ms (transatlantique)
  slow: 200, // < 200ms (limite acceptable)
};

const option: EChartsOption = {
  title: [
    {
      text: "🌍 Latence Réseau par Datacenter - Monitoring SLA",
      subtext: `100 pings par DC · Dernières 24h · ${outlierData.length} timeouts détectés · SLA: 95% < 200ms`,
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
      text: `Boxplot: Q1-Q3 (IQR) + Whiskers (1.5×IQR)\nOutliers: timeouts, congestion, retransmissions`,
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
      top: "82%",
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

        // Évaluation SLA
        let slaStatus = "🔴 Hors SLA";
        let slaColor = "#ef4444";
        if (median < slaThresholds.excellent) {
          slaStatus = "🟢 Excellent";
          slaColor = "#22c55e";
        } else if (median < slaThresholds.good) {
          slaStatus = "🟢 Très bon";
          slaColor = "#22c55e";
        } else if (median < slaThresholds.acceptable) {
          slaStatus = "🟡 Acceptable";
          slaColor = "#f59e0b";
        } else if (median < slaThresholds.slow) {
          slaStatus = "🟠 Limite SLA";
          slaColor = "#f97316";
        }

        // Calculer distance approximative (vitesse lumière = 300 000 km/s)
        const theoreticalDistance = Math.round((median * 300000 * 2) / 1000); // Aller-retour en km

        return `
          <div style="min-width: 260px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <b style="font-size: 14px;">${stats.name}</b>
              <span style="font-size: 10px; color: #6b7280;">${stats.description}</span>
            </div>
            <span style="color: ${slaColor}; font-weight: bold; font-size: 13px;">${slaStatus}</span>
            <hr style="margin: 8px 0;"/>
            <table style="width: 100%; font-size: 12px;">
              <tr><td>Whisker max</td><td style="text-align: right;">${max} ms</td></tr>
              <tr><td>Q3 (75%)</td><td style="text-align: right;">${q3} ms</td></tr>
              <tr style="background: #f3f4f6;"><td style="color: #3b82f6; font-weight: bold;">Médiane (P50)</td><td style="text-align: right; color: #3b82f6; font-weight: bold;">${median} ms</td></tr>
              <tr><td>Q1 (25%)</td><td style="text-align: right;">${q1} ms</td></tr>
              <tr><td>Whisker min</td><td style="text-align: right;">${min} ms</td></tr>
            </table>
            <hr style="margin: 8px 0;"/>
            <table style="width: 100%; font-size: 11px; color: #6b7280;">
              <tr><td>Moyenne</td><td style="text-align: right;">${stats.mean} ms</td></tr>
              <tr><td>Distance ~</td><td style="text-align: right;">${theoreticalDistance.toLocaleString("fr-FR")} km</td></tr>
              <tr><td>Timeouts</td><td style="text-align: right;">${stats.outliers.length}/100</td></tr>
              <tr><td>Disponibilité</td><td style="text-align: right;">${(100 - stats.outliers.length).toFixed(1)} %</td></tr>
            </table>
          </div>
        `;
      }

      // Outlier scatter (timeouts)
      if (p.seriesType === "scatter") {
        const [idx, latency] = p.data;
        const dcName = datacenters[idx].name;
        return `
          <div style="min-width: 200px;">
            <b style="color: #ef4444;">⚠️ Timeout détecté</b><br/>
            <b>${dcName}</b><br/>
            Latence: <b style="color: #ef4444;">${latency} ms</b><br/>
            <hr style="margin: 6px 0;"/>
            <div style="font-size: 10px; color: #6b7280;">
              <b>Causes possibles:</b><br/>
              • Congestion réseau<br/>
              • Perte de paquets<br/>
              • Retransmission TCP<br/>
              • Routage sub-optimal
            </div>
          </div>
        `;
      }

      return "";
    },
  },
  legend: {
    data: ["Latence réseau", "Timeouts"],
    top: 50,
  },
  grid: {
    left: "10%",
    right: "8%",
    top: 100,
    bottom: "25%",
  },
  xAxis: {
    type: "category",
    data: datacenters.map((dc) => dc.name),
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
    name: "Latence réseau (ms)",
    nameLocation: "middle",
    nameGap: 60,
    min: 0,
    splitArea: {
      show: true,
      areaStyle: {
        color: ["#ffffff", "#f9fafb"],
      },
    },
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000) return `${(value / 1000).toFixed(1)}s`;
        return `${value} ms`;
      },
    },
  },
  series: [
    {
      name: "Latence réseau",
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
          distance: 5,
        },
        lineStyle: {
          type: "dashed",
          width: 1,
        },
        data: [
          {
            yAxis: slaThresholds.excellent,
            lineStyle: { color: "#22c55e" },
            label: {
              formatter: "Excellent (10ms)",
              color: "#22c55e",
              backgroundColor: "#f0f9ff",
              padding: [2, 4],
              borderRadius: 2,
            },
          },
          {
            yAxis: slaThresholds.good,
            lineStyle: { color: "#84cc16" },
            label: {
              formatter: "Très bon (50ms)",
              color: "#84cc16",
              backgroundColor: "#f0f9ff",
              padding: [2, 4],
              borderRadius: 2,
            },
          },
          {
            yAxis: slaThresholds.acceptable,
            lineStyle: { color: "#f59e0b" },
            label: {
              formatter: "Acceptable (100ms)",
              color: "#f59e0b",
              backgroundColor: "#fffbeb",
              padding: [2, 4],
              borderRadius: 2,
            },
          },
          {
            yAxis: slaThresholds.slow,
            lineStyle: { color: "#f97316" },
            label: {
              formatter: "SLA Max (200ms)",
              color: "#f97316",
              backgroundColor: "#fff7ed",
              padding: [2, 4],
              borderRadius: 2,
            },
          },
        ],
      },
    },
    {
      name: "Timeouts",
      type: "scatter",
      data: outlierData,
      symbolSize: 12,
      itemStyle: {
        color: "#ef4444",
        opacity: 0.9,
      },
      emphasis: {
        itemStyle: {
          opacity: 1,
          shadowBlur: 15,
          shadowColor: "rgba(239, 68, 68, 0.6)",
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      },
    },
  ],
};

// Statistiques globales du réseau
const allLatencies = latencyData.flat();
const globalMedian = [...allLatencies].sort((a, b) => a - b)[
  Math.floor(allLatencies.length / 2)
];
const globalMean = parseFloat(
  (allLatencies.reduce((a, b) => a + b, 0) / allLatencies.length).toFixed(1),
);
const p95 = [...allLatencies].sort((a, b) => a - b)[
  Math.floor(allLatencies.length * 0.95)
];
const p99 = [...allLatencies].sort((a, b) => a - b)[
  Math.floor(allLatencies.length * 0.99)
];

// Calcul de la disponibilité globale (SLA)
const totalMeasurements = allLatencies.length;
const slaViolations = allLatencies.filter((l) => l > slaThresholds.slow).length;
const globalAvailability = (
  ((totalMeasurements - slaViolations) / totalMeasurements) *
  100
).toFixed(2);

const notes = `
## 📚 Note pédagogique : Boxplot pour Monitoring Réseau

### ✅ Quand utiliser ce type de diagramme

Le **boxplot** est particulièrement adapté pour le monitoring réseau car :

**🌐 Visualisation de la distribution de latence**
- Pas seulement la moyenne (qui cache les outliers)
- Montre la variabilité du réseau
- Identifie les percentiles critiques pour les SLA

**📊 Détection d'anomalies réseau**
- Outliers = timeouts, congestion, retransmissions
- Whiskers révèlent la stabilité de la connexion
- Médiane plus représentative que la moyenne

**🎯 Monitoring SLA et performance**
- P50, P95, P99 visibles d'un coup d'œil
- Comparaison entre datacenters
- Identification des goulots d'étranglement

### ❌ Quand ne pas utiliser

- **Monitoring temps réel** : préférer des graphiques temporels
- **Alerting immédiat** : utiliser des seuils simples
- **Analyse de tendances** : line charts sur plusieurs jours/semaines

### 📊 Analyse de ce monitoring réseau

**🌍 Vue d'ensemble du réseau global**

| Métrique | Valeur | Objectif SLA |
|----------|--------|--------------|
| Médiane globale | ${globalMedian} ms | < 100 ms |
| Moyenne globale | ${globalMean} ms | < 100 ms |
| P95 | ${p95} ms | < 150 ms |
| P99 | ${p99} ms | < 200 ms |
| **Disponibilité SLA** | **${globalAvailability} %** | **> 95 %** |
| Total timeouts | ${outlierData.length}/${totalMeasurements} | < 5 % |

**📍 Performance par datacenter**

| Datacenter | Distance | Médiane | P95 | Timeouts | Statut SLA |
|------------|----------|---------|-----|----------|------------|
${boxplotStats
  .map((s) => {
    const p95 = [...latencyData[boxplotStats.indexOf(s)]].sort((a, b) => a - b)[
      Math.floor(latencyData[boxplotStats.indexOf(s)].length * 0.95)
    ];
    const distance = Math.round((s.median * 300000 * 2) / 1000);
    const slaStatus =
      s.median < 10
        ? "🟢 Excellent"
        : s.median < 50
          ? "🟢 Très bon"
          : s.median < 100
            ? "🟡 Acceptable"
            : "🔴 Hors SLA";
    return `| ${s.name} | ~${distance.toLocaleString("fr-FR")} km | ${s.median} ms | ${p95} ms | ${s.outliers.length}/100 | ${slaStatus} |`;
  })
  .join("\n")}

### 🔧 Techniques de monitoring réseau

**1. Types de mesures de latence**
\`\`\`bash
# ICMP ping (couche 3)
ping -c 100 datacenter-ny.example.com

# TCP ping (couche 4, plus réaliste)
tcpping -p 443 datacenter-ny.example.com

# HTTP ping (couche 7, end-to-end)
curl -w "@time_format.txt" https://api-ny.example.com/health
\`\`\`

**2. Causes des outliers de latence**
\`\`\`
🔴 Timeouts (> 3x latence normale) :
├─ Perte de paquets (congestion, surcharge)
├─ Retransmission TCP (paquets corrompus)
├─ Routage asymétrique ou sub-optimal
├─ Limitation de bande passante (QoS)
└─ Problèmes physiques (coupures, maintenance)

🟡 Latence élevée (2-3x normale) :
├─ Charge réseau importante
├─ Buffer bloat sur équipements réseau
├─ Processing delay côté destination
└─ Congestion sur backbone internet
\`\`\`

**3. Seuils SLA typiques par distance**
\`\`\`
🌍 Même ville (< 50km) :
  P50 < 5ms, P95 < 10ms, P99 < 15ms

🌍 Même pays (< 500km) :
  P50 < 15ms, P95 < 30ms, P99 < 50ms

🌍 Même continent (< 2000km) :
  P50 < 40ms, P95 < 80ms, P99 < 120ms

🌍 Intercontinental (> 5000km) :
  P50 < 150ms, P95 < 250ms, P99 < 400ms
\`\`\`

### ⚙️ Configuration ECharts pour réseau

**1. Transform automatique ECharts :**
\`\`\`javascript
dataset: [
  {
    source: [
      // Données de ping par datacenter
      [2.3, 2.1, 2.8, ...], // Paris
      [8.1, 8.5, 7.9, ...], // Frankfurt
      [142.1, 139.8, 145.2, ...] // Tokyo
    ]
  },
  {
    transform: {
      type: 'boxplot',
      config: {
        itemNameFormatter: (params) => datacenters[params.value].name
      }
    }
  },
  {
    fromDatasetIndex: 1,
    fromTransformResult: 1 // Outliers automatiques
  }
]
\`\`\`

**2. Couleurs par SLA :**
\`\`\`javascript
// Coloration dynamique selon performance
itemStyle: {
  color: (params) => {
    const median = params.data[2]; // Médiane
    if (median < 10) return '#22c55e';      // Excellent
    if (median < 50) return '#84cc16';      // Très bon  
    if (median < 100) return '#f59e0b';     // Acceptable
    return '#ef4444';                       // Hors SLA
  }
}
\`\`\`

**3. Marklines pour seuils SLA :**
\`\`\`javascript
markLine: {
  data: [
    {
      yAxis: 10,
      label: { formatter: 'Excellent (10ms)' },
      lineStyle: { color: '#22c55e', type: 'dashed' }
    },
    {
      yAxis: 100,
      label: { formatter: 'SLA Acceptable (100ms)' },
      lineStyle: { color: '#f59e0b', type: 'dashed' }
    },
    {
      yAxis: 200,
      label: { formatter: 'SLA Maximum (200ms)' },
      lineStyle: { color: '#ef4444', type: 'solid', width: 2 }
    }
  ]
}
\`\`\`

### 💡 Cas d'usage DevOps/SRE

**1. Capacity Planning**
\`\`\`
📈 Dégradation progressive des percentiles
└─ Besoin d'upgrade réseau ou CDN

📊 Outliers fréquents sur un DC
└─ Problème hardware ou configuration

🌍 Latence inter-DC élevée
└─ Optimisation de routage ou peering
\`\`\`

**2. Incident Response**
\`\`\`
🚨 Spike soudain de P99
└─ Investigation: DDoS, panne, maintenance

🔍 Outliers sur un DC spécifique
└─ Isolation: problème local vs global

📉 Amélioration des médianes
└─ Validation: optimisations réseau effectives
\`\`\`

**3. SLA Reporting**
\`\`\`
📊 Boxplot mensuel par région
└─ Proof de conformité SLA client

🎯 Comparaison avant/après migration
└─ Validation performance nouveau DC

💰 Cost vs Performance analysis
└─ Justification investissements réseau
\`\`\`

### 🧮 Calculs de distance théorique

**Vitesse de la lumière dans la fibre :**
\`\`\`javascript
// Vitesse = 200 000 km/s (2/3 vitesse lumière dans le vide)
// Distance théorique minimum (aller-retour)
const theoreticalDistance = (latencyMs * 200000 * 2) / 1000; // km

// Exemple: 89ms Paris → New York
// Distance = (89 * 200000 * 2) / 1000 = 35 600 km
// Réalité: ~6 800 km (routing overhead = 5.2x)
\`\`\`

### ⚠️ Pièges à éviter

**1. Confondre latence et bande passante**
\`\`\`
❌ "On a du 1Gb/s, la latence devrait être bonne"
✅ Latence = distance + processing, pas liée à la BP
\`\`\`

**2. Ignorer les outliers**
\`\`\`
❌ "La médiane est bonne, c'est OK"
✅ P99 critique pour expérience utilisateur
\`\`\`

**3. Mesures depuis un seul point**
\`\`\`
❌ Ping depuis le bureau uniquement
✅ Monitoring depuis chaque datacenter
\`\`\`

**4. Confusion entre types de ping**
\`\`\`
❌ ICMP ping pour valider API REST
✅ TCP/HTTP ping pour la stack complète
\`\`\`

### 📋 Données de ce graphique

\`\`\`javascript
const datacenters = [
  { 
    name: "Paris (EU-West)", 
    baseLatency: 2.5,      // Intra-région
    description: "DC principal Europe"
  },
  { 
    name: "Frankfurt (EU-Central)", 
    baseLatency: 8.2,      // ~500km
    description: "DC secondaire Europe" 
  },
  { 
    name: "New York (US-East)", 
    baseLatency: 89.5,     // Transatlantique ~6800km
    description: "DC principal USA"
  },
  { 
    name: "Tokyo (APAC)", 
    baseLatency: 142.3,    // ~9800km via transpacifique
    description: "DC Asie-Pacifique"
  }
];

// 100 pings par DC avec distribution log-normale
// + outliers simulant timeouts/congestion
\`\`\`

### 🎯 Métriques de succès

**Infrastructure réseau performante :**
- ✅ P50 global < 50ms (intra-région)
- ✅ P95 global < 150ms (inter-région)  
- ✅ P99 global < 200ms (intercontinental)
- ✅ Disponibilité > 99.5% (< 0.5% timeouts)
- ✅ Outliers < 5% par datacenter

**Bonnes pratiques monitoring :**
- 🔄 Mesures continues (1 ping/seconde minimum)
- 📊 Retention 30 jours pour analyse de tendances
- 🚨 Alerting sur P95 et taux d'outliers
- 📈 Dashboards par région et service critique
- 🎯 SLA alignés sur besoins métier réels
`;

export default function BoxplotLightVelocity2() {
  return (
    <ChartEditor
      title="Boxplot Light Velocity2"
      section="Boxplot"
      option={option}
      notes={notes}
    />
  );
}
