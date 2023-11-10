import Globe from './Globe';
import UserBar from './UserBar';

import {useState} from 'react';

function Main() {

  const [meteors, setMeteors] = useState([]);

  return (
    <section className="main">
      <UserBar meteors={meteors} setMeteors={setMeteors}/>
      <Globe meteors={meteors}/>
    </section>
  );
}

export default Main;