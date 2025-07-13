'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
  time: string;
  organizer: string;
  registrationUrl: string;
  capacity: number;
}

export function EventAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleSave = async (event: Partial<Event>) => {
    try {
      const url = '/api/events';
      const method = event.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        fetchEvents();
        setEditingId(null);
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Weet je zeker dat je dit evenement wilt verwijderen?')) {
      try {
        const response = await fetch(`/api/events?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchEvents();
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const EventForm = ({ event, onSave, onCancel }: {
    event: Partial<Event>;
    onSave: (event: Partial<Event>) => void;
    onCancel: () => void;
  }) => {
    const [localData, setLocalData] = useState(event);

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
          <input
            type="date"
            value={localData.date || ''}
            onChange={(e) => setLocalData({ ...localData, date: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Locatie"
            value={localData.location || ''}
            onChange={(e) => setLocalData({ ...localData, location: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <select
            value={localData.type || ''}
            onChange={(e) => setLocalData({ ...localData, type: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecteer type</option>
            <option value="studiedag">Studiedag</option>
            <option value="ouderavond">Ouderavond</option>
            <option value="beurs">Beurs</option>
            <option value="masterclass">Masterclass</option>
            <option value="informatiesessie">Informatiesessie</option>
          </select>
          <input
            type="text"
            placeholder="Tijd (bv. 09:00 - 17:00)"
            value={localData.time || ''}
            onChange={(e) => setLocalData({ ...localData, time: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Organisator"
            value={localData.organizer || ''}
            onChange={(e) => setLocalData({ ...localData, organizer: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="url"
            placeholder="Registratie URL"
            value={localData.registrationUrl || ''}
            onChange={(e) => setLocalData({ ...localData, registrationUrl: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Capaciteit"
            value={localData.capacity || ''}
            onChange={(e) => setLocalData({ ...localData, capacity: parseInt(e.target.value) || 0 })}
            className="border rounded px-3 py-2"
          />
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
        <h2 className="text-2xl font-bold text-gray-900">Evenement Beheer</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Evenement Toevoegen
        </button>
      </div>

      {showAddForm && (
        <EventForm
          event={{}}
          onSave={handleSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow">
            {editingId === event.id ? (
              <EventForm
                event={event}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Datum: {event.date}</span>
                    <span>Tijd: {event.time}</span>
                    <span>Locatie: {event.location}</span>
                    <span>Capaciteit: {event.capacity}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(event.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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