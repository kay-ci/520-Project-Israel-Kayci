function Card({meteor}){
  const handleClick = (e) => {
    e.preventDefault();
    console.log(`The link for ${meteor.name} was clicked.`);
  };

  return(
    <div className="card-div" onClick={handleClick}>
      <p>{meteor.name}</p>
      <p>Mass: {meteor.mass}</p>
    </div>
  );
}

export default Card;