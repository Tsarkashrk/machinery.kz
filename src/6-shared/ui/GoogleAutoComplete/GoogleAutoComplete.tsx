'use client';
import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface GoogleAutocompleteInputProps {
  id: string;
  name: string;
  placeholder?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleAutocompleteInput: React.FC<GoogleAutocompleteInputProps> = ({
  id,
  name,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setValue, register } = useFormContext();

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['geocode'],
        componentRestrictions: { country: 'kz' },
      },
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setValue(name, place.formatted_address);
      }
    });
  }, [inputRef.current]);

  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      ref={(e) => {
        inputRef.current = e;
        register(name);
      }}
      className="input" // Или ваш UI-класс
    />
  );
};

export default GoogleAutocompleteInput;
