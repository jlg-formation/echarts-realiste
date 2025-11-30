import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Commits par développeur - Équipe Tech - Novembre 2024
const developpeurs = [
  { nom: "Alice Martin", commits: 187, lignes: 12450, tickets: 34 },
  { nom: "Thomas Bernard", commits: 156, lignes: 9800, tickets: 28 },
  { nom: "Sophie Dubois", commits: 142, lignes: 8920, tickets: 31 },
  { nom: "Lucas Moreau", commits: 128, lignes: 7650, tickets: 25 },
  { nom: "Emma Petit", commits: 115, lignes: 6800, tickets: 22 },
  { nom: "Hugo Leroy", commits: 98, lignes: 5400, tickets: 19 },
  { nom: "Léa Roux", commits: 87, lignes: 4200, tickets: 17 },
  { nom: "Nathan Fournier", commits: 76, lignes: 3800, tickets: 15 },
  { nom: "Chloé Girard", commits: 65, lignes: 2900, tickets: 12 },
  { nom: "Maxime Bonnet", commits: 42, lignes: 1800, tickets: 8 },
];

const moyenneCommits = Math.round(
  developpeurs.reduce((acc, d) => acc + d.commits, 0) / developpeurs.length,
);
const totalCommits = developpeurs.reduce((acc, d) => acc + d.commits, 0);

const option: EChartsOption = {
  title: {
    text: "Activité Git par développeur - Novembre 2024",
    subtext: `${totalCommits.toLocaleString("fr-FR")} commits au total · Moyenne : ${moyenneCommits} commits/dev · 🏆 Alice Martin en tête`,
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
      const p = (
        params as { name: string; value: number; dataIndex: number }[]
      )[0];
      const dev = developpeurs[p.dataIndex];
      const ecartMoyenne = dev.commits - moyenneCommits;
      const ecartColor = ecartMoyenne >= 0 ? "#22c55e" : "#f59e0b";
      const ecartSign = ecartMoyenne >= 0 ? "+" : "";
      return `
        <b>${dev.nom}</b><br/><br/>
        Commits : <b>${dev.commits}</b><br/>
        Lignes modifiées : ${dev.lignes.toLocaleString("fr-FR")}<br/>
        Tickets résolus : ${dev.tickets}<br/>
        <span style="color: ${ecartColor}">${ecartSign}${ecartMoyenne} vs moyenne</span>
      `;
    },
  },
  grid: {
    left: 60,
    right: 40,
    bottom: 100,
    top: 80,
  },
  xAxis: {
    type: "category",
    data: developpeurs.map((d) => d.nom),
    axisLabel: {
      rotate: 35,
      fontSize: 11,
      interval: 0,
      fontWeight: "bold",
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
    name: "Nombre de commits",
    nameLocation: "middle",
    nameGap: 45,
    axisLabel: {
      fontSize: 11,
    },
  },
  series: [
    {
      type: "bar",
      data: developpeurs.map((d, index) => {
        let couleur = "#64748b"; // Gris par défaut
        if (index === 0)
          couleur = "#f59e0b"; // Or - 1er
        else if (index === 1)
          couleur = "#94a3b8"; // Argent - 2ème
        else if (index === 2)
          couleur = "#b45309"; // Bronze - 3ème
        else if (d.commits < moyenneCommits * 0.6) couleur = "#ef4444"; // Rouge - En dessous de 60% de la moyenne

        return {
          value: d.commits,
          itemStyle: {
            color: couleur,
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: "top" as const,
            formatter: `${d.commits}`,
            fontSize: 10,
            fontWeight: "bold" as const,
          },
        };
      }),
      barWidth: "60%",
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "Moyenne",
            label: {
              formatter: `Moy : {c}`,
              position: "insideEndTop",
            },
            lineStyle: {
              color: "#3b82f6",
              type: "dashed",
              width: 2,
            },
          },
        ],
        symbol: ["none", "none"],
      },
    },
  ],
  graphic: [
    {
      type: "text",
      left: "center",
      bottom: 5,
      style: {
        text: "🥇 1er  |  🥈 2ème  |  🥉 3ème  |  🔴 < 60% de la moyenne",
        fontSize: 10,
        fill: "#6b7280",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres avec labels orientés

### ✅ Quand utiliser ce type de diagramme

Ce type de diagramme avec rotation des labels est adapté pour :

- **Catégories avec noms longs** : noms de personnes, produits, entreprises
- **10-20 catégories** : assez pour un classement, pas trop pour rester lisible
- **Comparaison ordonnée** : du plus performant au moins performant
- **Données avec contexte supplémentaire** : tooltip riche avec détails
- **Visualisation de performance d'équipe** : qui contribue le plus

**Exemples concrets :**
- Commits par développeur
- Ventes par commercial
- Notes par étudiant
- Performance par équipe

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce diagramme dans ces cas :

- **Données temporelles** : préférez un line chart
- **Comparaison de proportions** : préférez un pie chart
- **Trop de catégories** (> 20) : le graphique devient illisible même avec rotation
- **Labels très longs** : utilisez un bar chart horizontal
- **Besoin de précision** : la rotation rend la lecture moins précise

**Erreurs courantes à éviter :**
- Rotation excessive (> 45°) qui rend les labels verticaux
- Labels qui se chevauchent par manque d'espace
- Couleurs sans signification

### 🔧 Fonctionnalités ECharts utilisées

- **axisLabel.rotate** : rotation des étiquettes pour éviter le chevauchement
- **markLine.type: "average"** : ligne de moyenne automatique
- **Couleurs conditionnelles** : podium + alerte sous-performance
- **label.position: "top"** : valeurs au-dessus des barres
- **axisTick.alignWithLabel** : ticks alignés avec les barres

### 📊 Analyse de ce graphique

Ce graphique présente l'activité Git de l'équipe Tech en novembre 2024 :

- **🏆 Top contributeur** : Alice Martin (187 commits, 12 450 lignes)
- **✅ Au-dessus de la moyenne** : Thomas, Sophie, Lucas, Emma (> 110 commits)
- **⚠️ En dessous de la moyenne** : Hugo, Léa, Nathan, Chloé
- **🔴 Alerte** : Maxime Bonnet (42 commits) - à investiguer

**Insight clé** : Une forte disparité existe dans l'équipe. Les 3 premiers développeurs représentent 45 % des commits. Cela peut indiquer :
- Une concentration de l'expertise sur quelques personnes
- Des juniors en montée en compétence
- Des développeurs sur des tâches non-code (architecture, review, meetings)

**Points d'attention** :
1. Ne pas confondre quantité et qualité (commits ≠ valeur produite)
2. Contextualiser avec les tickets résolus et la complexité
3. Vérifier si Maxime a des circonstances particulières (formation, maladie, projets transverses)

**Actions suggérées** :
1. Croiser avec les métriques qualité (bugs, code review)
2. Mettre en place du pair programming pour équilibrer
3. Entretien individuel avec les contributeurs en queue de liste
`;

export default function BarLabelRotation() {
  return (
    <ChartEditor
      title="Bar Label Rotation"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
