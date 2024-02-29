/* eslint-disable react/prop-types */
import  { useEffect, useRef, useState } from "react";
import { Network, DataSet} from "vis-network/standalone";
import './VisNetwork.css'



const VisNetwork = ({ data, path, trigger, setTrigger, setWeight, loading}) => {
	// const {loading} = useApiData()

	const [isLoading, setIsLoading] = useState(true)
	useEffect(()=>{
		setIsLoading(loading)

	},[loading])

	useEffect(()=>{
		if(trigger){
			console.log("Triggered..........")
			update()
			setTrigger(false);
		}
	}, [trigger])

	const container = useRef(null);

	const nodesArray = data?.nodes? Object.values(data.nodes) : [];

	const edgesArray = data?.links? data.links.map((link, index) => ({ from: link.source, to: link.target, id: index ,weight: link.weight}))
  : [];

  console.log(data)

	

  console.log("Edges Array: ",edgesArray)
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
		interaction:{
			zoomSpeed: .7,
		}

		
	};

	
	const network = useRef(null);
	const nodes = useRef(new DataSet(nodesArray));
	const edges = useRef(new DataSet(edgesArray));
	const [pathNodes, setPathNodes] = useState([]);

	useEffect(()=>{
		setPathNodes(path??[]);
	},[path])

	useEffect(() => {
		console.log("[DATA Vis]: ", data)

		nodes.current = new DataSet(nodesArray);
		edges.current = new DataSet(edgesArray);
		var graph_data = {
			nodes: nodes.current,
			edges: edges.current,
		};
	
		network.current =
			container.current &&
			new Network(container.current, graph_data, options);
		// console.log("[NETWORK:]",network)
		// Cleanup: Destroy the network when the component unmounts
		return () => {
			network.current.destroy();
		};	
	}, [data]);


	useEffect(()=>{
		console.log("[PATH in Vis]: ", pathNodes ?? [])
	},[path])

	function findIndicesOfRequiredPairs(links, requiredPairs) {
		const indices = [];
		// Access the array stored in the ref using .current
		links.current.forEach((link, i) => {
			// console.log("Link item: ", link);

			requiredPairs.forEach(requiredPair => {
				const { sourceNodeId, targetNodeId } = requiredPair;
				// console.log("Src nd ",sourceNodeId,"Trgt: ", targetNodeId);
				if (
					(link?.from === sourceNodeId && link?.to === targetNodeId) ||
					(link?.from === targetNodeId && link?.to === sourceNodeId)
				) {
					// console.log("Edges Colored: ", i);
					indices.push(i);
				}
			});
		});

		console.log("Required Edges:::: ", indices);
		return indices;
	}
	const[coloredPaths, setColoredPaths] = useState([]);
	const[coloredNodes, setColoredNodes] = useState([]);

	var weight = 0;

	const update = () => {
		if(pathNodes.length > 0){
			// Calculate path edges based on pathNodes
			
			const pathEdges = [];
			for (let i = 0; i < pathNodes.length - 1; i++) {
				const sourceNodeId = pathNodes[i];
				const targetNodeId = pathNodes[i + 1];
				const edgeId = {sourceNodeId, targetNodeId};
				pathEdges.push(edgeId);
			}

			setColoredNodes(pathEdges);
			console.log("Calced Paths: ", pathEdges);

			const edgesOfPath = findIndicesOfRequiredPairs(edges,pathEdges)
			setColoredPaths(edgesOfPath);
			console.log("Selected Edges:::::::",edgesOfPath)

			//Dimming the rest of the nodes
			nodes.current.forEach( (item, index) => {
				nodes.current.update([{ id: index, color:{background: 'lightblue'},  size: 40 }]);
			})
			edges.current.forEach((item, index)=>{
				edges.current.update([{id: index, color: { color: 'gray' }, width: 2 }]);
			})

			// Highlight path nodes by changing their color
			pathNodes.forEach(nodeId => {
				nodes.current.update([{ id: nodeId, color:{background: 'red'},  size: 80 }]);
			});
			weight = 0;

			edgesOfPath.forEach(index => {
				const edge = edges?.current.get(index);
				weight += edge ? edge.weight : 0; 
				edges.current.update([{id: index, color: { color: 'red' }, width: 15 }])
				
			})
			console.log("Cost: ",weight)
			setWeight(weight)
			// // Highlight path edges by changing their width
			// edgesOfPath.forEach((indices) => {
			// 	const edge = edges.current.get(edgeId);
			// 	if (edge) {
			// 		edge.width = 3; // Adjust to the desired width for path edges
			// 	}
			// });

			// Update the edges in the network
			// edges.current.update(edges.current.get());
			network.current.fit()
		}
	}

	
	// setIsLoading(true)
  
	return (
		<div className="graph-container">
		
			{isLoading && <div className="loading-box">
				<ul className="loading">
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<div className="message">
					Initial request may take longer time due to limitations of free tier
				</div>
			
			</div>}
			
			<div ref={container} style={{ height: '100%', width: '100%' }} />
			{/* <button onClick={()=>update()}>Update</button> */}
		</div>
	)
  };

export default VisNetwork;