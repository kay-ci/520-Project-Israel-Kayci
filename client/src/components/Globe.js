import { Viewer, Entity } from 'resium';
import { Cartesian3 } from 'cesium';

const pointGraphics = { pixelSize: 10 };

function Globe({meteors}){
  return (
    <div className="globe-div">
      <Viewer className="viewer">
        {meteors.map(meteor => 
          <Entity key = {meteor.name}
            position = {Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100)}
            point = {pointGraphics}
          />)}
      </Viewer>
    </div>
  );
}

export default Globe;