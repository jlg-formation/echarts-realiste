import { useState, useCallback, useMemo } from "react";
import type { EChartsOption, ECharts } from "echarts";

type TabType = "edit" | "full" | "preview";

interface CodePanelProps {
  option: EChartsOption;
  onRun: (newOption: EChartsOption) => void;
  chartInstance: ECharts | null;
}

function formatOption(option: EChartsOption): string {
  const formatValue = (value: unknown, indent: number = 0): string => {
    const spaces = "  ".repeat(indent);
    const nextSpaces = "  ".repeat(indent + 1);

    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "string") return `'${value}'`;
    if (typeof value === "number" || typeof value === "boolean")
      return String(value);

    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      // Pour les tableaux de primitives simples, les afficher sur une seule ligne
      if (
        value.every(
          (v) =>
            typeof v === "string" ||
            typeof v === "number" ||
            typeof v === "boolean"
        )
      ) {
        const items = value.map((v) =>
          typeof v === "string" ? `'${v}'` : String(v)
        );
        const singleLine = `[${items.join(", ")}]`;
        if (singleLine.length < 60) return singleLine;
      }
      const items = value.map(
        (v) => `${nextSpaces}${formatValue(v, indent + 1)}`
      );
      return `[\n${items.join(",\n")}\n${spaces}]`;
    }

    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) return "{}";
      const items = entries.map(
        ([k, v]) => `${nextSpaces}${k}: ${formatValue(v, indent + 1)}`
      );
      return `{\n${items.join(",\n")}\n${spaces}}`;
    }

    return String(value);
  };

  return `option = ${formatValue(option)};`;
}

function generateFullCode(optionCode: string): string {
  return `import * as echarts from 'echarts';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

${optionCode}

option && myChart.setOption(option);`;
}

export default function CodePanel({
  option,
  onRun,
  chartInstance,
}: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [code, setCode] = useState(() => formatOption(option));

  const fullCode = useMemo(() => generateFullCode(code), [code]);

  // Option Preview: affiche l'option COMPLETE via chart.getOption()
  // Cela inclut toutes les valeurs par défaut appliquées par ECharts
  const optionPreview = useMemo(() => {
    if (!chartInstance) {
      return "// Chart not ready yet...";
    }
    try {
      const resolvedOption = chartInstance.getOption();
      return JSON.stringify(resolvedOption, null, 2);
    } catch {
      return "// Error getting option from chart";
    }
  }, [chartInstance]);

  const handleRun = useCallback(() => {
    try {
      // Parse le code pour extraire l'option
      const fn = new Function(`
        let option;
        ${code}
        return option;
      `);
      const newOption = fn();
      onRun(newOption);
    } catch (error) {
      console.error("Error parsing option:", error);
    }
  }, [code, onRun]);

  const displayCode = useMemo(() => {
    switch (activeTab) {
      case "edit":
        return code;
      case "full":
        return fullCode;
      case "preview":
        return optionPreview;
    }
  }, [activeTab, code, fullCode, optionPreview]);

  const isReadOnly = activeTab !== "edit";

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs header */}
      <div className="flex items-center justify-between px-2 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === "edit"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Edit Code
          </button>
          <button
            onClick={() => setActiveTab("full")}
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === "full"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Full Code
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Option Preview
          </button>
        </div>
      </div>

      {/* Action bar - simplified with only Run button */}
      <div className="flex items-center justify-end px-2 py-1 border-b border-gray-200 bg-gray-50">
        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </button>
      </div>

      {/* Code editor area */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* Line numbers */}
          <div className="shrink-0 py-2 px-2 text-right text-xs text-gray-400 bg-gray-50 select-none font-mono">
            {displayCode.split("\n").map((_, i) => (
              <div key={i} className="leading-5">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          {isReadOnly ? (
            <pre className="flex-1 p-2 font-mono text-xs leading-5 text-gray-800 bg-gray-50 overflow-auto">
              {displayCode}
            </pre>
          ) : (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-2 font-mono text-xs leading-5 text-gray-800 resize-none outline-none bg-white"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
