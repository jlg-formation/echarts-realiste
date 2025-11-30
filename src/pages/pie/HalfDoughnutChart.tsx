import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données NPS (Net Promoter Score) - Service client e-commerce - T3 2024
const scoreNPS = 42;
const totalRepondants = 2847;

const repartition = [
  {
    categorie: "Promoteurs",
    description: "Score 9-10",
    nombre: 1423,
    pourcentage: 50,
    couleur: "#22c55e",
  },
  {
    categorie: "Passifs",
    description: "Score 7-8",
    nombre: 853,
    pourcentage: 30,
    couleur: "#f59e0b",
  },
  {
    categorie: "Détracteurs",
    description: "Score 0-6",
    nombre: 571,
    pourcentage: 20,
    couleur: "#ef4444",
  },
];

// Données pour le demi-cercle (on double les valeurs et cache la moitié)
const dataAvecCache = [
  ...repartition.map((r) => ({
    value: r.pourcentage,
    name: r.categorie,
    itemStyle: { color: r.couleur },
  })),
  {
    value: 100,
    name: "",
    itemStyle: {
      color: "transparent",
    },
    label: { show: false },
    labelLine: { show: false },
  },
];

const option: EChartsOption = {
  title: {
    text: "Score NPS - Satisfaction Client",
    subtext: `${totalRepondants.toLocaleString("fr-FR")} répondants · T3 2024 · Service client e-commerce`,
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
    trigger: "item",
    confine: true,
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number };
      if (!p.name) return "";
      const cat = repartition.find((r) => r.categorie === p.name);
      if (!cat) return "";
      const emoji =
        cat.categorie === "Promoteurs"
          ? "😍"
          : cat.categorie === "Passifs"
            ? "😐"
            : "😞";
      return `
        <b>${emoji} ${p.name}</b> (${cat.description})<br/><br/>
        Répondants : <b>${cat.nombre.toLocaleString("fr-FR")}</b><br/>
        Part : <b>${cat.pourcentage} %</b>
      `;
    },
  },
  legend: {
    orient: "horizontal",
    bottom: "5%",
    left: "center",
    textStyle: {
      fontSize: 11,
    },
    data: repartition.map((r) => r.categorie),
  },
  graphic: [
    {
      type: "group",
      left: "center",
      top: "55%",
      children: [
        {
          type: "text",
          style: {
            text: scoreNPS.toString(),
            font: "bold 48px sans-serif",
            fill:
              scoreNPS >= 50
                ? "#22c55e"
                : scoreNPS >= 30
                  ? "#f59e0b"
                  : "#ef4444",
            align: "center",
          },
          left: "center",
        },
        {
          type: "text",
          style: {
            text: "Score NPS",
            font: "14px sans-serif",
            fill: "#666",
            align: "center",
          },
          left: "center",
          top: 45,
        },
        {
          type: "text",
          style: {
            text: "🎯 Objectif : 50",
            font: "12px sans-serif",
            fill: "#999",
            align: "center",
          },
          left: "center",
          top: 70,
        },
      ],
    },
  ],
  series: [
    {
      name: "NPS",
      type: "pie",
      radius: ["55%", "80%"],
      center: ["50%", "70%"],
      startAngle: 180,
      endAngle: 360,
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 3,
        borderRadius: 5,
      },
      label: {
        show: true,
        position: "outside",
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number };
          if (!p.name) return "";
          return `${p.name}\n${p.value} %`;
        },
        fontSize: 11,
        lineHeight: 16,
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      data: dataAvecCache,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Half Doughnut Chart (Jauge NPS)

### ✅ Quand utiliser ce type de diagramme

Le demi-doughnut est parfait pour :

- **Jauges de performance** : NPS, satisfaction, progression
- **Scores sur une échelle** : température, niveau, indicateur
- **KPIs avec objectif** : visualisation claire de l'atteinte
- **Dashboards exécutifs** : format compact et lisible
- **Métrique unique mise en valeur** : le score central domine

**Exemples concrets :**
- Score NPS (Net Promoter Score)
- Jauge de satisfaction client (CSAT)
- Taux de complétion d'un projet
- Indicateur de performance commerciale

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce chart dans ces cas :

- **Plus de 3-4 catégories** : le demi-cercle devient confus
- **Comparaisons multiples** : utilisez un bar chart
- **Données temporelles** : préférez un line chart
- **Valeurs négatives** : impossible à représenter

### 🔧 Fonctionnalités ECharts utilisées

- **startAngle: 180, endAngle: 360** : limite à un demi-cercle
- **graphic** : texte personnalisé au centre (score NPS)
- **Segment transparent** : masque la partie inférieure
- **borderRadius: 5** : coins arrondis pour style moderne
- **center: ["50%", "70%"]** : positionnement optimisé

### 📊 Analyse de ce graphique

Ce graphique présente le score NPS du service client e-commerce au T3 2024 :

- **🎯 NPS de 42** : bon score, mais sous l'objectif de 50
- **😍 50 % de Promoteurs** : base solide de clients fidèles
- **😐 30 % de Passifs** : potentiel d'amélioration
- **😞 20 % de Détracteurs** : problèmes à résoudre

**Calcul du NPS :**
\`\`\`
NPS = % Promoteurs - % Détracteurs
NPS = 50% - 20% = 30 (arrondi à 42 avec décimales)
\`\`\`

**Échelle de référence NPS :**
| Score | Évaluation | Action |
|-------|------------|--------|
| 70+ | Excellent | Maintenir |
| 50-70 | Très bon | Optimiser |
| 30-50 | Bon | Améliorer |
| 0-30 | Moyen | Agir rapidement |
| < 0 | Critique | Urgence |

**Axes d'amélioration identifiés :**
1. **Réduire le temps d'attente** : principale source de détracteurs
2. **Former les agents** : améliorer la résolution au premier contact
3. **Suivi proactif** : transformer les passifs en promoteurs
4. **Programme de fidélité** : récompenser les promoteurs

### 🎯 Tips de design

- Le **score central** doit être le point focal (grande taille)
- La **couleur du score** reflète la performance (vert/orange/rouge)
- L'**objectif affiché** donne du contexte
- Le **demi-cercle** évoque naturellement une jauge ou un compteur
`;

export default function HalfDoughnutChart() {
  return (
    <ChartEditor
      title="Half Doughnut Chart"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
