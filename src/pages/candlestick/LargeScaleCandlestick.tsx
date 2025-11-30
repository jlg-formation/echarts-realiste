import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Historique Bitcoin (BTC/USD) - 2020 à 2024
// Contexte : Analyse long terme pour investisseur institutionnel
// Format OHLC mensuel : [Open, Close, Low, High]

// Génération de données mensuelles sur 5 ans (60 mois)
const generateBitcoinData = () => {
  const dates: string[] = [];
  const values: number[][] = [];

  // Données basées sur l'historique réel du Bitcoin (simplifiées)
  const monthlyData = [
    // 2020
    { date: "Jan 2020", o: 7200, h: 9600, l: 6850, c: 9350 },
    { date: "Fév 2020", o: 9350, h: 10500, l: 8450, c: 8580 },
    { date: "Mar 2020", o: 8580, h: 9200, l: 4100, c: 6420 }, // COVID crash
    { date: "Avr 2020", o: 6420, h: 9500, l: 6400, c: 8650 },
    { date: "Mai 2020", o: 8650, h: 10100, l: 8100, c: 9450 },
    { date: "Juin 2020", o: 9450, h: 10400, l: 8800, c: 9150 },
    { date: "Juil 2020", o: 9150, h: 11800, l: 9000, c: 11350 },
    { date: "Août 2020", o: 11350, h: 12500, l: 10500, c: 11650 },
    { date: "Sep 2020", o: 11650, h: 12100, l: 9800, c: 10800 },
    { date: "Oct 2020", o: 10800, h: 14100, l: 10200, c: 13800 },
    { date: "Nov 2020", o: 13800, h: 19900, l: 13200, c: 19700 },
    { date: "Déc 2020", o: 19700, h: 29300, l: 17500, c: 28950 },
    // 2021
    { date: "Jan 2021", o: 28950, h: 42000, l: 27700, c: 33100 },
    { date: "Fév 2021", o: 33100, h: 58300, l: 32300, c: 45200 },
    { date: "Mar 2021", o: 45200, h: 61800, l: 44900, c: 58800 },
    { date: "Avr 2021", o: 58800, h: 64800, l: 47000, c: 57700 }, // ATH 1
    { date: "Mai 2021", o: 57700, h: 59600, l: 30000, c: 37300 }, // Crash Chine
    { date: "Juin 2021", o: 37300, h: 41300, l: 28800, c: 35050 },
    { date: "Juil 2021", o: 35050, h: 42500, l: 29300, c: 41500 },
    { date: "Août 2021", o: 41500, h: 50500, l: 37300, c: 47150 },
    { date: "Sep 2021", o: 47150, h: 52900, l: 39500, c: 43800 },
    { date: "Oct 2021", o: 43800, h: 67000, l: 43200, c: 61350 },
    { date: "Nov 2021", o: 61350, h: 69000, l: 53500, c: 57000 }, // ATH 2
    { date: "Déc 2021", o: 57000, h: 59100, l: 42000, c: 46200 },
    // 2022 - Bear market
    { date: "Jan 2022", o: 46200, h: 47900, l: 33000, c: 38500 },
    { date: "Fév 2022", o: 38500, h: 45800, l: 34300, c: 43200 },
    { date: "Mar 2022", o: 43200, h: 48200, l: 37100, c: 45500 },
    { date: "Avr 2022", o: 45500, h: 47500, l: 37600, c: 38000 },
    { date: "Mai 2022", o: 38000, h: 40000, l: 26700, c: 31800 }, // Terra crash
    { date: "Juin 2022", o: 31800, h: 31800, l: 17600, c: 19950 },
    { date: "Juil 2022", o: 19950, h: 24700, l: 18800, c: 23300 },
    { date: "Août 2022", o: 23300, h: 25200, l: 19500, c: 20050 },
    { date: "Sep 2022", o: 20050, h: 22800, l: 18100, c: 19400 },
    { date: "Oct 2022", o: 19400, h: 21100, l: 18200, c: 20500 },
    { date: "Nov 2022", o: 20500, h: 21500, l: 15500, c: 17150 }, // FTX crash
    { date: "Déc 2022", o: 17150, h: 18400, l: 16200, c: 16550 },
    // 2023 - Recovery
    { date: "Jan 2023", o: 16550, h: 23950, l: 16500, c: 23150 },
    { date: "Fév 2023", o: 23150, h: 25300, l: 21400, c: 23500 },
    { date: "Mar 2023", o: 23500, h: 29200, l: 19500, c: 28450 },
    { date: "Avr 2023", o: 28450, h: 31000, l: 27200, c: 29250 },
    { date: "Mai 2023", o: 29250, h: 29800, l: 25800, c: 27200 },
    { date: "Juin 2023", o: 27200, h: 31500, l: 24800, c: 30500 },
    { date: "Juil 2023", o: 30500, h: 31800, l: 28800, c: 29200 },
    { date: "Août 2023", o: 29200, h: 30200, l: 25500, c: 26100 },
    { date: "Sep 2023", o: 26100, h: 28600, l: 25000, c: 26950 },
    { date: "Oct 2023", o: 26950, h: 35200, l: 26500, c: 34500 },
    { date: "Nov 2023", o: 34500, h: 38500, l: 34200, c: 37700 },
    { date: "Déc 2023", o: 37700, h: 45000, l: 37500, c: 42250 },
    // 2024
    { date: "Jan 2024", o: 42250, h: 49100, l: 38500, c: 42600 },
    { date: "Fév 2024", o: 42600, h: 64000, l: 42000, c: 62500 },
    { date: "Mar 2024", o: 62500, h: 73800, l: 60800, c: 71300 }, // ETF + halving
    { date: "Avr 2024", o: 71300, h: 72800, l: 56500, c: 60200 },
    { date: "Mai 2024", o: 60200, h: 72000, l: 56500, c: 67500 },
    { date: "Juin 2024", o: 67500, h: 72000, l: 58500, c: 62700 },
    { date: "Juil 2024", o: 62700, h: 70000, l: 53500, c: 64600 },
    { date: "Août 2024", o: 64600, h: 65200, l: 49000, c: 58900 },
    { date: "Sep 2024", o: 58900, h: 66500, l: 52500, c: 63800 },
    { date: "Oct 2024", o: 63800, h: 73600, l: 58900, c: 70100 },
    { date: "Nov 2024", o: 70100, h: 99800, l: 66800, c: 96500 }, // Trump + ATH
  ];

  monthlyData.forEach((m) => {
    dates.push(m.date);
    values.push([m.o, m.c, m.l, m.h]);
  });

  return { dates, values };
};

