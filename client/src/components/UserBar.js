import FilterBar from './FilterBar';
import Results from './Results'; 
import {useRef} from 'react';

function UserBar( {meteors, setMeteors, handleMeteoriteZoom} ){

  // We want to keep track of this but not necesarily re-render when it's changed
  // We use useRef to achieve this.
  const lastQuery = useRef({
    minYear:0, 
    maxYear:2023, 
    minMass:0, 
    maxMass:100000,
    page:1
  });

  /**
   * Goes to the next page of the search results
   * @author Israel Aristide
   */
  function nextPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page + 1};
    sendQuery(queryParams);
  }

  /**
   * Goes to the previous page of the search results
   * @author Israel Aristide
   */
  function lastPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page - 1};
    sendQuery(queryParams);
  }

  /**
   * Creates a fetch request to the API using the filter params as input
   * @author Israel Aristide
   * @param {{
   *   minYear: int, 
   *   maxYear: int,
   *   minMass: float, 
   *   maxMass: float,
   *   page: int
   * }} params 
   */
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
      setMeteors(json.data);
    });

  }

  return(
    <div className="user-bar">
      <FilterBar sendQuery={sendQuery}/>
      <Results meteors={meteors} handleMeteoriteZoom={handleMeteoriteZoom}/>
      <button onClick={lastPage}>Last</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default UserBar;