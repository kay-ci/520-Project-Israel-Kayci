import FilterBar from './FilterBar';
import Results from './Results'; 
import { Cartesian3 } from 'cesium';
import { useRef, useState} from 'react';

function UserBar( {meteors, setMeteors, setFlyToProps, showLatitude, setShowLatitude } ){

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
        showCountryMeteors.current ? 7000000 : 70000
      ),  
      duration: 1,
    });
  };

  /**
   * Zoom out to home view
   * @author Kayci Davila
   */
  function homeView () {

    if (showCountryMeteors.current) {
      return;
    }

    setFlyToProps({
      destination: Cartesian3.fromDegrees(0, 0, 25000000),
      duration: 1,
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
  
  const showCountryMeteors = useRef(false);

  const [searchFilter, setSearchFilter] = useState('');
  
  /**
   * Goes to the next page of the search results
   * @author Israel Aristide
   */
  function nextPage() {
    const queryParams = {...lastQuery.current, page:lastQuery.current.page + 1};

    if (showLatitude) {
      fetchMeteoritesOnLat(queryParams);
      homeView();
      return;
    }

    if (showCountryMeteors.current) {
      fetchMeteoritesByCountry(queryParams);
      return;
    }
    
    sendQuery(queryParams);
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
      homeView();
      return;
    }

    if (showCountryMeteors.current) {
      fetchMeteoritesByCountry(queryParams);
      return;
    }
    
    sendQuery(queryParams);
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
    const errorBox = document.querySelector('.error-box');

    fetch(
      `/meteorites?minYear=${params.minYear}&maxYear=${params.maxYear}` + 
      `&minMass=${params.minMass}&maxMass=${params.maxMass}&page=${params.page}`
    ).then(res => {
      
      if (res.ok) {
        errorBox.textContent = '';
        return res.json();
      }else{
        return res.json().then((errorRes)=>{

          // Remove any previously displayed meteors
          setMeteors({data:[], page:0, pages:0});
          throw new Error(errorRes.message);
        });
      } 

    }).then(json => {
      setMeteors(json);

    }).catch(error => {
      // Display error to user
      errorBox.textContent = error.message;
    });
  }

  /**
   * Creates a fetch to the API of the meteorites near the major latitude lines
   * @author Kayci Davila
   * @param {{ page: int }} params 
   */
  function fetchMeteoritesOnLat(params){

    lastQuery.current.page = params.page;
    const errorBox = document.querySelector('.error-box');

    fetch(`/meteorites/on-latitudes?page=${params.page}`).then(response => {

      if (response.ok){
        errorBox.textContent = '';
        return response.json();
      } else {
        return response.json().then((errorRes)=>{
          // Remove any previously displayed meteors
          setMeteors({data:[], page:0, pages:0});
          throw new Error(errorRes.message);
        });
      } 
    }).then(json => {
      setMeteors(json);
    }).catch(err => {
      errorBox.textContent = err.message;
    });
  }

  /**
   * Fetches meteorites by the currently selected country.
   * @author Israel Aristide
   * @param {*} params 
   */
  function fetchMeteoritesByCountry(params) {
    lastQuery.current.page = params.page;
    const errorBox = document.querySelector('.error-box');
    fetch(
      `/meteorites/country/${localStorage.getItem('country')}?page=${params.page}`).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((errorRes)=>{
          // Remove any previously displayed meteors
          setMeteors({data:[], page:0, pages:0});
          throw new Error(errorRes.message);
        });
      } 
    }).then(json => {
      setMeteors(json);
    }).catch(err => {
      errorBox.textContent = err.message;
    });
  }

  return (
    <div className="user-bar">
      <FilterBar 
        setSearchFilter={setSearchFilter} 
        sendQuery={sendQuery} 
        setShowLatitude={setShowLatitude}
        setCountryMeteors={(val) => {
          showCountryMeteors.current = val;
        }}
        homeView={homeView}
      />
      <div className="user-bar-extras">
        <button 
          onClick={() => {
            fetchMeteoritesOnLat({page: 1}); 
            setShowLatitude(!showLatitude);
            showCountryMeteors.current = false;
            homeView();
          }} 
          className="extra-filter-button">View Meteorites Near Major Latitudes</button>
        <button 
          onClick={() => {
            fetchMeteoritesByCountry({page: 1});
            setShowLatitude(false);
            showCountryMeteors.current = !showCountryMeteors.current;
            homeView();
          }}
          className="extra-filter-button">View meteorites in my country</button>
      </div>
      <Results
        searchFilter={searchFilter} 
        meteors={meteors.data} 
        handleMeteoriteZoom={handleMeteoriteZoom}
      />
      <div className="pages-btn">
        <button onClick={lastPage}>Last</button>
        <p className="page-info">Page {meteors.page} of {meteors.pages}</p>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default UserBar;