const bitcoinData = generateBitcoinData();

// Statistiques
const premiereValeur = bitcoinData.values[0][0];
const derniereValeur = bitcoinData.values[bitcoinData.values.length - 1][1];
const variationTotale = (
  ((derniereValeur - premiereValeur) / premiereValeur) *
  100
).toFixed(0);
const plusHaut = Math.max(...bitcoinData.values.map((v) => v[3]));
const plusBas = Math.min(...bitcoinData.values.map((v) => v[2]));

// Événements majeurs à annoter
const evenements = [
  { x: "Mar 2020", y: 4100, text: "COVID-19", color: "#dc2626" },
  { x: "Nov 2021", y: 69000, text: "ATH 69K$", color: "#22c55e" },
  { x: "Nov 2022", y: 15500, text: "FTX", color: "#dc2626" },
  { x: "Mar 2024", y: 73800, text: "ETF", color: "#3b82f6" },
  { x: "Nov 2024", y: 99800, text: "ATH 100K$", color: "#22c55e" },
];

const option: EChartsOption = {
  title: {
    text: "₿ Bitcoin (BTC/USD) - Historique 5 ans",
    subtext: `De ${premiereValeur.toLocaleString("fr-FR")} $ à ${derniereValeur.toLocaleString("fr-FR")} $ · Variation : +${variationTotale}% · ATH : ${plusHaut.toLocaleString("fr-FR")} $ · Creux : ${plusBas.toLocaleString("fr-FR")} $`,
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
    formatter: (params: unknown) => {
      const p = params as { name: string; data: number[] }[];
      if (!p || !p[0]) return "";

      const d = p[0];
      const [open, close, low, high] = d.data;
      const variation = close - open;
      const variationPct = ((variation / open) * 100).toFixed(1);
      const isUp = close >= open;

      return `
        <div style="min-width: 200px;">
          <b style="font-size: 14px;">${d.name}</b><br/>
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
          
          <div style="display: flex; justify-content: space-between;">
            <span>Variation :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${isUp ? "+" : ""}${variation.toLocaleString("fr-FR")} $ (${isUp ? "+" : ""}${variationPct}%)
            </b>
          </div>
        </div>
      `;
    },
  },
  legend: {
    data: ["BTC/USD"],
    top: 55,
    show: false,
  },
  grid: {
    left: 90,
    right: 60,
    top: 90,
    bottom: 100,
  },
  xAxis: {
    type: "category",
    data: bitcoinData.dates,
    boundaryGap: true,
    axisLine: { onZero: false },
    splitLine: { show: false },
    axisLabel: {
      rotate: 45,
      fontSize: 9,
      interval: 2,
    },
  },
  yAxis: {
    type: "value",
    name: "Prix (USD)",
    nameLocation: "middle",
    nameGap: 65,
    scale: true,
    splitArea: {
      show: true,
    },
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K $`;
        }
        return `${value} $`;
      },
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
      bottom: 30,
      start: 0,
      end: 100,
      height: 30,
      labelFormatter: (_value: number, valueStr: string) => valueStr,
    },
  ],
  series: [
    {
      name: "BTC/USD",
      type: "candlestick",
      data: bitcoinData.values,
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
      markPoint: {
        symbol: "pin",
        symbolSize: 45,
        data: evenements.map((e) => ({
          name: e.text,
          coord: [e.x, e.y],
          value: e.text,
          itemStyle: { color: e.color },
          label: {
            formatter: e.text,
            fontSize: 9,
            fontWeight: "bold",
          },
        })),
      },
      markLine: {
        silent: true,
        data: [
          {
            yAxis: 20000,
            label: {
              formatter: "Cycle précédent ATH (20K)",
              position: "end",
              fontSize: 9,
            },
            lineStyle: {
              type: "dashed",
              color: "#6b7280",
            },
          },
          {
            yAxis: 69000,
            label: {
              formatter: "ATH 2021 (69K)",
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
  ],
  // Zones colorées pour les cycles
  visualMap: {
    show: false,
    dimension: 1,
    pieces: [
      { lt: 20000, color: "#fecaca" },
      { gte: 20000, lt: 50000, color: "#fef3c7" },
      { gte: 50000, color: "#bbf7d0" },
    ],
  },
};

const notes = `
## 📚 Note pédagogique : Graphique grande échelle (Large Scale Candlestick)

### ✅ Quand utiliser ce type de diagramme

Le graphique en chandelier **grande échelle** est idéal pour :

- **Analyse long terme** : visualiser des années de données
- **Identification des cycles** : repérer les bull/bear markets
- **Investissement stratégique** : timing macro des entrées/sorties
- **Contexte historique** : comprendre d'où vient le prix actuel

**Caractéristiques clés :**
- Timeframe mensuel ou hebdomadaire
- DataZoom pour navigation fluide
- Annotations des événements majeurs
- Niveaux de support/résistance historiques

### ❌ Quand ne pas utiliser

- **Trading intraday** : trop peu de détail
- **Décisions court terme** : utilisez des timeframes plus courts
- **Assets peu volatils** : les variations seront peu visibles
- **Données < 1 an** : pas assez de recul

### 📊 Analyse de ce graphique

**Bitcoin 2020-2024 : Une histoire en 4 chapitres**

| Phase | Période | Événement | Prix |
|-------|---------|-----------|------|
| 🦠 COVID Crash | Mar 2020 | Panique mondiale | ${plusBas.toLocaleString("fr-FR")} $ |
| 🚀 Bull Run | Nov 2021 | ATH historique | 69 000 $ |
| 💥 Bear Market | Nov 2022 | Faillite FTX | 15 500 $ |
| 📈 Recovery | Nov 2024 | ETF + Trump | ${plusHaut.toLocaleString("fr-FR")} $ |

**Cycles du Bitcoin :**
- **Halving** : tous les ~4 ans, réduction de moitié de la récompense de minage
- **2020** : 3ème halving → bull run 2020-2021
- **2024** : 4ème halving → nouveau cycle haussier

**Retour sur investissement :**
- Investissement Jan 2020 : 7 200 $
- Valeur Nov 2024 : ${derniereValeur.toLocaleString("fr-FR")} $
- Performance : **+${variationTotale}%**

### 🔧 Fonctionnalités ECharts utilisées

**DataZoom pour grands datasets :**
\`\`\`javascript
dataZoom: [
  { type: 'inside' }, // Zoom molette + tactile
  { 
    type: 'slider',
    bottom: 30,
    height: 30, // Slider visible
  }
]
\`\`\`

**MarkPoint pour événements :**
\`\`\`javascript
markPoint: {
  data: [
    { coord: ['Mar 2020', 4100], value: 'COVID-19' },
    { coord: ['Nov 2021', 69000], value: 'ATH' },
    { coord: ['Nov 2022', 15500], value: 'FTX' },
  ]
}
\`\`\`

**MarkLine pour niveaux clés :**
\`\`\`javascript
markLine: {
  data: [
    { yAxis: 20000, label: { formatter: 'Cycle précédent' } },
    { yAxis: 69000, label: { formatter: 'ATH 2021' } },
  ]
}
\`\`\`

### 📈 Patterns identifiables sur 5 ans

**1. Cycles de 4 ans (Halving)**
\`\`\`
Halving → Accumulation (6-12 mois)
       → Bull Run (12-18 mois)  
       → Crash (3-6 mois)
       → Bear Market (12-18 mois)
       → Repeat
\`\`\`

**2. Supports psychologiques**
- 10 000 $ : support majeur 2020
- 20 000 $ : ATH 2017, support 2022
- 30 000 $ : zone de consolidation
- 69 000 $ : ATH 2021

**3. Catalyseurs haussiers**
- Halvings
- Adoption institutionnelle (ETF)
- Politique monétaire accommodante
- Événements géopolitiques

**4. Catalyseurs baissiers**
- Régulation (Chine 2021)
- Faillites (Terra, FTX)
- Hausse des taux
- Scandales/hacks

### 🎯 Cas d'usage professionnels

**1. Gestion de portefeuille crypto**
- Allocation stratégique long terme
- Rebalancing trimestriel
- DCA (Dollar Cost Averaging)

**2. Analyse fondamentale**
- Corrélation avec le S&P 500
- Effet des halvings
- On-chain metrics

**3. Reporting institutionnel**
- Performance annuelle
- Volatilité historique
- Comparaison avec benchmark

**4. Communication investisseurs**
- Présentation de l'historique
- Justification des allocations
- Scénarios prospectifs

### ⚡ Performance ECharts

Pour les grands datasets (60+ points) :
\`\`\`javascript
// Sampling pour fluidité
series: [{
  sampling: 'lttb', // Largest Triangle Three Buckets
  progressive: 1000,
  progressiveThreshold: 3000,
}]
\`\`\`

**Optimisations appliquées :**
- Données mensuelles (pas quotidiennes)
- DataZoom inside + slider
- Labels avec interval
- Pas d'animation sur 60 points

### 💡 Bonnes pratiques

1. **Échelle log optionnelle** : pour les assets à forte croissance
2. **Périodes cohérentes** : mensuel pour 5+ ans, hebdo pour 1-2 ans
3. **Annotations claires** : marquer les événements sans surcharger
4. **Contexte** : comparer aux cycles précédents
5. **Navigation** : dataZoom obligatoire pour l'exploration
`;

export default function LargeScaleCandlestick() {
  return (
    <ChartEditor
      title="Large Scale Candlestick"
      section="Candlestick"
      option={option}
      notes={notes}
    />
  );
}
