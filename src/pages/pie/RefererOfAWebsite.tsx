import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Sources de trafic - Site e-commerce Mode - Novembre 2024
const sources = [
  {
    nom: "Google Organic",
    visites: 145000,
    conversion: 3.2,
    couleur: "#4285f4",
  },
  { nom: "Google Ads", visites: 82000, conversion: 4.1, couleur: "#34a853" },
  { nom: "Facebook", visites: 56000, conversion: 2.8, couleur: "#1877f2" },
  { nom: "Instagram", visites: 48000, conversion: 3.5, couleur: "#e4405f" },
  { nom: "Direct", visites: 38000, conversion: 5.2, couleur: "#6366f1" },
  { nom: "Email", visites: 25000, conversion: 6.8, couleur: "#f59e0b" },
  { nom: "Affiliation", visites: 18000, conversion: 2.1, couleur: "#10b981" },
  { nom: "TikTok", visites: 12000, conversion: 1.9, couleur: "#000000" },
];

const totalVisites = sources.reduce((acc, s) => acc + s.visites, 0);
const tauxConversionMoyen =
  sources.reduce((acc, s) => acc + s.visites * s.conversion, 0) / totalVisites;

const option: EChartsOption = {
  title: {
    text: "Sources de trafic - Novembre 2024",
    subtext: `${(totalVisites / 1000).toLocaleString("fr-FR")}k visites · Taux de conversion moyen : ${tauxConversionMoyen.toFixed(1)} % · 📧 Email : meilleur ROI`,
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
      const source = sources.find((s) => s.nom === p.name);
      if (!source) return "";
      const conversionColor =
        source.conversion >= 4
          ? "#22c55e"
          : source.conversion >= 2.5
            ? "#3b82f6"
            : "#f59e0b";
      const conversionEmoji =
        source.conversion >= 4 ? "🏆" : source.conversion >= 2.5 ? "✅" : "⚠️";
      const ventes = Math.round((source.visites * source.conversion) / 100);
      return `
        <b>${p.name}</b><br/><br/>
        Visites : <b>${source.visites.toLocaleString("fr-FR")}</b><br/>
        Part du trafic : ${p.percent.toFixed(1)} %<br/>
        <span style="color: ${conversionColor}">${conversionEmoji} Taux conversion : ${source.conversion} %</span><br/>
        Ventes estimées : ~${ventes.toLocaleString("fr-FR")}
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
      name: "Sources de trafic",
      type: "pie",
      radius: ["0%", "70%"],
      center: ["55%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 4,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; percent: number };
          return `${p.name}\n${p.percent.toFixed(1)} %`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      data: sources.map((s) => ({
        value: s.visites,
        name: s.nom,
        itemStyle: { color: s.couleur },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme circulaire (Pie Chart)

### ✅ Quand utiliser ce type de diagramme

Le diagramme circulaire est adapté pour :

- **Montrer des proportions d'un tout** : parts de marché, répartition budget, sources de trafic
- **5-8 catégories maximum** : au-delà, les parts deviennent illisibles
- **Comparaisons grossières** : "A est environ le double de B"
- **Storytelling simple** : "Google représente la moitié du trafic"
- **Présentations non-techniques** : format familier du grand public

**Exemples concrets :**
- Sources de trafic d'un site web
- Répartition du chiffre d'affaires par produit
- Parts de marché des concurrents
- Budget par poste de dépense

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le pie chart dans ces cas :

- **Comparaisons précises** : l'œil humain est mauvais pour comparer des angles
- **Beaucoup de catégories** (> 8) : utilisez un treemap ou un bar chart
- **Valeurs très proches** : un bar chart sera plus efficace
- **Évolution temporelle** : préférez un line chart ou stacked area
- **Données négatives** : un pie ne peut pas les représenter
- **Public technique/analytique** : préférez un bar chart plus précis

**Erreurs courantes à éviter :**
- Effet 3D qui déforme les proportions
- Explosion de toutes les parts (réservez aux points clés)
- Trop de couleurs similaires
- Labels qui se chevauchent

### 🔧 Fonctionnalités ECharts utilisées

- **radius: ["0%", "70%"]** : pie chart plein (pas de donut)
- **itemStyle.borderRadius** : coins arrondis pour un style moderne
- **avoidLabelOverlap** : évite le chevauchement des labels
- **legend orient: "vertical"** : légende sur le côté pour économiser l'espace
- **Couleurs personnalisées** : identité visuelle cohérente par canal

### 📊 Analyse de ce graphique

Ce graphique présente les sources de trafic du site e-commerce en novembre 2024 :

- **🔍 SEO dominant** : Google Organic représente 34 % du trafic (145k visites)
- **💰 Acquisition payante** : Google Ads + Facebook + Instagram = 44 % du trafic
- **📧 Email champion** : Meilleur taux de conversion (6,8 %) malgré 6 % du trafic
- **🎵 TikTok émergent** : 3 % du trafic mais faible conversion (1,9 %)

**Insight clé** : La dépendance à Google (SEO + Ads) représente 54 % du trafic. Un changement d'algorithme pourrait impacter fortement l'activité.

**Recommandations** :
1. **Investir dans l'email** : meilleur ROI, audience propriétaire
2. **Diversifier les sources** : réduire la dépendance à Google
3. **Optimiser TikTok** : fort potentiel mais conversion à améliorer
4. **Développer le trafic direct** : notoriété de marque

### 🎯 Métriques clés à retenir

| Source | Trafic | Conversion | Ventes estimées |
|--------|--------|------------|-----------------|
| Google Organic | 34 % | 3,2 % | 4 640 |
| Google Ads | 19 % | 4,1 % | 3 362 |
| Facebook | 13 % | 2,8 % | 1 568 |
| Email | 6 % | 6,8 % | 1 700 |
`;

export default function RefererOfAWebsite() {
  return (
    <ChartEditor
      title="Referer of a Website"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
