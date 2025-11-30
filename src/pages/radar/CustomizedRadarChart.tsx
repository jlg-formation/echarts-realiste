import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Évaluation 360° d'un manager
// Contexte : Feedback annuel d'un responsable d'équipe
// 4 sources : Auto-évaluation, Manager N+1, Collaborateurs, Pairs

interface Evaluateur {
  nom: string;
  type: "auto" | "manager" | "collaborateurs" | "pairs";
  scores: number[];
  couleur: string;
  symbole: "circle" | "rect" | "triangle" | "diamond";
}

const managerEvalue = {
  nom: "Sophie Bernard",
  poste: "Responsable Marketing Digital",
  equipe: "8 collaborateurs",
  anciennete: "4 ans",
};

const evaluateurs: Evaluateur[] = [
  {
    nom: "Auto-évaluation",
    type: "auto",
    scores: [85, 80, 90, 75, 88, 82, 78, 85],
    couleur: "#8b5cf6",
    symbole: "circle",
  },
  {
    nom: "Manager N+1",
    type: "manager",
    scores: [78, 85, 82, 72, 80, 88, 75, 80],
    couleur: "#ef4444",
    symbole: "diamond",
  },
  {
    nom: "Collaborateurs (moy.)",
    type: "collaborateurs",
    scores: [72, 68, 75, 85, 70, 80, 90, 78],
    couleur: "#22c55e",
    symbole: "triangle",
  },
  {
    nom: "Pairs (moy.)",
    type: "pairs",
    scores: [80, 78, 85, 70, 82, 75, 72, 82],
    couleur: "#3b82f6",
    symbole: "rect",
  },
];

const competences = [
  { name: "Leadership", max: 100, icon: "👑" },
  { name: "Communication", max: 100, icon: "💬" },
  { name: "Vision\nstratégique", max: 100, icon: "🎯" },
  { name: "Écoute &\nEmpathie", max: 100, icon: "👂" },
  { name: "Prise de\ndécision", max: 100, icon: "⚡" },
  { name: "Gestion\ndu stress", max: 100, icon: "🧘" },
  { name: "Développement\néquipe", max: 100, icon: "🌱" },
  { name: "Innovation", max: 100, icon: "💡" },
];

// Calcul des moyennes par évaluateur
const moyennes = evaluateurs.map((e) => ({
  nom: e.nom,
  moyenne: Math.round(e.scores.reduce((a, b) => a + b, 0) / e.scores.length),
}));

// Calcul des écarts (angles morts)
const ecartAutoVsCollabo = competences.map(
  (_, i) => evaluateurs[0].scores[i] - evaluateurs[2].scores[i],
);
const maxEcart = Math.max(...ecartAutoVsCollabo);
const indexMaxEcart = ecartAutoVsCollabo.indexOf(maxEcart);

