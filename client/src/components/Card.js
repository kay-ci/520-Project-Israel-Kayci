function Card({meteor, handleMeteoriteZoom}){
  return(
    <div className="card-div" onClick={handleMeteoriteZoom}>
      <p>{meteor.name}</p>
      <p>
        Mass: {meteor.mass} <br/>
        Year: {meteor.year}
      </p>
    </div>
  );
}

export default Card;