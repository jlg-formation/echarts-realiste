import { useState, useCallback, useRef } from "react";
import type { EChartsOption, ECharts } from "echarts";
import CodePanel from "./CodePanel";
import PreviewPanel from "./PreviewPanel";
import ActionBar from "./ActionBar";

interface ChartEditorProps {
  title: string;
  section: string;
  option: EChartsOption;
}

export function ChartEditor({ title, section, option }: ChartEditorProps) {
  const [currentOption, setCurrentOption] = useState<EChartsOption>(option);
  const [generatedAt, setGeneratedAt] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  });
  const [generationTime, setGenerationTime] = useState(0);
  const chartInstanceRef = useRef<ECharts | null>(null);

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

      {/* Main content - 2 columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Code editor */}
        <div className="w-1/2 border-r border-gray-300">
          <CodePanel option={currentOption} onRun={handleRun} />
        </div>

        {/* Right panel - Preview */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <PreviewPanel
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
