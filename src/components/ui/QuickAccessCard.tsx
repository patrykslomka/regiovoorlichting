'use client';

import React from 'react';

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const QuickAccessCard = ({ icon, title, description, buttonText, onClick }: QuickAccessCardProps) => (
  <div 
    className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1" 
    onClick={onClick}
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
      {buttonText}
    </button>
  </div>
);

export default QuickAccessCard;