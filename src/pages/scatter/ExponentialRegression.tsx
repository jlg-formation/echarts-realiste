import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Croissance virale d'une application mobile - Modèle exponentiel
// Contexte : lancement d'une app de réseau social en France

// Données réelles de croissance (utilisateurs actifs mensuels - MAU)
const growthData = [
  { mois: 0, date: "Jan 2024", mau: 1000, event: "Lancement beta" },
  { mois: 1, date: "Fév 2024", mau: 1850, event: "" },
  { mois: 2, date: "Mar 2024", mau: 3200, event: "" },
  { mois: 3, date: "Avr 2024", mau: 5800, event: "Article TechCrunch" },
  { mois: 4, date: "Mai 2024", mau: 11200, event: "" },
  { mois: 5, date: "Juin 2024", mau: 19500, event: "Levée Série A" },
  { mois: 6, date: "Juil 2024", mau: 38000, event: "" },
  { mois: 7, date: "Août 2024", mau: 72000, event: "Viral TikTok" },
  { mois: 8, date: "Sep 2024", mau: 125000, event: "" },
  { mois: 9, date: "Oct 2024", mau: 215000, event: "" },
  { mois: 10, date: "Nov 2024", mau: 380000, event: "Levée Série B" },
];

// Calcul de la régression exponentielle : y = a * e^(bx)
// ln(y) = ln(a) + bx → régression linéaire sur ln(y)
const n = growthData.length;
const lnY = growthData.map((d) => Math.log(d.mau));
const sumX = growthData.reduce((acc, d) => acc + d.mois, 0);
const sumLnY = lnY.reduce((acc, v) => acc + v, 0);
const sumXLnY = growthData.reduce((acc, d, i) => acc + d.mois * lnY[i], 0);
const sumX2 = growthData.reduce((acc, d) => acc + d.mois * d.mois, 0);

const b = (n * sumXLnY - sumX * sumLnY) / (n * sumX2 - sumX * sumX);
const lnA = (sumLnY - b * sumX) / n;
const a = Math.exp(lnA);

// Taux de croissance mensuel
const tauxCroissance = Math.exp(b) - 1;
const tauxCroissancePct = (tauxCroissance * 100).toFixed(1);

// Prédictions pour les mois suivants
const predictions = [];
for (let m = 0; m <= 14; m++) {
  predictions.push([m, Math.round(a * Math.exp(b * m))]);
}

// Calcul du coefficient de détermination R²
const yMean = growthData.reduce((acc, d) => acc + d.mau, 0) / n;
const ssTot = growthData.reduce((acc, d) => acc + (d.mau - yMean) ** 2, 0);
const ssRes = growthData.reduce((acc, d) => {
  const yPred = a * Math.exp(b * d.mois);
  return acc + (d.mau - yPred) ** 2;
}, 0);
const r2 = 1 - ssRes / ssTot;

// Prédiction pour atteindre 1M d'utilisateurs
const moisPour1M = Math.ceil(Math.log(1000000 / a) / b);

