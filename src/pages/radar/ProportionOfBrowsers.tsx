import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Comparaison features smartphones haut de gamme 2024
// Contexte : Guide d'achat tech pour comparer iPhone, Samsung, Pixel

interface Smartphone {
  nom: string;
  marque: string;
  prix: number;
  scores: number[]; // Photo, Batterie, Écran, Performance, Audio, Durabilité
  couleur: string;
  bestseller: boolean;
  note: string;
}

const smartphones: Smartphone[] = [
  {
    nom: "iPhone 16 Pro Max",
    marque: "Apple",
    prix: 1479,
    scores: [95, 75, 92, 98, 82, 88],
    couleur: "#6366f1",
    bestseller: true,
    note: "4.8/5 ⭐",
  },
  {
    nom: "Galaxy S24 Ultra",
    marque: "Samsung",
    prix: 1469,
    scores: [98, 82, 95, 94, 78, 85],
    couleur: "#22c55e",
    bestseller: true,
    note: "4.7/5 ⭐",
  },
  {
    nom: "Pixel 9 Pro XL",
    marque: "Google",
    prix: 1199,
    scores: [96, 80, 88, 88, 75, 82],
    couleur: "#f97316",
    bestseller: false,
    note: "4.6/5 ⭐",
  },
];

const criteres = [
  {
    name: "📷 Photo\n& Vidéo",
    max: 100,
    description: "Qualité appareil photo",
  },
  {
    name: "🔋 Autonomie\nbatterie",
    max: 100,
    description: "Durée utilisation",
  },
  {
    name: "📱 Qualité\nécran",
    max: 100,
    description: "Résolution, luminosité",
  },
  {
    name: "⚡ Performance\nprocesseur",
    max: 100,
    description: "Vitesse, gaming",
  },
  {
    name: "🔊 Qualité\naudio",
    max: 100,
    description: "Haut-parleurs, codec",
  },
  {
    name: "🛡️ Durabilité\n& résistance",
    max: 100,
    description: "Eau, chocs, rayures",
  },
];

// Calcul du score global pondéré
const poids = [0.25, 0.2, 0.15, 0.15, 0.1, 0.15]; // Photo prioritaire
const scoresGlobaux = smartphones.map((s) => ({
  nom: s.nom,
  score: Math.round(
    s.scores.reduce((acc, score, i) => acc + score * poids[i], 0)
  ),
}));

// Rapport qualité/prix
const rapportQP = smartphones.map((s) => ({
  nom: s.nom,
  ratio: (
    ((scoresGlobaux.find((g) => g.nom === s.nom)?.score ?? 0) / s.prix) *
    100
  ).toFixed(2),
}));

const option: EChartsOption = {
  title: {
    text: "📱 Comparatif Smartphones Haut de Gamme 2024",
    subtext:
      "iPhone 16 Pro Max vs Galaxy S24 Ultra vs Pixel 9 Pro XL · Score sur 100",
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

      const phone = smartphones.find((s) => s.nom === p.seriesName);
      if (!phone) return "";

      const scoreGlobal =
        scoresGlobaux.find((g) => g.nom === phone.nom)?.score ?? 0;
      const qp = rapportQP.find((r) => r.nom === phone.nom)?.ratio ?? "0";

      // Meilleur critère
      const meilleurIdx = phone.scores.indexOf(Math.max(...phone.scores));
      const pireIdx = phone.scores.indexOf(Math.min(...phone.scores));

      return `
        <div style="min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <b style="font-size: 14px;">${phone.nom}</b>
            ${phone.bestseller ? '<span style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Bestseller</span>' : ""}
          </div>
          <span style="color: #6b7280;">${phone.marque} · ${phone.prix} € · ${phone.note}</span>
          <hr style="margin: 8px 0;"/>
          ${criteres.map((c, i) => `${c.name.replace("\n", " ")} : <b>${phone.scores[i]}/100</b>`).join("<br/>")}
          <hr style="margin: 8px 0;"/>
          <b>Score global : ${scoreGlobal}/100</b><br/>
          <span style="color: #22c55e;">✅ Point fort : ${criteres[meilleurIdx].description}</span><br/>
          <span style="color: #f59e0b;">⚠️ Point faible : ${criteres[pireIdx].description}</span><br/>
          <span style="color: #6b7280; font-size: 11px;">Rapport Q/P : ${qp} pts/€</span>
        </div>
      `;
    },
  },
  legend: {
    data: smartphones.map((s) => s.nom),
    top: 55,
    textStyle: {
      fontSize: 11,
    },
  },
  radar: {
    indicator: criteres.map((c) => ({ name: c.name, max: c.max })),
    shape: "circle",
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
        color: ["#ffffff", "#fafafa", "#f5f5f5", "#f0f0f0", "#e5e5e5"],
        opacity: 0.8,
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
        type: "dashed",
      },
    },
  },
  series: smartphones.map((phone, index) => ({
    name: phone.nom,
    type: "radar" as const,
    symbol: ["circle", "rect", "triangle"][index],
    symbolSize: 6,
    lineStyle: {
      width: 2.5,
      color: phone.couleur,
    },
    areaStyle: {
      color: phone.couleur,
      opacity: 0.15,
    },
    itemStyle: {
      color: phone.couleur,
    },
    emphasis: {
      lineStyle: {
        width: 4,
      },
      areaStyle: {
        opacity: 0.3,
      },
    },
    data: [
      {
        value: phone.scores,
        name: phone.nom,
        label: {
          show: index === 0, // Afficher les labels uniquement pour le premier
          formatter: (params: unknown) => {
            const p = params as { value: number };
            return `${p.value}`;
          },
          fontSize: 9,
          color: phone.couleur,
          fontWeight: "bold",
        },
      },
    ],
  })),
};

