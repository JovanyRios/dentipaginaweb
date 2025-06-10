// src/components/common/MapPicker.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Arreglo para el icono por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Componente para manejar eventos y asegurar la vista del mapa
const MapInteractionController = ({ center, zoom, onMarkerSetByClick }) => {
  const map = useMap();

  useEffect(() => {
    if (center && typeof center[0] === 'number' && typeof center[1] === 'number') {
      map.setView(center, zoom);
    }
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map, center, zoom]);

  useMapEvents({
    click(e) {
      onMarkerSetByClick([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
};

const MapPicker = ({ initialPosition, onLocationChange, zoom = 13, height = '400px' }) => {
  const defaultPositionArray = [19.432608, -99.133209];

  const getValidPosition = (pos) => {
    if (
      pos &&
      typeof pos.lat === 'number' &&
      typeof pos.lng === 'number' &&
      pos.lat >= -90 && pos.lat <= 90 &&
      pos.lng >= -180 && pos.lng <= 180
    ) {
      return [pos.lat, pos.lng];
    }
    return defaultPositionArray;
  };

  const [markerPosition, setMarkerPosition] = useState(() => getValidPosition(initialPosition));

  useEffect(() => {
    const newValidPos = getValidPosition(initialPosition);
    if (markerPosition[0] !== newValidPos[0] || markerPosition[1] !== newValidPos[1]) {
      setMarkerPosition(newValidPos);
    }
  }, [initialPosition]);

  const handleMarkerSetByClick = (newPositionArray) => {
    setMarkerPosition(newPositionArray);
    if (onLocationChange) {
      onLocationChange({ lat: newPositionArray[0], lng: newPositionArray[1] });
    }
  };

  const memoizedMarkerPosition = useMemo(() => {
    if (markerPosition && typeof markerPosition[0] === 'number' && typeof markerPosition[1] === 'number') {
      return markerPosition;
    }
    return defaultPositionArray;
  }, [markerPosition]);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm" style={{ height: height }}>
      <MapContainer
        center={memoizedMarkerPosition}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {memoizedMarkerPosition && (
          <Marker 
            position={memoizedMarkerPosition} 
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                handleMarkerSetByClick([lat, lng]);
              }
            }}
          />
        )}
        <MapInteractionController 
          center={memoizedMarkerPosition} 
          zoom={zoom}
          onMarkerSetByClick={handleMarkerSetByClick}
        />
      </MapContainer>
      <p className="text-xs text-gray-600 p-2 bg-gray-50 text-center">
        Haz clic en el mapa para seleccionar la ubicación. Posición actual:
        Lat: {memoizedMarkerPosition[0].toFixed(6)},
        Lng: {memoizedMarkerPosition[1].toFixed(6)}
      </p>
    </div>
  );
};

export default MapPicker;
