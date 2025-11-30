import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données des cultures agricoles en France - Répartition des surfaces cultivées 2024
const cultures = [
  {
    nom: "Blé tendre",
    surface: 4.8,
    unite: "M ha",
    icone: "🌾",
    region: "Beauce, Picardie",
    tendance: "stable",
    pattern: "rect",
  },
  {
    nom: "Maïs grain",
    surface: 1.4,
    unite: "M ha",
    icone: "🌽",
    region: "Aquitaine, Alsace",
    tendance: "baisse",
    pattern: "circle",
  },
  {
    nom: "Orge",
    surface: 1.8,
    unite: "M ha",
    icone: "🌿",
    region: "Champagne, Centre",
    tendance: "hausse",
    pattern: "diamond",
  },
  {
    nom: "Colza",
    surface: 1.2,
    unite: "M ha",
    icone: "💛",
    region: "Bourgogne, Lorraine",
    tendance: "stable",
    pattern: "triangle",
  },
  {
    nom: "Tournesol",
    surface: 0.7,
    unite: "M ha",
    icone: "🌻",
    region: "Midi-Pyrénées, Poitou",
    tendance: "hausse",
    pattern: "pentagon",
  },
  {
    nom: "Betterave sucrière",
    surface: 0.4,
    unite: "M ha",
    icone: "🥬",
    region: "Picardie, Champagne",
    tendance: "baisse",
    pattern: "roundRect",
  },
  {
    nom: "Vigne",
    surface: 0.8,
    unite: "M ha",
    icone: "🍇",
    region: "Bordeaux, Bourgogne",
    tendance: "stable",
    pattern: "path://M0,0L10,0L10,10L0,10Z",
  },
  {
    nom: "Autres céréales",
    surface: 0.9,
    unite: "M ha",
    icone: "🌱",
    region: "Toute France",
    tendance: "stable",
    pattern: "roundRect",
  },
];

const totalSurface = cultures.reduce((acc, c) => acc + c.surface, 0);
const partCereales = (
  (cultures
    .filter((c) =>
      ["Blé tendre", "Maïs grain", "Orge", "Autres céréales"].includes(c.nom),
    )
    .reduce((acc, c) => acc + c.surface, 0) /
    totalSurface) *
  100
).toFixed(0);

// Couleurs avec motifs texturés pour chaque culture
const colors = [
  "#d4a437", // Blé - doré
  "#f59e0b", // Maïs - jaune orangé
  "#84cc16", // Orge - vert lime
  "#eab308", // Colza - jaune vif
  "#fbbf24", // Tournesol - jaune soleil
  "#22c55e", // Betterave - vert
  "#8b5cf6", // Vigne - violet
  "#94a3b8", // Autres - gris
];

