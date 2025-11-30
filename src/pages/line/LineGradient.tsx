import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";
import * as echarts from "echarts";

// Données de vol : temps (minutes depuis décollage), altitude (pieds)
const flightData = [
  { time: 0, altitude: 0, phase: "Décollage" },
  { time: 2, altitude: 2500, phase: "Montée initiale" },
  { time: 5, altitude: 8000, phase: "Montée" },
  { time: 10, altitude: 18000, phase: "Montée" },
  { time: 15, altitude: 28000, phase: "Montée" },
  { time: 22, altitude: 35000, phase: "Montée" },
  { time: 30, altitude: 38000, phase: "Croisière" },
  { time: 60, altitude: 38000, phase: "Croisière" },
  { time: 90, altitude: 38000, phase: "Croisière" },
  { time: 120, altitude: 38000, phase: "Croisière" },
  { time: 150, altitude: 38000, phase: "Croisière" },
  { time: 180, altitude: 38000, phase: "Croisière" },
  { time: 195, altitude: 32000, phase: "Descente" },
  { time: 210, altitude: 24000, phase: "Descente" },
  { time: 225, altitude: 15000, phase: "Approche" },
  { time: 235, altitude: 8000, phase: "Approche" },
  { time: 245, altitude: 3000, phase: "Approche finale" },
  { time: 252, altitude: 1500, phase: "Approche finale" },
  { time: 258, altitude: 500, phase: "Atterrissage" },
  { time: 260, altitude: 0, phase: "Au sol" },
];

const option: EChartsOption = {
  title: {
    text: "Vol AF1234 Paris-CDG → New York-JFK",
    subtext: "Profil d'altitude - Airbus A350-900 | Durée totale : 4h20",
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
      const p = params as Array<{ data: { time: number; altitude: number } }>;
      const item = p[0];
      const data = item.data;
      const hours = Math.floor(data.time / 60);
      const mins = data.time % 60;
      const timeStr =
        hours > 0 ? `${hours}h${mins.toString().padStart(2, "0")}` : `${mins}m`;

      // Trouver la phase correspondante
      const flightPoint = flightData.find(
        (f) => f.time === data.time && f.altitude === data.altitude,
      );
      const phase = flightPoint?.phase || "";

      // Conversion en mètres
      const altitudeMeters = Math.round(data.altitude * 0.3048);

      return `<b>T+${timeStr}</b><br/>
              Altitude: <b>${data.altitude.toLocaleString()} ft</b> (${altitudeMeters.toLocaleString()} m)<br/>
              Phase: ${phase}`;
    },
  },
  grid: {
    left: "8%",
    right: "5%",
    bottom: "15%",
    top: "18%",
  },
  xAxis: {
    type: "value",
    name: "Temps de vol (minutes)",
    nameLocation: "middle",
    nameGap: 35,
    min: 0,
    max: 270,
    axisLabel: {
      formatter: function (value: number) {
        const hours = Math.floor(value / 60);
        const mins = value % 60;
        if (hours === 0) return `${mins}m`;
        if (mins === 0) return `${hours}h`;
        return `${hours}h${mins.toString().padStart(2, "0")}`;
      },
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#eee",
      },
    },
  },
  yAxis: {
    type: "value",
    name: "Altitude (pieds)",
    nameLocation: "middle",
    nameGap: 55,
    min: 0,
    max: 45000,
    axisLabel: {
      formatter: function (value: number) {
        return `${(value / 1000).toFixed(0)}k`;
      },
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#eee",
      },
    },
  },
  visualMap: {
    show: false,
    type: "continuous",
    dimension: 1, // altitude
    min: 0,
    max: 38000,
    inRange: {
      color: ["#27ae60", "#f1c40f", "#e67e22", "#e74c3c", "#9b59b6", "#3498db"],
    },
  },
  series: [
    {
      name: "Altitude",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        width: 4,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(52, 152, 219, 0.6)" },
          { offset: 0.5, color: "rgba(52, 152, 219, 0.3)" },
          { offset: 1, color: "rgba(52, 152, 219, 0.05)" },
        ]),
      },
      data: flightData.map((d) => ({
        value: [d.time, d.altitude],
        time: d.time,
        altitude: d.altitude,
      })),
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.15,
        },
        data: [
          [
            {
              name: "Montée",
              xAxis: 0,
              itemStyle: { color: "#27ae60" },
            },
            { xAxis: 30 },
          ],
          [
            {
              name: "Croisière",
              xAxis: 30,
              itemStyle: { color: "#3498db" },
            },
            { xAxis: 180 },
          ],
          [
            {
              name: "Descente",
              xAxis: 180,
              itemStyle: { color: "#e67e22" },
            },
            { xAxis: 260 },
          ],
        ],
        label: {
          show: true,
          position: "insideTop",
          fontSize: 11,
          color: "#333",
        },
      },
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: {
          type: "dashed",
          width: 1,
        },
        data: [
          {
            yAxis: 38000,
            label: {
              formatter: "FL380 - Altitude de croisière",
              position: "insideEndTop",
              fontSize: 10,
              color: "#3498db",
            },
            lineStyle: {
              color: "#3498db",
            },
          },
          {
            yAxis: 10000,
            label: {
              formatter: "FL100 - Ceinture obligatoire",
              position: "insideEndTop",
              fontSize: 10,
              color: "#f39c12",
            },
            lineStyle: {
              color: "#f39c12",
            },
          },
        ],
      },
    },
  ],
  graphic: {
    type: "text",
    right: 20,
    bottom: 10,
    style: {
      text: "💡 visualMap + LinearGradient : colore la ligne selon\nl'altitude et ajoute un dégradé sous la courbe.",
      fontSize: 11,
      fill: "#666",
      backgroundColor: "#f5f5f5",
      padding: [6, 10],
      borderRadius: 4,
    },
  },
};

