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
      "_blank"
    );
  };

  return (
    <div className="w-[280px] flex flex-col">
      {/* Thumbnail avec bordure */}
      <button
        onClick={handleClick}
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
        onClick={handleClick}
        title={title}
      >
        {title}
      </h3>
    </div>
  );
}
