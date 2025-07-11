'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapWithMarkersProps {
  regions: any[];
  selectedRegion: any;
  onRegionSelect: (region: any) => void;
}

const GoogleMapWithMarkers = ({ regions, selectedRegion, onRegionSelect }: GoogleMapWithMarkersProps) => {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 52.1326, lng: 5.2913 }, // Center of Netherlands
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
          }
        ]
      });

      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));

      const newMarkers = regions.map(region => {
        // Create custom marker icon based on activity count
        const markerColor = region.activities > 10 ? '#10b981' : 
                           region.activities > 5 ? '#f59e0b' : '#f97316';
        
        const marker = new window.google.maps.Marker({
          position: region.coordinates,
          map: mapInstance,
          title: `${region.name} - ${region.activities} activiteiten`,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="${markerColor}" stroke="white" stroke-width="3"/>
                <text x="15" y="19" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${region.activities}</text>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 15)
          }
        });

        // Add click listener
        marker.addListener('click', () => {
          onRegionSelect(region);
          
          // Center map on selected marker
          mapInstance.panTo(region.coordinates);
          mapInstance.setZoom(9);
        });

        // Add info window on hover
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; font-family: Arial, sans-serif;">
              <h4 style="margin: 0 0 4px 0; color: #1f2937;">${region.name}</h4>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">${region.province}</p>
              <p style="margin: 4px 0 0 0; color: #374151; font-size: 13px;">${region.activities} activiteiten beschikbaar</p>
              <p style="margin: 2px 0 0 0; color: #6b7280; font-size: 11px;">Klik voor meer informatie</p>
            </div>
          `
        });

        marker.addListener('mouseover', () => {
          infoWindow.open(mapInstance, marker);
        });

        marker.addListener('mouseout', () => {
          infoWindow.close();
        });

        return marker;
      });

      setMap(mapInstance);
      setMarkers(newMarkers);
    }
  }, [regions, onRegionSelect]);

  // Handle selected region highlighting
  useEffect(() => {
    if (selectedRegion && map) {
      // Find the marker for the selected region
      const selectedMarker = markers.find((_, index) => regions[index].id === selectedRegion.id);
      
      if (selectedMarker) {
        // Animate the selected marker
        selectedMarker.setAnimation(window.google.maps.Animation.BOUNCE);
        
        // Stop animation after 2 seconds
        setTimeout(() => {
          selectedMarker.setAnimation(null);
        }, 2000);
      }
    }
  }, [selectedRegion, map, markers, regions]);

  return (
    <div className="relative">
      <div id="map" className="w-full h-96 rounded-lg shadow-lg"></div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>10+ activiteiten</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
          <span>5-10 activiteiten</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span>1-5 activiteiten</span>
        </div>
      </div>
      
      {/* Loading indicator */}
      {!map && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm">Kaart laden...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapWithMarkers;