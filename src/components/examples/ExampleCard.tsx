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
      "_blank"
    );
  };

  // Si un lien interne est fourni, utiliser Link
  if (internalLink) {
    return (
      <div className="w-[280px] flex flex-col">
        {/* Thumbnail avec bordure */}
        <Link
          to={internalLink}
          className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="h-[180px] bg-white overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
          className="mt-2 text-sm font-bold text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors"
          title={title}
        >
          {title}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[280px] flex flex-col">
      {/* Thumbnail avec bordure */}
      <button
        onClick={handleExternalClick}
        className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="h-[180px] bg-white overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
        className="mt-2 text-sm font-bold text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors"
        onClick={handleExternalClick}
        title={title}
      >
        {title}
      </h3>
    </div>
  );
}
