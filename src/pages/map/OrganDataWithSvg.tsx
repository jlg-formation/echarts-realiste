import { useEffect, useState } from "react";
import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

// Données médicales réalistes : Bilan de santé d'un patient
// Contexte : Dashboard médical affichant les indicateurs de santé par organe
// Scénario : Patient homme, 55 ans, bilan annuel - détection d'anomalies

const donneesOrganes: Record<
  string,
  {
    score: number; // 0-100 (100 = parfait)
    statut: "normal" | "attention" | "alerte";
    indicateur: string;
    valeur: string;
    norme: string;
  }
> = {
  // Organes avec données médicales
  heart: {
    score: 72,
    statut: "attention",
    indicateur: "Fréquence cardiaque repos",
    valeur: "82 bpm",
    norme: "60-80 bpm",
  },
  liver: {
    score: 45,
    statut: "alerte",
    indicateur: "Gamma-GT",
    valeur: "124 U/L",
    norme: "< 55 U/L",
  },
  kidney: {
    score: 88,
    statut: "normal",
    indicateur: "Créatinine",
    valeur: "0.9 mg/dL",
    norme: "0.7-1.3 mg/dL",
  },
  lung: {
    score: 65,
    statut: "attention",
    indicateur: "VEMS",
    valeur: "78%",
    norme: "> 80%",
  },
  stomach: {
    score: 92,
    statut: "normal",
    indicateur: "pH gastrique",
    valeur: "2.1",
    norme: "1.5-3.5",
  },
  brain: {
    score: 85,
    statut: "normal",
    indicateur: "Score cognitif MMSE",
    valeur: "28/30",
    norme: "> 24/30",
  },
  intestine: {
    score: 78,
    statut: "attention",
    indicateur: "Transit (Bristol)",
    valeur: "Type 5",
    norme: "Types 3-4",
  },
  pancreas: {
    score: 95,
    statut: "normal",
    indicateur: "Glycémie à jeun",
    valeur: "0.92 g/L",
    norme: "0.7-1.1 g/L",
  },
  spleen: {
    score: 90,
    statut: "normal",
    indicateur: "Taille échographique",
    valeur: "11 cm",
    norme: "< 12 cm",
  },
  bladder: {
    score: 82,
    statut: "normal",
    indicateur: "Résidu post-mictionnel",
    valeur: "45 mL",
    norme: "< 50 mL",
  },
};

const SVG_URL =
  "https://echarts.apache.org/examples/data/asset/geo/Veins_Medical_Diagram_clip_art.svg";

const notes = `
## 📚 Note pédagogique : Visualisation de données médicales sur schéma anatomique

### ✅ Quand utiliser ce type de visualisation

La **carte anatomique interactive** est idéale pour :

- **Dashboards médicaux** : bilan de santé global d'un patient
- **Suivi post-opératoire** : état des différentes zones traitées
- **Dossier patient** : vue synthétique des antécédents par organe
- **Recherche clinique** : cartographie des symptômes ou effets secondaires
- **Éducation médicale** : outil pédagogique interactif

**Avantages :**
- **Vue holistique** : tous les indicateurs en un coup d'œil
- **Intuitive** : pas besoin de formation pour comprendre
- **Priorisation visuelle** : les alertes ressortent immédiatement
- **Contextualisation** : les données sont liées à leur localisation anatomique

### ❌ Quand ne pas utiliser

- **Données longitudinales** : évolution dans le temps → courbes
- **Comparaison inter-patients** : utiliser des barres ou tableaux
- **Précision chirurgicale** : schémas anatomiques détaillés (IRM, scanner)
- **Données sensibles sans consentement** : respect du RGPD santé

### 📊 Analyse de ce graphique

**Bilan de santé du patient :**

| Organe | Score | Statut | Indicateur clé |
|--------|-------|--------|----------------|
| 🔴 Foie | 45/100 | Alerte | Gamma-GT élevé |
| 🟠 Cœur | 72/100 | Attention | FC repos haute |
| 🟠 Poumons | 65/100 | Attention | VEMS diminué |
| 🟢 Pancréas | 95/100 | Normal | Glycémie OK |
| 🟢 Estomac | 92/100 | Normal | pH normal |

**Diagnostic synthétique :**
- ⚠️ **Foie** : Gamma-GT très élevé (124 vs norme <55)
  - Hypothèses : consommation d'alcool, stéatose, médicaments
  - Action : échographie hépatique + bilan complet
- 🟠 **Cœur** : FC repos légèrement élevée
  - Possible stress chronique ou sédentarité
  - Action : ECG de contrôle
- 🟠 **Poumons** : VEMS à 78% (limite basse)
  - Possible obstruction légère (tabagisme ?)
  - Action : spirométrie complète

### 🔧 Fonctionnalités ECharts utilisées

**Chargement d'un SVG médical :**

\`\`\`javascript
fetch('schema_anatomique.svg')
  .then(res => res.text())
  .then(svg => {
    echarts.registerMap('anatomie', { svg });
  });
\`\`\`

**Colorimétrie par seuils :**

\`\`\`javascript
visualMap: {
  min: 0,
  max: 100,
  inRange: {
    color: ['#dc2626', '#f59e0b', '#22c55e'] // Rouge → Orange → Vert
  },
  text: ['Sain', 'À risque'],
}
\`\`\`

**Tooltip médical enrichi :**

\`\`\`javascript
tooltip: {
  formatter: (params) => {
    const { indicateur, valeur, norme } = params.data;
    return \`
      <b>\${params.name}</b><br/>
      \${indicateur}: <b>\${valeur}</b><br/>
      Norme: \${norme}
    \`;
  }
}
\`\`\`

### 🎨 Design médical

**Code couleur universel santé :**
- 🟢 **Vert** (score > 80) : Normal, RAS
- 🟠 **Orange** (score 60-80) : Attention, à surveiller
- 🔴 **Rouge** (score < 60) : Alerte, action requise

**Accessibilité :**
- Symboles en plus des couleurs (✓, ⚠, ✗)
- Contrastes élevés pour lisibilité
- Texte alternatif pour lecteurs d'écran

### 📈 Extensions possibles

**Historique par organe :**
\`\`\`javascript
// Clic sur un organe → mini-graphique d'évolution
onClick: (params) => {
  showHistoryChart(params.name);
}
\`\`\`

**Comparaison avec la population :**
- Percentile du patient vs population de même âge/sexe

**Export PDF pour le médecin :**
- Génération de rapport automatisé

### 🚀 Cas d'usage professionnels

**1. Hôpital / Clinique**
- Dashboard patient temps réel (soins intensifs)
- Bilan pré-opératoire synthétique
- Suivi post-greffe par organe

**2. Médecine du travail**
- Bilan annuel des salariés
- Cartographie des TMS par zone corporelle
- Suivi exposition professionnelle

**3. Recherche clinique**
- Cartographie effets secondaires médicaments
- Études épidémiologiques multi-organes
- Corrélations symptômes/pathologies

**4. Télémédecine**
- Auto-évaluation patient avant consultation
- Visualisation partagée médecin/patient
- Suivi à distance maladie chronique

### 💡 Bonnes pratiques médicales

1. **Confidentialité** : anonymiser les données affichées
2. **Sources** : indiquer l'origine des normes médicales
3. **Date** : horodater chaque mesure
4. **Contexte** : âge, sexe, antécédents du patient
5. **Limites** : préciser que ce n'est pas un diagnostic médical
`;

