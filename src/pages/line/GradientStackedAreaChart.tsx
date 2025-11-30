import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";
import * as echarts from "echarts";

const notes = `
## 📚 Note pédagogique : Graphique en aires empilées avec dégradé (Gradient Stacked Area Chart)

### ✅ Quand utiliser ce type de diagramme

Le graphique en aires empilées avec dégradé est idéal dans les situations suivantes :

- **Visualiser la composition d'un total avec esthétique soignée** : les dégradés ajoutent de la profondeur et de la lisibilité
- **Montrer l'évolution de plusieurs canaux/sources** : ventes, trafic, revenus par origine
- **Créer des dashboards exécutifs** : l'aspect visuel premium capte l'attention
- **Mettre en valeur les tendances** : les dégradés attirent l'œil vers les zones clés
- **Présenter des données à des non-experts** : aspect plus engageant qu'un graphique brut

**Exemples concrets :**

- Évolution des ventes e-commerce par canal (comme ici)
- Sources de revenus SaaS (abonnements, upsells, add-ons)
- Trafic marketing par origine (SEO, SEA, Social, Direct)
- Répartition du temps de travail par type de tâche
- Consommation de ressources cloud par service

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le graphique en aires empilées avec dégradé dans ces cas :

- **Données très techniques** : les dégradés peuvent distraire de l'analyse précise
- **Rapports réglementaires** : privilégiez un style sobre et factuel
- **Impression en noir et blanc** : les dégradés perdent leur lisibilité
- **Trop de catégories** (> 5-6) : les dégradés se chevauchent et créent de la confusion
- **Comparaison précise de valeurs** : les aires empilées rendent la lecture exacte difficile
- **Données négatives** : les aires ne gèrent pas les valeurs sous zéro

**Erreurs courantes à éviter :**

- Ne pas utiliser des couleurs de dégradé trop proches entre catégories
- Éviter les dégradés trop intenses qui fatiguent l'œil
- S'assurer que l'opacité permet de voir les couches inférieures
- Ne pas oublier la légende claire pour chaque canal

### 💡 Bonnes pratiques appliquées ici

- **Dégradés cohérents** : chaque canal a sa couleur distinctive avec transition vers le transparent
- **Ordre stratégique** : du canal le plus stable (App Mobile) au plus volatile (Marketplaces)
- **Insight actionnable** : le sous-titre révèle immédiatement la croissance mobile (+42%)
- **Annotations visuelles** : markPoint sur le pic Black Friday et markLine sur l'objectif
- **Tooltip enrichi** : pourcentages et totaux pour une lecture complète
`;

const option: EChartsOption = {
  title: {
    text: "Ventes e-commerce TechStore 2024",
    subtext:
      "📱 Le mobile explose : +42% YoY — Le canal App représente désormais 35% du CA",
    left: "center",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1f2937",
    },
    subtextStyle: {
      fontSize: 13,
      color: "#059669",
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
      p.forEach((item) => {
        total += item.value;
      });
      let result = `<strong>${p[0].axisValue}</strong><br/>`;
      p.forEach((item) => {
        const percentage = ((item.value / total) * 100).toFixed(1);
        result += `${item.marker} ${item.seriesName}: <strong>${item.value.toLocaleString("fr-FR")} €</strong> (${percentage}%)<br/>`;
      });
      result += `<hr style="margin: 4px 0; border-color: #e5e7eb"/>`;
      result += `<strong>Total: ${total.toLocaleString("fr-FR")} €</strong>`;
      return result;
    },
  },
  legend: {
    data: ["App Mobile", "Site Web", "Marketplaces", "Réseaux Sociaux"],
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
      name: "Ventes (k€)",
      nameTextStyle: {
        fontSize: 12,
        color: "#6b7280",
      },
      axisLabel: {
        formatter: (value: number) => `${(value / 1000).toFixed(0)}k €`,
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
      name: "App Mobile",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.9,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgb(16, 185, 129)" },
          { offset: 1, color: "rgba(16, 185, 129, 0.1)" },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [
        42000, 45000, 48000, 52000, 55000, 58000, 54000, 51000, 62000, 68000,
        95000, 78000,
      ],
    },
    {
      name: "Site Web",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.9,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgb(59, 130, 246)" },
          { offset: 1, color: "rgba(59, 130, 246, 0.1)" },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [
        65000, 62000, 58000, 55000, 52000, 48000, 45000, 42000, 55000, 58000,
        72000, 68000,
      ],
    },
    {
      name: "Marketplaces",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.9,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgb(249, 115, 22)" },
          { offset: 1, color: "rgba(249, 115, 22, 0.1)" },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [
        28000, 26000, 25000, 24000, 23000, 22000, 21000, 20000, 24000, 27000,
        45000, 35000,
      ],
    },
    {
      name: "Réseaux Sociaux",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.9,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgb(168, 85, 247)" },
          { offset: 1, color: "rgba(168, 85, 247, 0.1)" },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [
        15000, 16000, 18000, 20000, 22000, 25000, 28000, 24000, 26000, 28000,
        38000, 32000,
      ],
      markPoint: {
        symbol: "pin",
        symbolSize: 50,
        data: [
          {
            coord: [10, 250000],
            name: "Black Friday",
            value: "250k€",
            label: {
              formatter: "Black\nFriday",
              fontSize: 9,
              color: "#fff",
            },
            itemStyle: { color: "#dc2626" },
          },
        ],
      },
      markLine: {
        silent: true,
        lineStyle: {
          color: "#059669",
          type: "dashed",
          width: 2,
        },
        data: [
          {
            yAxis: 200000,
            label: {
              formatter: "Objectif mensuel (200k€)",
              position: "insideEndTop",
              fontSize: 11,
              color: "#059669",
            },
          },
        ],
      },
    },
  ],
};

export default function GradientStackedAreaChart() {
  return (
    <ChartEditor
      title="Gradient Stacked Area Chart"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
