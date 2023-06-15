import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/agents?is_playable=true', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData);
          const dataArray = Object.values(responseData); // Convert the object to an array
          console.log('Data Array:', dataArray);
          setData(dataArray[1]);
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      } catch (error) {
        console.error('Authorization failed:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Agents</h1>
      </header>
      <div className="card-container">
        {data && data.map(agent => (
          <div key={agent.uuid} className="card">
            <img className="card-image" src={agent.bustPortrait} alt={agent.displayName} />
            <div className="card-overlay">
              <h2 className="card-name">{agent.displayName}</h2>
            </div>
          </div>
        ))}
      </div>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
