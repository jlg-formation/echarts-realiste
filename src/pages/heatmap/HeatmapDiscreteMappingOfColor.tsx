import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données de niveaux d'alerte pollution - Île-de-France, semaine du 18-24 novembre 2024
// Format: [jour (0-6), zone (0-7), niveau d'alerte (0-3)]
// 0 = Bon, 1 = Moyen, 2 = Dégradé, 3 = Mauvais (alerte)
const zones = [
  "Paris Centre",
  "La Défense",
  "Saint-Denis",
  "Créteil",
  "Versailles",
  "Cergy",
  "Évry",
  "Meaux",
];

const jours = [
  "Lun 18",
  "Mar 19",
  "Mer 20",
  "Jeu 21",
  "Ven 22",
  "Sam 23",
  "Dim 24",
];

const niveauxLabels = ["Bon", "Moyen", "Dégradé", "Mauvais"];
const niveauxColors = ["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c"];

// Données réalistes de pollution (pic en milieu de semaine, amélioration weekend)
// Paris Centre et La Défense plus pollués (trafic), zones périphériques meilleures
const pollutionData: [number, number, number][] = [
  // Lundi - début de semaine, pollution moyenne
  [0, 0, 2],
  [0, 1, 2],
  [0, 2, 1],
  [0, 3, 1],
  [0, 4, 1],
  [0, 5, 0],
  [0, 6, 1],
  [0, 7, 0],
  // Mardi - légère hausse
  [1, 0, 2],
  [1, 1, 2],
  [1, 2, 2],
  [1, 3, 1],
  [1, 4, 1],
  [1, 5, 1],
  [1, 6, 1],
  [1, 7, 0],
  // Mercredi - pic de pollution, épisode anticyclonique
  [2, 0, 3],
  [2, 1, 3],
  [2, 2, 3],
  [2, 3, 2],
  [2, 4, 2],
  [2, 5, 1],
  [2, 6, 2],
  [2, 7, 1],
  // Jeudi - maintien niveau élevé
  [3, 0, 3],
  [3, 1, 3],
  [3, 2, 2],
  [3, 3, 2],
  [3, 4, 2],
  [3, 5, 2],
  [3, 6, 2],
  [3, 7, 1],
  // Vendredi - légère amélioration
  [4, 0, 2],
  [4, 1, 2],
  [4, 2, 2],
  [4, 3, 2],
  [4, 4, 1],
  [4, 5, 1],
  [4, 6, 1],
  [4, 7, 1],
  // Samedi - amélioration notable (moins de trafic)
  [5, 0, 1],
  [5, 1, 1],
  [5, 2, 1],
  [5, 3, 1],
  [5, 4, 0],
  [5, 5, 0],
  [5, 6, 1],
  [5, 7, 0],
  // Dimanche - retour à la normale
  [6, 0, 1],
  [6, 1, 0],
  [6, 2, 1],
  [6, 3, 0],
  [6, 4, 0],
  [6, 5, 0],
  [6, 6, 0],
  [6, 7, 0],
];

