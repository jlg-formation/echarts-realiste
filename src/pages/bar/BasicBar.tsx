import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données de ventes par région - T3 2024
const regions = [
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Hauts-de-France",
  "Provence-Alpes-Côte d'Azur",
  "Grand Est",
  "Pays de la Loire",
];

const ventesT3 = [
  2450000, 1890000, 1650000, 1420000, 1380000, 1250000, 980000, 920000,
];
const objectifs = [
  2200000, 1800000, 1500000, 1400000, 1500000, 1300000, 1100000, 1000000,
];

// Calcul des écarts
const ecarts = ventesT3.map((vente, i) => {
  const ecart = ((vente - objectifs[i]) / objectifs[i]) * 100;
  return Math.round(ecart);
});

const option: EChartsOption = {
  title: {
    text: "Ventes T3 2024 par région",
    subtext:
      "🎯 5 régions sur 8 ont dépassé leur objectif · Total : 11,94 M€ (+4,2 % vs objectif)",
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
    axisPointer: {
      type: "shadow",
    },
    formatter: (params: unknown) => {
      const p = params as {
        name: string;
        value: number;
        dataIndex: number;
        seriesName: string;
      }[];

      const idx = p[0].dataIndex;
      const vente = ventesT3[idx];
      const objectif = objectifs[idx];
      const ecart = ecarts[idx];
      const ecartColor = ecart >= 0 ? "#22c55e" : "#ef4444";
      const ecartIcon = ecart >= 0 ? "✅" : "⚠️";

      return `
        <b>${p[0].name}</b><br/><br/>
        Ventes : <b>${(vente / 1000000).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M€</b><br/>
        Objectif : ${(objectif / 1000000).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M€<br/>
        <span style="color: ${ecartColor}">${ecartIcon} ${ecart >= 0 ? "+" : ""}${ecart} % vs objectif</span>
      `;
    },
  },
  legend: {
    data: ["Ventes T3 2024", "Objectif"],
    bottom: 10,
  },
  grid: {
    left: 20,
    right: 40,
    bottom: 60,
    top: 80,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: regions,
    axisLabel: {
      rotate: 25,
      fontSize: 11,
      interval: 0,
    },
  },
  yAxis: {
    type: "value",
    name: "Chiffre d'affaires",
    nameLocation: "middle",
    nameGap: 60,
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000000) {
          return `${(value / 1000000).toLocaleString("fr-FR")} M€`;
        }
        return `${(value / 1000).toLocaleString("fr-FR")} k€`;
      },
    },
  },
  series: [
    {
      name: "Ventes T3 2024",
      type: "bar",
      data: ventesT3.map((value, index) => {
        const ecart = ecarts[index];
        const objectif = objectifs[index];
        // Positionner le label au-dessus du max entre vente et objectif pour éviter le chevauchement
        const labelOffset =
          value >= objectif ? -5 : -(objectif - value) / 50000 - 15;
        return {
          value,
          itemStyle: {
            // Couleurs claires avec bon contraste : vert clair (succès) vs rouge clair (attention)
            color: ecart >= 0 ? "#86efac" : "#fca5a5",
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: "top",
            offset: [0, labelOffset],
            formatter: () => {
              return ecart >= 0 ? `+${ecart} %` : `${ecart} %`;
            },
            fontSize: 10,
            fontWeight: "bold",
            color: ecart >= 0 ? "#166534" : "#b91c1c",
          },
        };
      }),
      barWidth: "60%",
      markPoint: {
        symbol: "rect",
        symbolSize: [40, 4],
        data: objectifs.map((objectif, index) => ({
          name: "Objectif",
          coord: [index, objectif],
          itemStyle: {
            color: "#000000",
          },
        })),
        label: {
          show: false,
        },
      },
    },
    {
      // Série invisible pour la légende "Objectif"
      name: "Objectif",
      type: "bar",
      data: [],
      itemStyle: {
        color: "#000000",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres (Bar Chart)

### ✅ Quand utiliser ce type de diagramme

Le diagramme en barres est idéal dans les situations suivantes :

- **Comparer des valeurs entre catégories distinctes** : régions, produits, équipes
- **Classer des éléments** : du plus grand au plus petit (ou inversement)
- **Montrer des écarts vs objectif** : performance par rapport à une cible
- **Visualiser des données catégorielles** : sans notion de continuité temporelle
- **Afficher jusqu'à 10-15 catégories** : au-delà, envisager un treemap ou un tableau

**Exemples concrets :**
- Chiffre d'affaires par région ou par vendeur
- Nombre de tickets résolus par agent support
- Budget par département
- Résultats de sondage par réponse

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le diagramme en barres dans ces cas :

- **Données temporelles continues** : préférez un line chart
- **Proportions d'un tout** : préférez un pie chart ou un treemap
- **Trop de catégories** (> 15) : le graphique devient illisible
- **Valeurs très proches** : les différences seront difficiles à percevoir
- **Comparaison de tendances** : un line chart sera plus adapté

**Erreurs courantes à éviter :**
- Commencer l'axe Y à une valeur > 0 (tronque visuellement les données)
- Utiliser des couleurs aléatoires sans signification
- Surcharger avec trop d'annotations

### 🔧 Fonctionnalités ECharts utilisées

- **Couleurs conditionnelles** : vert si objectif atteint, rouge sinon
- **Marqueurs d'objectif (markPoint)** : traits horizontaux indiquant la cible sur chaque barre
- **Labels dynamiques** : affichent le % d'écart au-dessus de chaque barre
- **Tooltip enrichi** : montre vente, objectif et écart en un coup d'œil

### 📊 Analyse de ce graphique

Ce graphique compare les ventes du T3 2024 aux objectifs régionaux :

- **🏆 Top performer** : Île-de-France (+11 % vs objectif, 2,45 M€)
- **⚠️ Régions en difficulté** : 
  - Hauts-de-France (-8 % vs objectif)
  - Grand Est (-11 % vs objectif)
  - Pays de la Loire (-8 % vs objectif)
- **Tendance nationale** : 5 régions sur 8 dépassent leur objectif

**Insight clé** : Les régions sous-performantes sont toutes situées au nord/est de la France. Une analyse approfondie des facteurs locaux (concurrence, saisonnalité, équipe commerciale) est nécessaire.

**Décisions à prendre** :
1. Renforcer l'équipe commerciale dans les régions en difficulté
2. Analyser les best practices de l'Île-de-France pour les répliquer
3. Ajuster les objectifs T4 en fonction des réalités terrain
`;

export default function BasicBar() {
  return (
    <ChartEditor
      title="Basic Bar"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
