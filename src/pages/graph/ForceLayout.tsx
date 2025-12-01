import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Réseau social d'une entreprise tech (50 employés)
// Les nœuds représentent les employés, les liens représentent les interactions fréquentes

// Départements de l'entreprise
const departements = [
  { name: "Direction", color: "#e74c3c", symbol: "diamond" },
  { name: "Développement", color: "#3498db", symbol: "circle" },
  { name: "Design", color: "#9b59b6", symbol: "triangle" },
  { name: "Marketing", color: "#2ecc71", symbol: "rect" },
  { name: "Commercial", color: "#f39c12", symbol: "roundRect" },
  { name: "RH", color: "#1abc9c", symbol: "pin" },
];

// Catégories pour ECharts
const categories = departements.map((d) => ({ name: d.name }));

// Employés de l'entreprise avec leur département et niveau hiérarchique
interface Employee {
  id: string;
  name: string;
  dept: number; // Index dans departements
  level: number; // 1=junior, 2=senior, 3=manager, 4=directeur
  size: number;
}

const employees: Employee[] = [
  // Direction (0)
  { id: "e1", name: "Marie Dupont (CEO)", dept: 0, level: 4, size: 45 },
  { id: "e2", name: "Jean Martin (CTO)", dept: 0, level: 4, size: 40 },
  { id: "e3", name: "Sophie Bernard (CFO)", dept: 0, level: 4, size: 35 },

  // Développement (1)
  { id: "e4", name: "Thomas Petit (Lead Dev)", dept: 1, level: 3, size: 30 },
  { id: "e5", name: "Léa Moreau (Dev Senior)", dept: 1, level: 2, size: 22 },
  { id: "e6", name: "Nicolas Roux (Dev Senior)", dept: 1, level: 2, size: 22 },
  { id: "e7", name: "Emma Laurent (Dev)", dept: 1, level: 1, size: 18 },
  { id: "e8", name: "Lucas Garcia (Dev)", dept: 1, level: 1, size: 18 },
  { id: "e9", name: "Chloé Martinez (DevOps)", dept: 1, level: 2, size: 25 },
  { id: "e10", name: "Hugo Simon (Dev Junior)", dept: 1, level: 1, size: 15 },

  // Design (2)
  {
    id: "e11",
    name: "Camille Leroy (Lead Design)",
    dept: 2,
    level: 3,
    size: 28,
  },
  {
    id: "e12",
    name: "Julie Michel (UX Designer)",
    dept: 2,
    level: 2,
    size: 22,
  },
  {
    id: "e13",
    name: "Antoine David (UI Designer)",
    dept: 2,
    level: 2,
    size: 20,
  },
  {
    id: "e14",
    name: "Inès Bertrand (Designer Junior)",
    dept: 2,
    level: 1,
    size: 15,
  },

  // Marketing (3)
  {
    id: "e15",
    name: "Pierre Richard (Dir. Marketing)",
    dept: 3,
    level: 3,
    size: 30,
  },
  {
    id: "e16",
    name: "Clara Thomas (Content Manager)",
    dept: 3,
    level: 2,
    size: 22,
  },
  { id: "e17", name: "Maxime Robert (SEO)", dept: 3, level: 2, size: 20 },
  {
    id: "e18",
    name: "Zoé Blanc (Community Manager)",
    dept: 3,
    level: 1,
    size: 18,
  },

  // Commercial (4)
  {
    id: "e19",
    name: "François Girard (Dir. Commercial)",
    dept: 4,
    level: 3,
    size: 30,
  },
  {
    id: "e20",
    name: "Anaïs Lefebvre (Key Account)",
    dept: 4,
    level: 2,
    size: 24,
  },
  { id: "e21", name: "Julien Faure (Commercial)", dept: 4, level: 2, size: 20 },
  {
    id: "e22",
    name: "Mathilde André (Commercial Junior)",
    dept: 4,
    level: 1,
    size: 16,
  },

  // RH (5)
  { id: "e23", name: "Valérie Mercier (DRH)", dept: 5, level: 3, size: 28 },
  {
    id: "e24",
    name: "Olivier Durand (Recruteur)",
    dept: 5,
    level: 2,
    size: 22,
  },
  {
    id: "e25",
    name: "Marion Fournier (Office Manager)",
    dept: 5,
    level: 1,
    size: 20,
  },
];

// Nœuds pour ECharts
const nodes = employees.map((emp) => ({
  id: emp.id,
  name: emp.name,
  symbolSize: emp.size,
  category: emp.dept,
  itemStyle: {
    color: departements[emp.dept].color,
  },
  label: {
    show: emp.level >= 3, // Afficher le nom seulement pour managers+
    fontSize: 10,
  },
}));

// Liens entre employés (interactions fréquentes)
// Force du lien : 1=occasionnel, 2=régulier, 3=quotidien
interface Link {
  source: string;
  target: string;
  value: number;
}