const option: EChartsOption = {
  title: {
    text: "Surfaces agricoles cultivées en France",
    subtext: `Campagne 2024 · ${totalSurface.toFixed(1)} M ha · ${partCereales} % de céréales`,
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
      const culture = cultures.find((c) => c.nom === p.name);
      if (!culture) return "";
      const tendanceIcon =
        culture.tendance === "hausse"
          ? "📈"
          : culture.tendance === "baisse"
            ? "📉"
            : "➡️";
      return `
        <b>${culture.icone} ${p.name}</b><br/><br/>
        Surface : <b>${culture.surface.toLocaleString("fr-FR")} M ha</b> (${p.percent.toFixed(1)} %)<br/>
        Région principale : ${culture.region}<br/>
        Tendance : ${tendanceIcon} ${culture.tendance}
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
      const culture = cultures.find((c) => c.nom === name);
      return culture ? `${culture.icone} ${name}` : name;
    },
  },
  series: [
    {
      name: "Cultures agricoles",
      type: "pie",
      radius: ["25%", "65%"],
      center: ["55%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 3,
        shadowBlur: 5,
        shadowColor: "rgba(0, 0, 0, 0.1)",
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number };
          const culture = cultures.find((c) => c.nom === p.name);
          return `${culture?.icone || ""} ${p.name}\n${p.value} M ha`;
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
          shadowBlur: 25,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.4)",
        },
      },
      data: cultures.map((culture, index) => ({
        value: culture.surface,
        name: culture.nom,
        itemStyle: {
          color: {
            type: "pattern",
            image: (function () {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const size = 8;
              canvas.width = size;
              canvas.height = size;
              if (ctx) {
                // Fond de couleur
                ctx.fillStyle = colors[index];
                ctx.fillRect(0, 0, size, size);

                // Motif texturé
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                switch (culture.pattern) {
                  case "rect":
                    // Lignes horizontales
                    ctx.fillRect(0, 0, size, 2);
                    ctx.fillRect(0, 4, size, 2);
                    break;
                  case "circle":
                    // Points
                    ctx.beginPath();
                    ctx.arc(2, 2, 1.5, 0, Math.PI * 2);
                    ctx.arc(6, 6, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                  case "diamond":
                    // Diagonales
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(size, size);
                    ctx.moveTo(size, 0);
                    ctx.lineTo(0, size);
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    break;
                  case "triangle":
                    // Triangles
                    ctx.beginPath();
                    ctx.moveTo(4, 1);
                    ctx.lineTo(7, 6);
                    ctx.lineTo(1, 6);
                    ctx.closePath();
                    ctx.fill();
                    break;
                  case "pentagon":
                    // Croix
                    ctx.fillRect(3, 0, 2, size);
                    ctx.fillRect(0, 3, size, 2);
                    break;
                  default:
                    // Damier
                    ctx.fillRect(0, 0, 4, 4);
                    ctx.fillRect(4, 4, 4, 4);
                }
              }
              return canvas;
            })(),
            repeat: "repeat",
          },
        },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Texture on Pie Chart

### ✅ Quand utiliser ce type de diagramme

Le pie chart avec textures est particulièrement adapté pour :

- **Améliorer l'accessibilité** : les textures permettent de distinguer les segments indépendamment des couleurs (daltonisme)
- **Documents imprimés en N&B** : les motifs restent visibles sans couleur
- **Storytelling agricole/industriel** : les textures évoquent les matériaux naturels
- **Présentations formelles** : aspect professionnel et distinctif
- **Données environnementales** : cohérence visuelle avec le sujet "nature"

**Exemples concrets :**
- Répartition des surfaces agricoles
- Composition des sols
- Types de matériaux recyclés
- Ressources naturelles

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez les textures dans ces cas :

- **Écrans basse résolution** : les motifs peuvent devenir illisibles
- **Nombreux segments** (> 8) : trop de textures différentes sont confuses
- **Animations** : les patterns peuvent causer des effets de moiré
- **Style minimaliste** : les textures ajoutent de la complexité visuelle
- **Export SVG** : les patterns canvas ne s'exportent pas toujours bien

### 🔧 Fonctionnalités ECharts utilisées

- **itemStyle.color.type: "pattern"** : utilise un canvas comme texture
- **image: canvas** : canvas HTML5 dessiné dynamiquement
- **repeat: "repeat"** : répétition du motif
- **borderWidth: 3** : séparation claire entre segments
- **shadowBlur** : effet de profondeur

### 📊 Analyse de ce graphique

Ce graphique présente la répartition des surfaces agricoles cultivées en France :

- **🌾 Blé tendre dominant** : 4,8 M ha (40 % des surfaces)
- **🌾 Céréales = 74 %** : blé + maïs + orge + autres
- **Oléagineux en croissance** : colza + tournesol = 16 %
- **🍇 Vigne = patrimoine** : 0,8 M ha de vignobles

**Surfaces par type de culture :**
| Culture | Surface (M ha) | Part (%) | Tendance |
|---------|----------------|----------|----------|
| Blé tendre | 4,8 | 40 % | ➡️ stable |
| Orge | 1,8 | 15 % | 📈 hausse |
| Maïs grain | 1,4 | 12 % | 📉 baisse |
| Colza | 1,2 | 10 % | ➡️ stable |
| Autres | 0,9 | 7 % | ➡️ stable |
| Vigne | 0,8 | 7 % | ➡️ stable |
| Tournesol | 0,7 | 6 % | 📈 hausse |
| Betterave | 0,4 | 3 % | 📉 baisse |

### 🌍 Contexte agricole français

La France est le **1er producteur agricole européen** :
- **1re place UE** pour le blé, maïs, betterave sucrière
- **2e rang mondial** pour le vin
- **SAU totale** : 28 M ha (50 % du territoire)

**Enjeux actuels :**
1. **Changement climatique** : adaptation des cultures, irrigation
2. **Transition écologique** : réduction des intrants, bio
3. **Souveraineté alimentaire** : dépendance protéines importées
4. **Renouvellement générationnel** : 50 % des agriculteurs > 55 ans

### 💡 Tips pour les textures ECharts

- Utilisez des **motifs simples** : lignes, points, croix
- **Taille de motif 6-10 px** : visible sans être envahissant
- **Contraste subtil** : rgba avec 20-40 % d'opacité
- Testez en **niveau de gris** pour valider l'accessibilité
- Préférez **SVG patterns** pour l'export si possible
`;

export default function TextureOnPieChart() {
  return (
    <ChartEditor
      title="Texture on Pie Chart"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
