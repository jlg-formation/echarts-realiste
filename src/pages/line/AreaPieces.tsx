import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Suivi du stock de paracétamol 500mg - Pharmacie centrale",
    subtext: "Novembre 2024 - Alertes de réapprovisionnement automatiques",
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
        axisValue: string;
        value: number;
        marker: string;
      }>;
      const item = p[0];
      let status = "✅ Stock normal";
      let color = "#27ae60";
      if (item.value <= 50) {
        status = "🚨 RUPTURE CRITIQUE";
        color = "#c0392b";
      } else if (item.value <= 150) {
        status = "⚠️ Stock faible - Réappro urgent";
        color = "#e67e22";
      } else if (item.value <= 300) {
        status = "📦 Seuil de réapprovisionnement";
        color = "#f39c12";
      }
      return `<b>${item.axisValue}</b><br/>
              ${item.marker} Stock: <b>${item.value} unités</b><br/>
              <span style="color: ${color}; font-weight: bold;">${status}</span>`;
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "15%",
    top: "18%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "01/11",
      "03/11",
      "05/11",
      "07/11",
      "09/11",
      "11/11",
      "13/11",
      "15/11",
      "17/11",
      "19/11",
      "21/11",
      "23/11",
      "25/11",
      "27/11",
      "29/11",
    ],
    axisLabel: {
      fontSize: 10,
    },
  },
  yAxis: {
    type: "value",
    name: "Quantité en stock",
    nameLocation: "middle",
    nameGap: 50,
    min: 0,
    max: 600,
    axisLabel: {
      formatter: "{value} u.",
    },
  },
  visualMap: {
    show: true,
    type: "piecewise",
    pieces: [
      {
        gt: 300,
        lte: 600,
        color: "#27ae60",
        label: "Stock normal (> 300)",
      },
      {
        gt: 150,
        lte: 300,
        color: "#f39c12",
        label: "Réappro recommandé (150-300)",
      },
      {
        gt: 50,
        lte: 150,
        color: "#e67e22",
        label: "Stock faible (50-150)",
      },
      {
        gte: 0,
        lte: 50,
        color: "#c0392b",
        label: "Rupture critique (≤ 50)",
      },
    ],
    orient: "horizontal",
    bottom: 10,
    left: "center",
    textStyle: {
      fontSize: 10,
    },
  },
  series: [
    {
      name: "Stock paracétamol",
      type: "line",
      smooth: false,
      symbol: "circle",
      symbolSize: 6,
      sampling: "lttb",
      areaStyle: {},
      lineStyle: {
        width: 2,
      },
      data: [
        480, 420, 380, 340, 290, 250, 200, 180, 140, 100, 70, 45, 520, 470, 410,
      ],
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: {
          type: "dashed",
          width: 2,
        },
        data: [
          {
            yAxis: 300,
            label: {
              formatter: "Seuil réappro: 300",
              position: "insideEndTop",
              fontSize: 10,
              color: "#f39c12",
            },
            lineStyle: {
              color: "#f39c12",
            },
          },
          {
            yAxis: 150,
            label: {
              formatter: "Alerte stock faible: 150",
              position: "insideEndTop",
              fontSize: 10,
              color: "#e67e22",
            },
            lineStyle: {
              color: "#e67e22",
            },
          },
          {
            yAxis: 50,
            label: {
              formatter: "⚠️ RUPTURE: 50",
              position: "insideEndTop",
              fontSize: 10,
              color: "#c0392b",
              fontWeight: "bold",
            },
            lineStyle: {
              color: "#c0392b",
            },
          },
        ],
      },
      markPoint: {
        data: [
          {
            name: "Rupture",
            coord: ["23/11", 45],
            value: "RUPTURE",
            symbol: "pin",
            symbolSize: 50,
            itemStyle: {
              color: "#c0392b",
            },
            label: {
              formatter: "⚠️",
              fontSize: 14,
            },
          },
          {
            name: "Réappro",
            coord: ["25/11", 520],
            value: "+475",
            symbol: "pin",
            symbolSize: 50,
            itemStyle: {
              color: "#27ae60",
            },
            label: {
              formatter: "📦",
              fontSize: 14,
            },
          },
        ],
      },
    },
  ],
  graphic: {
    type: "text",
    right: 20,
    top: 85,
    style: {
      text: "💡 visualMap piecewise : colore automatiquement\nles zones selon des seuils prédéfinis.",
      fontSize: 11,
      fill: "#666",
      backgroundColor: "#f5f5f5",
      padding: [6, 10],
      borderRadius: 4,
    },
  },
};

const notes = `
## 📚 Note pédagogique : Area Chart avec zones colorées (Pieces)

### ✅ Quand utiliser ce type de diagramme

Ce type de graphique est idéal pour :

- **Visualiser des seuils critiques** : zones de danger, alertes, objectifs
- **Suivi de stock et inventaire** : niveaux min/max, seuils de réapprovisionnement
- **Monitoring système** : utilisation CPU, mémoire, bande passante
- **Données médicales** : glycémie, tension artérielle, température corporelle
- **Qualité de l'air ou de l'eau** : indices avec zones de risque

**Caractéristiques techniques :**
- \`visualMap.piecewise\` : définit des plages de couleurs automatiques
- \`areaStyle\` : remplit la zone sous la courbe
- \`markLine\` : affiche les seuils de référence

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce type de graphique dans ces cas :

- **Données sans seuils significatifs** : les zones colorées n'auront pas de sens
- **Comparaison de plusieurs séries** : les couleurs par zone entrent en conflit
- **Données catégorielles** : utilisez plutôt des barres colorées
- **Trop de zones** (> 5) : devient difficile à interpréter

### 📊 Analyse de ce graphique

Ce graphique montre le suivi de stock d'un médicament essentiel :

- **Tendance baissière du 01 au 23/11** : consommation régulière de ~30 unités/jour
- **Rupture critique le 23/11** : stock tombé à 45 unités (< seuil de 50)
- **Réapprovisionnement le 25/11** : +475 unités, retour en zone verte
- **4 zones de couleur** :
  - 🟢 Vert (> 300) : stock confortable
  - 🟡 Jaune (150-300) : commande à prévoir
  - 🟠 Orange (50-150) : réappro urgent
  - 🔴 Rouge (≤ 50) : rupture, situation critique

**Enseignements métier :**
- Le seuil de réapprovisionnement (300) a été franchi le 07/11
- La commande n'a été passée que tardivement → rupture évitée de justesse
- **Recommandation** : automatiser la commande dès franchissement du seuil jaune

**Fonctionnalités ECharts utilisées :**
- \`visualMap.piecewise\` : définition des zones colorées
- \`markLine\` : lignes horizontales de seuil
- \`markPoint\` : annotation des événements clés (rupture, réappro)
`;

export default function AreaPieces() {
  return (
    <ChartEditor
      title="Area Pieces"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
