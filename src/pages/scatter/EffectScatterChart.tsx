import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Épidémie - Foyers actifs en France (simulation réaliste)
// Contexte : suivi d'une épidémie de grippe aviaire dans les élevages

// Données des foyers actifs par région
const foyersData = [
  // Bretagne - Zone la plus touchée (forte densité d'élevages)
  {
    region: "Bretagne",
    lat: 48.2,
    lng: -2.8,
    foyers: 45,
    cas: 125000,
    statut: "critique",
  },
  {
    region: "Finistère",
    lat: 48.4,
    lng: -4.5,
    foyers: 18,
    cas: 48000,
    statut: "critique",
  },
  {
    region: "Côtes-d'Armor",
    lat: 48.5,
    lng: -2.9,
    foyers: 22,
    cas: 62000,
    statut: "critique",
  },

  // Pays de la Loire - Zone touchée
  {
    region: "Vendée",
    lat: 46.7,
    lng: -1.4,
    foyers: 28,
    cas: 78000,
    statut: "alerte",
  },
  {
    region: "Loire-Atlantique",
    lat: 47.3,
    lng: -1.8,
    foyers: 15,
    cas: 42000,
    statut: "alerte",
  },
  {
    region: "Maine-et-Loire",
    lat: 47.5,
    lng: -0.5,
    foyers: 8,
    cas: 22000,
    statut: "alerte",
  },

  // Sud-Ouest - Foyers émergents
  {
    region: "Landes",
    lat: 43.9,
    lng: -0.8,
    foyers: 12,
    cas: 35000,
    statut: "alerte",
  },
  {
    region: "Gers",
    lat: 43.7,
    lng: 0.4,
    foyers: 6,
    cas: 18000,
    statut: "surveillance",
  },
  {
    region: "Pyrénées-Atlantiques",
    lat: 43.3,
    lng: -0.8,
    foyers: 4,
    cas: 12000,
    statut: "surveillance",
  },

  // Autres régions - Surveillance
  {
    region: "Deux-Sèvres",
    lat: 46.6,
    lng: -0.3,
    foyers: 5,
    cas: 14000,
    statut: "surveillance",
  },
  {
    region: "Charente-Maritime",
    lat: 45.8,
    lng: -0.9,
    foyers: 3,
    cas: 8500,
    statut: "surveillance",
  },
  {
    region: "Sarthe",
    lat: 47.9,
    lng: 0.2,
    foyers: 2,
    cas: 5200,
    statut: "surveillance",
  },
  {
    region: "Indre-et-Loire",
    lat: 47.3,
    lng: 0.7,
    foyers: 1,
    cas: 2800,
    statut: "surveillance",
  },
];

// Statistiques globales
const totalFoyers = foyersData.reduce((acc, d) => acc + d.foyers, 0);
const totalCas = foyersData.reduce((acc, d) => acc + d.cas, 0);
const zonesCritiques = foyersData.filter((d) => d.statut === "critique").length;
const zonesAlerte = foyersData.filter((d) => d.statut === "alerte").length;

// Configuration des couleurs par statut
const statutConfig: Record<string, { color: string; rippleColor: string }> = {
  critique: { color: "#dc2626", rippleColor: "rgba(220, 38, 38, 0.4)" },
  alerte: { color: "#f59e0b", rippleColor: "rgba(245, 158, 11, 0.4)" },
  surveillance: { color: "#22c55e", rippleColor: "rgba(34, 197, 94, 0.4)" },
};

// Conversion coordonnées pour affichage dans un plan cartésien simplifié
// (on simule une carte de France avec x = longitude, y = latitude)
const convertToCartesian = (lat: number, lng: number) => {
  // Normalisation pour afficher sur un plan [0, 100]
  const x = ((lng + 5) / 10) * 100; // lng de -5 à 5 → x de 0 à 100
  const y = ((lat - 42) / 8) * 100; // lat de 42 à 50 → y de 0 à 100
  return [x, y];
};

