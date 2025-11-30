import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Indice CAC 40 - Novembre 2024
// Contexte : Analyse de l'indice phare de la Bourse de Paris
// Format OHLC : [Open, Close, Low, High]

const donneesCAC40 = {
  dates: [
    "01 Nov",
    "04 Nov",
    "05 Nov",
    "06 Nov",
    "07 Nov",
    "08 Nov",
    "11 Nov",
    "12 Nov",
    "13 Nov",
    "14 Nov",
    "15 Nov",
    "18 Nov",
    "19 Nov",
    "20 Nov",
    "21 Nov",
    "22 Nov",
    "25 Nov",
    "26 Nov",
    "27 Nov",
    "28 Nov",
    "29 Nov",
  ],
  // Format : [Ouverture, Clôture, Plus bas, Plus haut]
  valeurs: [
    [7380.25, 7412.58, 7365.12, 7425.89], // 01 Nov - Hausse
    [7415.67, 7389.45, 7375.23, 7428.56], // 04 Nov - Baisse légère
    [7392.34, 7445.78, 7388.56, 7462.34], // 05 Nov - Hausse (élections US)
    [7448.12, 7523.45, 7445.67, 7545.23], // 06 Nov - Hausse forte post-élections
    [7525.78, 7498.34, 7485.12, 7538.67], // 07 Nov - Baisse légère
    [7501.23, 7478.56, 7465.34, 7512.89], // 08 Nov - Baisse
    [7356.45, 7312.78, 7298.23, 7368.56], // 11 Nov - Chute (craintes économiques)
    [7315.67, 7345.23, 7302.45, 7358.89], // 12 Nov - Rebond technique
    [7348.12, 7289.56, 7275.34, 7362.45], // 13 Nov - Baisse
    [7292.45, 7256.78, 7242.12, 7305.67], // 14 Nov - Baisse continue
    [7258.34, 7312.45, 7248.67, 7325.89], // 15 Nov - Rebond vendredi
    [7315.78, 7278.34, 7265.12, 7328.45], // 18 Nov - Baisse
    [7280.12, 7325.67, 7272.45, 7338.89], // 19 Nov - Hausse
    [7328.45, 7298.12, 7285.67, 7342.34], // 20 Nov - Baisse
    [7300.23, 7356.78, 7295.12, 7368.45], // 21 Nov - Hausse
    [7358.67, 7345.23, 7332.45, 7372.89], // 22 Nov - Baisse légère
    [7348.12, 7412.56, 7345.67, 7425.34], // 25 Nov - Hausse forte
    [7415.34, 7389.78, 7378.12, 7428.67], // 26 Nov - Baisse
    [7392.45, 7435.12, 7388.23, 7448.56], // 27 Nov - Hausse
    [7438.67, 7412.34, 7402.45, 7452.89], // 28 Nov - Baisse légère
    [7415.12, 7445.67, 7408.34, 7462.23], // 29 Nov - Clôture haute
  ],
};

// Calcul des statistiques
const premiereValeur = donneesCAC40.valeurs[0][0];
const derniereValeur = donneesCAC40.valeurs[donneesCAC40.valeurs.length - 1][1];
const variationMois = (
  ((derniereValeur - premiereValeur) / premiereValeur) *
  100
).toFixed(2);
const plusHaut = Math.max(...donneesCAC40.valeurs.map((v) => v[3])).toFixed(2);
const plusBas = Math.min(...donneesCAC40.valeurs.map((v) => v[2])).toFixed(2);

// Jours haussiers vs baissiers
const joursHaussiers = donneesCAC40.valeurs.filter((v) => v[1] > v[0]).length;
const joursBaissiers = donneesCAC40.valeurs.filter((v) => v[1] < v[0]).length;

// Calculer les moyennes mobiles
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

