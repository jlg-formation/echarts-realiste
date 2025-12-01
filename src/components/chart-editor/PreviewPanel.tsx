import { useEffect, useRef, useState, useCallback } from "react";
import * as echarts from "echarts";
import type { EChartsOption, ECharts } from "echarts";

interface PreviewPanelProps {
  option: EChartsOption;
  onChartReady: (chart: ECharts) => void;
  onGenerationTime: (time: number) => void;
}

type RenderType = "canvas" | "svg";

export default function PreviewPanel({
  option,
  onChartReady,
  onGenerationTime,
}: PreviewPanelProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [decalPattern, setDecalPattern] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [renderType, setRenderType] = useState<RenderType>("canvas");

  const initChart = useCallback(() => {
    if (!chartRef.current) return;

    // Dispose existing chart
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    const startTime = performance.now();

    // Create new chart
    chartInstance.current = echarts.init(
      chartRef.current,
      darkMode ? "dark" : undefined,
      {
        renderer: renderType,
      },
    );

    // Apply option with decal if needed
    const finalOption = decalPattern
      ? { ...option, aria: { enabled: true, decal: { show: true } } }
      : option;

    chartInstance.current.setOption(finalOption);

    const endTime = performance.now();
    onGenerationTime(endTime - startTime);
    onChartReady(chartInstance.current);
  }, [
    option,
    darkMode,
    decalPattern,
    renderType,
    onChartReady,
    onGenerationTime,
  ]);

  useEffect(() => {
    initChart();

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    // Use ResizeObserver to detect container size changes (for resizable panels)
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize();
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, [initChart]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const toggleDecalPattern = useCallback(() => {
    setDecalPattern((prev) => !prev);
  }, []);

  const toggleGrayscale = useCallback(() => {
    setGrayscale((prev) => !prev);
  }, []);

  return (
    <div
      className={`flex h-full flex-col ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Options bar */}
      <div
        className={`flex items-center gap-4 border-b px-4 py-2 ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
      >
        {/* Dark Mode toggle */}
        <label className="flex cursor-pointer items-center gap-2">
          <div className="relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only"
            />
            <div
              className={`h-5 w-10 rounded-full transition-colors ${
                darkMode ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                darkMode ? "translate-x-5" : ""
              }`}
            />
          </div>
          <span
            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Dark Mode
          </span>
        </label>

        {/* Decal Pattern toggle */}
        <label className="flex cursor-pointer items-center gap-2">
          <div className="relative">
            <input
              type="checkbox"
              checked={decalPattern}
              onChange={toggleDecalPattern}
              className="sr-only"
            />
            <div
              className={`h-5 w-10 rounded-full transition-colors ${
                decalPattern ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                decalPattern ? "translate-x-5" : ""
              }`}
            />
          </div>
          <span
            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Decal Pattern
          </span>
        </label>

        {/* Render type selector */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Render
          </span>
          <select
            value={renderType}
            onChange={(e) => setRenderType(e.target.value as RenderType)}
            className={`rounded border px-2 py-1 text-sm ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-gray-300"
                : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            <option value="canvas">Canvas</option>
            <option value="svg">SVG</option>
          </select>
        </div>

        {/* Grayscale (Photocopie N&B) toggle */}
        <label className="flex cursor-pointer items-center gap-2">
          <div className="relative">
            <input
              type="checkbox"
              checked={grayscale}
              onChange={toggleGrayscale}
              className="sr-only"
            />
            <div
              className={`h-5 w-10 rounded-full transition-colors ${
                grayscale ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                grayscale ? "translate-x-5" : ""
              }`}
            />
          </div>
          <span
            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Photocopie N&B
          </span>
        </label>
      </div>

      {/* Chart container */}
      <div className="flex-1 p-4">
        <div
          ref={chartRef}
          className={`h-full w-full ${grayscale ? "grayscale" : ""}`}
        />
      </div>
    </div>
  );
}
