import { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type SpecNode = {
  id: string;
  title: string;
  type: "goal" | "architecture" | "module" | "task" | "other";
  status?: string;
  parent?: string;
};

type SpecGraphPanelProps = {
  specs: SpecNode[];
  onOpenSpec?: (id: string) => void;
};

const TYPE_COLORS: Record<string, string> = {
  goal: "#a855f7",
  architecture: "#3b82f6",
  module: "#10b981",
  task: "#f59e0b",
  other: "#6b7280",
};

export function SpecGraphPanel({ specs, onOpenSpec }: SpecGraphPanelProps) {
  const [filter, setFilter] = useState("");

  const { nodes, edges } = useMemo(() => {
    const filtered = specs.filter(
      (s) =>
        !filter ||
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.id.toLowerCase().includes(filter.toLowerCase()),
    );

    const nodes: Node[] = filtered.map((spec, i) => ({
      id: spec.id,
      position: { x: (i % 5) * 220, y: Math.floor(i / 5) * 120 },
      data: {
        label: (
          <div className="text-xs">
            <div className="font-medium">{spec.title}</div>
            <div className="opacity-70">{spec.type}</div>
          </div>
        ),
      },
      style: {
        background: TYPE_COLORS[spec.type] || TYPE_COLORS.other,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: 8,
        minWidth: 140,
      },
    }));

    const edges: Edge[] = [];
    for (const spec of filtered) {
      if (spec.parent && filtered.some((s) => s.id === spec.parent)) {
        edges.push({
          id: `${spec.parent}-${spec.id}`,
          source: spec.parent,
          target: spec.id,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: "#94a3b8" },
        });
      }
    }

    return { nodes, edges };
  }, [specs, filter]);

  return (
    <div className="flex h-full flex-col bg-[#0f0f12]">
      <div className="flex items-center gap-2 border-b border-white/10 p-2">
        <input
          className="flex-1 rounded bg-white/5 px-2 py-1 text-sm text-white placeholder:text-white/40"
          placeholder="Filter specs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <span className="text-xs text-white/50">{nodes.length} nodes</span>
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeClick={(_, node) => onOpenSpec?.(node.id)}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

export const exampleSpecs: SpecNode[] = [
  { id: "goal", title: "Product Goal", type: "goal", status: "active" },
  { id: "architecture", title: "Architecture", type: "architecture", parent: "goal" },
  { id: "module-server", title: "Server", type: "module", parent: "architecture" },
  { id: "module-web", title: "Web UI", type: "module", parent: "architecture" },
  { id: "task-graph", title: "Interactive Graph", type: "task", parent: "module-web" },
];
