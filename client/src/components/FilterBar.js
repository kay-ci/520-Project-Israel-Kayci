function FilterBar({ sendQuery }){

  function createQuery() {

    const minYear = document.getElementById('minYear');
    const maxYear = document.getElementById('maxYear');
    const minMass = document.getElementById('minMass');
    const maxMass = document.getElementById('maxMass');

    sendQuery({
      minYear:minYear,
      maxYear:maxYear, 
      minMass:minMass, 
      maxMass:maxMass
    });

  }

  function onRangeChange(event) {

    const label = document.getElementById(`${event.target.id}Label`);
    label.innerText = event.target.value;
    
  }

  return(
    <div className="filter-bar">
      <input className="search-filter" placeholder="search..."/>
      <input 
        type="range" 
        onChange={onRangeChange} 
        id="minYear"
        min="800"
        max="2023"
        step="1"
      /> 
      <label htmlFor="minYear" id="minYearLabel">800</label>
      <input 
        type="range" 
        onChange={onRangeChange} 
        id="maxYear"
        min="800"
        max="2023"
        step="1"
      /> 
      <label htmlFor="maxYear" id="maxYearLabel">800</label>
      <input 
        type="range" 
        onChange={onRangeChange} 
        id="minMass"
        min="0"
        max="1000"
        step="1"
      /> 
      <label htmlFor="minMass" id="minMassLabel">0</label>
      <input 
        type="range" 
        onChange={onRangeChange} 
        id="maxMass"
        min="0"
        max="1000"
        step="1"
      /> 
      <label htmlFor="maxMass" id="maxMassLabel">0</label>
      <button onClick={createQuery}>Search</button>
    </div>
  );

}
export default FilterBar;