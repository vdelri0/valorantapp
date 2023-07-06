import React, { useEffect, useState } from 'react';
import { linksNavbar, roles, api } from './Constants';
import Header from './header';
import Main from './Main';
import './App.css';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
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
      <Header links={linksNavbar}></Header>
      <Main data={data} roles={roles}></Main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
