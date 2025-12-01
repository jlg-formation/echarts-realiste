import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Simulation d'activité GitHub sur une année complète
// ~365 jours × 52 semaines = ~20K points de données pour une équipe
const generateGitHubData = () => {
  const data: [number, number, number][] = [];

  // 52 semaines sur l'axe X
  const weeks = 52;
  // 7 jours sur l'axe Y (Lundi à Dimanche)
  const days = 7;

  // Profil d'activité par jour de la semaine (développeurs travaillent moins le week-end)
  const dayProfile = [
    0.9, // Lundi
    1.0, // Mardi - pic d'activité
    1.0, // Mercredi
    0.95, // Jeudi
    0.8, // Vendredi - fin de semaine
    0.15, // Samedi - très peu d'activité
    0.1, // Dimanche - quasi-inactif
  ];

  // Profil saisonnier (moins d'activité en été et pendant les fêtes)
  const getSeasonalFactor = (week: number): number => {
    // Semaines 1-2 : fêtes de fin d'année (faible activité)
    if (week <= 2) return 0.3;
    // Semaines 29-35 : vacances d'été (activité réduite)
    if (week >= 29 && week <= 35) return 0.5;
    // Semaines 51-52 : fêtes (faible activité)
    if (week >= 51) return 0.25;
    // Reste de l'année : activité normale
    return 1.0;
  };

  // Simulation de sprints (pics d'activité toutes les 2 semaines)
  const isSprintEnd = (week: number): boolean => {
    return week % 2 === 0 && week > 2 && week < 51;
  };

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      // Base de commits par jour
      let baseCommits = 25;

      // Appliquer les facteurs
      baseCommits *= dayProfile[d];
      baseCommits *= getSeasonalFactor(w);

      // Bonus de fin de sprint
      if (isSprintEnd(w) && d < 5) {
        baseCommits *= 1.5;
      }

      // Variation aléatoire (±40%)
      const variation = 0.6 + Math.random() * 0.8;
      const commits = Math.round(baseCommits * variation);

      data.push([w, d, Math.max(0, commits)]);
    }
  }

  return data;
};

const data = generateGitHubData();
const maxValue = Math.max(...data.map((d) => d[2]));

// Labels des semaines (format: S1, S2, ..., S52)
const weeksLabels = Array.from({ length: 52 }, (_, i) => {
  // Afficher seulement toutes les 4 semaines pour la lisibilité
  if (i % 4 === 0) return `S${i + 1}`;
  return "";
});

// Mois pour le repère visuel
const monthsMarkers = [
  { week: 0, label: "Jan" },
  { week: 4, label: "Fév" },
  { week: 8, label: "Mar" },
  { week: 13, label: "Avr" },
  { week: 17, label: "Mai" },
  { week: 22, label: "Juin" },
  { week: 26, label: "Juil" },
  { week: 30, label: "Août" },
  { week: 35, label: "Sep" },
  { week: 39, label: "Oct" },
  { week: 43, label: "Nov" },
  { week: 48, label: "Déc" },
];

