import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Corrélation heures d'étude vs notes - Étude pédagogique
// Contexte : analyse de performance étudiante en université

// Données simulées réalistes pour 40 étudiants
const etudiantsData = [
  // Étudiants "studieux" - forte corrélation
  { heures: 2, note: 8, profil: "En difficulté" },
  { heures: 3, note: 9, profil: "En difficulté" },
  { heures: 4, note: 10, profil: "Moyen" },
  { heures: 5, note: 11, profil: "Moyen" },
  { heures: 6, note: 11.5, profil: "Moyen" },
  { heures: 7, note: 12, profil: "Moyen" },
  { heures: 8, note: 13, profil: "Bon" },
  { heures: 9, note: 13.5, profil: "Bon" },
  { heures: 10, note: 14, profil: "Bon" },
  { heures: 11, note: 14.5, profil: "Bon" },
  { heures: 12, note: 15, profil: "Très bon" },
  { heures: 13, note: 15.5, profil: "Très bon" },
  { heures: 14, note: 16, profil: "Très bon" },
  { heures: 15, note: 16.5, profil: "Excellent" },
  { heures: 16, note: 17, profil: "Excellent" },

  // Variations naturelles (bruit)
  { heures: 3, note: 7, profil: "En difficulté" },
  { heures: 4, note: 8.5, profil: "En difficulté" },
  { heures: 5, note: 10.5, profil: "Moyen" },
  { heures: 6, note: 13, profil: "Bon" }, // Surdoué ?
  { heures: 7, note: 11, profil: "Moyen" },
  { heures: 8, note: 12.5, profil: "Bon" },
  { heures: 9, note: 14.5, profil: "Bon" },
  { heures: 10, note: 13, profil: "Bon" },
  { heures: 11, note: 15.5, profil: "Très bon" },
  { heures: 12, note: 14, profil: "Bon" },
  { heures: 13, note: 16.5, profil: "Excellent" },
  { heures: 14, note: 15, profil: "Très bon" },

  // Étudiants "efficaces" (bonnes notes, moins d'heures)
  { heures: 5, note: 14, profil: "Efficace" },
  { heures: 6, note: 15, profil: "Efficace" },
  { heures: 7, note: 16, profil: "Efficace" },

  // Étudiants en difficulté malgré les efforts
  { heures: 12, note: 11, profil: "À accompagner" },
  { heures: 14, note: 12, profil: "À accompagner" },
  { heures: 15, note: 13, profil: "À accompagner" },

  // Étudiants peu investis
  { heures: 1, note: 6, profil: "En difficulté" },
  { heures: 2, note: 7, profil: "En difficulté" },
  { heures: 2, note: 5, profil: "En difficulté" },
  { heures: 3, note: 8.5, profil: "En difficulté" },

  // Excellents étudiants
  { heures: 17, note: 18, profil: "Excellent" },
  { heures: 18, note: 17.5, profil: "Excellent" },
  { heures: 20, note: 19, profil: "Excellent" },
];

// Calcul de la régression linéaire
const n = etudiantsData.length;
const sumX = etudiantsData.reduce((acc, e) => acc + e.heures, 0);
const sumY = etudiantsData.reduce((acc, e) => acc + e.note, 0);
const sumXY = etudiantsData.reduce((acc, e) => acc + e.heures * e.note, 0);
const sumX2 = etudiantsData.reduce((acc, e) => acc + e.heures * e.heures, 0);
const sumY2 = etudiantsData.reduce((acc, e) => acc + e.note * e.note, 0);

const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
const intercept = (sumY - slope * sumX) / n;

// Coefficient de corrélation de Pearson
const r =
  (n * sumXY - sumX * sumY) /
  Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
const r2 = r * r;

// Statistiques
const moyHeures = sumX / n;

// Couleurs par profil
const profilConfig: Record<string, { color: string; symbol: string }> = {
  "En difficulté": { color: "#ef4444", symbol: "circle" },
  Moyen: { color: "#f59e0b", symbol: "circle" },
  Bon: { color: "#22c55e", symbol: "circle" },
  "Très bon": { color: "#3b82f6", symbol: "circle" },
  Excellent: { color: "#8b5cf6", symbol: "diamond" },
  Efficace: { color: "#06b6d4", symbol: "triangle" },
  "À accompagner": { color: "#ec4899", symbol: "rect" },
};

