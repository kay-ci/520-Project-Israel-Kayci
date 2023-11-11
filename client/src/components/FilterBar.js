import { useDateSelect } from 'react-ymd-date-select';
import { useState } from 'react';

/**
 * Guide followed from 
 * https://www.whitphx.info/posts/20220511-react-ymd-date-select/
 * @author Israel Aristide
 * @param {{
 *   onChange: (value:int) => string,
 *   value: string
 * }} props 
 */
function YearSelect(props) {

  const dateSelect = useDateSelect(props.value, props.onChange, {
    firstYear: 800
  });

  return (
    <>
      <input
        type="date"
        value={dateSelect.dateValue || ''}
        onChange={dateSelect.onDateChange}
      />
      <label>
        Year
        <select value={dateSelect.yearValue} onChange={dateSelect.onYearChange}>
          {dateSelect.yearOptions.map((yearOption) =>
            <option key={yearOption.value} value={yearOption.value}>
              {yearOption.label}
            </option>
          )}
        </select>
      </label>
    </>
  );
}

/**
 * Contains all the filtering options.
 * @author Israel Aristide
 */
function FilterBar({ sendQuery }){

  const [year, setYear] = useState('800');

  /**
   * Gathers the filter params input by the user and sends the query using the
   * sendQuery function from the UserBar component.
   * @author Israel Aristide
   */
  function createQuery() {

    const minYear = document.getElementById('minYear');
    const maxYear = document.getElementById('maxYear');
    const minMass = document.getElementById('minMass');
    const maxMass = document.getElementById('maxMass');

    sendQuery({
      minYear:minYear.value,
      maxYear:maxYear.value, 
      minMass:minMass.value, 
      maxMass:maxMass.value,
      page:1
    });

  }

  /**
   * Runs event listener used to change the associated label whenever
   * a range input object is changed.
   * @author Israel Aristide
   * @param {*} event 
   */
  function onRangeChange(event) {

    const label = document.getElementById(`${event.target.id}Label`);
    label.innerText = event.target.value;
    
  }

  return(
    <div className="filter-bar">
      <input className="search-filter" placeholder="search..."/>
      {/* <input 
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
      */}
      <YearSelect value={year} onChange={(value) => console.log(value)}/>
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