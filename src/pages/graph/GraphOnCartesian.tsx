import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Architecture microservices d'une plateforme e-commerce
// Chaque service est positionné sur une grille représentant :
// - Axe X : Couche technique (Frontend → Backend → Data → Infrastructure)
// - Axe Y : Criticité business (0-100)

interface Microservice {
  name: string;
  layer: number; // 0=Frontend, 1=API Gateway, 2=Backend, 3=Data, 4=Infrastructure
  criticality: number; // Score de criticité business (0-100)
  status: "healthy" | "degraded" | "critical";
  requests: number; // Requêtes/min
}

const services: Microservice[] = [
  // Frontend Layer (0)
  {
    name: "Web App",
    layer: 0,
    criticality: 85,
    status: "healthy",
    requests: 1200,
  },
  {
    name: "Mobile App",
    layer: 0,
    criticality: 80,
    status: "healthy",
    requests: 800,
  },

  // API Gateway Layer (1)
  {
    name: "API Gateway",
    layer: 1,
    criticality: 95,
    status: "healthy",
    requests: 2500,
  },
  {
    name: "Auth Service",
    layer: 1,
    criticality: 90,
    status: "healthy",
    requests: 450,
  },

  // Backend Services Layer (2)
  {
    name: "User Service",
    layer: 2,
    criticality: 75,
    status: "healthy",
    requests: 380,
  },
  {
    name: "Catalog Service",
    layer: 2,
    criticality: 85,
    status: "degraded",
    requests: 520,
  },
  {
    name: "Order Service",
    layer: 2,
    criticality: 95,
    status: "healthy",
    requests: 290,
  },
  {
    name: "Payment Service",
    layer: 2,
    criticality: 100,
    status: "healthy",
    requests: 180,
  },
  {
    name: "Notification",
    layer: 2,
    criticality: 60,
    status: "healthy",
    requests: 150,
  },

  // Data Layer (3)
  {
    name: "PostgreSQL",
    layer: 3,
    criticality: 95,
    status: "healthy",
    requests: 1100,
  },
  {
    name: "Redis Cache",
    layer: 3,
    criticality: 80,
    status: "critical",
    requests: 3200,
  },
  {
    name: "Elasticsearch",
    layer: 3,
    criticality: 70,
    status: "healthy",
    requests: 420,
  },

  // Infrastructure Layer (4)
  {
    name: "Message Queue",
    layer: 4,
    criticality: 85,
    status: "healthy",
    requests: 680,
  },
  {
    name: "Monitoring",
    layer: 4,
    criticality: 50,
    status: "healthy",
    requests: 200,
  },
];

// Définition des dépendances entre services
interface Dependency {
  source: string;
  target: string;
  weight: number; // Volume de trafic (1-5)
  type: "sync" | "async";
}

const dependencies: Dependency[] = [
  // Frontend → API Gateway
  { source: "Web App", target: "API Gateway", weight: 5, type: "sync" },
  { source: "Mobile App", target: "API Gateway", weight: 4, type: "sync" },

  // API Gateway → Backend
  { source: "API Gateway", target: "Auth Service", weight: 4, type: "sync" },
  { source: "API Gateway", target: "User Service", weight: 3, type: "sync" },
  { source: "API Gateway", target: "Catalog Service", weight: 5, type: "sync" },
  { source: "API Gateway", target: "Order Service", weight: 4, type: "sync" },

  // Auth Service
  { source: "Auth Service", target: "Redis Cache", weight: 4, type: "sync" },
  { source: "Auth Service", target: "PostgreSQL", weight: 2, type: "sync" },

  // Backend → Data
  { source: "User Service", target: "PostgreSQL", weight: 3, type: "sync" },
  { source: "Catalog Service", target: "PostgreSQL", weight: 3, type: "sync" },
  { source: "Catalog Service", target: "Redis Cache", weight: 5, type: "sync" },
  {
    source: "Catalog Service",
    target: "Elasticsearch",
    weight: 4,
    type: "sync",
  },
  { source: "Order Service", target: "PostgreSQL", weight: 4, type: "sync" },
  {
    source: "Order Service",
    target: "Payment Service",
    weight: 5,
    type: "sync",
  },

  // Payment & Notification
  { source: "Payment Service", target: "PostgreSQL", weight: 3, type: "sync" },
  { source: "Order Service", target: "Notification", weight: 3, type: "async" },
  { source: "Notification", target: "Message Queue", weight: 4, type: "async" },

  // Monitoring
  { source: "Monitoring", target: "Elasticsearch", weight: 2, type: "async" },
];

