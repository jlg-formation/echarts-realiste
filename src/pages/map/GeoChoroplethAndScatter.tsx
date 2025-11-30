import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Densité de population des régions françaises + villes principales
// Contexte : analyse démographique pour la planification territoriale

// Régions françaises avec données démographiques
const regions = [
  {
    nom: "Île-de-France",
    x: 50,
    y: 70,
    population: 12.3,
    superficie: 12012,
    densite: 1024,
  },
  {
    nom: "Auvergne-Rhône-Alpes",
    x: 55,
    y: 40,
    population: 8.1,
    superficie: 69711,
    densite: 116,
  },
  {
    nom: "Nouvelle-Aquitaine",
    x: 25,
    y: 35,
    population: 6.0,
    superficie: 84036,
    densite: 71,
  },
  {
    nom: "Occitanie",
    x: 40,
    y: 20,
    population: 5.9,
    superficie: 72724,
    densite: 81,
  },
  {
    nom: "Hauts-de-France",
    x: 52,
    y: 85,
    population: 6.0,
    superficie: 31806,
    densite: 189,
  },
  {
    nom: "Provence-Alpes-Côte d'Azur",
    x: 60,
    y: 18,
    population: 5.1,
    superficie: 31400,
    densite: 162,
  },
  {
    nom: "Grand Est",
    x: 72,
    y: 68,
    population: 5.5,
    superficie: 57433,
    densite: 96,
  },
  {
    nom: "Pays de la Loire",
    x: 18,
    y: 55,
    population: 3.8,
    superficie: 32082,
    densite: 118,
  },
  {
    nom: "Normandie",
    x: 28,
    y: 72,
    population: 3.3,
    superficie: 29907,
    densite: 110,
  },
  {
    nom: "Bretagne",
    x: 8,
    y: 62,
    population: 3.4,
    superficie: 27208,
    densite: 125,
  },
  {
    nom: "Bourgogne-Franche-Comté",
    x: 58,
    y: 55,
    population: 2.8,
    superficie: 47784,
    densite: 59,
  },
  {
    nom: "Centre-Val de Loire",
    x: 38,
    y: 58,
    population: 2.6,
    superficie: 39151,
    densite: 66,
  },
  {
    nom: "Corse",
    x: 75,
    y: 8,
    population: 0.34,
    superficie: 8680,
    densite: 39,
  },
];

// Principales villes
const villes = [
  { nom: "Paris", x: 50, y: 72, population: 2.1, type: "Capitale" },
  { nom: "Marseille", x: 58, y: 15, population: 0.87, type: "Métropole" },
  { nom: "Lyon", x: 56, y: 42, population: 0.52, type: "Métropole" },
  { nom: "Toulouse", x: 32, y: 22, population: 0.49, type: "Métropole" },
  { nom: "Nice", x: 68, y: 14, population: 0.34, type: "Grande ville" },
  { nom: "Nantes", x: 15, y: 54, population: 0.32, type: "Métropole" },
  { nom: "Montpellier", x: 48, y: 18, population: 0.29, type: "Métropole" },
  { nom: "Strasbourg", x: 80, y: 65, population: 0.28, type: "Métropole" },
  { nom: "Bordeaux", x: 20, y: 38, population: 0.26, type: "Métropole" },
  { nom: "Lille", x: 55, y: 88, population: 0.23, type: "Métropole" },
  { nom: "Rennes", x: 12, y: 60, population: 0.22, type: "Métropole" },
  { nom: "Reims", x: 58, y: 78, population: 0.18, type: "Grande ville" },
  { nom: "Toulon", x: 62, y: 12, population: 0.17, type: "Grande ville" },
  { nom: "Grenoble", x: 60, y: 38, population: 0.16, type: "Grande ville" },
  { nom: "Dijon", x: 58, y: 52, population: 0.16, type: "Grande ville" },
];

// Statistiques
const populationTotale = regions.reduce((acc, r) => acc + r.population, 0);
const densiteMoyenne =
  populationTotale / regions.reduce((acc, r) => acc + r.superficie / 1000, 0);

// Fonction pour déterminer la couleur selon la densité
const getDensityColor = (densite: number): string => {
  if (densite > 500) return "#7f1d1d"; // Rouge très foncé
  if (densite > 200) return "#dc2626"; // Rouge
  if (densite > 150) return "#f97316"; // Orange
  if (densite > 100) return "#facc15"; // Jaune
  if (densite > 75) return "#84cc16"; // Vert clair
  if (densite > 50) return "#22c55e"; // Vert
  return "#15803d"; // Vert foncé
};

