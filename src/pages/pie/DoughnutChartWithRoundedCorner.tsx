import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Répartition des dépenses d'un ménage français - Budget mensuel 2024
const depenses = [
  { poste: "Logement", montant: 1250, icone: "🏠", couleur: "#6366f1" },
  { poste: "Alimentation", montant: 580, icone: "🛒", couleur: "#22c55e" },
  { poste: "Transport", montant: 420, icone: "🚗", couleur: "#3b82f6" },
  { poste: "Santé", montant: 180, icone: "💊", couleur: "#ef4444" },
  { poste: "Loisirs", montant: 350, icone: "🎬", couleur: "#f59e0b" },
  { poste: "Épargne", montant: 400, icone: "💰", couleur: "#10b981" },
  { poste: "Éducation", montant: 220, icone: "📚", couleur: "#8b5cf6" },
  { poste: "Vêtements", montant: 150, icone: "👕", couleur: "#ec4899" },
  { poste: "Autres", montant: 250, icone: "📦", couleur: "#94a3b8" },
];

const totalBudget = depenses.reduce((acc, d) => acc + d.montant, 0);

const option: EChartsOption = {
  title: {
    text: "Répartition des dépenses mensuelles",
    subtext: `Budget total : ${totalBudget.toLocaleString("fr-FR")} € · Ménage avec 2 enfants · Île-de-France`,
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
      const dep = depenses.find((d) => d.poste === p.name);
      if (!dep) return "";
      const pourcentageRef = {
        Logement: 33,
        Alimentation: 15,
        Transport: 11,
        Santé: 5,
        Loisirs: 9,
        Épargne: 10,
        Éducation: 6,
        Vêtements: 4,
        Autres: 7,
      };
      const ref = pourcentageRef[dep.poste as keyof typeof pourcentageRef] || 0;
      const ecart = p.percent - ref;
      const ecartText =
        ecart > 1
          ? `⚠️ +${ecart.toFixed(1)} pts vs moyenne`
          : ecart < -1
            ? `✅ ${ecart.toFixed(1)} pts vs moyenne`
            : "≈ moyenne nationale";
      return `
        <b>${dep.icone} ${p.name}</b><br/><br/>
        Montant : <b>${dep.montant.toLocaleString("fr-FR")} €</b>/mois<br/>
        Part du budget : <b>${p.percent.toFixed(1)} %</b><br/>
        ${ecartText}
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
      const dep = depenses.find((d) => d.poste === name);
      return dep ? `${dep.icone} ${name}` : name;
    },
  },
  series: [
    {
      name: "Dépenses",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["55%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 3,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number };
          const dep = depenses.find((d) => d.poste === p.name);
          return `${dep?.icone || ""} ${p.name}\n${p.value.toLocaleString("fr-FR")} €`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      data: depenses.map((d) => ({
        value: d.montant,
        name: d.poste,
        itemStyle: { color: d.couleur },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Doughnut Chart avec coins arrondis

### ✅ Quand utiliser ce type de diagramme

Le doughnut chart (anneau) avec coins arrondis est idéal pour :

- **Montrer une métrique centrale** : le trou au milieu peut afficher un total ou KPI
- **Données de budget/répartition** : visuellement moderne et élégant
- **Dashboards exécutifs** : style épuré apprécié en entreprise
- **Comparaison avec une référence** : espace central pour contexte
- **Design moderne** : les coins arrondis adoucissent le visuel

**Exemples concrets :**
- Répartition budget ménage ou entreprise
- Distribution des coûts projet
- Allocation d'actifs portfolio
- Temps passé par activité

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce chart dans ces cas :

- **Trop de catégories (> 8)** : les segments deviennent trop fins
- **Comparaisons précises nécessaires** : un bar chart sera plus lisible
- **Données avec valeurs négatives** : impossible à représenter
- **Petits écrans mobiles** : les labels peuvent se chevaucher

### 🔧 Fonctionnalités ECharts utilisées

- **radius: ["40%", "70%"]** : crée l'effet doughnut (trou au centre)
- **itemStyle.borderRadius: 10** : coins arrondis modernes
- **borderWidth: 3** : séparation nette entre segments
- **center: ["55%", "55%"]** : décalage pour la légende à gauche
- **avoidLabelOverlap: true** : évite les chevauchements de texte

### 📊 Analyse de ce graphique

Ce graphique présente le budget mensuel d'un ménage français avec 2 enfants en Île-de-France :

- **🏠 Logement dominant** : 33 % du budget (1 250 €), conforme à la moyenne nationale
- **💰 Épargne saine** : 10,5 % du budget, signe d'une bonne gestion
- **🚗 Transport élevé** : 11 % lié à la vie en périphérie parisienne
- **🎬 Loisirs modérés** : 9 %, équilibre vie professionnelle/personnelle

**Comparaison avec la moyenne INSEE :**
| Poste | Ce ménage | Moyenne France |
|-------|-----------|----------------|
| Logement | 33 % | 28 % |
| Alimentation | 15 % | 17 % |
| Transport | 11 % | 14 % |
| Épargne | 10 % | 6 % |

**Observations clés :**
1. Le logement pèse lourd (Île-de-France)
2. L'épargne est supérieure à la moyenne → bon signe financier
3. Le transport est maîtrisé (télétravail partiel ?)

### 🎯 Tips de design

- Les **coins arrondis** (borderRadius) donnent un aspect plus moderne
- Un **borderWidth** suffisant évite la confusion visuelle
- Le **trou central** peut contenir un chiffre clé (ici laissé vide pour clarté)
`;

export default function DoughnutChartWithRoundedCorner() {
  return (
    <ChartEditor
      title="Doughnut Chart with Rounded Corner"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
