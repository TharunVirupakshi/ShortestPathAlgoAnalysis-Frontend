/* eslint-disable no-unused-vars */
// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import './App.css'
import { useApiData } from "./context/dataProvider";

import { BarChart, PieChart, GraphVisualizer, VisNetwork} from "./components";
import { useEffect, useState } from "react";
// import {data } from "vis-network";
// import {BarChart} from "./components"

Chart.register(CategoryScale);
 
export default function App() {

  const [metrics, setMetrics] = useState(null)
  const [graph, setGraph] = useState(null)

  const [labels, setLables] = useState(null);

  const {graphData, metricsData } = useApiData()
  console.log(graphData)
  console.log(metricsData)
  console.log('Lables in App', labels)
  
  useEffect(()=>{
    setMetrics(metricsData)
    setGraph(graphData)
    // setLables(graphData.map(label => graph.nodes.label ))
  },[metricsData, graphData])

  return (
    <div className="App">
      <h2 style={{fontWeight: '900', fontSize: '2em'}}>Network Analysis</h2>
      <div className="graph-network">
        <VisNetwork data={graph}/>
      </div>
      <div className="stats-container">
      <div className="bar-chart-container">
        <BarChart data={metrics?.betweenness_centrality} datasetName={'Betweenness Centrality'} color={'rgba(10, 100, 235, .5)'}/>
        <BarChart data={metrics?.degree_centrality} datasetName={'Degree Centrality'} color={'rgba(60, 150, 205, .5)'}/>
      </div>
        <PieChart/>
      </div>
    </div>
  );
}