// Couleurs par couche
const layerColors = [
  "#3498db", // Frontend - Bleu
  "#9b59b6", // API Gateway - Violet
  "#2ecc71", // Backend - Vert
  "#e67e22", // Data - Orange
  "#95a5a6", // Infrastructure - Gris
];

// Labels des couches pour l'axe X
const layerLabels = ["Frontend", "API Gateway", "Backend", "Data", "Infra"];

// Couleurs par statut
const statusColors: Record<string, string> = {
  healthy: "#27ae60",
  degraded: "#f39c12",
  critical: "#e74c3c",
};

// Créer les nœuds pour ECharts
const graphNodes = services.map((service) => ({
  name: service.name,
  value: [service.layer, service.criticality],
  symbolSize: Math.max(20, Math.min(50, service.requests / 50)),
  itemStyle: {
    color: layerColors[service.layer],
    borderColor: statusColors[service.status],
    borderWidth: service.status === "healthy" ? 2 : 4,
  },
  label: {
    show: true,
    formatter: service.name,
    position: "bottom" as const,
    fontSize: 10,
  },
}));

// Créer les liens pour ECharts
const graphLinks = dependencies.map((dep) => ({
  source: dep.source,
  target: dep.target,
  lineStyle: {
    width: dep.weight,
    curveness: 0.1,
    type: dep.type === "async" ? ("dashed" as const) : ("solid" as const),
    opacity: 0.6,
  },
}));

