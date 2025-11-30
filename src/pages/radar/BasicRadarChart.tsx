import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Profil de compétences - Candidat développeur fullstack
// Contexte : Évaluation RH pour recrutement d'un développeur senior

const candidats = [
  {
    nom: "Alice Martin",
    poste: "Dev Fullstack Senior",
    scores: [95, 88, 75, 82, 90, 85], // Technique, Communication, Leadership, Adaptabilité, Autonomie, Esprit équipe
    experience: "8 ans",
    verdict: "Recommandé ✅",
  },
  {
    nom: "Thomas Dupont",
    poste: "Dev Backend",
    scores: [92, 65, 55, 70, 85, 72],
    experience: "5 ans",
    verdict: "À considérer 🟡",
  },
];

const competences = [
  { name: "Compétences\ntechniques", max: 100 },
  { name: "Communication", max: 100 },
  { name: "Leadership", max: 100 },
  { name: "Adaptabilité", max: 100 },
  { name: "Autonomie", max: 100 },
  { name: "Esprit\nd'équipe", max: 100 },
];

// Calcul des moyennes
const moyenneAlice = Math.round(
  candidats[0].scores.reduce((a, b) => a + b, 0) / candidats[0].scores.length,
);
const moyenneThomas = Math.round(
  candidats[1].scores.reduce((a, b) => a + b, 0) / candidats[1].scores.length,
);

// Seuil minimum requis pour le poste
const seuilMinimum = [80, 70, 60, 70, 75, 70];
const seuilNom = "Seuil Senior";

