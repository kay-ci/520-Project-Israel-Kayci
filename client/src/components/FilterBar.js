import { useDateSelect } from 'react-ymd-date-select';
import { useState } from 'react';
import './FilterBar.css';


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

  const dateSelect = useDateSelect(props.value, () => {}, {
    firstYear: 1000,
  });

  return (
    <>
      <label className="year-select-elem">
        {props.label}
        <select id={props.id} value={dateSelect.yearValue} onChange={dateSelect.onYearChange}>
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

function MassSelect({ id, max, min, defValue }) {

  const [value, setValue] = useState(defValue);

  return (
    <input 
      type="number"
      id={id}
      max={max}
      min={min}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
}

/**
 * Contains all the filtering options.
 * @author Israel Aristide
 */
function FilterBar({ setSearchFilter, sendQuery }){

  /**
   * Gathers the filter params input by the user and sends the query using the
   * sendQuery function from the UserBar component.
   * @author Israel Aristide
   */
  function createQuery() {

    // Since we know the max values are 1000 - 2023 for the year select
    // Every year's index corresponds to itself - 1000
    const minYear = document.getElementById('minYear').selectedIndex + 1000;
    const maxYear = document.getElementById('maxYear').selectedIndex + 1000;
    const minMass = document.getElementById('minMass');
    const maxMass = document.getElementById('maxMass');

    sendQuery({
      minYear:minYear,
      maxYear:maxYear, 
      minMass:minMass.value, 
      maxMass:maxMass.value,
      page:1
    });

  }

  return(
    <div className="filter-bar">

      <input onInput={(event) => {
        setSearchFilter(event.target.value);
      }} className="search-filter" placeholder="search..."/>
      <div className="bottom-filters-text">
        <p>Year</p>
        <p>Mass (g)</p>
      </div>
      <div className="bottom-filters">
        <div className="year-select">
          <YearSelect 
            id="minYear" label=">>" 
            value="1801"
          />

          <YearSelect 
            id="maxYear" label="<<" 
            value="2024"
          />
        </div>

        <div className="mass-select">

          <label className="mass-select-elem" htmlFor="minMass" id="minMassLabel">
            -
            <MassSelect
              id="minMass"
              max="600000"
              min="0"
              defValue="0"
            />
          </label>

          <label className="mass-select-elem" htmlFor="minMass" id="maxMassLabel">
            +
            <MassSelect
              id="maxMass"
              max="600000"
              min="0"
              defValue="600000"
            />
          </label>

        </div>
      </div>

      <div className="search-btn">
        <button onClick={createQuery}>Search</button>
      </div>
    </div>
  );

}
export default FilterBar;