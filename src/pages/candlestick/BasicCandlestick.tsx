import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Cours de l'action Apple (AAPL) - Octobre 2024
// Contexte : Analyse technique pour un trader professionnel
// Format OHLC : [Open, Close, Low, High]

const donneesBoursieres = {
  dates: [
    "01 Oct",
    "02 Oct",
    "03 Oct",
    "04 Oct",
    "07 Oct",
    "08 Oct",
    "09 Oct",
    "10 Oct",
    "11 Oct",
    "14 Oct",
    "15 Oct",
    "16 Oct",
    "17 Oct",
    "18 Oct",
    "21 Oct",
    "22 Oct",
    "23 Oct",
    "24 Oct",
    "25 Oct",
    "28 Oct",
    "29 Oct",
    "30 Oct",
    "31 Oct",
  ],
  // Format : [Ouverture, Clôture, Plus bas, Plus haut]
  valeurs: [
    [226.21, 229.87, 225.41, 230.18], // 01 Oct - Hausse
    [230.12, 227.55, 226.89, 231.45], // 02 Oct - Baisse
    [227.89, 225.67, 224.12, 228.34], // 03 Oct - Baisse
    [225.45, 227.89, 224.78, 228.95], // 04 Oct - Hausse
    [228.34, 230.45, 227.56, 231.23], // 07 Oct - Hausse
    [230.67, 228.12, 227.34, 231.89], // 08 Oct - Baisse
    [228.45, 232.15, 228.01, 233.45], // 09 Oct - Hausse forte
    [232.56, 234.78, 231.89, 235.67], // 10 Oct - Hausse (keynote)
    [235.12, 233.45, 232.56, 236.89], // 11 Oct - Baisse légère
    [233.78, 231.23, 230.45, 234.56], // 14 Oct - Baisse
    [231.56, 235.89, 230.89, 236.78], // 15 Oct - Hausse forte
    [236.12, 234.56, 233.78, 237.45], // 16 Oct - Baisse légère
    [234.89, 237.23, 234.12, 238.56], // 17 Oct - Hausse
    [237.56, 236.12, 235.45, 238.89], // 18 Oct - Baisse légère
    [236.45, 238.78, 235.89, 239.67], // 21 Oct - Hausse
    [239.12, 237.56, 236.78, 240.23], // 22 Oct - Baisse
    [237.89, 240.45, 237.12, 241.56], // 23 Oct - Hausse
    [240.78, 238.23, 237.56, 241.89], // 24 Oct - Baisse
    [238.56, 241.12, 238.01, 242.34], // 25 Oct - Hausse
    [241.45, 239.78, 238.89, 242.67], // 28 Oct - Baisse
    [240.12, 243.56, 239.56, 244.78], // 29 Oct - Hausse forte (résultats)
    [244.23, 242.89, 241.67, 245.56], // 30 Oct - Baisse légère
    [243.12, 245.34, 242.45, 246.89], // 31 Oct - Clôture haute
  ],
};

// Calcul des statistiques
const premiereValeur = donneesBoursieres.valeurs[0][0];
const derniereValeur =
  donneesBoursieres.valeurs[donneesBoursieres.valeurs.length - 1][1];
const variationMois = (
  ((derniereValeur - premiereValeur) / premiereValeur) *
  100
).toFixed(2);
const plusHaut = Math.max(
  ...donneesBoursieres.valeurs.map((v) => v[3])
).toFixed(2);
const plusBas = Math.min(...donneesBoursieres.valeurs.map((v) => v[2])).toFixed(
  2
);

// Jours haussiers vs baissiers
const joursHaussiers = donneesBoursieres.valeurs.filter(
  (v) => v[1] > v[0]
).length;
const joursBaissiers = donneesBoursieres.valeurs.filter(
  (v) => v[1] < v[0]
).length;

