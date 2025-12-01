import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Taux de satisfaction client par équipe support - T4 2024
// Toutes les équipes ont un bon score (entre 82% et 94%)
const equipes = [
  "Équipe Nord",
  "Équipe Sud",
  "Équipe Est",
  "Équipe Ouest",
  "Équipe Centre",
];
const satisfaction = [94.2, 91.5, 88.7, 85.3, 82.1];

const option: EChartsOption = {
  title: {
    text: "Satisfaction client par équipe support - T4 2024",
    subtext: "⚠️ Attention : cet axe est tronqué (commence à 80%) !",
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
    axisPointer: {
      type: "shadow",
    },
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      return `<b>${p[0].name}</b><br/>Satisfaction : <b>${p[0].value} %</b>`;
    },
  },
  grid: {
    left: 100,
    right: 40,
    bottom: 60,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: equipes,
    axisLabel: {
      fontSize: 11,
      rotate: 15,
    },
  },
  yAxis: {
    type: "value",
    name: "Taux de satisfaction (%)",
    nameLocation: "middle",
    nameGap: 60,
    min: 80, // ❌ Axe tronqué à 80% !
    max: 96,
    interval: 2,
    axisLabel: {
      formatter: "{value} %",
    },
  },
  series: [
    {
      name: "Satisfaction",
      type: "bar",
      data: satisfaction.map((value) => ({
        value,
        itemStyle: {
          color: value >= 90 ? "#22c55e" : value >= 85 ? "#eab308" : "#ef4444",
          borderRadius: [4, 4, 0, 0],
        },
      })),
      label: {
        show: true,
        position: "top",
        formatter: "{c} %",
        fontSize: 11,
        fontWeight: "bold",
      },
      barWidth: "60%",
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Axe Y tronqué

### ❌ Pourquoi c'est une mauvaise pratique

Un axe Y commençant à 80% au lieu de 0% **exagère visuellement les différences** entre les valeurs :

**Ce que le graphique suggère visuellement :**
- L'Équipe Centre (82.1%) semble avoir un score **catastrophique**
- L'Équipe Nord (94.2%) semble **5x meilleure** que l'Équipe Centre
- Les couleurs rouge/jaune/vert renforcent cette impression faussée

**La réalité des données :**
- Toutes les équipes ont un **excellent score** (> 80% de satisfaction)
- L'écart réel entre la meilleure et la moins bonne n'est que de **12 points**
- L'Équipe Centre à 82.1% reste une **très bonne performance**

**Problèmes concrets :**
- Un manager pourrait sanctionner injustement l'Équipe Centre
- L'Équipe Nord pourrait être survalorisée pour un écart marginal
- Les décisions RH seraient basées sur une perception faussée

### 🔧 Quand un axe tronqué est acceptable

- Données boursières (variations de quelques % sur un cours)
- Températures (0°C n'est pas un minimum naturel)
- **À condition d'indiquer TRÈS clairement** que l'axe est tronqué

### 📊 Solution

Voir la version "Do" avec un axe commençant à 0%.
`;

export default function TruncatedAxisDont() {
  return (
    <ChartEditor
      title="❌ Axe Y tronqué (mauvaise pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
