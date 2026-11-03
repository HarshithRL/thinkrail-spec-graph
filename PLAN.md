# ThinkRail Spec Graph Enhancement Plan

## Goal
Add an Obsidian-style interactive Spec Graph panel to ThinkRail while preserving the existing layout.

## Current State (from architecture)
- Specs exist as `SPEC.md` files with frontmatter linking them into a graph.
- `pi-spec-graph` provides `spec_*` tools and a core model.
- UI currently renders specs as a **tree** in the Specs panel.
- Visualization extension supports Mermaid inline in chat.
- Extension system supports new panels via `thinkrail-extensions` (web half + registry).

## Proposed Implementation

### 1. New Panel: SpecGraphPanel
Location: `apps/web/src/panels/SpecGraphPanel.tsx`

Features:
- Interactive node-link graph (using React Flow or similar)
- Nodes: specs (by type: goal, architecture, module, task)
- Edges: parent/child and related links from frontmatter
- Click node → open SPEC.md in editor
- Color by status (active, draft, settled)
- Search/filter
- Fits in existing left rail or as a dockable panel

### 2. Data Source
Reuse existing server-side spec index (from `packages/spec-graph` or `packages/server/src/spec/`).
Expose via wire or local computation from workspace files.

### 3. Integration
- Register as a new panel in the workbench.
- Optional: add to left rail under Specs.
- Keep existing tree view as fallback.

### 4. Extension Path (cleaner)
Create a `thinkrail-extensions/spec-graph-view` with:
- Web half: React Flow based renderer
- Server half: thin wrapper over existing spec model

## Feasibility
**High.** The modular panel system and existing spec graph model make this a contained addition.

## Next Steps
1. Implement `SpecGraphPanel.tsx` as a standalone component.
2. Wire it into the workbench (or provide as extension).
3. Add basic node styling matching ThinkRail theme.
4. Test with sample SPEC.md files.

## Files to create/modify
- `apps/web/src/panels/SpecGraphPanel.tsx` (new)
- Registry update in web extensions (if using extension model)
- Optional: wire message for graph data
