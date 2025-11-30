import { useEffect, useState } from "react";
import { ChartEditor } from "../../components/chart-editor/ChartEditor";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

// Données réalistes : Occupation des sièges d'un vol Air France
// Contexte : Dashboard temps réel pour le personnel navigant
// Scénario : Vol AF1234 Paris CDG → New York JFK, Airbus A350

type SeatStatus = "available" | "occupied" | "premium" | "blocked" | "selected";

interface SeatData {
  status: SeatStatus;
  passenger?: string;
  meal?: string;
  specialRequest?: string;
}

// Génération des données de sièges pour un A350
const generateSeats = (): Record<string, SeatData> => {
  const seats: Record<string, SeatData> = {};
  const rows = 40;
  const seatsPerRow = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];

  // Noms fictifs pour les passagers
  const prenoms = [
    "Marie",
    "Jean",
    "Sophie",
    "Pierre",
    "Claire",
    "Thomas",
    "Emma",
    "Lucas",
    "Léa",
    "Hugo",
    "Camille",
    "Antoine",
    "Julie",
    "Nicolas",
    "Laura",
    "Maxime",
  ];
  const noms = [
    "Martin",
    "Bernard",
    "Dubois",
    "Thomas",
    "Robert",
    "Richard",
    "Petit",
    "Durand",
    "Leroy",
    "Moreau",
    "Simon",
    "Laurent",
    "Lefebvre",
    "Michel",
  ];

  const repas = [
    "Standard",
    "Végétarien",
    "Halal",
    "Casher",
    "Sans gluten",
    "Enfant",
  ];

  for (let row = 1; row <= rows; row++) {
    for (const seat of seatsPerRow) {
      const seatId = `${row}${seat}`;

      // Logique de remplissage réaliste
      // Business class (rangées 1-4) : 85% occupé
      // Premium Economy (rangées 5-10) : 90% occupé
      // Economy (rangées 11-40) : 78% occupé

      let occupancyRate: number;
      let seatClass: "business" | "premium" | "economy";

      if (row <= 4) {
        occupancyRate = 0.85;
        seatClass = "business";
      } else if (row <= 10) {
        occupancyRate = 0.9;
        seatClass = "premium";
      } else {
        occupancyRate = 0.78;
        seatClass = "economy";
      }

      // Sièges bloqués (issues de secours, équipage)
      if (
        (row === 12 && (seat === "A" || seat === "J")) ||
        (row === 25 && (seat === "A" || seat === "J"))
      ) {
        seats[seatId] = { status: "blocked" };
        continue;
      }

      // Génération aléatoire basée sur le taux d'occupation
      const isOccupied = Math.random() < occupancyRate;

      if (isOccupied) {
        const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
        const nom = noms[Math.floor(Math.random() * noms.length)];
        const repasChoisi = repas[Math.floor(Math.random() * repas.length)];

        // 10% de demandes spéciales
        const hasSpecialRequest = Math.random() < 0.1;
        const specialRequests = [
          "Fauteuil roulant",
          "Mineur non accompagné",
          "Assistance PMR",
          "Connexion courte",
        ];

        seats[seatId] = {
          status: seatClass === "business" ? "premium" : "occupied",
          passenger: `${prenom} ${nom}`,
          meal: repasChoisi,
          specialRequest: hasSpecialRequest
            ? specialRequests[
                Math.floor(Math.random() * specialRequests.length)
              ]
            : undefined,
        };
      } else {
        seats[seatId] = { status: "available" };
      }
    }
  }

  return seats;
};

const seatsData = generateSeats();

// Calcul des statistiques
const stats = {
  total: Object.keys(seatsData).length,
  occupied: Object.values(seatsData).filter(
    (s) => s.status === "occupied" || s.status === "premium"
  ).length,
  available: Object.values(seatsData).filter((s) => s.status === "available")
    .length,
  blocked: Object.values(seatsData).filter((s) => s.status === "blocked")
    .length,
  premium: Object.values(seatsData).filter((s) => s.status === "premium")
    .length,
  specialMeals: Object.values(seatsData).filter(
    (s) => s.meal && s.meal !== "Standard"
  ).length,
  specialRequests: Object.values(seatsData).filter((s) => s.specialRequest)
    .length,
};

