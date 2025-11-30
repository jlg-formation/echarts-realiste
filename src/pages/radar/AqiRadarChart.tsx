import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import type { EChartsOption } from "echarts";

// Données réalistes : Qualité de l'air (AQI) multi-polluants
// Contexte : Station de mesure de qualité de l'air en zone urbaine
// Comparaison de 3 villes françaises sur les principaux polluants

interface VilleAQI {
  nom: string;
  region: string;
  date: string;
  polluants: number[]; // PM2.5, PM10, O3, NO2, SO2, CO
  indiceGlobal: number;
  qualite: string;
  couleur: string;
}

const villes: VilleAQI[] = [
  {
    nom: "Paris",
    region: "Île-de-France",
    date: "15 novembre 2024",
    polluants: [42, 58, 85, 62, 12, 8], // Valeurs sur échelle 0-100
    indiceGlobal: 85,
    qualite: "Modérée",
    couleur: "#f59e0b",
  },
  {
    nom: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    date: "15 novembre 2024",
    polluants: [35, 48, 72, 55, 18, 12],
    indiceGlobal: 72,
    qualite: "Correcte",
    couleur: "#22c55e",
  },
  {
    nom: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    date: "15 novembre 2024",
    polluants: [28, 42, 95, 48, 22, 6],
    indiceGlobal: 95,
    qualite: "Dégradée",
    couleur: "#ef4444",
  },
];

// Définition des polluants avec leurs seuils OMS
const polluants = [
  {
    name: "PM2.5\n(µg/m³)",
    max: 100,
    seuilOMS: 15,
    description: "Particules fines",
  },
  {
    name: "PM10\n(µg/m³)",
    max: 100,
    seuilOMS: 45,
    description: "Particules grossières",
  },
  {
    name: "O₃\n(µg/m³)",
    max: 100,
    seuilOMS: 100,
    description: "Ozone",
  },
  {
    name: "NO₂\n(µg/m³)",
    max: 100,
    seuilOMS: 25,
    description: "Dioxyde d'azote",
  },
  {
    name: "SO₂\n(µg/m³)",
    max: 100,
    seuilOMS: 40,
    description: "Dioxyde de soufre",
  },
  {
    name: "CO\n(mg/m³)",
    max: 100,
    seuilOMS: 10,
    description: "Monoxyde de carbone",
  },
];

// Seuils OMS normalisés sur 100
const seuilsOMS = polluants.map((p) =>
  Math.min((p.seuilOMS / p.max) * 100, 50)
);

