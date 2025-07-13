'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Filter } from 'lucide-react';

const ActivityFinder = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    region: '',
    studyField: '',
    type: '',
    date: '',
    audience: ''
  });

  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesResponse, regionsResponse] = await Promise.all([
          fetch('/api/activities'),
          fetch('/api/regions')
        ]);
        
        const activitiesData = await activitiesResponse.json();
        const regionsData = await regionsResponse.json();
        
        setActivities(activitiesData);
        setFilteredActivities(activitiesData);
        setRegions(regionsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = activities;
    
    if (filters.region) {
      filtered = filtered.filter(activity => activity.region === filters.region);
    }
    if (filters.studyField) {
      filtered = filtered.filter(activity => activity.studyField === filters.studyField);
    }
    if (filters.type) {
      filtered = filtered.filter(activity => activity.type === filters.type);
    }
    if (filters.audience) {
      filtered = filtered.filter(activity => activity.audience === filters.audience);
    }
    if (filters.date) {
      filtered = filtered.filter(activity => activity.date >= filters.date);
    }
    
    setFilteredActivities(filtered);
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      region: '',
      studyField: '',
      type: '',
      date: '',
      audience: ''
    });
  };

  const getRegionName = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region ? region.name : regionId;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Activiteiten Zoeken</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Verberg Filters' : 'Toon Filters'}
          </button>
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {filteredActivities.length} van {activities.length} activiteiten gevonden
          </p>
          {(filters.region || filters.studyField || filters.type || filters.date || filters.audience) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Wis alle filters
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Filter Activiteiten</h4>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Regio</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
              >
                <option value="">Alle regio's</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Studiegebied</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.studyField}
                onChange={(e) => setFilters({...filters, studyField: e.target.value})}
              >
                <option value="">Alle gebieden</option>
                <option value="business">Business</option>
                <option value="law">Recht</option>
                <option value="engineering">Techniek</option>
                <option value="medicine">Geneeskunde</option>
                <option value="psychology">Psychologie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">Alle types</option>
                <option value="open-dag">Open Dag</option>
                <option value="presentatie">Presentatie</option>
                <option value="workshop">Workshop</option>
                <option value="proefcollege">Proefcollege</option>
                <option value="beurs">Beurs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Doelgroep</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.audience}
                onChange={(e) => setFilters({...filters, audience: e.target.value})}
              >
                <option value="">Alle doelgroepen</option>
                <option value="scholieren">Scholieren</option>
                <option value="ouders">Ouders</option>
                <option value="vo-professionals">VO-professionals</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Vanaf datum</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.region || filters.studyField || filters.type || filters.date || filters.audience) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Actieve filters:</span>
              {filters.region && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Regio: {getRegionName(filters.region)}
                  <button 
                    onClick={() => setFilters({...filters, region: ''})}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.studyField && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Studiegebied: {filters.studyField}
                  <button 
                    onClick={() => setFilters({...filters, studyField: ''})}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.type && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Type: {filters.type}
                  <button 
                    onClick={() => setFilters({...filters, type: ''})}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.audience && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  Doelgroep: {filters.audience}
                  <button 
                    onClick={() => setFilters({...filters, audience: ''})}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
          <h4 className="text-xl font-semibold text-gray-600 mb-2">Geen activiteiten gevonden</h4>
          <p className="text-gray-500 mb-4">
            Probeer je filters aan te passen om meer resultaten te zien.
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Wis alle filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-800">{activity.title}</h4>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  activity.type === 'open-dag' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'presentatie' ? 'bg-green-100 text-green-800' :
                  activity.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
                  activity.type === 'proefcollege' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{new Date(activity.date).toLocaleDateString('nl-NL')} | {activity.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{activity.university}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{activity.availableSpots} plekken beschikbaar</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{activity.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  {getRegionName(activity.region)}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  {activity.audience}
                </span>
                {activity.registrationRequired && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
                    Aanmelding verplicht
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                  {activity.registrationRequired ? 'Aanmelden' : 'Meer Info'}
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFinder;