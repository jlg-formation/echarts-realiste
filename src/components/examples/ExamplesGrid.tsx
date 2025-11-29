import ExampleCard from "./ExampleCard";

interface Example {
  id: string;
  title: string;
  category: string;
  internalLink?: string;
}

// Ordre des catégories pour l'affichage
const categoryOrder = [
  "line",
  "bar",
  "pie",
  "scatter",
  "map",
  "candlestick",
  "radar",
  "boxplot",
  "heatmap",
  "graph",
  "lines",
  "tree",
  "treemap",
  "sunburst",
  "parallel",
  "sankey",
  "funnel",
  "gauge",
  "pictorialBar",
  "themeRiver",
  "calendar",
  "matrix",
  "chord",
  "custom",
  "dataset",
  "dataZoom",
  "graphic",
  "rich",
  "globe",
  "bar3D",
  "scatter3D",
  "surface",
  "map3D",
  "lines3D",
  "line3D",
  "scatterGL",
  "linesGL",
  "flowGL",
  "graphGL",
];

// Données des exemples par catégorie
const examplesData: Record<string, Example[]> = {
  line: [
    {
      id: "line-simple",
      title: "Basic Line Chart",
      category: "line",
      internalLink: "/line/basic-line-chart",
    },
    {
      id: "line-smooth",
      title: "Smoothed Line Chart",
      category: "line",
      internalLink: "/line/smoothed-line-chart",
    },
    { id: "area-basic", title: "Basic area chart", category: "line" },
    { id: "line-stack", title: "Stacked Line Chart", category: "line" },
    { id: "area-stack", title: "Stacked Area Chart", category: "line" },
    {
      id: "area-stack-gradient",
      title: "Gradient Stacked Area Chart",
      category: "line",
    },
    { id: "bump-chart", title: "Bump Chart (Ranking)", category: "line" },
    {
      id: "line-marker",
      title: "Temperature Change in the Coming Week",
      category: "line",
    },
    { id: "area-pieces", title: "Area Pieces", category: "line" },
    {
      id: "data-transform-filter",
      title: "Data Transform Filter",
      category: "line",
    },
    { id: "line-gradient", title: "Line Gradient", category: "line" },
    { id: "line-sections", title: "Line with Sections", category: "line" },
  ],
  bar: [
    { id: "bar-simple", title: "Basic Bar", category: "bar" },
    { id: "bar-tick-align", title: "Axis Align with Tick", category: "bar" },
    { id: "bar-background", title: "Bar with Background", category: "bar" },
    {
      id: "bar-data-color",
      title: "Set Style of Single Bar",
      category: "bar",
    },
    { id: "bar-waterfall", title: "Waterfall Chart", category: "bar" },
    {
      id: "bar-negative2",
      title: "Bar Chart with Negative Value",
      category: "bar",
    },
    {
      id: "bar-polar-label-radial",
      title: "Radial Polar Bar Label Position",
      category: "bar",
    },
    {
      id: "bar-polar-label-tangential",
      title: "Tangential Polar Bar Label Position",
      category: "bar",
    },
    { id: "bar-y-category", title: "World Population", category: "bar" },
    { id: "bar-label-rotation", title: "Bar Label Rotation", category: "bar" },
  ],
  pie: [
    { id: "pie-simple", title: "Referer of a Website", category: "pie" },
    {
      id: "pie-borderRadius",
      title: "Doughnut Chart with Rounded Corner",
      category: "pie",
    },
    { id: "pie-doughnut", title: "Doughnut Chart", category: "pie" },
    { id: "pie-half-donut", title: "Half Doughnut Chart", category: "pie" },
    { id: "pie-padAngle", title: "Pie with padAngle", category: "pie" },
    { id: "pie-custom", title: "Customized Pie", category: "pie" },
    { id: "pie-pattern", title: "Texture on Pie Chart", category: "pie" },
    { id: "pie-roseType", title: "Nightingale Chart", category: "pie" },
    {
      id: "pie-roseType-simple",
      title: "Nightingale Chart Simple",
      category: "pie",
    },
    { id: "pie-nest", title: "Nested Pies", category: "pie" },
  ],
  scatter: [
    { id: "scatter-simple", title: "Basic Scatter Chart", category: "scatter" },
    {
      id: "scatter-anscombe-quartet",
      title: "Anscombe's quartet",
      category: "scatter",
    },
    {
      id: "scatter-clustering",
      title: "Clustering Process",
      category: "scatter",
    },
    {
      id: "scatter-exponential-regression",
      title: "Exponential Regression",
      category: "scatter",
    },
    {
      id: "scatter-effect",
      title: "Effect Scatter Chart",
      category: "scatter",
    },
    {
      id: "scatter-linear-regression",
      title: "Linear Regression",
      category: "scatter",
    },
    {
      id: "scatter-polynomial-regression",
      title: "Polynomial Regression",
      category: "scatter",
    },
    {
      id: "scatter-jitter",
      title: "Scatter with Jittering",
      category: "scatter",
    },
  ],
  map: [
    { id: "geo-graph", title: "Geo Graph", category: "map" },
    {
      id: "geo-choropleth-scatter",
      title: "Geo Choropleth and Scatter",
      category: "map",
    },
    { id: "map-iceland-pie", title: "Pie Charts on GEO Map", category: "map" },
    { id: "geo-beef-cuts", title: "GEO Beef Cuts", category: "map" },
    { id: "geo-organ", title: "Organ Data with SVG", category: "map" },
    {
      id: "geo-seatmap-flight",
      title: "Flight Seatmap with SVG",
      category: "map",
    },
  ],
  candlestick: [
    {
      id: "candlestick-simple",
      title: "Basic Candlestick",
      category: "candlestick",
    },
    { id: "custom-ohlc", title: "OHLC Chart", category: "candlestick" },
    { id: "candlestick-sh", title: "ShangHai Index", category: "candlestick" },
    {
      id: "candlestick-large",
      title: "Large Scale Candlestick",
      category: "candlestick",
    },
    {
      id: "candlestick-touch",
      title: "Axis Pointer Link and Touch",
      category: "candlestick",
    },
    {
      id: "candlestick-brush",
      title: "Candlestick Brush",
      category: "candlestick",
    },
  ],
  radar: [
    { id: "radar", title: "Basic Radar Chart", category: "radar" },
    { id: "radar-aqi", title: "AQI - Radar Chart", category: "radar" },
    { id: "radar-custom", title: "Customized Radar Chart", category: "radar" },
    { id: "radar2", title: "Proportion of Browsers", category: "radar" },
    { id: "radar-multiple", title: "Multiple Radar", category: "radar" },
  ],
  boxplot: [
    {
      id: "data-transform-aggregate",
      title: "Data Transform Simple Aggregate",
      category: "boxplot",
    },
    {
      id: "boxplot-light-velocity",
      title: "Boxplot Light Velocity",
      category: "boxplot",
    },
    {
      id: "boxplot-light-velocity2",
      title: "Boxplot Light Velocity2",
      category: "boxplot",
    },
    { id: "boxplot-multi", title: "Multiple Categories", category: "boxplot" },
  ],
  heatmap: [
    {
      id: "heatmap-cartesian",
      title: "Heatmap on Cartesian",
      category: "heatmap",
    },
    { id: "heatmap-large", title: "Heatmap - 20K data", category: "heatmap" },
    {
      id: "heatmap-large-piecewise",
      title: "Heatmap - Discrete Mapping of Color",
      category: "heatmap",
    },
    { id: "calendar-heatmap", title: "Calendar Heatmap", category: "heatmap" },
  ],
  graph: [
    { id: "graph-force2", title: "Force Layout", category: "graph" },
    { id: "graph-grid", title: "Graph on Cartesian", category: "graph" },
    { id: "graph-simple", title: "Simple Graph", category: "graph" },
    { id: "graph-force", title: "Force Layout", category: "graph" },
    { id: "graph", title: "Les Miserables", category: "graph" },
    {
      id: "graph-circular-layout",
      title: "Les Miserables Circular",
      category: "graph",
    },
  ],
  lines: [
    {
      id: "lines-ny",
      title: "Use lines to draw 1 million ny streets",
      category: "lines",
    },
  ],
  tree: [
    { id: "tree-basic", title: "From Left to Right Tree", category: "tree" },
    { id: "tree-legend", title: "Multiple Trees", category: "tree" },
    {
      id: "tree-orient-bottom-top",
      title: "From Bottom to Top Tree",
      category: "tree",
    },
    {
      id: "tree-orient-right-left",
      title: "From Right to Left Tree",
      category: "tree",
    },
    { id: "tree-radial", title: "Radial Tree", category: "tree" },
    { id: "tree-vertical", title: "From Top to Bottom Tree", category: "tree" },
  ],
  treemap: [
    {
      id: "treemap-sunburst-transition",
      title: "Transition between Treemap and Sunburst",
      category: "treemap",
    },
    { id: "treemap-disk", title: "Disk Usage", category: "treemap" },
    {
      id: "treemap-drill-down",
      title: "ECharts Option Query",
      category: "treemap",
    },
    { id: "treemap-simple", title: "Basic Treemap", category: "treemap" },
  ],
  sunburst: [
    { id: "sunburst-simple", title: "Basic Sunburst", category: "sunburst" },
    {
      id: "sunburst-borderRadius",
      title: "Sunburst with Rounded Corner",
      category: "sunburst",
    },
    {
      id: "sunburst-label-rotate",
      title: "Sunburst Label Rotate",
      category: "sunburst",
    },
    {
      id: "sunburst-monochrome",
      title: "Monochrome Sunburst",
      category: "sunburst",
    },
    { id: "sunburst-drink", title: "Drink Flavors", category: "sunburst" },
  ],
  parallel: [
    { id: "parallel-simple", title: "Basic Parallel", category: "parallel" },
    { id: "parallel-aqi", title: "Parallel Aqi", category: "parallel" },
    {
      id: "parallel-nutrients",
      title: "Parallel Nutrients",
      category: "parallel",
    },
    { id: "scatter-matrix", title: "Scatter Matrix", category: "parallel" },
  ],
  sankey: [
    { id: "sankey-simple", title: "Basic Sankey", category: "sankey" },
    {
      id: "sankey-vertical",
      title: "Sankey Orient Vertical",
      category: "sankey",
    },
    {
      id: "sankey-itemstyle",
      title: "Specify ItemStyle for Each Node",
      category: "sankey",
    },
    {
      id: "sankey-levels",
      title: "Sankey with Levels Setting",
      category: "sankey",
    },
    { id: "sankey-energy", title: "Gradient Edge", category: "sankey" },
  ],
  funnel: [
    { id: "funnel", title: "Funnel Chart", category: "funnel" },
    { id: "funnel-align", title: "Funnel Compare", category: "funnel" },
    { id: "funnel-customize", title: "Customized Funnel", category: "funnel" },
    { id: "funnel-mutiple", title: "Multiple Funnels", category: "funnel" },
  ],
  gauge: [
    { id: "gauge", title: "Gauge Basic chart", category: "gauge" },
    { id: "gauge-simple", title: "Simple Gauge", category: "gauge" },
    { id: "gauge-speed", title: "Speed Gauge", category: "gauge" },
    { id: "gauge-progress", title: "Progress Gauge", category: "gauge" },
    { id: "gauge-stage", title: "Stage Speed Gauge", category: "gauge" },
    { id: "gauge-grade", title: "Grade Gauge", category: "gauge" },
    { id: "gauge-ring", title: "Ring Gauge", category: "gauge" },
    { id: "gauge-clock", title: "Clock", category: "gauge" },
  ],
  pictorialBar: [
    {
      id: "pictorialBar-bar-transition",
      title: "Transition between pictorialBar and bar",
      category: "pictorialBar",
    },
    {
      id: "pictorialBar-body-fill",
      title: "Water Content",
      category: "pictorialBar",
    },
    {
      id: "pictorialBar-dotted",
      title: "Dotted bar",
      category: "pictorialBar",
    },
    {
      id: "pictorialBar-forest",
      title: "Expansion of forest",
      category: "pictorialBar",
    },
    {
      id: "pictorialBar-hill",
      title: "Wish List and Mountain Height",
      category: "pictorialBar",
    },
    { id: "pictorialBar-spirit", title: "Spirits", category: "pictorialBar" },
    { id: "pictorialBar-vehicle", title: "Vehicles", category: "pictorialBar" },
  ],
  themeRiver: [
    { id: "themeRiver-basic", title: "ThemeRiver", category: "themeRiver" },
    {
      id: "themeRiver-lastfm",
      title: "ThemeRiver Lastfm",
      category: "themeRiver",
    },
  ],
  calendar: [
    { id: "calendar-simple", title: "Simple Calendar", category: "calendar" },
    { id: "calendar-heatmap", title: "Calendar Heatmap", category: "calendar" },
    {
      id: "calendar-vertical",
      title: "Calendar Heatmap Vertical",
      category: "calendar",
    },
    { id: "calendar-graph", title: "Calendar Graph", category: "calendar" },
    { id: "calendar-pie", title: "Calendar Pie", category: "calendar" },
    { id: "calendar-charts", title: "Calendar Charts", category: "calendar" },
  ],
  matrix: [
    { id: "matrix-simple", title: "Simple Matrix", category: "matrix" },
    {
      id: "matrix-correlation-heatmap",
      title: "Correlation Matrix (Heatmap)",
      category: "matrix",
    },
    {
      id: "matrix-correlation-scatter",
      title: "Correlation Matrix (Scatter)",
      category: "matrix",
    },
    { id: "matrix-confusion", title: "Confusion Matrix", category: "matrix" },
  ],
  chord: [
    { id: "chord-simple", title: "Basic Chord", category: "chord" },
    { id: "chord-minAngle", title: "Chord minAngle", category: "chord" },
    {
      id: "chord-lineStyle-color",
      title: "Chord lineStyle.color",
      category: "chord",
    },
    { id: "chord-style", title: "Chord Style", category: "chord" },
  ],
  custom: [
    {
      id: "bar-histogram",
      title: "Histogram with Custom Series",
      category: "custom",
    },
    { id: "custom-profit", title: "Profit", category: "custom" },
    {
      id: "custom-error-scatter",
      title: "Error Scatter on Catesian",
      category: "custom",
    },
    { id: "custom-bar-trend", title: "Custom Bar Trend", category: "custom" },
    {
      id: "custom-cartesian-polygon",
      title: "Custom Cartesian Polygon",
      category: "custom",
    },
    { id: "custom-profile", title: "Profile", category: "custom" },
    {
      id: "custom-gantt-flight",
      title: "Gantt Chart of Airport Flights",
      category: "custom",
    },
  ],
  dataset: [
    {
      id: "data-transform-sort-bar",
      title: "Sort Data in Bar Chart",
      category: "dataset",
    },
    { id: "dataset-encode0", title: "Simple Encode", category: "dataset" },
    {
      id: "data-transform-multiple-pie",
      title: "Partition Data to Pies",
      category: "dataset",
    },
    {
      id: "dataset-default",
      title: "Default arrangement",
      category: "dataset",
    },
    {
      id: "dataset-simple0",
      title: "Simple Example of Dataset",
      category: "dataset",
    },
  ],
  dataZoom: [
    {
      id: "custom-error-scatter",
      title: "Error Scatter on Catesian",
      category: "dataZoom",
    },
    {
      id: "area-simple",
      title: "Large scale area chart",
      category: "dataZoom",
    },
    {
      id: "custom-gantt-flight",
      title: "Gantt Chart of Airport Flights",
      category: "dataZoom",
    },
    { id: "wind-barb", title: "Wind Barb", category: "dataZoom" },
  ],
  graphic: [
    {
      id: "graphic-stroke-animation",
      title: "Stroke Animation",
      category: "graphic",
    },
    {
      id: "graphic-loading",
      title: "Customized Loading Animation",
      category: "graphic",
    },
    {
      id: "graphic-wave-animation",
      title: "Wave Animation",
      category: "graphic",
    },
    {
      id: "line-graphic",
      title: "Custom Graphic Component",
      category: "graphic",
    },
    { id: "line-draggable", title: "Draggable Points", category: "graphic" },
  ],
  rich: [
    { id: "pie-rich-text", title: "Pie Special Label", category: "rich" },
    { id: "pie-nest", title: "Nested Pies", category: "rich" },
    { id: "bar-rich-text", title: "Weather Statistics", category: "rich" },
  ],
  globe: [
    {
      id: "animating-contour-on-globe",
      title: "Animating Contour on Globe",
      category: "globe",
    },
    {
      id: "globe-atmosphere",
      title: "Globe with Atmosphere",
      category: "globe",
    },
    {
      id: "globe-displacement",
      title: "Globe Displacement",
      category: "globe",
    },
    {
      id: "globe-echarts-gl-hello-world",
      title: "ECharts-GL Hello World",
      category: "globe",
    },
    { id: "globe-layers", title: "Globe Layers", category: "globe" },
    { id: "globe-moon", title: "Moon", category: "globe" },
  ],
  bar3D: [
    { id: "bar3d-dataset", title: "3D Bar with Dataset", category: "bar3D" },
    {
      id: "bar3d-global-population",
      title: "Bar3D - Global Population",
      category: "bar3D",
    },
    { id: "bar3d-myth", title: "Bar3D - Myth", category: "bar3D" },
    { id: "bar3d-punch-card", title: "Bar3D - Punch Card", category: "bar3D" },
  ],
  scatter3D: [
    { id: "scatter3d", title: "Scatter3D", category: "scatter3D" },
    {
      id: "scatter3D-dataset",
      title: "3D Scatter with Dataset",
      category: "scatter3D",
    },
    {
      id: "scatter3d-globe-population",
      title: "Scatter3D - Globe Population",
      category: "scatter3D",
    },
  ],
  surface: [
    { id: "simple-surface", title: "Simple Surface", category: "surface" },
    { id: "surface-breather", title: "Breather", category: "surface" },
    { id: "surface-golden-rose", title: "Golden Rose", category: "surface" },
    { id: "metal-surface", title: "Metal Surface", category: "surface" },
  ],
  map3D: [
    { id: "map3d-buildings", title: "Buildings", category: "map3D" },
    { id: "map3d-wood-city", title: "Wood City", category: "map3D" },
  ],
  lines3D: [
    {
      id: "lines3d-airline-on-globe",
      title: "Airline on Globe",
      category: "lines3D",
    },
    { id: "lines3d-flights", title: "Flights", category: "lines3D" },
    { id: "lines3d-flights-gl", title: "Flights GL", category: "lines3D" },
  ],
  line3D: [
    {
      id: "line3d-orthographic",
      title: "Orthographic Projection",
      category: "line3D",
    },
  ],
  scatterGL: [
    {
      id: "scatterGL-gps",
      title: "10 million Bulk GPS points",
      category: "scatterGL",
    },
  ],
  linesGL: [
    {
      id: "linesGL-ny",
      title: "Use linesGL to draw 1 million ny streets",
      category: "linesGL",
    },
  ],
  flowGL: [
    { id: "flowGL-noise", title: "Flow on the cartesian", category: "flowGL" },
  ],
  graphGL: [
    {
      id: "graphgl-gpu-layout",
      title: "GraphGL GPU Layout",
      category: "graphGL",
    },
    {
      id: "graphgl-large-internet",
      title: "GraphGL - Large Internet",
      category: "graphGL",
    },
    {
      id: "graphgl-npm-dep",
      title: "NPM Dependencies with graphGL",
      category: "graphGL",
    },
  ],
};

