import Globe from './Globe';
import UserBar from './UserBar';
import {useState} from 'react';

function Main() {

  const [meteors, setMeteors] = useState({data:[], page:0, pages:0});
  const [FlyToProps, setFlyToProps] = useState(null);
  const [showLatitude, setShowLatitude] = useState(false);

  return (
    <section className="main">
      <UserBar
        meteors={meteors} 
        setMeteors={setMeteors} 
        setFlyToProps={setFlyToProps}
        showLatitude={showLatitude}
        setShowLatitude={setShowLatitude}
      />
      <Globe meteors={meteors.data} FlyToProps={FlyToProps} showLatitude={showLatitude} />
    </section>
  );

}

export default Main;