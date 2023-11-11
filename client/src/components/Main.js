import Globe from './Globe';
import UserBar from './UserBar';
import { Cartesian3 } from 'cesium';
import {useState} from 'react';

function Main() {
  const [meteors, setMeteors] = useState([]);
  const [FlyToProps, setFlyToProps] = useState(null);

  const handleMeteoriteZoom = (meteorite) => {
    setFlyToProps({
      destination: Cartesian3.fromDegrees(
        parseFloat(meteorite.geolocation.coordinates[0]), 
        parseFloat(meteorite.geolocation.coordinates[1]), 
        300
      ),
      duration: 5
    });
  };
  return (
    <section className="main">
      <UserBar meteors={meteors} setMeteors={setMeteors} handleMeteoriteZoom={handleMeteoriteZoom}/>
      <Globe meteors={meteors} FlyToProps = {FlyToProps}/>
    </section>
  );
}

export default Main;