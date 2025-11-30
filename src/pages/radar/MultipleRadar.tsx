import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Benchmark produits concurrents
// Contexte : Comparaison de 3 catégories de produits tech (smartphones, logiciels, services cloud)

// === DONNÉES SMARTPHONES ===
const smartphones = {
  produits: [
    { nom: "iPhone 15 Pro", scores: [92, 88, 94, 96, 91] },
    { nom: "Samsung S24 Ultra", scores: [88, 95, 89, 94, 96] },
  ],
  criteres: [
    { text: "Design", max: 100 },
    { text: "Photo", max: 100 },
    { text: "Autonomie", max: 100 },
    { text: "Performance", max: 100 },
    { text: "Écran", max: 100 },
  ],
};

// === DONNÉES LOGICIELS CRM ===
const logicielsCRM = {
  produits: [
    { nom: "Salesforce", scores: [95, 78, 65, 92] },
    { nom: "HubSpot", scores: [82, 95, 88, 78] },
  ],
  criteres: [
    { text: "Fonctionnalités", max: 100 },
    { text: "Facilité", max: 100 },
    { text: "Prix", max: 100 },
    { text: "Support", max: 100 },
  ],
};

// === DONNÉES CLOUD (mensuel sur 12 mois) ===
const cloudProviders = {
  produits: [
    {
      nom: "AWS",
      uptime: [
        99.95, 99.98, 99.92, 99.99, 99.97, 99.94, 99.96, 99.99, 99.98, 99.95,
        99.97, 99.99,
      ],
    },
    {
      nom: "Azure",
      uptime: [
        99.92, 99.95, 99.88, 99.96, 99.94, 99.91, 99.93, 99.97, 99.95, 99.92,
        99.94, 99.96,
      ],
    },
  ],
  mois: [
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
  ],
};

// Calcul des moyennes pour les tooltips
const moyenneSmartphone = (scores: number[]) =>
  Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

const moyenneUptime = (uptime: number[]) =>
  (uptime.reduce((a, b) => a + b, 0) / uptime.length).toFixed(2);

