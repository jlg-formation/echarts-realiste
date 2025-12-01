import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Parts de marché des navigateurs web - T4 2024 (mêmes données)
const navigateurs = ["Chrome", "Safari", "Edge", "Firefox", "Opera", "Autres"];
const partsMarche = [65.7, 18.2, 5.1, 2.8, 2.1, 6.1];

const option: EChartsOption = {
  title: {
    text: "Parts de marché navigateurs - T4 2024",
    subtext:
      "🌐 Chrome domine avec 2/3 du marché · Safari profite de l'écosystème Apple",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#666",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      const total = partsMarche.reduce((a, b) => a + b, 0);
      const ratio = ((p[0].value / total) * 100).toFixed(1);
      return `<b>${p[0].name}</b><br/>Part de marché : <b>${p[0].value} %</b><br/><small>(${ratio}% du graphique)</small>`;
    },
  },
  grid: {
    left: 80,
    right: 40,
    bottom: 60,
    top: 100,
  },
  xAxis: {
    type: "category",
    data: navigateurs,
    axisLabel: {
      fontSize: 12,
    },
  },
  yAxis: {
    type: "value",
    name: "Part de marché (%)",
    nameLocation: "middle",
    nameGap: 50,
    min: 0,
    max: 100, // ✅ Axe complet de 0 à 100%
    interval: 20,
    axisLabel: {
      formatter: "{value} %",
    },
  },
  series: [
    {
      name: "Part de marché",
      type: "bar",
      data: partsMarche.map((value, index) => {
        // Couleurs distinctes pour chaque navigateur
        const colors = [
          "#4285F4", // Chrome (bleu Google)
          "#000000", // Safari (noir Apple)
          "#0078D4", // Edge (bleu Microsoft)
          "#FF7139", // Firefox (orange)
          "#FF1B2D", // Opera (rouge)
          "#9CA3AF", // Autres (gris)
        ];
        return {
          value,
          itemStyle: {
            color: colors[index],
            borderRadius: [4, 4, 0, 0],
          },
        };
      }),
      label: {
        show: true,
        position: "top",
        formatter: "{c} %",
        fontSize: 11,
        fontWeight: "bold",
      },
      barWidth: "60%",
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Axe Y complet

### ✅ Pourquoi c'est une bonne pratique

Un axe Y commençant à 0 et allant jusqu'à 100% (pour des pourcentages) permet une **représentation proportionnelle fidèle** des données :

- **Chrome (65.7%)** occupe visuellement ~2/3 de la hauteur maximale
- **Safari (18.2%)** est clairement visible comme ~1/5 du marché
- **Les "petits" navigateurs** restent lisibles et comparables entre eux

**Avantages de cette approche :**
1. **Honnêteté visuelle** : les proportions correspondent aux valeurs réelles
2. **Comparaison intuitive** : le lecteur peut estimer les ratios d'un coup d'œil
3. **Pas de manipulation** : aucune exagération des différences

### 📊 Analyse de ce graphique

**Insights clés :**
- 🏆 **Chrome domine** avec près de 2/3 du marché mondial (65.7%)
- 🍎 **Safari** profite de l'écosystème Apple (iPhone, Mac) avec 18.2%
- 📉 **Edge** peine à s'imposer malgré son intégration à Windows (5.1%)
- 🦊 **Firefox** continue de perdre du terrain (2.8%)

**Message pour les décideurs :**
- Si vous développez une application web, testez en priorité sur Chrome et Safari
- Edge et Firefox restent importants pour les utilisateurs professionnels
- Attention aux différences de comportement entre moteurs (Chromium vs WebKit vs Gecko)

### 🎨 Bonnes pratiques appliquées

- **Couleurs identitaires** : chaque navigateur a sa couleur de marque
- **Catégorie "Autres"** : évite d'avoir trop de petites barres
- **Labels directs** : les valeurs sont affichées au-dessus des barres
- **Sous-titre informatif** : résume l'insight principal
`;

export default function TruncatedAxisDo() {
  return (
    <ChartEditor
      title="✅ Axe Y complet (bonne pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
