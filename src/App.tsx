import ReactFlow, {
  Background,
  Controls,
  ConnectionMode,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow';
import { useCallback } from 'react';

import { Square } from './components/nodes/Square';
import DefaultEdge from './components/Edges/DefaultEdge';

import * as Toolbar from "@radix-ui/react-toolbar"


import 'reactflow/dist/style.css'

import { zinc } from 'tailwindcss/colors'
import { Circle } from './components/nodes/Circle';

const NODE_TYPES = {
  square: Square,
  circle: Circle
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 500,
      y: 200
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 200
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: 'circle',
    position: {
      x: 1000,
      y: 800
    },
    data: {},
  }
]

function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, []);

  function addSquare() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 750,
          y: 200
        },
        data: {},
      }
    ])
  }

  function addCircle() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'circle',
        position: {
          x: 750,
          y: 200
        },
        data: {},
      }
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }
        }
      >
        <Background
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-auto overflow-hidden">
        <Toolbar.Button
          onClick={addSquare}
          className="w-32 h-32 bg-violet-500 mt-6 mr-4 rounded transition-transform hover:-translate-y-2"
        />
        <Toolbar.Button
          onClick={addCircle}
          className="w-32 h-32 bg-violet-500 mt-6 rounded-full transition-transform hover:-translate-y-2"
        />
      </Toolbar.Root>
    </div>
  )
}

export default App
