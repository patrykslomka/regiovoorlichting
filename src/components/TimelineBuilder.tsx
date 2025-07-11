'use client';

import React, { useState } from 'react';
import { Calendar, Download, Plus, Check, Clock, AlertCircle } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  type: 'event' | 'deadline' | 'appointment' | 'custom';
  completed: boolean;
  description: string;
}

interface NewItem {
  title: string;
  date: string;
  type: 'event' | 'deadline' | 'appointment' | 'custom';
  description: string;
}

const TimelineBuilder = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { 
      id: 1, 
      title: 'Open Dag UvA', 
      date: '2024-03-15', 
      type: 'event', 
      completed: false,
      description: 'Bezoek de open dag van de Universiteit van Amsterdam'
    },
    { 
      id: 2, 
      title: 'Aanmelden voor studies', 
      date: '2024-05-01', 
      type: 'deadline', 
      completed: false,
      description: 'Deadline voor aanmelding bij de meeste studies'
    },
    { 
      id: 3, 
      title: 'Studieadviseur gesprek', 
      date: '2024-04-01', 
      type: 'appointment', 
      completed: false,
      description: 'Gesprek met studieadviseur op school'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<NewItem>({
    title: '',
    date: '',
    type: 'custom',
    description: ''
  });

  const addCustomItem = () => {
    if (newItem.title && newItem.date) {
      const item: TimelineItem = {
        id: Date.now(),
        title: newItem.title,
        date: newItem.date,
        type: newItem.type,
        completed: false,
        description: newItem.description
      };
      setTimelineItems([...timelineItems, item]);
      setNewItem({ title: '', date: '', type: 'custom', description: '' });
      setShowAddForm(false);
    }
  };

  const toggleCompleted = (id: number) => {
    setTimelineItems(timelineItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: number) => {
    setTimelineItems(timelineItems.filter(item => item.id !== id));
  };

  const sortedItems = [...timelineItems].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const completedCount = timelineItems.filter(item => item.completed).length;
  const progressPercentage = timelineItems.length > 0 ? (completedCount / timelineItems.length) * 100 : 0;

  const getTypeIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'appointment':
        return <Clock className="w-4 h-4" />;
      default:
        return <Plus className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-500';
      case 'event':
        return 'bg-blue-500';
      case 'appointment':
        return 'bg-green-500';
      default:
        return 'bg-purple-500';
    }
  };

  const getTypeBadgeColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'event':
        return 'bg-blue-100 text-blue-800';
      case 'appointment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Mijn Studiekeuze Planning</h3>
            <p className="text-gray-600">Houd je belangrijke data en deadlines bij</p>
          </div>
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Voeg Mijlpaal Toe
          </button>
        </div>

        {/* Progress Overview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Voortgang</span>
            <span className="text-sm text-gray-600">{completedCount} van {timelineItems.length} voltooid</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-3">Nieuwe mijlpaal toevoegen</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titel</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Bijvoorbeeld: Proefcollege volgen"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Datum</label>
                <input
                  type="date"
                  value={newItem.date}
                  onChange={(e) => setNewItem({...newItem, date: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value as TimelineItem['type']})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="custom">Aangepast</option>
                  <option value="deadline">Deadline</option>
                  <option value="event">Evenement</option>
                  <option value="appointment">Afspraak</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Beschrijving (optioneel)</label>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Extra details..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addCustomItem}
                disabled={!newItem.title || !newItem.date}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Toevoegen
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuleren
              </button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          {sortedItems.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-600 mb-2">Geen mijlpalen toegevoegd</h4>
              <p className="text-gray-500 mb-4">Voeg je eerste mijlpaal toe om te beginnen met plannen.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Voeg Mijlpaal Toe
              </button>
            </div>
          ) : (
            sortedItems.map((item, index) => (
              <div key={item.id} className="relative flex items-start mb-8">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-lg ${
                  item.completed ? 'bg-green-500 text-white' : `${getTypeColor(item.type)} text-white`
                }`}>
                  {item.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    getTypeIcon(item.type)
                  )}
                </div>
                
                <div className="ml-6 flex-1">
                  <div className={`bg-white rounded-lg p-4 shadow-md border-l-4 ${
                    item.completed ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(item.date).toLocaleDateString('nl-NL')}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor(item.type)}`}>
                            {item.type}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={() => toggleCompleted(item.id)}
                          className={`text-sm px-3 py-1 rounded transition-colors ${
                            item.completed 
                              ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {item.completed ? 'Ongedaan' : 'Voltooid'}
                        </button>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        >
                          Verwijder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Export Options */}
        {timelineItems.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-4">Exporteer je planning</h4>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                <Download className="w-4 h-4" />
                Export naar PDF
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                <Calendar className="w-4 h-4" />
                Voeg toe aan Agenda
              </button>
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineBuilder;