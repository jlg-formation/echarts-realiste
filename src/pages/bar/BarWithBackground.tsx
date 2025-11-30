import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données d'occupation hôtelière - Hôtel Le Panorama *** - Semaine 47 (Nov 2024)
const jours = [
  "Lun 18/11",
  "Mar 19/11",
  "Mer 20/11",
  "Jeu 21/11",
  "Ven 22/11",
  "Sam 23/11",
  "Dim 24/11",
];

// Capacité totale : 120 chambres
const capacite = 120;
const chambresOccupees = [78, 85, 92, 96, 114, 118, 89];
const tauxOccupation = chambresOccupees.map((c) =>
  Math.round((c / capacite) * 100),
);

// Seuils métier
const seuilRentabilite = 70; // 70% minimum pour être rentable
const seuilOptimal = 90; // Au-delà de 90%, on est en surcharge

const getColorByTaux = (taux: number): string => {
  if (taux >= seuilOptimal) return "#27ae60"; // Excellent - vert
  if (taux >= seuilRentabilite) return "#f39c12"; // Correct - orange
  return "#e74c3c"; // Critique - rouge
};

const option: EChartsOption = {
  title: {
    text: "Taux d'occupation - Hôtel Le Panorama *** - Semaine 47",
    subtext:
      "🎯 Objectif rentabilité : 70% | Capacité : 120 chambres | Moyenne semaine : 88%",
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
      }[];
      const idx = p[0].dataIndex;
      const taux = tauxOccupation[idx];
      const chambres = chambresOccupees[idx];
      const disponibles = capacite - chambres;

      let status = "";
      if (taux >= seuilOptimal) {
        status = "✅ Excellent - Quasi complet";
      } else if (taux >= seuilRentabilite) {
        status = "⚠️ Correct - Objectif atteint";
      } else {
        status = "🔴 Critique - Sous le seuil de rentabilité";
      }

      return `
        <b>${p[0].name}</b><br/><br/>
        Taux d'occupation : <b>${taux} %</b><br/>
        Chambres occupées : ${chambres} / ${capacite}<br/>
        Chambres disponibles : ${disponibles}<br/><br/>
        ${status}
      `;
    },
  },
  grid: {
    left: 60,
    right: 40,
    bottom: 80,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: jours,
    axisLabel: {
      fontSize: 11,
    },
  },
  yAxis: {
    type: "value",
    name: "Taux d'occupation (%)",
    nameLocation: "middle",
    nameGap: 45,
    max: 100,
    axisLabel: {
      formatter: "{value} %",
    },
  },
  series: [
    {
      name: "Capacité totale",
      type: "bar",
      barWidth: "50%",
      silent: true,
      itemStyle: {
        color: "rgba(180, 180, 180, 0.3)",
        borderRadius: [4, 4, 0, 0],
      },
      data: Array(7).fill(100),
      z: 1,
    },
    {
      name: "Taux d'occupation",
      type: "bar",
      barWidth: "50%",
      barGap: "-100%",
      data: tauxOccupation.map((taux) => ({
        value: taux,
        itemStyle: {
          color: getColorByTaux(taux),
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          formatter: `${taux} %`,
          fontSize: 12,
          fontWeight: "bold",
          color: getColorByTaux(taux),
        },
      })),
      z: 2,
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: {
          type: "dashed",
          width: 2,
        },
        data: [
          {
            yAxis: seuilRentabilite,
            label: {
              formatter: "Seuil rentabilité (70%)",
              position: "insideEndTop",
              fontSize: 10,
            },
            lineStyle: {
              color: "#e74c3c",
            },
          },
          {
            yAxis: seuilOptimal,
            label: {
              formatter: "Optimal (90%)",
              position: "insideEndTop",
              fontSize: 10,
            },
            lineStyle: {
              color: "#27ae60",
            },
          },
        ],
      },
    },
  ],
  legend: {
    data: [
      {
        name: "Taux d'occupation",
        icon: "roundRect",
      },
    ],
    bottom: 10,
    itemWidth: 14,
    itemHeight: 14,
  },
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres avec fond (Bar with Background)

### ✅ Quand utiliser ce type de diagramme

Ce type de graphique est particulièrement adapté pour :

- **Visualiser un taux de remplissage** : occupation hôtelière, places de parking, capacité d'un événement
- **Montrer la progression vers un maximum** : jauge visuelle intuitive
- **Comparer des pourcentages avec leur contexte** : le fond gris représente le 100% possible
- **Afficher des quotas ou limites** : budget consommé vs budget total
- **KPIs avec objectif fixe** : taux de conversion, NPS, SLA

**Exemples concrets :**
- Taux d'occupation d'un hôtel, d'un parking
- Progression des ventes vs objectif
- Capacité serveur utilisée
- Places disponibles dans un événement

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce graphique dans ces situations :

- **Valeurs sans maximum défini** : chiffre d'affaires, nombre de visiteurs
- **Comparaisons multiples** : trop de barres avec fond devient confus
- **Données temporelles longues** : préférez un line chart
- **Valeurs négatives possibles** : le fond ne fonctionne que pour 0-100%
- **Échelles différentes** : chaque barre doit avoir le même maximum

**Erreurs courantes à éviter :**
- Ne pas aligner les barres avec \`barGap: '-100%'\`
- Oublier de définir un z-index pour superposer correctement
- Utiliser des couleurs de fond trop visibles qui distraient

### 🔧 Fonctionnalités ECharts utilisées

- **Barres superposées** : \`barGap: '-100%'\` pour aligner parfaitement les barres
- **Z-index** : contrôle de l'ordre d'affichage avec \`z: 1\` et \`z: 2\`
- **Barre silencieuse** : \`silent: true\` désactive les interactions sur le fond
- **markLine** : lignes de seuils métier (rentabilité, optimal)
- **Couleurs conditionnelles** : vert/orange/rouge selon les seuils

### 📊 Analyse de ce graphique

Ce graphique montre l'occupation de l'Hôtel Le Panorama sur la semaine 47 :

- **🏆 Pic du week-end** : Vendredi (95%) et Samedi (98%) quasi complets
- **⚠️ Début de semaine plus calme** : Lundi (65%) sous le seuil de rentabilité
- **📈 Tendance** : montée progressive du lundi au samedi
- **Moyenne semaine** : 88%, au-dessus de l'objectif de 70%

**Insight clé** : Le lundi est le seul jour sous le seuil de rentabilité. Une offre promotionnelle "Dimanche + Lundi" pourrait améliorer ce point faible.

**Décisions à prendre** :
1. Créer une offre "Early Week" pour les lundis et mardis
2. Envisager une maintenance le lundi (faible impact)
3. Augmenter les tarifs week-end en période de forte demande
`;

export default function BarWithBackground() {
  return (
    <ChartEditor
      title="Bar with Background"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
