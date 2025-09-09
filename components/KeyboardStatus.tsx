import mappings from '../mappings.json';

interface KeyboardStatusProps {
  currentLayout: string;
  layoutName: string;
}

export default function KeyboardStatus({ currentLayout, layoutName }: KeyboardStatusProps) {
  const mapping = mappings[currentLayout as keyof typeof mappings];
  
  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-700">
            Active Layout: <span className="font-semibold text-blue-800">{layoutName}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {mapping?.description}
          </div>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div>Keys: {Object.keys(mapping?.keys || {}).length}</div>
          <div>Combinations: {Object.keys(mapping?.combinations || {}).length}</div>
          <div>Alt Codes: {Object.keys(mapping?.altCodes || {}).length}</div>
        </div>
      </div>
      
      <div className="mt-3 flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Shift combinations supported</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Alt codes supported</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Key combinations supported</span>
        </div>
      </div>
    </div>
  );
}