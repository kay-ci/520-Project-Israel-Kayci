import { Viewer, Entity, CameraFlyTo } from 'resium';
import { Cartesian3 } from 'cesium';

const pointGraphics = { pixelSize: 10 };

function Globe({meteors, FlyToProps}){

  return (
    <div className="globe-div">
      <Viewer className="viewer">
        {FlyToProps && <CameraFlyTo {...FlyToProps}/>}
        {meteors.map(meteor => 
          <Entity key = {meteor.name}
            position = {Cartesian3.fromDegrees(
              parseFloat(meteor.geolocation.coordinates[0]), 
              parseFloat(meteor.geolocation.coordinates[1]), 100)}
            point = {pointGraphics}
          />)}
      </Viewer>
    </div>
  );
}

export default Globe;