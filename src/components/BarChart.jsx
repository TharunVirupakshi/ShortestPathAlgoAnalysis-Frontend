/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






const BarChart = ({data, datasetName, color}) => {

console.log('DAATA:',data)  

// Extract betweenness centrality and degree centrality data
const statData = data?? [];


const lables = data ? Object.keys(data) : [];
console.log('Lables:',lables)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: ''+ (datasetName ?? 'Bar Chart'),
    },
  },
  
};

const dataset = {
   labels: lables,
   datasets: [
     {
       label: datasetName ? ""+datasetName : 'No name' ,
       data: statData ?? [],
       backgroundColor: ''+color ?? 'rgba(10, 100, 235, .5)',
     },
   ],
 };

  return (
    <div>
      <Bar options={options} data={dataset} width={500} height={400}/>
    </div>
  )
}

export default BarChart
