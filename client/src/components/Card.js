
function Card({meteor}){
  return(
    <div className="card-div">
      <p>{meteor.name}</p>
      <p>Mass: {meteor.mass}</p>
    </div>
  );
}
export default Card;