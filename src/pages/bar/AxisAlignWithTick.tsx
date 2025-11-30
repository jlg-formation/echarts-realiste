import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données des heures travaillées par jour de la semaine - Équipe Dev
const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

// Heures effectives vs heures prévues
const heuresEffectives = [8.5, 9.2, 7.8, 8.7, 6.5];
const heuresPrevues = [8, 8, 8, 8, 7]; // Vendredi en RTT partiel

// Répartition par type d'activité
const heuresDev = [5.5, 6.0, 4.5, 5.2, 4.0];
const heuresReunions = [2.0, 2.2, 2.5, 2.5, 1.5];
const heuresAdmin = [1.0, 1.0, 0.8, 1.0, 1.0];

const option: EChartsOption = {
  title: {
    text: "Répartition du temps de travail - Semaine 48",
    subtext:
      "👨‍💻 Équipe Développement · Moyenne : 8,1 h/jour · 62 % dev, 26 % réunions, 12 % admin",
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
      const p = params as {
        name: string;
        value: number;
        seriesName: string;
        color: string;
      }[];

      const idx =
        p[0].name === "Lundi"
          ? 0
          : p[0].name === "Mardi"
            ? 1
            : p[0].name === "Mercredi"
              ? 2
              : p[0].name === "Jeudi"
                ? 3
                : 4;
      const total = heuresEffectives[idx];
      const prevu = heuresPrevues[idx];
      const ecart = total - prevu;
      const ecartStr =
        ecart > 0
          ? `<span style="color: #e67e22">+${ecart.toFixed(1)} h (heures sup)</span>`
          : ecart < 0
            ? `<span style="color: #27ae60">${ecart.toFixed(1)} h</span>`
            : `<span style="color: #95a5a6">Pile à l'heure !</span>`;

      let html = `<b>${p[0].name}</b><br/><br/>`;

      p.forEach((item) => {
        const pct = ((item.value / total) * 100).toFixed(0);
        html += `<span style="display:inline-block;width:10px;height:10px;background:${item.color};border-radius:2px;margin-right:5px;"></span>`;
        html += `${item.seriesName} : <b>${item.value.toFixed(1)} h</b> (${pct} %)<br/>`;
      });

      html += `<br/>Total : <b>${total.toFixed(1)} h</b> / ${prevu} h prévues<br/>`;
      html += ecartStr;

      return html;
    },
  },
  legend: {
    data: ["Développement", "Réunions", "Administratif"],
    bottom: 10,
  },
  grid: {
    left: 60,
    right: 40,
    bottom: 60,
    top: 90,
  },
  xAxis: {
    type: "category",
    data: jours,
    axisTick: {
      alignWithLabel: true,
    },
    axisLabel: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  yAxis: {
    type: "value",
    name: "Heures",
    nameLocation: "middle",
    nameGap: 40,
    max: 12,
    axisLabel: {
      formatter: "{value} h",
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        opacity: 0.5,
      },
    },
  },
  series: [
    {
      name: "Développement",
      type: "bar",
      stack: "heures",
      data: heuresDev,
      itemStyle: {
        color: "#3498db",
        borderRadius: [0, 0, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: "#2980b9",
        },
      },
    },
    {
      name: "Réunions",
      type: "bar",
      stack: "heures",
      data: heuresReunions,
      itemStyle: {
        color: "#e74c3c",
      },
      emphasis: {
        itemStyle: {
          color: "#c0392b",
        },
      },
    },
    {
      name: "Administratif",
      type: "bar",
      stack: "heures",
      data: heuresAdmin,
      itemStyle: {
        color: "#95a5a6",
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: "#7f8c8d",
        },
      },
      label: {
        show: true,
        position: "top",
        formatter: (params: { dataIndex: number }) => {
          const idx = params.dataIndex;
          const total = heuresEffectives[idx];
          const prevu = heuresPrevues[idx];
          if (total > prevu) {
            return `⚠️ +${(total - prevu).toFixed(1)} h`;
          }
          return "";
        },
        fontSize: 10,
        color: "#e67e22",
        fontWeight: "bold",
      },
    },
  ],
  markLine: {
    silent: true,
    symbol: "none",
    lineStyle: {
      color: "#27ae60",
      type: "dashed",
      width: 2,
    },
    label: {
      formatter: "8 h légales",
      position: "end",
      fontSize: 10,
    },
    data: [
      {
        yAxis: 8,
      },
    ],
  },
};

const notes = `
## 📚 Note pédagogique : Diagramme en barres avec alignement des ticks

### ✅ Quand utiliser ce type de diagramme

Ce type de bar chart avec \`axisTick.alignWithLabel: true\` est idéal pour :

- **Centrer visuellement les barres sous leur label** : plus esthétique et plus lisible
- **Afficher des données par catégorie ordonnée** : jours de la semaine, mois, étapes d'un processus
- **Empiler des sous-catégories** : montrer la composition d'un total
- **Comparer des répartitions** : comment le temps/budget/ressources est distribué

**Exemples concrets :**
- Répartition du temps de travail par type d'activité
- Composition des ventes par catégorie de produit
- Budget par poste de dépense
- Consommation énergétique par usage

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez ce graphique dans ces cas :

- **Données continues** : préférez un area chart empilé
- **Beaucoup de sous-catégories** (> 5) : les couleurs se confondent
- **Comparaison de sous-catégories entre elles** : un grouped bar chart serait plus adapté
- **Valeurs négatives** : le stacking devient confus

**Erreurs courantes à éviter :**
- Ne pas ordonner les sous-catégories de façon logique (du plus important au moins important)
- Utiliser des couleurs trop similaires
- Oublier d'afficher le total quelque part

### 🔧 Fonctionnalités ECharts utilisées

- **\`axisTick.alignWithLabel: true\`** : centre les ticks sous les barres
- **\`stack: "heures"\`** : empile les séries avec la même clé de stack
- **\`borderRadius\`** : arrondit le haut de la barre empilée finale
- **Labels conditionnels** : affiche une alerte uniquement si heures supplémentaires

### 📊 Analyse de ce graphique

Ce graphique montre la répartition du temps de l'équipe développement :

- **🔵 Développement (62 %)** : activité principale, conforme aux attentes
- **🔴 Réunions (26 %)** : proportion élevée, potentiellement à optimiser
- **⚪ Administratif (12 %)** : overhead acceptable

**Alertes identifiées :**
- Mardi : +1,2 h supplémentaires (réunions prolongées)
- Jeudi : +0,7 h supplémentaires

**Insight clé** : Le mercredi est la journée la plus efficace (moins de réunions, plus de dev). Le mardi est la journée la plus chargée en réunions.

**Décisions à prendre** :
1. Instaurer un "no-meeting Wednesday" pour protéger le temps de développement
2. Limiter les réunions à 2h max par jour
3. Suivre les heures supplémentaires pour éviter le burn-out
`;

export default function AxisAlignWithTick() {
  return (
    <ChartEditor
      title="Axis Align with Tick"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
