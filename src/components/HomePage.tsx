'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Video, Calculator, Users, Search } from 'lucide-react';
import GoogleMapWithMarkers from './GoogleMapWithMarkers';
import QuickAccessCard from './ui/QuickAccessCard';

interface HomePageProps {
  selectedRegion: any;
  onRegionSelect: (region: any) => void;
  setCurrentPage: (page: 'home' | 'calculator' | 'activities' | 'videos' | 'calendar' | 'timeline') => void;
}

const HomePage = ({ selectedRegion, onRegionSelect, setCurrentPage }: HomePageProps) => {
  const [regions, setRegions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/regions');
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      }
    };
    fetchRegions();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating circles */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white bg-opacity-15 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          
          {/* Floating academic icons */}
          <div className="absolute top-16 right-1/4 animate-float">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded transform rotate-12">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-24 left-1/3 animate-float-delay">
            <div className="w-6 h-6 bg-white bg-opacity-15 rounded-full transform -rotate-12">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Jouw gids naar de juiste studiekeuze
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Ontdek onafhankelijke informatie, betrouwbare bronnen en regionale voorlichtingssessies. 
              Wij helpen je navigeren door het studiekeuzeproces met relevante content en context.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative animate-fade-in-delay-2">
              <input
                type="text"
                placeholder="Zoek op postcode of plaatsnaam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Independent Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Onafhankelijke bronnen & informatie
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Betrouwbare informatie van verschillende sectoren en organisaties om je studiekeuze te ondersteunen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Voor scholieren</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-600 hover:underline">Studiekeuze123.nl - Onafhankelijke studiekeuzetest</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">DUO - Financiële informatie</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Studielink.nl - Inschrijfprocedures</a></li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Voor ouders</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-600 hover:underline">Nibud.nl - Studiekosten berekenen</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Kennisnet.nl - Digitale vaardigheden</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Ouderportaal.nl - Gesprekstips</a></li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Voor VO-professionals</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-600 hover:underline">VO-raad.nl - Landelijke richtlijnen</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Noloc.nl - Loopbaanoriëntatie</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Schoolentalent.nl - Talentherkenning</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Regionale voorlichtingssessies
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vind gestructureerde informatiesessies in jouw regio met vaste frequentie en duidelijke planning.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Google Maps */}
            <div className="lg:col-span-2">
              <GoogleMapWithMarkers 
                regions={regions} 
                selectedRegion={selectedRegion}
                onRegionSelect={onRegionSelect}
              />
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-1">
              {selectedRegion ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-xl font-semibold mb-4">{selectedRegion.name}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedRegion.province}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{selectedRegion.activities} activiteiten gepland</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Volgende: {new Date(selectedRegion.nextEvent).toLocaleDateString('nl-NL')}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4 mb-4">{selectedRegion.description}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentPage('activities')}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      Bekijk Activiteiten
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors">
                      Meer Info
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Selecteer een regio</h4>
                  <p className="text-gray-600 mb-4">
                    Klik op een punt op de kaart om informatie te zien over voorlichtingsactiviteiten in die regio.
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-medium">Populaire regio's:</h5>
                    {regions.slice(0, 3).map((region) => (
                      <button
                        key={region.id}
                        onClick={() => onRegionSelect(region)}
                        className="block w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                      >
                        {region.name} ({region.activities} activiteiten)
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Gestructureerde begeleiding
            </h3>
            <p className="text-gray-600">
              Vaste structuur en frequentie van informatie om studenten door het studiekeuzeproces te begeleiden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickAccessCard
              icon={<Calculator className="w-8 h-8 text-blue-600" />}
              title="Keuzehulp"
              description="Ontdek welke informatiebronnen en sessies het beste bij jouw situatie passen."
              buttonText="Start Keuzehulp"
              onClick={() => setCurrentPage('calculator')}
            />
            <QuickAccessCard
              icon={<Search className="w-8 h-8 text-green-600" />}
              title="Informatiesessies"
              description="Vind gestructureerde voorlichtingssessies met vaste planning in jouw regio."
              buttonText="Zoek Sessies"
              onClick={() => setCurrentPage('activities')}
            />
            <QuickAccessCard
              icon={<Video className="w-8 h-8 text-purple-600" />}
              title="Presentaties"
              description="Toegang tot onafhankelijke bronnen, presentaties en informatieve content."
              buttonText="Bekijk Presentaties"
              onClick={() => setCurrentPage('videos')}
            />
            <QuickAccessCard
              icon={<Calendar className="w-8 h-8 text-orange-600" />}
              title="Persoonlijke Planning"
              description="Maak een gestructureerde planning met deadlines en belangrijke momenten."
              buttonText="Maak Planning"
              onClick={() => setCurrentPage('timeline')}
            />
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-sm text-gray-600">
              Partner van:
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="/Tilburg-University-logo.png" 
                alt="Tilburg University Logo" 
                className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity"
              />
              <div className="text-sm text-gray-700">
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;