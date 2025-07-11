'use client';

import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import HomePage from './HomePage';
import StudyChoiceCalculator from './StudyChoiceCalculator';
import ActivityFinder from './ActivityFinder';
import VideoLibrary from './VideoLibrary';
import EventCalendar from './EventCalendar';
import TimelineBuilder from './TimelineBuilder';

type PageType = 'home' | 'calculator' | 'activities' | 'videos' | 'calendar' | 'timeline';

const RegiovoorlichtingenApp = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  const handleRegionSelect = (region: any) => {
    setSelectedRegion(region);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'calculator':
        return <StudyChoiceCalculator />;
      case 'activities':
        return <ActivityFinder />;
      case 'videos':
        return <VideoLibrary />;
      case 'calendar':
        return <EventCalendar />;
      case 'timeline':
        return <TimelineBuilder />;
      default:
        return <HomePage selectedRegion={selectedRegion} onRegionSelect={handleRegionSelect} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Regiovoorlichtingen.nl
              </button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('activities')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'activities' ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Informatiesessies
              </button>
              <button 
                onClick={() => setCurrentPage('videos')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'videos' ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Presentaties
              </button>
              <button 
                onClick={() => setCurrentPage('calendar')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'calendar' ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Planning
              </button>
              <button 
                onClick={() => setCurrentPage('timeline')}
                className={`hover:text-blue-600 transition-colors ${currentPage === 'timeline' ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Mijn Route
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Regiovoorlichtingen.nl</h4>
              <p className="text-gray-400 text-sm">
                Onafhankelijke studiekeuze-informatie en regionale voorlichting. 
                Content en context voor scholieren, ouders en VO-professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Snel naar</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage('activities')} className="text-gray-400 hover:text-white">Informatiesessies</button></li>
                <li><button onClick={() => setCurrentPage('calculator')} className="text-gray-400 hover:text-white">Keuzehulp</button></li>
                <li><button onClick={() => setCurrentPage('videos')} className="text-gray-400 hover:text-white">Presentaties</button></li>
                <li><button onClick={() => setCurrentPage('timeline')} className="text-gray-400 hover:text-white">Mijn route</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Veelgestelde vragen</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Feedback</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Technische ondersteuning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@regiovoorlichtingen.nl</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>06 123 45678</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-sm text-gray-400 mr-4">Een initiatief van:</span>
                <span className="text-sm text-gray-300 font-medium">Tilburg University</span>
              </div>
              <div className="text-center text-sm text-gray-400">
                <p>&copy; 2025 Regiovoorlichtingen.nl - Alle rechten voorbehouden</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegiovoorlichtingenApp;