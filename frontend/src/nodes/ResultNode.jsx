import { Handle, Position } from 'reactflow';

export default function ResultNode({ data }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 w-96 shadow-lg">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500" />
      <div className="font-semibold text-sm mb-2 text-gray-700">AI Response</div>
      <div className="min-h-[120px] max-h-[400px] p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 overflow-y-auto whitespace-pre-wrap">
        {data.loading ? (
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500 ml-2">Thinking...</span>
          </div>
        ) : data.response ? (
          data.response
        ) : (
          <span className="text-gray-400 italic">Response will appear here...</span>
        )}
      </div>
    </div>
  );
}
