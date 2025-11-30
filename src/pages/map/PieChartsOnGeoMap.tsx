import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Production agricole par région française avec répartition par type
// Contexte : analyse agricole pour le Ministère de l'Agriculture

// Données agricoles par région (production en milliers de tonnes)
const regionsAgricoles = [
  {
    nom: "Bretagne",
    x: 10,
    y: 62,
    productions: { elevage: 45, lait: 30, legumes: 15, cereales: 10 },
    total: 100,
  },
  {
    nom: "Nouvelle-Aquitaine",
    x: 25,
    y: 35,
    productions: { vin: 35, cereales: 25, elevage: 20, mais: 20 },
    total: 100,
  },
  {
    nom: "Occitanie",
    x: 40,
    y: 22,
    productions: { vin: 40, cereales: 20, fruits: 25, elevage: 15 },
    total: 100,
  },
  {
    nom: "Grand Est",
    x: 72,
    y: 65,
    productions: { cereales: 40, vin: 30, betterave: 20, elevage: 10 },
    total: 100,
  },
  {
    nom: "Hauts-de-France",
    x: 52,
    y: 82,
    productions: { cereales: 45, betterave: 25, pommedeterre: 20, legumes: 10 },
    total: 100,
  },
  {
    nom: "Pays de la Loire",
    x: 18,
    y: 52,
    productions: { elevage: 35, lait: 25, vin: 20, legumes: 20 },
    total: 100,
  },
  {
    nom: "Centre-Val de Loire",
    x: 38,
    y: 55,
    productions: { cereales: 50, vin: 20, colza: 15, betterave: 15 },
    total: 100,
  },
  {
    nom: "Normandie",
    x: 26,
    y: 70,
    productions: { lait: 40, elevage: 30, cidre: 15, cereales: 15 },
    total: 100,
  },
  {
    nom: "Auvergne-Rhône-Alpes",
    x: 55,
    y: 40,
    productions: { elevage: 35, lait: 25, vin: 20, fruits: 20 },
    total: 100,
  },
  {
    nom: "PACA",
    x: 62,
    y: 18,
    productions: { fruits: 35, legumes: 30, vin: 25, huile: 10 },
    total: 100,
  },
  {
    nom: "Bourgogne-Franche-Comté",
    x: 58,
    y: 50,
    productions: { vin: 35, cereales: 30, elevage: 20, fromage: 15 },
    total: 100,
  },
  {
    nom: "Île-de-France",
    x: 48,
    y: 68,
    productions: { cereales: 60, betterave: 20, colza: 15, legumes: 5 },
    total: 100,
  },
];

// Couleurs par type de production
const couleursProductions: Record<string, string> = {
  cereales: "#f59e0b", // Ambre
  vin: "#8b5cf6", // Violet
  elevage: "#ef4444", // Rouge
  lait: "#3b82f6", // Bleu
  legumes: "#22c55e", // Vert
  fruits: "#f97316", // Orange
  betterave: "#ec4899", // Rose
  mais: "#eab308", // Jaune
  pommedeterre: "#a16207", // Marron
  colza: "#84cc16", // Vert lime
  cidre: "#059669", // Vert émeraude
  fromage: "#fbbf24", // Jaune doré
  huile: "#65a30d", // Olive
};

// Labels français
const labelsFr: Record<string, string> = {
  cereales: "Céréales",
  vin: "Viticulture",
  elevage: "Élevage",
  lait: "Produits laitiers",
  legumes: "Légumes",
  fruits: "Fruits",
  betterave: "Betterave",
  mais: "Maïs",
  pommedeterre: "Pomme de terre",
  colza: "Colza",
  cidre: "Cidre",
  fromage: "Fromage",
  huile: "Huile d'olive",
};

// Statistiques
const nbRegions = regionsAgricoles.length;
const typesProductions = [
  ...new Set(regionsAgricoles.flatMap((r) => Object.keys(r.productions))),
];

// Créer les séries de pie charts
const pieSeries = regionsAgricoles.map((region, index) => {
  const pieData = Object.entries(region.productions).map(([type, valeur]) => ({
    name: labelsFr[type] || type,
    value: valeur,
    itemStyle: { color: couleursProductions[type] || "#6b7280" },
  }));

  return {
    name: region.nom,
    type: "pie" as const,
    radius: [0, 25],
    center: [`${region.x}%`, `${region.y}%`],
    data: pieData,
    label: { show: false },
    emphasis: {
      label: {
        show: true,
        formatter: "{b}\n{d}%",
        fontSize: 10,
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
    },
    tooltip: {
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number; percent: number };
        return `<b>${region.nom}</b><br/>${p.name} : <b>${p.percent.toFixed(0)} %</b>`;
      },
    },
    z: 10 + index,
  };
});

// Série scatter pour les labels des régions
const labelSeries = {
  name: "Régions",
  type: "scatter" as const,
  coordinateSystem: "cartesian2d" as const,
  symbolSize: 0,
  data: regionsAgricoles.map((r) => ({
    value: [r.x, r.y - 8],
    label: {
      show: true,
      formatter: r.nom,
      fontSize: 9,
      fontWeight: "bold" as const,
      color: "#374151",
    },
  })),
};

