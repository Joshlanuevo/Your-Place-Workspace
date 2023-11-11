import React, { useRef, useEffect } from 'react';

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  className?: string;
  style?: React.CSSProperties;
}

const Map: React.FC<MapProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { center, zoom } = props;

  useEffect(() => {
    // Check if the Google Maps API is available
    if (!window.google) {
      console.error("Google Maps API is not loaded.");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current!, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div ref={mapRef} className={`map w-full h-96 ${props.className}`} style={props.style}></div>
  );
};

export default Map;
