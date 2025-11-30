import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Consommation carburant vs vitesse - Modèle polynomial
// Contexte : étude sur l'éco-conduite pour une flotte d'entreprise

// Données réelles de consommation (L/100km) en fonction de la vitesse (km/h)
// La relation est parabolique : minimum autour de 70-90 km/h
const consommationData = [
  { vitesse: 30, conso: 9.2, type: "Urbain" },
  { vitesse: 35, conso: 8.5, type: "Urbain" },
  { vitesse: 40, conso: 7.9, type: "Urbain" },
  { vitesse: 45, conso: 7.4, type: "Urbain" },
  { vitesse: 50, conso: 6.8, type: "Périurbain" },
  { vitesse: 55, conso: 6.4, type: "Périurbain" },
  { vitesse: 60, conso: 6.1, type: "Périurbain" },
  { vitesse: 65, conso: 5.8, type: "Périurbain" },
  { vitesse: 70, conso: 5.6, type: "Route" },
  { vitesse: 75, conso: 5.5, type: "Route" },
  { vitesse: 80, conso: 5.4, type: "Route" },
  { vitesse: 85, conso: 5.5, type: "Route" },
  { vitesse: 90, conso: 5.6, type: "Autoroute" },
  { vitesse: 95, conso: 5.8, type: "Autoroute" },
  { vitesse: 100, conso: 6.1, type: "Autoroute" },
  { vitesse: 110, conso: 6.8, type: "Autoroute" },
  { vitesse: 120, conso: 7.6, type: "Autoroute" },
  { vitesse: 130, conso: 8.5, type: "Autoroute" },
  { vitesse: 140, conso: 9.6, type: "Autoroute" },
  { vitesse: 150, conso: 10.8, type: "Autoroute" },
];

// Régression polynomiale de degré 2 : y = ax² + bx + c
// Méthode des moindres carrés pour polynôme
const n = consommationData.length;
const x = consommationData.map((d) => d.vitesse);
const y = consommationData.map((d) => d.conso);

// Calcul des sommes pour la régression polynomiale
const sumX = x.reduce((a, b) => a + b, 0);
const sumX2 = x.reduce((a, b) => a + b * b, 0);
const sumX3 = x.reduce((a, b) => a + b * b * b, 0);
const sumX4 = x.reduce((a, b) => a + b * b * b * b, 0);
const sumY = y.reduce((a, b) => a + b, 0);
const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
const sumX2Y = x.reduce((a, xi, i) => a + xi * xi * y[i], 0);

// Résolution du système linéaire (matrice 3x3)
// [n,    sumX,  sumX2 ] [c]   [sumY  ]
// [sumX, sumX2, sumX3 ] [b] = [sumXY ]
// [sumX2,sumX3, sumX4 ] [a]   [sumX2Y]

const det =
  n * (sumX2 * sumX4 - sumX3 * sumX3) -
  sumX * (sumX * sumX4 - sumX3 * sumX2) +
  sumX2 * (sumX * sumX3 - sumX2 * sumX2);

const a =
  (sumY * (sumX2 * sumX4 - sumX3 * sumX3) -
    sumX * (sumXY * sumX4 - sumX3 * sumX2Y) +
    sumX2 * (sumXY * sumX3 - sumX2 * sumX2Y)) /
  det;

const b =
  (n * (sumXY * sumX4 - sumX3 * sumX2Y) -
    sumY * (sumX * sumX4 - sumX3 * sumX2) +
    sumX2 * (sumX * sumX2Y - sumXY * sumX2)) /
  det;

const c =
  (n * (sumX2 * sumX2Y - sumXY * sumX3) -
    sumX * (sumX * sumX2Y - sumXY * sumX2) +
    sumY * (sumX * sumX3 - sumX2 * sumX2)) /
  det;

// Vitesse optimale (minimum de la parabole : dérivée = 0 → 2ax + b = 0)
const vitesseOptimale = -b / (2 * c);
const consoOptimale =
  a + b * vitesseOptimale + c * vitesseOptimale * vitesseOptimale;

// Calcul R²
const yMean = sumY / n;
const ssTot = y.reduce((acc, yi) => acc + (yi - yMean) ** 2, 0);
const ssRes = x.reduce((acc, xi, i) => {
  const yPred = a + b * xi + c * xi * xi;
  return acc + (y[i] - yPred) ** 2;
}, 0);
const r2 = 1 - ssRes / ssTot;

// Génération de la courbe polynomiale
const courbePolynomiale: [number, number][] = [];
for (let v = 25; v <= 155; v += 2) {
  courbePolynomiale.push([v, a + b * v + c * v * v]);
}

// Couleurs par type de conduite
const typeConfig: Record<string, { color: string; symbol: string }> = {
  Urbain: { color: "#ef4444", symbol: "circle" },
  Périurbain: { color: "#f59e0b", symbol: "triangle" },
  Route: { color: "#22c55e", symbol: "rect" },
  Autoroute: { color: "#3b82f6", symbol: "diamond" },
};

