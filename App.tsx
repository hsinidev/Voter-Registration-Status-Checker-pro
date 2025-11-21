import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import RegistrationCheckerUI from './components/RegistrationCheckerUI';
import SeoArticle from './components/SeoArticle';
import { NEXT_ELECTION_DATE } from './constants';

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date(NEXT_ELECTION_DATE) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8 mb-12">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-3 md:p-4 flex flex-col items-center animate-fade-in">
          <span className="text-2xl md:text-4xl font-extrabold text-brand-gold font-mono">{value}</span>
          <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mt-1">{interval}</span>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16 relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6 uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              🇺🇸 Official 2023-2024 Guide
            </div>
            
            {/* SEO Optimized H1 - Primary Keyword Target */}
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                Check Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-red-400">Voter Registration Status</span>
            </h1>
            
            {/* Supporting Subheadline H2 */}
            <h2 className="text-xl md:text-2xl font-semibold text-blue-200 mb-6">
                Are You Ready to Make Your Voice Heard?
            </h2>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                A secure, privacy-first tool to check your eligibility instantly. 
                No data is stored. No tracking. Just the information you need.
            </p>
            
            <div className="mt-8">
                <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-widest">Time Until Election Day 2024</p>
                <CountdownTimer />
            </div>
        </div>
        
        {/* Main Checker Component */}
        <RegistrationCheckerUI />
        
        {/* SEO Article Section */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto text-left">
          <SeoArticle />
        </div>
      </div>
    </Layout>
  );
};

export default App;