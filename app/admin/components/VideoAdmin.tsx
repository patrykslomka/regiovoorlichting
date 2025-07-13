'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  description: string;
  uploadDate: string;
  views: number;
  videoUrl: string;
}

export function VideoAdmin() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Video>>({});

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  const handleSave = async (video: Partial<Video>) => {
    try {
      const url = video.id ? '/api/videos' : '/api/videos';
      const method = video.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      });

      if (response.ok) {
        fetchVideos();
        setEditingId(null);
        setShowAddForm(false);
        setFormData({});
      }
    } catch (error) {
      console.error('Failed to save video:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Weet je zeker dat je deze video wilt verwijderen?')) {
      try {
        const response = await fetch(`/api/videos?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchVideos();
        }
      } catch (error) {
        console.error('Failed to delete video:', error);
      }
    }
  };

  const VideoForm = ({ video, onSave, onCancel }: {
    video: Partial<Video>;
    onSave: (video: Partial<Video>) => void;
    onCancel: () => void;
  }) => {
    const [localData, setLocalData] = useState(video);

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
            type="text"
            placeholder="Duur (bv. 12:30)"
            value={localData.duration || ''}
            onChange={(e) => setLocalData({ ...localData, duration: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <select
            value={localData.category || ''}
            onChange={(e) => setLocalData({ ...localData, category: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecteer categorie</option>
            <option value="studiekeuze">Studiekeuze</option>
            <option value="business">Business</option>
            <option value="engineering">Engineering</option>
            <option value="law">Law</option>
            <option value="medicine">Medicine</option>
          </select>
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={localData.thumbnail || ''}
            onChange={(e) => setLocalData({ ...localData, thumbnail: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="url"
            placeholder="Video URL (YouTube embed)"
            value={localData.videoUrl || ''}
            onChange={(e) => setLocalData({ ...localData, videoUrl: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Views"
            value={localData.views || ''}
            onChange={(e) => setLocalData({ ...localData, views: parseInt(e.target.value) || 0 })}
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
        <h2 className="text-2xl font-bold text-gray-900">Video Beheer</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Video Toevoegen
        </button>
      </div>

      {showAddForm && (
        <VideoForm
          video={{}}
          onSave={handleSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="grid gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white p-6 rounded-lg shadow">
            {editingId === video.id ? (
              <VideoForm
                video={video}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{video.title}</h3>
                  <p className="text-gray-600 mt-1">{video.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Categorie: {video.category}</span>
                    <span>Duur: {video.duration}</span>
                    <span>Views: {video.views}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(video.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
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