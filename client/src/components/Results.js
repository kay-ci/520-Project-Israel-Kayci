import Card from './Card';

function Results( { meteors } ){

  if (meteors.length > 0){
    return(
      <div className="results">
        {meteors.map(meteor => <Card meteor = {meteor}/>)}
      </div>
    );
  }
}
export default Results;