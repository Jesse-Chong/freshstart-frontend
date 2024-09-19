import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { decode } from '../leafletMaps/decode';

const PolylineRouting = ({ startLocation, endLocation, transportMode }) => {
  const map = useMap();

  useEffect(() => {
    if (!startLocation || !endLocation || !transportMode) return;

    const routeUrl = `http://localhost:3001/route?origin=${startLocation}&destination=${endLocation}&transportMode=${transportMode}&return=polyline`;
    
    fetch(routeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          
          // Clear existing route lines
          map.eachLayer((layer) => {
            if (layer instanceof L.Polyline) {
              map.removeLayer(layer);
            }
          });

          route.sections.forEach(section => {
            if (section.polyline) {
              const decodedRoute = decode(section.polyline).polyline;
              const routeLine = L.polyline(decodedRoute, {
                weight: 5,
                opacity: 0.7
              });
  
              routeLine.addTo(map);
            }
          });
  
          const bounds = L.latLngBounds(route.sections.flatMap(section => 
            section.polyline ? decode(section.polyline).polyline : []
          ));
          if (bounds.isValid()) {
            map.fitBounds(bounds);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching route:', error);
      });
  }, [startLocation, endLocation, transportMode, map]);

  return null;
};

export default PolylineRouting;