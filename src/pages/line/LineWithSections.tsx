import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données de production industrielle avec phases distinctes
const heures = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

// Cadence de production (unités/heure) avec différentes phases
const cadenceProduction = [
  0, // 06:00 - Démarrage
  45, // 07:00 - Montée en régime
  78, // 08:00 - Montée en régime
  95, // 09:00 - Production nominale
  98, // 10:00 - Production nominale
  97, // 11:00 - Production nominale
  30, // 12:00 - Pause déjeuner
  25, // 13:00 - Pause déjeuner
  92, // 14:00 - Production nominale
  96, // 15:00 - Production nominale
  94, // 16:00 - Production nominale
  88, // 17:00 - Ralentissement
  75, // 18:00 - Ralentissement
  60, // 19:00 - Fin de journée
  40, // 20:00 - Fin de journée
  15, // 21:00 - Arrêt progressif
  0, // 22:00 - Arrêt complet
];

const option: EChartsOption = {
  title: {
    text: "Cadence de production - Ligne d'assemblage A3",
    subtext:
      "📊 Objectif : 95 unités/h · Moyenne du jour : 62 unités/h · Efficacité : 87 %",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
    },
  },
  tooltip: {
    trigger: "axis",
    confine: true,
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number; dataIndex: number }[];
      const point = p[0];
      const idx = point.dataIndex;

      let phase = "";
      if (idx <= 2) phase = "🔄 Phase de démarrage";
      else if (idx <= 5) phase = "✅ Production nominale";
      else if (idx <= 7) phase = "🍽️ Pause déjeuner";
      else if (idx <= 10) phase = "✅ Production nominale";
      else if (idx <= 12) phase = "⚠️ Ralentissement";
      else if (idx <= 14) phase = "🔻 Fin de journée";
      else phase = "⏹️ Arrêt progressif";

      const objectif = 95;
      const ecart = point.value - objectif;
      const ecartStr =
        ecart >= 0
          ? `<span style="color: #27ae60">+${ecart}</span>`
          : `<span style="color: #e74c3c">${ecart}</span>`;

      return `
        <b>${point.name}</b><br/>
        ${phase}<br/><br/>
        Cadence : <b>${point.value} unités/h</b><br/>
        Écart vs objectif : ${ecartStr} unités/h
      `;
    },
  },
  legend: {
    data: ["Cadence réelle", "Objectif"],
    bottom: 0,
  },
  grid: {
    left: 70,
    right: 40,
    bottom: 60,
    top: 80,
  },
  xAxis: {
    type: "category",
    data: heures,
    axisLabel: {
      fontSize: 11,
      rotate: 0,
      interval: 1,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        opacity: 0.3,
      },
    },
  },
  yAxis: {
    type: "value",
    name: "Unités / heure",
    nameLocation: "middle",
    nameGap: 45,
    min: 0,
    max: 120,
    axisLabel: {
      formatter: "{value}",
    },
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        gte: 0,
        lt: 3,
        color: "#f39c12", // Démarrage - Orange
        label: "Démarrage",
      },
      {
        gte: 3,
        lt: 6,
        color: "#27ae60", // Production nominale - Vert
        label: "Production nominale",
      },
      {
        gte: 6,
        lt: 8,
        color: "#95a5a6", // Pause - Gris
        label: "Pause déjeuner",
      },
      {
        gte: 8,
        lt: 11,
        color: "#27ae60", // Production nominale - Vert
        label: "Production nominale",
      },
      {
        gte: 11,
        lt: 13,
        color: "#e67e22", // Ralentissement - Orange foncé
        label: "Ralentissement",
      },
      {
        gte: 13,
        lt: 15,
        color: "#3498db", // Fin de journée - Bleu
        label: "Fin de journée",
      },
      {
        gte: 15,
        lte: 17,
        color: "#9b59b6", // Arrêt - Violet
        label: "Arrêt progressif",
      },
    ],
  },
  series: [
    {
      name: "Cadence réelle",
      type: "line",
      data: cadenceProduction,
      smooth: false,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        opacity: 0.15,
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.08,
        },
        data: [
          [
            {
              name: "Démarrage",
              xAxis: "06:00",
              itemStyle: { color: "#f39c12" },
            },
            { xAxis: "08:00" },
          ],
          [
            {
              name: "Pause déjeuner",
              xAxis: "12:00",
              itemStyle: { color: "#95a5a6" },
            },
            { xAxis: "14:00" },
          ],
          [
            {
              name: "Ralentissement",
              xAxis: "17:00",
              itemStyle: { color: "#e67e22" },
            },
            { xAxis: "19:00" },
          ],
        ],
      },
    },
    {
      name: "Objectif",
      type: "line",
      data: Array(17).fill(95),
      lineStyle: {
        type: "dashed",
        width: 2,
        color: "#e74c3c",
      },
      symbol: "none",
      itemStyle: {
        color: "#e74c3c",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Graphique en ligne avec sections (Line with Sections)

### ✅ Quand utiliser ce type de diagramme

Le graphique en ligne avec sections colorées est idéal pour :

- **Identifier des phases distinctes** dans un processus continu
- **Visualiser des états ou régimes différents** au cours du temps
- **Comparer la performance réelle vs un objectif** sur différentes périodes
- **Mettre en évidence des transitions** entre états (montée en régime, pause, arrêt)
- **Analyser des cycles de production** avec phases identifiables

**Exemples concrets :**
- Phases d'une chaîne de production (démarrage, régime nominal, maintenance)
- États d'un système (actif, veille, maintenance, panne)
- Cycles biologiques (sommeil, éveil, activité intense)
- Phases d'un projet (conception, développement, test, déploiement)

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce type de graphique dans ces cas :

- **Pas de phases distinctes identifiables** : si les données sont homogènes, un line chart simple suffit
- **Trop de phases** (> 6-7) : les couleurs deviennent difficiles à distinguer
- **Phases trop courtes** : les sections colorées seront illisibles
- **Données catégorielles** : préférez un bar chart groupé
- **Comparaison de plusieurs séries** : le visualMap par sections ne fonctionne que sur une série

**Erreurs courantes à éviter :**
- Utiliser des couleurs trop similaires pour des phases différentes
- Ne pas définir de légende ou de tooltip expliquant chaque phase
- Oublier les zones de transition entre phases

### 🔧 Fonctionnalités ECharts utilisées

- **\`visualMap.pieces\`** : colorie automatiquement les sections selon l'index ou la valeur
- **\`markArea\`** : ajoute des zones colorées en arrière-plan pour identifier visuellement les phases
- **\`series.areaStyle\`** : remplit légèrement sous la courbe pour accentuer les variations

### 📊 Analyse de ce graphique

Ce graphique montre le cycle de production d'une journée avec :

- **Phase de démarrage (06h-08h)** : montée en régime progressive de 0 à 78 unités/h
- **Production nominale (09h-11h et 14h-16h)** : cadence proche de l'objectif de 95 unités/h
- **Pause déjeuner (12h-13h)** : chute contrôlée de la production
- **Ralentissement (17h-18h)** : diminution progressive en fin de journée
- **Arrêt (21h-22h)** : extinction complète de la ligne

**Insight clé** : L'efficacité de 87 % montre que l'objectif n'est atteint que pendant les phases nominales. Les temps de transition (démarrage/arrêt) et la pause réduisent la moyenne journalière.

**Décision à prendre** : Optimiser les temps de démarrage pour atteindre plus rapidement le régime nominal, ou ajuster l'objectif journalier en tenant compte des contraintes opérationnelles.
`;

export default function LineWithSections() {
  return (
    <ChartEditor
      title="Line with Sections"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
