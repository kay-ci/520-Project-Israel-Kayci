import { Viewer, Entity, CameraFlyTo } from 'resium';
import { Cartesian3, LabelStyle, VerticalOrigin, Color } from 'cesium';
import {memo} from 'react';

function Globe({meteors, FlyToProps, showLatitude}){
  

  /**
   * Sets points along the latitude to create polyline
   * @author Kayci Davila
   * @param latitude float 
   */
  function latitudeLineMaker(latitude){
    let longitude = -180;
    const pos = [];
    for (var i = 0; i < 361; i++) {
      pos.push(Cartesian3.fromDegrees(longitude, latitude));
      longitude++;
    }
    return pos;
  }
  
  
  const northPole = latitudeLineMaker(90);
  const arcticCirlce = latitudeLineMaker(66.5);
  const tropicCancer = latitudeLineMaker(23.5);
  const equator = latitudeLineMaker(0);
  const tropicCapricorn = latitudeLineMaker(-23.5);
  const antarcticCircle = latitudeLineMaker(-66.5);
  const southPole = latitudeLineMaker(-90);

  const majorLatitudeLines = [];
  majorLatitudeLines.push(
    northPole, arcticCirlce, tropicCancer, equator, tropicCapricorn, antarcticCircle, southPole);

  return (
    <div className="globe-div">
      <Viewer className="viewer">
        {FlyToProps && <CameraFlyTo {...FlyToProps}/>}
        {meteors.map(meteor => 
          <Entity key = {meteor.name}
            position = {Cartesian3.fromDegrees(
              parseFloat(meteor.geolocation.coordinates[0]), 
              parseFloat(meteor.geolocation.coordinates[1]), 100)}
            point = {{pixelSize: 10}}
            label = {{
              text: meteor.name,
              font: '20px monospace',
              style: LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 20,
              verticalOrigin: VerticalOrigin.BOTTOM,
              pixelOffset: new Cartesian3(0, -9),
            }}
          />)}
        {showLatitude && 
          majorLatitudeLines.map((line, index) => {
            return(
              <Entity
                key = {index}
                polyline = {{
                  followSurface: false,
                  width: 3,
                  material: Color.PURPLE,
                  positions: line}
                }
                
              />
            );
          })
        }
      </Viewer>
    </div>
  );
}

export default memo(Globe);