const option: EChartsOption = {
  title: {
    text: "🌬️ Qualité de l'Air - Comparaison multi-polluants",
    subtext:
      "Paris vs Lyon vs Marseille · 15 novembre 2024 · Seuils OMS en pointillés orange",
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
        seriesName: string;
        name: string;
        value: number[];
        dataIndex: number;
      };

      if (p.seriesName === "Seuils OMS") {
        return `
          <div style="min-width: 200px;">
            <b>📋 Recommandations OMS</b>
            <hr style="margin: 8px 0;"/>
            ${polluants.map((pol, i) => `${pol.description} : <b>${pol.seuilOMS} ${i === 5 ? "mg" : "µg"}/m³</b>`).join("<br/>")}
            <hr style="margin: 8px 0;"/>
            <span style="color: #6b7280; font-size: 11px;">
              Valeurs guides journalières OMS 2021
            </span>
          </div>
        `;
      }

      const ville = villes.find((v) => v.nom === p.seriesName);
      if (!ville) return "";

      const depassements = ville.polluants.filter(
        (val, i) => val > seuilsOMS[i]
      ).length;

      return `
        <div style="min-width: 220px;">
          <b style="font-size: 14px;">${ville.nom}</b>
          <span style="color: ${ville.couleur}; margin-left: 8px;">● ${ville.qualite}</span><br/>
          <span style="color: #6b7280;">${ville.region} · ${ville.date}</span>
          <hr style="margin: 8px 0;"/>
          ${polluants
            .map((pol, i) => {
              const val = ville.polluants[i];
              const seuil = seuilsOMS[i];
              const icon = val > seuil ? "⚠️" : "✅";
              return `${icon} ${pol.description} : <b>${val}</b> (seuil: ${Math.round(seuil)})`;
            })
            .join("<br/>")}
          <hr style="margin: 8px 0;"/>
          <b>Indice global : ${ville.indiceGlobal}/100</b><br/>
          <span style="color: #ef4444;">${depassements} dépassement${depassements > 1 ? "s" : ""} OMS</span>
        </div>
      `;
    },
  },
  legend: {
    data: [...villes.map((v) => v.nom), "Seuils OMS"],
    top: 55,
    textStyle: {
      fontSize: 12,
    },
  },
  radar: {
    indicator: polluants.map((p) => ({ name: p.name, max: p.max })),
    shape: "polygon",
    center: ["50%", "58%"],
    radius: "55%",
    startAngle: 90,
    splitNumber: 5,
    axisName: {
      color: "#374151",
      fontSize: 11,
      fontWeight: "bold",
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: [
          "rgba(34, 197, 94, 0.1)",
          "rgba(163, 230, 53, 0.1)",
          "rgba(250, 204, 21, 0.1)",
          "rgba(249, 115, 22, 0.1)",
          "rgba(239, 68, 68, 0.1)",
        ],
      },
    },
    axisLine: {
      lineStyle: {
        color: "#d1d5db",
      },
    },
    splitLine: {
      lineStyle: {
        color: "#e5e7eb",
      },
    },
  },
  series: [
    // Série pour chaque ville
    ...villes.map((ville) => ({
      name: ville.nom,
      type: "radar" as const,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: ville.couleur,
      },
      areaStyle: {
        color: ville.couleur,
        opacity: 0.15,
      },
      itemStyle: {
        color: ville.couleur,
      },
      emphasis: {
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.3,
        },
      },
      data: [
        {
          value: ville.polluants,
          name: ville.nom,
        },
      ],
    })),
    // Seuils OMS
    {
      name: "Seuils OMS",
      type: "radar" as const,
      symbol: "diamond",
      symbolSize: 6,
      lineStyle: {
        width: 2,
        type: "dashed" as const,
        color: "#f97316",
      },
      areaStyle: {
        opacity: 0,
      },
      itemStyle: {
        color: "#f97316",
      },
      data: [
        {
          value: seuilsOMS,
          name: "Seuils OMS",
        },
      ],
    },
  ],
};

