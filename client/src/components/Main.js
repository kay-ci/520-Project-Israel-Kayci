import Globe from './Globe';
import UserBar from './UserBar';
import {useState} from 'react';

function Main() {

  const [meteors, setMeteors] = useState([]);
  const [FlyToProps, setFlyToProps] = useState(null);


  return (
    <section className="main">
      <UserBar meteors={meteors} setMeteors={setMeteors} setFlyToProps={setFlyToProps}/>
      <Globe meteors={meteors} FlyToProps={FlyToProps}/>
    </section>
  );

}

export default Main;