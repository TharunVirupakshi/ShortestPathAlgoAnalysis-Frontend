/* eslint-disable no-unused-vars */
// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import './App.css'
import { useApiData } from "./context/dataProvider";

import { BarChart, PieChart, GraphVisualizer, VisNetwork, ShortestPath} from "./components";
import { useEffect, useState } from "react";
// import {data } from "vis-network";
// import {BarChart} from "./components"

Chart.register(CategoryScale);
 
export default function App() {

  const [metrics, setMetrics] = useState(null)
  const [graph, setGraph] = useState(null)

  const [labels, setLabels] = useState(null);

  const {graphData, metricsData } = useApiData()
  console.log('Graph Data [APP]',graphData)
  console.log('Metrics Data [APP]',metricsData)

  const [path, setPath] = useState([]);
  useEffect(()=>{
    console.log("PATH IN app: ", path)
  }, [path])
  
  
  useEffect(()=>{
    setMetrics(metricsData)
    setGraph(graphData)
    const extractedLabels = graphData?.nodes?.map(node => node.label);
    setLabels(extractedLabels);
  },[metricsData, graphData])

  // console.log('Lables in App', labels)

  return (
    <div className="App">
      <h2 style={{fontWeight: '900', fontSize: '2em', textAlign:'center'}}>Network Analysis</h2>
      <div className="graph-network">
        <VisNetwork data={graph} path={path}/>
        <div className="shrtpath">
         <ShortestPath setPathArray={setPath} pathArray={path}/>
        </div>
      </div>

      
      <div className="stats-container">
      <div className="bar-chart-container">
        <BarChart 
          data={metrics?.betweenness_centrality} 
          datasetName={'Betweenness Centrality'} 
          color={'rgba(10, 100, 235, .5)'}
          labelsData = {labels}
        />
        <BarChart data={metrics?.degree_centrality} datasetName={'Degree Centrality'} color={'rgba(60, 150, 205, .5)'}/>
      </div>
      <div className="bar-chart-container">
        <BarChart 
          data={metrics?.closeness_centrality} 
          datasetName={'Closeness Centrality'} 
          color={'rgba(100, 50, 235, .5)'}
          labelsData = {labels}
        />
       
      </div>
        {/* <PieChart/> */}
      </div>
    </div>
  );
}