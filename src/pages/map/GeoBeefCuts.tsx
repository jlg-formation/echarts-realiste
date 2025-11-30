import { useEffect, useState } from "react";
import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

// Données réalistes : Prix des morceaux de bœuf en boucherie française
// Contexte : Un grossiste en viande analyse les prix moyens au kilo
// selon les différentes pièces de découpe

const prixMorceaux: Record<string, { prix: number; categorie: string }> = {
  // Morceaux nobles (prix élevé)
  Filet: { prix: 48, categorie: "noble" },
  "Faux-filet": { prix: 35, categorie: "noble" },
  Entrecôte: { prix: 32, categorie: "noble" },
  "Côte de bœuf": { prix: 28, categorie: "noble" },
  Rumsteck: { prix: 26, categorie: "noble" },
  Onglet: { prix: 24, categorie: "noble" },
  Bavette: { prix: 22, categorie: "noble" },

  // Morceaux à braiser (prix moyen)
  Paleron: { prix: 16, categorie: "braiser" },
  Macreuse: { prix: 17, categorie: "braiser" },
  Joue: { prix: 15, categorie: "braiser" },
  Queue: { prix: 14, categorie: "braiser" },
  "Plat de côtes": { prix: 12, categorie: "braiser" },
  Gîte: { prix: 13, categorie: "braiser" },
  Jarret: { prix: 11, categorie: "braiser" },

  // Morceaux à bouillir / hacher (prix bas)
  Flanchet: { prix: 9, categorie: "economique" },
  Collier: { prix: 10, categorie: "economique" },
  Poitrine: { prix: 8, categorie: "economique" },
  Tendron: { prix: 9, categorie: "economique" },
};

// Mapping des noms SVG vers nos noms français (pour référence future)
// const nomsSvgVersFrancais: Record<string, string> = {
//   Rumsteak: "Rumsteck",
//   Rump: "Rumsteck",
//   Sirloin: "Faux-filet",
//   Tenderloin: "Filet",
//   Ribeye: "Entrecôte",
//   Rib: "Côte de bœuf",
//   Chuck: "Paleron",
//   Brisket: "Poitrine",
//   Shank: "Jarret",
//   Flank: "Flanchet",
//   "Short plate": "Plat de côtes",
//   Round: "Gîte",
// };

const SVG_URL =
  "https://echarts.apache.org/examples/data/asset/geo/Beef_cuts_France.svg";

const notes = `
## 📚 Note pédagogique : Carte SVG personnalisée (Geo avec SVG)

### ✅ Quand utiliser ce type de visualisation

La **carte SVG personnalisée** est idéale pour :

- **Anatomie et schémas techniques** : corps humain, véhicules, bâtiments
- **Plans de sites** : usines, entrepôts, magasins
- **Cartographie non géographique** : pièces de machine, composants électroniques
- **Infographies interactives** : visualiser des données sur un schéma personnalisé

**Avantages :**
- Forme libre (n'importe quel SVG)
- Interactivité native (survol, clic)
- Colorimétrie dynamique via \`visualMap\`
- Zoom et déplacement avec \`roam\`

### ❌ Quand ne pas utiliser

- **Cartes géographiques classiques** : préférer les GeoJSON/TopoJSON
- **Données sans représentation visuelle** : utiliser un graphique standard
- **Schémas trop complexes** : performance dégradée si > 1000 éléments SVG
- **Mobile** : interaction tactile moins précise sur petites zones

### 📊 Analyse de ce graphique

**Prix des morceaux de bœuf (€/kg) :**

| Catégorie | Prix moyen | Morceaux |
|-----------|------------|----------|
| 🥩 Nobles | 30-48 €/kg | Filet, Faux-filet, Entrecôte |
| 🍖 À braiser | 11-17 €/kg | Paleron, Macreuse, Joue |
| 🥘 Économiques | 8-10 €/kg | Flanchet, Collier, Poitrine |

**Top 3 des pièces les plus chères :**
1. Filet : **48 €/kg** (tendre, peu de travail)
2. Faux-filet : **35 €/kg** (persillé, savoureux)
3. Entrecôte : **32 €/kg** (gras + muscle)

**Pourquoi ces écarts de prix ?**
- **Rendement** : le filet représente < 2% du poids de l'animal
- **Tendreté** : muscles peu sollicités = plus tendre
- **Demande** : les morceaux "nobles" sont très prisés en restauration

### 🔧 Fonctionnalités ECharts utilisées

**Enregistrement d'une carte SVG :**

\`\`\`javascript
// Charger le SVG
fetch('chemin/vers/schema.svg')
  .then(res => res.text())
  .then(svg => {
    echarts.registerMap('monSchema', { svg: svg });
  });
\`\`\`

**Configuration de la série map :**

\`\`\`javascript
series: [{
  type: 'map',
  map: 'monSchema', // Nom enregistré
  roam: true, // Zoom/pan
  data: [
    { name: 'zone1', value: 42 },
    { name: 'zone2', value: 78 },
  ],
}]
\`\`\`

**VisualMap pour la colorimétrie :**

\`\`\`javascript
visualMap: {
  min: 5,
  max: 50,
  inRange: {
    color: ['#fef3c7', '#f59e0b', '#dc2626']
  },
  calculable: true, // Curseur interactif
}
\`\`\`

### 🎨 Conception du schéma SVG

**Structure attendue :**
- Chaque zone doit avoir un attribut \`name\` ou \`id\`
- Les zones sont des \`<path>\`, \`<rect>\`, \`<polygon>\`
- Éviter les groupes imbriqués complexes

**Exemple de path SVG :**
\`\`\`xml
<path 
  name="Filet" 
  d="M10,20 L30,20 L30,40 L10,40 Z"
  fill="#ccc"
/>
\`\`\`

### 📈 Extensions possibles

**Afficher les prix sur le schéma :**
\`\`\`javascript
label: {
  show: true,
  formatter: '{c} €/kg'
}
\`\`\`

**Animation au chargement :**
\`\`\`javascript
animationDuration: 1000,
animationEasing: 'elasticOut'
\`\`\`

**Drill-down par catégorie :**
- Clic sur "Nobles" → zoom sur ces morceaux
- Filtrage dynamique par gamme de prix

### 🚀 Cas d'usage professionnels

**1. Boucherie / Restauration**
- Prix des découpes
- Stocks par morceau
- Marges par pièce

**2. Industrie automobile**
- Schéma éclaté d'un moteur
- État des pièces (usure, défauts)
- Coûts de maintenance par composant

**3. Immobilier**
- Plan d'étage avec prix au m²
- Occupation des bureaux
- Température par pièce (domotique)

**4. Médical**
- Anatomie avec données patient
- Zones d'intervention chirurgicale
- Dosimétrie en radiothérapie

### 💡 Bonnes pratiques

1. **Nommer les zones clairement** dans le SVG
2. **Limiter la complexité** : < 500 paths pour la fluidité
3. **Tester les tooltips** : vérifier que les zones sont cliquables
4. **Prévoir un fallback** : message si SVG non chargé
5. **Documenter le mapping** : nom SVG ↔ données
`;

