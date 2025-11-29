import { useState } from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
  isGL?: boolean;
}

const categories: Category[] = [
  { id: "line", name: "Line", icon: "line" },
  { id: "bar", name: "Bar", icon: "bar" },
  { id: "pie", name: "Pie", icon: "pie" },
  { id: "scatter", name: "Scatter", icon: "scatter" },
  { id: "map", name: "GEO/Map", icon: "geo" },
  { id: "candlestick", name: "Candlestick", icon: "candlestick" },
  { id: "radar", name: "Radar", icon: "radar" },
  { id: "boxplot", name: "Boxplot", icon: "boxplot" },
  { id: "heatmap", name: "Heatmap", icon: "heatmap" },
  { id: "graph", name: "Graph", icon: "graph" },
  { id: "lines", name: "Lines", icon: "lines" },
  { id: "tree", name: "Tree", icon: "tree" },
  { id: "treemap", name: "Treemap", icon: "treemap" },
  { id: "sunburst", name: "Sunburst", icon: "sunburst" },
  { id: "parallel", name: "Parallel", icon: "parallel" },
  { id: "sankey", name: "Sankey", icon: "sankey" },
  { id: "funnel", name: "Funnel", icon: "funnel" },
  { id: "gauge", name: "Gauge", icon: "gauge" },
  { id: "pictorialBar", name: "PictorialBar", icon: "pictorialBar" },
  { id: "themeRiver", name: "ThemeRiver", icon: "themeriver" },
  { id: "calendar", name: "Calendar", icon: "calendar" },
  { id: "matrix", name: "Matrix", icon: "matrix" },
  { id: "chord", name: "Chord", icon: "chord" },
  { id: "custom", name: "Custom", icon: "custom" },
  { id: "dataset", name: "Dataset", icon: "dataset" },
  { id: "dataZoom", name: "DataZoom", icon: "dataZoom" },
  { id: "graphic", name: "Graphic", icon: "drag" },
  { id: "rich", name: "Rich Text", icon: "rich" },
  { id: "globe", name: "3D Globe", icon: "gl", isGL: true },
  { id: "bar3D", name: "3D Bar", icon: "gl", isGL: true },
  { id: "scatter3D", name: "3D Scatter", icon: "gl", isGL: true },
  { id: "surface", name: "3D Surface", icon: "gl", isGL: true },
  { id: "map3D", name: "3D Map", icon: "gl", isGL: true },
  { id: "lines3D", name: "3D Lines", icon: "gl", isGL: true },
  { id: "line3D", name: "3D Line", icon: "gl", isGL: true },
  { id: "scatterGL", name: "Scatter GL", icon: "gl", isGL: true },
  { id: "linesGL", name: "Lines GL", icon: "gl", isGL: true },
  { id: "flowGL", name: "Flow GL", icon: "gl", isGL: true },
  { id: "graphGL", name: "Graph GL", icon: "gl", isGL: true },
];

// Icônes SVG simplifiées pour chaque type de graphique
function ChartIcon({ type, isActive }: { type: string; isActive?: boolean }) {
  const iconClass = "w-4 h-4";
  const strokeColor = isActive ? "#3b82f6" : "#9ca3af";
  const fillColor = isActive ? "#3b82f6" : "#9ca3af";

  switch (type) {
    case "line":
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path
            d="M3 17L9 11L13 15L21 7"
            stroke={strokeColor}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    case "bar":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill={fillColor}>
          <rect x="3" y="12" width="4" height="8" />
          <rect x="10" y="6" width="4" height="14" />
          <rect x="17" y="9" width="4" height="11" />
        </svg>
      );
    case "pie":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill={fillColor}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8v8l6.93 4.04C17.45 18.22 14.89 20 12 20z" />
        </svg>
      );
    case "scatter":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill={fillColor}>
          <circle cx="6" cy="18" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="14" cy="16" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="8" cy="6" r="2" />
        </svg>
      );
    case "geo":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill={fillColor}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );
    case "candlestick":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill={fillColor}>
          <rect x="5" y="8" width="3" height="8" />
          <line
            x1="6.5"
            y1="4"
            x2="6.5"
            y2="8"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <line
            x1="6.5"
            y1="16"
            x2="6.5"
            y2="20"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <rect x="11" y="6" width="3" height="10" />
          <rect x="17" y="10" width="3" height="6" />
        </svg>
      );
    case "radar":
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <polygon
            points="12,2 20,8 18,18 6,18 4,8"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
          />
          <polygon
            points="12,6 16,10 15,15 9,15 8,10"
            fill={fillColor}
            opacity="0.5"
          />
        </svg>
      );
    case "gl":
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke={strokeColor}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
          />
          <path d="M3 9h18M9 21V9" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );
  }
}

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside className="w-[200px] min-w-[200px] bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Barre de recherche */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white placeholder-gray-400"
          />
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Liste des catégories */}
      <nav className="flex-1 overflow-y-auto py-1">
        {filteredCategories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] text-left transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <ChartIcon type={category.icon} isActive={isActive} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
