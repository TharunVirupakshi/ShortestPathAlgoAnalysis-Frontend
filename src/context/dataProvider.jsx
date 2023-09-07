import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const ApiDataContext = createContext();

export function ApiDataProvider({ children }) {
  const [graphData, setGraphData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get_rand_graph')
      .then(response => {
        setGraphData(response.data);
      })
      .catch(error => {
        console.error('Error fetching random graph:', error);
      });
  }, []);


  useEffect(()=> {
    axios.get('http://127.0.0.1:5000/get_rand_metrics')
    .then(response => {
        setMetricsData(response.data)
    })
    .catch(error => {
        console.error('Error fetching metrics data:', error);
      });
  },[])


  return (
    <ApiDataContext.Provider value={{ graphData , metricsData}}>
      {children}
    </ApiDataContext.Provider>
  );
}

export function useApiData() {
  return useContext(ApiDataContext);
}