const option: EChartsOption = {
  title: {
    text: "Croissance virale App Mobile - Modèle exponentiel",
    subtext: `+${tauxCroissancePct} %/mois · R² = ${r2.toFixed(3)} · 1M utilisateurs prévu mois ${moisPour1M} (${moisPour1M <= 12 ? "Avr" : "Mai"} 2025)`,
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
        data: number[] | [number, number];
        seriesName: string;
      };

      if (p.seriesName === "Courbe modèle") {
        const mois = (p.data as number[])[0];
        const mauPred = (p.data as number[])[1];
        return `
          <b>📈 Prédiction mois ${mois}</b><br/><br/>
          MAU prédit : <b>${mauPred.toLocaleString("fr-FR")}</b><br/>
          <em>y = ${Math.round(a).toLocaleString("fr-FR")} × e<sup>${b.toFixed(3)}×${mois}</sup></em>
        `;
      }

      const dataPoint = growthData.find(
        (d) => d.mois === (p.data as number[])[0],
      );
      if (!dataPoint) return "";

      const mauPred = Math.round(a * Math.exp(b * dataPoint.mois));
      const ecart = dataPoint.mau - mauPred;
      const ecartPct = ((ecart / mauPred) * 100).toFixed(1);

      return `
        <b>📅 ${dataPoint.date}</b><br/><br/>
        MAU réel : <b>${dataPoint.mau.toLocaleString("fr-FR")}</b><br/>
        MAU prédit : <b>${mauPred.toLocaleString("fr-FR")}</b><br/>
        Écart : <span style="color: ${ecart > 0 ? "#22c55e" : "#ef4444"}">${ecart > 0 ? "+" : ""}${ecart.toLocaleString("fr-FR")} (${ecartPct} %)</span>
        ${dataPoint.event ? `<br/><br/>🎯 <b>${dataPoint.event}</b>` : ""}
      `;
    },
  },
  legend: {
    top: 60,
    data: ["Données réelles", "Courbe modèle"],
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 90,
    right: 40,
    top: 100,
    bottom: 60,
  },
  xAxis: {
    type: "value",
    name: "Mois depuis lancement",
    nameLocation: "middle",
    nameGap: 35,
    min: 0,
    max: 14,
    interval: 1,
    axisLabel: {
      formatter: "M{value}",
    },
  },
  yAxis: {
    type: "value",
    name: "Utilisateurs actifs (MAU)",
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${Math.round(value / 1000)}k`;
        return value.toString();
      },
    },
  },
  series: [
    // Points réels
    {
      name: "Données réelles",
      type: "scatter",
      data: growthData.map((d) => [d.mois, d.mau]),
      symbolSize: (value: number[]) => {
        const dataPoint = growthData.find((d) => d.mois === value[0]);
        return dataPoint?.event ? 14 : 10;
      },
      symbol: "circle",
      itemStyle: {
        color: "#3b82f6",
        opacity: 0.9,
      },
      label: {
        show: true,
        position: "top",
        formatter: (params: unknown) => {
          const p = params as { data: number[] };
          const dataPoint = growthData.find((d) => d.mois === p.data[0]);
          return dataPoint?.event ? "⭐" : "";
        },
        fontSize: 14,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
    // Courbe exponentielle
    {
      name: "Courbe modèle",
      type: "line",
      data: predictions,
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#ef4444",
        width: 2,
        type: "dashed",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(239, 68, 68, 0.15)" },
            { offset: 1, color: "rgba(239, 68, 68, 0)" },
          ],
        },
      },
    },
    // Seuil 1M
    {
      name: "Objectif 1M",
      type: "line",
      markLine: {
        silent: true,
        symbol: "none",
        data: [
          {
            yAxis: 1000000,
            label: {
              formatter: "🎯 1M utilisateurs",
              position: "end",
            },
            lineStyle: {
              color: "#22c55e",
              type: "dotted",
              width: 2,
            },
          },
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Régression exponentielle

### ✅ Quand utiliser ce type de modèle

La régression exponentielle est adaptée pour :

- **Croissance virale** : utilisateurs app, followers, viralité
- **Épidémiologie** : propagation de maladies (phase exponentielle)
- **Finance** : intérêts composés, valorisation startup
- **Biologie** : croissance bactérienne, population
- **Physique** : désintégration radioactive (exponentielle décroissante)

**Forme du modèle :**
$$y = a \\cdot e^{bx}$$

Où :
- $a$ = valeur initiale (y à x=0)
- $b$ = taux de croissance (b > 0 = croissance, b < 0 = décroissance)
- $e$ = constante d'Euler (≈ 2,718)

### ❌ Quand ne pas utiliser

- **Phase de maturité** : la croissance ralentit (→ modèle logistique)
- **Données linéaires** : une droite suffit
- **Fluctuations saisonnières** : modèle plus complexe nécessaire
- **Court terme** : peu de points = modèle peu fiable
- **Valeurs négatives** : l'exponentielle est toujours positive

### 📊 Analyse de ce graphique

**Modèle ajusté :**
$$MAU = ${Math.round(a).toLocaleString("fr-FR")} \\times e^{${b.toFixed(3)} \\times mois}$$

**Métriques clés :**
| Indicateur | Valeur |
|------------|--------|
| Taux de croissance mensuel | +${tauxCroissancePct} % |
| Coefficient R² | ${r2.toFixed(3)} |
| Temps de doublement | ${(Math.log(2) / b).toFixed(1)} mois |
| Prévision 1M utilisateurs | Mois ${moisPour1M} |

**Événements marquants :**
- **Mois 3** : Article TechCrunch → boost de visibilité
- **Mois 5** : Série A → accélération marketing
- **Mois 7** : Viral TikTok → croissance explosive
- **Mois 10** : Série B → préparation scale-up

### 🧮 Méthode de calcul

**Étape 1 : Linéarisation**
Prendre le logarithme des deux côtés :
$$\\ln(y) = \\ln(a) + bx$$

C'est une équation linéaire en $\\ln(y)$ vs $x$.

**Étape 2 : Régression linéaire sur ln(y)**
Calculer la pente $b$ et l'ordonnée à l'origine $\\ln(a)$.

**Étape 3 : Récupérer a**
$$a = e^{\\ln(a)}$$

**En JavaScript :**
\`\`\`javascript
const lnY = data.map(d => Math.log(d.y));
// Régression linéaire sur lnY...
const a = Math.exp(intercept);
const b = slope;
\`\`\`

### 🔧 Fonctionnalités ECharts utilisées

- **type: "scatter"** : points de données réels
- **type: "line"** avec smooth : courbe exponentielle lissée
- **areaStyle gradient** : zone sous la courbe
- **markLine** : seuil objectif 1M
- **symbolSize dynamique** : points événements plus gros
- **label emoji** : étoiles sur les événements clés

### 📈 Métriques de croissance virale

**Coefficient viral (K) :**
$$K = \\text{invitations} \\times \\text{taux conversion}$$

- K > 1 = croissance virale auto-entretenue
- K = 1,5 → chaque utilisateur en amène 0,5 de plus

**Taux de rétention :**
- J1 : 40 % (après 1 jour)
- J7 : 20 % (après 1 semaine)
- J30 : 10 % (après 1 mois)

**LTV (Lifetime Value) :**
$$LTV = ARPU \\times \\text{durée vie moyenne}$$

### ⚠️ Limites du modèle exponentiel

**La croissance exponentielle ne dure jamais :**

1. **Saturation du marché** : nombre fini d'utilisateurs potentiels
2. **Concurrence** : nouveaux entrants, copies
3. **Fatigue** : buzz qui retombe
4. **Contraintes opérationnelles** : serveurs, support, modération

**Modèle plus réaliste : courbe en S (logistique)**
$$y = \\frac{L}{1 + e^{-k(x-x_0)}}$$

Où $L$ = capacité maximale (plafond).

### 🚀 Pour aller plus loin

- Comparer avec un modèle logistique
- Ajouter des intervalles de confiance
- Prédiction avec incertitude (Monte Carlo)
- Backtesting : ajuster sur 80 % des données, tester sur 20 %
`;

export default function ExponentialRegression() {
  return (
    <ChartEditor
      title="Exponential Regression"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
