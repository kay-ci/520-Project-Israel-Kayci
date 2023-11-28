import { TbWeight } from 'react-icons/tb';
import { MdOutlineClass } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import * as countryCoder from '@rapideditor/country-coder';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import './Card.css';

function Rating({userId, handleRating, meteor}) {

  const [likes, setLikes] = useState({
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  });

  useEffect(() => {

    // Fetch the likes dislikes and such from the api using the userid
    

  }, []);

  function ButtonClick(e, rating) {

    e.stopPropagation();
    const tempLikes = {...likes};
    if (rating === 'like') {
      if (tempLikes.userDisliked) {
        tempLikes.userDisliked = false;
        tempLikes.dislikes -= 1;
      }
      if (!tempLikes.userLiked) {
        tempLikes.likes += 1;
        tempLikes.userLiked = true;
      }
    } else if (rating === 'dislike') {
      if (tempLikes.userLiked) {
        tempLikes.userLiked = false;
        tempLikes.likes -= 1;
      }
      if (!tempLikes.userDisliked) {
        tempLikes.dislikes += 1;
        tempLikes.userDisliked = true;
      }
    }
    setLikes(tempLikes);

  }

  return (
    <div className="rating-sec">
      <div className="rating-buttons">
        <button onClick={(e) =>{
          ButtonClick(e, 'like');
        }} className="rating-button">
          { !likes.userLiked && <BiLike/>}
          { likes.userLiked && <BiSolidLike/>}
        </button>
        <button onClick={(e) =>{
          ButtonClick(e, 'dislike');
        }} className="rating-button">
          { !likes.userDisliked && <BiDislike/> }
          { likes.userDisliked && <BiSolidDislike/> }
        </button>
      </div>
      <div className="rating-numbers">
        <p>{likes.likes}</p>
        <p>{likes.dislikes}</p>
      </div>

    </div>
  );
}

function Card({userId, handleRating, meteor, handleMeteoriteZoom}){
  return(
    <div className="card-div" onClick={handleMeteoriteZoom}>
      <div className="top-sec">
        <p className="meteorite-title">{meteor.name} - {meteor.year}</p>
        <Rating userId={userId} handleRating={handleRating} meteor={meteor}/>
      </div>
      
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
            {meteor.geolocation.coordinates[1]}&deg; {meteor.geolocation.coordinates[0]}&deg;
            {' '}{countryCoder.emojiFlag(meteor.geolocation.coordinates)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;