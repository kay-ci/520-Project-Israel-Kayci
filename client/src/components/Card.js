function Card({meteor, handleMeteoriteZoom}){
  const info = meteor;
  console.log(info);

  return(
    <div className="card-div" onClick={handleMeteoriteZoom}>
      <p className="meteorite-title">{meteor.name} {meteor.year}</p>
      <hr></hr>
      <p className="info-title"> Mass </p>
      <p className="info">{meteor.mass} g</p>
      <hr></hr>
      <p className="info-title"> Class </p>
      <p className="info">{meteor.class}</p>
      <hr></hr>
      <p className="info-title"> Location </p>
      <p className="info"> 
        {meteor.geolocation.coordinates[0]}&deg; {meteor.geolocation.coordinates[1]}&deg;</p>
    </div>
  );
}

export default Card;