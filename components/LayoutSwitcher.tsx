interface Layout {
  id: string;
  name: string;
  font: string;
}

interface LayoutSwitcherProps {
  currentLayout: string;
  onLayoutChange: (layout: string) => void;
  layouts: Layout[];
}

export default function LayoutSwitcher({ currentLayout, onLayoutChange, layouts }: LayoutSwitcherProps) {
  return (
    <div className="mb-4">
      <label htmlFor="layout-select" className="block text-sm font-medium mb-2">
        Keyboard Layout:
      </label>
      <select
        id="layout-select"
        value={currentLayout}
        onChange={(e) => onLayoutChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {layouts.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.name}
          </option>
        ))}
      </select>
    </div>
  );
}