const option: EChartsOption = {
  title: {
    text: "🇫🇷 Indice CAC 40 - Novembre 2024",
    subtext: `Variation mensuelle : ${Number(variationMois) >= 0 ? "+" : ""}${variationMois}% · Plus haut : ${Number(plusHaut).toLocaleString("fr-FR")} pts · Plus bas : ${Number(plusBas).toLocaleString("fr-FR")} pts`,
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
      crossStyle: {
        color: "#999",
      },
    },
    formatter: (params: unknown) => {
      const p = params as {
        name: string;
        data: number[];
        seriesName: string;
      }[];
      if (!p || !p[0]) return "";

      const candleData = p.find((item) => item.seriesName === "CAC 40");
      if (!candleData) return "";

      const d = candleData;
      const [open, close, low, high] = d.data;
      const variation = close - open;
      const variationPct = ((variation / open) * 100).toFixed(2);
      const isUp = close >= open;

      return `
        <div style="min-width: 220px;">
          <b style="font-size: 14px;">${d.name} 2024</b><br/>
          <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Ouverture :</span>
            <b>${open.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} pts</b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Clôture :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${close.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} pts
            </b>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus haut :</span>
            <span>${high.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} pts</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Plus bas :</span>
            <span>${low.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} pts</span>
          </div>
          
          <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
          
          <div style="display: flex; justify-content: space-between;">
            <span>Variation jour :</span>
            <b style="color: ${isUp ? "#22c55e" : "#dc2626"}">
              ${isUp ? "+" : ""}${variation.toFixed(2)} pts (${isUp ? "+" : ""}${variationPct}%)
            </b>
          </div>
        </div>
      `;
    },
  },
  legend: {
    data: ["CAC 40", "MA5", "MA10"],
    top: 60,
  },
  grid: {
    left: 90,
    right: 60,
    top: 100,
    bottom: 80,
  },
  xAxis: {
    type: "category",
    data: donneesCAC40.dates,
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
    name: "Points",
    nameLocation: "middle",
    nameGap: 60,
    scale: true,
    splitArea: {
      show: true,
    },
    axisLabel: {
      formatter: (value: number) =>
        `${value.toLocaleString("fr-FR", { minimumFractionDigits: 0 })}`,
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
      name: "CAC 40",
      type: "candlestick",
      data: donneesCAC40.valeurs,
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
        data: [
          {
            name: "Plus haut",
            type: "max",
            valueDim: "highest",
            symbol: "pin",
            symbolSize: 40,
            itemStyle: { color: "#22c55e" },
            label: {
              formatter: "{c}",
              fontSize: 10,
            },
          },
          {
            name: "Plus bas",
            type: "min",
            valueDim: "lowest",
            symbol: "pin",
            symbolSize: 40,
            symbolRotate: 180,
            itemStyle: { color: "#dc2626" },
            label: {
              formatter: "{c}",
              fontSize: 10,
              offset: [0, 8],
            },
          },
        ],
      },
      markLine: {
        silent: true,
        data: [
          {
            yAxis: 7400,
            label: {
              formatter: "Support 7 400",
              position: "end",
              fontSize: 10,
            },
            lineStyle: {
              type: "dashed",
              color: "#3b82f6",
            },
          },
          {
            yAxis: 7500,
            label: {
              formatter: "Résistance 7 500",
              position: "end",
              fontSize: 10,
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
      data: calculerMA(donneesCAC40.valeurs, 5),
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
      name: "MA10",
      type: "line",
      data: calculerMA(donneesCAC40.valeurs, 10),
      smooth: true,
      lineStyle: {
        opacity: 0.7,
        width: 2,
        color: "#f97316",
      },
      itemStyle: {
        color: "#f97316",
      },
      symbol: "none",
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Graphique indiciel (Index Chart)

### ✅ Quand utiliser ce type de diagramme

Le **graphique en chandelier pour indices boursiers** est idéal pour :

- **Suivre un marché** : représenter la santé économique d'un pays ou secteur
- **Analyse macroéconomique** : identifier les tendances de fond
- **Comparaison temporelle** : visualiser les cycles économiques
- **Trading indiciel** : ETF, futures, options sur indice

**Spécificités des indices :**
- **Pas de volume direct** : utiliser le volume des composants ou des ETF
- **Composition variable** : les entreprises entrent/sortent de l'indice
- **Pondération** : par capitalisation (CAC 40) ou égale (CAC 40 Equal Weight)

### ❌ Quand ne pas utiliser

- **Analyse d'action individuelle** : l'indice masque les performances individuelles
- **Court terme extrême** : les indices sont moins volatils que les actions
- **Comparaison internationale directe** : devises et compositions différentes
- **Décisions d'achat d'action** : l'indice ne dit rien sur une entreprise en particulier

### 📊 Analyse de ce graphique

**CAC 40 - Novembre 2024**

| Indicateur | Valeur |
|------------|--------|
| Ouverture mois | ${premiereValeur.toLocaleString("fr-FR")} pts |
| Clôture mois | ${derniereValeur.toLocaleString("fr-FR")} pts |
| Variation | **${Number(variationMois) >= 0 ? "+" : ""}${variationMois}%** |
| Plus haut | ${Number(plusHaut).toLocaleString("fr-FR")} pts |
| Plus bas | ${Number(plusBas).toLocaleString("fr-FR")} pts |
| Jours haussiers | ${joursHaussiers} ↗ |
| Jours baissiers | ${joursBaissiers} ↘ |

**Événements du mois :**
- 🗳️ **5-6 Nov** : Élections américaines (volatilité accrue)
- 📉 **11 Nov** : Chute suite aux craintes sur la politique tarifaire
- 📈 **25 Nov** : Rebond technique significatif

**Composition du CAC 40 :**
Les 40 plus grandes capitalisations françaises :
- LVMH, TotalEnergies, Sanofi, L'Oréal, Schneider Electric...
- Pondération par capitalisation boursière flottante
- Révision trimestrielle de la composition

### 🔧 Fonctionnalités ECharts utilisées

**Moyennes mobiles multiples :**
\`\`\`javascript
series: [
  { type: 'candlestick', ... },
  { 
    name: 'MA5',
    type: 'line',
    data: calculerMA(data, 5),
    smooth: true,
  },
  { 
    name: 'MA10',
    type: 'line',
    data: calculerMA(data, 10),
  }
]
\`\`\`

**Points marquants (markPoint) :**
\`\`\`javascript
markPoint: {
  data: [
    { type: 'max', valueDim: 'highest' },
    { type: 'min', valueDim: 'lowest' },
  ]
}
\`\`\`

**Lignes de support/résistance :**
\`\`\`javascript
markLine: {
  data: [
    { yAxis: 7400, label: { formatter: 'Support' } },
    { yAxis: 7500, label: { formatter: 'Résistance' } },
  ]
}
\`\`\`

### 📈 Comprendre les moyennes mobiles

**MA5 (violet)** - Court terme
- Réactive aux changements récents
- Utile pour le trading à court terme
- Signal d'achat : cours passe au-dessus de MA5

**MA10 (orange)** - Moyen terme
- Moins de faux signaux
- Confirmation de tendance
- Croisement MA5/MA10 : signal technique important

**Croisements (Golden Cross / Death Cross) :**
- **Golden Cross** : MA5 croise MA10 vers le haut → signal haussier
- **Death Cross** : MA5 croise MA10 vers le bas → signal baissier

### 🇫🇷 Le CAC 40 en contexte

**Qu'est-ce que le CAC 40 ?**
- **C**otation **A**ssistée en **C**ontinu
- Créé le 31 décembre 1987 (base 1 000 points)
- Principal indice de la Bourse de Paris (Euronext Paris)

**Pourquoi suivre le CAC 40 ?**
1. **Baromètre économique** : reflète la santé des grandes entreprises françaises
2. **Benchmark** : référence pour les gérants de fonds
3. **Produits dérivés** : futures, options, ETF
4. **Sentiment** : indicateur de confiance des investisseurs

**Comparaison avec d'autres indices :**
| Indice | Pays | Nb valeurs |
|--------|------|------------|
| CAC 40 | France | 40 |
| DAX 40 | Allemagne | 40 |
| FTSE 100 | Royaume-Uni | 100 |
| S&P 500 | États-Unis | 500 |
| Nikkei 225 | Japon | 225 |

### 💡 Bonnes pratiques

1. **Contextualiser** : toujours indiquer la période et l'année
2. **Niveau de référence** : afficher les supports et résistances clés
3. **Moyennes mobiles** : aider à identifier la tendance
4. **Événements** : marquer les dates importantes (BCE, Fed, élections...)
5. **Unités** : utiliser "points" ou "pts" (pas "€" pour un indice)
`;

export default function ShangHaiIndex() {
  return (
    <ChartEditor
      title="ShangHai Index"
      section="Candlestick"
      option={option}
      notes={notes}
    />
  );
}