function getThumbnailUrl(chartId: string): string {
  return `https://echarts.apache.org/examples/data/thumb/${chartId}.webp`;
}

// Noms des catégories pour l'affichage
const categoryNames: Record<string, string> = {
  line: "Line",
  bar: "Bar",
  pie: "Pie",
  scatter: "Scatter",
  map: "GEO/Map",
  candlestick: "Candlestick",
  radar: "Radar",
  boxplot: "Boxplot",
  heatmap: "Heatmap",
  graph: "Graph",
  lines: "Lines",
  tree: "Tree",
  treemap: "Treemap",
  sunburst: "Sunburst",
  parallel: "Parallel",
  sankey: "Sankey",
  funnel: "Funnel",
  gauge: "Gauge",
  pictorialBar: "PictorialBar",
  themeRiver: "ThemeRiver",
  calendar: "Calendar",
  matrix: "Matrix",
  chord: "Chord",
  custom: "Custom",
  dataset: "Dataset",
  dataZoom: "DataZoom",
  graphic: "Graphic",
  rich: "Rich Text",
  globe: "3D Globe",
  bar3D: "3D Bar",
  scatter3D: "3D Scatter",
  surface: "3D Surface",
  map3D: "3D Map",
  lines3D: "3D Lines",
  line3D: "3D Line",
  scatterGL: "Scatter GL",
  linesGL: "Lines GL",
  flowGL: "Flow GL",
  graphGL: "Graph GL",
};

interface SectionProps {
  categoryId: string;
  examples: Example[];
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
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-2xl font-normal text-gray-800">
          {categoryNames[categoryId] || categoryId}
        </h2>
        <span className="text-sm text-gray-400 lowercase">{categoryId}</span>
      </div>

      {/* Grille d'exemples */}
      <div className="flex flex-wrap gap-6">
        {examples.map((example) => (
          <ExampleCard
            key={example.id}
            title={example.title}
            thumbnail={getThumbnailUrl(example.id)}
            chartId={example.id}
            internalLink={example.internalLink}
          />
        ))}
      </div>
    </section>
  );
}

export default function ExamplesGrid() {
  return (
    <div className="p-6">
      {categoryOrder.map((categoryId) => {
        const examples = examplesData[categoryId] || [];
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