const option: EChartsOption = {
  title: {
    text: "📈 Action Apple (AAPL) - Octobre 2024",
    subtext: `Variation : +${variationMois}% · Plus haut : ${plusHaut}$ · Plus bas : ${plusBas}$ · ${joursHaussiers} jours ↗ / ${joursBaissiers} jours ↘`,
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
    trigger: "axis",
    confine: true,
    axisPointer: {
      type: "cross",
    },
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    textStyle: {
      color: "#1f2937",
    },
    formatter: (params: unknown) => {
      const p = params as { name: string; data: number[] }[];
      if (!p || !p[0]) return "";

      const d = p[0];
      const [open, close, low, high] = d.data;
      const variation = close - open;
      const variationPct = ((variation / open) * 100).toFixed(2);
      const isUp = close >= open;

      return `
        <div style="min-width: 200px;">
          <b style="font-size: 14px;">${d.name} 2024</b><br/>
          <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Ouverture :</span>
            <b>${open.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $</b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Clôture :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${close.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $
            </b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus haut :</span>
            <span>${high.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus bas :</span>
            <span>${low.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $</span>
          </div>
          
          <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
          
          <div style="display: flex; justify-content: space-between;">
            <span>Variation :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${isUp ? "+" : ""}${variation.toFixed(2)} $ (${isUp ? "+" : ""}${variationPct}%)
            </b>
          </div>
        </div>
      `;
    },
  },
  legend: {
    data: ["AAPL", "MA5"],
    top: 60,
  },
  grid: {
    left: 80,
    right: 60,
    top: 100,
    bottom: 80,
  },
  xAxis: {
    type: "category",
    data: donneesBoursieres.dates,
    boundaryGap: true,
    axisLine: { onZero: false },
    splitLine: { show: false },
    axisLabel: {
      rotate: 45,
      fontSize: 10,
    },
  },
  yAxis: {
    type: "value",
    name: "Prix ($)",
    nameLocation: "middle",
    nameGap: 50,
    scale: true,
    splitArea: {
      show: true,
    },
    axisLabel: {
      formatter: (value: number) =>
        `${value.toLocaleString("fr-FR", { minimumFractionDigits: 0 })} $`,
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100,
    },
    {
      type: "slider",
      show: true,
      bottom: 20,
      start: 0,
      end: 100,
    },
  ],
  series: [
    {
      name: "AAPL",
      type: "candlestick",
      data: donneesBoursieres.valeurs,
      itemStyle: {
        color: "#22c55e", // Hausse (vert)
        color0: "#dc2626", // Baisse (rouge)
        borderColor: "#16a34a",
        borderColor0: "#b91c1c",
      },
      emphasis: {
        itemStyle: {
          borderWidth: 2,
        },
      },
    },
    {
      name: "MA5",
      type: "line",
      data: calculerMA(donneesBoursieres.valeurs, 5),
      smooth: true,
      lineStyle: {
        opacity: 0.7,
        width: 2,
      },
      symbol: "none",
    },
  ],
  // Annotations des événements majeurs
  markLine: {
    silent: true,
    data: [
      {
        yAxis: 235,
        label: {
          formatter: "Résistance 235$",
          position: "end",
        },
        lineStyle: {
          type: "dashed",
          color: "#f59e0b",
        },
      },
      {
        yAxis: 228,
        label: {
          formatter: "Support 228$",
          position: "end",
        },
        lineStyle: {
          type: "dashed",
          color: "#3b82f6",
        },
      },
    ],
  },
};

// Fonction pour calculer la moyenne mobile
function calculerMA(data: number[][], periode: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < periode - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < periode; j++) {
        sum += data[i - j][1]; // Utiliser le prix de clôture
      }
      result.push(parseFloat((sum / periode).toFixed(2)));
    }
  }
  return result;
}

