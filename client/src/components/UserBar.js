import FilterBar from './FilterBar';
import Results from './Results'; 
import { Cartesian3 } from 'cesium';
import { useRef, useState } from 'react';

function UserBar( { userId, meteors, setMeteors, setFlyToProps, showLatitude, setShowLatitude } ){

  /**
   * Zoom to meteorite location
   * @author Kayci Davila
   * @param {*} meteorite 
   */
  const handleMeteoriteZoom = (meteorite) => {

    setFlyToProps({

      destination: Cartesian3.fromDegrees(
        parseFloat(meteorite.geolocation.coordinates[0]), 
        parseFloat(meteorite.geolocation.coordinates[1]), 
        300
      ),
      duration: 5,
    });
  };

  /**
   * Zoom out to home view
   * @author Kayci Davila
   */
  function homeView () {

    setFlyToProps({

      destination: Cartesian3.fromDegrees(0, 0, 25000000),
      duration: 5,
    });
  };

  // We want to keep track of this but not necesarily re-render when it's changed
  // We use useRef to achieve this.
  const lastQuery = useRef({
    minYear:0, 
    maxYear:2023, 
    minMass:0, 
    maxMass:100000,
    page:1
  });
  
  const [searchFilter, setSearchFilter] = useState('');

  /**
   * Goes to the next page of the search results
   * @author Israel Aristide
   */
  function nextPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page + 1};

    if (showLatitude){
      fetchMeteoritesOnLat(queryParams);
    }else{
      sendQuery(queryParams);
    }

    homeView();
  }

  /**
   * Goes to the previous page of the search results
   * @author Israel Aristide
   */
  function lastPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page - 1};
    if (showLatitude){
      fetchMeteoritesOnLat(queryParams);
    }else{
      sendQuery(queryParams);
    }
    homeView();
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
      setMeteors(json);
    });

  }

  function handleRating(meteorId, rating) {
    
  }

  function fetchMeteoritesOnLat(params){

    fetch(`/meteorites/on-latitudes?page=${params.page}`).then(response => {

      if (response.ok){
        return response.json();
      }

      return Promise.reject('Could not fetch meteorites');
    }).then(json => {
      setMeteors(json);
    });
  }

  return (
    <div className="user-bar">
      <FilterBar 
        setSearchFilter={setSearchFilter} 
        sendQuery={sendQuery} 
        setShowLatitude={setShowLatitude}
      />
      <Results
        userId={userId}
        handleRating={handleRating}
        searchFilter={searchFilter} 
        meteors={meteors.data} 
        handleMeteoriteZoom={handleMeteoriteZoom}
      />
      <div className="pages-btn">
        <button onClick={lastPage}>Last</button>
        <p className="page-info">Page {meteors.page} of {meteors.pages}</p>
        <button onClick={nextPage}>Next</button>
      </div>
      <button 
        onClick={() => {
          fetchMeteoritesOnLat({page: 1}); setShowLatitude(!showLatitude);
        }} 
        className="latitude-button">Meteorites On Latitude</button>
    </div>
  );
}

export default UserBar;