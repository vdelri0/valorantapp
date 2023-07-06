import React, { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import './App.css'; // Import CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

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

  const filteredAgents = data.filter(agent => {
    // Filter by search term
    if (searchTerm && !agent.displayName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by selected role
    if (selectedRole && agent.role.displayName !== selectedRole) {
      return false;
    }

    return true;
  });

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = role => {
    setSelectedRole(role);
  };

  return (
    <div className="App">
      <header className="App-logo">
        <h1>One Tap</h1>
      </header>
      <nav className="navbar">
        <div className="search-bar">
          <label htmlFor="search-input">Search:</label>
            <Input
              size='md'
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          {/* <input type="text" id="search-input" value={searchTerm} onChange={handleSearchChange} /> */}
        </div>
        <div className="role-navbar">
          <button className="role-link" onClick={() => handleRoleChange('')}>
            All
          </button>
          <button className="role-link" onClick={() => handleRoleChange('Duelist')}>
            Duelist
          </button>
          <button className="role-link" onClick={() => handleRoleChange('Controller')}>
            Controller
          </button>
          <button className="role-link" onClick={() => handleRoleChange('Sentinel')}>
            Sentinel
          </button>
          <button className="role-link" onClick={() => handleRoleChange('Initiator')}>
            Initiator
          </button>
        </div>
      </nav>
      <div className="card-container">
        {filteredAgents.length > 0 ? (
          filteredAgents.map(agent => (
            <div key={agent.uuid} className="card">
              <img className="card-image" src={agent.bustPortrait} alt={agent.displayName} />
              <div className="card-overlay">
                <h2 className="card-name">{agent.displayName}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No agents found.</p>
        )}
      </div>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
