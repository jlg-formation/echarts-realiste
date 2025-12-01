import PedagogyCard from "./PedagogyCard";

interface PedagogyExample {
  id: string;
  title: string;
  description: string;
  category: string;
  dontThumbnail: string;
  doThumbnail: string;
  dontLink?: string;
  doLink?: string;
}

// Ordre des catégories pour l'affichage
const categoryOrder = [
  "line",
  "bar",
  "pie",
  "scatter",
  "general",
  "colors",
  "labels",
  "axes",
  "legend",
];

// Données des exemples pédagogiques par catégorie
// Les exemples seront ajoutés au fur et à mesure
const pedagogyData: Record<string, PedagogyExample[]> = {
  line: [],
  bar: [],
  pie: [],
  scatter: [],
  general: [],
  colors: [],
  labels: [],
  axes: [],
  legend: [],
};

// Noms des catégories pour l'affichage
const categoryNames: Record<string, string> = {
  line: "Graphiques en ligne",
  bar: "Graphiques en barres",
  pie: "Graphiques circulaires",
  scatter: "Nuages de points",
  general: "Bonnes pratiques générales",
  colors: "Utilisation des couleurs",
  labels: "Étiquettes et annotations",
  axes: "Axes et échelles",
  legend: "Légendes",
};

interface SectionProps {
  categoryId: string;
  examples: PedagogyExample[];
}

function Section({ categoryId, examples }: SectionProps) {
  if (examples.length === 0) return null;

  return (
    <section
      id={`section-${categoryId}`}
      data-section={categoryId}
      className="mb-10"
    >
      {/* Titre de la section */}
      <div className="mb-5 flex items-baseline gap-3">
        <h2 className="text-2xl font-normal text-gray-800">
          {categoryNames[categoryId] || categoryId}
        </h2>
        <span className="text-sm text-gray-400 lowercase">{categoryId}</span>
      </div>

      {/* Grille d'exemples */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <PedagogyCard
            key={example.id}
            title={example.title}
            description={example.description}
            dontThumbnail={example.dontThumbnail}
            doThumbnail={example.doThumbnail}
            dontLink={example.dontLink}
            doLink={example.doLink}
          />
        ))}
      </div>
    </section>
  );
}

export default function PedagogyGrid() {
  // Vérifier s'il y a des exemples
  const hasExamples = categoryOrder.some(
    (categoryId) => (pedagogyData[categoryId] || []).length > 0,
  );

  if (!hasExamples) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="bg-opacity-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--viridis-light)">
            <svg
              className="h-8 w-8 text-(--viridis-light)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-(--viridis-dark)">
            Contenu pédagogique à venir
          </h2>
          <p className="leading-relaxed text-[#444444]">
            Les exemples pédagogiques &quot;Don&apos;t / Do&quot; seront ajoutés
            progressivement. Revenez bientôt pour découvrir les bonnes pratiques
            de visualisation de données avec ECharts !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {categoryOrder.map((categoryId) => {
        const examples = pedagogyData[categoryId] || [];
        return (
          <Section
            key={categoryId}
            categoryId={categoryId}
            examples={examples}
          />
        );
      })}
    </div>
  );
}
