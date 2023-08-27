
import { useEffect, useState } from "react";
import { Graph } from "react-d3-graph";




const GraphVisulaizer = ({width , height}) => {
 
  const myConfig = {
  // nodeHighlightBehavior: true,
  automaticRearrangeAfterDropNode: true,
  collapsible: true,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  freezeAllDragEvents: false,
  width: width ?? 800,
  height: height ?? 400,
  highlightDegree: 2,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 12,
  minZoom: 0.05,
  nodeHighlightBehavior: true,
  panAndZoom: true,
  staticGraph: false,
  // staticGraphWithDragAndDrop: true,

  // d3: {
  //   alphaTarget: 0.05,
  //   gravity: -250,
  //   linkLength: 120,
  //   linkStrength: 2,
  //   disableLinkForce: false
  // },
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
  
  
};

  useEffect(()=>{})
  // the graph configuration, just override the ones you need


// graph payload (with minimalist structure)
const data = {
  links: [
    // {source: "Harry", target: "Harry"},
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
    { source: "Alice", target: "2" },
    { source: "3", target: "Alice" },
  ],
  nodes: [
   { id: "Harry" },
   { id: "Sally" }, 
   { id: "Alice" },
   { id: "2" },
   { id: "3" },
  ],


};



const onClickNode = function(nodeId) {
  // window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function(source, target) {
  // window.alert(`Clicked link between ${source} and ${target}`);
};


  return (
    <div className="graph-container" style={{width: width, height: height}}>
          <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
    </div>
  )
}

export default GraphVisulaizer
