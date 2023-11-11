import Card from './Card';

function Results( { meteors, handleMeteoriteZoom } ){

  if (meteors.length > 0){
    return(
      <div className="results">
        {meteors.map(meteor => 
          <Card key={meteor.name} 
            meteor = {meteor} 
            handleMeteoriteZoom={()=>handleMeteoriteZoom(meteor)}/>)}
      </div>
    );
  }
  
}
export default Results;