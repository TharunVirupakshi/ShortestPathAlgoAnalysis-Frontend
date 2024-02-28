import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../constants';
const ApiDataContext = createContext();

// Replace SERVER_URL with your local dev server

export function ApiDataProvider({ children }) {
  const [graphData, setGraphData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true before making API requests
    setLoading(true);
    axios.get(SERVER_URL+'/get_rand_graph')
      .then(response => {
        setGraphData(response.data);
        axios.get(SERVER_URL+'/get_rand_metrics')
        .then(response => {
            setMetricsData(response.data)
            setLoading(false); // Set loading to false when both requests are completed
        })
        .catch(error => {
            console.error('Error fetching metrics data:', error);
          });
          })
      .catch(error => {
        console.error('Error fetching random graph:', error);
        setLoading(false); // Set loading to false on error
      });
    
  }, []);


 


  return (
    <ApiDataContext.Provider value={{ graphData , metricsData, loading}}>
      {children}
    </ApiDataContext.Provider>
  );
}

export function useApiData() {
  return useContext(ApiDataContext);
}
