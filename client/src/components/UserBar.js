import FilterBar from './FilterBar';
import Results from './Results'; 

import {useState} from 'react';

function UserBar(){

  const [meteors, setMeteors] = useState([]);

  function sendQuery(params) {

    fetch('/meteorites').then(res => {
      
      if (res.ok) {
        return res.json();
      } 

      return Promise.reject('Could not fetch meteorites');

    }).then(json => {
      setMeteors(json.data.splice(0, 20));
    });

  }

  return(
    <div className="user-bar">
      <FilterBar sendQuery={sendQuery}/>
      <Results meteors={meteors}/>
    </div>
  );
}
export default UserBar;