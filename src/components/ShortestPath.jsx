import { useState } from "react";
import axios from 'axios';
import './ShortestPath.css'
import { SERVER_URL } from "../constants";


const ShortestPath = ({setPathArray, handleUpdate, weight, setIsLoading, graph}) => {
    const [formData, setFormData] = useState({
        source: '',
        target: '',
        algorithm: 'dijkstra', // Default algorithm
    });

    const [path, setPath] = useState([]);

    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
        setIsLoading(true)
        event.preventDefault();
        console.log('FormData: ', formData)
        
        try {
            const response = await axios.post(SERVER_URL+'/find_shortest_path', {
                graph: graph,
                source: parseInt(formData.source),
                target: parseInt(formData.target),
                algorithm: formData.algorithm,
            });
            setIsLoading(false)
            // Handle the response from your backend as needed
            console.log('[SHORTEST PATH]',response.data.shortest_path); // Assuming your backend returns JSON data
            setPath(response.data.shortest_path)
            setPathArray(response.data.shortest_path)
            setTimeout(handleUpdate, 100)
        } catch (error) {
            setIsLoading(false)
            console.error('Error:', error);
        }
    };

    return (
        <div>
            
            <form className="form-container" onSubmit={handleSubmit}>
            {/* <h3>Shortest Path Finder</h3> */}
                <div className="form-group">
                    <label htmlFor="source">Source Node:</label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>

                
                <div className="form-group">
                    <label htmlFor="target">Target Node:</label>
                    <input
                        type="text"
                        id="target"
                        name="target"
                        value={formData.target}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="algorithm">Select Algorithm:</label>
                    <select
                        id="algorithm"
                        name="algorithm"
                        value={formData.algorithm}
                        onChange={handleInputChange}
                        className="form-select"
                        defaultValue={"select"}
                    >
                        <option value="dijkstra">Dijkstra</option>
                        <option value="dijkstraW">Dijkstra - Weighted</option>
                        <option value="bellman-ford">Bellman-Ford</option>
                        <option value="bellman-fordW">Bellman-Ford - Weighted</option>
                        <option value="astar">A*</option>
                        <option value="astarW">A* - Weighted</option>
                        {/* Add more algorithm options here */}
                    </select>
                </div>

                <button type="submit" className="form-button">
                    Find Shortest Path
                </button>
                
                <h5>Shortest Path from {formData.source} to {formData.target}: </h5>
                {path.map(item => item + "  ")}
                <h5>Hops: {path.length == 0 ? '-': path.length - 1}</h5>
                <h5>Cost: {weight}</h5>
            </form>

            
        </div>
    );
}
export default ShortestPath
