import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

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
  graphic: [
    {
      type: "text",
      left: "center",
      bottom: 10,
      style: {
        text: "📊 Source: RTE France - Bilan électrique national | 💡 Conseil: privilégier les heures creuses pour réduire la facture",
        fontSize: 11,
        fill: "#6b7280",
        fontStyle: "italic",
      },
    },
  ],
};

export default function StackedAreaChart() {
  return (
    <ChartEditor title="Stacked Area Chart" section="Line" option={option} />
  );
}
