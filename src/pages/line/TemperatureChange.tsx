import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Prévisions météo - Semaine du 2 au 8 décembre 2024",
    subtext: "Températures min/max pour Paris, Lyon et Marseille",
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
    trigger: "axis",
    formatter: function (params: unknown) {
      const p = params as Array<{
        seriesName: string;
        value: number;
        color: string;
        marker: string;
      }>;
      let result = `<b>${p[0] && "axisValue" in (p[0] as object) ? (p[0] as unknown as { axisValue: string }).axisValue : ""}</b><br/>`;
      p.forEach((item) => {
        result += `${item.marker} ${item.seriesName}: <b>${item.value}°C</b><br/>`;
      });
      return result;
    },
  },
  legend: {
    data: [
      "Paris (max)",
      "Paris (min)",
      "Lyon (max)",
      "Lyon (min)",
      "Marseille (max)",
      "Marseille (min)",
    ],
    top: 60,
    itemGap: 15,
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "12%",
    top: "22%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "Lun 02",
      "Mar 03",
      "Mer 04",
      "Jeu 05",
      "Ven 06",
      "Sam 07",
      "Dim 08",
    ],
    axisLabel: {
      fontSize: 11,
    },
  },
  yAxis: {
    type: "value",
    name: "Température (°C)",
    nameLocation: "middle",
    nameGap: 40,
    axisLabel: {
      formatter: "{value}°C",
    },
    min: -2,
    max: 18,
  },
  series: [
    {
      name: "Paris (max)",
      type: "line",
      data: [8, 9, 7, 5, 6, 8, 10],
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: "#e74c3c",
      },
      itemStyle: {
        color: "#e74c3c",
      },
      markPoint: {
        data: [
          {
            type: "min",
            name: "Min",
            label: {
              formatter: "{c}°C",
              fontSize: 10,
            },
          },
        ],
        symbolSize: 45,
      },
      markLine: {
        silent: true,
        data: [
          {
            type: "average",
            name: "Moyenne",
            label: {
              formatter: "Moy: {c}°C",
              fontSize: 9,
            },
          },
        ],
        lineStyle: {
          color: "#e74c3c",
          type: "dashed",
          opacity: 0.5,
        },
      },
    },
    {
      name: "Paris (min)",
      type: "line",
      data: [2, 3, 1, -1, 0, 2, 4],
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: "#e74c3c",
        type: "dashed",
      },
      itemStyle: {
        color: "#e74c3c",
      },
      markPoint: {
        data: [
          {
            type: "min",
            name: "Min",
            label: {
              formatter: "🥶 {c}°C",
              fontSize: 10,
            },
            itemStyle: {
              color: "#3498db",
            },
          },
        ],
        symbolSize: 50,
      },
    },
    {
      name: "Lyon (max)",
      type: "line",
      data: [6, 7, 5, 4, 5, 7, 9],
      smooth: true,
      symbol: "diamond",
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: "#27ae60",
      },
      itemStyle: {
        color: "#27ae60",
      },
    },
    {
      name: "Lyon (min)",
      type: "line",
      data: [0, 1, -1, -2, -1, 1, 3],
      smooth: true,
      symbol: "diamond",
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: "#27ae60",
        type: "dashed",
      },
      itemStyle: {
        color: "#27ae60",
      },
    },
    {
      name: "Marseille (max)",
      type: "line",
      data: [12, 13, 11, 10, 11, 14, 16],
      smooth: true,
      symbol: "triangle",
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: "#f39c12",
      },
      itemStyle: {
        color: "#f39c12",
      },
      markPoint: {
        data: [
          {
            type: "max",
            name: "Max",
            label: {
              formatter: "☀️ {c}°C",
              fontSize: 10,
            },
          },
        ],
        symbolSize: 50,
      },
    },
    {
      name: "Marseille (min)",
      type: "line",
      data: [6, 7, 5, 4, 5, 8, 10],
      smooth: true,
      symbol: "triangle",
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: "#f39c12",
        type: "dashed",
      },
      itemStyle: {
        color: "#f39c12",
      },
    },
  ],
  graphic: {
    type: "text",
    right: 20,
    bottom: 10,
    style: {
      text: "💡 markPoint et markLine : parfaits pour mettre en évidence\nles valeurs extrêmes et moyennes dans une série temporelle.",
      fontSize: 11,
      fill: "#666",
      backgroundColor: "#f5f5f5",
      padding: [6, 10],
      borderRadius: 4,
    },
  },
};

const notes = `
## 📚 Note pédagogique : Graphique multi-lignes avec marqueurs

### ✅ Quand utiliser ce type de diagramme

Ce type de graphique est idéal pour :

- **Comparer plusieurs séries temporelles** : évolution parallèle de 2 à 6 variables
- **Visualiser des plages de valeurs** : min/max, intervalles de confiance
- **Mettre en évidence des extrema** : utilisation de markPoint pour les pics et creux
- **Montrer des moyennes de référence** : markLine pour contextualiser les données
- **Données météorologiques** : prévisions multi-villes, historique climatique

**Exemples concrets :**
- Prévisions météo comparatives entre villes
- Cours de plusieurs actions sur la même période
- Métriques de performance de plusieurs serveurs
- Évolution des ventes par région

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce type de graphique dans ces cas :

- **Plus de 6 séries** : le graphique devient confus, préférez des small multiples
- **Séries avec des ordres de grandeur très différents** : utilisez deux axes Y ou normalisez
- **Données sans relation temporelle** : les lignes suggèrent une continuité
- **Comparaison de proportions** : préférez des stacked area ou pie charts

### 📊 Analyse de ce graphique

Ce graphique montre les prévisions météo pour trois villes françaises :

- **Marseille domine** : températures significativement plus élevées (max 16°C dimanche)
- **Paris et Lyon similaires** : écarts de 1-2°C en moyenne
- **Vague de froid jeudi** : toutes les villes atteignent leur minimum hebdomadaire
- **Amplitude thermique** : ~6°C à Paris, ~7°C à Lyon, ~6°C à Marseille

**Points techniques ECharts utilisés :**
- \`markPoint\` : met en évidence les extrema avec des annotations visuelles
- \`markLine\` : affiche la moyenne de la série
- \`smooth: true\` : lisse les courbes pour un rendu météo réaliste
- Symboles différents par ville : circle, diamond, triangle

**Recommandation** : Prévoir des vêtements chauds pour Lyon jeudi (-2°C attendus).
`;

export default function TemperatureChange() {
  return (
    <ChartEditor
      title="Temperature Change in the Coming Week"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
