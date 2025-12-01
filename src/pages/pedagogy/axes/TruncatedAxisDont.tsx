import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Parts de marché des navigateurs web - T4 2024
const navigateurs = ["Chrome", "Safari", "Edge", "Firefox", "Opera"];
const partsMarche = [65.7, 18.2, 5.1, 2.8, 2.1];

const option: EChartsOption = {
  title: {
    text: "Parts de marché navigateurs - T4 2024",
    subtext: "⚠️ Attention : cet axe est tronqué !",
    left: "center",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#dc2626",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      return `<b>${p[0].name}</b><br/>Part de marché : <b>${p[0].value} %</b>`;
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
    min: 0, // ❌ Axe tronqué à 60% !
    max: 70,
    interval: 2,
    axisLabel: {
      formatter: "{value} %",
    },
  },
  series: [
    {
      name: "Part de marché",
      type: "bar",
      data: partsMarche.map((value) => ({
        value,
        itemStyle: {
          color:
            value > 50
              ? "#3b82f6"
              : value > 10
                ? "#60a5fa"
                : value > 5
                  ? "#93c5fd"
                  : "#bfdbfe",
          borderRadius: [4, 4, 0, 0],
        },
      })),
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
## 📚 Note pédagogique : Axe Y tronqué

### ❌ Pourquoi c'est une mauvaise pratique

Un axe Y ne commençant pas à 0 **exagère visuellement les différences** entre les valeurs.
Dans cet exemple, l'axe commence à 0% mais utilise un intervalle très serré (2%) avec un maximum à 70%, ce qui :

- **Écrase visuellement** les petites valeurs (Firefox à 2.8%, Opera à 2.1%)
- **Crée une impression trompeuse** : Chrome semble dominer de manière écrasante
- **Rend difficile** la comparaison des navigateurs minoritaires entre eux

**Problèmes concrets :**
- Le lecteur ne peut pas facilement estimer que Safari (18.2%) représente presque 1/5 du marché
- La différence entre Firefox (2.8%) et Opera (2.1%) paraît insignifiante alors qu'elle représente +33%
- L'échelle tronquée masque l'ordre de grandeur réel des données

**Cas où c'est parfois acceptable :**
- Données avec une baseline naturelle (ex: température en °C où 0°C n'est pas un minimum)
- Variations très faibles sur une grande valeur (ex: cours de bourse sur une journée)
- **À condition d'indiquer clairement** que l'axe est tronqué avec une annotation visible

### 🔧 Comment corriger

Voir la version "Do" de cet exemple qui utilise :
- Un axe Y complet de 0% à 100% (ou auto-scalé)
- Des intervalles adaptés à la plage de données
- Une représentation visuelle proportionnelle aux valeurs réelles
`;

export default function TruncatedAxisDont() {
  return (
    <ChartEditor
      title="❌ Axe Y tronqué (mauvaise pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
