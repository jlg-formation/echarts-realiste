import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Mix énergétique de la France - 2024
const energies = [
  {
    source: "Nucléaire",
    production: 320,
    unite: "TWh",
    emission: 6,
    icone: "⚛️",
    couleur: "#8b5cf6",
    tendance: "stable",
  },
  {
    source: "Hydraulique",
    production: 58,
    unite: "TWh",
    emission: 24,
    icone: "💧",
    couleur: "#3b82f6",
    tendance: "variable",
  },
  {
    source: "Éolien",
    production: 52,
    unite: "TWh",
    emission: 11,
    icone: "🌬️",
    couleur: "#22c55e",
    tendance: "hausse",
  },
  {
    source: "Gaz naturel",
    production: 38,
    unite: "TWh",
    emission: 490,
    icone: "🔥",
    couleur: "#f59e0b",
    tendance: "baisse",
  },
  {
    source: "Solaire",
    production: 22,
    unite: "TWh",
    emission: 32,
    icone: "☀️",
    couleur: "#fbbf24",
    tendance: "hausse",
  },
  {
    source: "Bioénergies",
    production: 12,
    unite: "TWh",
    emission: 45,
    icone: "🌱",
    couleur: "#10b981",
    tendance: "hausse",
  },
  {
    source: "Charbon",
    production: 3,
    unite: "TWh",
    emission: 1000,
    icone: "🪨",
    couleur: "#374151",
    tendance: "baisse",
  },
  {
    source: "Fioul",
    production: 2,
    unite: "TWh",
    emission: 730,
    icone: "🛢️",
    couleur: "#1f2937",
    tendance: "baisse",
  },
];

const totalProduction = energies.reduce((acc, e) => acc + e.production, 0);
const partBassesEmissions = (
  (energies
    .filter((e) => e.emission < 50)
    .reduce((acc, e) => acc + e.production, 0) /
    totalProduction) *
  100
).toFixed(0);

const option: EChartsOption = {
  title: {
    text: "Mix énergétique français",
    subtext: `Production électrique 2024 · ${totalProduction} TWh · ${partBassesEmissions} % bas-carbone`,
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
      const p = params as { name: string; value: number; percent: number };
      const energie = energies.find((e) => e.source === p.name);
      if (!energie) return "";
      const emissionColor =
        energie.emission < 50
          ? "#22c55e"
          : energie.emission < 200
            ? "#f59e0b"
            : "#ef4444";
      const tendanceIcon =
        energie.tendance === "hausse"
          ? "📈"
          : energie.tendance === "baisse"
            ? "📉"
            : "➡️";
      const emissionIcon = energie.emission < 50 ? "🌿" : "💨";
      return `
        <b>${energie.icone} ${p.name}</b><br/><br/>
        Production : <b>${energie.production} TWh</b> (${p.percent.toFixed(1)} %)<br/>
        <span style="color: ${emissionColor}">${emissionIcon} CO₂ : ${energie.emission} g/kWh</span><br/>
        Tendance : ${tendanceIcon} ${energie.tendance}
      `;
    },
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
    textStyle: {
      fontSize: 11,
    },
    formatter: (name: string) => {
      const energie = energies.find((e) => e.source === name);
      return energie ? `${energie.icone} ${name}` : name;
    },
  },
  series: [
    {
      name: "Mix énergétique",
      type: "pie",
      radius: ["20%", "70%"],
      center: ["55%", "55%"],
      roseType: "radius",
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 5,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number };
          const energie = energies.find((e) => e.source === p.name);
          return `${energie?.icone || ""} ${p.name}\n${p.value} TWh`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.4)",
        },
      },
      data: energies.map((e, index) => ({
        value: e.production,
        name: e.source,
        itemStyle: {
          color: e.couleur,
          shadowBlur: index === 0 ? 20 : 0,
          shadowColor: index === 0 ? "rgba(139, 92, 246, 0.5)" : "transparent",
        },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Customized Pie Chart (Nightingale/Rose)

### ✅ Quand utiliser ce type de diagramme

Le pie chart personnalisé (style rose/nightingale) est parfait pour :

- **Mettre en valeur les écarts** : le rayon variable accentue les différences
- **Données avec une source dominante** : mise en valeur visuelle naturelle
- **Storytelling impactant** : format original qui attire l'œil
- **Mix énergétique, composition** : adapté aux données de production
- **Rapports exécutifs** : design distinctif

**Exemples concrets :**
- Mix énergétique d'un pays
- Composition d'un portefeuille d'investissement
- Répartition des ventes par catégorie
- Sources de revenus avec dominant

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce style dans ces cas :

- **Comparaisons précises** : le rayon variable peut biaiser la perception
- **Valeurs très proches** : les différences seront exagérées visuellement
- **Public non familier** : format moins intuitif qu'un pie classique
- **Données négatives** : impossible à représenter

### 🔧 Fonctionnalités ECharts utilisées

- **roseType: "radius"** : le rayon varie selon la valeur (effet Nightingale)
- **radius: ["20%", "70%"]** : doughnut avec trou central
- **borderRadius: 5** : coins arrondis pour style moderne
- **shadowBlur** : ombre sur le segment dominant
- **emphasis.shadowBlur: 20** : effet de survol prononcé

### 📊 Analyse de ce graphique

Ce graphique présente le mix énergétique français pour la production électrique 2024 :

- **⚛️ Nucléaire dominant** : 63 % de la production (320 TWh)
- **🌿 91 % bas-carbone** : l'un des mix les plus propres au monde
- **📈 ENR en croissance** : éolien + solaire = 15 % (vs 5 % en 2015)
- **📉 Fossiles en déclin** : gaz + charbon + fioul < 9 %

**Émissions CO₂ par source :**
| Source | g CO₂/kWh | Classification |
|--------|-----------|----------------|
| Nucléaire | 6 | 🌿 Très bas |
| Éolien | 11 | 🌿 Très bas |
| Hydraulique | 24 | 🌿 Très bas |
| Solaire | 32 | 🌿 Bas |
| Gaz | 490 | 💨 Élevé |
| Charbon | 1000 | 💨 Très élevé |

**Comparaison internationale :**
| Pays | % bas-carbone | Dominante |
|------|---------------|-----------|
| France | 91 % | Nucléaire |
| Suède | 98 % | Hydro + Nucléaire |
| Allemagne | 55 % | Éolien + Charbon |
| Pologne | 20 % | Charbon |

### 🎯 Enjeux et perspectives

1. **Prolongation du parc nucléaire** : 56 réacteurs à maintenir
2. **Développement ENR** : objectif 40 % en 2030
3. **Sortie du charbon** : quasi-achevée
4. **Flexibilité réseau** : gestion de l'intermittence solaire/éolien

### 💡 Tips design roseType

- Le \`roseType: "radius"\` fait varier le rayon selon la valeur
- \`roseType: "area"\` fait varier l'aire (différence plus subtile)
- Utilisez des **ombres** pour mettre en valeur le segment principal
- Les **icônes dans les labels** rendent la lecture plus intuitive
`;

export default function CustomizedPie() {
  return (
    <ChartEditor
      title="Customized Pie"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