const links: Link[] = [
  // Direction se parle entre eux
  { source: "e1", target: "e2", value: 3 },
  { source: "e1", target: "e3", value: 3 },
  { source: "e2", target: "e3", value: 2 },

  // CEO supervise les directeurs
  { source: "e1", target: "e15", value: 2 },
  { source: "e1", target: "e19", value: 2 },
  { source: "e1", target: "e23", value: 2 },

  // CTO supervise le dev et design
  { source: "e2", target: "e4", value: 3 },
  { source: "e2", target: "e11", value: 2 },
  { source: "e2", target: "e9", value: 2 },

  // Lead Dev coordonne son équipe
  { source: "e4", target: "e5", value: 3 },
  { source: "e4", target: "e6", value: 3 },
  { source: "e4", target: "e7", value: 2 },
  { source: "e4", target: "e8", value: 2 },
  { source: "e4", target: "e10", value: 2 },

  // Devs Senior mentorent les juniors
  { source: "e5", target: "e7", value: 2 },
  { source: "e6", target: "e8", value: 2 },
  { source: "e5", target: "e10", value: 1 },

  // DevOps interagit avec tout le dev
  { source: "e9", target: "e4", value: 3 },
  { source: "e9", target: "e5", value: 2 },
  { source: "e9", target: "e6", value: 2 },

  // Design et Dev collaborent
  { source: "e11", target: "e4", value: 3 },
  { source: "e12", target: "e5", value: 2 },
  { source: "e13", target: "e7", value: 2 },

  // Design interne
  { source: "e11", target: "e12", value: 3 },
  { source: "e11", target: "e13", value: 3 },
  { source: "e11", target: "e14", value: 2 },
  { source: "e12", target: "e13", value: 2 },

  // Marketing interne
  { source: "e15", target: "e16", value: 3 },
  { source: "e15", target: "e17", value: 2 },
  { source: "e15", target: "e18", value: 2 },
  { source: "e16", target: "e17", value: 2 },
  { source: "e16", target: "e18", value: 3 },

  // Marketing collabore avec Commercial
  { source: "e15", target: "e19", value: 2 },
  { source: "e16", target: "e20", value: 2 },

  // Marketing et Design
  { source: "e15", target: "e11", value: 2 },
  { source: "e16", target: "e13", value: 2 },

  // Commercial interne
  { source: "e19", target: "e20", value: 3 },
  { source: "e19", target: "e21", value: 3 },
  { source: "e19", target: "e22", value: 2 },
  { source: "e20", target: "e21", value: 2 },
  { source: "e21", target: "e22", value: 2 },

  // RH interne
  { source: "e23", target: "e24", value: 3 },
  { source: "e23", target: "e25", value: 3 },
  { source: "e24", target: "e25", value: 2 },

  // RH interagit avec Direction
  { source: "e23", target: "e1", value: 2 },
  { source: "e23", target: "e3", value: 2 },

  // RH recrute pour tous
  { source: "e24", target: "e4", value: 1 },
  { source: "e24", target: "e11", value: 1 },
  { source: "e24", target: "e15", value: 1 },
  { source: "e24", target: "e19", value: 1 },

  // Office Manager en lien avec tous
  { source: "e25", target: "e1", value: 1 },
  { source: "e25", target: "e4", value: 1 },
  { source: "e25", target: "e11", value: 1 },
  { source: "e25", target: "e15", value: 1 },
  { source: "e25", target: "e19", value: 1 },

  // Interactions transverses (projets communs)
  { source: "e5", target: "e12", value: 1 }, // UX review
  { source: "e17", target: "e9", value: 1 }, // SEO technique
  { source: "e20", target: "e16", value: 1 }, // Témoignages clients
];

