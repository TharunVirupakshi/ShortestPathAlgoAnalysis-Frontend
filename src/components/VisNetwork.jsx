/* eslint-disable react/prop-types */
import  { useEffect, useRef } from "react";
import { Network } from "vis-network";
import './VisNetwork.css'


const VisNetwork = ({width, height, data}) => {

	const container = useRef(null);

	const nodes = data?.nodes? Object.values(data.nodes) : [];

	const edges = data?.links? data.links.map(link => ({ from: link.source, to: link.target }))
  : [];
	const options = {
		autoResize: true,
		height:'100%',
		width:'100%',
		nodes: {
			shape: "dot",
			size: 40,
			font: {
				size: 45,
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
  
	useEffect(() => {
		const network =
			container.current &&
			new Network(container.current, { nodes, edges }, options);
	}, [container, nodes, edges]);
  
	return (
		<div className="graph-container">
			<div ref={container} style={{ height: '100%', width: '100%' }} />
		</div>
	)
  };

export default VisNetwork;