export default function OrganDataWithSvg() {
  const [option, setOption] = useState<EChartsOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SVG_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger le schéma SVG");
        return res.text();
      })
      .then((svg) => {
        echarts.registerMap("Organ_Diagram", { svg });

        // Préparer les données pour chaque organe
        const data = Object.entries(donneesOrganes).map(([organe, infos]) => ({
          name: organe,
          value: infos.score,
          ...infos,
        }));

        const newOption: EChartsOption = {
          title: {
            text: "🏥 Bilan de santé - Patient #2847 (H, 55 ans)",
            subtext:
              "⚠️ Alerte foie détectée · Consultation hépatologie recommandée",
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
            trigger: "item",
            confine: true,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#e5e7eb",
            textStyle: {
              color: "#1f2937",
            },
            formatter: (params: unknown) => {
              const p = params as {
                name: string;
                value: number;
                data: (typeof donneesOrganes)[keyof typeof donneesOrganes] & {
                  name: string;
                };
              };

              if (!p.data) return "";

              const statutIcon =
                p.data.statut === "alerte"
                  ? "🔴"
                  : p.data.statut === "attention"
                    ? "🟠"
                    : "🟢";
              const statutLabel =
                p.data.statut === "alerte"
                  ? "Alerte"
                  : p.data.statut === "attention"
                    ? "À surveiller"
                    : "Normal";

              const organeNom =
                p.name.charAt(0).toUpperCase() + p.name.slice(1);

              return `
                <div style="min-width: 200px;">
                  <b style="font-size: 14px;">${organeNom}</b><br/>
                  <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
                  
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>Score santé :</span>
                    <b>${p.value}/100 ${statutIcon}</b>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>Statut :</span>
                    <b>${statutLabel}</b>
                  </div>
                  
                  <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
                  
                  <div style="margin-bottom: 4px;">
                    <span style="color: #6b7280;">${p.data.indicateur}</span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between;">
                    <span>Mesuré :</span>
                    <b>${p.data.valeur}</b>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between;">
                    <span>Norme :</span>
                    <span style="color: #6b7280;">${p.data.norme}</span>
                  </div>
                </div>
              `;
            },
          },
          visualMap: {
            left: "center",
            bottom: "5%",
            min: 0,
            max: 100,
            orient: "horizontal",
            text: ["Sain", "À risque"],
            realtime: true,
            calculable: true,
            inRange: {
              color: ["#dc2626", "#f59e0b", "#22c55e"],
            },
            textStyle: {
              fontSize: 11,
            },
          },
          series: [
            {
              name: "Organes",
              type: "map",
              map: "Organ_Diagram",
              roam: true,
              emphasis: {
                label: {
                  show: true,
                  fontSize: 12,
                  fontWeight: "bold",
                },
                itemStyle: {
                  areaColor: "#3b82f6",
                },
              },
              select: {
                label: {
                  show: true,
                },
                itemStyle: {
                  areaColor: "#2563eb",
                },
              },
              data,
            },
          ],
        };

        setOption(newOption);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement SVG:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du schéma anatomique...</p>
        </div>
      </div>
    );
  }

  if (error || !option) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-600">
          <p className="text-xl mb-2">⚠️ Erreur de chargement</p>
          <p>{error || "Impossible de charger le graphique"}</p>
        </div>
      </div>
    );
  }

  return (
    <ChartEditor
      title="Organ Data with SVG"
      section="Map"
      option={option}
      notes={notes}
    />
  );
}
