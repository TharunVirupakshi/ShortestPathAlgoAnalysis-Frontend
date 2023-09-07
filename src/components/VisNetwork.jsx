/* eslint-disable react/prop-types */
import  { useEffect, useRef, useState } from "react";
import { Network, DataSet} from "vis-network/standalone";
import './VisNetwork.css'


const VisNetwork = ({ data, path}) => {

	const container = useRef(null);

	const nodesArray = data?.nodes? Object.values(data.nodes) : [];

	const edgesArray = data?.links? data.links.map(link => ({ from: link.source, to: link.target }))
  : [];
	const options = {
		autoResize: true,
		height:'100%',
		width:'100%',
		nodes: {
			shape: "dot",
			size: 40,
			font: {
				size: 72,
				color: "#ffffff",
			},
			borderWidth: 2,
		},
		edges: {
			width: 2,
			smooth: {
				enabled: true,
				type: 'continuous'
			}
		},
		physics:{
			barnesHut: {
				centralGravity: 0.001,
				gravitationalConstant: -6000,
				springLength: 500,
				springConstant: 0.002,
				avoidOverlap: 0.7,

			},
	
		},

		
	};
	
	const [pathNodes, setPathNodes] = useState([]);

	useEffect(()=>{
		setPathNodes(path??[]);
	},[path])

	useEffect(() => {
		console.log("[DATA Vis]: ", data)

		const nodes = new DataSet(nodesArray);
		const edges = new DataSet(edgesArray);
		var graph_data = {
			nodes: nodes,
			edges: edges,
		};
	
		const network =
			container.current &&
			new Network(container.current, graph_data, options);
		// console.log("[NETWORK:]",network)
		if(path){
			// Calculate path edges based on pathNodes
			const pathEdges = [];
			for (let i = 0; i < pathNodes.length - 1; i++) {
				const sourceNodeId = pathNodes[i];
				const targetNodeId = pathNodes[i + 1];
				const edgeId = `${sourceNodeId}-${targetNodeId}`;
				pathEdges.push(edgeId);
			}
	
			// Highlight path nodes by changing their color
			pathNodes.forEach(nodeId => {
				nodes.update([{ id: nodeId, color: 'red' }]);
			});
	
			// Highlight path edges by changing their width
			pathEdges.forEach(edgeId => {
				edges.update({ id: edgeId, width: 3 });
			});
		}

		// Call the network fit method to maintain the existing layout
		network.fit();

		// Cleanup: Destroy the network when the component unmounts
		return () => {
			network.destroy();
		};	
	}, [container, nodesArray, edgesArray]);


  
	return (
		<div className="graph-container">
			<div ref={container} style={{ height: '100%', width: '100%' }} />
		</div>
	)
  };

export default VisNetwork;