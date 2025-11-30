import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Segmentation clients e-commerce - Analyse RFM simplifiée
// R = Récence (jours depuis dernier achat)
// F = Fréquence (nombre de commandes)
// M = Montant (panier moyen)

// Génération de données réalistes pour 4 clusters clients
const generateClusterData = () => {
  const clusters = [];

  // Cluster 1 : "Champions" (Haute fréquence, haut montant)
  for (let i = 0; i < 25; i++) {
    clusters.push({
      frequence: 8 + Math.random() * 7, // 8-15 commandes
      montant: 120 + Math.random() * 80, // 120-200€ panier moyen
      cluster: "Champions",
    });
  }

  // Cluster 2 : "Fidèles" (Bonne fréquence, montant moyen)
  for (let i = 0; i < 30; i++) {
    clusters.push({
      frequence: 4 + Math.random() * 4, // 4-8 commandes
      montant: 60 + Math.random() * 50, // 60-110€ panier moyen
      cluster: "Fidèles",
    });
  }

  // Cluster 3 : "Occasionnels" (Faible fréquence, montant variable)
  for (let i = 0; i < 35; i++) {
    clusters.push({
      frequence: 1 + Math.random() * 3, // 1-4 commandes
      montant: 40 + Math.random() * 60, // 40-100€ panier moyen
      cluster: "Occasionnels",
    });
  }

  // Cluster 4 : "VIP" (Fréquence moyenne mais très haut montant)
  for (let i = 0; i < 10; i++) {
    clusters.push({
      frequence: 3 + Math.random() * 5, // 3-8 commandes
      montant: 200 + Math.random() * 150, // 200-350€ panier moyen
      cluster: "VIP",
    });
  }

  return clusters;
};

const clientsData = generateClusterData();

// Couleurs et symboles par cluster
const clusterConfig: Record<
  string,
  { color: string; symbol: string; description: string }
> = {
  Champions: {
    color: "#22c55e",
    symbol: "diamond",
    description: "Clients les plus actifs et rentables",
  },
  Fidèles: {
    color: "#3b82f6",
    symbol: "circle",
    description: "Base solide, potentiel d'upgrade",
  },
  Occasionnels: {
    color: "#f59e0b",
    symbol: "triangle",
    description: "À réactiver, besoin de nurturing",
  },
  VIP: {
    color: "#a855f7",
    symbol: "rect",
    description: "Fort pouvoir d'achat, à fidéliser",
  },
};

// Calcul des centroïdes (moyennes par cluster)
const centroids = Object.keys(clusterConfig).map((cluster) => {
  const clusterClients = clientsData.filter((c) => c.cluster === cluster);
  const avgFreq =
    clusterClients.reduce((sum, c) => sum + c.frequence, 0) /
    clusterClients.length;
  const avgMontant =
    clusterClients.reduce((sum, c) => sum + c.montant, 0) /
    clusterClients.length;
  return {
    cluster,
    frequence: avgFreq,
    montant: avgMontant,
    count: clusterClients.length,
  };
});

// Calcul du CA total par cluster
const caParCluster = Object.keys(clusterConfig).map((cluster) => {
  const clusterClients = clientsData.filter((c) => c.cluster === cluster);
  const ca = clusterClients.reduce(
    (sum, c) => sum + c.frequence * c.montant,
    0
  );
  return { cluster, ca };
});

const caTotal = caParCluster.reduce((sum, c) => sum + c.ca, 0);

const option: EChartsOption = {
  title: {
    text: "Segmentation clients e-commerce - Analyse RFM",
    subtext: `${clientsData.length} clients analysés · 4 clusters identifiés · CA total : ${Math.round(caTotal).toLocaleString("fr-FR")} €`,
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
        data: number[];
        seriesName: string;
        seriesIndex: number;
      };

      // Ignorer les centroïdes
      if (p.seriesName.includes("Centroïde")) {
        const centroid = centroids[Math.floor(p.seriesIndex / 2)];
        return `
          <b>📍 Centroïde : ${centroid.cluster}</b><br/><br/>
          Fréquence moy. : <b>${centroid.frequence.toFixed(1)} cmd</b><br/>
          Panier moy. : <b>${centroid.montant.toFixed(0)} €</b><br/>
          Nb clients : <b>${centroid.count}</b>
        `;
      }

      const freq = p.data[0];
      const montant = p.data[1];
      const caClient = freq * montant;
      const config = clusterConfig[p.seriesName];

      return `
        <b>${config?.symbol === "diamond" ? "💎" : config?.symbol === "rect" ? "👑" : config?.symbol === "circle" ? "🔵" : "🔶"} ${p.seriesName}</b><br/><br/>
        Fréquence : <b>${freq.toFixed(1)} commandes/an</b><br/>
        Panier moyen : <b>${montant.toFixed(0)} €</b><br/>
        CA annuel : <b>${caClient.toFixed(0).toLocaleString()} €</b><br/>
        <em style="color: #888">${config?.description}</em>
      `;
    },
  },
  legend: {
    top: 60,
    data: Object.keys(clusterConfig),
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
    name: "Fréquence (commandes/an)",
    nameLocation: "middle",
    nameGap: 35,
    min: 0,
    max: 18,
    axisLabel: {
      formatter: "{value} cmd",
    },
  },
  yAxis: {
    type: "value",
    name: "Panier moyen (€)",
    min: 0,
    max: 400,
    axisLabel: {
      formatter: (value: number) => `${value} €`,
    },
  },
  series: [
    // Points par cluster
    ...Object.entries(clusterConfig).map(([cluster, config]) => ({
      name: cluster,
      type: "scatter" as const,
      data: clientsData
        .filter((c) => c.cluster === cluster)
        .map((c) => [c.frequence, c.montant]),
      symbolSize: 10,
      symbol: config.symbol,
      itemStyle: {
        color: config.color,
        opacity: 0.7,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
          opacity: 1,
        },
      },
    })),
    // Centroïdes (points plus gros)
    ...centroids.map((c) => ({
      name: `Centroïde ${c.cluster}`,
      type: "scatter" as const,
      data: [[c.frequence, c.montant]],
      symbolSize: 20,
      symbol: "pin",
      itemStyle: {
        color: clusterConfig[c.cluster].color,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: true,
        position: "top" as const,
        formatter: c.cluster,
        fontSize: 10,
        fontWeight: "bold" as const,
        color: clusterConfig[c.cluster].color,
      },
    })),
  ],
  // Zones visuelles pour les clusters
  visualMap: {
    show: false,
    dimension: 1,
    min: 0,
    max: 400,
  },
};

