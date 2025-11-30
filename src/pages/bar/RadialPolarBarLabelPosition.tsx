import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Budget marketing T4 2024 - Répartition par canal
const canaux = [
  { nom: "Google Ads", budget: 45000, couleur: "#4285f4" },
  { nom: "Meta Ads", budget: 38000, couleur: "#1877f2" },
  { nom: "LinkedIn Ads", budget: 22000, couleur: "#0a66c2" },
  { nom: "Influence", budget: 18000, couleur: "#e4405f" },
  { nom: "SEO", budget: 15000, couleur: "#34a853" },
  { nom: "Emailing", budget: 12000, couleur: "#ea4335" },
  { nom: "Affiliation", budget: 8000, couleur: "#ff6b35" },
  { nom: "Événements", budget: 7000, couleur: "#9b59b6" },
];

const budgetTotal = canaux.reduce((acc, c) => acc + c.budget, 0);

const option: EChartsOption = {
  title: {
    text: "Répartition du budget marketing T4 2024",
    subtext: `Budget total : ${(budgetTotal / 1000).toLocaleString("fr-FR")} k€ · 🎯 Objectif : +25 % de leads qualifiés`,
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
      const canal = canaux.find((c) => c.nom === p.name);
      return `
        <b>${p.name}</b><br/><br/>
        Budget : <b>${(p.value / 1000).toLocaleString("fr-FR")} k€</b><br/>
        Part : ${p.percent.toFixed(1)} %<br/>
        ${canal?.nom === "Google Ads" ? "🏆 Canal principal" : ""}
      `;
    },
  },
  polar: {
    radius: ["15%", "80%"],
  },
  angleAxis: {
    max: Math.max(...canaux.map((c) => c.budget)) * 1.1,
    startAngle: 90,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  radiusAxis: {
    type: "category",
    data: canaux.map((c) => c.nom),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 11,
      color: "#374151",
      margin: 10,
    },
  },
  series: [
    {
      type: "bar",
      data: canaux.map((c) => ({
        value: c.budget,
        itemStyle: { color: c.couleur },
      })),
      coordinateSystem: "polar",
      barWidth: 15,
      label: {
        show: true,
        position: "end",
        formatter: (params: unknown) => {
          const p = params as { value: number };
          const pourcent = ((p.value / budgetTotal) * 100).toFixed(0);
          return `${(p.value / 1000).toFixed(0)} k€ (${pourcent} %)`;
        },
        fontSize: 10,
        fontWeight: "bold",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres polaires radiales

### ✅ Quand utiliser ce type de diagramme

Le diagramme en barres polaires radiales est adapté pour :

- **Comparer des catégories avec une dimension circulaire** : quand la disposition en cercle a du sens (cycle, rotation, répartition)
- **Visualiser une répartition budgétaire ou de ressources** : les barres partent du centre vers l'extérieur
- **Créer un impact visuel fort** : plus engageant qu'un simple bar chart horizontal
- **Afficher 5-12 catégories** : au-delà, le graphique devient encombré
- **Montrer des proportions relatives** : la longueur des barres permet la comparaison

**Exemples concrets :**
- Répartition du budget marketing par canal
- Comparaison des ventes par région
- Allocation du temps par activité
- Ressources par département

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce diagramme dans ces cas :

- **Comparaisons précises** : l'œil humain est moins précis sur les angles
- **Données temporelles** : préférez un line chart
- **Beaucoup de catégories** (> 12) : utilisez un bar chart classique
- **Valeurs très proches** : les différences seront difficiles à distinguer
- **Contexte formel/analytique** : un bar chart classique sera plus professionnel

**Erreurs courantes à éviter :**
- Surcharger avec trop de labels
- Utiliser des couleurs sans signification
- Ne pas trier les barres par valeur

### 🔧 Fonctionnalités ECharts utilisées

- **coordinateSystem: "polar"** : système de coordonnées polaires
- **radiusAxis.type: "category"** : catégories sur l'axe radial
- **angleAxis** : configuration de l'axe angulaire
- **label.position: "end"** : labels au bout des barres
- **Couleurs personnalisées par canal** : identité visuelle cohérente

### 📊 Analyse de ce graphique

Ce graphique montre la répartition du budget marketing T4 2024 :

- **🏆 Canal principal** : Google Ads (45 k€, 27 % du budget)
- **Publicité digitale** : 63 % du budget (Google + Meta + LinkedIn)
- **Canaux émergents** : Influence (18 k€) en forte croissance
- **Canaux traditionnels** : Événements et affiliation restent minoritaires

**Insight clé** : La stratégie est fortement orientée acquisition payante. Pour réduire la dépendance aux plateformes publicitaires, il serait judicieux de renforcer les canaux "owned media" (SEO, Emailing).

**Recommandations** :
1. Augmenter le budget SEO pour réduire le coût d'acquisition à long terme
2. Tester de nouveaux canaux d'influence (TikTok, podcasts)
3. Mesurer le ROI par canal pour optimiser l'allocation T1 2025
`;

export default function RadialPolarBarLabelPosition() {
  return (
    <ChartEditor
      title="Radial Polar Bar Label Position"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
