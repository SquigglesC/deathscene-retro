import MapComponent from "@terrestris/react-geo/dist/Map/MapComponent/MapComponent";
import OlLayerTile from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat } from "ol/proj";
import OlSourceOsm from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import OlView from "ol/View";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import OlLayerVector from 'ol/layer/Vector';

interface LastLocationProps {
  latitude: number;
  longitude: number;
}

export default function LastLocation({
  latitude,
  longitude,
}: LastLocationProps) {

  const map = new OlMap({
    view: new OlView({
      center: fromLonLat([longitude, latitude]),
      zoom: 15,
    }),
    layers: [
      new OlLayerTile({
        source: new OlSourceOsm(),
      }),
    ],
  });


  // Add marker layer
  const markerSource = new VectorSource();
  const markerFeature = new Feature({
    geometry: new Point(fromLonLat([longitude, latitude])),
  });

  const markerStyle = new Style({
    image: new Icon({
      src: 'https://zrjaxvk9cb.ufs.sh/f/VjJAZzOG9e6iV4B667OG9e6iz2vWDHQaq4cC1rAfuI3sOXYK',
      scale: 0.05,
    }),
  });

  markerFeature.setStyle(markerStyle);
  markerSource.addFeature(markerFeature);

  const markerLayer = new OlLayerVector({
    source: markerSource,
  });

  map.addLayer(markerLayer);

  return (
    <MapComponent
      map={map}
      style={{
        height: "100%",
        width: "100%",
        objectFit: "fill",
      }}
    />
  );
}