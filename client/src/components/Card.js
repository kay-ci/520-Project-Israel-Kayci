import { useEffect, useState } from 'react';

function Card(){

  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/meteorites').then(res => {
      if (res.ok) {
        return res.json();
      } 

      return Promise.reject('Could not fetch meteorites');
    }).then(json => {
      setMeteors(json.data.splice(0, 20).map(x => {
        return <p>Meteor: {x.name}, mass: {x.mass}</p>;
      }));
    });
  }, [setMeteors]);

  return(
    <div className="card-div">
      This will contain fetched data of a meteorite
      { meteors }
    </div>
  );
}
export default Card;