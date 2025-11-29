interface ExampleCardProps {
  title: string;
  thumbnail: string;
  chartId: string;
}

export default function ExampleCard({
  title,
  thumbnail,
  chartId,
}: ExampleCardProps) {
  const handleClick = () => {
    // Ouvrir l'éditeur ECharts dans un nouvel onglet
    window.open(
      `https://echarts.apache.org/examples/en/editor.html?c=${chartId}`,
      "_blank",
    );
  };

  return (
    <button
      onClick={handleClick}
      className="group block bg-white rounded border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer text-left w-full"
    >
      {/* Thumbnail */}
      <div className="aspect-4/3 bg-gray-100 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback si l'image ne charge pas
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x225?text=Chart";
          }}
        />
      </div>

      {/* Titre */}
      <div className="p-2">
        <h3 className="text-xs text-gray-700 truncate group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </div>
    </button>
  );
}
