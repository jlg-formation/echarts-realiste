import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router";
import type { EChartsOption, ECharts } from "echarts";
import CodePanel from "./CodePanel";
import PreviewPanel from "./PreviewPanel";
import ActionBar from "./ActionBar";

interface ChartEditorProps {
  title: string;
  section: string;
  option: EChartsOption;
  notes?: string;
}

const MIN_PANEL_WIDTH = 300;
const STORAGE_KEY = "chartEditorSplitPosition";

// Determine the base path and label for the breadcrumb based on section
function getBreadcrumbInfo(section: string): {
  basePath: string;
  baseLabel: string;
} {
  if (section.toLowerCase() === "pedagogy") {
    return { basePath: "/pedagogie", baseLabel: "Pédagogie" };
  }
  return { basePath: "/examples", baseLabel: "Examples" };
}

export function ChartEditor({
  title,
  section,
  option,
  notes,
}: ChartEditorProps) {
  const { basePath, baseLabel } = getBreadcrumbInfo(section);
  const [currentOption, setCurrentOption] = useState<EChartsOption>(option);
  const [generatedAt, setGeneratedAt] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  });
  const [generationTime, setGenerationTime] = useState(0);
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);

  // Resizable panels state
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0; // 0 means 50%
  });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeKey, setResizeKey] = useState(0);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      let newLeftWidth = e.clientX - containerRect.left;

      // Apply minimum width constraints
      newLeftWidth = Math.max(MIN_PANEL_WIDTH, newLeftWidth);
      newLeftWidth = Math.min(containerWidth - MIN_PANEL_WIDTH, newLeftWidth);

      setLeftPanelWidth(newLeftWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Save position to localStorage
      if (leftPanelWidth > 0) {
        localStorage.setItem(STORAGE_KEY, leftPanelWidth.toString());
      }
      // Trigger chart resize
      setResizeKey((prev) => prev + 1);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, leftPanelWidth]);

  // Initialize left panel width on mount
  useEffect(() => {
    if (containerRef.current && leftPanelWidth === 0) {
      setLeftPanelWidth(containerRef.current.offsetWidth / 2);
    }
  }, [leftPanelWidth]);

  const handleRun = useCallback((newOption: EChartsOption) => {
    setCurrentOption(newOption);
    const now = new Date();
    setGeneratedAt(now.toLocaleTimeString("en-US", { hour12: false }));
  }, []);

  const handleChartReady = useCallback((chart: ECharts) => {
    setChartInstance(chart);
  }, []);

  const handleGenerationTime = useCallback((time: number) => {
    setGenerationTime(time);
  }, []);

  const handleDownload = useCallback(() => {
    // Download chart as JSON
    const dataStr = JSON.stringify(currentOption, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [currentOption, title]);

  const handleScreenshot = useCallback(() => {
    if (!chartInstance) return;

    const dataUrl = chartInstance.getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.click();
  }, [chartInstance, title]);

  const handleShare = useCallback(() => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard!");
  }, []);

  return (
    <div className="flex h-full flex-col bg-gray-100">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
        <Link
          to={basePath}
          className="text-gray-400 transition-colors hover:text-blue-600"
        >
          {baseLabel}
        </Link>
        {section.toLowerCase() !== "pedagogy" && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to={`${basePath}#${section.toLowerCase()}`}
              className="text-gray-400 transition-colors hover:text-blue-600"
            >
              {section}
            </Link>
          </>
        )}
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium text-gray-800">{title}</span>
      </div>

      {/* Main content - 2 resizable columns */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left panel - Code editor */}
        <div
          className="overflow-hidden border-r border-gray-300"
          style={{ width: leftPanelWidth > 0 ? leftPanelWidth : "50%" }}
        >
          <CodePanel
            option={currentOption}
            onRun={handleRun}
            chartInstance={chartInstance}
            notes={notes}
          />
        </div>

        {/* Resizable divider */}
        <div
          className={`w-1 shrink-0 cursor-col-resize bg-gray-300 transition-colors hover:bg-blue-400 ${
            isDragging ? "bg-blue-500" : ""
          }`}
          onMouseDown={handleMouseDown}
        />

        {/* Right panel - Preview */}
        <div className="flex min-w-[300px] flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <PreviewPanel
              key={resizeKey}
              option={currentOption}
              onChartReady={handleChartReady}
              onGenerationTime={handleGenerationTime}
            />
          </div>

          {/* Action bar */}
          <ActionBar
            onDownload={handleDownload}
            onScreenshot={handleScreenshot}
            onShare={handleShare}
            generatedAt={generatedAt}
            generationTime={generationTime}
          />
        </div>
      </div>
    </div>
  );
}
