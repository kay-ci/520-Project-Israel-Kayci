import { TbWeight } from 'react-icons/tb';
import { MdOutlineClass } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import * as countryCoder from '@rapideditor/country-coder';

function Card({meteor, handleMeteoriteZoom}){
  return(
    <div className="card-div" onClick={handleMeteoriteZoom}>
      <p className="meteorite-title">{meteor.name} - {meteor.year}</p>
      <hr></hr>
      <div className="meteorite-info">
        <div className="info-div">
          <p className="info-title"> Mass <TbWeight /></p>
          <p className="info">{meteor.mass} g</p>
        </div>
        
        <div className="info-div">
          <p className="info-title"> Class <MdOutlineClass /></p> 
          <p className="info">{meteor.class}</p>
        </div>
        <div className="info-div">
          <p className="info-title"> Location <CiLocationOn/></p>
          <p className="info"> 
            {meteor.geolocation.coordinates[0]}&deg; {meteor.geolocation.coordinates[1]}&deg;
            {' '}{countryCoder.emojiFlag(meteor.geolocation.coordinates)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;