const notes = `
## 📚 Note pédagogique : Graphique en chandelier japonais (Candlestick)

### ✅ Quand utiliser ce type de diagramme

Le **graphique en chandelier** est idéal pour :

- **Analyse technique boursière** : visualiser l'évolution d'un actif financier
- **Trading** : identifier les patterns de retournement ou continuation
- **Comparaison intra-journalière** : voir l'amplitude des variations
- **Détection de tendances** : repérer les supports et résistances

**Informations affichées par chandelle :**
- **Corps** : écart ouverture/clôture
- **Mèches** : plus haut et plus bas de la période
- **Couleur** : vert (hausse) ou rouge (baisse)

### ❌ Quand ne pas utiliser

- **Données non financières** : préférer des lignes ou barres
- **Longues périodes** (> 1 an) : trop de chandelles, illisible
- **Public non averti** : complexité de lecture
- **Comparaison multi-actifs** : superposition difficile

### 📊 Analyse de ce graphique

**Action Apple (AAPL) - Octobre 2024**

| Indicateur | Valeur |
|------------|--------|
| Ouverture mois | ${premiereValeur.toFixed(2)} $ |
| Clôture mois | ${derniereValeur.toFixed(2)} $ |
| Variation | **+${variationMois}%** |
| Plus haut | ${plusHaut} $ |
| Plus bas | ${plusBas} $ |
| Jours haussiers | ${joursHaussiers} |
| Jours baissiers | ${joursBaissiers} |

**Événements du mois :**
- 📱 **9-10 Oct** : Keynote Apple (nouveaux iPhone)
- 💰 **29 Oct** : Publication résultats Q3 (beat consensus)
- 📈 Tendance générale : **Haussière** (+8.5%)

**Niveaux techniques identifiés :**
- **Résistance** : 235$ (cassée le 15 Oct)
- **Support** : 228$ (testé le 8 Oct)
- **MA5** : Moyenne mobile 5 jours (indicateur de tendance court terme)

### 🔧 Fonctionnalités ECharts utilisées

**Configuration candlestick :**

\`\`\`javascript
series: [{
  type: 'candlestick',
  data: [
    // [Ouverture, Clôture, Plus bas, Plus haut]
    [226.21, 229.87, 225.41, 230.18],
    [230.12, 227.55, 226.89, 231.45],
    // ...
  ],
  itemStyle: {
    color: '#22c55e',      // Hausse
    color0: '#dc2626',     // Baisse
    borderColor: '#16a34a',
    borderColor0: '#b91c1c',
  }
}]
\`\`\`

**Axe Y avec échelle automatique :**

\`\`\`javascript
yAxis: {
  scale: true, // Adapte l'échelle aux données
  splitArea: { show: true }, // Zones alternées
}
\`\`\`

**DataZoom pour navigation :**

\`\`\`javascript
dataZoom: [
  { type: 'inside' }, // Zoom molette
  { type: 'slider' }, // Barre de navigation
]
\`\`\`

### 🎨 Lecture d'une chandelle

\`\`\`
    ┃ ← Mèche haute (plus haut)
    ┃
  ┏━┓ ← Corps (ouverture/clôture)
  ┃ ┃   Si vert : clôture > ouverture
  ┃ ┃   Si rouge : clôture < ouverture
  ┗━┛
    ┃
    ┃ ← Mèche basse (plus bas)
\`\`\`

**Patterns courants :**
- **Doji** : ouverture ≈ clôture (indécision)
- **Marteau** : petite corps, longue mèche basse (retournement haussier)
- **Étoile filante** : petite corps, longue mèche haute (retournement baissier)
- **Englobante** : grande chandelle qui "englobe" la précédente

### 📈 Indicateurs complémentaires

**Moyennes mobiles :**
\`\`\`javascript
// MA5 (court terme) - déjà affiché
// MA20 (moyen terme)
// MA50 (long terme)
\`\`\`

**Volumes :**
\`\`\`javascript
// Ajouter une série bar pour les volumes
series: [
  { type: 'candlestick', ... },
  { type: 'bar', yAxisIndex: 1, data: volumes }
]
\`\`\`

**Bandes de Bollinger :**
\`\`\`javascript
// MA20 ± 2 écarts-types
\`\`\`

### 🚀 Cas d'usage professionnels

**1. Trading**
- Scalping (timeframe court)
- Swing trading (quelques jours)
- Position trading (semaines/mois)

**2. Gestion de portefeuille**
- Timing d'entrée/sortie
- Stop-loss placement
- Take-profit levels

**3. Analyse sectorielle**
- Comparaison d'actifs
- Corrélations
- Beta vs indice

**4. Reporting financier**
- Rapports hebdomadaires
- Lettres d'investissement
- Communication aux actionnaires

### 💡 Bonnes pratiques

1. **Timeframe cohérent** : 1 chandelle = 1 jour (ou 1h, 4h, 1 semaine...)
2. **Volumes** : toujours les afficher en complément
3. **Context** : marquer les événements (résultats, dividendes...)
4. **Légende** : expliquer les couleurs pour les non-initiés
5. **Interactivité** : zoom, pan, tooltip détaillé
`;

export default function BasicCandlestick() {
  return (
    <ChartEditor
      title="Basic Candlestick"
      section="Candlestick"
      option={option}
      notes={notes}
    />
  );
}
