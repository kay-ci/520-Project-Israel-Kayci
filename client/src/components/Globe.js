import { Viewer, Entity, CameraFlyTo } from 'resium';
import { Cartesian3, LabelStyle, VerticalOrigin } from 'cesium';

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
      </Viewer>
    </div>
  );
}

export default Globe;