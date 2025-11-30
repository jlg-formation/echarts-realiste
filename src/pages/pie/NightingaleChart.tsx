import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Répartition des sinistres d'une compagnie d'assurance - 2024
const sinistres = [
  {
    type: "Automobile",
    montant: 2850,
    nombre: 12400,
    icone: "🚗",
    couleur: "#ef4444",
    coutMoyen: 230,
    evolution: "+5 %",
  },
  {
    type: "Habitation",
    montant: 1920,
    nombre: 8200,
    icone: "🏠",
    couleur: "#3b82f6",
    coutMoyen: 234,
    evolution: "+12 %",
  },
  {
    type: "Santé",
    montant: 1680,
    nombre: 45000,
    icone: "🏥",
    couleur: "#22c55e",
    coutMoyen: 37,
    evolution: "+3 %",
  },
  {
    type: "Responsabilité civile",
    montant: 890,
    nombre: 3100,
    icone: "⚖️",
    couleur: "#8b5cf6",
    coutMoyen: 287,
    evolution: "-2 %",
  },
  {
    type: "Catastrophe naturelle",
    montant: 780,
    nombre: 2800,
    icone: "🌊",
    couleur: "#f59e0b",
    coutMoyen: 279,
    evolution: "+28 %",
  },
  {
    type: "Vol / Vandalisme",
    montant: 420,
    nombre: 4500,
    icone: "🔓",
    couleur: "#64748b",
    coutMoyen: 93,
    evolution: "-8 %",
  },
  {
    type: "Incendie",
    montant: 380,
    nombre: 890,
    icone: "🔥",
    couleur: "#dc2626",
    coutMoyen: 427,
    evolution: "+1 %",
  },
  {
    type: "Autres",
    montant: 280,
    nombre: 3200,
    icone: "📋",
    couleur: "#94a3b8",
    coutMoyen: 88,
    evolution: "0 %",
  },
];

const totalMontant = sinistres.reduce((acc, s) => acc + s.montant, 0);
const totalNombre = sinistres.reduce((acc, s) => acc + s.nombre, 0);
const top3Part = (
  ((sinistres[0].montant + sinistres[1].montant + sinistres[2].montant) /
    totalMontant) *
  100
).toFixed(0);

