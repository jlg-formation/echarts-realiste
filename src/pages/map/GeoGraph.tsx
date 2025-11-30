import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Réseau ferroviaire français - Lignes à Grande Vitesse (LGV)
// Contexte : visualisation du réseau TGV avec les principales gares

// Gares principales avec coordonnées (normalisées sur un plan)
const gares = [
  { nom: "Paris Gare de Lyon", x: 50, y: 70, voyageurs: 120, hub: true },
  { nom: "Paris Montparnasse", x: 48, y: 72, voyageurs: 95, hub: true },
  { nom: "Paris Nord", x: 51, y: 74, voyageurs: 85, hub: true },
  { nom: "Lyon Part-Dieu", x: 55, y: 40, voyageurs: 75, hub: true },
  { nom: "Marseille St-Charles", x: 55, y: 15, voyageurs: 45, hub: true },
  { nom: "Lille Europe", x: 55, y: 90, voyageurs: 35, hub: true },
  { nom: "Bordeaux St-Jean", x: 20, y: 35, voyageurs: 40, hub: true },
  { nom: "Nantes", x: 15, y: 55, voyageurs: 25, hub: false },
  { nom: "Strasbourg", x: 80, y: 65, voyageurs: 30, hub: false },
  { nom: "Rennes", x: 12, y: 62, voyageurs: 22, hub: false },
  { nom: "Toulouse Matabiau", x: 30, y: 20, voyageurs: 28, hub: false },
  { nom: "Montpellier", x: 45, y: 18, voyageurs: 20, hub: false },
  { nom: "Nice", x: 72, y: 12, voyageurs: 18, hub: false },
  { nom: "Le Mans", x: 30, y: 62, voyageurs: 12, hub: false },
  { nom: "Tours", x: 32, y: 55, voyageurs: 14, hub: false },
  { nom: "Dijon", x: 58, y: 55, voyageurs: 16, hub: false },
  { nom: "Avignon TGV", x: 52, y: 22, voyageurs: 15, hub: false },
  { nom: "Valence TGV", x: 54, y: 32, voyageurs: 10, hub: false },
  { nom: "Metz", x: 70, y: 72, voyageurs: 12, hub: false },
  { nom: "Reims", x: 60, y: 75, voyageurs: 11, hub: false },
];

// Lignes LGV (connexions entre gares)
const lignes = [
  // LGV Sud-Est (Paris - Lyon - Marseille)
  { de: "Paris Gare de Lyon", a: "Lyon Part-Dieu", type: "LGV", temps: 120 },
  { de: "Lyon Part-Dieu", a: "Valence TGV", type: "LGV", temps: 35 },
  { de: "Valence TGV", a: "Avignon TGV", type: "LGV", temps: 40 },
  { de: "Avignon TGV", a: "Marseille St-Charles", type: "LGV", temps: 35 },

  // LGV Nord (Paris - Lille)
  { de: "Paris Nord", a: "Lille Europe", type: "LGV", temps: 60 },

  // LGV Atlantique (Paris - Bordeaux / Nantes / Rennes)
  { de: "Paris Montparnasse", a: "Le Mans", type: "LGV", temps: 55 },
  { de: "Le Mans", a: "Rennes", type: "LGV", temps: 65 },
  { de: "Le Mans", a: "Nantes", type: "LGV", temps: 75 },
  { de: "Le Mans", a: "Tours", type: "LGV", temps: 35 },
  { de: "Tours", a: "Bordeaux St-Jean", type: "LGV", temps: 120 },

  // LGV Est (Paris - Strasbourg)
  { de: "Paris Nord", a: "Reims", type: "LGV", temps: 45 },
  { de: "Reims", a: "Metz", type: "LGV", temps: 55 },
  { de: "Metz", a: "Strasbourg", type: "LGV", temps: 80 },

  // Liaisons classiques rapides
  { de: "Lyon Part-Dieu", a: "Dijon", type: "classique", temps: 100 },
  {
    de: "Bordeaux St-Jean",
    a: "Toulouse Matabiau",
    type: "classique",
    temps: 120,
  },
  {
    de: "Montpellier",
    a: "Marseille St-Charles",
    type: "classique",
    temps: 100,
  },
  { de: "Montpellier", a: "Nice", type: "classique", temps: 180 },
  { de: "Avignon TGV", a: "Montpellier", type: "LGV", temps: 50 },
];

