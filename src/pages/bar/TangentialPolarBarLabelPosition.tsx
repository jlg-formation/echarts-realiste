import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Profil de compétences d'un développeur full-stack senior
const competences = [
  { nom: "JavaScript", niveau: 92 },
  { nom: "TypeScript", niveau: 88 },
  { nom: "React", niveau: 90 },
  { nom: "Node.js", niveau: 85 },
  { nom: "SQL", niveau: 75 },
  { nom: "Docker", niveau: 70 },
  { nom: "AWS", niveau: 65 },
  { nom: "CI/CD", niveau: 78 },
  { nom: "Testing", niveau: 72 },
  { nom: "Git", niveau: 95 },
];

// Seuils de niveau
const seuils = {
  expert: 85,
  confirme: 70,
  junior: 50,
};

const option: EChartsOption = {
  title: {
    text: "Profil technique - Marie Dupont, Lead Dev",
    subtext:
      "Évaluation annuelle 2024 · 🏆 4 compétences niveau Expert · Score global : 81/100",
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
      const p = params as { name: string; value: number };
      let niveau = "Junior";
      let emoji = "🌱";
      if (p.value >= seuils.expert) {
        niveau = "Expert";
        emoji = "🏆";
      } else if (p.value >= seuils.confirme) {
        niveau = "Confirmé";
        emoji = "✅";
      }
      return `
        <b>${p.name}</b><br/><br/>
        Score : <b>${p.value}/100</b><br/>
        Niveau : ${emoji} ${niveau}
      `;
    },
  },
  polar: {
    radius: ["10%", "75%"],
  },
  radiusAxis: {
    max: 100,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#e5e7eb",
        type: "dashed",
      },
    },
  },
  angleAxis: {
    type: "category",
    data: competences.map((c) => c.nom),
    startAngle: 90,
    axisLine: {
      lineStyle: {
        color: "#d1d5db",
      },
    },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 11,
      color: "#374151",
      margin: 8,
    },
  },
  series: [
    {
      type: "bar",
      data: competences.map((c) => {
        let couleur = "#fbbf24"; // Jaune - Junior
        if (c.niveau >= seuils.expert) {
          couleur = "#22c55e"; // Vert - Expert
        } else if (c.niveau >= seuils.confirme) {
          couleur = "#3b82f6"; // Bleu - Confirmé
        }
        return {
          value: c.niveau,
          itemStyle: {
            color: couleur,
            borderRadius: 4,
          },
        };
      }),
      coordinateSystem: "polar",
      barWidth: 12,
      label: {
        show: true,
        position: "end",
        formatter: (params: unknown) => {
          const p = params as { value: number };
          return `${p.value}`;
        },
        fontSize: 9,
        fontWeight: "bold",
        distance: 5,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
  ],
  legend: {
    data: ["Expert (≥85)", "Confirmé (≥70)", "Junior (<70)"],
    bottom: 10,
    itemGap: 30,
    textStyle: {
      fontSize: 11,
    },
  },
  graphic: [
    {
      type: "circle",
      shape: { r: 8 },
      style: { fill: "#22c55e" },
      left: "28%",
      bottom: 15,
    },
    {
      type: "text",
      style: { text: "Expert (≥85)", fontSize: 11 },
      left: "30%",
      bottom: 10,
    },
    {
      type: "circle",
      shape: { r: 8 },
      style: { fill: "#3b82f6" },
      left: "45%",
      bottom: 15,
    },
    {
      type: "text",
      style: { text: "Confirmé (≥70)", fontSize: 11 },
      left: "47%",
      bottom: 10,
    },
    {
      type: "circle",
      shape: { r: 8 },
      style: { fill: "#fbbf24" },
      left: "64%",
      bottom: 15,
    },
    {
      type: "text",
      style: { text: "Junior (<70)", fontSize: 11 },
      left: "66%",
      bottom: 10,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres polaires tangentielles

### ✅ Quand utiliser ce type de diagramme

Ce type de diagramme est particulièrement adapté pour :

- **Profils de compétences** : visualiser les forces et faiblesses d'un individu ou d'une équipe
- **Évaluations multi-critères** : noter plusieurs aspects sur une échelle commune
- **Comparaison à un référentiel** : montrer l'écart avec un niveau cible
- **Analyse 360°** : feedback multi-sources sur les mêmes critères
- **Cartographie des talents** : identifier les experts par domaine

**Exemples concrets :**
- Profil technique d'un développeur
- Évaluation de performance annuelle
- Audit de maturité d'une organisation
- Comparaison de produits sur plusieurs critères

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce diagramme dans ces cas :

- **Données temporelles** : préférez un line chart
- **Comparaison de valeurs précises** : un bar chart classique sera plus lisible
- **Plus de 12 catégories** : le cercle devient surchargé
- **Valeurs très similaires** : les différences seront imperceptibles
- **Présentation formelle** : certains publics préfèrent des graphiques classiques

**Erreurs courantes à éviter :**
- Mélanger des métriques avec des échelles différentes
- Ne pas normaliser les données (ex: comparer des %, des notes /10 et des notes /100)
- Oublier la légende des niveaux

### 🔧 Fonctionnalités ECharts utilisées

- **coordinateSystem: "polar"** : barres en cercle
- **angleAxis.type: "category"** : catégories sur le périmètre
- **Couleurs conditionnelles** : vert/bleu/jaune selon le niveau
- **label.position: "end"** : scores au bout des barres
- **graphic** : légende personnalisée avec cercles colorés

### 📊 Analyse de ce graphique

Ce graphique présente le profil technique de Marie Dupont :

- **🏆 Points forts** : Git (95), JavaScript (92), React (90), TypeScript (88)
- **✅ Compétences solides** : Node.js (85), CI/CD (78), SQL (75), Testing (72), Docker (70)
- **🌱 Axes de progression** : AWS (65)

**Insight clé** : Marie a un profil front-end très solide avec une excellente maîtrise de l'écosystème JavaScript/TypeScript. Son point faible relatif est le cloud (AWS), ce qui est cohérent avec un parcours orienté développement plutôt qu'infrastructure.

**Plan de développement suggéré** :
1. Certification AWS Developer Associate pour monter en compétence cloud
2. Projets de testing avancé (E2E, performance) pour renforcer cette compétence
3. Mentoring sur Git et React pour partager son expertise
`;

export default function TangentialPolarBarLabelPosition() {
  return (
    <ChartEditor
      title="Tangential Polar Bar Label Position"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
