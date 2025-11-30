import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type {
  EChartsOption,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemAPI,
} from "echarts";

// Données réalistes : Prix du pétrole Brent - Septembre 2024
// Contexte : Dashboard trading commodities pour une salle de marché
// Format OHLC avec séries custom pour le rendu "bâtons"

const donneesBrent = {
  dates: [
    "02 Sep",
    "03 Sep",
    "04 Sep",
    "05 Sep",
    "06 Sep",
    "09 Sep",
    "10 Sep",
    "11 Sep",
    "12 Sep",
    "13 Sep",
    "16 Sep",
    "17 Sep",
    "18 Sep",
    "19 Sep",
    "20 Sep",
    "23 Sep",
    "24 Sep",
    "25 Sep",
    "26 Sep",
    "27 Sep",
    "30 Sep",
  ],
  // Format : [index, Ouverture, Clôture, Plus bas, Plus haut]
  valeurs: [
    [0, 78.45, 77.12, 76.89, 79.23], // 02 Sep - Baisse (Labour Day effect)
    [1, 77.34, 76.56, 75.89, 78.12], // 03 Sep - Baisse
    [2, 76.78, 75.23, 74.67, 77.45], // 04 Sep - Baisse (demande faible)
    [3, 75.45, 76.89, 74.89, 77.56], // 05 Sep - Rebond
    [4, 77.12, 75.34, 74.56, 77.89], // 06 Sep - Baisse
    [5, 75.56, 73.89, 73.12, 76.23], // 09 Sep - Baisse forte (OPEC+ reports)
    [6, 74.12, 72.45, 71.89, 74.78], // 10 Sep - Baisse continue
    [7, 72.67, 71.23, 70.56, 73.45], // 11 Sep - Plus bas mensuel
    [8, 71.45, 73.56, 71.12, 74.23], // 12 Sep - Rebond technique
    [9, 73.78, 74.89, 73.23, 75.67], // 13 Sep - Hausse (tensions Moyen-Orient)
    [10, 75.12, 76.45, 74.78, 77.23], // 16 Sep - Hausse
    [11, 76.67, 75.23, 74.89, 77.56], // 17 Sep - Consolidation
    [12, 75.45, 76.78, 75.12, 77.89], // 18 Sep - Fed meeting
    [13, 77.12, 78.45, 76.78, 79.23], // 19 Sep - Hausse (cut rates)
    [14, 78.67, 77.89, 77.23, 79.56], // 20 Sep - Légère baisse
    [15, 78.12, 79.34, 77.89, 80.12], // 23 Sep - Hausse
    [16, 79.56, 78.23, 77.67, 80.45], // 24 Sep - Prise de bénéfices
    [17, 78.45, 77.12, 76.56, 79.23], // 25 Sep - Baisse
    [18, 77.34, 78.67, 76.89, 79.45], // 26 Sep - Rebond
    [19, 78.89, 77.45, 76.78, 79.67], // 27 Sep - Baisse fin de semaine
    [20, 77.67, 78.89, 77.12, 79.56], // 30 Sep - Clôture mensuelle
  ],
};

// Calcul des statistiques
const ouvertureMois = donneesBrent.valeurs[0][1];
const clotureMois = donneesBrent.valeurs[donneesBrent.valeurs.length - 1][2];
const variationMois = (
  ((clotureMois - ouvertureMois) / ouvertureMois) *
  100
).toFixed(2);
const plusHaut = Math.max(...donneesBrent.valeurs.map((v) => v[4])).toFixed(2);
const plusBas = Math.min(...donneesBrent.valeurs.map((v) => v[3])).toFixed(2);
const amplitude = (parseFloat(plusHaut) - parseFloat(plusBas)).toFixed(2);

// Fonction de rendu OHLC (bâtons au lieu de bougies)
function renderOHLC(
  _params: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
) {
  const xValue = api.value(0) as number;
  const openVal = api.value(1) as number;
  const closeVal = api.value(2) as number;
  const lowVal = api.value(3) as number;
  const highVal = api.value(4) as number;

  const openPoint = api.coord([xValue, openVal]);
  const closePoint = api.coord([xValue, closeVal]);
  const lowPoint = api.coord([xValue, lowVal]);
  const highPoint = api.coord([xValue, highVal]);

  const halfWidth = (api.size?.([1, 0]) as number[])?.[0] * 0.3 || 8;

  const isUp = closeVal >= openVal;
  const color = isUp ? "#22c55e" : "#dc2626";

  return {
    type: "group" as const,
    children: [
      // Ligne verticale (high-low)
      {
        type: "line" as const,
        shape: {
          x1: highPoint[0],
          y1: highPoint[1],
          x2: lowPoint[0],
          y2: lowPoint[1],
        },
        style: {
          stroke: color,
          lineWidth: 2,
        },
      },
      // Tick gauche (open)
      {
        type: "line" as const,
        shape: {
          x1: openPoint[0] - halfWidth,
          y1: openPoint[1],
          x2: openPoint[0],
          y2: openPoint[1],
        },
        style: {
          stroke: color,
          lineWidth: 2,
        },
      },
      // Tick droit (close)
      {
        type: "line" as const,
        shape: {
          x1: closePoint[0],
          y1: closePoint[1],
          x2: closePoint[0] + halfWidth,
          y2: closePoint[1],
        },
        style: {
          stroke: color,
          lineWidth: 2,
        },
      },
    ],
  };
}