const option: EChartsOption = {
  title: {
    text: "Réseau social interne - TechStartup SAS",
    subtext:
      "🔗 25 collaborateurs | 52 interactions fréquentes | Point central : Marie Dupont (CEO) et Thomas Petit (Lead Dev)",
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
    formatter: (params: unknown) => {
      const p = params as {
        dataType: string;
        data: {
          name?: string;
          source?: string;
          target?: string;
          value?: number;
        };
      };
      if (p.dataType === "node") {
        const emp = employees.find((e) => e.name === p.data.name);
        if (emp) {
          const dept = departements[emp.dept].name;
          const level =
            emp.level === 4
              ? "Directeur"
              : emp.level === 3
                ? "Manager"
                : emp.level === 2
                  ? "Senior"
                  : "Junior";
          return `<strong>${emp.name}</strong><br/>
                  ${dept}<br/>
                  Niveau : ${level}`;
        }
      }
      if (p.dataType === "edge") {
        const sourceEmp = employees.find((e) => e.id === p.data.source);
        const targetEmp = employees.find((e) => e.id === p.data.target);
        const freq =
          p.data.value === 3
            ? "Quotidienne"
            : p.data.value === 2
              ? "Régulière"
              : "Occasionnelle";
        return `<strong>${sourceEmp?.name}</strong><br/>
                ↔ <strong>${targetEmp?.name}</strong><br/>
                Interaction : ${freq}`;
      }
      return "";
    },
  },
  legend: {
    data: departements.map((d) => d.name),
    orient: "vertical",
    left: 10,
    top: 80,
    textStyle: {
      fontSize: 11,
    },
  },
  series: [
    {
      name: "Réseau social",
      type: "graph",
      layout: "force",
      data: nodes,
      links: links.map((l) => ({
        ...l,
        lineStyle: {
          width: l.value,
          opacity: 0.3 + l.value * 0.2,
        },
      })),
      categories: categories,
      roam: true,
      draggable: true,
      label: {
        show: true,
        position: "right",
        fontSize: 10,
        formatter: (params: unknown) => {
          const p = params as { data: { name: string } };
          // Afficher seulement le prénom et nom (pas le titre)
          const fullName = p.data.name.split(" (")[0];
          return fullName;
        },
      },
      labelLayout: {
        hideOverlap: true,
      },
      force: {
        repulsion: 200,
        gravity: 0.1,
        edgeLength: [80, 200],
        friction: 0.6,
      },
      emphasis: {
        focus: "adjacency",
        lineStyle: {
          width: 4,
        },
        itemStyle: {
          shadowBlur: 20,
          shadowColor: "rgba(0,0,0,0.3)",
        },
      },
      edgeSymbol: ["none", "none"],
      edgeLabel: {
        show: false,
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Graph Force Layout

### ✅ Quand utiliser ce type de diagramme

Le graph avec force layout est idéal pour :

- **Visualiser des réseaux relationnels** : réseaux sociaux, organigrammes informels, collaborations
- **Identifier des clusters** : groupes de nœuds fortement connectés entre eux
- **Repérer les connecteurs clés** : personnes ou entités centrales dans un réseau
- **Explorer des données complexes** : l'interactivité permet de naviguer dans le graphe
- **Montrer des hiérarchies informelles** : qui travaille vraiment avec qui ?

**Exemples concrets :**
- Réseau social d'entreprise (qui interagit avec qui)
- Dépendances entre modules d'un projet
- Relations entre personnages d'un roman/film
- Écosystème de partenaires commerciaux
- Cartographie d'influence sur les réseaux sociaux

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez le force layout dans ces cas :

- **Graphe très dense** (> 500 nœuds) : devient illisible, préférez une matrice ou un agrégat
- **Hiérarchie stricte** : utilisez un tree ou un organigramme classique
- **Données séquentielles** : un sankey ou un flow diagram sera plus clair
- **Comparaison de métriques précises** : le positionnement est approximatif
- **Graphe biparti** : un layout force mélange les deux groupes

**Erreurs courantes à éviter :**
- Trop de nœuds sans filtrage (seuil de connexions minimum)
- Couleurs non distinctives pour les catégories
- Absence de légende expliquant la signification des liens
- Paramètres de force mal calibrés (nœuds qui s'écrasent ou s'éloignent trop)

### 📊 Analyse de ce graphique

Ce graph visualise le **réseau social informel de TechStartup SAS** :

- **Clusters départementaux** : les équipes forment des groupes naturels
- **Connecteurs clés** : Marie Dupont (CEO) et Thomas Petit (Lead Dev) sont au centre
- **Ponts interdépartementaux** : Design↔Dev, Marketing↔Commercial, RH↔Direction
- **Silos potentiels** : le commercial semble moins connecté aux équipes techniques

**Insight actionnable** : Organiser des événements cross-départements pour renforcer les liens Dev↔Commercial et Marketing↔Dev.

### 🎨 Bonnes pratiques appliquées

- **Couleurs par département** : identification visuelle immédiate des groupes
- **Taille des nœuds = niveau hiérarchique** : les dirigeants sont plus visibles
- **Épaisseur des liens = fréquence** : interactions quotidiennes plus marquées
- **Labels pour managers+** : évite la surcharge visuelle
- **Mode \`roam\` et \`draggable\`** : exploration interactive du réseau

### ⚙️ Configuration ECharts clé

\`\`\`javascript
series: [{
  type: 'graph',
  layout: 'force',  // Disposition automatique par simulation physique
  force: {
    repulsion: 200,   // Force de répulsion entre nœuds
    gravity: 0.1,     // Attraction vers le centre
    edgeLength: [80, 200],  // Distance min/max entre nœuds liés
    friction: 0.6     // Ralentissement de la simulation
  },
  emphasis: {
    focus: 'adjacency'  // Met en évidence les voisins au survol
  }
}]
\`\`\`

Le **force layout** simule un système physique où les nœuds se repoussent et les liens les attirent, créant une disposition organique qui révèle la structure du réseau.
`;

export default function ForceLayout() {
  return (
    <ChartEditor
      title="Force Layout"
      section="Graph"
      option={option}
      notes={notes}
    />
  );
}
