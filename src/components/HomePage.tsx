'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Video, Calculator, Users, Search } from 'lucide-react';
import GoogleMapWithMarkers from './GoogleMapWithMarkers';
import QuickAccessCard from './ui/QuickAccessCard';
import { regions } from '../data/regions';

interface HomePageProps {
  selectedRegion: any;
  onRegionSelect: (region: any) => void;
  setCurrentPage: (page: 'home' | 'calculator' | 'activities' | 'videos' | 'calendar' | 'timeline') => void;
}

const HomePage = ({ selectedRegion, onRegionSelect, setCurrentPage }: HomePageProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Jouw gids naar de juiste studiekeuze
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Ontdek onafhankelijke informatie, betrouwbare bronnen en regionale voorlichtingssessies. 
              Wij helpen je navigeren door het studiekeuzeproces met relevante content en context.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Zoek op postcode of plaatsnaam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                <li><a href="#" className="text-blue-600 hover:underline">Studentenkaarten.nl - Vergelijken van studielocaties</a></li>
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
                <li><a href="#" className="text-blue-600 hover:underline">Studiekeuze-info.nl - Actuele trends</a></li>
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

    </div>
  );
};

export default HomePage;