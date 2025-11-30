import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

const notes = `
## Quand utiliser un graphique linéaire simple ?

Le **line chart basique** est le type de visualisation le plus fondamental pour représenter des données continues. Il est idéal pour :

- **Visualiser une tendance temporelle** : évolution d'une métrique dans le temps
- **Comparer l'évolution d'une seule variable** : suivi d'un KPI unique
- **Montrer des variations continues** : données qui changent progressivement

### Bonnes pratiques

1. **Limiter les points de données** : 7-10 points maximum pour une lisibilité optimale
2. **Axe Y à zéro** : commencer l'axe Y à 0 pour éviter les distorsions visuelles
3. **Marqueurs aux points clés** : ajouter des marqueurs pour mettre en évidence les valeurs importantes
4. **Labels clairs** : utiliser des labels explicites sur les axes

### Insights sur ces données

Ce graphique montre l'activité hebdomadaire avec :
- Un **pic le dimanche** (260) - probablement un jour de forte activité
- Un **creux le vendredi** (135) - le point le plus bas de la semaine
- Une **tendance relativement stable** en milieu de semaine (Tue-Thu autour de 220)

### Quand éviter ce type de graphique ?

- Données catégorielles sans ordre logique → préférer un bar chart
- Trop de séries à comparer → risque de "spaghetti chart"
- Données avec des valeurs très disparates → envisager une échelle logarithmique
`;

export default function BasicLineChart() {
  return (
    <ChartEditor
      title="Basic Line Chart"
      section="Line"
      option={option}
      notes={notes}
    />
  );
}
