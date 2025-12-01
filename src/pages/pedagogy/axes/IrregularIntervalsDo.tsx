import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Évolution du chiffre d'affaires - Données trimestrielles COMPLÈTES
// ✅ Bonne pratique : tous les trimestres sont affichés
const periodes = [
  "T1 2023",
  "T2 2023",
  "T3 2023",
  "T4 2023",
  "T1 2024",
  "T2 2024",
  "T3 2024",
  "T4 2024",
];
const chiffreAffaires = [1.2, 1.35, 1.28, 1.48, 1.42, 1.52, 1.58, 1.71];

// Calcul des variations trimestrielles
const variations = chiffreAffaires.map((ca, i) => {
  if (i === 0) return 0;
  return ((ca - chiffreAffaires[i - 1]) / chiffreAffaires[i - 1]) * 100;
});

const option: EChartsOption = {
  title: {
    text: "Évolution du CA de TechStartup SA",
    subtext:
      "📈 Croissance annuelle +42,5 % (2023-2024) · Saisonnalité marquée au T3",
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
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number; dataIndex: number }[];
      const idx = p[0].dataIndex;
      const variation = variations[idx];
      const variationText =
        idx > 0
          ? `<br/>Variation : <span style="color: ${variation >= 0 ? "#22c55e" : "#ef4444"}">${variation >= 0 ? "+" : ""}${variation.toFixed(1)} %</span>`
          : "";
      return `<b>${p[0].name}</b><br/>CA : <b>${p[0].value.toFixed(2)} M€</b>${variationText}`;
    },
  },
  grid: {
    left: 80,
    right: 40,
    bottom: 60,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: periodes,
    axisLabel: {
      fontSize: 11,
      rotate: 25,
    },
    name: "Période",
    nameLocation: "middle",
    nameGap: 45,
  },
  yAxis: {
    type: "value",
    name: "Chiffre d'affaires (M€)",
    nameLocation: "middle",
    nameGap: 50,
    min: 1,
    max: 2,
    axisLabel: {
      formatter: "{value} M€",
    },
  },
  series: [
    {
      name: "Chiffre d'affaires",
      type: "line",
      data: chiffreAffaires.map((value, index) => {
        // Colorer différemment les trimestres en baisse
        const isDown = index > 0 && value < chiffreAffaires[index - 1];
        return {
          value,
          itemStyle: {
            color: isDown ? "#ef4444" : "#3b82f6",
          },
        };
      }),
      smooth: false, // Pas de lissage pour montrer les vraies variations
      symbol: "circle",
      symbolSize: 10,
      lineStyle: {
        width: 3,
        color: "#3b82f6",
      },
      itemStyle: {
        color: "#3b82f6",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
            { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
          ],
        },
      },
      label: {
        show: true,
        position: "top",
        formatter: (params: unknown) => {
          const p = params as { dataIndex: number; value: number };
          const idx = p.dataIndex;
          if (idx === 0) return `${p.value.toFixed(2)} M€`;
          const variation = variations[idx];
          const sign = variation >= 0 ? "+" : "";
          return `${p.value.toFixed(2)} M€\n(${sign}${variation.toFixed(0)}%)`;
        },
        fontSize: 10,
        fontWeight: "bold",
        lineHeight: 14,
      },
      markArea: {
        silent: true,
        data: [
          // Highlight des T3 (saisonnalité)
          [
            {
              xAxis: "T3 2023",
              itemStyle: { color: "rgba(251, 191, 36, 0.1)" },
            },
            { xAxis: "T3 2023" },
          ],
          [
            {
              xAxis: "T3 2024",
              itemStyle: { color: "rgba(251, 191, 36, 0.1)" },
            },
            { xAxis: "T3 2024" },
          ],
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Intervalles temporels réguliers

### ✅ Pourquoi c'est une bonne pratique

Ce graphique affiche **tous les trimestres sans exception**, permettant une analyse honnête :

**Avantages :**
1. **Continuité temporelle** : chaque intervalle représente exactement 3 mois
2. **Tendance réelle visible** : on voit les baisses (T3 2023, T1 2024) et les hausses
3. **Saisonnalité détectable** : les T3 montrent systématiquement un ralentissement
4. **Calculs corrects** : on peut estimer le taux de croissance mensuel/annuel

### 📊 Analyse de ce graphique

**Insights révélés par les données complètes :**
- 📉 **T3 = période creuse** : -5,2% en T3 2023, seulement +3,9% en T3 2024
- 📈 **T4 = rebond** : +15,6% en T4 2023, +8,2% en T4 2024
- 🔄 **Pattern saisonnier** : probablement lié aux vacances d'été (baisse d'activité)

**Ce que cachait la version "Don't" :**
- La baisse de T3 2023 (1.35 → 1.28 M€, soit -5,2%)
- La baisse de T1 2024 (1.48 → 1.42 M€, soit -4,1%)
- Le pattern de saisonnalité récurrent

**Décisions possibles :**
1. Anticiper les baisses T3 avec des promotions ou événements
2. Renforcer les équipes commerciales en T4 pour capitaliser sur le rebond
3. Communiquer aux investisseurs sur la saisonnalité du business

### 🎨 Techniques utilisées

- **Points rouges** pour les trimestres en baisse
- **Zones jaunes** pour marquer les T3 (saisonnalité)
- **Labels avec variation** : CA + % de changement
- **Ligne non lissée** : montre les vraies variations
`;

export default function IrregularIntervalsDo() {
  return (
    <ChartEditor
      title="✅ Intervalles temporels réguliers (bonne pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
