import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données de puissance en kW (mesures toutes les 2h)
const powerData = [45, 32, 28, 52, 78, 65, 58, 62, 71, 98, 85, 56];

// Calcul de l'énergie cumulée en kWh (intégrale par méthode des trapèzes)
// Chaque intervalle = 2h, donc énergie = (P1 + P2) / 2 * 2h = (P1 + P2)
const cumulativeEnergy: number[] = [];
let cumul = 0;
for (let i = 0; i < powerData.length; i++) {
  if (i === 0) {
    cumulativeEnergy.push(0);
  } else {
    cumul += powerData[i - 1] + powerData[i]; // (P1+P2)/2 * 2h = P1+P2
    cumulativeEnergy.push(Math.round(cumul));
  }
}

const option: EChartsOption = {
  title: {
    text: "Puissance électrique appelée - Résidence Les Érables",
    subtext: "📈 Pic à 18h : +47% vs moyenne → Aire = énergie consommée (kWh)",
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
      const data = (
        params as { dataIndex: number; name: string; value: number }[]
      )[0];
      const cumul = cumulativeEnergy[data.dataIndex];
      return `${data.name}<br/>Puissance : <b>${data.value} kW</b><br/>Énergie cumulée : <b>${cumul} kWh</b>`;
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
    name: "kW",
    nameLocation: "end",
    max: 120,
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
      data: powerData.map((value, index) =>
        index === 9
          ? {
              value,
              itemStyle: { color: "#e74c3c" },
              label: {
                show: true,
                formatter: "⚡ Pic",
                position: "top",
                color: "#e74c3c",
                fontWeight: "bold" as const,
              },
            }
          : { value }
      ),
      markLine: {
        silent: true,
        data: [
          {
            type: "average",
            name: "Moyenne",
            label: {
              formatter: "Moy: {c} kW",
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
