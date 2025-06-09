import React from 'react';

interface GoogleMapsProps {
  lat?: number;
  lng?: number;
  address?: string;
}

export const GoogleMaps = ({ lat, lng, address }: GoogleMapsProps) => {
  const mapSrc =
    lat && lng
      ? `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
      : address
        ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
        : '';

  return mapSrc ? (
    <iframe
      src={mapSrc}
      width="100%"
      height="400"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  ) : (
    <p>Адрес недоступен</p>
  );
};