const notes = `
## 📚 Note pédagogique : Comparatif produits avec Radar

### ✅ Cas d'usage idéal

Le **graphique radar comparatif** est parfait pour :

- **Guides d'achat** : comparer des produits similaires
- **Benchmark concurrentiel** : positionnement marché
- **Décision d'achat** : visualiser les compromis
- **Tests produits** : synthétiser les résultats

**Avantages :**
- Vision globale immédiate
- Identification rapide des forces/faiblesses
- Comparaison multi-critères intuitive

### 📊 Analyse de ce graphique

**Comparatif smartphones haut de gamme 2024 :**

| Smartphone | Score global | Prix | Rapport Q/P |
|------------|--------------|------|-------------|
${smartphones.map((s, i) => `| ${s.nom} | ${scoresGlobaux[i].score}/100 | ${s.prix} € | ${rapportQP[i].ratio} |`).join("\n")}

**Résumé par modèle :**

**📱 iPhone 16 Pro Max (Apple)**
- ✅ Performance processeur exceptionnelle (A18 Pro)
- ✅ Écosystème Apple intégré
- ❌ Autonomie en retrait
- 💰 Le plus cher de la sélection

**📱 Galaxy S24 Ultra (Samsung)**
- ✅ Meilleur appareil photo (200 MP)
- ✅ Stylet S Pen inclus
- ❌ Audio légèrement en retrait
- 💰 Prix équivalent à l'iPhone

**📱 Pixel 9 Pro XL (Google)**
- ✅ IA Google avancée (Gemini)
- ✅ 7 ans de mises à jour
- ❌ Écran moins premium
- 💰 Meilleur rapport qualité/prix

### 🎯 Critères d'évaluation

| Critère | Poids | Ce qui est mesuré |
|---------|-------|-------------------|
| 📷 Photo & Vidéo | 25% | Capteur, zoom, stabilisation, mode nuit |
| 🔋 Autonomie | 20% | Capacité, charge rapide, optimisation |
| 📱 Écran | 15% | OLED, rafraîchissement, luminosité |
| ⚡ Performance | 15% | Benchmark, gaming, multitâche |
| 🔊 Audio | 10% | Haut-parleurs, Dolby Atmos, codec |
| 🛡️ Durabilité | 15% | IP68, verre, cadre, garantie |

### 🔧 Configuration ECharts spécifique

**Forme circulaire (vs polygone) :**
\`\`\`javascript
radar: {
  shape: 'circle', // Plus esthétique pour 6+ axes
  splitLine: {
    lineStyle: { type: 'dashed' }
  }
}
\`\`\`

**Labels conditionnels :**
\`\`\`javascript
data: [{
  value: phone.scores,
  label: {
    show: index === 0, // Premier seulement
    formatter: (p) => p.value,
    fontSize: 9
  }
}]
\`\`\`

**Épaisseur de ligne différenciée :**
\`\`\`javascript
lineStyle: {
  width: 2.5 // Plus épais que défaut
},
emphasis: {
  lineStyle: { width: 4 } // Encore plus au hover
}
\`\`\`

### 📈 Pondération des scores

**Score global pondéré :**
\`\`\`javascript
const poids = [0.25, 0.20, 0.15, 0.15, 0.10, 0.15];
const scoreGlobal = scores.reduce(
  (acc, score, i) => acc + score * poids[i], 
  0
);
\`\`\`

**Rapport qualité/prix :**
\`\`\`javascript
const rapportQP = scoreGlobal / prix * 100;
// Plus c'est élevé, meilleur c'est
\`\`\`

### 💡 Bonnes pratiques pour les comparatifs

**1. Nombre de produits**
\`\`\`
Optimal : 2-4 produits
Maximum : 5 produits
Au-delà : trop confus
\`\`\`

**2. Critères objectifs**
\`\`\`
✅ Benchmark Geekbench (mesurable)
✅ Capacité batterie mAh
❌ "Feeling" ou "expérience" (subjectif)
\`\`\`

**3. Sources fiables**
\`\`\`
- DXOMARK (photo)
- GSMArena (specs)
- AnTuTu/Geekbench (perf)
- JerryRigEverything (durabilité)
\`\`\`

**4. Date de publication**
\`\`\`
Les scores évoluent avec les mises à jour
Mentionner la date du test
\`\`\`

### ⚠️ Limites de ce type de comparatif

**1. Normalisation subjective**
\`\`\`
Comment convertir 200 MP vs 48 MP en score /100 ?
Les échelles sont arbitraires
\`\`\`

**2. Pondération discutable**
\`\`\`
Un photographe pondère Photo à 50%
Un gamer pondère Performance à 50%
Pas de pondération universelle
\`\`\`

**3. Critères manquants**
\`\`\`
- Poids / dimensions
- Connectique
- Écosystème
- SAV / garantie
\`\`\`

### 🎨 Personnalisation visuelle

**Symboles distincts par marque :**
\`\`\`javascript
symbol: ['circle', 'rect', 'triangle'][index]
// Aide à différencier sans couleur (accessibilité)
\`\`\`

**Couleurs de marque :**
\`\`\`javascript
const couleurs = {
  Apple: '#6366f1',    // Indigo/violet
  Samsung: '#22c55e',  // Vert
  Google: '#f97316'    // Orange
};
\`\`\`

### 📋 Données utilisées

\`\`\`javascript
const smartphones = [
  {
    nom: 'iPhone 16 Pro Max',
    marque: 'Apple',
    prix: 1479,
    scores: [95, 75, 92, 98, 82, 88],
    note: '4.8/5'
  },
  {
    nom: 'Galaxy S24 Ultra',
    marque: 'Samsung',
    prix: 1469,
    scores: [98, 82, 95, 94, 78, 85],
    note: '4.7/5'
  },
  {
    nom: 'Pixel 9 Pro XL',
    marque: 'Google',
    prix: 1199,
    scores: [96, 80, 88, 88, 75, 82],
    note: '4.6/5'
  }
];
\`\`\`

### 🔄 Extensions possibles

**1. Filtre par budget**
\`\`\`
Slider de prix max
Afficher uniquement les modèles dans le budget
\`\`\`

**2. Pondération interactive**
\`\`\`
L'utilisateur ajuste les priorités
Le score global se recalcule en temps réel
\`\`\`

**3. Historique des générations**
\`\`\`
Comparer iPhone 15 vs iPhone 16
Visualiser les progrès annuels
\`\`\`

### 📱 Verdict de ce comparatif

| Profil utilisateur | Recommandation |
|--------------------|----------------|
| 📷 Photographe | Galaxy S24 Ultra |
| 🎮 Gamer mobile | iPhone 16 Pro Max |
| 💰 Budget optimisé | Pixel 9 Pro XL |
| 🍎 Écosystème Apple | iPhone 16 Pro Max |
| 🤖 Fan de Google/IA | Pixel 9 Pro XL |
`;

export default function ProportionOfBrowsers() {
  return (
    <ChartEditor
      title="Proportion of Browsers"
      section="Radar"
      option={option}
      notes={notes}
    />
  );
}
