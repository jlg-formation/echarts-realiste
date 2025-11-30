import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Répartition du temps de travail par projet - Développeur Senior - Semaine 48/2024
const projets = [
  {
    nom: "API Backend v2",
    heures: 14,
    client: "Interne",
    priorite: "Haute",
    couleur: "#6366f1",
  },
  {
    nom: "App Mobile",
    heures: 10,
    client: "ClientA",
    priorite: "Haute",
    couleur: "#22c55e",
  },
  {
    nom: "Dashboard Analytics",
    heures: 8,
    client: "ClientB",
    priorite: "Moyenne",
    couleur: "#3b82f6",
  },
  {
    nom: "Maintenance Legacy",
    heures: 4,
    client: "Interne",
    priorite: "Basse",
    couleur: "#f59e0b",
  },
  {
    nom: "Documentation",
    heures: 2,
    client: "Interne",
    priorite: "Moyenne",
    couleur: "#8b5cf6",
  },
  {
    nom: "Réunions",
    heures: 5,
    client: "Interne",
    priorite: "N/A",
    couleur: "#94a3b8",
  },
  {
    nom: "Code Review",
    heures: 3,
    client: "Équipe",
    priorite: "Haute",
    couleur: "#ec4899",
  },
];

const totalHeures = projets.reduce((acc, p) => acc + p.heures, 0);
const heuresFacturables = projets
  .filter((p) => p.client !== "Interne" && p.client !== "Équipe")
  .reduce((acc, p) => acc + p.heures, 0);
const tauxFacturable = ((heuresFacturables / totalHeures) * 100).toFixed(0);

const option: EChartsOption = {
  title: {
    text: "Répartition du temps par projet",
    subtext: `Semaine 48/2024 · ${totalHeures}h travaillées · ${tauxFacturable} % facturable · Dev Senior`,
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
    trigger: "item",
    confine: true,
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number; percent: number };
      const projet = projets.find((pr) => pr.nom === p.name);
      if (!projet) return "";
      const prioriteColor =
        projet.priorite === "Haute"
          ? "#ef4444"
          : projet.priorite === "Moyenne"
            ? "#f59e0b"
            : "#22c55e";
      const facturable =
        projet.client !== "Interne" && projet.client !== "Équipe";
      return `
        <b>📁 ${p.name}</b><br/><br/>
        Temps : <b>${projet.heures}h</b> (${p.percent.toFixed(1)} %)<br/>
        Client : ${projet.client}<br/>
        <span style="color: ${prioriteColor}">Priorité : ${projet.priorite}</span><br/>
        ${facturable ? "💰 Facturable" : "🏢 Non facturable"}
      `;
    },
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
    textStyle: {
      fontSize: 11,
    },
  },
  series: [
    {
      name: "Temps par projet",
      type: "pie",
      radius: ["35%", "70%"],
      center: ["55%", "55%"],
      padAngle: 3,
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 4,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number };
          return `${p.name}\n${p.value}h`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 12,
        length2: 8,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 13,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      data: projets.map((p) => ({
        value: p.heures,
        name: p.nom,
        itemStyle: { color: p.couleur },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Pie Chart avec padAngle

### ✅ Quand utiliser ce type de diagramme

Le pie chart avec \`padAngle\` (espacement entre segments) est idéal pour :

- **Distinguer clairement les catégories** : l'espace visuel aide la lecture
- **Données avec beaucoup de segments** : évite l'effet "collé"
- **Style moderne et aéré** : dashboards contemporains
- **Mise en valeur individuelle** : chaque segment est distinct
- **Timetracking / allocation de ressources** : usage professionnel

**Exemples concrets :**
- Répartition du temps par projet
- Allocation budget par département
- Distribution des tâches par équipe
- Parts de marché détaillées

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce style dans ces cas :

- **Petits segments** : l'espace peut paraître disproportionné
- **Design classique requis** : certains contextes préfèrent le pie plein
- **Export papier** : l'espacement peut mal s'imprimer
- **Données avec un segment dominant** (> 80 %) : l'espace perd son sens

### 🔧 Fonctionnalités ECharts utilisées

- **padAngle: 3** : espacement de 3° entre chaque segment
- **borderRadius: 4** : coins légèrement arrondis
- **radius: ["35%", "70%"]** : doughnut avec trou central
- **avoidLabelOverlap** : gestion automatique des labels
- **emphasis** : effet de survol avec ombre

### 📊 Analyse de ce graphique

Ce graphique présente la répartition du temps d'un développeur senior sur la semaine 48/2024 :

- **📊 46h travaillées** : légèrement au-dessus des 40h contractuelles
- **💰 39 % facturable** : temps sur projets clients (ClientA + ClientB)
- **🔧 API Backend dominant** : 30 % du temps sur le projet interne principal
- **📝 Documentation faible** : seulement 4 % (sous le seuil recommandé de 10 %)

**Répartition par type d'activité :**
| Type | Heures | % |
|------|--------|---|
| Développement | 36h | 78 % |
| Communication | 8h | 17 % |
| Documentation | 2h | 4 % |

**Observations sur la productivité :**
1. **Bon focus** : 2 projets principaux (API + App Mobile) = 52 % du temps
2. **Maintenance limitée** : seulement 9 % sur le legacy
3. **Réunions maîtrisées** : 11 % (moyenne entreprise : 20-30 %)
4. **Code review insuffisant** : 7 % vs recommandé 15-20 %

### 🎯 Recommandations

- **Augmenter la documentation** : viser 10 % minimum
- **Plus de code review** : qualité code à long terme
- **Réduire la maintenance legacy** : planifier la migration
- **Protéger le temps de focus** : éviter la fragmentation

### 💡 Tips padAngle

- Un \`padAngle\` de 2-5° est optimal pour la lisibilité
- Trop d'espacement (> 10°) donne un effet "éclaté" peu professionnel
- Combinez avec \`borderRadius\` pour un style cohérent
`;

export default function PieWithPadAngle() {
  return (
    <ChartEditor
      title="Pie with padAngle"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