const option: EChartsOption = {
  title: {
    text: "🔄 Évaluation 360° - Feedback multi-sources",
    subtext: `${managerEvalue.nom} · ${managerEvalue.poste} · ${managerEvalue.anciennete}`,
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

      const evaluateur = evaluateurs.find((e) => e.nom === p.seriesName);
      if (!evaluateur) return "";

      const moyenne = Math.round(
        evaluateur.scores.reduce((a, b) => a + b, 0) / evaluateur.scores.length,
      );

      // Points forts et axes d'amélioration
      const sorted = evaluateur.scores
        .map((s, i) => ({
          score: s,
          comp: competences[i].name.replace("\n", " "),
        }))
        .sort((a, b) => b.score - a.score);

      const top3 = sorted.slice(0, 3);
      const bottom3 = sorted.slice(-3).reverse();

      return `
        <div style="min-width: 250px;">
          <b style="font-size: 14px;">${evaluateur.nom}</b><br/>
          <span style="color: #6b7280;">Moyenne : <b>${moyenne}/100</b></span>
          <hr style="margin: 8px 0;"/>
          <b style="color: #22c55e;">✅ Points forts :</b><br/>
          ${top3.map((t) => `• ${t.comp} : ${t.score}`).join("<br/>")}
          <hr style="margin: 8px 0;"/>
          <b style="color: #f59e0b;">⚠️ Axes d'amélioration :</b><br/>
          ${bottom3.map((t) => `• ${t.comp} : ${t.score}`).join("<br/>")}
        </div>
      `;
    },
  },
  legend: {
    data: evaluateurs.map((e) => e.nom),
    top: 55,
    textStyle: {
      fontSize: 11,
    },
  },
  radar: {
    indicator: competences.map((c) => ({ name: c.name, max: c.max })),
    shape: "polygon",
    center: ["50%", "58%"],
    radius: "55%",
    startAngle: 90,
    splitNumber: 5,
    axisName: {
      color: "#374151",
      fontSize: 10,
      fontWeight: "bold",
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ["#fafafa", "#f5f5f5", "#f0f0f0", "#e5e5e5", "#d4d4d4"],
        opacity: 0.6,
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
  series: evaluateurs.map((evaluateur) => ({
    name: evaluateur.nom,
    type: "radar" as const,
    symbol: evaluateur.symbole,
    symbolSize: 6,
    lineStyle: {
      width: 2,
      color: evaluateur.couleur,
    },
    areaStyle: {
      color: evaluateur.couleur,
      opacity: evaluateur.type === "auto" ? 0.1 : 0.05,
    },
    itemStyle: {
      color: evaluateur.couleur,
    },
    emphasis: {
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        opacity: 0.25,
      },
    },
    data: [
      {
        value: evaluateur.scores,
        name: evaluateur.nom,
      },
    ],
  })),
};