const notes = `
## 📚 Note pédagogique : Clustering / Segmentation

### ✅ Quand utiliser ce type de visualisation

Le scatter plot avec clustering est idéal pour :

- **Segmentation client** : identifier des groupes homogènes
- **Analyse RFM** : Récence, Fréquence, Montant
- **Détection de patterns** : groupes naturels dans les données
- **Validation de clustering** : vérifier visuellement les résultats K-means
- **Stratégie marketing** : adapter les actions par segment

**Exemples concrets :**
- Segmentation clients e-commerce (VIP, fidèles, dormants)
- Analyse de portefeuille produits (cash cows, stars, dogs)
- Clustering géographique de points de vente
- Profils utilisateurs d'une app mobile

### ❌ Quand ne pas utiliser

- **Plus de 2-3 dimensions** : difficile à visualiser (utiliser t-SNE/UMAP)
- **Clusters mal séparés** : les couleurs se mélangent, confusion
- **Trop de clusters** (> 6-7) : palette de couleurs saturée
- **Données temporelles** : préférer des line charts par segment

### 📊 Analyse de cette segmentation

**4 segments identifiés :**

| Segment | Clients | Fréquence | Panier | CA | Action |
|---------|---------|-----------|--------|----|----|
| 💎 Champions | 25 % | 11 cmd/an | 160 € | 35 % CA | Fidéliser, programme VIP |
| 🔵 Fidèles | 30 % | 6 cmd/an | 85 € | 25 % CA | Cross-sell, upgrade |
| 🔶 Occasionnels | 35 % | 2 cmd/an | 70 € | 15 % CA | Réactivation, promos |
| 👑 VIP | 10 % | 5 cmd/an | 275 € | 25 % CA | White glove, exclusivité |

**Insights clés :**
- 10 % des clients (VIP) génèrent 25 % du CA
- Les Champions sont les plus rentables (volume × panier)
- 35 % de clients occasionnels à réactiver = opportunité
- Les Fidèles ont un potentiel d'upgrade vers Champions

### 🎯 Stratégies par segment

**💎 Champions (Haute valeur, haute activité)**
- Programme de fidélité premium
- Accès anticipé aux nouveautés
- Service client prioritaire
- Parrainage récompensé

**👑 VIP (Haute valeur, activité modérée)**
- Personal shopper dédié
- Événements exclusifs
- Livraison premium offerte
- Cadeau anniversaire luxe

**🔵 Fidèles (Valeur moyenne, réguliers)**
- Cross-selling personnalisé
- Offres bundle attractives
- Programme points progressif
- Upgrade vers Champion possible

**🔶 Occasionnels (À réactiver)**
- Campagnes de win-back
- Codes promo limités dans le temps
- Abandon de panier automatisé
- Contenu inspirationnel

### 🔧 Fonctionnalités ECharts utilisées

- **Scatter multi-séries** : un type par cluster
- **Symboles différenciés** : diamond, circle, triangle, rect
- **Centroïdes** : symbol "pin" pour marquer le centre
- **Labels sur centroïdes** : identification directe des clusters
- **Couleurs sémantiques** : vert = bon, violet = premium, orange = attention

### 📈 Méthodologie de clustering

**Algorithme typique : K-means**
1. Choisir K = nombre de clusters (ici K=4)
2. Initialiser K centroïdes aléatoires
3. Affecter chaque point au centroïde le plus proche
4. Recalculer les centroïdes (moyenne du cluster)
5. Répéter 3-4 jusqu'à convergence

**Choix du K optimal :**
- Méthode du coude (elbow method)
- Silhouette score
- Connaissance métier (ex: 4 segments = gérable pour le marketing)

### 💡 Tips pour visualiser des clusters

- **Limiter à 4-6 clusters** pour la lisibilité
- **Utiliser formes + couleurs** : accessibilité daltoniens
- **Afficher les centroïdes** : repères visuels clairs
- **Ajouter les métriques clés** dans le tooltip
- **Éviter le chevauchement** : opacity < 1 ou jittering
- **Nommer les clusters** : labels business, pas "Cluster 1"

### 📖 KPIs à suivre par segment

| Segment | KPIs prioritaires |
|---------|------------------|
| Champions | Rétention, LTV, NPS |
| VIP | Panier moyen, récence |
| Fidèles | Fréquence, cross-sell rate |
| Occasionnels | Taux réactivation, CAC |

### 🚀 Pour aller plus loin

- **RFM complet** : ajouter la dimension Récence
- **Clustering 3D** : scatter3D avec ECharts GL
- **Animation** : montrer l'évolution des segments dans le temps
- **Prédiction** : classifier automatiquement les nouveaux clients
`;

export default function ClusteringProcess() {
  return (
    <ChartEditor
      title="Clustering Process"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
