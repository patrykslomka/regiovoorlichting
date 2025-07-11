'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { events } from '../data/events';

const EventCalendar = () => {
  const [view, setView] = useState('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const eventTypes = [
    { id: 'all', name: 'Alle Evenementen', color: 'bg-gray-100' },
    { id: 'studiedag', name: 'Studiedagen', color: 'bg-blue-100' },
    { id: 'ouderavond', name: 'Ouderavonden', color: 'bg-green-100' },
    { id: 'beurs', name: 'Beurzen', color: 'bg-purple-100' },
    { id: 'masterclass', name: 'Masterclasses', color: 'bg-orange-100' },
    { id: 'informatiesessie', name: 'Informatiesessies', color: 'bg-red-100' }
  ];

  const [selectedType, setSelectedType] = useState('all');

  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedType);

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'bg-gray-100';
  };

  const getEventTypeColorText = (type: string) => {
    const colors: Record<string, string> = {
      'studiedag': 'text-blue-800',
      'ouderavond': 'text-green-800',
      'beurs': 'text-purple-800',
      'masterclass': 'text-orange-800',
      'informatiesessie': 'text-red-800'
    };
    return colors[type] || 'text-gray-800';
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Calendar Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Evenementen Agenda</h3>
            <p className="text-gray-600">Ontdek alle studiegerelateerde evenementen in Nederland</p>
          </div>
          
          <div className="flex gap-2">
            {['list', 'month', 'week'].map(viewType => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === viewType 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {viewType === 'list' ? 'Lijst' : viewType === 'month' ? 'Maand' : 'Week'}
              </button>
            ))}
          </div>
        </div>

        {/* Event Type Filter */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Filter op type:</h4>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type.id 
                    ? 'bg-blue-600 text-white' 
                    : `${type.color} ${getEventTypeColorText(type.id)} hover:opacity-80`
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {view === 'list' ? (
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Geen evenementen gevonden</h4>
                <p className="text-gray-500">Probeer een ander filter of bekijk alle evenementen.</p>
              </div>
            ) : (
              filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-r-lg"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{event.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)} ${getEventTypeColorText(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('nl-NL')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{event.capacity} plekken</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{event.description}</p>
                      <p className="text-sm text-gray-500">Georganiseerd door: {event.organizer}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                        Aanmelden
                      </button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">Kalender weergave</h4>
            <p className="text-gray-500 mb-4">Kalender weergave komt binnenkort beschikbaar</p>
            <button
              onClick={() => setView('list')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ga naar lijst weergave
            </button>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{selectedEvent.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(selectedEvent.type)} ${getEventTypeColorText(selectedEvent.type)}`}>
                    {selectedEvent.type}
                  </span>
                </div>
                <button 
                  onClick={closeEventModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString('nl-NL')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Organisator</h4>
                    <p className="text-gray-600">{selectedEvent.organizer}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Evenement Type</h4>
                    <p className="text-gray-600">{selectedEvent.type}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Beschrijving</h4>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Aanmelden voor dit evenement
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;