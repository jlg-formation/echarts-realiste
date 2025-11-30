import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Balance commerciale France - Données mensuelles 2024 (en milliards €)
// Source fictive mais réaliste basée sur les tendances économiques

interface BalanceMensuelle {
  mois: string;
  exportations: number;
  importations: number;
  solde: number; // exportations - importations
}

const donnees: BalanceMensuelle[] = [
  { mois: "Janv.", exportations: 48.2, importations: 54.1, solde: -5.9 },
  { mois: "Févr.", exportations: 46.8, importations: 52.3, solde: -5.5 },
  { mois: "Mars", exportations: 51.4, importations: 55.8, solde: -4.4 },
  { mois: "Avril", exportations: 49.6, importations: 53.2, solde: -3.6 },
  { mois: "Mai", exportations: 52.1, importations: 54.7, solde: -2.6 },
  { mois: "Juin", exportations: 53.8, importations: 52.9, solde: 0.9 },
  { mois: "Juil.", exportations: 47.2, importations: 49.8, solde: -2.6 },
  { mois: "Août", exportations: 42.5, importations: 46.1, solde: -3.6 },
  { mois: "Sept.", exportations: 54.3, importations: 53.1, solde: 1.2 },
  { mois: "Oct.", exportations: 55.7, importations: 54.2, solde: 1.5 },
  { mois: "Nov.", exportations: 53.2, importations: 55.8, solde: -2.6 },
  { mois: "Déc.", exportations: 48.9, importations: 52.4, solde: -3.5 },
];

// Calcul des totaux
const totalExport = donnees.reduce((acc, d) => acc + d.exportations, 0);
const totalImport = donnees.reduce((acc, d) => acc + d.importations, 0);
const soldeCumule = totalExport - totalImport;
const moisExcedentaire = donnees.filter((d) => d.solde > 0).length;

