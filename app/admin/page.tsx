'use client';

import { useState, useEffect } from 'react';
import { VideoAdmin } from './components/VideoAdmin';
import { EventAdmin } from './components/EventAdmin';
import { ActivityAdmin } from './components/ActivityAdmin';
import { AuthGuard } from './components/AuthGuard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');

  if (!isAuthenticated) {
    return <AuthGuard onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: 'videos', label: 'Video\'s', component: VideoAdmin },
    { id: 'events', label: 'Evenementen', component: EventAdmin },
    { id: 'activities', label: 'Activiteiten', component: ActivityAdmin },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || VideoAdmin;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => {
                localStorage.removeItem('adminAuth');
                setIsAuthenticated(false);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Uitloggen
            </button>
          </div>
          
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent />
      </div>
    </div>
  );
}