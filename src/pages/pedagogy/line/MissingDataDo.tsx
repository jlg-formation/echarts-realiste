import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Température moyenne mensuelle à Lyon - 2024
// Avec données manquantes correctement gérées
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

// Données avec valeurs manquantes (null = rupture dans la ligne)
const temperaturesAvecNull = [
  4.2,
  5.8,
  null,
  12.5,
  17.3,
  22.1,
  25.4,
  null,
  19.8,
  14.2,
  8.5,
  5.1,
];

// Données interpolées pour référence visuelle
const temperaturesInterpolees = [
  null,
  null,
  9.2, // Moyenne de Fév (5.8) et Avr (12.5)
  null,
  null,
  null,
  null,
  22.6, // Moyenne de Juil (25.4) et Sep (19.8)
  null,
  null,
  null,
  null,
];

const option: EChartsOption = {
  title: {
    text: "Température moyenne mensuelle - Lyon 2024",
    subtext: "✅ Données manquantes signalées · Estimations en pointillés",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#16a34a",
    },
  },
  tooltip: {
    trigger: "axis",
    formatter: (params: unknown) => {
      const p = params as {
        seriesName: string;
        name: string;
        value: number | null;
        color: string;
      }[];

      let html = `<b>${p[0]?.name || ""}</b><br/>`;

      p.forEach((item) => {
        if (item.value !== null && item.value !== undefined) {
          const isEstimation = item.seriesName === "Estimation";
          const label = isEstimation
            ? "Estimation (interpolée)"
            : "Température mesurée";
          html += `<span style="color:${item.color}">●</span> ${label}: <b>${item.value}°C</b>`;
          if (isEstimation) {
            html += ` <i style="color:#9ca3af">(capteur défaillant)</i>`;
          }
          html += "<br/>";
        }
      });

      if (p.every((item) => item.value === null || item.value === undefined)) {
        html += `<span style="color:#dc2626">⚠️ Donnée non disponible</span>`;
      }

      return html;
    },
  },
  legend: {
    data: ["Température mesurée", "Estimation"],
    bottom: 0,
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 70,
    right: 30,
    bottom: 50,
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
    min: 0,
    max: 30,
    axisLabel: {
      formatter: "{value}°C",
    },
  },
  series: [
    {
      name: "Température mesurée",
      type: "line",
      data: temperaturesAvecNull,
      smooth: true,
      connectNulls: false, // ✅ Ne pas connecter par-dessus les nulls
      lineStyle: {
        width: 3,
        color: "#3b82f6",
      },
      itemStyle: {
        color: "#3b82f6",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
            { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
          ],
        },
      },
      symbol: "circle",
      symbolSize: 8,
    },
    {
      name: "Estimation",
      type: "line",
      data: temperaturesInterpolees,
      lineStyle: {
        width: 2,
        color: "#9ca3af",
        type: "dashed",
      },
      itemStyle: {
        color: "#9ca3af",
        borderColor: "#fff",
        borderWidth: 2,
      },
      symbol: "diamond",
      symbolSize: 10,
    },
  ],
  // Zones grisées pour les périodes sans données
  visualMap: {
    show: false,
    pieces: [{ min: 0, max: 30, color: "#3b82f6" }],
  },
};

const notes = `
## 📚 Note pédagogique : Gestion honnête des données manquantes

### ✅ Pourquoi c'est une bonne pratique

Ce graphique montre **plusieurs techniques** pour gérer les données manquantes de manière transparente :

**1. Rupture de la courbe (connectNulls: false)**
- La ligne s'interrompt là où il n'y a pas de données
- Le lecteur voit immédiatement qu'il manque quelque chose
- Pas de fausse impression de continuité

**2. Valeurs interpolées en pointillés**
- Les estimations sont clairement différenciées
- Symbole différent (losange vs cercle)
- Couleur grise = "à prendre avec précaution"

**3. Tooltip informatif**
- Indique explicitement "capteur défaillant"
- Distingue mesures réelles et estimations

### 📊 Techniques utilisées

| Élément | Signification |
|---------|--------------|
| Ligne pleine bleue | Données réelles mesurées |
| Ligne pointillée grise | Estimation par interpolation |
| Rupture de ligne | Donnée non disponible |
| Losange gris | Valeur interpolée (incertaine) |

### 🎯 Messages clairs transmis

1. **Mars et août** : problème de capteur (pas d'anomalie météo)
2. **Les estimations sont raisonnables** mais incertaines
3. **Le reste des données est fiable**

### 💡 Bonnes pratiques appliquées

- **Transparence** : les lacunes sont visibles
- **Distinction visuelle** : réel vs estimé
- **Interpolation raisonnable** : moyenne des valeurs adjacentes
- **Documentation** : tooltip explicatif
`;

export default function MissingDataDo() {
  return (
    <ChartEditor
      title="✅ Données manquantes signalées (bonne pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
