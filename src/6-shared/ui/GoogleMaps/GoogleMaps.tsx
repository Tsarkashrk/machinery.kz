import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

export const GoogleMaps = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
        version: 'quarterly',
        libraries: ['places'],
      });

      const { Map } = await loader.importLibrary('maps');

      const location = {
        lat: 40.73061,
        lng: -73.935242,
      };

      const options: google.maps.MapOptions = {
        center: location,
        zoom: 15,
        mapId: 'map',
      };

      const map = new Map(mapRef.current as HTMLElement, options);

      const { AdvancedMarkerElement } = (await loader.importLibrary(
        'marker',
      )) as google.maps.MarkerLibrary;

      new AdvancedMarkerElement({
        position: location,
        map: map,
      });

    };

    initMap();
  }, []);

  return (
    <div
      className="google-maps"
      ref={mapRef}
    />
  );
};
