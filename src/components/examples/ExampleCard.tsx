import { Link } from "react-router";

interface ExampleCardProps {
  title: string;
  thumbnail: string;
  chartId: string;
  internalLink?: string;
}

export default function ExampleCard({
  title,
  thumbnail,
  chartId,
  internalLink,
}: ExampleCardProps) {
  const handleExternalClick = () => {
    // Ouvrir l'éditeur ECharts dans un nouvel onglet
    window.open(
      `https://echarts.apache.org/examples/en/editor.html?c=${chartId}`,
      "_blank",
    );
  };

  // Si un lien interne est fourni, utiliser Link
  if (internalLink) {
    return (
      <div className="flex w-[280px] flex-col">
        {/* Thumbnail avec bordure */}
        <Link
          to={internalLink}
          className="group block cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
        >
          <div className="h-[180px] overflow-hidden bg-white">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/280x180?text=Chart";
              }}
            />
          </div>
        </Link>

        {/* Titre en dessous de la carte */}
        <Link
          to={internalLink}
          className="mt-2 cursor-pointer truncate text-sm font-bold text-gray-900 transition-colors hover:text-blue-600"
          title={title}
        >
          {title}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-[280px] flex-col">
      {/* Thumbnail avec bordure */}
      <button
        onClick={handleExternalClick}
        className="group block cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
      >
        <div className="h-[180px] overflow-hidden bg-white">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/280x180?text=Chart";
            }}
          />
        </div>
      </button>

      {/* Titre en dessous de la carte */}
      <h3
        className="mt-2 cursor-pointer truncate text-sm font-bold text-gray-900 transition-colors hover:text-blue-600"
        onClick={handleExternalClick}
        title={title}
      >
        {title}
      </h3>
    </div>
  );
}