const option: EChartsOption = {
  title: {
    text: "Niveaux d'alerte pollution - Île-de-France",
    subtext:
      "🚨 Alerte pollution mercredi-jeudi : circulation différenciée activée à Paris et La Défense",
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
      const jour = jours[p.value[0]];
      const zone = zones[p.value[1]];
      const niveau = p.value[2];
      const niveauLabel = niveauxLabels[niveau];
      const couleur = niveauxColors[niveau];
      const icone =
        niveau === 3 ? "⚠️" : niveau === 2 ? "🟠" : niveau === 1 ? "🟡" : "✅";
      return `<strong>${zone}</strong><br/>
              ${jour}<br/>
              Niveau : <span style="color:${couleur};font-weight:bold">${icone} ${niveauLabel}</span>`;
    },
  },
  grid: {
    left: "15%",
    right: "8%",
    top: "18%",
    bottom: "18%",
  },
  xAxis: {
    type: "category",
    data: jours,
    name: "Jour",
    nameLocation: "middle",
    nameGap: 30,
    splitArea: {
      show: true,
    },
    axisLabel: {
      fontSize: 11,
    },
  },
  yAxis: {
    type: "category",
    data: zones,
    name: "Zone géographique",
    nameLocation: "middle",
    nameGap: 90,
    splitArea: {
      show: true,
    },
    axisLabel: {
      fontSize: 11,
    },
  },
  visualMap: {
    type: "piecewise",
    min: 0,
    max: 3,
    pieces: [
      { value: 0, label: "✅ Bon", color: niveauxColors[0] },
      { value: 1, label: "🟡 Moyen", color: niveauxColors[1] },
      { value: 2, label: "🟠 Dégradé", color: niveauxColors[2] },
      { value: 3, label: "⚠️ Mauvais", color: niveauxColors[3] },
    ],
    orient: "horizontal",
    left: "center",
    bottom: "2%",
    textStyle: {
      fontSize: 11,
    },
  },
  series: [
    {
      name: "Niveau pollution",
      type: "heatmap",
      data: pollutionData,
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { value: [number, number, number] };
          const niveau = p.value[2];
          return niveau === 3
            ? "⚠️"
            : niveau === 2
              ? "🟠"
              : niveau === 1
                ? "🟡"
                : "✅";
        },
        fontSize: 14,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Heatmap avec mapping de couleurs discrètes

### ✅ Quand utiliser ce type de diagramme

La heatmap avec **visualMap piecewise** (discrète) est idéale pour :

- **Données catégorielles ordinales** : niveaux d'alerte (vert/jaune/orange/rouge), grades (A/B/C/D), états (bon/moyen/mauvais)
- **Classification avec seuils** : toute donnée où les valeurs sont regroupées en catégories distinctes
- **Communication rapide** : les couleurs discrètes sont plus faciles à interpréter que les dégradés
- **Conformité réglementaire** : alertes pollution, risques sanitaires, niveaux de sécurité

**Exemples concrets :**
- Alertes qualité de l'air par zone
- Niveaux de risque incendie par département
- États de santé serveurs (OK/Warning/Critical)
- Scores de satisfaction client (Insatisfait à Très satisfait)

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le mapping discret dans ces cas :

- **Données continues sans seuils naturels** : utilisez un dégradé continu
- **Trop de catégories** (> 7) : les couleurs deviennent difficiles à distinguer
- **Valeurs précises importantes** : le regroupement masque les nuances
- **Comparaison fine** : les valeurs proches du seuil semblent identiques

**Erreurs courantes à éviter :**
- Choisir des couleurs non intuitives (ex: rouge pour "bon")
- Oublier d'expliciter la signification de chaque niveau
- Ne pas respecter l'ordre logique des catégories
- Utiliser des couleurs trop proches pour des niveaux différents

### 📊 Analyse de ce graphique

Cette heatmap visualise les **alertes pollution en Île-de-France** sur une semaine :

- **Épisode critique** : mercredi et jeudi, les zones Paris Centre, La Défense et Saint-Denis atteignent le niveau "Mauvais" (rouge)
- **Gradient centre-périphérie** : les zones centrales sont plus polluées que les zones périurbaines
- **Effet weekend** : amélioration notable samedi-dimanche avec la baisse du trafic

**Décision déclenchée** : Activation de la circulation différenciée (vignettes Crit'Air) dans la zone dense mercredi et jeudi.

### 🎨 Bonnes pratiques appliquées

- **Couleurs sémantiques universelles** : vert (bon) → jaune → orange → rouge (mauvais)
- **Icônes dans les cellules** : doublent l'information couleur pour l'accessibilité
- **Légende explicite** : chaque niveau est clairement nommé avec son icône
- **Ordre logique** : zones ordonnées par proximité au centre, jours chronologiques

### ⚙️ Configuration ECharts clé

\`\`\`javascript
visualMap: {
  type: 'piecewise',  // Active le mode discret
  pieces: [
    { value: 0, label: 'Bon', color: '#2ecc71' },
    { value: 1, label: 'Moyen', color: '#f1c40f' },
    // ...
  ]
}
\`\`\`

Le paramètre \`type: 'piecewise'\` transforme le visualMap en catégories discrètes au lieu d'un dégradé continu.
`;

export default function HeatmapDiscreteMappingOfColor() {
  return (
    <ChartEditor
      title="Heatmap - Discrete Mapping of Color"
      section="Heatmap"
      option={option}
      notes={notes}
    />
  );
}
