'use client';

import { useState } from 'react';
import Image from 'next/image';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface SessionSetupProps {
  onStart: (level: Level, topic: string) => void;
  isLoading: boolean;
}

const LEVELS: { value: Level; label: string; desc: string }[] = [
  { value: 'A1', label: 'A1', desc: 'Beginner' },
  { value: 'A2', label: 'A2', desc: 'Elementary' },
  { value: 'B1', label: 'B1', desc: 'Intermediate' },
  { value: 'B2', label: 'B2', desc: 'Upper-Int.' },
  { value: 'C1', label: 'C1', desc: 'Advanced' },
  { value: 'C2', label: 'C2', desc: 'Proficient' },
];

export default function SessionSetup({ onStart, isLoading }: SessionSetupProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!selectedLevel) {
      setError('Please select your English level.');
      return;
    }
    if (!topic.trim()) {
      setError('Please enter a topic or type "general".');
      return;
    }
    setError('');
    onStart(selectedLevel, topic.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/lingo-main.png"
            alt="Studio Lingo"
            width={160}
            height={50}
            className="object-contain"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#293142] mb-1">
          English Practice Chat
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Chat with an AI native English speaker
        </p>

        {/* Level Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#293142] mb-3">
            What is your English level?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                onClick={() => setSelectedLevel(lvl.value)}
                disabled={isLoading}
                className={`py-3 px-2 rounded-xl border-2 transition-all duration-200 text-center disabled:cursor-not-allowed ${
                  selectedLevel === lvl.value
                    ? 'border-[#2f9e4d] bg-[#2f9e4d] text-white shadow-md'
                    : 'border-gray-200 text-[#293142] hover:border-[#2f9e4d] hover:bg-green-50'
                }`}
              >
                <div className="font-bold text-base">{lvl.label}</div>
                <div
                  className={`text-xs mt-0.5 ${
                    selectedLevel === lvl.value ? 'text-green-100' : 'text-gray-400'
                  }`}
                >
                  {lvl.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#293142] mb-2">
            What would you like to practice?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleStart()}
            placeholder="e.g. Travel, Work, Food, Technology..."
            disabled={isLoading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-[#293142] placeholder-gray-400 focus:outline-none focus:border-[#2f9e4d] transition-colors disabled:opacity-50 text-[16px]"
          />
          <p className="text-xs text-gray-400 mt-2">
            💡 Type a specific topic, or just write{' '}
            <span className="font-semibold text-[#2f9e4d]">&quot;general&quot;</span> for a
            variety of topics
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="w-full py-4 bg-[#2f9e4d] text-white font-bold text-base rounded-xl hover:bg-[#267a3d] transition-colors duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Starting your session...</span>
            </>
          ) : (
            <span>Start Chatting →</span>
          )}
        </button>
      </div>
    </div>
  );
}