// Calcul économies potentielles
const conso130 = a + b * 130 + c * 130 * 130;
const conso110 = a + b * 110 + c * 110 * 110;
const economiePct = ((conso130 - conso110) / conso130) * 100;

const option: EChartsOption = {
  title: {
    text: "Consommation carburant vs Vitesse - Régression polynomiale",
    subtext: `🎯 Vitesse optimale : ${vitesseOptimale.toFixed(0)} km/h (${consoOptimale.toFixed(1)} L/100km) · R² = ${r2.toFixed(3)} · 130→110 km/h = -${economiePct.toFixed(0)} %`,
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
      const p = params as { data: number[]; seriesName: string };

      if (p.seriesName === "Modèle polynomial") {
        const v = p.data[0];
        const consoTheorique = p.data[1];
        return `
          <b>📈 Courbe théorique</b><br/><br/>
          Vitesse : <b>${v} km/h</b><br/>
          Conso prédite : <b>${consoTheorique.toFixed(2)} L/100km</b><br/>
          <em style="color: #888">y = ${a.toFixed(2)} + ${b.toFixed(4)}×v + ${c.toFixed(6)}×v²</em>
        `;
      }

      const vitesse = p.data[0];
      const conso = p.data[1];
      const point = consommationData.find(
        (d) => d.vitesse === vitesse && d.conso === conso,
      );
      if (!point) return "";

      const consoPredite = a + b * vitesse + c * vitesse * vitesse;
      const ecart = conso - consoPredite;
      const ecartVsOptimal = ((conso - consoOptimale) / consoOptimale) * 100;

      return `
        <b>🚗 ${point.type}</b><br/><br/>
        Vitesse : <b>${vitesse} km/h</b><br/>
        Consommation : <b>${conso} L/100km</b><br/>
        Prédit : <b>${consoPredite.toFixed(2)} L/100km</b><br/>
        Écart modèle : <span style="color: ${Math.abs(ecart) < 0.2 ? "#22c55e" : "#f59e0b"}">${ecart > 0 ? "+" : ""}${ecart.toFixed(2)}</span><br/>
        <br/>
        ${ecartVsOptimal > 5 ? `⚠️ +${ecartVsOptimal.toFixed(0)} % vs vitesse optimale` : "✅ Proche de l'optimal"}
      `;
    },
  },
  legend: {
    top: 65,
    data: Object.keys(typeConfig),
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 70,
    right: 40,
    top: 110,
    bottom: 60,
  },
  xAxis: {
    type: "value",
    name: "Vitesse (km/h)",
    nameLocation: "middle",
    nameGap: 35,
    min: 20,
    max: 160,
    axisLabel: {
      formatter: "{value}",
    },
  },
  yAxis: {
    type: "value",
    name: "Consommation (L/100km)",
    min: 4,
    max: 12,
    axisLabel: {
      formatter: "{value}",
    },
  },
  series: [
    // Points par type de conduite
    ...Object.entries(typeConfig).map(([type, config]) => ({
      name: type,
      type: "scatter" as const,
      data: consommationData
        .filter((d) => d.type === type)
        .map((d) => [d.vitesse, d.conso]),
      symbolSize: 12,
      symbol: config.symbol,
      itemStyle: {
        color: config.color,
        opacity: 0.9,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    })),
    // Courbe polynomiale
    {
      name: "Modèle polynomial",
      type: "line",
      data: courbePolynomiale,
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#8b5cf6",
        width: 3,
        type: "solid",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(139, 92, 246, 0.1)" },
            { offset: 1, color: "rgba(139, 92, 246, 0)" },
          ],
        },
      },
    },
    // Marqueurs
    {
      name: "Références",
      type: "line",
      markPoint: {
        symbol: "pin",
        symbolSize: 50,
        data: [
          {
            coord: [vitesseOptimale, consoOptimale],
            name: "Optimal",
            itemStyle: { color: "#22c55e" },
            label: {
              formatter: "🎯",
              fontSize: 16,
            },
          },
        ],
      },
      markLine: {
        silent: true,
        symbol: "none",
        data: [
          {
            xAxis: 80,
            label: {
              formatter: "80 km/h\nroute",
              position: "end",
            },
            lineStyle: {
              color: "#22c55e",
              type: "dashed",
            },
          },
          {
            xAxis: 130,
            label: {
              formatter: "130 km/h\nautoroute",
              position: "end",
            },
            lineStyle: {
              color: "#3b82f6",
              type: "dashed",
            },
          },
        ],
      },
      markArea: {
        silent: true,
        data: [
          // Zone optimale (70-90 km/h)
          [
            {
              xAxis: 70,
              itemStyle: {
                color: "rgba(34, 197, 94, 0.1)",
              },
            },
            { xAxis: 90 },
          ],
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Régression polynomiale

### ✅ Quand utiliser ce type de modèle

La régression polynomiale est adaptée pour :

- **Relations curvilignes** : la variable Y ne varie pas linéairement avec X
- **Minimum/maximum local** : recherche d'un point optimal
- **Données physiques** : beaucoup de phénomènes naturels suivent des lois polynomiales
- **Meilleur ajustement** : quand la régression linéaire a un R² faible

**Forme du modèle (degré 2) :**
$$y = a + bx + cx^2$$

Où :
- $a$ = ordonnée à l'origine
- $b$ = coefficient linéaire
- $c$ = coefficient quadratique (< 0 pour une parabole ouverte vers le bas)

### ❌ Quand ne pas utiliser

- **Extrapolation** : le polynôme diverge rapidement hors des données
- **Trop de degrés** : le modèle "sur-apprend" le bruit (overfitting)
- **Peu de données** : un polynôme de degré n passe par n+1 points quelconques
- **Relation asymptotique** : préférer un modèle exponentiel ou logarithmique

### 📊 Analyse de ce graphique

**Équation ajustée :**
$$Conso = ${a.toFixed(2)} + ${b.toFixed(4)} \\times v + ${c.toFixed(6)} \\times v^2$$

**Métriques clés :**
| Indicateur | Valeur |
|------------|--------|
| Vitesse optimale | ${vitesseOptimale.toFixed(0)} km/h |
| Consommation minimale | ${consoOptimale.toFixed(1)} L/100km |
| Coefficient R² | ${r2.toFixed(3)} |
| Économie 130→110 km/h | -${economiePct.toFixed(0)} % |

### 🚗 Pourquoi une parabole ?

La consommation de carburant dépend de deux forces opposées :

**1. Résistance au roulement (∝ vitesse)**
- Frottements pneus/sol
- Pertes mécaniques
- Dominante à basse vitesse

**2. Résistance aérodynamique (∝ vitesse²)**
- Traînée de l'air (Cx × Surface × v²)
- Dominante à haute vitesse
- Croissance quadratique

**Résultat :** minimum entre 70-90 km/h, puis explosion à haute vitesse.

### 💰 Impact économique

**Scénario : flotte de 50 véhicules, 30 000 km/an chacun**

| Vitesse moyenne | Conso/100km | Conso annuelle | Coût (1,80 €/L) |
|-----------------|-------------|----------------|-----------------|
| 130 km/h | ${conso130.toFixed(1)} L | ${(conso130 * 300 * 50).toFixed(0)} L | ${(conso130 * 300 * 50 * 1.8).toLocaleString("fr-FR")} € |
| 110 km/h | ${conso110.toFixed(1)} L | ${(conso110 * 300 * 50).toFixed(0)} L | ${(conso110 * 300 * 50 * 1.8).toLocaleString("fr-FR")} € |
| **Économie** | -${(conso130 - conso110).toFixed(1)} L | -${((conso130 - conso110) * 300 * 50).toFixed(0)} L | **-${((conso130 - conso110) * 300 * 50 * 1.8).toLocaleString("fr-FR")} €/an** |

### 🧮 Méthode de calcul

**Régression polynomiale = régression linéaire multiple sur $x$, $x^2$, $x^3$...**

Pour un polynôme de degré 2, on résout le système :
$$\\begin{pmatrix} n & \\sum x & \\sum x^2 \\\\ \\sum x & \\sum x^2 & \\sum x^3 \\\\ \\sum x^2 & \\sum x^3 & \\sum x^4 \\end{pmatrix} \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} = \\begin{pmatrix} \\sum y \\\\ \\sum xy \\\\ \\sum x^2 y \\end{pmatrix}$$

**En JavaScript (simplifié) :**
\`\`\`javascript
// Utiliser une librairie comme regression-js ou ml-regression-polynomial
import { PolynomialRegression } from 'ml-regression-polynomial';
const regression = new PolynomialRegression(x, y, 2);
const predicted = regression.predict(newX);
\`\`\`

### 🔧 Fonctionnalités ECharts utilisées

- **Multi-séries scatter** : points par type de route
- **Symboles différenciés** : accessibilité
- **line smooth** : courbe polynomiale lissée
- **markPoint** : point optimal mis en évidence
- **markLine** : limites de vitesse légales
- **markArea** : zone optimale surlignée

### 📈 Choix du degré polynomial

| Degré | Nom | Usage |
|-------|-----|-------|
| 1 | Linéaire | Relation proportionnelle |
| 2 | Quadratique | Min/max, accélération |
| 3 | Cubique | Point d'inflexion |
| 4+ | Supérieur | Rarement justifié (risque overfitting) |

**Règle empirique :** commencer par le degré le plus bas qui capture la tendance.

### ⚠️ Pièges à éviter

1. **Overfitting** : un polynôme de degré n-1 passe exactement par n points
2. **Extrapolation** : ne jamais prédire hors de la plage de données
3. **Interprétation des coefficients** : moins intuitive que la régression linéaire
4. **Sensibilité aux outliers** : un point aberrant peut changer toute la courbe

### 🚀 Pour aller plus loin

- **Splines** : polynômes par morceaux, plus flexibles
- **Régression ridge/lasso** : régularisation pour éviter l'overfitting
- **Validation croisée** : choisir le meilleur degré automatiquement
- **Intervalle de confiance** : bande autour de la courbe
`;

export default function PolynomialRegression() {
  return (
    <ChartEditor
      title="Polynomial Regression"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
