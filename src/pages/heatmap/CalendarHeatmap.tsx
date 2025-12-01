import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Génération de données d'activité sportive sur une année (style Strava)
// Format: [date, distance en km]
const generateYearActivityData = () => {
  const data: [string, number][] = [];
  const year = 2024;

  // Profils d'activité par jour de la semaine (0=dimanche)
  // Plus d'activité les weekends et mardi/jeudi (entraînements)
  const weekdayProfile = [1.2, 0.6, 0.9, 0.5, 0.9, 0.7, 1.3];

  // Profils saisonniers (plus d'activité au printemps/été)
  const monthProfile = [
    0.5, 0.6, 0.8, 1.0, 1.2, 1.3, 1.2, 1.1, 1.0, 0.8, 0.6, 0.4,
  ];

  // Date de début et fin
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Simulation d'une période de blessure (août)
  const blessureDebut = new Date(year, 7, 10);
  const blessureFin = new Date(year, 7, 28);

  // Simulation d'un stage sportif (juin)
  const stageDebut = new Date(year, 5, 15);
  const stageFin = new Date(year, 5, 22);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const dayOfWeek = d.getDay();
    const month = d.getMonth();

    // Calcul de la distance de base
    const baseDistance = 8; // 8 km de base
    const multiplier = weekdayProfile[dayOfWeek] * monthProfile[month];

    // Ajouter de la variabilité aléatoire
    const randomFactor = 0.5 + Math.random();
    let distance = baseDistance * multiplier * randomFactor;

    // Période de blessure : activité très réduite
    if (d >= blessureDebut && d <= blessureFin) {
      distance = Math.random() < 0.7 ? 0 : Math.random() * 2; // 70% repos, 30% petite activité
    }

    // Stage sportif : activité intense
    if (d >= stageDebut && d <= stageFin) {
      distance = 15 + Math.random() * 10; // 15-25 km/jour
    }

    // Certains jours de repos complet (~20% des jours normaux)
    if (Math.random() < 0.2 && distance > 0 && d < blessureDebut) {
      distance = 0;
    }

    // Arrondir à 1 décimale
    distance = Math.round(distance * 10) / 10;

    data.push([dateStr, distance]);
  }

  return data;
};

const activityData = generateYearActivityData();

// Calculer les statistiques
const totalKm = activityData.reduce((sum, d) => sum + d[1], 0);
const activeDays = activityData.filter((d) => d[1] > 0).length;
const maxDay = activityData.reduce(
  (max, d) => (d[1] > max[1] ? d : max),
  activityData[0],
);

