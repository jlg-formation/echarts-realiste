import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données des commerciaux - Ventes T3 2024 - Équipe France Nord
interface Commercial {
  nom: string;
  ventes: number; // en k€
  objectif: number; // en k€
  nouveauxClients: number;
}

const commerciaux: Commercial[] = [
  { nom: "Sophie Martin", ventes: 485, objectif: 400, nouveauxClients: 12 },
  { nom: "Thomas Dubois", ventes: 412, objectif: 400, nouveauxClients: 8 },
  { nom: "Julie Bernard", ventes: 398, objectif: 400, nouveauxClients: 15 },
  { nom: "Marc Petit", ventes: 356, objectif: 400, nouveauxClients: 6 },
  { nom: "Laura Moreau", ventes: 342, objectif: 400, nouveauxClients: 9 },
  { nom: "Nicolas Roux", ventes: 289, objectif: 400, nouveauxClients: 4 },
];

// Trier par ventes décroissantes
commerciaux.sort((a, b) => b.ventes - a.ventes);

// Trouver le meilleur commercial
const meilleurIndex = 0; // Après tri, c'est le premier

const option: EChartsOption = {
  title: {
    text: "Performance commerciaux - Équipe France Nord - T3 2024",
    subtext:
      "🏆 Top performer : Sophie Martin (+21% vs objectif) | Objectif : 400 k€/trimestre",
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
        dataIndex: number;
      }[];
      const idx = p[0].dataIndex;
      const commercial = commerciaux[idx];
      const ecart = Math.round(
        ((commercial.ventes - commercial.objectif) / commercial.objectif) * 100
      );
      const ecartColor = ecart >= 0 ? "#27ae60" : "#e74c3c";
      const ecartIcon = ecart >= 0 ? "✅" : "⚠️";

      return `
        <b>${commercial.nom}</b><br/><br/>
        Ventes T3 : <b>${commercial.ventes.toLocaleString("fr-FR")} k€</b><br/>
        Objectif : ${commercial.objectif.toLocaleString("fr-FR")} k€<br/>
        <span style="color: ${ecartColor}">${ecartIcon} ${ecart >= 0 ? "+" : ""}${ecart}% vs objectif</span><br/><br/>
        Nouveaux clients : ${commercial.nouveauxClients}
      `;
    },
  },
  grid: {
    left: 120,
    right: 80,
    bottom: 60,
    top: 100,
  },
  xAxis: {
    type: "value",
    name: "Ventes (k€)",
    nameLocation: "middle",
    nameGap: 35,
    max: 550,
    axisLabel: {
      formatter: (value: number) => `${value.toLocaleString("fr-FR")} k€`,
    },
  },
  yAxis: {
    type: "category",
    data: commerciaux.map((c) => c.nom),
    axisLabel: {
      fontSize: 12,
    },
  },
  series: [
    {
      name: "Ventes T3",
      type: "bar",
      data: commerciaux.map((c, index) => {
        const ecart = Math.round(((c.ventes - c.objectif) / c.objectif) * 100);
        const isMeilleur = index === meilleurIndex;
        const atteintObjectif = c.ventes >= c.objectif;

        return {
          value: c.ventes,
          itemStyle: {
            color: isMeilleur
              ? {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: "#f1c40f" },
                    { offset: 1, color: "#f39c12" },
                  ],
                }
              : atteintObjectif
                ? "#27ae60"
                : "#95a5a6",
            borderRadius: [0, 4, 4, 0],
            shadowBlur: isMeilleur ? 10 : 0,
            shadowColor: isMeilleur ? "rgba(241, 196, 15, 0.5)" : "transparent",
          },
          label: {
            show: true,
            position: "right",
            formatter: isMeilleur
              ? `🏆 ${c.ventes} k€ (+${ecart}%)`
              : `${c.ventes} k€`,
            fontSize: isMeilleur ? 12 : 11,
            fontWeight: isMeilleur ? "bold" : "normal",
            color: isMeilleur
              ? "#f39c12"
              : atteintObjectif
                ? "#27ae60"
                : "#7f8c8d",
          },
        };
      }),
      barWidth: "60%",
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: {
          type: "dashed",
          width: 2,
          color: "#3498db",
        },
        data: [
          {
            xAxis: 400,
            label: {
              formatter: "Objectif\n400 k€",
              position: "end",
              fontSize: 10,
              color: "#3498db",
            },
          },
        ],
      },
    },
  ],
  legend: {
    show: false,
  },
};

const notes = `
## 📚 Note pédagogique : Style différencié par barre (Set Style of Single Bar)

### ✅ Quand utiliser ce type de diagramme

Ce pattern de mise en avant est idéal pour :

- **Mettre en valeur un élément spécifique** : meilleur performer, valeur record, anomalie
- **Créer une hiérarchie visuelle** : distinguer le leader des suivants
- **Attirer l'attention sur un point clé** : la donnée importante ressort immédiatement
- **Gamifier les classements** : récompense visuelle pour le premier
- **Signaler des alertes** : un élément en rouge attire l'œil

**Exemples concrets :**
- Meilleur vendeur du mois (mise en avant dorée)
- Produit best-seller (couleur différente)
- Ville la plus polluée (rouge d'alerte)
- Candidat sélectionné dans une liste

### ❌ Quand ne pas utiliser ce type de diagramme

Évitez cette technique dans ces situations :

- **Trop d'éléments à mettre en avant** : si > 2-3 éléments sont stylés différemment, l'effet est perdu
- **Données objectives sans hiérarchie** : ne pas créer de fausse hiérarchie
- **Comparaison neutre** : si tous les éléments ont la même importance
- **Accessibilité critique** : la couleur seule ne suffit pas (ajouter un symbole)

**Erreurs courantes à éviter :**
- Utiliser trop de couleurs différentes (effet "sapin de Noël")
- Mettre en avant un élément sans raison métier
- Oublier d'expliquer pourquoi cet élément est différent

### 🔧 Fonctionnalités ECharts utilisées

- **Style par élément** : chaque barre peut avoir son propre \`itemStyle\`
- **Dégradé linéaire** : \`type: 'linear'\` pour un effet doré sur le top performer
- **Ombre portée** : \`shadowBlur\` et \`shadowColor\` pour l'effet "glow"
- **Labels conditionnels** : taille et emoji différents pour le meilleur
- **markLine** : ligne verticale pour l'objectif

### 📊 Analyse de ce graphique

Ce graphique montre la performance de l'équipe commerciale France Nord au T3 2024 :

- **🏆 Top performer** : Sophie Martin avec 485 k€ (+21% vs objectif)
  - Style doré avec dégradé et ombre pour la mise en avant
  - Emoji trophée dans le label
- **✅ Objectif atteint** : Thomas Dubois (412 k€, +3%)
- **⚠️ Proche de l'objectif** : Julie Bernard (398 k€, -0,5%)
- **❌ Sous-performance** : Nicolas Roux (289 k€, -28%)

**Insight clé** : 2 commerciaux sur 6 ont atteint leur objectif. L'écart entre le meilleur (485 k€) et le moins bon (289 k€) est de 68%, ce qui suggère un besoin de coaching ou de réallocation des territoires.

**Décisions à prendre** :
1. Reconnaître Sophie Martin (prime, communication interne)
2. Analyser les méthodes de Sophie pour former l'équipe
3. Accompagner Nicolas Roux (coaching, binôme avec Sophie)
4. Revoir la répartition des territoires pour le T4
`;

export default function SetStyleOfSingleBar() {
  return (
    <ChartEditor
      title="Set Style of Single Bar"
      section="Bar"
      option={option}
      notes={notes}
    />
  );
}
