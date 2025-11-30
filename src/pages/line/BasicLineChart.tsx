import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    text: "Fréquentation du site e-commerce - Semaine 47",
    subtext: "🚨 Chute de 38% le vendredi : incident serveur détecté",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 13,
      color: "#c0392b",
    },
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b}<br/>Visiteurs uniques : <b>{c}</b>",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "15%",
    top: "18%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    name: "Jour",
    nameLocation: "middle",
    nameGap: 30,
    data: [
      "Lun 18/11",
      "Mar 19/11",
      "Mer 20/11",
      "Jeu 21/11",
      "Ven 22/11",
      "Sam 23/11",
      "Dim 24/11",
    ],
    axisLabel: {
      fontSize: 11,
    },
  },
  yAxis: {
    type: "value",
    name: "Visiteurs uniques",
    nameLocation: "middle",
    nameGap: 50,
    axisLabel: {
      formatter: (value: number) => `${(value / 1000).toFixed(0)}k`,
    },
  },
  series: [
    {
      name: "Visiteurs",
      type: "line",
      smooth: false,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: "#3498db",
      },
      itemStyle: {
        color: "#3498db",
      },
      data: [
        { value: 15000 },
        { value: 23000 },
        { value: 22400 },
        { value: 21800 },
        {
          value: 13500,
          itemStyle: { color: "#e74c3c" },
          symbolSize: 12,
          label: {
            show: true,
            formatter: "⚠️ -38%",
            position: "bottom",
            fontSize: 11,
            fontWeight: "bold",
            color: "#c0392b",
          },
        },
        { value: 14700 },
        { value: 26000 },
      ],
      markLine: {
        silent: true,
        lineStyle: {
          color: "#95a5a6",
          type: "dashed",
        },
        label: {
          formatter: "Moyenne : {c}",
          fontSize: 10,
        },
        data: [{ type: "average", name: "Moyenne" }],
      },
    },
  ],
  graphic: {
    type: "text",
    right: 20,
    bottom: 10,
    style: {
      text: "💡 Graphique en ligne : idéal pour visualiser des tendances\ntemporelles et détecter des anomalies dans une série.",
      fontSize: 11,
      fill: "#666",
      backgroundColor: "#f5f5f5",
      padding: [6, 10],
      borderRadius: 4,
    },
  },
};

const notes = `
## 📚 Note pédagogique : Graphique en ligne (Line Chart)

### ✅ Quand utiliser ce type de diagramme

Le graphique en ligne est idéal dans les situations suivantes :

- **Visualiser une évolution temporelle** : suivi de métriques sur des jours, semaines, mois ou années
- **Détecter des tendances** : croissance, décroissance, saisonnalité
- **Identifier des anomalies** : pics ou chutes soudaines dans les données
- **Comparer plusieurs séries** : évolution parallèle de 2-5 variables sur la même période
- **Montrer la continuité** : quand les données ont une progression logique entre les points

**Exemples concrets :**
- Évolution du chiffre d'affaires mensuel
- Suivi de la température sur une journée
- Progression du nombre d'utilisateurs actifs

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le graphique en ligne dans ces cas :

- **Données catégorielles sans ordre** : utilisez plutôt un diagramme en barres
- **Comparaison de proportions** : préférez un camembert ou un treemap
- **Peu de points de données** (< 3) : un tableau ou des indicateurs chiffrés seront plus clairs
- **Données non continues** : si les points n'ont pas de lien logique entre eux
- **Trop de séries** (> 5-6 lignes) : le graphique devient illisible, envisagez des small multiples

**Erreurs courantes à éviter :**
- Ne pas connecter des points qui n'ont pas de relation temporelle
- Ne pas utiliser pour des données cumulées (préférer un area chart)

### 📊 Analyse de ce graphique

Ce graphique montre la fréquentation d'un site e-commerce sur une semaine avec :

- **Un incident identifié** : la chute de 38% le vendredi (13 500 visiteurs vs 21 800 la veille)
- **Une reprise le week-end** : le dimanche atteint le pic de la semaine (26 000 visiteurs)
- **La ligne de moyenne** : permet de contextualiser chaque valeur par rapport à la tendance générale

**Décision à prendre** : Investiguer l'incident serveur du vendredi et mettre en place des alertes automatiques.
`;

export default function BasicLineChart() {
  return (
    <ChartEditor
      title="Basic Line Chart"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
