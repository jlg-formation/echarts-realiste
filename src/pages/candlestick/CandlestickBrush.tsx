import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Action Tesla (TSLA) - Analyse technique avec brush
// Contexte : Outil d'analyse pour trader sélectionnant des zones
// Format OHLC : [Open, Close, Low, High]

const teslaData = {
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
    [250.45, 255.78, 248.12, 258.34], // 01 Oct
    [256.12, 248.56, 246.89, 258.45], // 02 Oct - Baisse
    [249.23, 245.67, 243.45, 251.78], // 03 Oct
    [246.12, 252.34, 244.78, 254.56], // 04 Oct - Rebond
    [253.45, 258.89, 252.12, 261.34], // 07 Oct
    [259.67, 255.12, 253.45, 262.78], // 08 Oct
    [255.89, 262.45, 254.23, 265.67], // 09 Oct - Hausse
    [263.12, 278.56, 261.78, 282.34], // 10 Oct - Gap haussier (robotaxi event)
    [279.45, 272.12, 268.56, 283.89], // 11 Oct - Prise de profit
    [272.89, 268.34, 265.12, 275.67], // 14 Oct
    [269.12, 275.89, 267.45, 278.34], // 15 Oct
    [276.45, 271.23, 268.89, 279.56], // 16 Oct
    [271.89, 278.45, 270.12, 281.67], // 17 Oct
    [279.12, 275.56, 273.23, 282.89], // 18 Oct
    [276.23, 282.78, 274.56, 285.34], // 21 Oct
    [283.45, 279.12, 276.89, 286.67], // 22 Oct
    [279.89, 287.34, 278.45, 290.12], // 23 Oct - Résultats Q3
    [288.12, 295.67, 286.34, 298.89], // 24 Oct - Beat consensus
    [296.45, 291.23, 288.67, 299.34], // 25 Oct
    [291.89, 298.45, 290.12, 301.56], // 28 Oct
    [299.12, 305.78, 297.45, 308.34], // 29 Oct - Momentum
    [306.45, 312.89, 304.23, 315.67], // 30 Oct - Continuation
    [313.56, 318.45, 311.78, 322.34], // 31 Oct - Clôture haute
  ],
  // Volumes en millions
  volumes: [
    85, 92, 78, 82, 95, 88, 102, 185, 145, 98, 87, 82, 91, 79, 86, 83, 168, 192,
    125, 108, 135, 142, 118,
  ],
};

// Statistiques
const premiereValeur = teslaData.ohlc[0][0];
const derniereValeur = teslaData.ohlc[teslaData.ohlc.length - 1][1];
const variationMois = (
  ((derniereValeur - premiereValeur) / premiereValeur) *
  100
).toFixed(1);
const plusHaut = Math.max(...teslaData.ohlc.map((v) => v[3]));
const plusBas = Math.min(...teslaData.ohlc.map((v) => v[2]));

// Couleurs des volumes
const volumeColors = teslaData.ohlc.map((candle) =>
  candle[1] >= candle[0] ? "#22c55e" : "#dc2626"
);

