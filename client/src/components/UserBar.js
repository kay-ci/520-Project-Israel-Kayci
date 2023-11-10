import FilterBar from './FilterBar';
import Results from './Results'; 

import {useRef} from 'react';

function UserBar( {meteors, setMeteors } ){

  const lastQuery = useRef({
    minYear:0, maxYear:2023, 
    minMass:0, maxMass:100000,
    page:1
  });

  function nextPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page + 1};
    sendQuery(queryParams);
  }

  function lastPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page - 1};
    sendQuery(queryParams);
  }

  function sendQuery(params) {
    
    lastQuery.current = params;

    fetch(
      `/meteorites?minYear=${params.minYear}&maxYear=${params.maxYear}` + 
      `&minMass=${params.minMass}&maxMass=${params.maxMass}&page=${params.page}`
    ).then(res => {
      
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
      <button onClick={lastPage}>Last</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}
export default UserBar;