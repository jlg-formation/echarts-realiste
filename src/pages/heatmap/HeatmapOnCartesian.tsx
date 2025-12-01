import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données d'affluence métro - Ligne 1 Paris, semaine type
// Format: [heure (0-23), station (0-6), nombre de passagers]
const stations = [
  "La Défense",
  "Charles de Gaulle Étoile",
  "Châtelet",
  "Gare de Lyon",
  "Nation",
  "Vincennes",
  "Château de Vincennes",
];

const heures = [
  "6h",
  "7h",
  "8h",
  "9h",
  "10h",
  "11h",
  "12h",
  "13h",
  "14h",
  "15h",
  "16h",
  "17h",
  "18h",
  "19h",
  "20h",
  "21h",
  "22h",
];

// Génération de données réalistes d'affluence métro
// Pics le matin (8h-9h) et le soir (17h-19h), creux en milieu de journée
const generateMetroData = () => {
  const data: [number, number, number][] = [];

  // Profils d'affluence par station (coefficient multiplicateur)
  const profilsStations = [1.2, 1.5, 1.8, 1.4, 1.0, 0.6, 0.5]; // La Défense très fréquentée, extrémités moins

  // Profil horaire type (coefficient)
  const profilHoraire = [
    0.3, // 6h
    0.7, // 7h
    1.0, // 8h - pic matin
    0.9, // 9h
    0.5, // 10h
    0.4, // 11h
    0.5, // 12h
    0.5, // 13h
    0.4, // 14h
    0.5, // 15h
    0.6, // 16h
    0.9, // 17h
    1.0, // 18h - pic soir
    0.8, // 19h
    0.5, // 20h
    0.3, // 21h
    0.2, // 22h
  ];

  for (let h = 0; h < heures.length; h++) {
    for (let s = 0; s < stations.length; s++) {
      // Base de 5000 passagers, modulée par les profils
      const base = 5000;
      const variation = Math.random() * 0.3 + 0.85; // ±15% de variation aléatoire
      const affluence = Math.round(
        base * profilHoraire[h] * profilsStations[s] * variation,
      );
      data.push([h, s, affluence]);
    }
  }

  return data;
};

const data = generateMetroData();
const maxValue = Math.max(...data.map((d) => d[2]));

const option: EChartsOption = {
  title: {
    text: "Affluence Métro Ligne 1 - Semaine type",
    subtext:
      "🚇 Pic d'affluence à Châtelet : 8h-9h et 17h-19h (jusqu'à 9 000 passagers/h)",
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
    position: "top",
    formatter: (params: unknown) => {
      const p = params as { value: [number, number, number] };
      const heure = heures[p.value[0]];
      const station = stations[p.value[1]];
      const affluence = p.value[2].toLocaleString("fr-FR");
      return `<strong>${station}</strong><br/>
              ${heure}<br/>
              Passagers : <strong>${affluence}</strong>`;
    },
  },
  grid: {
    left: "18%",
    right: "12%",
    top: "15%",
    bottom: "15%",
  },
  xAxis: {
    type: "category",
    data: heures,
    name: "Heure",
    nameLocation: "middle",
    nameGap: 30,
    splitArea: {
      show: true,
    },
    axisLabel: {
      fontSize: 11,
    },
  },
  yAxis: {
    type: "category",
    data: stations,
    name: "Station",
    nameLocation: "middle",
    nameGap: 100,
    splitArea: {
      show: true,
    },
    axisLabel: {
      fontSize: 11,
    },
  },
  visualMap: {
    min: 0,
    max: maxValue,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "2%",
    inRange: {
      color: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#2171b5"],
    },
    text: ["Forte affluence", "Faible"],
    textStyle: {
      fontSize: 11,
    },
    formatter: (value: unknown) => {
      return Math.round(value as number).toLocaleString("fr-FR");
    },
  },
  series: [
    {
      name: "Affluence",
      type: "heatmap",
      data: data,
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Heatmap (Carte de chaleur)

### ✅ Quand utiliser ce type de diagramme

La heatmap est idéale dans les situations suivantes :

- **Croiser deux dimensions catégorielles** : heures × jours, produits × régions, employés × compétences
- **Identifier des patterns dans une matrice** : repérer visuellement les zones de concentration
- **Visualiser des corrélations** : matrice de corrélation entre variables
- **Analyser des séries temporelles cycliques** : activité par heure de la journée sur plusieurs jours
- **Comparer des distributions** : taux de conversion par segment et canal

**Exemples concrets :**
- Affluence d'un lieu par heure et jour de la semaine
- Performance commerciale par vendeur et mois
- Temps de réponse serveur par endpoint et plage horaire
- Qualité de l'air par zone et période

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez la heatmap dans ces cas :

- **Données continues sans catégories** : préférez un scatter plot ou line chart
- **Peu de cellules** (< 20) : un tableau avec valeurs sera plus lisible
- **Trop de catégories** : la heatmap devient illisible au-delà de ~50×50 cellules sans zoom
- **Valeurs précises importantes** : les couleurs sont approximatives, utilisez un tableau
- **Comparaison de tendances** : un line chart montre mieux l'évolution

**Erreurs courantes à éviter :**
- Utiliser trop de couleurs différentes (3-7 nuances suffisent)
- Oublier la légende de l'échelle de couleurs
- Ne pas ordonner logiquement les axes (par valeur ou chronologiquement)
- Ignorer les daltoniens : éviter rouge-vert seul, préférer des dégradés monochromes

### 📊 Analyse de ce graphique

Cette heatmap visualise l'affluence du métro parisien (Ligne 1) et révèle :

- **Pics de fréquentation** : les stations centrales (Châtelet, Charles de Gaulle Étoile) aux heures de pointe
- **Asymétrie matin/soir** : le pic du soir est plus étalé (17h-19h) que celui du matin (8h-9h)
- **Gradient géographique** : l'affluence diminue vers les terminus (Vincennes, Château de Vincennes)

**Décision à prendre** : Renforcer la fréquence des rames entre 8h et 9h sur le tronçon La Défense - Châtelet.

### 🎨 Bonnes pratiques appliquées

- **Dégradé de bleu monochrome** : accessible aux daltoniens
- **Stations ordonnées géographiquement** : du ouest (La Défense) à l'est (Château de Vincennes)
- **Heures ordonnées chronologiquement** : lecture naturelle de gauche à droite
- **Tooltip riche** : affiche la station, l'heure et le nombre exact de passagers
`;

export default function HeatmapOnCartesian() {
  return (
    <ChartEditor
      title="Heatmap on Cartesian"
      section="Heatmap"
      option={option}
      notes={notes}
    />
  );
}
