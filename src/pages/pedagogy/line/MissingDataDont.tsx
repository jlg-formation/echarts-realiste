import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Température moyenne mensuelle à Lyon - 2024
// Avec données manquantes (capteur défaillant en mars et août)
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

// Données avec valeurs manquantes remplacées par 0 (mauvaise pratique)
const temperaturesAvecZeros = [
  4.2, 5.8, 0, 12.5, 17.3, 22.1, 25.4, 0, 19.8, 14.2, 8.5, 5.1,
];

const option: EChartsOption = {
  title: {
    text: "Température moyenne mensuelle - Lyon 2024",
    subtext: "⚠️ Données manquantes remplacées par 0 = courbe trompeuse !",
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
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      const value = p[0].value;
      if (value === 0) {
        return `<b>${p[0].name}</b><br/>Température : <b style="color:#dc2626">DONNÉE MANQUANTE</b>`;
      }
      return `<b>${p[0].name}</b><br/>Température : <b>${value}°C</b>`;
    },
  },
  grid: {
    left: 70,
    right: 30,
    bottom: 60,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: mois,
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    name: "Température (°C)",
    nameLocation: "middle",
    nameGap: 50,
    min: -5,
    max: 30,
    axisLabel: {
      formatter: "{value}°C",
    },
  },
  series: [
    {
      name: "Température",
      type: "line",
      data: temperaturesAvecZeros,
      smooth: true,
      lineStyle: {
        width: 3,
        color: "#ef4444",
      },
      itemStyle: {
        color: "#ef4444",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(239, 68, 68, 0.3)" },
            { offset: 1, color: "rgba(239, 68, 68, 0.05)" },
          ],
        },
      },
      symbol: "circle",
      symbolSize: 8,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Données manquantes

### ❌ Pourquoi c'est une mauvaise pratique

Remplacer les données manquantes par **0** crée une **visualisation trompeuse** :

**Ce que le graphique suggère :**
- En mars et août, la température était de **0°C**
- Il y a eu des **chutes brutales** de température
- Ces mois étaient **exceptionnellement froids**

**La réalité :**
- Le capteur était simplement **défaillant** ces mois-là
- Mars à Lyon tourne plutôt autour de **10-12°C**
- Août est normalement le mois le **plus chaud** (~25-26°C)

**Problèmes concrets :**
- Un climatologue pourrait penser à une anomalie météorologique
- Des décisions de gestion énergétique seraient faussées
- L'analyse de tendance est complètement biaisée

### 🔧 Alternatives au remplacement par 0

| Méthode | Quand l'utiliser |
|---------|-----------------|
| **null/undefined** | Crée une rupture dans la ligne (honnête) |
| **Interpolation** | Si les données manquantes sont estimables |
| **Indicateur visuel** | Marquer clairement les zones sans données |
| **Exclusion** | Retirer complètement les points manquants |

### 📊 Solution

Voir la version "Do" avec une gestion honnête des données manquantes.
`;

export default function MissingDataDont() {
  return (
    <ChartEditor
      title="❌ Données manquantes = 0 (mauvaise pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