const option: EChartsOption = {
  title: {
    text: "📊 Benchmark Produits Tech - Analyse Concurrentielle",
    subtext: "Smartphones · Logiciels CRM · Disponibilité Cloud (Uptime %)",
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
  },
  legend: {
    data: [
      smartphones.produits[0].nom,
      smartphones.produits[1].nom,
      logicielsCRM.produits[0].nom,
      logicielsCRM.produits[1].nom,
      cloudProviders.produits[0].nom,
      cloudProviders.produits[1].nom,
    ],
    top: 50,
    left: "center",
    textStyle: {
      fontSize: 11,
    },
  },
  radar: [
    // Radar 1 : Smartphones (gauche)
    {
      indicator: smartphones.criteres,
      center: ["20%", "55%"],
      radius: 90,
      startAngle: 90,
      splitNumber: 5,
      shape: "polygon",
      axisName: {
        color: "#374151",
        fontSize: 10,
      },
      splitArea: {
        areaStyle: {
          color: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80"],
          opacity: 0.3,
        },
      },
      axisLine: {
        lineStyle: { color: "#d1d5db" },
      },
      splitLine: {
        lineStyle: { color: "#e5e7eb" },
      },
    },
    // Radar 2 : Logiciels CRM (centre)
    {
      indicator: logicielsCRM.criteres,
      center: ["50%", "55%"],
      radius: 90,
      startAngle: 90,
      splitNumber: 5,
      shape: "polygon",
      axisName: {
        color: "#374151",
        fontSize: 10,
      },
      splitArea: {
        areaStyle: {
          color: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"],
          opacity: 0.3,
        },
      },
      axisLine: {
        lineStyle: { color: "#d1d5db" },
      },
      splitLine: {
        lineStyle: { color: "#e5e7eb" },
      },
    },
    // Radar 3 : Cloud Uptime (droite) - 12 mois
    {
      indicator: cloudProviders.mois.map((mois) => ({
        text: mois,
        max: 100,
      })),
      center: ["80%", "55%"],
      radius: 90,
      startAngle: 90,
      splitNumber: 5,
      shape: "circle",
      axisName: {
        color: "#374151",
        fontSize: 9,
      },
      splitArea: {
        areaStyle: {
          color: ["#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b"],
          opacity: 0.3,
        },
      },
      axisLine: {
        lineStyle: { color: "#d1d5db" },
      },
      splitLine: {
        lineStyle: { color: "#e5e7eb" },
      },
    },
  ],
  series: [
    // Série 1 : Smartphones
    {
      name: "Smartphones",
      type: "radar",
      radarIndex: 0,
      emphasis: {
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.5 },
      },
      data: [
        {
          value: smartphones.produits[0].scores,
          name: smartphones.produits[0].nom,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { color: "#10b981", width: 2 },
          areaStyle: { color: "#10b981", opacity: 0.25 },
          itemStyle: { color: "#10b981" },
          label: {
            show: false,
          },
        },
        {
          value: smartphones.produits[1].scores,
          name: smartphones.produits[1].nom,
          symbol: "diamond",
          symbolSize: 6,
          lineStyle: { color: "#3b82f6", width: 2 },
          areaStyle: { color: "#3b82f6", opacity: 0.25 },
          itemStyle: { color: "#3b82f6" },
          label: {
            show: false,
          },
        },
      ],
    },
    // Série 2 : Logiciels CRM
    {
      name: "CRM",
      type: "radar",
      radarIndex: 1,
      emphasis: {
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.5 },
      },
      data: [
        {
          value: logicielsCRM.produits[0].scores,
          name: logicielsCRM.produits[0].nom,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { color: "#8b5cf6", width: 2 },
          areaStyle: { color: "#8b5cf6", opacity: 0.25 },
          itemStyle: { color: "#8b5cf6" },
        },
        {
          value: logicielsCRM.produits[1].scores,
          name: logicielsCRM.produits[1].nom,
          symbol: "diamond",
          symbolSize: 6,
          lineStyle: { color: "#f97316", width: 2 },
          areaStyle: { color: "#f97316", opacity: 0.25 },
          itemStyle: { color: "#f97316" },
        },
      ],
    },
    // Série 3 : Cloud Uptime mensuel
    {
      name: "Cloud",
      type: "radar",
      radarIndex: 2,
      emphasis: {
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.5 },
      },
      data: [
        {
          value: cloudProviders.produits[0].uptime,
          name: cloudProviders.produits[0].nom,
          symbol: "circle",
          symbolSize: 5,
          lineStyle: { color: "#ef4444", width: 2 },
          areaStyle: { color: "#ef4444", opacity: 0.25 },
          itemStyle: { color: "#ef4444" },
        },
        {
          value: cloudProviders.produits[1].uptime,
          name: cloudProviders.produits[1].nom,
          symbol: "triangle",
          symbolSize: 5,
          lineStyle: { color: "#06b6d4", width: 2 },
          areaStyle: { color: "#06b6d4", opacity: 0.25 },
          itemStyle: { color: "#06b6d4" },
        },
      ],
    },
  ],
  // Annotations textuelles pour les catégories
  graphic: [
    {
      type: "text",
      left: "14%",
      top: "88%",
      style: {
        text: "📱 Smartphones",
        fontSize: 12,
        fontWeight: "bold",
        fill: "#374151",
      },
    },
    {
      type: "text",
      left: "45%",
      top: "88%",
      style: {
        text: "💼 Logiciels CRM",
        fontSize: 12,
        fontWeight: "bold",
        fill: "#374151",
      },
    },
    {
      type: "text",
      left: "74%",
      top: "88%",
      style: {
        text: "☁️ Cloud Uptime",
        fontSize: 12,
        fontWeight: "bold",
        fill: "#374151",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Multiple Radar (Benchmark multi-catégories)

### ✅ Quand utiliser ce type de diagramme

Le **Multiple Radar** est idéal pour :

- **Benchmark concurrentiel** : comparer plusieurs produits sur différents marchés
- **Analyse portfolio** : évaluer différentes catégories de produits/services
- **Dashboard exécutif** : vue d'ensemble rapide de plusieurs segments
- **Comparaison temporelle** : évolution mensuelle sur un indicateur

**Caractéristiques clés :**
- Plusieurs radars positionnés côte à côte
- Chaque radar peut avoir ses propres indicateurs
- Permet de comparer des dimensions différentes

### ❌ Quand ne pas utiliser

- **Espace limité** : les radars multiples nécessitent de la place
- **Trop de produits** : max 2-3 produits par radar
- **Données non comparables** : si les échelles sont trop différentes
- **Mobile** : peu adapté aux petits écrans

### 📊 Analyse de ce graphique

**Benchmark Produits Tech - 3 catégories comparées**

#### 📱 Smartphones (Radar gauche)

| Critère | ${smartphones.produits[0].nom} | ${smartphones.produits[1].nom} | Gagnant |
|---------|-------------------------------|--------------------------------|---------|
| Design | ${smartphones.produits[0].scores[0]} | ${smartphones.produits[1].scores[0]} | ${smartphones.produits[0].scores[0] > smartphones.produits[1].scores[0] ? "iPhone" : "Samsung"} |
| Photo | ${smartphones.produits[0].scores[1]} | ${smartphones.produits[1].scores[1]} | ${smartphones.produits[0].scores[1] > smartphones.produits[1].scores[1] ? "iPhone" : "Samsung"} |
| Autonomie | ${smartphones.produits[0].scores[2]} | ${smartphones.produits[1].scores[2]} | ${smartphones.produits[0].scores[2] > smartphones.produits[1].scores[2] ? "iPhone" : "Samsung"} |
| Performance | ${smartphones.produits[0].scores[3]} | ${smartphones.produits[1].scores[3]} | ${smartphones.produits[0].scores[3] > smartphones.produits[1].scores[3] ? "iPhone" : "Samsung"} |
| Écran | ${smartphones.produits[0].scores[4]} | ${smartphones.produits[1].scores[4]} | ${smartphones.produits[0].scores[4] > smartphones.produits[1].scores[4] ? "iPhone" : "Samsung"} |
| **Moyenne** | **${moyenneSmartphone(smartphones.produits[0].scores)}** | **${moyenneSmartphone(smartphones.produits[1].scores)}** | - |

#### 💼 Logiciels CRM (Radar centre)

| Critère | ${logicielsCRM.produits[0].nom} | ${logicielsCRM.produits[1].nom} | Analyse |
|---------|--------------------------------|--------------------------------|---------|
| Fonctionnalités | ${logicielsCRM.produits[0].scores[0]} | ${logicielsCRM.produits[1].scores[0]} | Salesforce plus complet |
| Facilité | ${logicielsCRM.produits[0].scores[1]} | ${logicielsCRM.produits[1].scores[1]} | HubSpot plus intuitif |
| Prix | ${logicielsCRM.produits[0].scores[2]} | ${logicielsCRM.produits[1].scores[2]} | HubSpot plus abordable |
| Support | ${logicielsCRM.produits[0].scores[3]} | ${logicielsCRM.produits[1].scores[3]} | Salesforce meilleur support |

#### ☁️ Cloud Uptime (Radar droit)

| Provider | Uptime moyen | Meilleur mois | Pire mois |
|----------|--------------|---------------|-----------|
| ${cloudProviders.produits[0].nom} | ${moyenneUptime(cloudProviders.produits[0].uptime)}% | ${Math.max(...cloudProviders.produits[0].uptime)}% | ${Math.min(...cloudProviders.produits[0].uptime)}% |
| ${cloudProviders.produits[1].nom} | ${moyenneUptime(cloudProviders.produits[1].uptime)}% | ${Math.max(...cloudProviders.produits[1].uptime)}% | ${Math.min(...cloudProviders.produits[1].uptime)}% |

### 🔧 Configuration Multiple Radar ECharts

**Définition de plusieurs radars :**
\`\`\`javascript
radar: [
  {
    indicator: [...], // Critères radar 1
    center: ['20%', '55%'], // Position gauche
    radius: 90
  },
  {
    indicator: [...], // Critères radar 2
    center: ['50%', '55%'], // Position centre
    radius: 90
  },
  {
    indicator: [...], // Critères radar 3
    center: ['80%', '55%'], // Position droite
    radius: 90
  }
]
\`\`\`

**Liaison série → radar :**
\`\`\`javascript
series: [
  {
    type: 'radar',
    radarIndex: 0, // Utilise le 1er radar
    data: [...]
  },
  {
    type: 'radar',
    radarIndex: 1, // Utilise le 2ème radar
    data: [...]
  },
  {
    type: 'radar',
    radarIndex: 2, // Utilise le 3ème radar
    data: [...]
  }
]
\`\`\`

**Formes différentes :**
\`\`\`javascript
// Radar polygone (par défaut)
{ shape: 'polygon', ... }

// Radar circulaire (pour données temporelles)
{ shape: 'circle', ... }
\`\`\`

### 🎨 Bonnes pratiques de design

**1. Positionnement**
\`\`\`javascript
// 2 radars côte à côte
center: ['30%', '50%'] // Gauche
center: ['70%', '50%'] // Droite

// 3 radars en ligne
center: ['20%', '55%'] // Gauche
center: ['50%', '55%'] // Centre
center: ['80%', '55%'] // Droite
\`\`\`

**2. Taille cohérente**
\`\`\`
Même radius pour tous les radars
Permet une comparaison visuelle équitable
\`\`\`

**3. Couleurs par catégorie**
\`\`\`javascript
// Palette cohérente par catégorie
Smartphones : verts/bleus
CRM : violet/orange
Cloud : rouge/cyan
\`\`\`

**4. Annotations**
\`\`\`javascript
graphic: [
  {
    type: 'text',
    left: '14%',
    top: '88%',
    style: { text: '📱 Smartphones', ... }
  }
]
\`\`\`

### 💡 Cas d'usage métier

**1. Benchmark produit**
\`\`\`
- Comparer plusieurs produits concurrents
- Identifier forces/faiblesses par segment
- Aide à la décision d'achat
\`\`\`

**2. Analyse portfolio**
\`\`\`
- Vue d'ensemble par gamme de produits
- Identification des points forts par marché
- Priorisation des investissements
\`\`\`

**3. Suivi SLA**
\`\`\`
- Uptime mensuel par provider
- Comparaison des performances
- Justification des choix techniques
\`\`\`

### ⚠️ Pièges à éviter

**1. Surcharge visuelle**
\`\`\`
❌ Plus de 3 radars
❌ Plus de 3 séries par radar
✅ Garder simple et lisible
\`\`\`

**2. Échelles incompatibles**
\`\`\`
❌ Uptime % (99-100) vs Note (0-100)
✅ Normaliser ou adapter l'échelle min/max
\`\`\`

**3. Légende confuse**
\`\`\`
❌ Mélanger produits de catégories différentes
✅ Regrouper visuellement par couleur
\`\`\`

### 📋 Données pour ce graphique

\`\`\`javascript
// Smartphones
const smartphones = {
  produits: [
    { nom: 'iPhone 15 Pro', scores: [92, 88, 94, 96, 91] },
    { nom: 'Samsung S24 Ultra', scores: [88, 95, 89, 94, 96] }
  ],
  criteres: ['Design', 'Photo', 'Autonomie', 'Performance', 'Écran']
};

// Logiciels CRM
const logicielsCRM = {
  produits: [
    { nom: 'Salesforce', scores: [95, 78, 65, 92] },
    { nom: 'HubSpot', scores: [82, 95, 88, 78] }
  ],
  criteres: ['Fonctionnalités', 'Facilité', 'Prix', 'Support']
};

// Cloud Uptime (12 mois)
const cloudProviders = {
  produits: [
    { nom: 'AWS', uptime: [99.95, 99.98, ...] },
    { nom: 'Azure', uptime: [99.92, 99.95, ...] }
  ],
  mois: ['Jan', 'Fév', ..., 'Déc']
};
\`\`\`
`;

export default function MultipleRadar() {
  return (
    <ChartEditor
      title="Multiple Radar"
      section="Radar"
      option={option}
      notes={notes}
    />
  );
}
