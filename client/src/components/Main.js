import Globe from './Globe';
import UserBar from './UserBar';
import {useState, useEffect} from 'react';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

function Main() {

  const [meteors, setMeteors] = useState([]);
  const [FlyToProps, setFlyToProps] = useState(null);
  const [userId, setUserId] = useState('0');

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
    </section>
  );

}

export default Main;