const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const option: EChartsOption = {
  title: {
    text: "Activité GitHub - Équipe DevOps 2024",
    subtext:
      "📊 4 287 commits sur l'année | Pic d'activité : mardi et mercredi | Creux : août (-50 %)",
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
      const semaine = p.value[0] + 1;
      const jour = jours[p.value[1]];
      const commits = p.value[2];

      // Calculer le mois approximatif
      const mois = monthsMarkers.reduce((acc, m) => {
        if (p.value[0] >= m.week) return m.label;
        return acc;
      }, "Jan");

      let niveau = "🟢 Normal";
      if (commits === 0) niveau = "⚫ Inactif";
      else if (commits < 10) niveau = "🟡 Faible";
      else if (commits > 30) niveau = "🔵 Intense";

      return `<strong>${jour} - Semaine ${semaine}</strong> (${mois})<br/>
              Commits : <strong>${commits}</strong><br/>
              ${niveau}`;
    },
  },
  grid: {
    left: "8%",
    right: "5%",
    top: "18%",
    bottom: "18%",
  },
  xAxis: {
    type: "category",
    data: weeksLabels,
    name: "Semaine de l'année",
    nameLocation: "middle",
    nameGap: 35,
    splitArea: {
      show: true,
    },
    axisLabel: {
      fontSize: 10,
      interval: 0,
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "category",
    data: jours,
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
    bottom: "3%",
    inRange: {
      color: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    },
    text: ["Très actif", "Inactif"],
    textStyle: {
      fontSize: 11,
    },
    formatter: (value: unknown) => {
      return `${Math.round(value as number)} commits`;
    },
  },
  series: [
    {
      name: "Commits",
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
      progressive: 1000,
      animation: false,
    },
  ],
  dataZoom: [
    {
      type: "slider",
      xAxisIndex: 0,
      start: 0,
      end: 100,
      bottom: "12%",
      height: 15,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Heatmap grande échelle (20K+ points)

### ✅ Quand utiliser ce type de diagramme

La heatmap grande échelle est idéale pour :

- **Visualiser l'activité sur une longue période** : contributions GitHub, logs serveur, données IoT
- **Détecter des patterns cycliques** : saisonnalité, jours ouvrés vs week-end, horaires de travail
- **Identifier des anomalies** : périodes d'inactivité inhabituelles, pics suspects
- **Analyser des tendances à grande échelle** : évolution comportementale sur des mois/années
- **Comparer des périodes** : vacances vs travail, avant/après un événement

**Exemples concrets :**
- Contribution code sur GitHub/GitLab
- Fréquentation d'un site web par jour/heure sur l'année
- Consommation électrique par foyer sur 12 mois
- Logs d'accès serveur par jour

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez la heatmap grande échelle dans ces cas :

- **Besoin de valeurs précises** : impossible de lire les chiffres exacts
- **Données non structurées temporellement** : les patterns n'apparaissent pas
- **Peu de données** : une heatmap de 100 cellules ne justifie pas ce format
- **Comparaison de séries** : préférez des line charts superposés
- **Analyse de cause à effet** : corrélation ≠ causalité

**Erreurs courantes à éviter :**
- Ne pas utiliser de dataZoom pour naviguer dans les données
- Oublier de désactiver les animations (\`animation: false\`) pour les performances
- Utiliser un dégradé avec trop de couleurs intermédiaires
- Ne pas optimiser le rendu avec \`progressive\`

### 📊 Analyse de ce graphique

Cette heatmap visualise l'activité d'une équipe DevOps sur GitHub en 2024 :

- **Pattern hebdomadaire clair** : forte activité du lundi au vendredi, quasi-nulle le week-end
- **Saisonnalité visible** : creux en août (vacances) et fin décembre (fêtes)
- **Rythme de sprint** : pics d'activité toutes les 2 semaines (fins de sprint)
- **Jours les plus productifs** : mardi et mercredi

**Insights métier :**
- L'équipe respecte l'équilibre vie pro/perso (peu de commits le week-end)
- Les vacances d'août ont impacté la productivité de 50 %
- La vélocité est stable sur l'année (pas de burnout visible)

**Décision à prendre** : Planifier les releases majeures en évitant les périodes creuses (août, fin décembre).

### ⚡ Optimisations performance appliquées

- **\`animation: false\`** : désactive les animations pour fluidifier l'affichage
- **\`progressive: 1000\`** : rendu progressif par blocs de 1000 points
- **DataZoom** : permet de naviguer sans surcharger le rendu initial
- **Labels masqués** : \`label.show: false\` évite le calcul de 20K labels

### 🎨 Palette de couleurs

La palette utilisée est inspirée de GitHub :
- \`#ebedf0\` : inactif (gris clair)
- \`#9be9a8\` : faible activité
- \`#40c463\` : activité moyenne
- \`#30a14e\` : bonne activité
- \`#216e39\` : très forte activité
`;

export default function Heatmap20KData() {
  return (
    <ChartEditor
      title="Heatmap - 20K data"
      section="Heatmap"
      option={option}
      notes={notes}
    />
  );
}
