import { useState, useCallback, useRef, useEffect } from "react";
import type { EChartsOption, ECharts } from "echarts";
import CodePanel from "./CodePanel";
import PreviewPanel from "./PreviewPanel";
import ActionBar from "./ActionBar";

interface ChartEditorProps {
  title: string;
  section: string;
  option: EChartsOption;
}

const MIN_PANEL_WIDTH = 300;
const STORAGE_KEY = "chartEditorSplitPosition";

export function ChartEditor({ title, section, option }: ChartEditorProps) {
  const [currentOption, setCurrentOption] = useState<EChartsOption>(option);
  const [generatedAt, setGeneratedAt] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  });
  const [generationTime, setGenerationTime] = useState(0);
  const chartInstanceRef = useRef<ECharts | null>(null);

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
    chartInstanceRef.current = chart;
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
    if (!chartInstanceRef.current) return;

    const dataUrl = chartInstanceRef.current.getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.click();
  }, [title]);

  const handleShare = useCallback(() => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard!");
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm text-gray-600 bg-white border-b border-gray-200">
        <span className="text-gray-400">Examples</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-400">{section}</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-800 font-medium">{title}</span>
      </div>

      {/* Main content - 2 resizable columns */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left panel - Code editor */}
        <div
          className="border-r border-gray-300 overflow-hidden"
          style={{ width: leftPanelWidth > 0 ? leftPanelWidth : "50%" }}
        >
          <CodePanel option={currentOption} onRun={handleRun} />
        </div>

        {/* Resizable divider */}
        <div
          className={`w-1 bg-gray-300 hover:bg-blue-400 cursor-col-resize transition-colors shrink-0 ${
            isDragging ? "bg-blue-500" : ""
          }`}
          onMouseDown={handleMouseDown}
        />

        {/* Right panel - Preview */}
        <div className="flex-1 flex flex-col min-w-[300px]">
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
