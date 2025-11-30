import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Ethereum (ETH/USD) avec volumes - Octobre 2024
// Contexte : Analyse technique pour trader avec axisPointer synchronisé
// Format : Prix OHLC + Volumes

const ethereumData = {
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
  ohlc: [
    [2650, 2712, 2625, 2745],
    [2715, 2680, 2655, 2738],
    [2678, 2625, 2598, 2695],
    [2628, 2695, 2615, 2720],
    [2698, 2745, 2685, 2768],
    [2748, 2705, 2688, 2775],
    [2708, 2785, 2695, 2812],
    [2788, 2835, 2778, 2858],
    [2838, 2795, 2775, 2862],
    [2798, 2752, 2735, 2815],
    [2755, 2825, 2745, 2848],
    [2828, 2788, 2768, 2845],
    [2792, 2845, 2778, 2872],
    [2848, 2815, 2798, 2868],
    [2818, 2875, 2805, 2898],
    [2878, 2845, 2828, 2905],
    [2848, 2912, 2835, 2935],
    [2915, 2868, 2845, 2938],
    [2872, 2925, 2858, 2948],
    [2928, 2885, 2868, 2955],
    [2888, 2958, 2875, 2985],
    [2962, 2935, 2918, 2988],
    [2938, 2978, 2925, 3005],
  ],
  // Volumes en millions de dollars
  volumes: [
    12500, 15800, 18200, 14500, 16800, 19500, 22800, 28500, 24200, 17800, 21500,
    18900, 23500, 19200, 25800, 22100, 31200, 26800, 24500, 21800, 35600, 28900,
    32100,
  ],
};

// Calcul des moyennes et statistiques
const premiereValeur = ethereumData.ohlc[0][0];
const derniereValeur = ethereumData.ohlc[ethereumData.ohlc.length - 1][1];
const variationMois = (
  ((derniereValeur - premiereValeur) / premiereValeur) *
  100
).toFixed(1);
const volumeMoyen = Math.round(
  ethereumData.volumes.reduce((a, b) => a + b, 0) / ethereumData.volumes.length
);
const volumeMax = Math.max(...ethereumData.volumes);

// Déterminer la couleur des volumes (vert si hausse, rouge si baisse)
const volumeColors = ethereumData.ohlc.map((candle) =>
  candle[1] >= candle[0] ? "#22c55e" : "#dc2626"
);