const option: EChartsOption = {
  title: {
    text: "🌾 Production agricole par région française",
    subtext: `${nbRegions} régions · ${typesProductions.length} types de productions · Répartition en %`,
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
  },
  legend: {
    top: 55,
    left: "center",
    data: Object.values(labelsFr).slice(0, 8),
    textStyle: { fontSize: 10 },
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 8,
  },
  grid: {
    left: 0,
    right: 0,
    top: 90,
    bottom: 0,
    containLabel: false,
  },
  xAxis: {
    type: "value",
    show: false,
    min: 0,
    max: 100,
  },
  yAxis: {
    type: "value",
    show: false,
    min: 0,
    max: 100,
  },
  series: [...pieSeries, labelSeries],
};

const notes = `
## 📚 Note pédagogique : Pie Charts on Geo Map

### ✅ Quand utiliser cette visualisation

Les **pie charts sur carte** combinent :
- **Position géographique** : où se trouve chaque entité
- **Répartition** : composition de chaque entité

**Cas d'usage :**
- Production agricole par région
- Sources d'énergie par pays
- Parts de marché par ville
- Répartition budgétaire par département
- Mix énergétique par centrale

### ❌ Quand ne pas utiliser

- **Trop de régions** : chevauchement des pies
- **Trop de catégories** : pies illisibles (> 6 parts)
- **Comparaison précise** : difficile entre pies
- **Valeurs similaires** : parts indistinguables
- **Mobile** : pies trop petits

### 📊 Analyse de ce graphique

**Spécialisations régionales :**

| Région | Spécialité principale | Part |
|--------|----------------------|------|
${regionsAgricoles
  .map((r) => {
    const [type, valeur] = Object.entries(r.productions).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    );
    return `| ${r.nom} | ${labelsFr[type]} | ${valeur} % |`;
  })
  .join("\n")}

**Observations clés :**
- **Nord** : céréales et betteraves (grandes cultures)
- **Ouest** : élevage et produits laitiers
- **Sud** : viticulture et fruits
- **Est** : céréales et vin (Champagne, Alsace)

### 🔧 Création de pie charts positionnés

**Positionnement avec center :**
\`\`\`javascript
series: regions.map(region => ({
  type: 'pie',
  radius: 25,
  // Position en pourcentage du conteneur
  center: [\`\${region.x}%\`, \`\${region.y}%\`],
  data: region.productions.map(p => ({
    name: p.type,
    value: p.valeur
  }))
}))
\`\`\`

**Avec une vraie carte geo :**
\`\`\`javascript
// Convertir coordonnées géo en pixels
const pixelCoord = chart.convertToPixel('geo', [lng, lat]);

series: [{
  type: 'pie',
  center: pixelCoord,
  // ...
}]
\`\`\`

### 🎨 Palette cohérente

**Couleurs par catégorie agricole :**
- 🌾 **Céréales** : ambre (#f59e0b)
- 🍇 **Vin** : violet (#8b5cf6)
- 🐄 **Élevage** : rouge (#ef4444)
- 🥛 **Lait** : bleu (#3b82f6)
- 🥬 **Légumes** : vert (#22c55e)
- 🍎 **Fruits** : orange (#f97316)

**Importance de la cohérence :**
\`\`\`javascript
const couleursProductions = {
  cereales: '#f59e0b',
  vin: '#8b5cf6',
  // Même couleur = même catégorie partout
};

data: productions.map(p => ({
  itemStyle: { color: couleursProductions[p.type] }
}))
\`\`\`

### 📐 Gestion des chevauchements

**Problème fréquent :**
Les pies se chevauchent quand les régions sont proches.

**Solutions :**
1. **Réduire le rayon** : \`radius: 20\` au lieu de 30
2. **Décaler les positions** : ajuster x/y manuellement
3. **Utiliser z-index** : \`z: index\` pour l'ordre d'empilement
4. **Masquer les labels** : afficher seulement au hover

\`\`\`javascript
{
  label: { show: false },
  emphasis: {
    label: { show: true }
  }
}
\`\`\`

### 💡 Alternatives au pie sur carte

**Pour éviter les pies :**

1. **Bar charts empilés** sur chaque position
2. **Waffle charts** (grilles de carrés)
3. **Donut charts** (plus compact)
4. **Graduated symbols** (taille = valeur principale)
5. **Small multiples** (une mini-carte par catégorie)

### ⚠️ Pièges à éviter

1. **Pies trop petits** : < 20px illisibles
2. **Pas de légende** : impossible de comprendre les couleurs
3. **Trop de parts** : > 5-6 devient confus
4. **Même taille partout** : on perd l'info de volume total
5. **Couleurs aléatoires** : catégorie = même couleur toujours

### 🚀 Amélioration : taille variable

**Pie proportionnel au total :**
\`\`\`javascript
{
  type: 'pie',
  // Rayon proportionnel à la production totale
  radius: Math.sqrt(region.total) * 2,
  center: [region.x, region.y],
  data: region.productions
}
\`\`\`

### 📱 Responsive

**Adaptation mobile :**
\`\`\`javascript
const isMobile = window.innerWidth < 768;

series: regions.map(r => ({
  type: 'pie',
  radius: isMobile ? 15 : 25, // Plus petit sur mobile
  label: { show: !isMobile }, // Pas de labels sur mobile
  // ...
}))
\`\`\`

### 🔍 Données agricoles françaises

**Sources officielles :**
- Agreste (Ministère de l'Agriculture)
- INSEE (recensement agricole)
- FAO (données internationales)

**Unités courantes :**
- Tonnes de production
- Hectares cultivés
- Nombre d'exploitations
- Chiffre d'affaires en €
`;

export default function PieChartsOnGeoMap() {
  return (
    <ChartEditor
      title="Pie Charts on GEO Map"
      section="Map"
      option={option}
      notes={notes}
    />
  );
}
