import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/agents')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Agents</h1>
      {data && data.map(agent => (
        <div key={agent.uuid}>
          <h2>{agent.displayName}</h2>
          <p>{agent.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
