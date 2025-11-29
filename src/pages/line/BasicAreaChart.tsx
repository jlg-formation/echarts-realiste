import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Consommation électrique journalière - Résidence Les Érables",
    subtext:
      "📈 Pic à 18h : +47% vs moyenne → Recommandation : décaler les machines à laver",
    left: "center",
    textStyle: {
      fontSize: 16,
    },
    subtextStyle: {
      fontSize: 12,
      color: "#e67e22",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
    formatter: (params: unknown) => {
      const data = (params as { name: string; value: number }[])[0];
      return `${data.name}<br/>Consommation : <b>${data.value} kWh</b>`;
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "18%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    name: "Heure",
    nameLocation: "middle",
    nameGap: 30,
    data: [
      "00h",
      "02h",
      "04h",
      "06h",
      "08h",
      "10h",
      "12h",
      "14h",
      "16h",
      "18h",
      "20h",
      "22h",
    ],
    axisLabel: {
      color: "#666",
    },
  },
  yAxis: {
    type: "value",
    name: "kWh",
    nameLocation: "end",
    axisLabel: {
      formatter: "{value}",
      color: "#666",
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#e0e0e0",
      },
    },
  },
  series: [
    {
      name: "Consommation",
      type: "line",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(52, 152, 219, 0.6)" },
            { offset: 1, color: "rgba(52, 152, 219, 0.1)" },
          ],
        },
      },
      lineStyle: {
        color: "#3498db",
        width: 2,
      },
      itemStyle: {
        color: "#3498db",
      },
      emphasis: {
        focus: "series",
      },
      data: [
        { value: 45 },
        { value: 32 },
        { value: 28 },
        { value: 52 },
        { value: 78 },
        { value: 65 },
        { value: 58 },
        { value: 62 },
        { value: 71 },
        {
          value: 98,
          itemStyle: { color: "#e74c3c" },
          label: {
            show: true,
            formatter: "⚡ Pic",
            position: "top",
            color: "#e74c3c",
            fontWeight: "bold",
          },
        },
        { value: 85 },
        { value: 56 },
      ],
      markLine: {
        silent: true,
        data: [
          {
            type: "average",
            name: "Moyenne",
            label: {
              formatter: "Moy: {c} kWh",
              position: "insideEndTop",
            },
            lineStyle: {
              color: "#27ae60",
              type: "dashed",
            },
          },
        ],
      },
      markArea: {
        silent: true,
        data: [
          [
            {
              name: "Heures creuses",
              xAxis: "00h",
              itemStyle: {
                color: "rgba(46, 204, 113, 0.1)",
              },
            },
            {
              xAxis: "06h",
            },
          ],
          [
            {
              name: "Heures pleines",
              xAxis: "16h",
              itemStyle: {
                color: "rgba(231, 76, 60, 0.1)",
              },
              label: {
                position: "insideBottom",
                distance: 10,
              },
            },
            {
              xAxis: "22h",
            },
          ],
        ],
      },
    },
  ],
};

export default function BasicAreaChart() {
  return (
    <ChartEditor title="Basic Area Chart" section="Line" option={option} />
  );
}
