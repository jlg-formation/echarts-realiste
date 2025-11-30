import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Budget d'entreprise - Structure par département et postes de dépenses
const departements = [
  {
    nom: "Technologie",
    budget: 4200,
    icone: "💻",
    couleur: "#3b82f6",
    postes: [
      { nom: "Salaires IT", montant: 2100 },
      { nom: "Infrastructure cloud", montant: 850 },
      { nom: "Licences logiciels", montant: 650 },
      { nom: "Matériel", montant: 400 },
      { nom: "Formation tech", montant: 200 },
    ],
  },
  {
    nom: "Commercial",
    budget: 3500,
    icone: "📈",
    couleur: "#22c55e",
    postes: [
      { nom: "Salaires commerciaux", montant: 1800 },
      { nom: "Marketing digital", montant: 750 },
      { nom: "Événements & salons", montant: 450 },
      { nom: "Déplacements", montant: 350 },
      { nom: "Outils CRM", montant: 150 },
    ],
  },
  {
    nom: "Opérations",
    budget: 2800,
    icone: "⚙️",
    couleur: "#f59e0b",
    postes: [
      { nom: "Logistique", montant: 1200 },
      { nom: "Locaux", montant: 800 },
      { nom: "Maintenance", montant: 450 },
      { nom: "Fournitures", montant: 200 },
      { nom: "Sécurité", montant: 150 },
    ],
  },
  {
    nom: "RH & Admin",
    budget: 1800,
    icone: "👥",
    couleur: "#8b5cf6",
    postes: [
      { nom: "Salaires RH", montant: 650 },
      { nom: "Recrutement", montant: 400 },
      { nom: "Formation", montant: 350 },
      { nom: "Avantages sociaux", montant: 250 },
      { nom: "Services généraux", montant: 150 },
    ],
  },
  {
    nom: "Finance & Juridique",
    budget: 1200,
    icone: "💰",
    couleur: "#ef4444",
    postes: [
      { nom: "Salaires finance", montant: 500 },
      { nom: "Audit & conseil", montant: 350 },
      { nom: "Assurances", montant: 200 },
      { nom: "Frais juridiques", montant: 150 },
    ],
  },
  {
    nom: "R&D",
    budget: 1500,
    icone: "🔬",
    couleur: "#06b6d4",
    postes: [
      { nom: "Salaires chercheurs", montant: 900 },
      { nom: "Prototypage", montant: 300 },
      { nom: "Brevets", montant: 200 },
      { nom: "Partenariats", montant: 100 },
    ],
  },
];

const totalBudget = departements.reduce((acc, d) => acc + d.budget, 0);
const topDept = departements[0];

// Données pour l'anneau extérieur (postes détaillés)
const postesData: { name: string; value: number; departement: string }[] = [];
departements.forEach((dept) => {
  dept.postes.forEach((poste) => {
    postesData.push({
      name: poste.nom,
      value: poste.montant,
      departement: dept.nom,
    });
  });
});

// Couleurs pour les postes (dégradés par département)
const getPosteColor = (departement: string, index: number): string => {
  const dept = departements.find((d) => d.nom === departement);
  if (!dept) return "#94a3b8";

  const baseColor = dept.couleur;
  // Créer des variations de luminosité
  const opacity = 1 - index * 0.15;
  return `color-mix(in srgb, ${baseColor} ${Math.max(40, opacity * 100)}%, white)`;
};

