import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const notes = `
## 📚 Note pédagogique : Graphique en aires empilées (Stacked Area Chart)

### ✅ Quand utiliser ce type de diagramme

Le graphique en aires empilées est idéal dans les situations suivantes :

- **Visualiser la composition d'un total sur le temps** : voir comment chaque partie contribue à l'ensemble
- **Montrer les tendances cumulées** : évolution simultanée de plusieurs catégories formant un tout
- **Comparer les proportions relatives** : identifier quelle catégorie domine à quel moment
- **Mettre en évidence les variations saisonnières** : patterns récurrents par période
- **Illustrer des flux ou des consommations** : énergie, budget, trafic, effectifs

**Exemples concrets :**

- Répartition de la consommation électrique par secteur (comme ici)
- Évolution des parts de marché de plusieurs concurrents
- Sources de revenus d'une entreprise sur plusieurs années
- Trafic web par canal d'acquisition (SEO, publicité, réseaux sociaux)
- Répartition du temps de travail par type d'activité

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le graphique en aires empilées dans ces cas :

- **Données non additives** : si les catégories ne forment pas un total logique
- **Trop de catégories** (> 5-6) : le graphique devient illisible, préférez des small multiples
- **Valeurs très différentes** : si une catégorie écrase visuellement les autres
- **Comparaison précise de valeurs** : difficile de comparer des aires non alignées sur la même base
- **Données négatives** : les aires empilées ne gèrent pas bien les valeurs négatives
- **Données discontinues** : préférez un diagramme en barres empilées

**Erreurs courantes à éviter :**

- Ne pas empiler des données qui n'ont pas de relation "partie d'un tout"
- Éviter les couleurs trop proches qui rendent les aires difficiles à distinguer
- Ne pas oublier la légende pour identifier chaque catégorie
- Attention à l'ordre d'empilement : placer les catégories les plus stables en bas

### 💡 Bonnes pratiques appliquées ici

- **Ordre logique** : secteurs classés par importance structurelle
- **Palette de couleurs distinctes** : chaque secteur est facilement identifiable
- **Seuil d'alerte visualisé** : ligne de référence RTE à 75 GW
- **Tooltip enrichi** : affiche les valeurs et pourcentages de chaque secteur
- **Pic mis en évidence** : le record hivernal est marqué visuellement
`;

const option: EChartsOption = {
  title: {
    text: "Consommation électrique France 2024",
    subtext:
      "⚡ Pic hivernal à 89 GW le 15 janvier - L'industrie représente 25% de la consommation",
    left: "center",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1f2937",
    },
    subtextStyle: {
      fontSize: 13,
      color: "#dc2626",
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6b7280",
      },
    },
    formatter: (params: unknown) => {
      const p = params as Array<{
        axisValue: string;
        marker: string;
        seriesName: string;
        value: number;
      }>;
      let total = 0;
      let result = `<strong>${p[0].axisValue}</strong><br/>`;
      p.forEach((item) => {
        total += item.value;
        const percentage = ((item.value / 89) * 100).toFixed(1);
        result += `${item.marker} ${item.seriesName}: <strong>${item.value} GW</strong> (${percentage}%)<br/>`;
      });
      result += `<hr style="margin: 4px 0; border-color: #e5e7eb"/>`;
      result += `<strong>Total: ${total.toFixed(1)} GW</strong>`;
      return result;
    },
  },
  legend: {
    data: ["Résidentiel", "Tertiaire", "Industrie", "Transport", "Agriculture"],
    top: 65,
    textStyle: {
      fontSize: 12,
      color: "#374151",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {
        title: "Télécharger",
      },
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "12%",
    top: 120,
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      name: "Mois 2024",
      nameLocation: "middle",
      nameGap: 35,
      nameTextStyle: {
        fontSize: 12,
        color: "#6b7280",
        fontStyle: "italic",
      },
      axisLabel: {
        fontSize: 11,
        color: "#374151",
      },
      data: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Puissance (GW)",
      nameTextStyle: {
        fontSize: 12,
        color: "#6b7280",
      },
      axisLabel: {
        formatter: "{value} GW",
        fontSize: 11,
        color: "#374151",
      },
      splitLine: {
        lineStyle: {
          color: "#e5e7eb",
          type: "dashed",
        },
      },
    },
  ],
  series: [
    {
      name: "Résidentiel",
      type: "line",
      stack: "Total",
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: "#3b82f6",
      },
      lineStyle: {
        width: 2,
      },
      data: [32, 30, 26, 20, 16, 14, 13, 13, 16, 22, 28, 31],
    },
    {
      name: "Tertiaire",
      type: "line",
      stack: "Total",
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: "#10b981",
      },
      lineStyle: {
        width: 2,
      },
      data: [18, 17, 16, 14, 13, 14, 15, 12, 14, 15, 17, 18],
    },
    {
      name: "Industrie",
      type: "line",
      stack: "Total",
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: "#f59e0b",
      },
      lineStyle: {
        width: 2,
      },
      data: [22, 22, 21, 20, 19, 18, 15, 12, 19, 21, 22, 20],
    },
    {
      name: "Transport",
      type: "line",
      stack: "Total",
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: "#8b5cf6",
      },
      lineStyle: {
        width: 2,
      },
      data: [12, 12, 11, 11, 10, 10, 11, 9, 10, 11, 12, 12],
    },
    {
      name: "Agriculture",
      type: "line",
      stack: "Total",
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: "#84cc16",
      },
      lineStyle: {
        width: 2,
      },
      label: {
        show: false,
      },
      data: [5, 4, 4, 5, 6, 6, 5, 4, 5, 5, 5, 5],
      markPoint: {
        symbol: "pin",
        symbolSize: 50,
        data: [
          {
            coord: [0, 89],
            name: "Pic hivernal",
            value: "89 GW",
            label: {
              formatter: "89 GW",
              fontSize: 10,
              color: "#fff",
            },
            itemStyle: { color: "#dc2626" },
          },
        ],
      },
      markLine: {
        silent: true,
        lineStyle: {
          color: "#dc2626",
          type: "dashed",
          width: 2,
        },
        data: [
          {
            yAxis: 75,
            label: {
              formatter: "Seuil d'alerte RTE (75 GW)",
              position: "insideEndTop",
              fontSize: 11,
              color: "#dc2626",
            },
          },
        ],
      },
    },
  ],
};

export default function StackedAreaChart() {
  return (
    <ChartEditor
      title="Stacked Area Chart"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
