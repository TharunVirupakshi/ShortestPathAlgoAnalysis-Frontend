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

  const [isLoading, setIsLoading] = useState(true)

  const [labels, setLabels] = useState(null);

  const {graphData, metricsData, loading, fetchCustomGraph } = useApiData()
  console.log('Graph Data [APP]',graphData)
  console.log('Metrics Data [APP]',metricsData)

  const [path, setPath] = useState([]);
  const [weight, setWeight] = useState(0);
  useEffect(()=>{
    console.log("PATH IN app: ", path)
    console.log("TotalCost: ",weight)
  }, [path,weight])
  
  useEffect(()=>{
    setIsLoading(loading)
  },[loading])
  
  useEffect(()=>{
    setMetrics(metricsData)
    setGraph(graphData)
    const extractedLabels = graphData?.nodes?.map(node => node.label);
    setLabels(extractedLabels);
  },[metricsData, graphData])

  // console.log('Lables in App', labels)

  const [triggered, setTriggered] = useState(false);
  const triggerUpdateFunction = () => {
   setTriggered(true)
   console.log("TRIGGERED...")
  } 

  const [formData, setFormData] = useState({
    num_of_nodes: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async(event) => {
  event.preventDefault();
  if(formData.num_of_nodes && formData.num_of_nodes < 30){
    alert('Enter minimum of 30 nodes!')
    return
  }

  console.log('FormData (App.jsx): ', formData)
  fetchCustomGraph(parseInt(formData.num_of_nodes))
};

  return (
    <div className="App">
      <h2 className="title large-blur">OptiPath</h2>
      <div className="graph-network">
        
        <VisNetwork data={graph} path={path} trigger={triggered} setTrigger={setTriggered} setWeight={setWeight} loading={isLoading}/>
        <div className="shrtpath">
          <div className="generate-graph-container">
          <form className="form-container" onSubmit={handleSubmit}>
            {/* <h3>Shortest Path Finder</h3> */}
            <div className="form-group">
                    {/* <label htmlFor="num_of_nodes">Number of nodes</label> */}
                    <input
                        type="text"
                        id="num_of_nodes"
                        name="num_of_nodes"
                        value={formData.num_of_nodes}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="Enter the number of nodes"
                    />
                </div>

                <button type="submit" className="form-button">
                    Generate
                </button>
            </form>
            </div>
         <ShortestPath setPathArray={setPath} pathArray={path} handleUpdate={()=> triggerUpdateFunction()} weight={weight} setIsLoading={setIsLoading} graph={graphData}/>
        </div>
        <div className="stats-btn-container">
          <a className="stats-btn" href="#stats">
            View Metrics
          </a>
        </div>
      </div>

      
      <div className="stats-container" id="stats">

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
      <footer>
        <p>Built by Tharun Virupakshi</p>
        <p>
          <a href="https://github.com/TharunVirupakshi/ShortestPathAlgorithmsAnalysis" target="_blank">GitHub </a>
          |
          <a href="https://www.linkedin.com/in/tharunvirupakshi/" target="_blank"> LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}