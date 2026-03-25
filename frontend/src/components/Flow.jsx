import { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import InputNode from '../nodes/InputNode';
import ResultNode from '../nodes/ResultNode';
import { askAI, saveFlow } from '../services/api';

const initialEdges = [
  { id: 'e1-2', source: 'input-1', target: 'result-1', animated: true, style: { stroke: '#9ca3af', strokeWidth: 2 } }
];

export default function Flow() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Custom Node Types
  const nodeTypes = useMemo(() => ({
    inputNode: InputNode,
    resultNode: ResultNode,
  }), []);

  // Compute nodes dynamically based on state
  const nodes = useMemo(() => [
    { 
      id: 'input-1', 
      type: 'inputNode', 
      position: { x: 100, y: 150 }, 
      data: { prompt, onPromptChange: setPrompt } 
    },
    { 
      id: 'result-1', 
      type: 'resultNode', 
      position: { x: 550, y: 150 }, 
      data: { response, loading } 
    }
  ], [prompt, response, loading]);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleRunFlow = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first.");
      return;
    }
    setLoading(true);
    setResponse('');
    
    try {
      const res = await askAI(prompt);
      if (res.success) {
        setResponse(res.data.response);
      } else {
        setResponse('Error: ' + res.message);
      }
    } catch (err) {
      setResponse('Failed to fetch AI response. Please check your backend and API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt.trim() || !response.trim()) {
      alert("Both prompt and response are required to save.");
      return;
    }

    try {
      const res = await saveFlow(prompt, response);
      if (res.success) {
        alert("Flow saved successfully!");
      }
    } catch (err) {
      alert("Failed to save flow data.");
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#ccc" gap={16} />
        <Controls />
        <Panel position="top-right" className="bg-white p-3 rounded-lg shadow-md border border-gray-200 m-4 flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Controls</h2>
          <button 
            onClick={handleRunFlow}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Running...' : 'Run Flow'}
          </button>
          
          <button 
            onClick={handleSave}
            disabled={loading || !response}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            Save Flow
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
