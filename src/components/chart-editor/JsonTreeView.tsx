import { useState, useCallback } from "react";

interface JsonTreeViewProps {
  data: unknown;
  initialExpanded?: boolean;
}

interface TreeNodeProps {
  keyName?: string;
  value: unknown;
  depth: number;
  initialExpanded: boolean;
}

function TreeNode({ keyName, value, depth, initialExpanded }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(
    initialExpanded && depth < 2, // Auto-expand first 2 levels
  );

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const indent = depth * 16;

  // Render primitive values
  if (value === null) {
    return (
      <div className="flex items-center" style={{ paddingLeft: indent }}>
        {keyName && <span className="text-purple-600">{keyName}: </span>}
        <span className="text-gray-500">null</span>
      </div>
    );
  }

  if (value === undefined) {
    return (
      <div className="flex items-center" style={{ paddingLeft: indent }}>
        {keyName && <span className="text-purple-600">{keyName}: </span>}
        <span className="text-gray-500">undefined</span>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <div className="flex items-start" style={{ paddingLeft: indent }}>
        {keyName && <span className="text-purple-600">{keyName}: </span>}
        <span className="break-all text-green-600">"{value}"</span>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="flex items-center" style={{ paddingLeft: indent }}>
        {keyName && <span className="text-purple-600">{keyName}: </span>}
        <span className="text-orange-500">{value}</span>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center" style={{ paddingLeft: indent }}>
        {keyName && <span className="text-purple-600">{keyName}: </span>}
        <span className="text-blue-500">{value ? "true" : "false"}</span>
      </div>
    );
  }

  // Render arrays
  if (Array.isArray(value)) {
    const isEmpty = value.length === 0;

    if (isEmpty) {
      return (
        <div className="flex items-center" style={{ paddingLeft: indent }}>
          {keyName && <span className="text-purple-600">{keyName}: </span>}
          <span className="text-gray-600">[]</span>
        </div>
      );
    }

    return (
      <div>
        <div
          className="flex cursor-pointer items-center rounded hover:bg-gray-100"
          style={{ paddingLeft: indent }}
          onClick={toggleExpand}
        >
          <span className="w-4 text-center text-gray-400 select-none">
            {isExpanded ? "▼" : "▶"}
          </span>
          {keyName && <span className="ml-1 text-purple-600">{keyName}: </span>}
          <span className="ml-1 text-gray-600">
            Array({value.length})
            {!isExpanded && <span className="ml-1 text-gray-400">[...]</span>}
          </span>
        </div>
        {isExpanded && (
          <div>
            {value.map((item, index) => (
              <TreeNode
                key={index}
                keyName={String(index)}
                value={item}
                depth={depth + 1}
                initialExpanded={initialExpanded}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render objects
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const isEmpty = entries.length === 0;

    if (isEmpty) {
      return (
        <div className="flex items-center" style={{ paddingLeft: indent }}>
          {keyName && <span className="text-purple-600">{keyName}: </span>}
          <span className="text-gray-600">{"{}"}</span>
        </div>
      );
    }

    return (
      <div>
        <div
          className="flex cursor-pointer items-center rounded hover:bg-gray-100"
          style={{ paddingLeft: indent }}
          onClick={toggleExpand}
        >
          <span className="w-4 text-center text-gray-400 select-none">
            {isExpanded ? "▼" : "▶"}
          </span>
          {keyName && <span className="ml-1 text-purple-600">{keyName}: </span>}
          <span className="ml-1 text-gray-600">
            {"{"}
            {entries.length}
            {"}"}
            {!isExpanded && (
              <span className="ml-1 text-gray-400">{"{...}"}</span>
            )}
          </span>
        </div>
        {isExpanded && (
          <div>
            {entries.map(([key, val]) => (
              <TreeNode
                key={key}
                keyName={key}
                value={val}
                depth={depth + 1}
                initialExpanded={initialExpanded}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Fallback for other types
  return (
    <div className="flex items-center" style={{ paddingLeft: indent }}>
      {keyName && <span className="text-purple-600">{keyName}: </span>}
      <span className="text-gray-800">{String(value)}</span>
    </div>
  );
}

export default function JsonTreeView({
  data,
  initialExpanded = true,
}: JsonTreeViewProps) {
  return (
    <div className="px-1 py-2 font-mono text-xs leading-6">
      <TreeNode value={data} depth={0} initialExpanded={initialExpanded} />
    </div>
  );
}