const notes = `
## 📚 Note pédagogique : Line Chart avec Gradient

### ✅ Quand utiliser ce type de diagramme

Le graphique en ligne avec dégradé est idéal pour :

- **Visualiser des profils d'altitude** : vols, randonnées, plongées
- **Données continues avec magnitude** : la couleur renforce la valeur
- **Séries temporelles avec zones** : identifier des phases distinctes
- **Données géographiques** : élévation le long d'un parcours
- **Processus industriels** : température, pression au cours du temps

**Caractéristiques techniques :**
- \`visualMap\` : colorie la ligne selon une dimension des données
- \`LinearGradient\` : crée un dégradé vertical sous la courbe
- \`markArea\` : délimite des zones thématiques
- \`markLine\` : affiche des seuils de référence

### ❌ Quand ne pas utiliser cette technique

Évitez le gradient de ligne :

- **Comparaison de séries** : les couleurs masquent les différences
- **Données catégorielles** : le gradient suggère une continuité
- **Impression noir et blanc** : perte d'information
- **Daltonisme** : vérifiez l'accessibilité des couleurs

### 📊 Analyse de ce graphique

Ce graphique montre le profil d'altitude du vol AF1234 :

**Phases de vol identifiées :**
1. **Décollage et montée** (0-30 min) : de 0 à 38 000 pieds
2. **Croisière** (30-180 min) : altitude stable à FL380
3. **Descente et approche** (180-260 min) : retour au niveau du sol

**Éléments techniques :**
- **FL380** = Flight Level 380 = 38 000 pieds ≈ 11 580 mètres
- **FL100** (10 000 ft) : seuil où la ceinture redevient obligatoire
- Durée totale : 4h20 (Paris → New York)

**Fonctionnalités ECharts utilisées :**
- \`visualMap.continuous\` : applique un dégradé de couleur selon l'altitude
- \`echarts.graphic.LinearGradient\` : dégradé vertical pour l'area
- \`markArea\` : zones colorées pour les phases de vol
- \`markLine\` : lignes horizontales pour les altitudes clés
- \`smooth: true\` : courbe lissée pour un rendu réaliste

**Application métier :**
Ce type de visualisation est utilisé dans les cockpits modernes et les systèmes de suivi de vol pour les passagers.
`;

export default function LineGradient() {
  return (
    <ChartEditor
      title="Line Gradient"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