const option: EChartsOption = {
  title: {
    text: "Balance commerciale France - 2024",
    subtext: `📊 Solde annuel : ${soldeCumule.toFixed(1)} Mds€ | ${moisExcedentaire} mois excédentaires sur 12`,
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
        seriesName: string;
        value: number;
        dataIndex: number;
        color: string;
      }[];

      const idx = p[0].dataIndex;
      const d = donnees[idx];
      const soldeColor = d.solde >= 0 ? "#27ae60" : "#e74c3c";
      const soldeIcon = d.solde >= 0 ? "📈 Excédent" : "📉 Déficit";

      return `
        <b>${d.mois} 2024</b><br/><br/>
        <span style="display:inline-block;width:10px;height:10px;background:#27ae60;border-radius:50%;margin-right:5px"></span>
        Exportations : <b>${d.exportations.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} Mds€</b><br/>
        <span style="display:inline-block;width:10px;height:10px;background:#e74c3c;border-radius:50%;margin-right:5px"></span>
        Importations : <b>${d.importations.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} Mds€</b><br/><br/>
        <span style="color:${soldeColor};font-weight:bold">
          ${soldeIcon} : ${d.solde >= 0 ? "+" : ""}${d.solde.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} Mds€
        </span>
      `;
    },
  },
  legend: {
    data: ["Exportations", "Importations", "Solde"],
    bottom: 10,
    itemWidth: 14,
    itemHeight: 14,
  },
  grid: {
    left: 70,
    right: 70,
    bottom: 80,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: donnees.map((d) => d.mois),
    axisLabel: {
      fontSize: 11,
    },
    axisLine: {
      onZero: true,
    },
  },
  yAxis: [
    {
      type: "value",
      name: "Volume (Mds€)",
      nameLocation: "middle",
      nameGap: 50,
      position: "left",
      min: 0,
      max: 60,
      axisLabel: {
        formatter: (value: number) => `${value.toLocaleString("fr-FR")} Mds€`,
      },
    },
    {
      type: "value",
      name: "Solde (Mds€)",
      nameLocation: "middle",
      nameGap: 50,
      position: "right",
      min: -8,
      max: 4,
      axisLabel: {
        formatter: (value: number) => {
          const signe = value > 0 ? "+" : "";
          return `${signe}${value.toLocaleString("fr-FR")} Mds€`;
        },
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "Exportations",
      type: "bar",
      yAxisIndex: 0,
      barWidth: "30%",
      itemStyle: {
        color: "#27ae60",
        borderRadius: [4, 4, 0, 0],
      },
      data: donnees.map((d) => d.exportations),
    },
    {
      name: "Importations",
      type: "bar",
      yAxisIndex: 0,
      barWidth: "30%",
      itemStyle: {
        color: "#e74c3c",
        borderRadius: [4, 4, 0, 0],
      },
      data: donnees.map((d) => d.importations),
    },
    {
      name: "Solde",
      type: "bar",
      yAxisIndex: 1,
      barWidth: "15%",
      data: donnees.map((d) => ({
        value: d.solde,
        itemStyle: {
          color: d.solde >= 0 ? "#3498db" : "#9b59b6",
          borderRadius: d.solde >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
        },
        label: {
          show: Math.abs(d.solde) >= 1,
          position: d.solde >= 0 ? "top" : "bottom",
          formatter: `${d.solde >= 0 ? "+" : ""}${d.solde.toFixed(1)}`,
          fontSize: 9,
          fontWeight: "bold",
          color: d.solde >= 0 ? "#3498db" : "#9b59b6",
        },
      })),
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: {
          type: "solid",
          width: 1,
          color: "#2c3e50",
        },
        data: [
          {
            yAxis: 0,
            label: {
              show: false,
            },
          },
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres avec valeurs négatives

### ✅ Quand utiliser ce type de diagramme

Ce type de graphique est idéal pour :

- **Visualiser des soldes positifs et négatifs** : balance commerciale, résultat net
- **Comparer des flux entrants et sortants** : imports/exports, recettes/dépenses
- **Montrer des variations autour d'un axe zéro** : croissance vs décroissance
- **Analyser des écarts** : prévu vs réalisé, objectif vs performance
- **Afficher des gains et pertes** : P&L par ligne de produit

**Exemples concrets :**
- Balance commerciale (exports - imports)
- Résultat net mensuel (revenus - charges)
- Variation d'effectif (embauches - départs)
- Performance vs benchmark

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce graphique dans ces situations :

- **Valeurs uniquement positives** : un bar chart classique suffit
- **Proportions d'un tout** : préférez un pie chart
- **Tendances sur longue période** : un line chart sera plus lisible
- **Trop de catégories** : au-delà de 12-15, le graphique est surchargé

**Erreurs courantes à éviter :**
- Ne pas faire démarrer l'axe Y à 0 (distorsion visuelle)
- Utiliser la même couleur pour positif et négatif
- Oublier la ligne de référence à y=0

### 🔧 Fonctionnalités ECharts utilisées

- **Valeurs négatives** : ECharts gère nativement les barres sous l'axe zéro
- **Deux axes Y** : un pour le volume, un pour le solde (échelles différentes)
- **Border radius adaptatif** : arrondi en haut si positif, en bas si négatif
- **markLine à y=0** : ligne de référence horizontale
- **Couleurs sémantiques** : vert = export (positif), rouge = import (négatif pour la balance)

### 📊 Analyse de ce graphique

Ce graphique montre la balance commerciale de la France en 2024 :

**Tendance générale** : Déficit structurel de -30,7 Mds€ sur l'année

**Mois excédentaires** (3 sur 12) :
- Juin : +0,9 Mds€ (pic des exportations aéronautiques)
- Septembre : +1,2 Mds€ (reprise post-vacances)
- Octobre : +1,5 Mds€ (meilleur mois de l'année)

**Mois les plus déficitaires** :
- Janvier : -5,9 Mds€ (facture énergétique hivernale)
- Février : -5,5 Mds€

**Saisonnalité** : Le déficit se creuse en hiver (énergie) et en août (baisse d'activité). Il se réduit au printemps et en automne.

**Insight clé** : La France importe plus qu'elle n'exporte de façon structurelle. Les pics d'exportation (aéronautique, luxe) compensent partiellement la facture énergétique.

**Décisions à prendre** :
1. Réduire la dépendance énergétique (nucléaire, renouvelables)
2. Soutenir les secteurs exportateurs (aéronautique, luxe, agroalimentaire)
3. Favoriser la réindustrialisation pour substituer les imports
`;

export default function BarChartWithNegativeValue() {
  return (
    <ChartEditor
      title="Bar Chart with Negative Value"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