const option: EChartsOption = {
  title: {
    text: "🗺️ Densité de population en France métropolitaine",
    subtext: `${populationTotale.toFixed(1)}M habitants · Densité moyenne : ${densiteMoyenne.toFixed(0)} hab/km² · ${villes.length} grandes villes`,
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
      const p = params as {
        seriesName: string;
        data: { name?: string; value?: number[] };
      };

      if (p.seriesName === "Régions") {
        const region = regions.find((r) => r.nom === p.data.name);
        if (!region) return "";

        const ecartMoyenne =
          ((region.densite - densiteMoyenne) / densiteMoyenne) * 100;

        return `
          <b>📍 ${region.nom}</b><br/><br/>
          Population : <b>${region.population.toFixed(1)}M habitants</b><br/>
          Superficie : <b>${region.superficie.toLocaleString("fr-FR")} km²</b><br/>
          Densité : <b>${region.densite} hab/km²</b><br/>
          <span style="color: ${ecartMoyenne > 0 ? "#ef4444" : "#22c55e"}">
            ${ecartMoyenne > 0 ? "+" : ""}${ecartMoyenne.toFixed(0)} % vs moyenne nationale
          </span>
        `;
      }

      if (p.seriesName === "Villes") {
        const ville = villes.find(
          (v) =>
            v.x === (p.data.value as number[])[0] &&
            v.y === (p.data.value as number[])[1],
        );
        if (!ville) return "";

        return `
          <b>🏙️ ${ville.nom}</b><br/><br/>
          Population : <b>${(ville.population * 1000000).toLocaleString("fr-FR")} habitants</b><br/>
          Type : <b>${ville.type}</b>
        `;
      }

      return "";
    },
  },
  legend: {
    top: 55,
    data: ["Régions", "Villes"],
    textStyle: {
      fontSize: 11,
    },
  },
  visualMap: {
    type: "continuous",
    min: 0,
    max: 1100,
    text: ["Haute densité", "Faible densité"],
    realtime: false,
    calculable: true,
    inRange: {
      color: [
        "#15803d",
        "#22c55e",
        "#84cc16",
        "#facc15",
        "#f97316",
        "#dc2626",
        "#7f1d1d",
      ],
    },
    left: 20,
    bottom: 20,
  },
  grid: {
    left: 60,
    right: 40,
    top: 100,
    bottom: 60,
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
  series: [
    // Régions (heatmap/scatter simulé)
    {
      name: "Régions",
      type: "scatter",
      data: regions.map((r) => ({
        name: r.nom,
        value: [r.x, r.y, r.densite],
        symbolSize: Math.sqrt(r.superficie / 100) + 20,
        itemStyle: {
          color: getDensityColor(r.densite),
          opacity: 0.7,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: r.nom.length > 15 ? r.nom.substring(0, 12) + "..." : r.nom,
          fontSize: 9,
          position: "inside",
          color: r.densite > 200 ? "#fff" : "#333",
        },
      })),
      emphasis: {
        itemStyle: {
          opacity: 1,
          shadowBlur: 15,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
    // Villes (points superposés)
    {
      name: "Villes",
      type: "scatter",
      data: villes.map((v) => ({
        value: [v.x, v.y, v.population * 1000],
        symbolSize: Math.sqrt(v.population) * 15 + 5,
        itemStyle: {
          color:
            v.type === "Capitale"
              ? "#8b5cf6"
              : v.type === "Métropole"
                ? "#3b82f6"
                : "#06b6d4",
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: v.population > 0.2,
          formatter: v.nom,
          position: "top",
          fontSize: 10,
          fontWeight: v.type === "Capitale" ? "bold" : "normal",
          color: "#333",
        },
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      z: 10,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Choropleth Map avec Scatter

### ✅ Quand utiliser ce type de visualisation

La combinaison **choropleth + scatter** permet de superposer :

- **Choropleth** : couleur des zones = une métrique (densité, revenu, etc.)
- **Scatter** : points = entités individuelles (villes, sites, etc.)

**Cas d'usage :**
- Densité de population + grandes villes
- PIB régional + sièges d'entreprises
- Taux de chômage + zones d'emploi
- Pollution + usines
- Votes + bureaux de vote

### ❌ Quand ne pas utiliser

- **Trop de points** : le scatter masque le choropleth
- **Données non spatiales** : pas de sens géographique
- **Régions trop petites** : illisible à petite échelle
- **Corrélation évidente** : les deux couches montrent la même chose

### 📊 Analyse de ce graphique

**Démographie française :**

| Région | Population | Densité | Écart/moy |
|--------|------------|---------|-----------|
${regions
  .sort((a, b) => b.densite - a.densite)
  .slice(0, 5)
  .map(
    (r) =>
      `| ${r.nom} | ${r.population.toFixed(1)}M | ${r.densite} hab/km² | ${r.densite > densiteMoyenne ? "+" : ""}${(((r.densite - densiteMoyenne) / densiteMoyenne) * 100).toFixed(0)} % |`,
  )
  .join("\n")}

**Observations clés :**
- **Île-de-France** : 19 % de la population sur 2 % du territoire
- **Diagonale du vide** : de la Meuse aux Pyrénées, densité < 50 hab/km²
- **Littoralisation** : forte croissance des régions côtières
- **Métropolisation** : concentration autour des grandes villes

### 🔧 Fonctionnalités ECharts utilisées

**Choropleth simulé :**
Comme ECharts de base ne supporte pas les cartes France, on simule avec scatter + symbolSize proportionnel à la superficie.

\`\`\`javascript
{
  type: 'scatter',
  data: regions.map(r => ({
    value: [r.x, r.y, r.densite],
    symbolSize: Math.sqrt(r.superficie / 100) + 20,
    itemStyle: { color: getDensityColor(r.densite) }
  }))
}
\`\`\`

**visualMap pour la légende :**
\`\`\`javascript
visualMap: {
  type: 'continuous',
  min: 0,
  max: 1100,
  inRange: {
    color: ['#15803d', '#facc15', '#dc2626']
  }
}
\`\`\`

**Scatter superposé (villes) :**
\`\`\`javascript
{
  name: 'Villes',
  type: 'scatter',
  z: 10, // Au-dessus des régions
  data: villes.map(v => ({
    value: [v.x, v.y],
    symbolSize: Math.sqrt(v.population) * 15
  }))
}
\`\`\`

### 🎨 Choix des couleurs

**Palette divergente pour la densité :**
- 🟢 Vert foncé : très faible densité (< 50)
- 🟢 Vert : faible (50-75)
- 🟡 Jaune : moyenne (100-150)
- 🟠 Orange : élevée (150-200)
- 🔴 Rouge : très élevée (> 200)
- 🔴 Rouge foncé : extrême (> 500)

**Couleurs des villes :**
- 💜 Violet : capitale
- 🔵 Bleu : métropoles
- 🩵 Cyan : grandes villes

### 📈 Pour une vraie carte

**Avec geoJSON :**
\`\`\`javascript
import francieGeoJSON from './france-regions.json';

echarts.registerMap('france', francieGeoJSON);

option = {
  geo: {
    map: 'france',
    roam: true,
  },
  series: [{
    type: 'map',
    map: 'france',
    data: regions.map(r => ({
      name: r.nom,
      value: r.densite
    }))
  }, {
    type: 'scatter',
    coordinateSystem: 'geo',
    data: villes.map(v => ({
      name: v.nom,
      value: [v.lng, v.lat, v.population]
    }))
  }]
};
\`\`\`

### 💡 Bonnes pratiques choropleth

1. **Normaliser les données** : par habitant, par km², pas de valeurs absolues
2. **Palette appropriée** : divergente si point médian significatif
3. **Éviter les couleurs arc-en-ciel** : difficiles à lire
4. **Limiter les classes** : 5-7 maximum pour la lisibilité
5. **Indiquer l'unité** : dans la légende ou le titre

### ⚠️ Pièges du choropleth

1. **Biais de surface** : grandes régions attirent l'œil mais peu peuplées
2. **Effet de seuil** : les bornes des classes influencent la perception
3. **Couleurs saturées** : éviter le rouge/vert pour les daltoniens
4. **Données anciennes** : les limites régionales changent

### 🚀 Pour aller plus loin

- **Cartogramme** : déformer les régions selon la population
- **Dot density map** : 1 point = N habitants
- **Isopleth** : lignes de niveau (comme courbes topographiques)
- **3D extrusion** : hauteur = valeur
`;

export default function GeoChoroplethAndScatter() {
  return (
    <ChartEditor
      title="Geo Choropleth and Scatter"
      section="Map"
      option={option}
      notes={notes}
    />
  );
}
