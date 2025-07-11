'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, Download, Clock, Eye, Search } from 'lucide-react';
import { videos } from '../data/videos';

interface Video {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const VideoLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories: Category[] = [
    { id: 'all', name: 'Alle Video\'s', count: videos.length },
    { id: 'studiekeuze', name: 'Studiekeuze', count: videos.filter(v => v.category === 'studiekeuze').length },
    { id: 'business', name: 'Business', count: videos.filter(v => v.category === 'business').length },
    { id: 'engineering', name: 'Techniek', count: videos.filter(v => v.category === 'engineering').length },
    { id: 'law', name: 'Recht', count: videos.filter(v => v.category === 'law').length },
    { id: 'medicine', name: 'Geneeskunde', count: videos.filter(v => v.category === 'medicine').length }
  ];

  useEffect(() => {
    let filtered = videos;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredVideos(filtered);
  }, [selectedCategory, searchQuery]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-2xl font-bold mb-4">Video Bibliotheek</h3>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Zoek video's..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} gevonden
          {searchQuery && ` voor "${searchQuery}"`}
        </p>
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <PlayCircle className="w-16 h-16 mx-auto" />
          </div>
          <h4 className="text-xl font-semibold text-gray-600 mb-2">Geen video's gevonden</h4>
          <p className="text-gray-500 mb-4">
            Probeer een andere zoekterm of categorie.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Toon alle video's
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative group cursor-pointer" onClick={() => handleVideoClick(video)}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    video.category === 'studiekeuze' ? 'bg-blue-100 text-blue-800' :
                    video.category === 'business' ? 'bg-green-100 text-green-800' :
                    video.category === 'engineering' ? 'bg-purple-100 text-purple-800' :
                    video.category === 'law' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {video.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold mb-2 line-clamp-2">{video.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{video.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views.toLocaleString()} weergaven</span>
                  </div>
                  <span>{new Date(video.uploadDate).toLocaleDateString('nl-NL')}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVideoClick(video)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Bekijk Video
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
                <button 
                  onClick={closeVideoModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Video Player */}
              <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-white text-center">
                  <PlayCircle className="w-16 h-16 mx-auto mb-2" />
                  <p>Video Player zou hier komen</p>
                  <p className="text-sm text-gray-300">
                    (Integratie met YouTube/Vimeo)
                  </p>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{selectedVideo.views.toLocaleString()} weergaven</span>
                  </div>
                  <span>{new Date(selectedVideo.uploadDate).toLocaleDateString('nl-NL')}</span>
                </div>
                
                <p className="text-gray-700">{selectedVideo.description}</p>
                
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
                    Delen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;