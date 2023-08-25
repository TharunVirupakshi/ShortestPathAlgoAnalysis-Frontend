// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { BarChart, PieChart } from "./components";
// import {BarChart} from "./components"

Chart.register(CategoryScale);
 
export default function App() {
  
  return (
    <div className="App">
      <p>Network Analysis</p>
      <BarChart/>
      <PieChart/>

    </div>
  );
}