const option: EChartsOption = {
  title: {
    text: "🛢️ Pétrole Brent - Septembre 2024 (OHLC)",
    subtext: `Variation : ${parseFloat(variationMois) >= 0 ? "+" : ""}${variationMois}% · Amplitude : ${amplitude} $ · Plus haut : ${plusHaut} $ · Plus bas : ${plusBas} $`,
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
      const p = params as { data: number[] }[];
      if (!p || !p[0]) return "";

      const d = p[0].data;
      const [, open, close, low, high] = d;
      const variation = close - open;
      const variationPct = ((variation / open) * 100).toFixed(2);
      const isUp = close >= open;
      const dateIndex = d[0];
      const dateLabel = donneesBrent.dates[dateIndex];

      return `
        <div style="min-width: 220px;">
          <b style="font-size: 14px;">🛢️ Brent - ${dateLabel} 2024</b><br/>
          <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Ouverture (O) :</span>
            <b>${open.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $</b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus haut (H) :</span>
            <span style="color: #22c55e;">${high.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus bas (L) :</span>
            <span style="color: #dc2626;">${low.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Clôture (C) :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${close.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} $
            </b>
          </div>
          
          <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
          
          <div style="display: flex; justify-content: space-between;">
            <span>Variation :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${isUp ? "+" : ""}${variation.toFixed(2)} $ (${isUp ? "+" : ""}${variationPct}%)
            </b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 4px;">
            <span>Amplitude :</span>
            <span>${(high - low).toFixed(2)} $</span>
          </div>
        </div>
      `;
    },
  },
  legend: {
    data: ["Brent OHLC", "SMA 5"],
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
    data: donneesBrent.dates,
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
    name: "Prix ($/baril)",
    nameLocation: "middle",
    nameGap: 50,
    scale: true,
    splitArea: {
      show: true,
    },
    min: 70,
    max: 82,
    axisLabel: {
      formatter: (value: number) => `${value} $`,
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
      name: "Brent OHLC",
      type: "custom",
      renderItem: renderOHLC,
      dimensions: ["index", "open", "close", "low", "high"],
      encode: {
        x: 0,
        y: [1, 2, 3, 4],
        tooltip: [1, 2, 3, 4],
      },
      data: donneesBrent.valeurs,
    },
    {
      name: "SMA 5",
      type: "line",
      data: calculerSMA(donneesBrent.valeurs, 5),
      smooth: true,
      lineStyle: {
        opacity: 0.7,
        width: 2,
        color: "#8b5cf6",
      },
      symbol: "none",
    },
  ],
  // Annotations événements marché
  markLine: {
    silent: true,
    symbol: "none",
    data: [
      {
        yAxis: 75,
        label: {
          formatter: "Support 75$",
          position: "end",
        },
        lineStyle: {
          type: "dashed",
          color: "#3b82f6",
        },
      },
      {
        yAxis: 79,
        label: {
          formatter: "Résistance 79$",
          position: "end",
        },
        lineStyle: {
          type: "dashed",
          color: "#f59e0b",
        },
      },
    ],
  },
};

// Fonction pour calculer la moyenne mobile simple
function calculerSMA(data: number[][], periode: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < periode - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < periode; j++) {
        sum += data[i - j][2]; // Prix de clôture
      }
      result.push(parseFloat((sum / periode).toFixed(2)));
    }
  }
  return result;
}

