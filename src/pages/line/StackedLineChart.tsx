import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Sources de trafic e-commerce - Black Friday 2024",
    subtext:
      "📈 +85% de trafic total le vendredi : le SEO représente 47% des visites",
    left: "center",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1f2937",
    },
    subtextStyle: {
      fontSize: 13,
      color: "#059669",
      fontWeight: "500",
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
        result += `${item.marker} ${item.seriesName}: <strong>${item.value.toLocaleString("fr-FR")}</strong> visites<br/>`;
      });
      result += `<hr style="margin: 4px 0; border-color: #e5e7eb"/>`;
      result += `<strong>Total: ${total.toLocaleString("fr-FR")} visites</strong>`;
      return result;
    },
  },
  legend: {
    data: [
      "Newsletter",
      "Réseaux sociaux",
      "Publicité vidéo",
      "Accès direct",
      "Recherche Google",
    ],
    top: 65,
    textStyle: {
      fontSize: 12,
      color: "#374151",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "12%",
    top: 120,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    name: "Novembre 2024",
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
      "Lun 25",
      "Mar 26",
      "Mer 27",
      "Jeu 28",
      "Ven 29\n(Black Friday)",
      "Sam 30",
      "Dim 01/12",
    ],
  },
  yAxis: {
    type: "value",
    name: "Visites",
    nameTextStyle: {
      fontSize: 12,
      color: "#6b7280",
    },
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000) {
          return (value / 1000).toFixed(0) + "k";
        }
        return value.toString();
      },
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
  series: [
    {
      name: "Newsletter",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: { width: 2 },
      showSymbol: false,
      areaStyle: { opacity: 0.7 },
      emphasis: { focus: "series" },
      itemStyle: { color: "#8b5cf6" },
      data: [1200, 1320, 1450, 1680, 2100, 1850, 1420],
    },
    {
      name: "Réseaux sociaux",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: { width: 2 },
      showSymbol: false,
      areaStyle: { opacity: 0.7 },
      emphasis: { focus: "series" },
      itemStyle: { color: "#f59e0b" },
      data: [2200, 2450, 2680, 3120, 4200, 3850, 2940],
    },
    {
      name: "Publicité vidéo",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: { width: 2 },
      showSymbol: false,
      areaStyle: { opacity: 0.7 },
      emphasis: { focus: "series" },
      itemStyle: { color: "#ec4899" },
      data: [1500, 1780, 2010, 2340, 3800, 3450, 2680],
    },
    {
      name: "Accès direct",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: { width: 2 },
      showSymbol: false,
      areaStyle: { opacity: 0.7 },
      emphasis: { focus: "series" },
      itemStyle: { color: "#06b6d4" },
      data: [3200, 3520, 3780, 4120, 5400, 4850, 3920],
    },
    {
      name: "Recherche Google",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: { width: 2 },
      showSymbol: false,
      areaStyle: { opacity: 0.7 },
      emphasis: { focus: "series" },
      itemStyle: { color: "#10b981" },
      data: [8200, 9120, 9850, 10800, 14500, 13200, 11400],
      markPoint: {
        symbol: "pin",
        symbolSize: 50,
        data: [
          {
            type: "max",
            name: "Pic",
            label: {
              formatter: "14.5k",
              fontSize: 10,
              color: "#fff",
            },
          },
        ],
        itemStyle: { color: "#059669" },
      },
    },
  ],
  graphic: [
    {
      type: "text",
      left: "center",
      bottom: 10,
      style: {
        text: "💡 Recommandation : Renforcer les campagnes SEO et newsletter avant les pics de vente",
        fontSize: 12,
        fill: "#6b7280",
        fontStyle: "italic",
      },
    },
  ],
};

export default function StackedLineChart() {
  return (
    <ChartEditor title="Stacked Line Chart" section="Line" option={option} />
  );
}
