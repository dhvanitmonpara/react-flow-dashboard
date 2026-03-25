import { Handle, Position } from 'reactflow';

export default function InputNode({ data }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 w-72 shadow-lg">
      <div className="font-semibold text-sm mb-2 text-gray-700">Prompt Input</div>
      <textarea
        className="w-full p-3 text-sm border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Type your prompt here..."
        value={data.prompt}
        onChange={(e) => data.onPromptChange(e.target.value)}
      />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </div>
  );
}