const notes = `
## 📚 Note pédagogique : Évaluation 360° avec Radar

### ✅ Qu'est-ce que l'évaluation 360° ?

L'**évaluation 360 degrés** est un processus de feedback où un collaborateur est évalué par :

| Source | Description | Poids typique |
|--------|-------------|---------------|
| 👤 Auto-évaluation | Le collaborateur lui-même | 25% |
| 👔 Manager N+1 | Son supérieur hiérarchique | 25% |
| 👥 Collaborateurs | Son équipe directe | 30% |
| 🤝 Pairs | Collègues de même niveau | 20% |

**Objectifs :**
- Obtenir une vision complète et nuancée
- Identifier les "angles morts" (écarts auto vs autres)
- Favoriser le développement personnel
- Réduire les biais d'un évaluateur unique

### 📊 Analyse de ce graphique

**Profil évalué : ${managerEvalue.nom}**
- Poste : ${managerEvalue.poste}
- Équipe : ${managerEvalue.equipe}
- Ancienneté : ${managerEvalue.anciennete}

**Moyennes par source :**
${moyennes.map((m) => `| ${m.nom} | ${m.moyenne}/100 |`).join("\n")}

**Angle mort identifié :**
\`\`\`
Compétence : ${competences[indexMaxEcart].name.replace("\n", " ")}
Auto-évaluation : ${evaluateurs[0].scores[indexMaxEcart]}
Perception collaborateurs : ${evaluateurs[2].scores[indexMaxEcart]}
Écart : +${maxEcart} points (surestimation)
\`\`\`

### 🎯 Lecture des écarts

**Types d'écarts courants :**

| Écart | Interprétation | Action |
|-------|----------------|--------|
| Auto > Autres | Surestimation | Prise de conscience nécessaire |
| Auto < Autres | Sous-estimation | Renforcer la confiance |
| Manager ≠ Équipe | Perception différente | Feedback triangulaire |
| Pairs ≠ Équipe | Compétences différentes | Normal si rôles différents |

### 🔧 Configuration ECharts personnalisée

**Multi-séries avec symboles distincts :**
\`\`\`javascript
series: [
  {
    name: 'Auto-évaluation',
    symbol: 'circle',
    lineStyle: { color: '#8b5cf6' },
    data: [{ value: [85, 80, 90, 75, 88, 82, 78, 85] }]
  },
  {
    name: 'Manager N+1',
    symbol: 'diamond',
    lineStyle: { color: '#ef4444' },
    data: [{ value: [78, 85, 82, 72, 80, 88, 75, 80] }]
  },
  // ... autres séries
]
\`\`\`

**Opacités différenciées :**
\`\`\`javascript
areaStyle: {
  color: evaluateur.couleur,
  opacity: evaluateur.type === 'auto' ? 0.1 : 0.05
}
\`\`\`

### 📈 Compétences évaluées

| Compétence | Description | Indicateurs observables |
|------------|-------------|------------------------|
| Leadership | Capacité à guider | Vision, décision, exemplarité |
| Communication | Clarté des échanges | Oral, écrit, écoute |
| Vision stratégique | Anticipation | Roadmap, priorités |
| Écoute & Empathie | Attention aux autres | Disponibilité, compréhension |
| Prise de décision | Rapidité & justesse | Arbitrages, responsabilité |
| Gestion du stress | Résilience | Calme, recul |
| Développement équipe | Coaching | Formation, délégation |
| Innovation | Créativité | Idées, expérimentation |

### 💡 Bonnes pratiques RH

**1. Anonymat des répondants**
\`\`\`
- Collaborateurs : réponses agrégées (min. 3)
- Pairs : moyenne anonymisée
- Manager : identifié (normal)
\`\`\`

**2. Calibration des échelles**
\`\`\`
1-20 : Insuffisant
21-40 : À développer
41-60 : Conforme aux attentes
61-80 : Performant
81-100 : Excellent / Modèle
\`\`\`

**3. Fréquence recommandée**
\`\`\`
- 360° complet : 1 fois/an
- Feedback continu : trimestriel
- Check-in manager : mensuel
\`\`\`

### ⚠️ Limites de l'évaluation 360°

**1. Biais potentiels**
\`\`\`
- Effet de halo (une qualité influence tout)
- Biais de complaisance (entre pairs)
- Biais de sévérité (manager exigeant)
- Effet de récence (derniers événements)
\`\`\`

**2. Contexte culturel**
\`\`\`
- Certaines cultures évitent le feedback négatif
- Hiérarchie respectée = notes plus hautes au N+1
- Individualisme vs collectivisme
\`\`\`

**3. Confidentialité**
\`\`\`
- Petites équipes : anonymat difficile
- Réponses identifiables = autocensure
\`\`\`

### 🎨 Personnalisation du radar

**Forme circulaire vs polygonale :**
\`\`\`javascript
radar: {
  shape: 'polygon', // 'circle' pour arrondi
  splitNumber: 5,   // Nombre de cercles concentriques
}
\`\`\`

**Couleurs par niveau :**
\`\`\`javascript
splitArea: {
  areaStyle: {
    color: [
      '#fafafa', // Centre - faible
      '#f5f5f5',
      '#f0f0f0',
      '#e5e5e5',
      '#d4d4d4'  // Extérieur - élevé
    ]
  }
}
\`\`\`

### 📋 Données utilisées

\`\`\`javascript
const evaluateurs = [
  {
    nom: 'Auto-évaluation',
    scores: [85, 80, 90, 75, 88, 82, 78, 85]
  },
  {
    nom: 'Manager N+1',
    scores: [78, 85, 82, 72, 80, 88, 75, 80]
  },
  {
    nom: 'Collaborateurs (moy.)',
    scores: [72, 68, 75, 85, 70, 80, 90, 78]
  },
  {
    nom: 'Pairs (moy.)',
    scores: [80, 78, 85, 70, 82, 75, 72, 82]
  }
];
\`\`\`

### 🔄 Extensions possibles

**1. Comparaison N vs N-1**
\`\`\`
Ajouter une série "Année précédente"
Visualiser la progression
\`\`\`

**2. Benchmark équipe**
\`\`\`
Comparer au profil moyen des managers
Identifier les talents
\`\`\`

**3. Plan de développement**
\`\`\`
Clic sur un axe → objectifs associés
Suivi des actions
\`\`\`
`;

export default function CustomizedRadarChart() {
  return (
    <ChartEditor
      title="Customized Radar Chart"
      section="Radar"
      option={option}
      notes={notes}
    />
  );
}
