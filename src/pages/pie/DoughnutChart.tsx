import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Parts de marché des navigateurs web - Monde - Novembre 2024
const navigateurs = [
  {
    nom: "Chrome",
    part: 65.7,
    editeur: "Google",
    moteur: "Blink",
    couleur: "#4285f4",
  },
  {
    nom: "Safari",
    part: 18.5,
    editeur: "Apple",
    moteur: "WebKit",
    couleur: "#000000",
  },
  {
    nom: "Edge",
    part: 5.2,
    editeur: "Microsoft",
    moteur: "Blink",
    couleur: "#0078d7",
  },
  {
    nom: "Firefox",
    part: 2.8,
    editeur: "Mozilla",
    moteur: "Gecko",
    couleur: "#ff7139",
  },
  {
    nom: "Opera",
    part: 2.4,
    editeur: "Opera Software",
    moteur: "Blink",
    couleur: "#ff1b2d",
  },
  {
    nom: "Samsung Internet",
    part: 2.6,
    editeur: "Samsung",
    moteur: "Blink",
    couleur: "#1428a0",
  },
  {
    nom: "Autres",
    part: 2.8,
    editeur: "Divers",
    moteur: "Divers",
    couleur: "#94a3b8",
  },
];

const option: EChartsOption = {
  title: {
    text: "Parts de marché des navigateurs web",
    subtext:
      "Données mondiales - Novembre 2024 · Source : StatCounter GlobalStats",
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
      const nav = navigateurs.find((n) => n.nom === p.name);
      if (!nav) return "";
      const tendance =
        nav.nom === "Chrome"
          ? "📉 -2 pts vs 2023"
          : nav.nom === "Safari"
            ? "📈 +1.5 pts vs 2023"
            : nav.nom === "Edge"
              ? "📈 +0.8 pts vs 2023"
              : nav.nom === "Firefox"
                ? "📉 -0.5 pts vs 2023"
                : "≈ stable";
      return `
        <b>🌐 ${p.name}</b><br/><br/>
        Part de marché : <b>${nav.part} %</b><br/>
        Éditeur : ${nav.editeur}<br/>
        Moteur : ${nav.moteur}<br/>
        ${tendance}
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
  },
  series: [
    {
      name: "Parts de marché",
      type: "pie",
      radius: ["45%", "75%"],
      center: ["55%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number };
          return `${p.name}\n${p.value} %`;
        },
        fontSize: 10,
        lineHeight: 14,
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 8,
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
      data: navigateurs.map((n) => ({
        value: n.part,
        name: n.nom,
        itemStyle: { color: n.couleur },
      })),
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Doughnut Chart (Anneau)

### ✅ Quand utiliser ce type de diagramme

Le doughnut chart classique est parfait pour :

- **Parts de marché** : visualisation intuitive de la domination
- **Répartitions simples** : budget, temps, ressources
- **Comparaison avec un concurrent** : Chrome vs le reste
- **KPI central** : le trou peut afficher une métrique clé

**Exemples concrets :**
- Parts de marché des navigateurs/OS/smartphones
- Répartition du CA par produit
- Sources de revenus d'une entreprise
- Composition d'un portfolio d'investissement

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce chart dans ces cas :

- **Valeurs très proches** : difficile de distinguer 2,4 % de 2,6 %
- **Évolution temporelle** : utilisez un line chart ou stacked area
- **Plus de 7-8 catégories** : regroupez en "Autres"
- **Comparaisons inter-périodes** : difficile avec des pies multiples

### 🔧 Fonctionnalités ECharts utilisées

- **radius: ["45%", "75%"]** : trou central pour le doughnut
- **center: ["55%", "55%"]** : décalage pour légende à gauche
- **emphasis** : effet au survol pour mise en valeur
- **labelLine** : lignes de rappel pour les labels externes
- **borderWidth: 2** : séparation visuelle des segments

### 📊 Analyse de ce graphique

Ce graphique présente les parts de marché mondiales des navigateurs web en novembre 2024 :

- **🏆 Chrome ultra-dominant** : 65,7 % du marché, quasi-monopole
- **🍎 Safari solide 2ème** : 18,5 % grâce à l'écosystème Apple
- **📱 Mobile impacte** : Samsung Internet à 2,6 % (marché Android)
- **🦊 Firefox en déclin** : seulement 2,8 %, contre 10 % il y a 5 ans

**Répartition par moteur de rendu :**
| Moteur | Part totale | Navigateurs |
|--------|-------------|-------------|
| Blink (Google) | 75,9 % | Chrome, Edge, Opera, Samsung |
| WebKit (Apple) | 18,5 % | Safari |
| Gecko (Mozilla) | 2,8 % | Firefox |

**Observations clés :**
1. **Domination Blink** : Google contrôle le web via son moteur
2. **Déclin de la diversité** : moins de moteurs = moins d'innovation
3. **Apple tient grâce à iOS** : Safari obligatoire sur iPhone
4. **Firefox en danger** : perd du terrain chaque année

### 🎯 Enjeux du marché

- **Vie privée** : Firefox et Brave (dans "Autres") se positionnent
- **IA intégrée** : Edge mise sur Copilot, Chrome sur Gemini
- **Performance** : tous convergent vers des scores similaires
- **Extensions** : Chrome Web Store domine l'écosystème
`;

export default function DoughnutChart() {
  return (
    <ChartEditor
      title="Doughnut Chart"
      section="Pie"
      option={option}
      notes={notes}
    />
  );
}
