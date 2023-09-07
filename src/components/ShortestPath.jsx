import { useState } from "react";
import axios from 'axios';

const ShortestPath = () => {
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
        event.preventDefault();
        console.log('FormData: ', formData)
        try {
            const response = await axios.post('http://127.0.0.1:5000/find_shortest_path', {
                source: parseInt(formData.source),
                target: parseInt(formData.target),
                algorithm: formData.algorithm,
            });
    
            // Handle the response from your backend as needed
            console.log('[SHORTEST PATH]',response.data.shortest_path); // Assuming your backend returns JSON data
            setPath(response.data.shortest_path)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Shortest Path Finder</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="source">Source Node:</label>
                <input
                    type="text"
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    required
                /><br /><br />

                <label htmlFor="target">Target Node:</label>
                <input
                    type="text"
                    id="target"
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    required
                /><br /><br />

                <label htmlFor="algorithm">Select Algorithm:</label>
                <select
                    id="algorithm"
                    name="algorithm"
                    value={formData.algorithm}
                    onChange={handleInputChange}
                >
                    <option value="Dijkstra">Dijkstra</option>
                    <option value="BFS">Breadth-First Search (BFS)</option>
                    {/* Add more algorithm options here */}
                </select><br /><br />

                <button type="submit">Find Shortest Path</button>
            </form>

            <h3>Shortest Path from {formData.source} to {formData.target}: </h3>
           {path.map(item => item + "  ")}
        </div>
    );
}
export default ShortestPath
