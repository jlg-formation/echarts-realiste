import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Température de l'aquarium tropical - Novembre 2025",
    subtext:
      "✅ Stabilisation réussie après remplacement du thermostat le 25/11",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    formatter: (params: unknown) => {
      const p = (params as { name: string; value: number }[])[0];
      const temp = p.value;
      let status = "🟢 Optimal";
      if (temp < 24.5) status = "🔵 Trop froid";
      if (temp > 26.5) status = "🔴 Trop chaud";
      return `${p.name}<br/>Température : <b>${temp}°C</b><br/>${status}`;
    },
  },
  xAxis: {
    type: "category",
    name: "Date",
    nameLocation: "middle",
    nameGap: 30,
    data: ["23/11", "24/11", "25/11", "26/11", "27/11", "28/11", "29/11"],
    axisLabel: {
      formatter: "{value}",
    },
  },
  yAxis: {
    type: "value",
    name: "Température (°C)",
    min: 22,
    max: 28,
    axisLabel: {
      formatter: "{value}°C",
    },
  },
  visualMap: {
    show: false,
    pieces: [
      { lte: 24.5, color: "#3498db" },
      { gt: 24.5, lte: 26.5, color: "#27ae60" },
      { gt: 26.5, color: "#e74c3c" },
    ],
  },
  series: [
    {
      name: "Température",
      data: [
        { value: 25.8 },
        { value: 24.6 },
        {
          value: 23.1,
          label: {
            show: true,
            formatter: "🔧 Thermostat remplacé",
            position: "bottom",
            fontSize: 10,
          },
        },
        { value: 24.2 },
        { value: 25.0 },
        { value: 25.4 },
        { value: 25.5 },
      ],
      type: "line",
      smooth: true,
      lineStyle: {
        width: 3,
      },
      markLine: {
        silent: true,
        lineStyle: {
          type: "dashed",
        },
        data: [
          {
            yAxis: 24.5,
            label: { formatter: "Min. recommandé", position: "start" },
            lineStyle: { color: "#3498db" },
          },
          {
            yAxis: 26.5,
            label: { formatter: "Max. recommandé", position: "start" },
            lineStyle: { color: "#e74c3c" },
          },
        ],
      },
      markArea: {
        silent: true,
        itemStyle: {
          color: "rgba(39, 174, 96, 0.1)",
        },
        data: [[{ yAxis: 24.5 }, { yAxis: 26.5 }]],
      },
      areaStyle: {
        opacity: 0.3,
      },
    },
  ],
};

export default function SmoothedLineChart() {
  return (
    <ChartEditor title="Smoothed Line Chart" section="Line" option={option} />
  );
}