const option: EChartsOption = {
  title: {
    text: "Budget annuel TechCorp 2024",
    subtext: `Total : ${(totalBudget / 1000).toFixed(1)} M € · 💻 ${topDept.nom} = ${((topDept.budget / totalBudget) * 100).toFixed(0)} % du budget`,
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
        seriesName: string;
        name: string;
        value: number;
        percent: number;
      };
      if (p.seriesName === "Départements") {
        const dept = departements.find((d) => d.nom === p.name);
        if (!dept) return "";
        return `
          <b>${dept.icone} ${p.name}</b><br/><br/>
          Budget : <b>${dept.budget.toLocaleString("fr-FR")} k €</b><br/>
          Part du total : ${p.percent.toFixed(1)} %<br/><br/>
          <b>Principaux postes :</b><br/>
          ${dept.postes
            .slice(0, 3)
            .map(
              (poste) =>
                `• ${poste.nom} : ${poste.montant.toLocaleString("fr-FR")} k €`
            )
            .join("<br/>")}
        `;
      } else {
        // Poste détaillé
        const posteInfo = postesData.find((pd) => pd.name === p.name);
        const dept = departements.find((d) => d.nom === posteInfo?.departement);
        return `
          <b>${p.name}</b><br/>
          Département : ${dept?.icone || ""} ${posteInfo?.departement}<br/><br/>
          Montant : <b>${p.value.toLocaleString("fr-FR")} k €</b><br/>
          Part du département : ${p.percent.toFixed(1)} %
        `;
      }
    },
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
    data: departements.map((d) => d.nom),
    textStyle: {
      fontSize: 11,
    },
    formatter: (name: string) => {
      const dept = departements.find((d) => d.nom === name);
      return dept ? `${dept.icone} ${name}` : name;
    },
  },
  series: [
    // Anneau intérieur : départements
    {
      name: "Départements",
      type: "pie",
      radius: ["25%", "45%"],
      center: ["55%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 3,
        borderRadius: 4,
      },
      label: {
        show: true,
        position: "inside",
        formatter: (params: unknown) => {
          const p = params as { name: string; percent: number };
          const dept = departements.find((d) => d.nom === p.name);
          return `${dept?.icone || ""}\n${p.percent.toFixed(0)} %`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      data: departements.map((dept) => ({
        value: dept.budget,
        name: dept.nom,
        itemStyle: {
          color: dept.couleur,
        },
      })),
    },
    // Anneau extérieur : postes détaillés
    {
      name: "Postes",
      type: "pie",
      radius: ["50%", "70%"],
      center: ["55%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 1,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number };
          // Afficher seulement les postes importants
          if (p.value >= 500) {
            return `${p.name}\n${p.value} k €`;
          }
          return "";
        },
        fontSize: 9,
        lineHeight: 12,
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 8,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 11,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 15,
          shadowColor: "rgba(0, 0, 0, 0.2)",
        },
      },
      data: postesData.map((poste) => {
        const deptIndex = departements.findIndex(
          (d) => d.nom === poste.departement
        );
        const posteIndexInDept = departements[deptIndex]?.postes.findIndex(
          (p) => p.nom === poste.name
        );
        return {
          value: poste.value,
          name: poste.name,
          itemStyle: {
            color: getPosteColor(poste.departement, posteIndexInDept || 0),
          },
        };
      }),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Nested Pies (Pies imbriqués)

### ✅ Quand utiliser ce type de diagramme

Les pies imbriqués sont parfaits pour :

- **Structure hiérarchique** : catégories → sous-catégories
- **Drill-down visuel** : vue globale + détail simultané
- **Budget avec postes** : départements + lignes budgétaires
- **Organisation** : divisions → équipes
- **Taxonomie** : familles → espèces

**Exemples concrets :**
- Budget entreprise par département et postes
- Ventes par région et produits
- Trafic web par source et campagne
- Émissions CO₂ par secteur et sous-secteur

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez les nested pies dans ces cas :

- **Plus de 2 niveaux** : devient illisible (préférez treemap)
- **Trop de segments** (> 20 au total) : confusion visuelle
- **Comparaison temporelle** : impossible à représenter
- **Sous-catégories de tailles très inégales** : les petits segments disparaissent
- **Données précises** : les angles sont difficiles à comparer

### 🔧 Fonctionnalités ECharts utilisées

- **2 séries pie** : une pour chaque niveau
- **radius différents** : \`["25%", "45%"]\` et \`["50%", "70%"]\`
- **center identique** : les deux anneaux sont concentriques
- **borderWidth** : séparation claire entre segments
- **label.position: "inside"** : labels dans l'anneau intérieur

### 📊 Analyse de ce graphique

Ce graphique présente le budget 2024 d'une entreprise tech :

- **💻 Technologie = 28 %** : premier poste (4,2 M €)
- **📈 Commercial = 23 %** : investissement croissance
- **⚙️ Opérations = 19 %** : coûts récurrents
- **🔬 R&D = 10 %** : ratio standard tech

**Répartition par département :**
| Département | Budget (k €) | Part | Tendance |
|-------------|--------------|------|----------|
| Technologie | 4 200 | 28 % | ↗️ +12 % |
| Commercial | 3 500 | 23 % | ↗️ +8 % |
| Opérations | 2 800 | 19 % | → stable |
| RH & Admin | 1 800 | 12 % | ↗️ +5 % |
| R&D | 1 500 | 10 % | ↗️ +15 % |
| Finance | 1 200 | 8 % | → stable |

**Top 5 postes de dépenses :**
1. 💻 Salaires IT : 2 100 k € (14 %)
2. 📈 Salaires commerciaux : 1 800 k € (12 %)
3. ⚙️ Logistique : 1 200 k € (8 %)
4. 🔬 Salaires R&D : 900 k € (6 %)
5. 💻 Infrastructure cloud : 850 k € (6 %)

### 🎯 Insights budgétaires

**Observations clés :**
- **Masse salariale = 45 %** du budget total (normale pour une entreprise de services)
- **Tech + R&D = 38 %** : ratio élevé = entreprise innovante
- **Cloud = 850 k €** : migration en cours depuis on-premise

**Benchmarks sectoriels :**
| Poste | TechCorp | Moyenne secteur |
|-------|----------|-----------------|
| R&D | 10 % | 8-12 % |
| Commercial | 23 % | 20-25 % |
| IT | 28 % | 15-20 % |
| RH | 12 % | 10-15 % |

### 💡 Tips pour nested pies

- Gardez les **mêmes couleurs de base** entre niveaux
- Utilisez des **nuances** pour les sous-catégories
- L'anneau intérieur = **catégories principales** avec labels
- L'anneau extérieur = **détails** (labels optionnels)
- **Triez** les segments par taille pour la lisibilité
- Le **tooltip** est essentiel pour les détails
`;

export default function NestedPies() {
  return (
    <ChartEditor
      title="Nested Pies"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
