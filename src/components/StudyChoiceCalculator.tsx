'use client';

import React, { useState } from 'react';

interface FormData {
  schoolYear: string;
  interests: string[];
  location: string;
  timeline: string;
  maxDistance: number;
  preparation: string;
  activities: string[];
}

const StudyChoiceCalculator = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    schoolYear: '',
    interests: [],
    location: '',
    timeline: '',
    maxDistance: 50,
    preparation: '',
    activities: []
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Generate personalized recommendations
    alert('Persoonlijke aanbevelingen gegenereerd! (Dit zou naar een resultaten pagina gaan)');
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, interests: [...formData.interests, interest]});
    } else {
      setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, activities: [...formData.activities, activity]});
    } else {
      setFormData({...formData, activities: formData.activities.filter(a => a !== activity)});
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Studiekeuze Calculator</h3>
            <span className="text-sm text-gray-500">Stap {step} van 3</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Persoonlijke Informatie</h4>
            
            <div>
              <label className="block text-sm font-medium mb-2">Huidige schooljaar</label>
              <select 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.schoolYear}
                onChange={(e) => setFormData({...formData, schoolYear: e.target.value})}
              >
                <option value="">Selecteer je schooljaar</option>
                <option value="havo4">HAVO 4</option>
                <option value="havo5">HAVO 5</option>
                <option value="vwo4">VWO 4</option>
                <option value="vwo5">VWO 5</option>
                <option value="vwo6">VWO 6</option>
                <option value="mbo4">MBO 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Studieinteresses (meerdere mogelijk)</label>
              <div className="grid grid-cols-2 gap-2">
                {['Business', 'Economie', 'Recht', 'Techniek', 'Geneeskunde', 'Psychologie', 'Kunst', 'Taal & Cultuur'].map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Postcode (voor regionale aanbevelingen)</label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1234AB"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Voorkeuren</h4>
            
            <div>
              <label className="block text-sm font-medium mb-2">Wanneer wil je beginnen met studeren?</label>
              <div className="space-y-2">
                {['September 2024', 'September 2025', 'September 2026', 'Nog niet zeker'].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="timeline"
                      value={option}
                      checked={formData.timeline === option}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Hoe ver wil je reizen voor voorlichtingsactiviteiten? ({formData.maxDistance} km)
              </label>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="10"
                value={formData.maxDistance}
                className="w-full"
                onChange={(e) => setFormData({...formData, maxDistance: parseInt(e.target.value)})}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>10 km</span>
                <span>200 km</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Wat voor activiteiten interesseren je? (meerdere mogelijk)</label>
              <div className="space-y-2">
                {['Open dagen', 'Informatiesessies', 'Proefcolleges', 'Workshops', 'Campus tours', 'Online webinars'].map((activity) => (
                  <label key={activity} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={formData.activities.includes(activity)}
                      onChange={(e) => handleActivityChange(activity, e.target.checked)}
                    />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Huidige Voorbereiding</h4>
            
            <div>
              <label className="block text-sm font-medium mb-2">Hoe goed voel je je voorbereid op je studiekeuze?</label>
              <div className="space-y-2">
                {['Nog niet begonnen', 'Een beetje geïnformeerd', 'Redelijk voorbereid', 'Goed voorbereid', 'Heel goed voorbereid'].map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="preparation"
                      value={level}
                      checked={formData.preparation === level}
                      onChange={(e) => setFormData({...formData, preparation: e.target.value})}
                    />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Wat heb je al gedaan? (meerdere mogelijk)</label>
              <div className="space-y-2">
                {['Open dagen bezocht', 'Online informatie bekeken', 'Met studieadviseur gesproken', 'Proefcolleges gevolgd', 'Studenten gesproken'].map((activity) => (
                  <label key={activity} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preview of selections */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Jouw selecties:</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Schooljaar:</strong> {formData.schoolYear || 'Niet ingevuld'}</p>
                <p><strong>Interesses:</strong> {formData.interests.join(', ') || 'Geen geselecteerd'}</p>
                <p><strong>Postcode:</strong> {formData.location || 'Niet ingevuld'}</p>
                <p><strong>Start studie:</strong> {formData.timeline || 'Niet geselecteerd'}</p>
                <p><strong>Reisafstand:</strong> {formData.maxDistance} km</p>
                <p><strong>Voorbereiding:</strong> {formData.preparation || 'Niet geselecteerd'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 text-gray-600 disabled:opacity-50 hover:text-gray-800 transition-colors"
          >
            Vorige
          </button>
          
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volgende
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Krijg Aanbevelingen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyChoiceCalculator;