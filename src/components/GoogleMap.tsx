import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface GoogleMapComponentProps {
  latitude: number;
  longitude: number;
  title: string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '16px'
};

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  latitude,
  longitude,
  title
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCO0kKndUNlmQi3B5mxy4dblg_8WYcuKuk'
  });

  const center = {
    lat: latitude,
    lng: longitude
  };

  const mapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }, { lightness: 17 }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 18 }]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { lightness: 16 }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#dedede" }, { lightness: 21 }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#5751D5" }, { lightness: 30 }, { weight: 0.5 }]
      }
    ]
  };

  return isLoaded ? (
    <div className="h-80 w-full rounded-2xl overflow-hidden shadow-xl">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
      >
        <Marker
          position={center}
          title={title}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="8" fill="#5751D5"/>
                <circle cx="16" cy="16" r="4" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32)
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <div className="h-80 w-full rounded-2xl bg-gray-200 flex items-center justify-center">
      <div className="text-gray-500">加载地图中...</div>
    </div>
  );
};