const occupancyRate = Math.round(
  (stats.occupied / (stats.total - stats.blocked)) * 100
);

const SVG_URL =
  "https://echarts.apache.org/examples/data/asset/geo/flight-seatmap.svg";

const notes = `
## 📚 Note pédagogique : Plan de cabine interactif (Seatmap)

### ✅ Quand utiliser ce type de visualisation

Le **plan de cabine interactif** est idéal pour :

- **Réservation en ligne** : choix de siège par les passagers
- **Check-in** : attribution des sièges restants
- **Équipage** : vue d'ensemble des passagers et demandes spéciales
- **Revenue management** : analyse du remplissage et pricing dynamique
- **Opérations** : gestion du centrage et équilibrage

**Avantages :**
- **Vue spatiale** : représentation fidèle de l'espace physique
- **Instantané** : état temps réel de l'occupation
- **Interactif** : clic pour détails ou sélection
- **Multi-informations** : couleur = statut, tooltip = détails

### ❌ Quand ne pas utiliser

- **Analyse temporelle** : évolution du remplissage → courbes
- **Comparaison multi-vols** : utiliser tableaux ou barres
- **Grands datasets** : si > 1000 sièges, regrouper par zone
- **Mobile** : écran trop petit pour sièges individuels

### 📊 Analyse de ce graphique

**Vol AF1234 Paris CDG → New York JFK**

| Métrique | Valeur |
|----------|--------|
| Capacité totale | ${stats.total} sièges |
| Occupés | ${stats.occupied} (${occupancyRate}%) |
| Disponibles | ${stats.available} |
| Bloqués (équipage/issues) | ${stats.blocked} |
| Classe Affaires | ${stats.premium} passagers |

**Services à bord :**
- 🍽️ Repas spéciaux : **${stats.specialMeals}** (${Math.round((stats.specialMeals / stats.occupied) * 100)}%)
- ♿ Demandes spéciales : **${stats.specialRequests}** passagers

**Taux d'occupation par classe :**
- Business (1-4) : ~85%
- Premium Eco (5-10) : ~90%
- Economy (11-40) : ~78%

**Points d'attention équipage :**
- Passagers PMR à accueillir en priorité
- Mineurs non accompagnés à surveiller
- Repas spéciaux à identifier

### 🔧 Fonctionnalités ECharts utilisées

**Chargement du SVG seatmap :**

\`\`\`javascript
fetch('seatmap.svg')
  .then(res => res.text())
  .then(svg => {
    echarts.registerMap('seatmap', { svg });
  });
\`\`\`

**Données par siège :**

\`\`\`javascript
data: [
  { name: '12A', value: 1, passenger: 'Jean Martin', meal: 'Végétarien' },
  { name: '12B', value: 0 }, // Libre
  { name: '12C', value: 2 }, // Premium
  // ...
]
\`\`\`

**Colorimétrie par statut :**

\`\`\`javascript
visualMap: {
  categories: ['available', 'occupied', 'premium', 'blocked'],
  inRange: {
    color: ['#22c55e', '#3b82f6', '#eab308', '#94a3b8']
  }
}
\`\`\`

### 🎨 Design du seatmap

**Code couleur standard aviation :**
- 🟢 **Vert** : Disponible
- 🔵 **Bleu** : Occupé (économique)
- 🟡 **Or** : Business / Premium
- ⚪ **Gris** : Bloqué / Non disponible
- 🔴 **Rouge** : Sélectionné (par l'utilisateur)

**Zones du SVG :**
- Ailes (pour repère issues secours)
- Toilettes
- Galleys (cuisines)
- Portes

### 📈 Extensions possibles

**Sélection multiple :**
\`\`\`javascript
selectedMode: 'multiple',
select: {
  itemStyle: { areaColor: '#dc2626' }
}
\`\`\`

**Filtres interactifs :**
- Afficher uniquement places couloir
- Masquer places non-inclinables
- Filtrer par tranche de prix

**Intégration temps réel :**
- WebSocket pour mise à jour live
- Animation des changements de statut

### 🚀 Cas d'usage professionnels

**1. Compagnies aériennes**
- Interface de réservation client
- Outil équipage (briefing)
- Revenue management (pricing siège)
- Suivi connexions (passagers en retard)

**2. Transport ferroviaire**
- Réservation TGV
- Vue des places libres
- Attribution PMR

**3. Événementiel**
- Plan de salle concert/théâtre
- Attribution des places
- Gestion des VIP

**4. Restauration**
- Plan de salle restaurant
- Gestion des réservations
- Suivi en temps réel

### 💡 Bonnes pratiques

1. **Légende visible** : expliquer les couleurs
2. **Zoom** : permettre navigation sur grandes cabines
3. **Responsive** : vue simplifiée sur mobile
4. **Performance** : limiter animations sur > 500 sièges
5. **Accessibilité** : indiquer places PMR, hublots, issues
`;

