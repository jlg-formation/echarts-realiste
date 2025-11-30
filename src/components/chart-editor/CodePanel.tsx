import { useState, useCallback, useMemo, useRef } from "react";
import type { EChartsOption, ECharts } from "echarts";
import Markdown from "react-markdown";
import JsonTreeView from "./JsonTreeView";

type TabType = "edit" | "full" | "preview" | "notes";

interface CodePanelProps {
  option: EChartsOption;
  onRun: (newOption: EChartsOption) => void;
  chartInstance: ECharts | null;
  notes?: string;
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function formatOption(option: EChartsOption): string {
  const formatValue = (value: unknown, indent: number = 0): string => {
    const spaces = "  ".repeat(indent);
    const nextSpaces = "  ".repeat(indent + 1);

    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "function") {
      // Sérialiser les fonctions en préservant leur code source
      return value.toString();
    }
    if (typeof value === "string") return `'${escapeString(value)}'`;
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
            typeof v === "boolean",
        )
      ) {
        const items = value.map((v) =>
          typeof v === "string" ? `'${escapeString(v)}'` : String(v),
        );
        const singleLine = `[${items.join(", ")}]`;
        if (singleLine.length < 60) return singleLine;
      }
      const items = value.map(
        (v) => `${nextSpaces}${formatValue(v, indent + 1)}`,
      );
      return `[\n${items.join(",\n")}\n${spaces}]`;
    }

    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) return "{}";
      const items = entries.map(
        ([k, v]) => `${nextSpaces}${k}: ${formatValue(v, indent + 1)}`,
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
  notes,
}: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [code, setCode] = useState(() => formatOption(option));
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const fullCode = useMemo(() => generateFullCode(code), [code]);

  // Option Preview: affiche l'option COMPLETE via chart.getOption()
  // Cela inclut toutes les valeurs par défaut appliquées par ECharts
  const resolvedOption = useMemo(() => {
    if (!chartInstance) {
      return null;
    }
    try {
      return chartInstance.getOption();
    } catch {
      return null;
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

  // Synchronise le scroll des numéros de ligne avec le code
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement | HTMLPreElement>) => {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
      }
    },
    [],
  );

  // Code affiché pour les onglets Edit Code et Full Code
  const displayCode = useMemo(() => {
    if (activeTab === "edit") return code;
    if (activeTab === "full") return fullCode;
    return "";
  }, [activeTab, code, fullCode]);

  // Rendu du contenu en fonction de l'onglet actif
  const renderContent = () => {
    if (activeTab === "notes" && notes) {
      // Affichage du contenu Markdown pour l'onglet Notes
      return (
        <div className="h-full overflow-auto bg-white p-6">
          <div
            className="prose prose-sm max-w-none 
            prose-headings:font-semibold prose-headings:text-gray-800 prose-headings:mt-6 prose-headings:mb-3
            prose-h2:text-xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
            prose-h3:text-lg prose-h3:text-gray-700
            prose-h4:text-base prose-h4:text-gray-600
            prose-p:text-gray-600 prose-p:my-2 prose-p:leading-relaxed
            prose-li:text-gray-600 prose-li:my-1
            prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4
            prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-4
            prose-strong:text-gray-800 prose-strong:font-semibold
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-pink-600 prose-code:before:content-none prose-code:after:content-none
            prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-hr:my-6 prose-hr:border-gray-200
            first:prose-headings:mt-0"
          >
            <Markdown>{notes}</Markdown>
          </div>
        </div>
      );
    }

    if (activeTab === "preview") {
      // Affichage en arbre dépliable pour Option Preview
      return (
        <div className="h-full overflow-auto bg-gray-50">
          {resolvedOption ? (
            <JsonTreeView data={resolvedOption} initialExpanded={true} />
          ) : (
            <div className="p-4 text-gray-500 text-sm">
              Chart not ready yet...
            </div>
          )}
        </div>
      );
    }

    // Affichage code pour Edit Code et Full Code
    const isReadOnly = activeTab === "full";

    return (
      <div className="flex h-full overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="shrink-0 py-2 px-2 text-right text-xs text-gray-400 bg-gray-50 select-none font-mono overflow-hidden"
        >
          {displayCode.split("\n").map((_: string, i: number) => (
            <div key={i} className="leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code content */}
        {isReadOnly ? (
          <pre
            onScroll={handleScroll}
            className="flex-1 p-2 font-mono text-xs leading-5 text-gray-800 bg-gray-50 overflow-auto"
          >
            {displayCode}
          </pre>
        ) : (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={handleScroll}
            className="flex-1 p-2 font-mono text-xs leading-5 text-gray-800 resize-none outline-none bg-white overflow-auto"
            spellCheck={false}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs header */}
      <div className="flex items-center justify-between px-2 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
              activeTab === "edit"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Edit Code
          </button>
          <button
            onClick={() => setActiveTab("full")}
            className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
              activeTab === "full"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Full Code
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
              activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Option Preview
          </button>
          {notes && (
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
                activeTab === "notes"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Notes
            </button>
          )}
        </div>
      </div>

      {/* Action bar - simplified with only Run button */}
      <div className="flex items-center justify-end px-2 py-1 border-b border-gray-200 bg-gray-50">
        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors cursor-pointer"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </button>
      </div>

      {/* Code editor area */}
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  );
}
