import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Ventes mensuelles par catégorie de produits - 2024
// Mêmes données que le Don't, mais regroupées intelligemment
const mois = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

// Regroupement en 4 grandes catégories + Total
const categoriesGroupees = [
  {
    name: "High-Tech & Électronique",
    data: [125, 118, 132, 145, 138, 152, 148, 135, 162, 175, 210, 245],
    color: "#3b82f6",
  },
  {
    name: "Mode & Beauté",
    // Mode Homme + Mode Femme + Beauté
    data: [235, 221, 269, 261, 282, 268, 242, 225, 305, 331, 408, 435],
    color: "#ec4899",
  },
  {
    name: "Maison & Loisirs",
    // Maison + Sport + Jardin + Bricolage
    data: [159, 168, 236, 280, 310, 324, 289, 257, 250, 231, 253, 260],
    color: "#22c55e",
  },
  {
    name: "Produits du quotidien",
    // Jouets + Livres + Alimentation + Animalerie
    data: [197, 196, 207, 204, 202, 204, 204, 213, 236, 267, 380, 464],
    color: "#f59e0b",
  },
];

const option: EChartsOption = {
  title: {
    text: "Ventes mensuelles par pôle - BonMarché.fr 2024",
    subtext:
      "✅ 4 pôles stratégiques · Tendances claires · Pic de fin d'année visible",
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
    formatter: (params: unknown) => {
      const p = params as {
        seriesName: string;
        value: number;
        color: string;
      }[];
      let html = `<b>${(params as { name: string }[])[0]?.name || ""}</b><br/>`;
      let total = 0;
      p.forEach((item) => {
        html += `<span style="color:${item.color}">●</span> ${item.seriesName}: <b>${item.value} k€</b><br/>`;
        total += item.value;
      });
      html += `<hr style="margin:4px 0"/><b>Total : ${total} k€</b>`;
      return html;
    },
  },
  legend: {
    data: categoriesGroupees.map((c) => c.name),
    bottom: 0,
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 70,
    right: 30,
    bottom: 50,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: mois,
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    name: "Ventes (k€)",
    nameLocation: "middle",
    nameGap: 55,
    axisLabel: {
      formatter: "{value}",
    },
  },
  series: categoriesGroupees.map((cat) => ({
    name: cat.name,
    type: "line" as const,
    data: cat.data,
    smooth: true,
    lineStyle: {
      width: 3,
      color: cat.color,
    },
    itemStyle: {
      color: cat.color,
    },
    symbol: "circle",
    symbolSize: 6,
    emphasis: {
      focus: "series" as const,
      lineStyle: {
        width: 5,
      },
    },
  })),
};

const notes = `
## 📚 Note pédagogique : Regroupement intelligent des séries

### ✅ Pourquoi c'est une bonne pratique

En regroupant les 12 catégories en **4 pôles stratégiques**, le graphique devient :

**Lisible :**
- Chaque série est **clairement identifiable**
- Les couleurs sont **bien distinctes**
- On peut **suivre chaque tendance** facilement

**Informatif :**
- Le **pic de fin d'année** est évident (surtout Produits du quotidien = Noël)
- La **saisonnalité** de Maison & Loisirs (été) ressort clairement
- La **croissance du High-Tech** sur l'année est visible

### 📊 Technique de regroupement utilisée

| Pôle | Catégories regroupées |
|------|----------------------|
| High-Tech | Électronique |
| Mode & Beauté | Mode Homme + Mode Femme + Beauté |
| Maison & Loisirs | Maison + Sport + Jardin + Bricolage |
| Produits du quotidien | Jouets + Livres + Alimentation + Animalerie |

### 🎯 Messages clairs transmis

1. **Noël booste les ventes** : +40% en novembre-décembre pour "Produits du quotidien"
2. **L'été est favorable** au pôle "Maison & Loisirs" (pic en juin)
3. **Le High-Tech croît régulièrement** : +96% entre janvier et décembre
4. **Mode & Beauté** reste le pôle le plus stable

### 💡 Bonnes pratiques appliquées

- **Maximum 4-5 séries** pour rester lisible
- **Couleurs contrastées** et accessibles
- **Épaisseur de ligne suffisante** (3px)
- **Tooltip enrichi** avec total
- **Focus au survol** pour isoler une série
`;

export default function TooManySeriesDo() {
  return (
    <ChartEditor
      title="✅ Séries regroupées (bonne pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
