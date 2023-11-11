function Card({meteor, handleMeteoriteZoom}){
  return(
    <div className="card-div" onClick={handleMeteoriteZoom}>
      <p>{meteor.name}</p>
      <ul>
        <li>Mass: {meteor.mass}</li>
        <li>{meteor.year}</li>
      </ul>
    </div>
  );
}

export default Card;