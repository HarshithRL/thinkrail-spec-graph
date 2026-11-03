# Implementation Notes

## SpecGraphPanel.tsx
- Drop-in React component using `@xyflow/react` (React Flow).
- Accepts a flat list of specs with optional parent links.
- Renders interactive graph with color-by-type.
- Click handler to open the spec in the editor.
- Filter input.

## Integration steps
1. Add dependency: `bun add @xyflow/react` in `apps/web`.
2. Place `SpecGraphPanel.tsx` in `apps/web/src/panels/`.
3. Register it as a panel in the workbench (or as a ThinkRail extension web half).
4. Feed it data from the existing spec index (server or local).

## Why this works
- Reuses the existing spec graph model.
- Fits the modular panel architecture.
- Keeps the current ThinkRail layout intact.
- Provides the Obsidian-style graph view you want.