export default function GeoBeefCuts() {
  const [option, setOption] = useState<EChartsOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SVG_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger le schéma SVG");
        return res.text();
      })
      .then((svg) => {
        echarts.registerMap("Beef_cuts_France", { svg });

        // Générer les données pour chaque morceau du SVG
        // Les noms des régions dans le SVG correspondent aux morceaux
        const data = Object.entries(prixMorceaux).map(
          ([nom, { prix, categorie }]) => ({
            name: nom,
            value: prix,
            categorie,
          })
        );

        const newOption: EChartsOption = {
          title: {
            text: "🥩 Prix des morceaux de bœuf - Boucherie française",
            subtext:
              "Prix moyens au kilo (€/kg) · Source : Observatoire des prix viande 2024",
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
                name: string;
                value: number;
                data: { categorie: string };
              };
              const categorie = p.data?.categorie || "standard";
              const categorieLabel =
                categorie === "noble"
                  ? "🥩 Morceau noble"
                  : categorie === "braiser"
                    ? "🍖 À braiser"
                    : "🥘 Économique";

              return `
                <b>${p.name}</b><br/><br/>
                Prix : <b>${p.value?.toLocaleString("fr-FR")} €/kg</b><br/>
                Catégorie : ${categorieLabel}
              `;
            },
          },
          visualMap: {
            left: "center",
            bottom: "5%",
            min: 5,
            max: 50,
            orient: "horizontal",
            text: ["Cher", "Économique"],
            realtime: true,
            calculable: true,
            inRange: {
              color: ["#fef3c7", "#f59e0b", "#dc2626"],
            },
            textStyle: {
              fontSize: 11,
            },
          },
          series: [
            {
              name: "Morceaux de bœuf",
              type: "map",
              map: "Beef_cuts_France",
              roam: true,
              emphasis: {
                label: {
                  show: true,
                  fontSize: 12,
                  fontWeight: "bold",
                },
                itemStyle: {
                  areaColor: "#3b82f6",
                },
              },
              select: {
                label: {
                  show: true,
                },
                itemStyle: {
                  areaColor: "#2563eb",
                },
              },
              data,
            },
          ],
        };

        setOption(newOption);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement SVG:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du schéma anatomique...</p>
        </div>
      </div>
    );
  }

  if (error || !option) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-600">
          <p className="text-xl mb-2">⚠️ Erreur de chargement</p>
          <p>{error || "Impossible de charger le graphique"}</p>
        </div>
      </div>
    );
  }

  return (
    <ChartEditor
      title="GEO Beef Cuts"
      section="Map"
      option={option}
      notes={notes}
    />
  );
}