const notes = `
## 📚 Note pédagogique : Graphique OHLC (Open-High-Low-Close)

### ✅ Quand utiliser ce type de diagramme

Le **graphique OHLC** est une alternative aux chandeliers japonais :

- **Trading institutionnel** : standard américain pour les commodities
- **Marchés à terme** : pétrole, gaz, métaux, céréales
- **Forex** : paires de devises
- **Préférence stylistique** : certains traders préfèrent la clarté des bâtons

**Avantages vs Candlestick :**
- **Plus sobre** : moins d'encre, vue plus "propre"
- **Meilleure densité** : plus de données visibles sur un même écran
- **Précision** : les ticks marquent exactement O et C

### ❌ Quand ne pas utiliser

- **Public débutant** : les chandeliers sont plus intuitifs
- **Patterns visuels** : le corps plein facilite la reconnaissance des patterns
- **Mobile** : les bâtons fins sont moins visibles sur petit écran

### 📊 Analyse de ce graphique

**Pétrole Brent - Septembre 2024**

| Indicateur | Valeur |
|------------|--------|
| Ouverture mois | ${ouvertureMois.toFixed(2)} $/baril |
| Clôture mois | ${clotureMois.toFixed(2)} $/baril |
| Variation | **${parseFloat(variationMois) >= 0 ? "+" : ""}${variationMois}%** |
| Plus haut | ${plusHaut} $/baril |
| Plus bas | ${plusBas} $/baril |
| Amplitude | ${amplitude} $ |

**Événements clés du mois :**
- 📉 **9-11 Sep** : Chute à 71$ (craintes demande chinoise + OPEC+ reports)
- 🌍 **13 Sep** : Rebond (tensions géopolitiques Moyen-Orient)
- 🏦 **18-19 Sep** : Hausse post-Fed (baisse des taux)
- 📊 **Tendance** : Range-bound entre 71$ et 80$

**Niveaux techniques :**
- **Résistance** : 79$ (testée le 19 Sep)
- **Support** : 75$ (cassé le 11 Sep, puis repris)
- **SMA 5** : indicateur de tendance court terme

### 🔧 Fonctionnalités ECharts utilisées

**Série Custom pour OHLC :**

\`\`\`javascript
series: [{
  type: 'custom',
  renderItem: (params, api) => {
    const open = api.coord([x, api.value(1)]);
    const close = api.coord([x, api.value(2)]);
    const low = api.coord([x, api.value(3)]);
    const high = api.coord([x, api.value(4)]);
    
    return {
      type: 'group',
      children: [
        // Ligne verticale high-low
        { type: 'line', shape: { x1, y1: high, x2, y2: low } },
        // Tick gauche (open)
        { type: 'line', shape: { x1: x-w, y1: open, x2: x, y2: open } },
        // Tick droit (close)
        { type: 'line', shape: { x1: x, y1: close, x2: x+w, y2: close } },
      ]
    };
  },
  data: ohlcData,
}]
\`\`\`

**Format des données :**

\`\`\`javascript
// [index, Open, Close, Low, High]
[0, 78.45, 77.12, 76.89, 79.23],
[1, 77.34, 76.56, 75.89, 78.12],
// ...
\`\`\`

### 🎨 Anatomie d'une barre OHLC

\`\`\`
    │ ← Plus haut (H)
    │
─   │   ← Ouverture (O) - tick gauche
    │
    │   ← Clôture (C) - tick droit   ─
    │
    │ ← Plus bas (L)
\`\`\`

**Code couleur :**
- 🟢 **Vert** : Close > Open (hausse)
- 🔴 **Rouge** : Close < Open (baisse)

### 📈 Indicateurs pour le pétrole

**Facteurs fondamentaux :**
- Production OPEC+ (quotas)
- Demande mondiale (Chine, USA, Europe)
- Stocks stratégiques (SPR, IEA)
- Dollar index (corrélation inverse)
- Géopolitique (Moyen-Orient, Russie)

**Corrélations à surveiller :**
- EUR/USD (inversement corrélé)
- Actions énergétiques (corrélé)
- Inflation (indicateur avancé)

### 🚀 Cas d'usage professionnels

**1. Trading commodities**
- Pétrole (WTI, Brent)
- Gaz naturel
- Métaux précieux (or, argent)
- Matières agricoles

**2. Couverture (hedging)**
- Airlines (carburant)
- Transporteurs (gazole)
- Industriels (énergie)

**3. Analyse macro**
- Inflation énergétique
- Balance commerciale
- PIB pays producteurs

**4. Risk management**
- VaR sur positions commodities
- Stress tests scénarios
- Limites de position

### 💡 Bonnes pratiques

1. **Timeframe adapté** : Daily pour swing, 4H pour intraday
2. **Volumes** : essentiels pour valider les mouvements
3. **Corrélations** : toujours contextualiser vs USD et actions
4. **Événements** : marquer releases (stocks, OPEC, EIA)
5. **Niveaux psychologiques** : 70$, 75$, 80$, 85$...
`;

export default function OhlcChart() {
  return (
    <ChartEditor
      title="OHLC Chart"
      section="Candlestick"
      option={option}
      notes={notes}
    />
  );
}