const option: EChartsOption = {
  title: {
    text: "👥 Évaluation des candidats - Poste Dev Fullstack Senior",
    subtext: `Alice Martin (moy. ${moyenneAlice}/100) vs Thomas Dupont (moy. ${moyenneThomas}/100) · Seuil minimum en pointillés`,
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
        name: string;
        value: number[];
        dataIndex: number;
      };

      if (p.seriesName === seuilNom) {
        return `<b>${seuilNom}</b><br/>Compétences minimales requises pour le poste`;
      }

      const candidat = candidats.find((c) => c.nom === p.seriesName);
      if (!candidat) return "";

      const scores = candidat.scores;
      const competencesList = competences.map(
        (c, i) =>
          `${c.name.replace("\n", " ")} : <b>${scores[i]}/100</b> ${scores[i] >= seuilMinimum[i] ? "✅" : "❌"}`,
      );

      return `
        <div style="min-width: 220px;">
          <b style="font-size: 14px;">${candidat.nom}</b><br/>
          <span style="color: #6b7280;">${candidat.poste} · ${candidat.experience}</span>
          <hr style="margin: 8px 0;"/>
          ${competencesList.join("<br/>")}
          <hr style="margin: 8px 0;"/>
          <b>Moyenne : ${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}/100</b><br/>
          <span style="font-size: 13px;">${candidat.verdict}</span>
        </div>
      `;
    },
  },
  legend: {
    data: [candidats[0].nom, candidats[1].nom, seuilNom],
    top: 55,
    textStyle: {
      fontSize: 12,
    },
  },
  radar: {
    indicator: competences,
    shape: "polygon",
    center: ["50%", "58%"],
    radius: "60%",
    startAngle: 90,
    splitNumber: 5,
    axisName: {
      color: "#374151",
      fontSize: 11,
      fontWeight: "bold",
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ["#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af"],
        opacity: 0.3,
      },
    },
    axisLine: {
      lineStyle: {
        color: "#d1d5db",
      },
    },
    splitLine: {
      lineStyle: {
        color: "#e5e7eb",
      },
    },
  },
  series: [
    {
      name: candidats[0].nom,
      type: "radar",
      symbol: "circle",
      symbolSize: 8,
      lineStyle: {
        width: 2,
        color: "#22c55e",
      },
      areaStyle: {
        color: "#22c55e",
        opacity: 0.2,
      },
      itemStyle: {
        color: "#22c55e",
      },
      emphasis: {
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.4,
        },
      },
      data: [
        {
          value: candidats[0].scores,
          name: candidats[0].nom,
          label: {
            show: true,
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return `${p.value}`;
            },
            fontSize: 10,
            color: "#16a34a",
            fontWeight: "bold",
          },
        },
      ],
    },
    {
      name: candidats[1].nom,
      type: "radar",
      symbol: "rect",
      symbolSize: 8,
      lineStyle: {
        width: 2,
        color: "#3b82f6",
      },
      areaStyle: {
        color: "#3b82f6",
        opacity: 0.2,
      },
      itemStyle: {
        color: "#3b82f6",
      },
      emphasis: {
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.4,
        },
      },
      data: [
        {
          value: candidats[1].scores,
          name: candidats[1].nom,
          label: {
            show: true,
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return `${p.value}`;
            },
            fontSize: 10,
            color: "#2563eb",
            fontWeight: "bold",
          },
        },
      ],
    },
    {
      name: seuilNom,
      type: "radar",
      symbol: "none",
      lineStyle: {
        width: 2,
        type: "dashed",
        color: "#f59e0b",
      },
      areaStyle: {
        opacity: 0,
      },
      itemStyle: {
        color: "#f59e0b",
      },
      data: [
        {
          value: seuilMinimum,
          name: seuilNom,
        },
      ],
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Graphique radar (Radar Chart)

### ✅ Quand utiliser ce type de diagramme

Le **graphique radar** (aussi appelé spider chart ou toile d'araignée) est idéal pour :

- **Comparer des profils multidimensionnels** : candidats, produits, équipes
- **Évaluation de compétences** : soft skills, hard skills
- **Analyse SWOT visuelle** : forces, faiblesses
- **Benchmark** : comparer à un standard ou un seuil

**Caractéristiques clés :**
- 5 à 8 axes maximum (au-delà : illisible)
- Échelle commune sur tous les axes
- Forme polygonale pour visualiser l'équilibre

### ❌ Quand ne pas utiliser

- **Trop d'axes** (> 8) : préférer des barres ou un tableau
- **Échelles différentes** : impossible de comparer visuellement
- **Données temporelles** : utiliser des lignes
- **Trop de séries** (> 3-4) : superposition illisible
- **Public non averti** : lecture moins intuitive qu'un bar chart

### 📊 Analyse de ce graphique

**Évaluation des candidats - Poste Dev Fullstack Senior**

| Candidat | Moyenne | Forces | Faiblesses |
|----------|---------|--------|------------|
| Alice Martin | ${moyenneAlice}/100 | Technique, Autonomie | Leadership |
| Thomas Dupont | ${moyenneThomas}/100 | Technique, Autonomie | Communication, Leadership |

**Comparaison au seuil requis :**

| Compétence | Alice | Thomas | Seuil |
|------------|-------|--------|-------|
| Technique | 95 ✅ | 92 ✅ | 80 |
| Communication | 88 ✅ | 65 ❌ | 70 |
| Leadership | 75 ✅ | 55 ❌ | 60 |
| Adaptabilité | 82 ✅ | 70 ✅ | 70 |
| Autonomie | 90 ✅ | 85 ✅ | 75 |
| Esprit d'équipe | 85 ✅ | 72 ✅ | 70 |

**Recommandation :**
- ✅ **Alice Martin** : Profil complet, dépasse les seuils sur tous les axes
- 🟡 **Thomas Dupont** : Fort techniquement mais lacunes en soft skills

### 🔧 Configuration du radar ECharts

**Définition des indicateurs :**
\`\`\`javascript
radar: {
  indicator: [
    { name: 'Compétences\\ntechniques', max: 100 },
    { name: 'Communication', max: 100 },
    { name: 'Leadership', max: 100 },
    { name: 'Adaptabilité', max: 100 },
    { name: 'Autonomie', max: 100 },
    { name: 'Esprit\\nd\\'équipe', max: 100 }
  ],
  shape: 'polygon', // ou 'circle'
  center: ['50%', '55%'],
  radius: '65%'
}
\`\`\`

**Série avec aire colorée :**
\`\`\`javascript
series: [{
  type: 'radar',
  data: [{
    value: [95, 88, 75, 82, 90, 85],
    name: 'Alice Martin'
  }],
  lineStyle: { width: 2 },
  areaStyle: { opacity: 0.2 },
  symbol: 'circle',
  symbolSize: 8
}]
\`\`\`

**Seuil minimum (ligne pointillée) :**
\`\`\`javascript
{
  name: 'Seuil minimum',
  type: 'radar',
  lineStyle: { type: 'dashed' },
  areaStyle: { opacity: 0 }, // Pas de remplissage
  data: [{ value: [80, 70, 60, 70, 75, 70] }]
}
\`\`\`

### 📈 Interprétation visuelle

**Forme du polygone :**
- **Équilibré (cercle régulier)** : profil polyvalent
- **Pointu** : une compétence dominante
- **Creux** : lacune identifiée
- **Englobe le seuil** : candidat qualifié

**Superposition de profils :**
- **Plus grande surface** : meilleur score global
- **Intersection** : points communs
- **Écarts** : différences clés

### 🎯 Cas d'usage RH

**1. Recrutement**
\`\`\`
- Comparer candidats au profil idéal
- Identifier les lacunes à former
- Objectiver la décision
\`\`\`

**2. Évaluation annuelle**
\`\`\`
- Comparer N vs N-1
- Visualiser la progression
- Identifier les axes de développement
\`\`\`

**3. Gestion des talents**
\`\`\`
- Cartographier les compétences équipe
- Identifier les complémentarités
- Planifier les formations
\`\`\`

**4. 360° feedback**
\`\`\`
- Comparer auto-évaluation vs manager vs pairs
- Révéler les angles morts
- Discussion constructive
\`\`\`

### 🎨 Bonnes pratiques de design

**1. Nombre d'axes**
\`\`\`
Optimal : 5-7 axes
Maximum : 8 axes
Au-delà : trop dense
\`\`\`

**2. Ordre des axes**
\`\`\`
- Regrouper par catégorie (hard skills, soft skills)
- Mettre les plus importants en haut
- Cohérence entre graphiques
\`\`\`

**3. Différenciation des séries**
\`\`\`javascript
// Utiliser des symboles différents
series: [
  { symbol: 'circle', ... },  // Candidat 1
  { symbol: 'rect', ... },    // Candidat 2
  { symbol: 'triangle', ... } // Candidat 3
]
\`\`\`

**4. Lisibilité**
\`\`\`
- Labels sur les points
- Couleurs contrastées
- Légende explicite
- Seuil en pointillés
\`\`\`

### ⚠️ Pièges à éviter

**1. Axes non comparables**
\`\`\`
❌ Salaire (30K-80K) vs Note (1-5) vs Ancienneté (0-20)
✅ Tout normaliser sur 0-100
\`\`\`

**2. Trop de séries**
\`\`\`
❌ 10 candidats superposés
✅ Max 3-4 séries, ou small multiples
\`\`\`

**3. Forme trompeuse**
\`\`\`
L'aire visuelle n'est PAS proportionnelle aux scores !
Un score de 50 sur tous les axes ≠ 50% de l'aire
\`\`\`

**4. Ordres des axes**
\`\`\`
L'ordre des axes influence la forme perçue
Garder le même ordre pour toutes les comparaisons
\`\`\`

### 💡 Extensions possibles

**1. Small multiples**
\`\`\`
Un radar par candidat (même échelle)
Plus lisible que superposition
\`\`\`

**2. Animation temporelle**
\`\`\`
Évolution du profil sur plusieurs années
Visualiser la progression
\`\`\`

**3. Interactivité**
\`\`\`
Clic sur un axe → détail de l'évaluation
Slider pour ajuster les seuils
Filtre par département
\`\`\`

### 📋 Données pour ce graphique

\`\`\`javascript
const candidats = [
  {
    nom: 'Alice Martin',
    scores: [95, 88, 75, 82, 90, 85],
    experience: '8 ans',
    verdict: 'Recommandé ✅'
  },
  {
    nom: 'Thomas Dupont',
    scores: [92, 65, 55, 70, 85, 72],
    experience: '5 ans',
    verdict: 'À considérer 🟡'
  }
];

const seuilMinimum = [80, 70, 60, 70, 75, 70];
\`\`\`
`;

export default function BasicRadarChart() {
  return (
    <ChartEditor
      title="Basic Radar Chart"
      section="Radar"
      option={option}
      notes={notes}
    />
  );
}
