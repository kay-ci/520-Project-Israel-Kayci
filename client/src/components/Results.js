import Card from './Card';

/**
 * isEmpty function that returns false when a string is populated
 * but true if its undefined, null, empty, or whitespace
 * from: https://sentry.io/answers/how-do-i-check-for-an-empty-undefined-null-string-in-javascript/
 * @author Matthew C.
 */
export function isEmpty(value) {
  if (typeof value === 'string'){
    return value.trim().length === 0;
  }
  return value === null;
}

/**
 * @author Kayci Davila
 * @param {@} param0 
 * @returns 
 */
function Results( {searchFilter, meteors, handleMeteoriteZoom } ){

  if (meteors.length > 0){
    return(
      <div className="results">
        {meteors.filter(meteor => {
          
          if (
            isEmpty(searchFilter) ||
            meteor.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            meteor.year.toLowerCase().includes(searchFilter.toLowerCase()) ||
            meteor.mass.toLowerCase().includes(searchFilter.toLowerCase())  
          ) {
            return true;
          }

          return false;
            
        }).map(meteor => 
          <Card key={meteor.name} 
            meteor = {meteor} 
            handleMeteoriteZoom={()=>{
              handleMeteoriteZoom(meteor);
            }}/>)}
      </div>
    );
  }
  
}
export default Results;