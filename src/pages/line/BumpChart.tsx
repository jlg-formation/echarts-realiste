import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données de classement des équipes de Ligue 1 - Saison 2023/2024
const teams = [
  { name: "Paris SG", color: "#004170" },
  { name: "Monaco", color: "#E4002B" },
  { name: "Brest", color: "#E30613" },
  { name: "Lille", color: "#E30613" },
  { name: "Nice", color: "#000000" },
  { name: "Lyon", color: "#1A4C96" },
];

const matchdays = ["J1", "J5", "J10", "J15", "J20", "J25", "J30", "J34"];

// Classement de chaque équipe à chaque journée (position 1 = 1er, position 6 = 6ème)
const rankings: Record<string, number[]> = {
  "Paris SG": [1, 1, 1, 1, 1, 1, 1, 1],
  Monaco: [3, 4, 3, 2, 2, 2, 2, 2],
  Brest: [8, 5, 4, 3, 3, 3, 3, 3],
  Lille: [6, 6, 5, 5, 4, 4, 4, 4],
  Nice: [2, 2, 2, 4, 5, 5, 5, 5],
  Lyon: [4, 3, 6, 6, 6, 6, 6, 6],
};

const series = teams.map((team) => ({
  name: team.name,
  type: "line" as const,
  smooth: false,
  symbol: "circle",
  symbolSize: 10,
  lineStyle: {
    width: 3,
    color: team.color,
  },
  itemStyle: {
    color: team.color,
  },
  label: {
    show: false,
  },
  endLabel: {
    show: true,
    formatter: "{a}",
    fontSize: 11,
    fontWeight: "bold" as const,
    color: team.color,
  },
  data: rankings[team.name],
  emphasis: {
    focus: "series" as const,
    lineStyle: {
      width: 5,
    },
  },
}));

const option: EChartsOption = {
  title: {
    text: "Évolution du classement Ligue 1 - Saison 2023/2024",
    subtext:
      "🏆 PSG champion invaincu en tête | 🚀 Brest, la sensation : de 8ème à 3ème !",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#2c3e50",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: (params: unknown) => {
      const p = params as { seriesName: string; value: number; name: string };
      return `<b>${p.seriesName}</b><br/>${p.name} : ${p.value}${p.value === 1 ? "er" : "ème"} place`;
    },
  },
  legend: {
    bottom: 10,
    left: "center",
    itemGap: 20,
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: "3%",
    right: "12%",
    bottom: "15%",
    top: "15%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    name: "Journée de championnat",
    nameLocation: "middle",
    nameGap: 35,
    data: matchdays,
    axisLabel: {
      fontSize: 11,
    },
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    name: "Position au classement",
    nameLocation: "middle",
    nameGap: 40,
    inverse: true,
    min: 1,
    max: 8,
    interval: 1,
    axisLabel: {
      formatter: (value: number) => {
        if (value === 1) return "1er 🥇";
        if (value === 2) return "2ème 🥈";
        if (value === 3) return "3ème 🥉";
        return `${value}ème`;
      },
      fontSize: 10,
    },
  },
  series: series,
};

const notes = `
## 📚 Note pédagogique : Bump Chart (Graphique de classement)

### ✅ Quand utiliser ce type de diagramme

Le Bump Chart est particulièrement adapté pour :

- **Visualiser l'évolution des classements** : suivi de positions dans un classement au fil du temps
- **Comparer des trajectoires** : voir comment différentes entités (équipes, produits, pays) évoluent les unes par rapport aux autres
- **Identifier les progressions et régressions** : repérer rapidement qui monte et qui descend
- **Mettre en évidence les tendances** : trajectoires stables vs volatiles
- **Raconter une histoire** : le parcours d'un "outsider" ou la domination d'un leader

**Exemples concrets :**
- Classement sportif sur une saison (football, F1, cyclisme)
- Évolution des parts de marché de marques concurrentes
- Classement des applications les plus téléchargées
- Position des pays dans un indice (PIB, IDH, etc.)

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le Bump Chart dans ces cas :

- **Trop d'entités à suivre** (> 8-10 lignes) : le graphique devient illisible
- **Valeurs absolues importantes** : le bump chart ne montre que les positions relatives, pas les écarts réels
- **Pas de notion de classement** : si vos données n'ont pas d'ordre, utilisez un autre type
- **Changements trop fréquents** : si les positions changent à chaque point, le graphique sera confus
- **Données manquantes** : les lignes interrompues nuisent à la lisibilité

**Erreurs courantes à éviter :**
- Ne pas inverser l'axe Y (le 1er doit être en haut !)
- Surcharger avec trop de séries
- Oublier les labels de fin de ligne pour identifier les entités

### 📊 Analyse de ce graphique

Ce graphique présente l'évolution du Top 6 de la Ligue 1 saison 2023/2024 :

- **PSG** : domination totale, 1ère place du début à la fin
- **Brest** : la sensation de la saison ! Parti 8ème à J1, monte progressivement jusqu'à la 3ème place
- **Nice** : excellent démarrage (2ème) mais déclin progressif jusqu'à la 5ème place
- **Monaco** : stabilisation en 2ème position après un début timide
- **Lyon** : saison décevante, jamais dans le Top 3

**Insight clé** : Brest illustre parfaitement comment un bump chart raconte une histoire - leur ascension est immédiatement visible et marquante.
`;

export default function BumpChart() {
  return (
    <ChartEditor
      title="Bump Chart (Ranking)"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
