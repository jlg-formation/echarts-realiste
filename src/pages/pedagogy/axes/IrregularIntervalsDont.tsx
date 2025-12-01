import { ChartEditor } from "../../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Évolution du chiffre d'affaires - Données trimestrielles irrégulières
// ❌ Mauvaise pratique : intervalles temporels non uniformes sur l'axe X
const periodes = ["T1 2023", "T2 2023", "T4 2023", "T2 2024", "T4 2024"];
const chiffreAffaires = [1.2, 1.35, 1.48, 1.52, 1.71];

const option: EChartsOption = {
  title: {
    text: "Évolution du CA de TechStartup SA",
    subtext: "⚠️ Attention : les intervalles temporels sont irréguliers !",
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
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      return `<b>${p[0].name}</b><br/>CA : <b>${p[0].value.toFixed(2)} M€</b>`;
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
    data: periodes,
    axisLabel: {
      fontSize: 12,
    },
    name: "Période",
    nameLocation: "middle",
    nameGap: 35,
  },
  yAxis: {
    type: "value",
    name: "Chiffre d'affaires (M€)",
    nameLocation: "middle",
    nameGap: 50,
    min: 1,
    max: 2,
    axisLabel: {
      formatter: "{value} M€",
    },
  },
  series: [
    {
      name: "Chiffre d'affaires",
      type: "line",
      data: chiffreAffaires,
      smooth: true,
      symbol: "circle",
      symbolSize: 10,
      lineStyle: {
        width: 3,
        color: "#3b82f6",
      },
      itemStyle: {
        color: "#3b82f6",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
            { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
          ],
        },
      },
      label: {
        show: true,
        position: "top",
        formatter: "{c} M€",
        fontSize: 11,
        fontWeight: "bold",
      },
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Intervalles temporels irréguliers

### ❌ Pourquoi c'est une mauvaise pratique

Ce graphique affiche des données trimestrielles mais **omet certains trimestres** (T3 2023, T1 2024, T3 2024) sans l'indiquer clairement :

**Problèmes majeurs :**
1. **Pente trompeuse** : la ligne suggère une croissance régulière alors qu'elle cache des périodes
2. **Temps compressé** : entre T2 2023 et T4 2023, il y a 2 trimestres mais l'axe les représente comme 1 intervalle
3. **Impossible de calculer** le taux de croissance réel visuellement
4. **Manipulation potentielle** : on peut cacher des périodes de baisse

**Ce qui est trompeur ici :**
- La pente entre T4 2023 (1.48 M€) et T2 2024 (1.52 M€) représente 6 mois
- Mais elle apparaît identique à celle entre T1 2023 (1.2 M€) et T2 2023 (1.35 M€) qui ne représente que 3 mois
- Le lecteur ne peut pas déduire la vitesse réelle de croissance

### 🚫 Exemple concret de manipulation

Une entreprise pourrait utiliser cette technique pour :
- Cacher un trimestre de baisse (ex: T3 2023 à 1.30 M€)
- Montrer uniquement les trimestres en croissance
- Créer une impression de croissance linéaire constante

### 🔧 Comment corriger

Voir la version "Do" de cet exemple qui :
- Affiche **tous les trimestres** sans exception
- Utilise des marqueurs pour les données manquantes
- Permet une analyse honnête de la tendance
`;

export default function IrregularIntervalsDont() {
  return (
    <ChartEditor
      title="❌ Intervalles temporels irréguliers (mauvaise pratique)"
      section="Pedagogy"
      option={option}
      notes={notes}
    />
  );
}