// Conversion des lignes en format graph
const graphLinks = lignes.map((l) => {
  const source = gares.findIndex((g) => g.nom === l.de);
  const target = gares.findIndex((g) => g.nom === l.a);
  return {
    source,
    target,
    lineStyle: {
      color: l.type === "LGV" ? "#3b82f6" : "#94a3b8",
      width: l.type === "LGV" ? 4 : 2,
      type: l.type === "LGV" ? ("solid" as const) : ("dashed" as const),
      curveness: 0.1,
    },
    temps: l.temps,
    type: l.type,
  };
});

// Statistiques
const totalVoyageurs = gares.reduce((acc, g) => acc + g.voyageurs, 0);
const nbHubs = gares.filter((g) => g.hub).length;
const nbLGV = lignes.filter((l) => l.type === "LGV").length;

const option: EChartsOption = {
  title: {
    text: "🚄 Réseau TGV France - Lignes à Grande Vitesse",
    subtext: `${gares.length} gares · ${nbLGV} liaisons LGV · ${nbHubs} hubs majeurs · ${totalVoyageurs}M voyageurs/an`,
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
        dataType: string;
        data: {
          nom?: string;
          voyageurs?: number;
          hub?: boolean;
          temps?: number;
          type?: string;
        };
        name?: string;
      };

      if (p.dataType === "node") {
        const gare = p.data as (typeof gares)[0];
        return `
          <b>🚉 ${gare.nom}</b><br/><br/>
          Voyageurs : <b>${gare.voyageurs}M/an</b><br/>
          Type : <b>${gare.hub ? "Hub majeur ⭐" : "Gare régionale"}</b>
        `;
      }

      if (p.dataType === "edge") {
        const link = p.data as (typeof graphLinks)[0];
        return `
          <b>🛤️ Liaison ${link.type}</b><br/><br/>
          Temps de trajet : <b>${link.temps} min</b><br/>
          Type : <b>${link.type === "LGV" ? "Ligne Grande Vitesse" : "Ligne classique"}</b>
        `;
      }

      return "";
    },
  },
  legend: {
    top: 60,
    data: ["Hub majeur", "Gare régionale", "LGV", "Ligne classique"],
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 40,
    right: 40,
    top: 100,
    bottom: 40,
  },
  xAxis: {
    type: "value",
    show: false,
    min: 0,
    max: 100,
  },
  yAxis: {
    type: "value",
    show: false,
    min: 0,
    max: 100,
  },
  series: [
    {
      name: "Réseau",
      type: "graph",
      layout: "none",
      coordinateSystem: "cartesian2d",
      symbolSize: (value: number[]) => {
        const gare = gares.find((g) => g.x === value[0] && g.y === value[1]);
        return gare ? Math.sqrt(gare.voyageurs) * 4 + 10 : 10;
      },
      edgeSymbol: ["none", "arrow"],
      edgeSymbolSize: [0, 8],
      data: gares.map((g) => ({
        name: g.nom,
        x: g.x,
        y: g.y,
        value: [g.x, g.y],
        nom: g.nom,
        voyageurs: g.voyageurs,
        hub: g.hub,
        symbolSize: Math.sqrt(g.voyageurs) * 4 + 10,
        itemStyle: {
          color: g.hub ? "#ef4444" : "#22c55e",
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: g.y > 50 ? "bottom" : "top",
          formatter: g.nom.split(" ")[0],
          fontSize: g.hub ? 11 : 9,
          fontWeight: g.hub ? ("bold" as const) : ("normal" as const),
        },
      })),
      links: graphLinks.map((l) => ({
        source: l.source,
        target: l.target,
        lineStyle: l.lineStyle,
        temps: l.temps,
        type: l.type,
      })),
      emphasis: {
        focus: "adjacency",
        lineStyle: {
          width: 6,
        },
      },
      roam: true,
      zoom: 1.2,
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Geo Graph (Graphe géographique)

### ✅ Quand utiliser ce type de visualisation

Le **Geo Graph** combine graphe relationnel et positionnement géographique :

- **Réseaux de transport** : routes, rails, vols, pipelines
- **Télécommunications** : fibre optique, antennes, câbles sous-marins
- **Distribution** : supply chain, livraison, approvisionnement
- **Migration** : flux de population, mouvements d'espèces
- **Énergie** : réseau électrique, gazoducs

**Caractéristiques :**
- Nœuds positionnés sur une carte (ou plan schématique)
- Liens entre nœuds (orientés ou non)
- Taille/couleur des nœuds = importance
- Épaisseur des liens = volume/capacité

### ❌ Quand ne pas utiliser

- **Données non géographiques** : utiliser un graphe force-directed
- **Trop de liens** : devient illisible (> 100 connexions)
- **Précision géographique requise** : utiliser une vraie carte
- **Analyse topologique pure** : le positionnement géo peut tromper

### 📊 Analyse de ce graphique

**Réseau TGV français :**

| Indicateur | Valeur |
|------------|--------|
| Gares | ${gares.length} |
| Liaisons LGV | ${nbLGV} |
| Hubs majeurs | ${nbHubs} |
| Voyageurs/an | ${totalVoyageurs}M |

**Top 5 gares par fréquentation :**
${gares
  .sort((a, b) => b.voyageurs - a.voyageurs)
  .slice(0, 5)
  .map((g, i) => `${i + 1}. ${g.nom} : ${g.voyageurs}M voyageurs`)
  .join("\n")}

**Temps de trajet Paris → principales villes :**
- Lyon : 2h00
- Marseille : 3h00
- Bordeaux : 2h00
- Lille : 1h00
- Strasbourg : 1h45

### 🔧 Fonctionnalités ECharts utilisées

**type: "graph" avec layout: "none"**

\`\`\`javascript
{
  type: 'graph',
  layout: 'none', // Positionnement manuel
  coordinateSystem: 'cartesian2d', // Sur un plan X/Y
  data: nodes.map(n => ({
    name: n.nom,
    x: n.x,
    y: n.y,
    value: [n.x, n.y],
    symbolSize: Math.sqrt(n.voyageurs) * 4,
  })),
  links: edges.map(e => ({
    source: e.from,
    target: e.to,
    lineStyle: { width: e.capacity / 10 }
  })),
  edgeSymbol: ['none', 'arrow'], // Flèches directionnelles
  roam: true, // Zoom/pan interactif
}
\`\`\`

### 🎨 Design du graphe

**Taille des nœuds :**
\`\`\`javascript
symbolSize: Math.sqrt(voyageurs) * 4 + baseSize
\`\`\`
→ Racine carrée pour éviter les nœuds géants

**Couleurs sémantiques :**
- 🔴 Hubs majeurs (Paris, Lyon, Marseille...)
- 🟢 Gares régionales
- 🔵 Lignes LGV (trait plein épais)
- ⚪ Lignes classiques (trait pointillé fin)

**Courbure des liens :**
\`\`\`javascript
lineStyle: { curveness: 0.1 }
\`\`\`
→ Évite la superposition des liens bidirectionnels

### 📈 Extensions possibles

**Animation du trafic :**
\`\`\`javascript
effect: {
  show: true,
  period: 4,
  trailLength: 0.2,
  symbol: 'arrow',
  symbolSize: 6,
}
\`\`\`

**Filtrage interactif :**
- Afficher seulement les LGV
- Cacher les petites gares
- Mettre en évidence un trajet

**Intégration carte réelle :**
\`\`\`javascript
geo: {
  map: 'france',
  roam: true,
},
series: [{
  coordinateSystem: 'geo',
  // ...
}]
\`\`\`

### 🚀 Cas d'usage professionnels

**1. Logistique**
- Entrepôts et flux de marchandises
- Optimisation des tournées
- Détection de goulots d'étranglement

**2. Télécom**
- Topologie réseau (routeurs, switches)
- Câbles sous-marins intercontinentaux
- Couverture 5G

**3. Énergie**
- Réseau électrique haute tension
- Pipelines gaz/pétrole
- Parcs éoliens offshore

**4. Urbanisme**
- Plan de transport en commun
- Pistes cyclables
- Flux piétons

### 💡 Bonnes pratiques

1. **Simplifier** : ne pas afficher tous les détails, prioriser
2. **Hiérarchiser** : taille/couleur reflète l'importance
3. **Étiqueter** : noms visibles sur les nœuds importants
4. **Interactif** : zoom, pan, tooltip au survol
5. **Légende claire** : expliquer les codes couleur/taille
`;

export default function GeoGraph() {
  return (
    <ChartEditor
      title="Geo Graph"
      section="Map"
      option={option}
      notes={notes}
    />
  );
}
