'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  region: string;
  university: string;
  date: string;
  time: string;
  type: string;
  studyField: string;
  audience: string;
  description: string;
  availableSpots: number;
  registrationRequired: boolean;
}

export function ActivityAdmin() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const handleSave = async (activity: Partial<Activity>) => {
    try {
      const url = '/api/activities';
      const method = activity.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });

      if (response.ok) {
        fetchActivities();
        setEditingId(null);
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to save activity:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Weet je zeker dat je deze activiteit wilt verwijderen?')) {
      try {
        const response = await fetch(`/api/activities?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchActivities();
        }
      } catch (error) {
        console.error('Failed to delete activity:', error);
      }
    }
  };

  const ActivityForm = ({ activity, onSave, onCancel }: {
    activity: Partial<Activity>;
    onSave: (activity: Partial<Activity>) => void;
    onCancel: () => void;
  }) => {
    const [localData, setLocalData] = useState(activity);

    return (
      <div className="bg-white p-6 rounded-lg shadow border-2 border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Titel"
            value={localData.title || ''}
            onChange={(e) => setLocalData({ ...localData, title: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <select
            value={localData.region || ''}
            onChange={(e) => setLocalData({ ...localData, region: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecteer regio</option>
            <option value="amsterdam">Amsterdam</option>
            <option value="utrecht">Utrecht</option>
            <option value="eindhoven">Eindhoven</option>
            <option value="rotterdam">Rotterdam</option>
            <option value="groningen">Groningen</option>
            <option value="maastricht">Maastricht</option>
          </select>
          <input
            type="text"
            placeholder="Universiteit"
            value={localData.university || ''}
            onChange={(e) => setLocalData({ ...localData, university: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={localData.date || ''}
            onChange={(e) => setLocalData({ ...localData, date: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Tijd (bv. 10:00 - 16:00)"
            value={localData.time || ''}
            onChange={(e) => setLocalData({ ...localData, time: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <select
            value={localData.type || ''}
            onChange={(e) => setLocalData({ ...localData, type: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecteer type</option>
            <option value="open-dag">Open Dag</option>
            <option value="presentatie">Presentatie</option>
            <option value="workshop">Workshop</option>
            <option value="proefcollege">Proefcollege</option>
            <option value="beurs">Beurs</option>
          </select>
          <select
            value={localData.studyField || ''}
            onChange={(e) => setLocalData({ ...localData, studyField: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecteer studierichting</option>
            <option value="business">Business</option>
            <option value="law">Law</option>
            <option value="engineering">Engineering</option>
            <option value="medicine">Medicine</option>
            <option value="psychology">Psychology</option>
          </select>
          <select
            value={localData.audience || ''}
            onChange={(e) => setLocalData({ ...localData, audience: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecteer doelgroep</option>
            <option value="scholieren">Scholieren</option>
            <option value="ouders">Ouders</option>
            <option value="beide">Beide</option>
          </select>
          <input
            type="number"
            placeholder="Beschikbare plekken"
            value={localData.availableSpots || ''}
            onChange={(e) => setLocalData({ ...localData, availableSpots: parseInt(e.target.value) || 0 })}
            className="border rounded px-3 py-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={localData.registrationRequired || false}
              onChange={(e) => setLocalData({ ...localData, registrationRequired: e.target.checked })}
            />
            Registratie vereist
          </label>
        </div>
        <textarea
          placeholder="Beschrijving"
          value={localData.description || ''}
          onChange={(e) => setLocalData({ ...localData, description: e.target.value })}
          className="border rounded px-3 py-2 w-full mt-4"
          rows={3}
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onSave(localData)}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Save size={16} /> Opslaan
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <X size={16} /> Annuleren
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Activiteit Beheer</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Activiteit Toevoegen
        </button>
      </div>

      {showAddForm && (
        <ActivityForm
          activity={{}}
          onSave={handleSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="grid gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-6 rounded-lg shadow">
            {editingId === activity.id ? (
              <ActivityForm
                activity={activity}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Datum: {activity.date}</span>
                    <span>Tijd: {activity.time}</span>
                    <span>Regio: {activity.region}</span>
                    <span>Plekken: {activity.availableSpots}</span>
                  </div>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>Universiteit: {activity.university}</span>
                    <span>Type: {activity.type}</span>
                    <span>Doelgroep: {activity.audience}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(activity.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}