const option: EChartsOption = {
  title: {
    text: "🦠 Épidémie Grippe Aviaire - Foyers actifs en France",
    subtext: `${totalFoyers} foyers · ${(totalCas / 1000).toFixed(0)}k volailles touchées · ${zonesCritiques} zones critiques · ${zonesAlerte} zones en alerte`,
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
      const p = params as { data: (number | string)[] };
      const foyer = foyersData.find((d) => d.region === p.data[3]);
      if (!foyer) return "";

      const statutEmoji =
        foyer.statut === "critique"
          ? "🔴"
          : foyer.statut === "alerte"
            ? "🟠"
            : "🟢";
      const statutLabel =
        foyer.statut.charAt(0).toUpperCase() + foyer.statut.slice(1);

      return `
        <b>📍 ${foyer.region}</b><br/><br/>
        Statut : ${statutEmoji} <b>${statutLabel}</b><br/>
        Foyers actifs : <b>${foyer.foyers}</b><br/>
        Volailles touchées : <b>${foyer.cas.toLocaleString("fr-FR")}</b><br/>
        <br/>
        ${foyer.statut === "critique" ? "⚠️ <b>Zone d'abattage préventif</b>" : ""}
        ${foyer.statut === "alerte" ? "⚠️ <b>Zone de protection renforcée</b>" : ""}
        ${foyer.statut === "surveillance" ? "📋 <b>Surveillance renforcée</b>" : ""}
      `;
    },
  },
  legend: {
    top: 60,
    data: ["🔴 Critique", "🟠 Alerte", "🟢 Surveillance"],
    textStyle: {
      fontSize: 11,
    },
  },
  grid: {
    left: 60,
    right: 40,
    top: 100,
    bottom: 60,
  },
  xAxis: {
    type: "value",
    name: "Longitude (Ouest → Est)",
    nameLocation: "middle",
    nameGap: 35,
    min: -20,
    max: 120,
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
  },
  yAxis: {
    type: "value",
    name: "Latitude (Sud → Nord)",
    min: -10,
    max: 110,
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
  },
  series: [
    // Effet scatter pour les zones critiques
    {
      name: "🔴 Critique",
      type: "effectScatter",
      data: foyersData
        .filter((d) => d.statut === "critique")
        .map((d) => {
          const [x, y] = convertToCartesian(d.lat, d.lng);
          return [x, y, d.foyers, d.region];
        }),
      symbolSize: (val: number[]) => Math.sqrt(val[2]) * 6,
      rippleEffect: {
        brushType: "stroke",
        scale: 3,
        period: 2,
      },
      itemStyle: {
        color: statutConfig.critique.color,
        shadowBlur: 10,
        shadowColor: statutConfig.critique.rippleColor,
      },
      label: {
        show: true,
        position: "right",
        formatter: (params: unknown) => {
          const p = params as { data: (number | string)[] };
          return String(p.data[3]);
        },
        fontSize: 10,
      },
    },
    // Effet scatter pour les zones en alerte
    {
      name: "🟠 Alerte",
      type: "effectScatter",
      data: foyersData
        .filter((d) => d.statut === "alerte")
        .map((d) => {
          const [x, y] = convertToCartesian(d.lat, d.lng);
          return [x, y, d.foyers, d.region];
        }),
      symbolSize: (val: number[]) => Math.sqrt(val[2]) * 6,
      rippleEffect: {
        brushType: "stroke",
        scale: 2.5,
        period: 3,
      },
      itemStyle: {
        color: statutConfig.alerte.color,
        shadowBlur: 8,
        shadowColor: statutConfig.alerte.rippleColor,
      },
      label: {
        show: true,
        position: "right",
        formatter: (params: unknown) => {
          const p = params as { data: (number | string)[] };
          return String(p.data[3]);
        },
        fontSize: 10,
      },
    },
    // Scatter simple pour les zones en surveillance
    {
      name: "🟢 Surveillance",
      type: "effectScatter",
      data: foyersData
        .filter((d) => d.statut === "surveillance")
        .map((d) => {
          const [x, y] = convertToCartesian(d.lat, d.lng);
          return [x, y, d.foyers, d.region];
        }),
      symbolSize: (val: number[]) => Math.sqrt(val[2]) * 5,
      rippleEffect: {
        brushType: "stroke",
        scale: 2,
        period: 4,
      },
      itemStyle: {
        color: statutConfig.surveillance.color,
        shadowBlur: 5,
        shadowColor: statutConfig.surveillance.rippleColor,
      },
      label: {
        show: true,
        position: "right",
        formatter: (params: unknown) => {
          const p = params as { data: (number | string)[] };
          return String(p.data[3]);
        },
        fontSize: 9,
        color: "#666",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Effect Scatter Chart

### ✅ Quand utiliser ce type de diagramme

L'**effect scatter** (scatter avec effet de pulsation) est idéal pour :

- **Alertes en temps réel** : foyers épidémiques, incidents, alarmes
- **Données géolocalisées critiques** : accidents, incendies, séismes
- **Mise en évidence de points importants** : outliers, anomalies
- **Tableaux de bord de monitoring** : serveurs en panne, capteurs en alerte
- **Visualisation d'événements actifs** : signalement de problèmes

**L'animation attire l'œil** → réservé aux données qui nécessitent une attention immédiate.

### ❌ Quand ne pas utiliser

- **Données statiques** : l'animation devient distrayante
- **Tous les points sont importants** : si tout pulse, rien ne ressort
- **Analyse fine** : l'effet masque les détails
- **Impression papier** : l'animation ne se voit pas
- **Accessibilité** : les utilisateurs sensibles aux animations

### 📊 Analyse de ce graphique

**Situation épidémique simulée :**

| Statut | Zones | Foyers | Volailles touchées |
|--------|-------|--------|-------------------|
| 🔴 Critique | 3 | 85 | 235 000 |
| 🟠 Alerte | 6 | 74 | 207 000 |
| 🟢 Surveillance | 4 | 11 | 30 500 |
| **Total** | **13** | **${totalFoyers}** | **${(totalCas / 1000).toFixed(0)}k** |

**Analyse géographique :**
- **Bretagne** : épicentre de la crise (densité élevée d'élevages)
- **Pays de la Loire** : propagation secondaire
- **Sud-Ouest** : foyers émergents à surveiller

### 🔧 Fonctionnalités ECharts utilisées

**type: "effectScatter"** au lieu de "scatter" :

\`\`\`javascript
{
  type: 'effectScatter',
  rippleEffect: {
    brushType: 'stroke', // 'stroke' ou 'fill'
    scale: 3,            // taille max de l'onde
    period: 2,           // durée en secondes
  },
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(255, 0, 0, 0.4)',
  }
}
\`\`\`

**Paramètres rippleEffect :**
- \`brushType\` : 'stroke' (contour) ou 'fill' (rempli)
- \`scale\` : amplitude de l'onde (2-5 recommandé)
- \`period\` : durée d'un cycle en secondes
- \`number\` : nombre d'ondes simultanées (défaut: 3)

**symbolSize dynamique :**
\`\`\`javascript
symbolSize: (val) => Math.sqrt(val[2]) * 6
\`\`\`
La taille du point reflète le nombre de foyers (racine carrée pour éviter les tailles extrêmes).

### 🎨 Design et accessibilité

**Couleurs sémantiques :**
- 🔴 Rouge = danger/critique (saturation élevée)
- 🟠 Orange = alerte/attention
- 🟢 Vert = surveillance/OK

**Fréquence d'animation différenciée :**
- Critique : period=2s (pulsation rapide)
- Alerte : period=3s (modéré)
- Surveillance : period=4s (calme)

**Labels directs :**
Les noms de régions sont affichés directement, pas besoin de hover.

### 📈 Cas d'usage professionnels

**1. Cybersécurité**
- Serveurs compromis (rouge pulsant)
- Tentatives d'intrusion (orange)
- Activité normale (vert statique)

**2. Logistique**
- Colis bloqués (rouge)
- Retards de livraison (orange)
- En transit (vert)

**3. Industrie 4.0**
- Machines en panne (rouge)
- Maintenance préventive (orange)
- Fonctionnement normal (vert statique)

**4. Smart City**
- Embouteillages (rouge)
- Trafic dense (orange)
- Trafic fluide (vert)

### ⚡ Performance

**Limiter le nombre de points animés :**
- < 50 points avec effet : fluide
- 50-200 points : acceptable
- > 200 points : risque de lag, désactiver l'effet

**Optimisations :**
\`\`\`javascript
rippleEffect: {
  scale: 2,      // réduire l'échelle
  period: 4,     // ralentir l'animation
  number: 1,     // une seule onde
}
\`\`\`

### 💡 Bonnes pratiques

1. **Réserver l'effet aux données critiques** (< 20 % des points)
2. **Différencier par la vitesse** : urgent = rapide, info = lent
3. **Combiner avec des couleurs** : l'animation seule ne suffit pas
4. **Permettre de désactiver** : option pour utilisateurs sensibles
5. **Tester sur mobile** : vérifier les performances

### 🚀 Pour aller plus loin

- **Carte réelle** : utiliser ECharts avec geoJSON de la France
- **Temps réel** : WebSocket pour mise à jour live des foyers
- **Historique** : timeline slider pour voir l'évolution
- **Prédiction** : zones à risque basées sur modèle épidémio
`;

export default function EffectScatterChart() {
  return (
    <ChartEditor
      title="Effect Scatter Chart"
      section="Scatter"
      option={option}
      notes={notes}
    />
  );
}