const option: EChartsOption = {
  title: {
    text: "Corrélation heures d'étude vs notes - Régression linéaire",
    subtext: `${n} étudiants · r = ${r.toFixed(3)} · R² = ${r2.toFixed(3)} · +${slope.toFixed(2)} pts/heure`,
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

      if (p.seriesName === "Régression") {
        return `<b>📈 Droite de régression</b><br/><br/>y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;
      }

      const heures = p.data[0];
      const note = p.data[1];
      const notePredite = slope * heures + intercept;
      const residuel = note - notePredite;

      const etudiant = etudiantsData.find(
        (e) => e.heures === heures && e.note === note
      );
      const profil = etudiant?.profil || "";

      let conseil = "";
      if (residuel > 1.5) {
        conseil = "🌟 Performance au-dessus de la tendance";
      } else if (residuel < -1.5) {
        conseil = "⚠️ Besoin d'accompagnement méthodologique";
      }

      return `
        <b>🎓 Étudiant - Profil ${profil}</b><br/><br/>
        Heures/semaine : <b>${heures}h</b><br/>
        Note obtenue : <b>${note}/20</b><br/>
        Note prédite : <b>${notePredite.toFixed(1)}/20</b><br/>
        Écart : <span style="color: ${residuel > 0 ? "#22c55e" : "#ef4444"}">${residuel > 0 ? "+" : ""}${residuel.toFixed(1)} pts</span>
        ${conseil ? `<br/><br/>${conseil}` : ""}
      `;
    },
  },
  legend: {
    top: 60,
    data: Object.keys(profilConfig),
    textStyle: {
      fontSize: 10,
    },
  },
  grid: {
    left: 70,
    right: 40,
    top: 100,
    bottom: 60,
  },
  xAxis: {
    type: "value",
    name: "Heures d'étude / semaine",
    nameLocation: "middle",
    nameGap: 35,
    min: 0,
    max: 22,
    axisLabel: {
      formatter: "{value}h",
    },
  },
  yAxis: {
    type: "value",
    name: "Note (/20)",
    min: 0,
    max: 20,
    interval: 2,
    axisLabel: {
      formatter: "{value}",
    },
  },
  series: [
    // Points par profil
    ...Object.entries(profilConfig).map(([profil, config]) => ({
      name: profil,
      type: "scatter" as const,
      data: etudiantsData
        .filter((e) => e.profil === profil)
        .map((e) => [e.heures, e.note]),
      symbolSize: 10,
      symbol: config.symbol,
      itemStyle: {
        color: config.color,
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    })),
    // Droite de régression
    {
      name: "Régression",
      type: "line",
      data: [
        [0, intercept],
        [22, slope * 22 + intercept],
      ],
      symbol: "none",
      lineStyle: {
        color: "#6366f1",
        width: 2,
        type: "dashed",
      },
      emphasis: {
        disabled: true,
      },
    },
    // Lignes de référence
    {
      name: "Références",
      type: "line",
      markLine: {
        silent: true,
        symbol: "none",
        data: [
          {
            yAxis: 10,
            label: {
              formatter: "Moyenne 10/20",
              position: "insideEndTop",
            },
            lineStyle: {
              color: "#94a3b8",
              type: "dotted",
            },
          },
          {
            xAxis: moyHeures,
            label: {
              formatter: `Moy: ${moyHeures.toFixed(1)}h`,
              position: "insideEndTop",
            },
            lineStyle: {
              color: "#94a3b8",
              type: "dotted",
            },
          },
        ],
      },
      markArea: {
        silent: true,
        data: [
          // Zone de "danger" (notes < 10)
          [
            {
              yAxis: 0,
              itemStyle: {
                color: "rgba(239, 68, 68, 0.05)",
              },
            },
            { yAxis: 10 },
          ],
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Régression linéaire simple

### ✅ Quand utiliser ce type de modèle

La régression linéaire simple est adaptée pour :

- **Modéliser une relation linéaire** entre 2 variables quantitatives
- **Prédire** une variable Y à partir de X
- **Quantifier l'impact** : "combien Y change quand X augmente de 1"
- **Identifier des outliers** : points éloignés de la droite
- **Valider une hypothèse** : "X influence-t-il Y ?"

**Forme du modèle :**
$$y = ax + b$$

Où :
- $a$ = pente (changement de Y par unité de X)
- $b$ = ordonnée à l'origine (valeur de Y quand X = 0)

### ❌ Quand ne pas utiliser

- **Relation non-linéaire** : exponentielle, logarithmique, polynomiale
- **Variables catégorielles** : ANOVA ou régression logistique
- **Corrélation nulle** (r ≈ 0) : pas de relation à modéliser
- **Outliers influents** : un point peut fausser toute la droite
- **Hétéroscédasticité** : variance non constante des résidus

### 📊 Analyse de ce graphique

**Équation de régression :**
$$Note = ${slope.toFixed(2)} \\times Heures + ${intercept.toFixed(2)}$$

**Interprétation :**
- Chaque heure d'étude supplémentaire → **+${slope.toFixed(2)} points**
- Un étudiant qui n'étudie pas (0h) → note prédite de **${intercept.toFixed(1)}/20**
- Coefficient de corrélation r = **${r.toFixed(3)}** → corrélation forte positive

**Métriques du modèle :**
| Indicateur | Valeur | Interprétation |
|------------|--------|----------------|
| r | ${r.toFixed(3)} | Corrélation forte |
| R² | ${r2.toFixed(3)} | ${(r2 * 100).toFixed(0)} % de variance expliquée |
| Pente (a) | ${slope.toFixed(2)} | +${slope.toFixed(2)} pts/heure |
| Intercept (b) | ${intercept.toFixed(1)} | Note de base |

### 📈 Profils identifiés

| Profil | Description | Action |
|--------|-------------|--------|
| 🔴 En difficulté | Notes < 10, peu d'heures | Remise à niveau urgente |
| 🟠 Moyen | Notes 10-12, travail irrégulier | Structurer le travail |
| 🟢 Bon | Notes 12-14, régulier | Encourager |
| 🔵 Très bon | Notes 14-16, très investi | Autonomie |
| 💜 Excellent | Notes > 16, passionné | Projet avancé |
| 🩵 Efficace | Bonnes notes, peu d'heures | Méthode à partager |
| 💗 À accompagner | Heures ++ mais notes moyennes | Coaching méthodologique |

### 🧮 Méthode des moindres carrés

**Objectif :** minimiser la somme des erreurs au carré

$$\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 = \\sum_{i=1}^{n} (y_i - (ax_i + b))^2$$

**Formules :**
$$a = \\frac{n\\sum xy - \\sum x \\sum y}{n\\sum x^2 - (\\sum x)^2}$$

$$b = \\bar{y} - a\\bar{x}$$

**En JavaScript :**
\`\`\`javascript
const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
const intercept = (sumY - slope * sumX) / n;
\`\`\`

### 🔧 Fonctionnalités ECharts utilisées

- **Multi-séries scatter** : un type par profil étudiant
- **Symboles différenciés** : accessibilité
- **line** : droite de régression
- **markLine** : lignes de référence (moyenne, seuil)
- **markArea** : zone de danger (notes < 10)
- **Couleurs sémantiques** : rouge = danger, vert = bon

### 📏 Interprétation du R²

| R² | Interprétation |
|----|----------------|
| < 0.3 | Faible : autres facteurs importants |
| 0.3 - 0.5 | Modéré : relation existe mais partielle |
| 0.5 - 0.7 | Bon : relation significative |
| 0.7 - 0.9 | Fort : modèle prédictif fiable |
| > 0.9 | Très fort : quasi-déterministe |

**Ici R² = ${r2.toFixed(3)} :** Le temps d'étude explique **${(r2 * 100).toFixed(0)} %** de la variance des notes.

Les ${((1 - r2) * 100).toFixed(0)} % restants dépendent d'autres facteurs :
- Intelligence de base
- Qualité du sommeil
- Méthode de travail
- Motivation
- Santé mentale
- Environnement familial

### ⚠️ Corrélation ≠ Causalité

**Attention aux conclusions hâtives !**

Ce graphique montre une **corrélation** entre heures et notes, mais :
- Est-ce que travailler plus **cause** de meilleures notes ?
- Ou est-ce que les bons élèves **aiment** travailler plus ?
- Ou y a-t-il un 3e facteur (motivation) qui cause les deux ?

**Pour prouver la causalité :**
- Expérience contrôlée (randomized trial)
- Analyse longitudinale
- Variables de contrôle

### 💡 Tips pour scatter + régression

1. **Toujours afficher R²** : indique la qualité du modèle
2. **Vérifier les résidus** : doivent être aléatoires
3. **Identifier les outliers** : les mettre en évidence
4. **Intervalles de confiance** : bande autour de la droite
5. **Ne pas extrapoler** : le modèle n'est valide que dans la plage des données

### 🚀 Pour aller plus loin

- **Régression multiple** : y = a₁x₁ + a₂x₂ + ... + b
- **Intervalles de prédiction** : plage probable pour un nouveau point
- **Tests statistiques** : t-test sur les coefficients
- **Validation croisée** : train/test split
`;

export default function LinearRegression() {
  return (
    <ChartEditor
      title="Linear Regression"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
