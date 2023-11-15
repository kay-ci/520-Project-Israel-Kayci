import Globe from './Globe';
import UserBar from './UserBar';
import {useState, useEffect} from 'react';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

function Main() {

  const [meteors, setMeteors] = useState({data:[], page:0, pages:0});
  const [FlyToProps, setFlyToProps] = useState(null);
  const [userId, setUserId] = useState('0');

<<<<<<< HEAD
  useEffect(() => {

    const fpPromise = FingerprintJS.load();

    async function effect() {
      const fp = await fpPromise;
      const result = await fp.get();
      return result.visitorId;
    }

    effect().then(x => {
      setUserId(x);
    });

  }, []);

  return (
    <section className="main">
      <UserBar 
        userId={userId} 
        meteors={meteors} 
        setMeteors={setMeteors} 
        setFlyToProps={setFlyToProps}
      />
      <Globe meteors={meteors} FlyToProps={FlyToProps}/>
=======
  return (
    <section className="main">
      <UserBar meteors={meteors} setMeteors={setMeteors} setFlyToProps={setFlyToProps}/>
      <Globe meteors={meteors.data} FlyToProps={FlyToProps}/>
>>>>>>> 2bc8d4648311375b8f5a74f2af91b7332892e30f
    </section>
  );

}

export default Main;