const notes = `
## 📚 Note pédagogique : Radar AQI (Qualité de l'Air)

### ✅ Cas d'usage idéal

Le **graphique radar pour l'AQI** est particulièrement adapté pour :

- **Visualiser plusieurs polluants** simultanément
- **Comparer des villes ou des périodes** sur les mêmes critères
- **Identifier les dépassements** par rapport aux seuils réglementaires
- **Communication grand public** : forme intuitive

**Polluants mesurés :**
| Polluant | Source principale | Impact santé |
|----------|-------------------|--------------|
| PM2.5 | Trafic, chauffage | Respiratoire, cardiovasculaire |
| PM10 | Industrie, BTP | Respiratoire |
| O₃ | Réaction chimique UV | Irritation, asthme |
| NO₂ | Véhicules diesel | Respiratoire |
| SO₂ | Industrie, centrales | Bronchique |
| CO | Combustion incomplète | Intoxication |

### 📊 Analyse de ce graphique

**Comparaison des 3 villes le 15 novembre 2024 :**

| Ville | Indice | Qualité | Polluant critique |
|-------|--------|---------|-------------------|
| Paris | 85/100 | 🟡 Modérée | O₃, NO₂ |
| Lyon | 72/100 | 🟢 Correcte | O₃ |
| Marseille | 95/100 | 🔴 Dégradée | O₃ (élevé) |

**Observations :**
- **Marseille** : O₃ très élevé (climat méditerranéen favorable à l'ozone)
- **Paris** : NO₂ élevé (trafic routier dense)
- **Lyon** : Profil plus équilibré, moins de pics

### 🎯 Interprétation des zones colorées

\`\`\`
Zone verte centrale : Qualité excellente (< 20)
Zone jaune-vert : Bonne (20-40)
Zone jaune : Modérée (40-60)
Zone orange : Dégradée (60-80)
Zone rouge : Mauvaise (80-100)
\`\`\`

### 🔧 Configuration ECharts spécifique AQI

**Zones colorées dégradées :**
\`\`\`javascript
radar: {
  splitArea: {
    areaStyle: {
      color: [
        'rgba(34, 197, 94, 0.1)',   // Vert - Bon
        'rgba(163, 230, 53, 0.1)',  // Vert-jaune
        'rgba(250, 204, 21, 0.1)',  // Jaune - Modéré
        'rgba(249, 115, 22, 0.1)',  // Orange - Dégradé
        'rgba(239, 68, 68, 0.1)'    // Rouge - Mauvais
      ]
    }
  }
}
\`\`\`

**Seuils OMS en pointillés :**
\`\`\`javascript
{
  name: 'Seuils OMS',
  type: 'radar',
  symbol: 'diamond',
  lineStyle: { 
    type: 'dashed',
    color: '#f97316' 
  },
  areaStyle: { opacity: 0 },
  data: [{ 
    value: [15, 45, 100, 25, 40, 10] 
  }]
}
\`\`\`

### 📈 Recommandations OMS 2021

| Polluant | Seuil journalier | Seuil annuel |
|----------|------------------|--------------|
| PM2.5 | 15 µg/m³ | 5 µg/m³ |
| PM10 | 45 µg/m³ | 15 µg/m³ |
| O₃ | 100 µg/m³ | - |
| NO₂ | 25 µg/m³ | 10 µg/m³ |
| SO₂ | 40 µg/m³ | - |
| CO | 10 mg/m³ | - |

### 🏭 Sources de données réelles

**En France :**
- **ATMO France** : Fédération des associations de surveillance
- **Prev'Air** : Prévisions nationales
- **AirParif** (Paris), **Atmo AURA** (Lyon), **AtmoSud** (Marseille)

**API disponibles :**
\`\`\`
- OpenAQ : données mondiales ouvertes
- IQAir : API temps réel
- AQICN : indice chinois international
\`\`\`

### ⚠️ Limites de ce type de visualisation

**1. Échelle normalisée**
\`\`\`
Les unités réelles diffèrent (µg/m³ vs mg/m³)
La normalisation 0-100 peut masquer les vraies valeurs
\`\`\`

**2. Moyenne vs pics**
\`\`\`
Un radar montre un instant T
Les pics journaliers peuvent être invisibles
Préférer une série temporelle pour les tendances
\`\`\`

**3. Pondération des polluants**
\`\`\`
L'indice global peut masquer un polluant critique
Un seul polluant > seuil = alerte
\`\`\`

### 💡 Améliorations possibles

**1. Animation temporelle**
\`\`\`
Slider pour voir l'évolution sur 24h
Comparaison jour/nuit
\`\`\`

**2. Géolocalisation**
\`\`\`
Clic sur une zone du radar → carte
Position des capteurs
\`\`\`

**3. Alertes automatiques**
\`\`\`javascript
if (polluant > seuilOMS * 1.5) {
  afficherAlerte('Pic de pollution détecté');
}
\`\`\`

### 📋 Données utilisées

\`\`\`javascript
const villes = [
  {
    nom: 'Paris',
    polluants: [42, 58, 85, 62, 12, 8], // PM2.5, PM10, O3, NO2, SO2, CO
    indiceGlobal: 85,
    qualite: 'Modérée'
  },
  {
    nom: 'Lyon',
    polluants: [35, 48, 72, 55, 18, 12],
    indiceGlobal: 72,
    qualite: 'Correcte'
  },
  {
    nom: 'Marseille',
    polluants: [28, 42, 95, 48, 22, 6],
    indiceGlobal: 95,
    qualite: 'Dégradée'
  }
];
\`\`\`

### 🎨 Bonnes pratiques de design AQI

**1. Code couleur universel**
\`\`\`
🟢 Vert : Bon (0-50)
🟡 Jaune : Modéré (51-100)
🟠 Orange : Sensible (101-150)
🔴 Rouge : Mauvais (151-200)
🟣 Violet : Très mauvais (201-300)
⬛ Marron : Dangereux (300+)
\`\`\`

**2. Accessibilité**
\`\`\`
Ne pas se fier qu'à la couleur
Ajouter des icônes ou textes
Contraste suffisant
\`\`\`

**3. Contexte**
\`\`\`
Toujours indiquer la date/heure
Préciser la source des données
Mentionner les seuils utilisés
\`\`\`
`;

export default function AqiRadarChart() {
  return (
    <ChartEditor
      title="AQI - Radar Chart"
      section="Radar"
      option={option}
      notes={notes}
    />
  );
}
