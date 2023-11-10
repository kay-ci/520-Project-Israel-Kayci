import { useEffect, useState } from 'react';
import Card from './Card';

function Results(){
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    fetch('/meteorites').then(res => {
      if (res.ok) {
        return res.json();
      } 

      return Promise.reject('Could not fetch meteorites');
    }).then(json => {
      setMeteors(json.data.splice(0, 20));
    });
  }, []);

  if (meteors.length > 0){
    return(
      <div className="results">
        {meteors.map(meteor => <Card meteor = {meteor}/>)}
      </div>
    );
  }
}
export default Results;