const option: EChartsOption = {
  title: {
    text: "Activité running 2024 - Profil sportif amateur",
    subtext: `🏃 ${Math.round(totalKm).toLocaleString("fr-FR")} km total | ${activeDays} jours actifs | Record : ${maxDay[1]} km le ${new Date(maxDay[0]).toLocaleDateString("fr-FR")}`,
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
    formatter: (params: unknown) => {
      const p = params as { value: [string, number] };
      const date = new Date(p.value[0]).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      const distance = p.value[1];
      if (distance === 0) {
        return `<strong>${date}</strong><br/>😴 Jour de repos`;
      }
      const intensite =
        distance >= 15
          ? "🔥 Sortie longue"
          : distance >= 8
            ? "💪 Entraînement"
            : "🚶 Récup active";
      return `<strong>${date}</strong><br/>${intensite}<br/>Distance : <strong>${distance.toLocaleString("fr-FR")} km</strong>`;
    },
  },
  visualMap: {
    min: 0,
    max: 25,
    type: "piecewise",
    pieces: [
      { min: 0, max: 0, label: "Repos", color: "#ebedf0" },
      { min: 0.1, max: 5, label: "1-5 km", color: "#9be9a8" },
      { min: 5, max: 10, label: "5-10 km", color: "#40c463" },
      { min: 10, max: 15, label: "10-15 km", color: "#30a14e" },
      { min: 15, max: 25, label: "15+ km", color: "#216e39" },
    ],
    orient: "horizontal",
    left: "center",
    bottom: 0,
    textStyle: {
      fontSize: 11,
    },
  },
  calendar: {
    top: 100,
    left: 50,
    right: 30,
    cellSize: ["auto", 15],
    range: "2024",
    itemStyle: {
      borderWidth: 2,
      borderColor: "#fff",
    },
    yearLabel: { show: true, fontSize: 14 },
    dayLabel: {
      firstDay: 1, // Commence le lundi
      nameMap: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      fontSize: 10,
    },
    monthLabel: {
      nameMap: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      fontSize: 11,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ddd",
        width: 1,
      },
    },
  },
  series: [
    {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: activityData,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Calendar Heatmap

### ✅ Quand utiliser ce type de diagramme

Le calendar heatmap est idéal pour :

- **Visualiser l'activité quotidienne sur une année** : contributions code, activité sportive, ventes journalières
- **Identifier des patterns saisonniers** : pics et creux récurrents
- **Repérer des anomalies** : périodes d'inactivité, pics exceptionnels
- **Montrer la régularité** : fréquence d'une action (commits, entraînements, publications)
- **Gamification** : motivation par la visualisation des "streaks" (séries consécutives)

**Exemples concrets :**
- Contributions GitHub d'un développeur
- Activité sportive (Strava, Garmin)
- Ventes quotidiennes d'un commerce
- Consultations médicales d'un cabinet
- Consommation électrique journalière

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le calendar heatmap dans ces cas :

- **Données horaires ou infra-journalières** : trop de détail, utilisez une heatmap classique
- **Comparaison multi-années** : utilisez plusieurs calendriers ou un line chart
- **Peu de données** (< 100 jours) : un graphique en barres sera plus lisible
- **Données sans pattern temporel** : le format calendrier n'apporte rien
- **Valeurs précises importantes** : les couleurs sont approximatives

**Erreurs courantes à éviter :**
- Oublier de normaliser les données si les années n'ont pas la même durée
- Utiliser trop de niveaux de couleur (4-6 suffisent)
- Ne pas commencer la semaine le lundi en contexte français
- Ignorer les jours fériés ou événements qui expliquent les anomalies

### 📊 Analyse de ce graphique

Ce calendar heatmap visualise l'**activité running d'un sportif amateur** sur 2024 :

- **Pattern hebdomadaire** : activité plus intense les weekends et mardi/jeudi
- **Saisonnalité** : pic d'activité au printemps/été, baisse en hiver
- **Stage sportif** : période intense visible en juin (15-25 km/jour)
- **Blessure** : période d'inactivité notable en août (10-28 août)

**Insight actionnable** : Reprendre progressivement après la blessure d'août et maintenir la régularité hivernale pour préparer la saison 2025.

### 🎨 Bonnes pratiques appliquées

- **Dégradé de vert** (style GitHub/Strava) : familier et intuitif
- **Gris pour le repos** : visuellement neutre, ne "pollue" pas la lecture
- **Labels français** : jours et mois en français, semaine commençant le lundi
- **Légende segmentée** : catégories claires (repos, récup, entraînement, sortie longue)
- **Tooltip contextuel** : affiche l'intensité avec emoji et la distance exacte

### ⚙️ Configuration ECharts clé

\`\`\`javascript
calendar: {
  range: '2024',  // Année à afficher
  dayLabel: {
    firstDay: 1,  // Commence le lundi
    nameMap: ['Dim', 'Lun', 'Mar', ...]
  },
  monthLabel: {
    nameMap: ['Janvier', 'Février', ...]
  }
},
series: [{
  type: 'heatmap',
  coordinateSystem: 'calendar',  // Active le mode calendrier
  data: [[date, valeur], ...]
}]
\`\`\`

Le paramètre \`coordinateSystem: 'calendar'\` transforme la heatmap en format calendrier annuel.
`;

export default function CalendarHeatmap() {
  return (
    <ChartEditor
      title="Calendar Heatmap"
      section="Heatmap"
      option={option}
      notes={notes}
    />
  );
}
