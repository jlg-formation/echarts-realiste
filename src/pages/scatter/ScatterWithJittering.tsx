import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Répartition des salaires par niveau d'expérience - avec jittering
// Contexte : étude RH sur les rémunérations IT en France

// Génération de données réalistes avec jittering pour éviter la superposition
const generateSalaryData = () => {
  const data: {
    experience: number;
    salaire: number;
    experienceJitter: number;
    profil: string;
    poste: string;
  }[] = [];

  // Fonction pour ajouter du jitter (bruit aléatoire)
  const jitter = (value: number, range: number) =>
    value + (Math.random() - 0.5) * range;

  // Junior (0-2 ans)
  const juniorSalaries = [32, 34, 35, 36, 38, 40, 42, 33, 37, 39, 41, 35, 36];
  juniorSalaries.forEach((sal) => {
    const exp = Math.random() * 2;
    data.push({
      experience: exp,
      salaire: sal * 1000,
      experienceJitter: jitter(exp, 0.3),
      profil: "Junior",
      poste: ["Dev Frontend", "Dev Backend", "QA", "DevOps"][
        Math.floor(Math.random() * 4)
      ],
    });
  });

  // Confirmé (2-5 ans)
  const confirmeSalaries = [
    42, 45, 48, 50, 52, 55, 47, 49, 51, 53, 46, 54, 48, 50, 52,
  ];
  confirmeSalaries.forEach((sal) => {
    const exp = 2 + Math.random() * 3;
    data.push({
      experience: exp,
      salaire: sal * 1000,
      experienceJitter: jitter(exp, 0.4),
      profil: "Confirmé",
      poste: ["Dev Fullstack", "Lead Dev", "Architecte Jr", "SRE"][
        Math.floor(Math.random() * 4)
      ],
    });
  });

  // Senior (5-10 ans)
  const seniorSalaries = [
    55, 58, 60, 62, 65, 68, 70, 72, 75, 57, 63, 67, 71, 59, 64, 69, 73,
  ];
  seniorSalaries.forEach((sal) => {
    const exp = 5 + Math.random() * 5;
    data.push({
      experience: exp,
      salaire: sal * 1000,
      experienceJitter: jitter(exp, 0.5),
      profil: "Senior",
      poste: [
        "Tech Lead",
        "Architecte",
        "Staff Engineer",
        "Engineering Manager",
      ][Math.floor(Math.random() * 4)],
    });
  });

  // Expert (10+ ans)
  const expertSalaries = [75, 80, 85, 90, 95, 100, 110, 78, 88, 92, 105];
  expertSalaries.forEach((sal) => {
    const exp = 10 + Math.random() * 8;
    data.push({
      experience: exp,
      salaire: sal * 1000,
      experienceJitter: jitter(exp, 0.6),
      profil: "Expert",
      poste: [
        "Principal Engineer",
        "CTO",
        "VP Engineering",
        "Distinguished Engineer",
      ][Math.floor(Math.random() * 4)],
    });
  });

  return data;
};

const salaryData = generateSalaryData();

// Couleurs et symboles par profil
const profilConfig: Record<string, { color: string; symbol: string }> = {
  Junior: { color: "#22c55e", symbol: "circle" },
  Confirmé: { color: "#3b82f6", symbol: "triangle" },
  Senior: { color: "#f59e0b", symbol: "rect" },
  Expert: { color: "#8b5cf6", symbol: "diamond" },
};

// Statistiques par profil
const statsByProfil = Object.keys(profilConfig).map((profil) => {
  const profilData = salaryData.filter((d) => d.profil === profil);
  const salaires = profilData.map((d) => d.salaire);
  const moyenne = salaires.reduce((a, b) => a + b, 0) / salaires.length;
  const min = Math.min(...salaires);
  const max = Math.max(...salaires);
  return { profil, moyenne, min, max, count: profilData.length };
});

// Moyennes pour les lignes de référence
const moyenneGlobale =
  salaryData.reduce((a, b) => a + b.salaire, 0) / salaryData.length;