const option: EChartsOption = {
  title: {
    text: "Ξ Ethereum (ETH/USD) - Octobre 2024",
    subtext: `Variation : +${variationMois}% · Volume moyen : ${volumeMoyen.toLocaleString("fr-FR")}M $ · Corrélation prix/volume active`,
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
      link: [{ xAxisIndex: "all" }],
      label: {
        backgroundColor: "#6b7280",
      },
    },
    formatter: (params: unknown) => {
      const p = params as {
        axisValue: string;
        seriesName: string;
        data: number | number[];
        color: string;
      }[];
      if (!p || p.length === 0) return "";

      const date = p[0].axisValue;
      const candleData = p.find((item) => item.seriesName === "ETH/USD");
      const volumeData = p.find((item) => item.seriesName === "Volume");

      if (!candleData || !Array.isArray(candleData.data)) return "";

      const [open, close, low, high] = candleData.data;
      const volume = volumeData ? (volumeData.data as number) : 0;
      const variation = close - open;
      const variationPct = ((variation / open) * 100).toFixed(2);
      const isUp = close >= open;

      return `
        <div style="min-width: 220px;">
          <b style="font-size: 14px;">${date} 2024</b><br/>
          <hr style="margin: 8px 0;"/>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Ouverture :</span>
            <b>${open.toLocaleString("fr-FR")} $</b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Clôture :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${close.toLocaleString("fr-FR")} $
            </b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus haut :</span>
            <span>${high.toLocaleString("fr-FR")} $</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus bas :</span>
            <span>${low.toLocaleString("fr-FR")} $</span>
          </div>
          
          <hr style="margin: 8px 0;"/>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Variation :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${isUp ? "+" : ""}${variation.toFixed(0)} $ (${isUp ? "+" : ""}${variationPct}%)
            </b>
          </div>
          
          <div style="display: flex; justify-content: space-between;">
            <span>📊 Volume :</span>
            <b>${volume.toLocaleString("fr-FR")} M$</b>
          </div>
        </div>
      `;
    },
  },
  legend: {
    data: ["ETH/USD", "MA5", "Volume"],
    top: 55,
  },
  axisPointer: {
    link: [{ xAxisIndex: "all" }],
    label: {
      backgroundColor: "#777",
    },
  },
  grid: [
    {
      left: 80,
      right: 60,
      top: 100,
      height: "50%",
    },
    {
      left: 80,
      right: 60,
      top: "72%",
      height: "18%",
    },
  ],
  xAxis: [
    {
      type: "category",
      data: ethereumData.dates,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: {
        show: false,
      },
      gridIndex: 0,
    },
    {
      type: "category",
      gridIndex: 1,
      data: ethereumData.dates,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: {
        rotate: 45,
        fontSize: 9,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Prix ($)",
      nameLocation: "middle",
      nameGap: 50,
      scale: true,
      splitArea: {
        show: true,
      },
      axisLabel: {
        formatter: (value: number) => `${value.toLocaleString("fr-FR")}`,
      },
      gridIndex: 0,
    },
    {
      type: "value",
      name: "Volume (M$)",
      nameLocation: "middle",
      nameGap: 50,
      gridIndex: 1,
      splitNumber: 3,
      axisLabel: {
        formatter: (value: number) =>
          `${(value / 1000).toLocaleString("fr-FR")}K`,
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: [0, 1],
      start: 0,
      end: 100,
    },
    {
      type: "slider",
      show: true,
      xAxisIndex: [0, 1],
      bottom: 10,
      start: 0,
      end: 100,
      height: 20,
    },
  ],
  series: [
    {
      name: "ETH/USD",
      type: "candlestick",
      data: ethereumData.ohlc,
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        color: "#22c55e",
        color0: "#dc2626",
        borderColor: "#16a34a",
        borderColor0: "#b91c1c",
      },
      emphasis: {
        itemStyle: {
          borderWidth: 2,
        },
      },
      markLine: {
        silent: true,
        data: [
          {
            yAxis: 2800,
            label: {
              formatter: "Support 2 800$",
              position: "end",
              fontSize: 9,
            },
            lineStyle: {
              type: "dashed",
              color: "#3b82f6",
            },
          },
          {
            yAxis: 3000,
            label: {
              formatter: "Résistance 3 000$",
              position: "end",
              fontSize: 9,
            },
            lineStyle: {
              type: "dashed",
              color: "#f59e0b",
            },
          },
        ],
      },
    },
    {
      name: "MA5",
      type: "line",
      data: calculerMA(ethereumData.ohlc, 5),
      xAxisIndex: 0,
      yAxisIndex: 0,
      smooth: true,
      lineStyle: {
        opacity: 0.7,
        width: 2,
        color: "#8b5cf6",
      },
      itemStyle: {
        color: "#8b5cf6",
      },
      symbol: "none",
    },
    {
      name: "Volume",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: ethereumData.volumes.map((vol, i) => ({
        value: vol,
        itemStyle: {
          color: volumeColors[i],
          opacity: 0.7,
        },
      })),
      markLine: {
        silent: true,
        data: [
          {
            type: "average",
            label: {
              formatter: "Moy.",
              position: "end",
              fontSize: 9,
            },
            lineStyle: {
              type: "dotted",
              color: "#6b7280",
            },
          },
        ],
      },
    },
  ],
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
        sum += data[i - j][1];
      }
      result.push(parseFloat((sum / periode).toFixed(2)));
    }
  }
  return result;
}

