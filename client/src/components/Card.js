
function Card({meteor}){
  return(
    <section className="card-div">
      <p>{meteor.name}</p>
      <p>Mass: {meteor.mass}</p>
    </section>
  );
}
export default Card;