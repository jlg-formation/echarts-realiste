import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Ventes par catégorie de produits - E-commerce mode 2024
const categories = [
  {
    nom: "Vêtements femme",
    ventes: 4200,
    icone: "👗",
    couleur: "#ec4899",
    marge: "42 %",
    croissance: "+8 %",
  },
  {
    nom: "Chaussures",
    ventes: 2800,
    icone: "👟",
    couleur: "#8b5cf6",
    marge: "38 %",
    croissance: "+12 %",
  },
  {
    nom: "Vêtements homme",
    ventes: 2400,
    icone: "👔",
    couleur: "#3b82f6",
    marge: "40 %",
    croissance: "+5 %",
  },
  {
    nom: "Accessoires",
    ventes: 1800,
    icone: "👜",
    couleur: "#f59e0b",
    marge: "55 %",
    croissance: "+15 %",
  },
  {
    nom: "Sport & outdoor",
    ventes: 1500,
    icone: "🏃",
    couleur: "#22c55e",
    marge: "35 %",
    croissance: "+22 %",
  },
  {
    nom: "Enfant",
    ventes: 1200,
    icone: "🧒",
    couleur: "#06b6d4",
    marge: "32 %",
    croissance: "+3 %",
  },
  {
    nom: "Lingerie",
    ventes: 900,
    icone: "🩱",
    couleur: "#f43f5e",
    marge: "48 %",
    croissance: "+7 %",
  },
  {
    nom: "Maroquinerie",
    ventes: 700,
    icone: "💼",
    couleur: "#78350f",
    marge: "52 %",
    croissance: "+10 %",
  },
];

const totalVentes = categories.reduce((acc, c) => acc + c.ventes, 0);
const topCategorie = categories[0];

const option: EChartsOption = {
  title: {
    text: "Ventes par catégorie - ModaShop",
    subtext: `CA annuel 2024 : ${(totalVentes / 1000).toFixed(1)} M € · 👗 ${topCategorie.nom} = leader (${((topCategorie.ventes / totalVentes) * 100).toFixed(0)} %)`,
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
      const categorie = categories.find((c) => c.nom === p.name);
      if (!categorie) return "";
      const croissanceColor = categorie.croissance.startsWith("+")
        ? "#22c55e"
        : "#ef4444";
      return `
        <b>${categorie.icone} ${p.name}</b><br/><br/>
        CA : <b>${categorie.ventes.toLocaleString("fr-FR")} k €</b> (${p.percent.toFixed(1)} %)<br/>
        Marge brute : ${categorie.marge}<br/>
        <span style="color: ${croissanceColor}">📈 Croissance : ${categorie.croissance}</span>
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
    formatter: (name: string) => {
      const categorie = categories.find((c) => c.nom === name);
      return categorie ? `${categorie.icone} ${name}` : name;
    },
  },
  series: [
    {
      name: "Ventes par catégorie",
      type: "pie",
      radius: ["20%", "65%"],
      center: ["55%", "55%"],
      roseType: "radius",
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 6,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number };
          const categorie = categories.find((c) => c.nom === p.name);
          return `${categorie?.icone || ""}\n${p.value} k €`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 8,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 13,
          fontWeight: "bold",
          formatter: (params: unknown) => {
            const p = params as {
              name: string;
              value: number;
              percent: number;
            };
            const categorie = categories.find((c) => c.nom === p.name);
            return `${categorie?.icone || ""} ${p.name}\n${p.value} k € (${p.percent.toFixed(1)} %)`;
          },
        },
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      data: categories.map((categorie) => ({
        value: categorie.ventes,
        name: categorie.nom,
        itemStyle: {
          color: categorie.couleur,
        },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Nightingale Chart Simple

### ✅ Quand utiliser ce type de diagramme

Le Nightingale chart simplifié est parfait pour :

- **Vue d'ensemble rapide** : synthèse des catégories principales
- **Présentation commerciale** : visuel attractif et moderne
- **Dashboard e-commerce** : suivi des ventes par segment
- **Comparaison de volumes** : mise en valeur des écarts
- **8 catégories ou moins** : lisibilité optimale

**Exemples concrets :**
- Ventes par catégorie de produits
- Répartition du chiffre d'affaires par région
- Parts de marché par concurrent
- Budget marketing par canal

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce style dans ces cas :

- **Comparaison précise des valeurs** : utilisez un bar chart
- **Évolution temporelle** : utilisez un line chart
- **Valeurs très proches** : les différences seront exagérées
- **Plus de 8-10 segments** : préférez un treemap
- **Données cumulatives** : utilisez un stacked bar

### 🔧 Fonctionnalités ECharts utilisées

- **roseType: "radius"** : rayon proportionnel à la valeur
- **borderRadius: 6** : coins arrondis subtils
- **emphasis.shadowBlur** : effet de survol élégant
- **formatter** : labels avec icônes et valeurs formatées
- **avoidLabelOverlap** : évite le chevauchement des labels

### 📊 Analyse de ce graphique

Ce graphique présente les ventes d'un e-commerce mode en 2024 :

- **👗 Femme = 27 %** : segment leader avec 4,2 M €
- **👟 Chaussures en 2e** : forte marge (38 %) et croissance (+12 %)
- **🏃 Sport = +22 %** : catégorie à plus forte croissance
- **👜 Accessoires** : meilleure marge (55 %)

**Analyse par segment :**
| Catégorie | CA (k €) | Marge | Croissance | Priorité |
|-----------|----------|-------|------------|----------|
| Femme | 4 200 | 42 % | +8 % | Maintenir |
| Chaussures | 2 800 | 38 % | +12 % | Développer |
| Homme | 2 400 | 40 % | +5 % | Dynamiser |
| Accessoires | 1 800 | 55 % | +15 % | Capitaliser |
| Sport | 1 500 | 35 % | +22 % | Investir |
| Enfant | 1 200 | 32 % | +3 % | Revoir |
| Lingerie | 900 | 48 % | +7 % | Niche |
| Maroquinerie | 700 | 52 % | +10 % | Premium |

### 🎯 Insights business

**Recommandations stratégiques :**
1. **Sport outdoor** : +22 % = axe de développement prioritaire
2. **Accessoires** : marge 55 % = pousser en cross-selling
3. **Enfant** : +3 % = revoir l'offre ou le ciblage
4. **Maroquinerie** : premium à développer (marge 52 %)

**Panier moyen par catégorie :**
| Segment | Panier moyen | Fréquence achat |
|---------|--------------|-----------------|
| Maroquinerie | 180 € | 1,2x/an |
| Chaussures | 95 € | 2,5x/an |
| Femme | 65 € | 4x/an |
| Accessoires | 45 € | 3x/an |

### 💡 Tips pour ce type de graphique

- Triez les données du plus grand au plus petit
- Utilisez des **couleurs distinctives** par catégorie
- Ajoutez des **icônes** pour identification rapide
- Limitez à **8 segments max** pour la lisibilité
- Affichez le **% dans le tooltip** pour la précision
`;

export default function NightingaleChartSimple() {
  return (
    <ChartEditor
      title="Nightingale Chart Simple"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