const option: EChartsOption = {
  title: {
    text: "Sinistres déclarés par type - Assurance MAEF",
    subtext: `Année 2024 · ${(totalMontant / 1000).toFixed(1)} Md € · ${(totalNombre / 1000).toFixed(0)} k dossiers · Top 3 = ${top3Part} %`,
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
      const p = params as { name: string; value: number; percent: number };
      const sinistre = sinistres.find((s) => s.type === p.name);
      if (!sinistre) return "";
      const evolutionColor = sinistre.evolution.startsWith("+")
        ? "#ef4444"
        : sinistre.evolution.startsWith("-")
          ? "#22c55e"
          : "#94a3b8";
      const evolutionIcon = sinistre.evolution.startsWith("+")
        ? "📈"
        : sinistre.evolution.startsWith("-")
          ? "📉"
          : "➡️";
      return `
        <b>${sinistre.icone} ${p.name}</b><br/><br/>
        Montant total : <b>${sinistre.montant.toLocaleString("fr-FR")} M €</b> (${p.percent.toFixed(1)} %)<br/>
        Nombre de dossiers : ${sinistre.nombre.toLocaleString("fr-FR")}<br/>
        Coût moyen : ${sinistre.coutMoyen.toLocaleString("fr-FR")} €<br/>
        <span style="color: ${evolutionColor}">${evolutionIcon} vs 2023 : ${sinistre.evolution}</span>
      `;
    },
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
    textStyle: {
      fontSize: 11,
    },
    formatter: (name: string) => {
      const sinistre = sinistres.find((s) => s.type === name);
      return sinistre ? `${sinistre.icone} ${name}` : name;
    },
  },
  series: [
    {
      name: "Sinistres par type",
      type: "pie",
      radius: ["15%", "70%"],
      center: ["55%", "55%"],
      roseType: "area",
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 8,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number };
          const sinistre = sinistres.find((s) => s.type === p.name);
          return `${sinistre?.icone || ""} ${p.name}\n${p.value} M €`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10,
        smooth: true,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 25,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.4)",
        },
      },
      data: sinistres.map((sinistre, index) => ({
        value: sinistre.montant,
        name: sinistre.type,
        itemStyle: {
          color: sinistre.couleur,
          shadowBlur: index === 0 ? 15 : 0,
          shadowColor: index === 0 ? "rgba(239, 68, 68, 0.4)" : "transparent",
        },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Nightingale Chart (Rose Diagram)

### ✅ Quand utiliser ce type de diagramme

Le diagramme de Nightingale (ou rose) est idéal pour :

- **Mettre en évidence les écarts importants** : le rayon variable amplifie les différences
- **Données ordonnées par magnitude** : du plus grand au plus petit
- **Impact visuel fort** : format original qui marque les esprits
- **Présentation exécutive** : synthèse visuelle percutante
- **Données cycliques avec variations** : saisons, mois, catégories

**Exemples concrets :**
- Répartition des sinistres par type
- Ventes par région avec écarts significatifs
- Causes de mortalité (usage historique de Florence Nightingale)
- Budget par département

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le Nightingale chart dans ces cas :

- **Valeurs proches** : les différences de rayon seront imperceptibles
- **Comparaisons précises** : le rayon biaise la perception des proportions
- **Nombreuses catégories** (> 10) : devient illisible
- **Public non averti** : moins intuitif qu'un pie classique
- **Données négatives** : impossible à représenter

### 🔧 Fonctionnalités ECharts utilisées

- **roseType: "area"** : l'aire (et non le rayon) varie selon la valeur
- **radius: ["15%", "70%"]** : doughnut avec petit trou central
- **borderRadius: 8** : coins arrondis modernes
- **labelLine.smooth: true** : lignes de label courbes
- **shadowBlur sur le 1er** : mise en valeur du plus gros sinistre

### 📊 Analyse de ce graphique

Ce graphique présente la sinistralité d'une compagnie d'assurance en 2024 :

- **🚗 Automobile = 31 %** : 2,85 Md € (poste n°1)
- **🏠 Habitation = 21 %** : forte hausse (+12 %) liée aux intempéries
- **🌊 Catastrophes naturelles** : +28 % vs 2023 (changement climatique)
- **🔓 Vol en baisse** : -8 % grâce à la vidéosurveillance

**Coût moyen par type :**
| Type | Coût moyen | Fréquence | Risque |
|------|------------|-----------|--------|
| Incendie | 427 € | Faible | Élevé |
| RC Pro | 287 € | Moyenne | Élevé |
| Catnat | 279 € | Variable | Très élevé |
| Auto | 230 € | Haute | Moyen |
| Habitation | 234 € | Haute | Moyen |
| Santé | 37 € | Très haute | Faible |

### 📈 Tendances sectorielles

**Évolutions majeures 2024 :**
1. **Climat** : +28 % de sinistres catastrophes naturelles
2. **Cyber** : nouveau risque émergent (non représenté)
3. **Inflation** : coûts de réparation en hausse
4. **Prévention** : baisse des vols (-8 %)

**Ratio sinistres/primes (S/P) par branche :**
| Branche | S/P 2024 | Cible |
|---------|----------|-------|
| Auto | 78 % | < 75 % |
| Habitation | 82 % | < 70 % |
| Santé | 85 % | < 90 % |
| RC | 65 % | < 70 % |

### 💡 Tips design roseType

- **roseType: "radius"** → le rayon varie (différences accentuées)
- **roseType: "area"** → l'aire varie (différences plus fidèles)
- Triez les données du plus grand au plus petit
- Utilisez des **ombres** sur le segment dominant
- Ajoutez le **pourcentage** dans les labels pour la précision
`;

export default function NightingaleChart() {
  return (
    <ChartEditor
      title="Nightingale Chart"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