const notes = `
## 📚 Note pédagogique : Graphique avec liaison AxisPointer (Axis Pointer Link)

### ✅ Quand utiliser ce type de diagramme

L'**axisPointer link** est idéal pour :

- **Corrélation prix/volume** : voir les deux métriques alignées temporellement
- **Analyse multi-indicateurs** : RSI, MACD, Stochastique sous le prix
- **Comparaison de métriques** : prix et on-chain metrics
- **Exploration interactive** : hover synchronisé entre graphiques

**Principe clé :**
\`\`\`javascript
axisPointer: {
  link: [{ xAxisIndex: 'all' }] // Synchronise tous les axes X
}
\`\`\`

### ❌ Quand ne pas utiliser

- **Un seul graphique** : overhead inutile
- **Métriques non corrélées** : confusion pour l'utilisateur
- **Mobile** : interaction moins fluide
- **Données non temporelles** : le link n'a pas de sens

### 📊 Analyse de ce graphique

**Ethereum - Octobre 2024**

| Indicateur | Valeur |
|------------|--------|
| Ouverture mois | ${premiereValeur.toLocaleString("fr-FR")} $ |
| Clôture mois | ${derniereValeur.toLocaleString("fr-FR")} $ |
| Variation | **+${variationMois}%** |
| Volume moyen | ${volumeMoyen.toLocaleString("fr-FR")} M$ |
| Volume max | ${volumeMax.toLocaleString("fr-FR")} M$ |

**Corrélations observées :**
- 📈 **Fort volume + hausse** : confirmation du mouvement (29 Oct)
- 📉 **Fort volume + baisse** : capitulation possible (9 Oct)
- 🔄 **Faible volume** : consolidation, range trading

**Niveaux techniques :**
- **Support** : 2 800 $ (testé le 3 Oct)
- **Résistance** : 3 000 $ (approchée le 31 Oct)
- **MA5** : tendance court terme haussière

### 🔧 Configuration AxisPointer Link

**Structure multi-grilles :**
\`\`\`javascript
grid: [
  { top: 100, height: '50%' },  // Prix
  { top: '72%', height: '18%' } // Volume
],
xAxis: [
  { gridIndex: 0, data: dates },
  { gridIndex: 1, data: dates }
],
yAxis: [
  { gridIndex: 0, name: 'Prix' },
  { gridIndex: 1, name: 'Volume' }
]
\`\`\`

**Liaison des axes :**
\`\`\`javascript
axisPointer: {
  link: [{ xAxisIndex: 'all' }],
  label: { backgroundColor: '#777' }
},
tooltip: {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
    link: [{ xAxisIndex: 'all' }]
  }
}
\`\`\`

**DataZoom synchronisé :**
\`\`\`javascript
dataZoom: [{
  type: 'inside',
  xAxisIndex: [0, 1] // Appliqué aux deux axes X
}]
\`\`\`

### 📈 Lecture du graphique prix + volume

**Le volume confirme le prix :**

| Situation | Signal |
|-----------|--------|
| Prix ↗ + Volume ↗ | ✅ Tendance forte |
| Prix ↗ + Volume ↘ | ⚠️ Tendance faible |
| Prix ↘ + Volume ↗ | ⚠️ Capitulation |
| Prix ↘ + Volume ↘ | 🔄 Consolidation |

**Anomalies de volume :**
- Volume > 2x moyenne → événement significatif
- Volume très faible → désintérêt, attente

### 🎨 Bonnes pratiques de design

**1. Proportions des grilles**
\`\`\`
Prix   : 50-60% de la hauteur
Volume : 15-25% de la hauteur
DataZoom : 5-10%
\`\`\`

**2. Couleurs cohérentes**
\`\`\`javascript
// Volume vert si chandelle verte, rouge sinon
volumeColors = ohlc.map(candle => 
  candle[1] >= candle[0] ? '#22c55e' : '#dc2626'
)
\`\`\`

**3. Séparation visuelle**
- Espace entre les grilles
- Axes Y distincts avec noms
- Labels masqués sur le graphique du haut

### 📱 Interactions tactiles

**Touch support :**
\`\`\`javascript
tooltip: {
  triggerOn: 'mousemove|click', // Desktop + mobile
  confine: true, // Reste dans le conteneur
},
dataZoom: [
  { type: 'inside', zoomOnMouseWheel: true },
  { type: 'slider' } // Alternative tactile
]
\`\`\`

**Gestes supportés :**
- **Pinch** : zoom
- **Pan** : défilement horizontal
- **Tap** : sélection d'un point
- **Long press** : tooltip persistant

### 🚀 Extensions possibles

**1. Ajouter un indicateur RSI :**
\`\`\`javascript
grid: [
  { height: '45%' },  // Prix
  { height: '15%' },  // RSI
  { height: '15%' }   // Volume
]
\`\`\`

**2. Bandes de Bollinger :**
\`\`\`javascript
series: [
  { type: 'candlestick', ... },
  { type: 'line', name: 'BB Upper' },
  { type: 'line', name: 'BB Middle' },
  { type: 'line', name: 'BB Lower' },
]
\`\`\`

**3. MACD :**
\`\`\`javascript
series: [
  { type: 'bar', name: 'MACD Histogram' },
  { type: 'line', name: 'MACD Line' },
  { type: 'line', name: 'Signal Line' },
]
\`\`\`

### 💡 Cas d'usage professionnels

**1. Trading Crypto**
- Analyse technique complète
- Détection de divergences prix/volume
- Entry/exit timing

**2. Gestion de portefeuille**
- Suivi de position
- Alertes de volume anormal
- Performance tracking

**3. Analyse on-chain**
- Volume + métriques blockchain
- Flux exchange
- Whale watching

**4. Research**
- Corrélation multi-assets
- Études de volatilité
- Backtesting visuel
`;

export default function AxisPointerLinkAndTouch() {
  return (
    <ChartEditor
      title="Axis Pointer Link and Touch"
      section="Candlestick"
      option={option}
      notes={notes}
    />
  );
}
