import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Taux de satisfaction client par équipe support - T4 2024
// Mêmes données que le Don't pour comparaison
const equipes = [
  "Équipe Nord",
  "Équipe Sud",
  "Équipe Est",
  "Équipe Ouest",
  "Équipe Centre",
];
const satisfaction = [94.2, 91.5, 88.7, 85.3, 82.1];

const option: EChartsOption = {
  title: {
    text: "Satisfaction client par équipe support - T4 2024",
    subtext: "✅ Toutes les équipes au-dessus de 80% · Écart max : 12 points",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#16a34a",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      const value = p[0].value;
      const appreciation =
        value >= 90 ? "Excellent" : value >= 85 ? "Très bien" : "Bien";
      return `<b>${p[0].name}</b><br/>Satisfaction : <b>${value} %</b><br/>Appréciation : ${appreciation}`;
    },
  },
  grid: {
    left: 100,
    right: 40,
    bottom: 60,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: equipes,
    axisLabel: {
      fontSize: 11,
      rotate: 15,
    },
  },
  yAxis: {
    type: "value",
    name: "Taux de satisfaction (%)",
    nameLocation: "middle",
    nameGap: 60,
    min: 0, // ✅ Axe commençant à 0
    max: 100,
    interval: 20,
    axisLabel: {
      formatter: "{value} %",
    },
  },
  series: [
    {
      name: "Satisfaction",
      type: "bar",
      data: satisfaction.map((value) => ({
        value,
        itemStyle: {
          // Toutes les barres en vert car toutes > 80%
          color: "#22c55e",
          borderRadius: [4, 4, 0, 0],
        },
      })),
      label: {
        show: true,
        position: "top",
        formatter: "{c} %",
        fontSize: 11,
        fontWeight: "bold",
      },
      barWidth: "60%",
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: {
          color: "#9ca3af",
          type: "dashed",
        },
        data: [
          {
            yAxis: 80,
            label: {
              formatter: "Objectif 80%",
              position: "insideEndTop",
              fontSize: 10,
              color: "#6b7280",
            },
          },
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Axe Y complet

### ✅ Pourquoi c'est une bonne pratique

Un axe Y commençant à 0% permet une **représentation proportionnelle fidèle** :

**Ce que le graphique montre correctement :**
- Toutes les équipes ont des barres de **hauteur similaire** (toutes > 80%)
- L'écart visuel correspond à l'écart réel (12 points sur 100)
- Le message est clair : **toutes les équipes performent bien**

**Décisions justes possibles :**
- Féliciter l'Équipe Nord sans diaboliser l'Équipe Centre
- Identifier que l'écart est **marginal** et ne justifie pas de mesures drastiques
- Peut-être chercher à comprendre les bonnes pratiques de l'Équipe Nord pour les partager

### 📊 Améliorations apportées

1. **Axe 0-100%** : proportions visuelles correctes
2. **Couleur uniforme verte** : toutes les équipes sont au-dessus de l'objectif
3. **Ligne d'objectif à 80%** : montre que tout le monde est au-dessus
4. **Sous-titre informatif** : résume l'insight ("Écart max : 12 points")

### 🎯 Message transmis

> "Toutes nos équipes support ont une excellente satisfaction client.
> L'Équipe Nord est légèrement en tête, mais l'ensemble est homogène."

C'est très différent du message trompeur de la version "Don't" !

### 💡 Conseil

Si vous devez vraiment zoomer sur les différences, utilisez plutôt :
- Un **graphique de variation** (écart par rapport à la moyenne)
- Un **tableau** avec les valeurs exactes
- Un **texte explicatif** mentionnant que l'écart est faible
`;

export default function TruncatedAxisDo() {
  return (
    <ChartEditor
      title="✅ Axe Y complet (bonne pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