const option: EChartsOption = {
  title: {
    text: "Salaires IT en France - Distribution par expérience",
    subtext: `${salaryData.length} profils analysés · Jittering appliqué pour visualiser les clusters · Moyenne : ${(moyenneGlobale / 1000).toFixed(0)}k €`,
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
      const expJitter = p.data[0];
      const salaire = p.data[1];

      // Retrouver le point original
      const point = salaryData.find(
        (d) =>
          Math.abs(d.experienceJitter - expJitter) < 0.01 &&
          d.salaire === salaire
      );

      if (!point) return "";

      const ecartMoyenne = salaire - moyenneGlobale;
      const pctMoyenne = (ecartMoyenne / moyenneGlobale) * 100;

      return `
        <b>👤 ${point.poste}</b><br/><br/>
        Profil : <b>${point.profil}</b><br/>
        Expérience : <b>${point.experience.toFixed(1)} ans</b><br/>
        Salaire : <b>${(salaire / 1000).toFixed(0)}k € brut/an</b><br/>
        <span style="color: ${ecartMoyenne > 0 ? "#22c55e" : "#ef4444"}">
          ${ecartMoyenne > 0 ? "+" : ""}${pctMoyenne.toFixed(0)} % vs moyenne
        </span>
      `;
    },
  },
  legend: {
    top: 60,
    data: Object.keys(profilConfig),
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 80,
    right: 40,
    top: 100,
    bottom: 60,
  },
  xAxis: {
    type: "value",
    name: "Années d'expérience",
    nameLocation: "middle",
    nameGap: 35,
    min: -0.5,
    max: 20,
    axisLabel: {
      formatter: "{value} ans",
    },
  },
  yAxis: {
    type: "value",
    name: "Salaire brut annuel (€)",
    min: 25000,
    max: 120000,
    axisLabel: {
      formatter: (value: number) => `${(value / 1000).toFixed(0)}k €`,
    },
  },
  series: [
    // Points par profil avec jittering
    ...Object.entries(profilConfig).map(([profil, config]) => ({
      name: profil,
      type: "scatter" as const,
      data: salaryData
        .filter((d) => d.profil === profil)
        .map((d) => [d.experienceJitter, d.salaire]),
      symbolSize: 12,
      symbol: config.symbol,
      itemStyle: {
        color: config.color,
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
          opacity: 1,
        },
      },
    })),
    // Ligne de tendance globale
    {
      name: "Tendance",
      type: "line",
      data: [
        [0, 35000],
        [5, 52000],
        [10, 68000],
        [15, 85000],
        [20, 100000],
      ],
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#94a3b8",
        width: 2,
        type: "dashed",
      },
    },
    // Ligne moyenne
    {
      name: "Références",
      type: "line",
      markLine: {
        silent: true,
        symbol: "none",
        data: [
          {
            yAxis: moyenneGlobale,
            label: {
              formatter: `Moyenne : ${(moyenneGlobale / 1000).toFixed(0)}k €`,
              position: "insideEndTop",
            },
            lineStyle: {
              color: "#6366f1",
              type: "dotted",
              width: 2,
            },
          },
        ],
      },
      markArea: {
        silent: true,
        data: [
          // Zone Junior
          [
            {
              xAxis: -0.5,
              itemStyle: {
                color: "rgba(34, 197, 94, 0.05)",
              },
            },
            { xAxis: 2 },
          ],
          // Zone Confirmé
          [
            {
              xAxis: 2,
              itemStyle: {
                color: "rgba(59, 130, 246, 0.05)",
              },
            },
            { xAxis: 5 },
          ],
          // Zone Senior
          [
            {
              xAxis: 5,
              itemStyle: {
                color: "rgba(245, 158, 11, 0.05)",
              },
            },
            { xAxis: 10 },
          ],
          // Zone Expert
          [
            {
              xAxis: 10,
              itemStyle: {
                color: "rgba(139, 92, 246, 0.05)",
              },
            },
            { xAxis: 20 },
          ],
        ],
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Scatter avec Jittering

### ✅ Quand utiliser le jittering

Le **jittering** (ajout de bruit aléatoire) est utile pour :

- **Données discrètes** : quand X ou Y ne prennent que certaines valeurs
- **Chevauchement massif** : beaucoup de points au même endroit
- **Visualiser la densité** : voir combien de points sont groupés
- **Éviter l'overplotting** : ne pas cacher des données

**Technique :**
\`\`\`javascript
const jitter = (value, range) => value + (Math.random() - 0.5) * range;
const xJittered = jitter(originalX, 0.5); // ±0.25 de bruit
\`\`\`

### ❌ Quand ne pas utiliser

- **Données continues précises** : le jitter fausse la lecture exacte
- **Peu de points** : pas nécessaire si pas de superposition
- **Corrélation fine** : le bruit masque les tendances subtiles
- **Export pour analyse** : toujours conserver les données originales

### 📊 Analyse de ce graphique

**Répartition des salaires IT en France :**

| Profil | Expérience | Salaire moyen | Fourchette |
|--------|------------|---------------|------------|
| 🟢 Junior | 0-2 ans | ${(statsByProfil[0].moyenne / 1000).toFixed(0)}k € | ${(statsByProfil[0].min / 1000).toFixed(0)}-${(statsByProfil[0].max / 1000).toFixed(0)}k € |
| 🔵 Confirmé | 2-5 ans | ${(statsByProfil[1].moyenne / 1000).toFixed(0)}k € | ${(statsByProfil[1].min / 1000).toFixed(0)}-${(statsByProfil[1].max / 1000).toFixed(0)}k € |
| 🟠 Senior | 5-10 ans | ${(statsByProfil[2].moyenne / 1000).toFixed(0)}k € | ${(statsByProfil[2].min / 1000).toFixed(0)}-${(statsByProfil[2].max / 1000).toFixed(0)}k € |
| 🟣 Expert | 10+ ans | ${(statsByProfil[3].moyenne / 1000).toFixed(0)}k € | ${(statsByProfil[3].min / 1000).toFixed(0)}-${(statsByProfil[3].max / 1000).toFixed(0)}k € |

**Observations :**
- Forte dispersion au sein de chaque niveau (postes différents)
- Croissance rapide jusqu'à 10 ans, puis plateau
- Quelques "outliers" dans les profils Expert (CTO, VP)

### 🔧 Fonctionnalités ECharts utilisées

- **Scatter avec jittering** : bruit ajouté sur l'axe X
- **Symboles par catégorie** : cercle, triangle, carré, losange
- **Ligne de tendance** : courbe lissée globale
- **markArea** : zones colorées par niveau d'expérience
- **markLine** : moyenne horizontale

### 💡 Alternatives au jittering

| Technique | Cas d'usage | Limite |
|-----------|-------------|--------|
| **Jittering** | < 500 points | Fausse les coordonnées |
| **Transparence** | Densité moyenne | Couleurs plus fades |
| **Hexbin** | > 1000 points | Perte du détail individuel |
| **Violin plot** | Distribution | Pas de points individuels |
| **Beeswarm** | Catégories | Calcul plus complexe |

### 📈 Facteurs de variation des salaires

**Facteurs objectifs :**
- Années d'expérience (corrélation forte)
- Type de poste (Dev vs Manager vs Architecte)
- Technologie (Rust/Go > PHP/Java souvent)
- Taille entreprise (startup vs grand groupe)

**Facteurs géographiques :**
- Paris : +20-30 % vs province
- Remote US : +50-100 % (en USD)
- Freelance : +40 % mais variable

**Facteurs négociés :**
- Entrée vs promotion interne
- Concurrence sur le profil
- Période économique

### ⚠️ Pièges d'interprétation

1. **Biais de sélection** : les données viennent d'où ? (enquête, LinkedIn, offres)
2. **Confusion variable/fixe** : bonus, RSU, intéressement inclus ?
3. **Brut vs net** : écart de ~25 % en France
4. **Temps plein vs partiel** : ramener au FTE
5. **Ancienneté ≠ Expérience** : changements de carrière

### 🧮 Implémentation du jittering

**Jittering simple :**
\`\`\`javascript
const jitteredData = data.map(d => ({
  ...d,
  xJitter: d.x + (Math.random() - 0.5) * jitterAmount
}));
\`\`\`

**Jittering gaussien (plus naturel) :**
\`\`\`javascript
function gaussianRandom(mean, std) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z * std + mean;
}

const xJitter = gaussianRandom(d.x, jitterStd);
\`\`\`

**Seed pour reproductibilité :**
\`\`\`javascript
import seedrandom from 'seedrandom';
const rng = seedrandom('my-seed');
const jitter = (val, range) => val + (rng() - 0.5) * range;
\`\`\`

### 🚀 Pour aller plus loin

- **Beeswarm plot** : jittering intelligent qui évite les collisions
- **Strip plot** : scatter catégoriel avec jittering vertical
- **Rain cloud plot** : combiner violin + scatter + boxplot
- **Density estimation** : KDE pour visualiser la distribution continue
`;

export default function ScatterWithJittering() {
  return (
    <ChartEditor
      title="Scatter with Jittering"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