export default function FlightSeatmapWithSvg() {
  const [option, setOption] = useState<EChartsOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SVG_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger le plan de cabine");
        return res.text();
      })
      .then((svg) => {
        echarts.registerMap("Flight_Seatmap", { svg });

        // Convertir les données de sièges pour ECharts
        const data = Object.entries(seatsData).map(([seatId, info]) => {
          let value: number;
          switch (info.status) {
            case "available":
              value = 0;
              break;
            case "occupied":
              value = 1;
              break;
            case "premium":
              value = 2;
              break;
            case "blocked":
              value = 3;
              break;
            default:
              value = 0;
          }

          return {
            name: seatId,
            value,
            ...info,
          };
        });

        const newOption: EChartsOption = {
          title: {
            text: "✈️ Vol AF1234 Paris CDG → New York JFK",
            subtext: `Airbus A350 · ${occupancyRate}% d'occupation · ${stats.available} places disponibles · Départ 14h35`,
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
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#e5e7eb",
            textStyle: {
              color: "#1f2937",
            },
            formatter: (params: unknown) => {
              const p = params as {
                name: string;
                data: SeatData & { name: string; value: number };
              };

              if (!p.data) return "";

              const seatId = p.name;
              const row = parseInt(seatId);
              const seatClass =
                row <= 4
                  ? "Business"
                  : row <= 10
                    ? "Premium Economy"
                    : "Economy";

              if (p.data.status === "blocked") {
                return `
                  <b>Siège ${seatId}</b><br/>
                  <span style="color: #6b7280;">Non disponible (équipage/issue)</span>
                `;
              }

              if (p.data.status === "available") {
                return `
                  <b>Siège ${seatId}</b> 🟢<br/>
                  Classe : ${seatClass}<br/>
                  <span style="color: #22c55e; font-weight: bold;">Disponible</span>
                `;
              }

              // Siège occupé
              let html = `
                <div style="min-width: 180px;">
                  <b>Siège ${seatId}</b> ${p.data.status === "premium" ? "⭐" : ""}<br/>
                  Classe : ${seatClass}<br/>
                  <hr style="margin: 8px 0; border-color: #e5e7eb;"/>
                  <b>${p.data.passenger || "Passager"}</b><br/>
              `;

              if (p.data.meal) {
                html += `🍽️ Repas : ${p.data.meal}<br/>`;
              }

              if (p.data.specialRequest) {
                html += `<span style="color: #dc2626;">⚠️ ${p.data.specialRequest}</span>`;
              }

              html += "</div>";
              return html;
            },
          },
          visualMap: {
            show: true,
            left: "center",
            bottom: "5%",
            orient: "horizontal",
            min: 0,
            max: 3,
            categories: ["Disponible", "Occupé", "Business", "Bloqué"],
            inRange: {
              color: ["#22c55e", "#3b82f6", "#eab308", "#9ca3af"],
            },
            textStyle: {
              fontSize: 11,
            },
          },
          series: [
            {
              name: "Sièges",
              type: "map",
              map: "Flight_Seatmap",
              roam: true,
              emphasis: {
                label: {
                  show: true,
                  fontSize: 10,
                  fontWeight: "bold",
                },
                itemStyle: {
                  areaColor: "#f472b6",
                },
              },
              select: {
                label: {
                  show: true,
                },
                itemStyle: {
                  areaColor: "#dc2626",
                },
              },
              selectedMode: "multiple",
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
          <p className="text-gray-600">Chargement du plan de cabine...</p>
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
      title="Flight Seatmap with SVG"
      section="Map"
      option={option}
      notes={notes}
    />
  );
}