const option: EChartsOption = {
  title: {
    text: "Architecture Microservices E-commerce - Cartographie des dépendances",
    subtext:
      "⚠️ Redis Cache en état critique : impact sur Catalog Service (dégradé)",
    left: "center",
    top: 10,
    textStyle: {
      fontSize: 16,
    },
    subtextStyle: {
      fontSize: 12,
      color: "#e74c3c",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: (params: unknown) => {
      const p = params as {
        dataType: string;
        name: string;
        data: { source?: string; target?: string; value?: number[] };
        value?: number[];
      };

      if (p.dataType === "node") {
        const service = services.find((s) => s.name === p.name);
        if (!service) return "";

        const statusEmoji =
          service.status === "healthy"
            ? "✅"
            : service.status === "degraded"
              ? "⚠️"
              : "🔴";
        return `
          <strong>${service.name}</strong><br/>
          ${statusEmoji} Statut : ${service.status}<br/>
          📊 Criticité : ${service.criticality}/100<br/>
          📈 Trafic : ${service.requests.toLocaleString("fr-FR")} req/min<br/>
          📁 Couche : ${layerLabels[service.layer]}
        `;
      } else if (p.dataType === "edge") {
        const dep = dependencies.find(
          (d) => d.source === p.data.source && d.target === p.data.target,
        );
        if (!dep) return "";
        return `
          <strong>${dep.source} → ${dep.target}</strong><br/>
          📡 Type : ${dep.type === "sync" ? "Synchrone" : "Asynchrone"}<br/>
          📊 Volume : ${["Très faible", "Faible", "Moyen", "Élevé", "Très élevé"][dep.weight - 1]}
        `;
      }
      return "";
    },
  },
  legend: {
    data: layerLabels,
    bottom: 10,
    left: "center",
    itemWidth: 14,
    itemHeight: 14,
  },
  grid: {
    left: 100,
    right: 80,
    top: 100,
    bottom: 80,
  },
  xAxis: {
    type: "category",
    data: layerLabels,
    name: "Couche technique",
    nameLocation: "middle",
    nameGap: 35,
    axisLine: { show: true },
    axisTick: { show: false },
    splitLine: {
      show: true,
      lineStyle: { type: "dashed", opacity: 0.3 },
    },
  },
  yAxis: {
    type: "value",
    name: "Criticité business",
    nameLocation: "middle",
    nameGap: 50,
    min: 40,
    max: 105,
    axisLabel: {
      formatter: "{value} %",
    },
    splitLine: {
      show: true,
      lineStyle: { type: "dashed", opacity: 0.3 },
    },
  },
  series: [
    {
      type: "graph",
      layout: "none",
      coordinateSystem: "cartesian2d",
      symbolSize: 30,
      edgeSymbol: ["none", "arrow"],
      edgeSymbolSize: [0, 8],
      data: graphNodes,
      links: graphLinks,
      lineStyle: {
        color: "#666",
      },
      emphasis: {
        focus: "adjacency",
        lineStyle: {
          width: 4,
        },
      },
      // Légende personnalisée via categories
      categories: layerLabels.map((label, i) => ({
        name: label,
        itemStyle: { color: layerColors[i] },
      })),
    },
  ],
  // Annotations visuelles pour les zones critiques
  graphic: [
    {
      type: "group",
      left: "75%",
      top: "15%",
      children: [
        {
          type: "rect",
          shape: { width: 120, height: 25 },
          style: {
            fill: "rgba(231, 76, 60, 0.1)",
            stroke: "#e74c3c",
            lineWidth: 1,
          },
          z: -1,
        },
        {
          type: "text",
          left: "center",
          top: "middle",
          style: {
            text: "🔥 Zone critique",
            fontSize: 10,
            fill: "#e74c3c",
          },
        },
      ],
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Graphique de réseau sur coordonnées cartésiennes (Graph on Cartesian)

### ✅ Quand utiliser ce type de diagramme

Le graphique de réseau positionné sur un système d'axes cartésiens est idéal dans les situations suivantes :

- **Visualiser des relations + une dimension métrique** : les nœuds sont positionnés selon deux axes significatifs, pas seulement par force d'attraction
- **Architecture de systèmes** : microservices, pipelines de données, flux de processus
- **Analyse de dépendances** : quels composants dépendent de quels autres, avec un contexte spatial
- **Cartographie organisationnelle** : organigrammes avec dimensions supplémentaires (ancienneté, salaire, performance)
- **Workflow avec priorité** : tâches liées entre elles mais ordonnées par importance ou temps

**Exemples concrets :**
- Architecture microservices avec couches techniques et criticité
- Pipeline CI/CD avec étapes et durée d'exécution
- Dépendances de packages avec versions et popularité
- Réseau de transport avec lignes géographiques

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce type de graphique dans ces cas :

- **Réseaux sociaux purs** : si les positions n'ont pas de signification, utilisez un layout force
- **Trop de nœuds (> 50)** : le graphique devient illisible, envisagez une vue hiérarchique
- **Relations non directionnelles** : si le sens des flèches n'a pas d'importance
- **Données sans structure bidimensionnelle** : les axes X et Y doivent avoir un sens métier

**Différences avec le Force Layout :**

| Aspect | Graph on Cartesian | Force Layout |
|--------|-------------------|--------------|
| Position des nœuds | Fixée par les données (x, y) | Calculée par algorithme |
| Lisibilité | Haute si axes pertinents | Variable selon la densité |
| Information supplémentaire | 2 dimensions métriques | Relations uniquement |
| Interactivité | Limitée | Nœuds déplaçables |

### 💡 Bonnes pratiques illustrées dans cet exemple

1. **Axes significatifs** : X = couche technique (Frontend → Infra), Y = criticité business
2. **Encodage multiple** : 
   - Couleur = couche technique
   - Taille = volume de trafic
   - Bordure = statut (vert/orange/rouge)
   - Style de ligne = synchrone/asynchrone
3. **Mise en évidence des alertes** : les services dégradés/critiques sont visuellement marqués
4. **Tooltip informatif** : détails complets au survol sans surcharger la vue
5. **Focus sur adjacence** : au survol, seules les connexions pertinentes sont mises en avant

### ⚠️ Erreurs courantes à éviter

- ❌ Utiliser des axes sans signification réelle
- ❌ Trop de liens qui se croisent : regrouper ou filtrer
- ❌ Nœuds trop petits pour être cliqués
- ❌ Légende absente pour les couleurs et formes
- ❌ Pas de direction sur les flèches quand le sens compte
`;

export default function GraphOnCartesian() {
  return (
    <ChartEditor
      title="Graph on Cartesian"
      section="Graph"
      option={option}
      notes={notes}
    />
  );
}
