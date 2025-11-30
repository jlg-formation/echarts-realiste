import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Top 10 pays par PIB nominal 2024 (en milliards USD)
// Source: FMI - World Economic Outlook 2024
const paysData = [
  { pays: "🇺🇸 États-Unis", pib: 28780, variation: 2.8 },
  { pays: "🇨🇳 Chine", pib: 18530, variation: 4.6 },
  { pays: "🇩🇪 Allemagne", pib: 4590, variation: 0.2 },
  { pays: "🇯🇵 Japon", pib: 4110, variation: 1.0 },
  { pays: "🇮🇳 Inde", pib: 3940, variation: 6.8 },
  { pays: "🇬🇧 Royaume-Uni", pib: 3500, variation: 0.5 },
  { pays: "🇫🇷 France", pib: 3130, variation: 0.7 },
  { pays: "🇮🇹 Italie", pib: 2330, variation: 0.7 },
  { pays: "🇧🇷 Brésil", pib: 2330, variation: 2.9 },
  { pays: "🇨🇦 Canada", pib: 2240, variation: 1.4 },
];

const option: EChartsOption = {
  title: {
    text: "Top 10 des puissances économiques mondiales (2024)",
    subtext: `PIB nominal en Mds USD · 🇮🇳 L'Inde dépasse le Royaume-Uni · Source : FMI`,
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
      const p = (
        params as { name: string; value: number; dataIndex: number }[]
      )[0];
      const data = paysData[p.dataIndex];
      const partMondiale = ((data.pib / 105000) * 100).toFixed(1);
      const varColor =
        data.variation >= 3
          ? "#22c55e"
          : data.variation >= 1
            ? "#3b82f6"
            : "#f59e0b";
      const varIcon =
        data.variation >= 3 ? "🚀" : data.variation >= 1 ? "📈" : "📊";
      return `
        <b>${data.pays}</b><br/><br/>
        PIB : <b>${data.pib.toLocaleString("fr-FR")} Mds $</b><br/>
        Part du PIB mondial : ${partMondiale} %<br/>
        <span style="color: ${varColor}">${varIcon} Croissance : +${data.variation} %</span>
      `;
    },
  },
  grid: {
    left: 150,
    right: 80,
    bottom: 40,
    top: 80,
  },
  xAxis: {
    type: "value",
    name: "PIB (Milliards USD)",
    nameLocation: "middle",
    nameGap: 30,
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000) {
          return `${(value / 1000).toLocaleString("fr-FR")} T$`;
        }
        return `${value.toLocaleString("fr-FR")} Mds$`;
      },
    },
    max: 32000,
  },
  yAxis: {
    type: "category",
    data: paysData.map((p) => p.pays).reverse(),
    axisLabel: {
      fontSize: 12,
      fontWeight: "bold",
    },
    axisTick: { show: false },
  },
  series: [
    {
      type: "bar",
      data: paysData
        .map((p, index) => {
          let couleur = "#94a3b8"; // Gris par défaut
          if (index === 0)
            couleur = "#f59e0b"; // Or - 1er
          else if (index === 1)
            couleur = "#6b7280"; // Argent - 2ème
          else if (index === 2)
            couleur = "#b45309"; // Bronze - 3ème
          else if (p.variation >= 5) couleur = "#22c55e"; // Vert - Forte croissance

          return {
            value: p.pib,
            itemStyle: {
              color: couleur,
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              position: "right" as const,
              formatter: () => {
                const emoji = p.variation >= 5 ? "🚀" : "";
                return `${p.pib.toLocaleString("fr-FR")} ${emoji}`;
              },
              fontSize: 11,
              fontWeight: "bold" as const,
            },
          };
        })
        .reverse(),
      barWidth: "60%",
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
  ],
  graphic: [
    {
      type: "text",
      left: "center",
      bottom: 5,
      style: {
        text: "🥇 Or : 1er  |  🥈 Argent : 2ème  |  🥉 Bronze : 3ème  |  🚀 Croissance > 5 %",
        fontSize: 10,
        fill: "#6b7280",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres horizontales (Classement)

### ✅ Quand utiliser ce type de diagramme

Le diagramme en barres horizontales est idéal pour :

- **Afficher un classement** : du plus grand au plus petit
- **Comparer de longues étiquettes** : les noms de pays, produits, personnes sont lisibles
- **Montrer des données quantitatives catégorielles** : PIB, population, ventes par entité
- **Faciliter la lecture de gauche à droite** : sens naturel de lecture
- **Afficher 5-20 éléments** : au-delà, envisager un tableau ou un treemap

**Exemples concrets :**
- Classement des pays par PIB, population, CO2
- Top vendeurs par chiffre d'affaires
- Langages de programmation les plus populaires
- Répartition des dépenses par poste

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce diagramme dans ces cas :

- **Données temporelles** : préférez un line chart
- **Proportions d'un tout** : préférez un pie chart
- **Comparaison de séries multiples** : un grouped bar chart sera plus clair
- **Valeurs très proches** : les différences seront difficiles à percevoir
- **Données avec beaucoup de décimales** : arrondissez ou utilisez un tableau

**Erreurs courantes à éviter :**
- Ne pas trier les barres (sauf si l'ordre a un sens)
- Tronquer l'axe X (commence toujours à 0)
- Utiliser des couleurs aléatoires sans signification

### 🔧 Fonctionnalités ECharts utilisées

- **yAxis.type: "category"** : catégories sur l'axe Y pour des barres horizontales
- **Couleurs par rang** : or, argent, bronze pour le podium
- **Couleur conditionnelle** : vert pour les pays à forte croissance
- **label.position: "right"** : valeurs à droite de chaque barre
- **graphic** : légende personnalisée en bas du graphique

### 📊 Analyse de ce graphique

Ce graphique présente les 10 premières économies mondiales en 2024 :

- **🏆 Domination américaine** : les États-Unis (28 780 Mds $) dépassent la Chine de 55 %
- **🚀 L'Inde monte** : 5ème économie mondiale, dépasse le Royaume-Uni avec +6,8 % de croissance
- **🇪🇺 Europe fragmentée** : Allemagne, UK, France, Italie représentent 13 550 Mds $ combinés
- **📉 Japon en perte de vitesse** : croissance de seulement 1 %, dépassé par l'Inde

**Insight clé** : Le top 10 représente environ 67 % du PIB mondial. L'écart entre les États-Unis et le reste du monde continue de se creuser.

**Tendances à surveiller** :
1. La Chine face aux défis immobiliers et démographiques
2. L'Inde comme prochain moteur de croissance mondiale
3. L'Allemagne affectée par la crise énergétique
4. Le Brésil qui talonne l'Italie
`;

export default function WorldPopulation() {
  return (
    <ChartEditor
      title="World Population"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
