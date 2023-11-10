import { Viewer, Entity } from 'resium';
import { Cartesian3 } from 'cesium';

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };

function Globe(){
  return (
    <div className="globe-div">
      <Viewer className="viewer">
        <Entity position={position} point={pointGraphics} />
      </Viewer>
    </div>
  );
}

export default Globe;