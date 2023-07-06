import React, { useState } from "react";

function Main ({data, roles}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

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
      <main className="App-main">
        <nav className="navbar">
          <div className="search-bar">
            <input type="text" id="search-input" value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="role-navbar">
            {roles.map(role => (
              <button className="role-link" onClick={() => handleRoleChange(role==='All' ? '' : role)}>{role}</button>
            ))}
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
      </main>
    )
}

export default Main;