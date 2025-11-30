import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Analyse de trésorerie - PME "TechSolutions" - Novembre 2024
// Le waterfall montre comment on passe du solde initial au solde final

interface FluxTresorerie {
  label: string;
  value: number;
  type: "initial" | "entree" | "sortie" | "total";
}

const flux: FluxTresorerie[] = [
  { label: "Solde initial\n01/11", value: 145000, type: "initial" },
  { label: "Factures clients", value: 89000, type: "entree" },
  { label: "Subvention R&D", value: 25000, type: "entree" },
  { label: "Salaires", value: -52000, type: "sortie" },
  { label: "Loyer & charges", value: -8500, type: "sortie" },
  { label: "Fournisseurs", value: -31000, type: "sortie" },
  { label: "Impôts T3", value: -18000, type: "sortie" },
  { label: "Remb. emprunt", value: -4200, type: "sortie" },
  { label: "Solde final\n30/11", value: 145300, type: "total" },
];

// Calculer les valeurs cumulées pour le waterfall
const calculateWaterfallData = () => {
  let cumul = 0;
  const data: {
    value: [number, number];
    itemStyle: { color: string; borderRadius: number[] };
  }[] = [];

  flux.forEach((f) => {
    if (f.type === "initial") {
      data.push({
        value: [0, f.value],
        itemStyle: {
          color: "#3498db",
          borderRadius: [4, 4, 0, 0],
        },
      });
      cumul = f.value;
    } else if (f.type === "total") {
      data.push({
        value: [0, f.value],
        itemStyle: {
          color: f.value >= flux[0].value ? "#27ae60" : "#e74c3c",
          borderRadius: [4, 4, 0, 0],
        },
      });
    } else {
      const base = cumul;
      cumul += f.value;
      if (f.value >= 0) {
        data.push({
          value: [base, cumul],
          itemStyle: {
            color: "#27ae60",
            borderRadius: [4, 4, 0, 0],
          },
        });
      } else {
        data.push({
          value: [cumul, base],
          itemStyle: {
            color: "#e74c3c",
            borderRadius: [0, 0, 4, 4],
          },
        });
      }
    }
  });

  return data;
};

const waterfallData = calculateWaterfallData();

const option: EChartsOption = {
  title: {
    text: "Analyse de trésorerie - TechSolutions - Novembre 2024",
    subtext:
      "💰 Variation nette : +300 € | Entrées : 114 k€ | Sorties : 113,7 k€",
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
      type: "shadow",
    },
    formatter: (params: unknown) => {
      const p = params as {
        name: string;
        value: [number, number];
        dataIndex: number;
      }[];
      const idx = p[0].dataIndex;
      const f = flux[idx];

      if (f.type === "initial" || f.type === "total") {
        return `
          <b>${f.label.replace("\n", " ")}</b><br/><br/>
          Solde : <b>${f.value.toLocaleString("fr-FR")} €</b>
        `;
      }

      const icon = f.value >= 0 ? "📈" : "📉";
      const color = f.value >= 0 ? "#27ae60" : "#e74c3c";
      const signe = f.value >= 0 ? "+" : "";

      return `
        <b>${f.label}</b><br/><br/>
        <span style="color: ${color}">${icon} ${signe}${f.value.toLocaleString("fr-FR")} €</span>
      `;
    },
  },
  legend: {
    data: ["Solde", "Entrées", "Sorties"],
    bottom: 10,
    itemWidth: 14,
    itemHeight: 14,
  },
  grid: {
    left: 80,
    right: 40,
    bottom: 80,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: flux.map((f) => f.label),
    axisLabel: {
      fontSize: 10,
      interval: 0,
      rotate: 0,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    name: "Montant (€)",
    nameLocation: "middle",
    nameGap: 55,
    min: 0,
    max: 180000,
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000) {
          return `${(value / 1000).toLocaleString("fr-FR")} k€`;
        }
        return `${value.toLocaleString("fr-FR")} €`;
      },
    },
  },
  series: [
    {
      name: "Trésorerie",
      type: "bar",
      barWidth: "50%",
      data: waterfallData,
      label: {
        show: true,
        position: "top",
        formatter: (params: unknown) => {
          const p = params as { dataIndex: number; value: [number, number] };
          const f = flux[p.dataIndex];
          if (f.type === "initial" || f.type === "total") {
            return `${(f.value / 1000).toLocaleString("fr-FR")} k€`;
          }
          const signe = f.value >= 0 ? "+" : "";
          return `${signe}${(f.value / 1000).toLocaleString("fr-FR")} k€`;
        },
        fontSize: 10,
        fontWeight: "bold",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en cascade (Waterfall Chart)

### ✅ Quand utiliser ce type de diagramme

Le diagramme en cascade est parfait pour :

- **Analyser les variations de trésorerie** : du solde initial au solde final
- **Décomposer un résultat** : comment on passe d'un état A à un état B
- **Visualiser des flux financiers** : revenus, dépenses, solde
- **Expliquer un écart de budget** : budget prévu vs réel avec détail des écarts
- **Montrer l'impact de chaque facteur** : contribution positive ou négative

**Exemples concrets :**
- Analyse de cash-flow mensuel
- Décomposition du chiffre d'affaires (prix x quantité - remises)
- Évolution de l'effectif (recrutements - départs)
- Variation de stock (entrées - sorties)

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le waterfall dans ces cas :

- **Données sans relation cumulative** : utilisez un bar chart classique
- **Trop d'éléments** (> 10-12) : le graphique devient illisible
- **Valeurs du même ordre de grandeur** : les variations seront imperceptibles
- **Comparaison entre catégories** : préférez un bar chart groupé
- **Évolution temporelle simple** : un line chart sera plus adapté

**Erreurs courantes à éviter :**
- Oublier le solde initial et/ou final
- Ne pas différencier visuellement les entrées (vert) des sorties (rouge)
- Utiliser des valeurs absolues au lieu de variations

### 🔧 Fonctionnalités ECharts utilisées

- **Barres flottantes** : utilisation de \`value: [base, top]\` pour positionner les barres
- **Couleurs sémantiques** : bleu (solde), vert (entrées), rouge (sorties)
- **Border radius adaptatif** : haut arrondi pour les hausses, bas arrondi pour les baisses
- **Labels dynamiques** : affichent la valeur avec signe + ou -

### 📊 Analyse de ce graphique

Ce waterfall montre l'évolution de la trésorerie de TechSolutions en novembre 2024 :

**Point de départ** : 145 000 € au 01/11

**Entrées (+114 000 €)** :
- Factures clients : +89 000 € (principale source)
- Subvention R&D : +25 000 € (aide ponctuelle)

**Sorties (-113 700 €)** :
- Salaires : -52 000 € (poste le plus important)
- Fournisseurs : -31 000 €
- Impôts T3 : -18 000 €
- Loyer & charges : -8 500 €
- Remboursement emprunt : -4 200 €

**Point d'arrivée** : 145 300 € au 30/11 → **+300 € net**

**Insight clé** : La trésorerie est stable mais tendue. Les salaires représentent 46% des sorties. Sans la subvention R&D, le mois aurait été déficitaire de 24 700 €.

**Décisions à prendre** :
1. Accélérer les encaissements clients (délai de paiement)
2. Anticiper les mois sans subvention (constituer une réserve)
3. Négocier les délais fournisseurs pour lisser les sorties
4. Prévoir une ligne de crédit pour les mois tendus
`;

export default function WaterfallChart() {
  return (
    <ChartEditor
      title="Waterfall Chart"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
