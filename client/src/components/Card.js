// import CameraFlyTo, { CameraFlyToProps } from './CameraFlyTo';
function Card({meteor}){
  const handleClick = (e) => {
    e.preventDefault();
    console.log(`The link for ${meteor.name} was clicked.`);
  };
  // const showLocation = (e) =>{
  //   const viewer = document.querySelector('.viewer');
  //   viewer.appendChild(
  //     <CameraFlyTo {...args} destination={Cartesian3.fromDegrees(139.767052, 35.681167, 100)} />
  //   );
  // };
  return(
    <div className="card-div" onClick={handleClick}>
      <p>{meteor.name}</p>
      <p>Mass: {meteor.mass}</p>
    </div>
  );
}

export default Card;