const option: EChartsOption = {
  title: {
    text: "🚗 Tesla (TSLA) - Analyse technique Octobre 2024",
    subtext: `Variation : +${variationMois}% · Utilisez la sélection (brush) pour analyser une zone · Double-clic pour réinitialiser`,
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 11,
    },
  },
  tooltip: {
    trigger: "axis",
    confine: true,
    axisPointer: {
      type: "cross",
    },
    formatter: (params: unknown) => {
      const p = params as {
        axisValue: string;
        seriesName: string;
        data: number | number[];
      }[];
      if (!p || p.length === 0) return "";

      const date = p[0].axisValue;
      const candleData = p.find((item) => item.seriesName === "TSLA");

      if (!candleData || !Array.isArray(candleData.data)) return "";

      const [open, close, low, high] = candleData.data;
      const variation = close - open;
      const variationPct = ((variation / open) * 100).toFixed(2);
      const isUp = close >= open;

      return `
        <div style="min-width: 200px;">
          <b style="font-size: 14px;">${date} 2024</b><br/>
          <hr style="margin: 8px 0;"/>
          
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
          
          <hr style="margin: 8px 0;"/>
          
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
    data: ["TSLA", "MA5", "MA10", "Volume"],
    top: 55,
  },
  toolbox: {
    feature: {
      brush: {
        type: ["lineX", "clear"],
        title: {
          lineX: "Sélection horizontale",
          clear: "Effacer",
        },
      },
      restore: {
        title: "Réinitialiser",
      },
      saveAsImage: {
        title: "Télécharger",
      },
    },
    right: 20,
    top: 55,
  },
  brush: {
    xAxisIndex: "all",
    brushLink: "all",
    outOfBrush: {
      colorAlpha: 0.2,
    },
    brushStyle: {
      borderWidth: 1,
      color: "rgba(59, 130, 246, 0.2)",
      borderColor: "#3b82f6",
    },
  },
  axisPointer: {
    link: [{ xAxisIndex: "all" }],
  },
  grid: [
    {
      left: 80,
      right: 80,
      top: 100,
      height: "50%",
    },
    {
      left: 80,
      right: 80,
      top: "72%",
      height: "18%",
    },
  ],
  xAxis: [
    {
      type: "category",
      data: teslaData.dates,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      gridIndex: 0,
    },
    {
      type: "category",
      gridIndex: 1,
      data: teslaData.dates,
      boundaryGap: true,
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
      splitArea: { show: true },
      axisLabel: {
        formatter: (value: number) => `${value.toFixed(0)} $`,
      },
      gridIndex: 0,
    },
    {
      type: "value",
      name: "Volume (M)",
      nameLocation: "middle",
      nameGap: 50,
      gridIndex: 1,
      splitNumber: 3,
      axisLabel: {
        formatter: (value: number) => `${value}M`,
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
      name: "TSLA",
      type: "candlestick",
      data: teslaData.ohlc,
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
      markPoint: {
        symbol: "pin",
        symbolSize: 40,
        data: [
          {
            name: "Robotaxi",
            coord: ["10 Oct", 282.34],
            value: "Robotaxi",
            itemStyle: { color: "#3b82f6" },
            label: { fontSize: 9 },
          },
          {
            name: "Q3 Results",
            coord: ["23 Oct", 290.12],
            value: "Q3 Results",
            itemStyle: { color: "#22c55e" },
            label: { fontSize: 9 },
          },
        ],
      },
      markLine: {
        silent: true,
        data: [
          {
            yAxis: 270,
            label: {
              formatter: "Support 270$",
              position: "end",
              fontSize: 9,
            },
            lineStyle: { type: "dashed", color: "#3b82f6" },
          },
          {
            yAxis: 300,
            label: {
              formatter: "Résistance 300$",
              position: "end",
              fontSize: 9,
            },
            lineStyle: { type: "dashed", color: "#f59e0b" },
          },
        ],
      },
    },
    {
      name: "MA5",
      type: "line",
      data: calculerMA(teslaData.ohlc, 5),
      xAxisIndex: 0,
      yAxisIndex: 0,
      smooth: true,
      lineStyle: { opacity: 0.7, width: 2, color: "#8b5cf6" },
      itemStyle: { color: "#8b5cf6" },
      symbol: "none",
    },
    {
      name: "MA10",
      type: "line",
      data: calculerMA(teslaData.ohlc, 10),
      xAxisIndex: 0,
      yAxisIndex: 0,
      smooth: true,
      lineStyle: { opacity: 0.7, width: 2, color: "#f97316" },
      itemStyle: { color: "#f97316" },
      symbol: "none",
    },
    {
      name: "Volume",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: teslaData.volumes.map((vol, i) => ({
        value: vol,
        itemStyle: { color: volumeColors[i], opacity: 0.7 },
      })),
    },
  ],
};

// Calcul moyenne mobile
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
## 📚 Note pédagogique : Sélection avec Brush (Candlestick Brush)

### ✅ Quand utiliser le brush

Le composant **brush** est idéal pour :

- **Sélectionner une zone temporelle** : isoler une période d'intérêt
- **Comparer avant/après** : événements, annonces
- **Zoom sémantique** : mettre en évidence vs assombrir le reste
- **Analyse multi-graphiques** : sélection synchronisée

**Principe clé :**
\`\`\`javascript
brush: {
  xAxisIndex: 'all',
  brushLink: 'all',
  outOfBrush: { colorAlpha: 0.2 }
}
\`\`\`

### ❌ Quand ne pas utiliser

- **Consultation simple** : overhead inutile
- **Mobile** : interaction moins intuitive
- **Données statiques** : pas d'exploration nécessaire
- **Dashboard temps réel** : la sélection serait perdue à chaque refresh

### 📊 Analyse de ce graphique

**Tesla (TSLA) - Octobre 2024**

| Indicateur | Valeur |
|------------|--------|
| Ouverture mois | ${premiereValeur.toLocaleString("fr-FR")} $ |
| Clôture mois | ${derniereValeur.toLocaleString("fr-FR")} $ |
| Variation | **+${variationMois}%** |
| Plus haut | ${plusHaut.toLocaleString("fr-FR")} $ |
| Plus bas | ${plusBas.toLocaleString("fr-FR")} $ |

**Événements majeurs du mois :**
- 🚗 **10 Oct** : Robotaxi Event - Gap haussier de +6%
- 📊 **23-24 Oct** : Résultats Q3 - Beat consensus, +9% sur 2 jours
- 📈 **Fin Oct** : Momentum haussier, cassure des 300$

**Zones à analyser avec le brush :**
1. **1-4 Oct** : Range bas, accumulation
2. **9-11 Oct** : Gap Robotaxi et prise de profit
3. **23-31 Oct** : Rally post-résultats

### 🔧 Configuration du Brush

**Activation dans toolbox :**
\`\`\`javascript
toolbox: {
  feature: {
    brush: {
      type: ['lineX', 'clear'], // Rectangle horizontal
      title: {
        lineX: 'Sélection horizontale',
        clear: 'Effacer'
      }
    }
  }
}
\`\`\`

**Options du brush :**
\`\`\`javascript
brush: {
  xAxisIndex: 'all',      // Tous les axes X
  brushLink: 'all',       // Lier toutes les séries
  outOfBrush: {
    colorAlpha: 0.2       // Opacité hors sélection
  },
  brushStyle: {
    borderWidth: 1,
    color: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#3b82f6'
  }
}
\`\`\`

**Types de brush disponibles :**
| Type | Usage |
|------|-------|
| \`rect\` | Rectangle libre |
| \`polygon\` | Forme libre |
| \`lineX\` | Bande horizontale |
| \`lineY\` | Bande verticale |
| \`keep\` | Conserver la sélection |
| \`clear\` | Effacer |

### 🎯 Cas d'usage professionnels

**1. Analyse d'événements**
\`\`\`
Sélectionner : Veille/jour/lendemain d'une annonce
Comparer : Volume et amplitude avant/après
Insight : Impact réel de l'événement
\`\`\`

**2. Pattern recognition**
\`\`\`
Sélectionner : Formation chartiste (triangle, flag...)
Identifier : Points d'entrée/sortie
Valider : Avec le volume
\`\`\`

**3. Comparaison de périodes**
\`\`\`
Sélectionner : Semaine A vs Semaine B
Analyser : Performance relative
Décision : Stratégie similaire ?
\`\`\`

**4. Filtrage de données**
\`\`\`
Sélectionner : Période de forte volatilité
Exclure : Périodes calmes
Focus : Sur les mouvements significatifs
\`\`\`

### 📱 Interactions utilisateur

**Desktop :**
- **Clic + drag** : Créer une sélection
- **Double-clic** : Effacer la sélection
- **Toolbox** : Changer le mode de sélection

**Mobile :**
- **Touch + drag** : Sélection
- **Tap** : Sélection ponctuelle
- ⚠️ Moins intuitif, prévoir des instructions

### 🔄 Événements brush (API)

\`\`\`javascript
myChart.on('brushSelected', function (params) {
  const brushComponent = params.batch[0];
  
  // Indices des données sélectionnées
  const selectedDataIndices = brushComponent.selected[0].dataIndex;
  
  // Calculer des statistiques sur la sélection
  const selectedData = selectedDataIndices.map(i => data[i]);
  const avg = selectedData.reduce((a, b) => a + b) / selectedData.length;
  
  console.log('Sélection:', selectedDataIndices);
  console.log('Moyenne:', avg);
});
\`\`\`

**Utilisations avancées :**
- Calcul de statistiques sur la sélection
- Export des données sélectionnées
- Synchronisation avec d'autres graphiques
- Filtrage de tableau de données

### 🎨 Personnalisation visuelle

**Style de la zone sélectionnée :**
\`\`\`javascript
brushStyle: {
  color: 'rgba(120, 80, 200, 0.3)',
  borderColor: '#7850c8',
  borderWidth: 2,
  borderType: 'dashed'
}
\`\`\`

**Style hors sélection :**
\`\`\`javascript
outOfBrush: {
  colorAlpha: 0.1,  // Très transparent
  // ou
  color: '#ccc'    // Grisé
}
\`\`\`

### 💡 Bonnes pratiques

1. **Instructions claires** : Indiquer comment utiliser le brush
2. **Bouton reset** : Toujours permettre de réinitialiser
3. **Feedback visuel** : Couleurs distinctes pour la sélection
4. **Performance** : Limiter à 1000 points pour fluidité
5. **Persistance** : Optionnel - sauvegarder la sélection
`;

export default function CandlestickBrush() {
  return (
    <ChartEditor
      title="Candlestick Brush"
      section="Candlestick"
      option={option}
      notes={notes}
    />
  );
}
