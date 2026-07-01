import React from 'react';
import { ArrowLeft, ChevronRight, Instagram, Facebook, Twitter, Shield, FileText } from 'lucide-react';
import CloverLogo from './CloverLogo';

interface AboutViewProps {
  onBack: () => void;
}

export default function AboutView({ onBack }: AboutViewProps) {
  const links = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/versequest' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/versequest' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/versequest' },
    { name: 'Terms of Service', icon: FileText, url: '#terms' },
    { name: 'Privacy Policy', icon: Shield, url: '#privacy' },
  ];

  return (
    <div className="bg-white min-h-full flex flex-col px-6 py-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          id="btn-about-back"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <span className="font-display font-medium text-lg text-gray-800">About</span>
        <div className="w-10"></div> {/* spacer */}
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-brand-cream border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
            <CloverLogo className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-900 tracking-tight text-center">
            AI Chat & Bible Quiz
          </h1>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-mono">
            Version 1.0.4 (Beta)
          </span>
        </div>

        {/* Story Section */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-lg text-gray-900 mb-3">
            What is Bible Quiz App
          </h2>
          <div className="bg-brand-cream border border-orange-100/50 rounded-2xl p-5 shadow-sm">
            <p className="text-gray-600 text-sm leading-relaxed">
              AI Chat & Bible Quiz is a fun and engaging way to test your knowledge of God's Word—one quiz at a time, along with an interactive theological AI Chaplain study tool. Whether you're learning the basics or diving deeper into Scripture, there's something here for everyone. Challenge yourself, track your progress, earn rewards, and grow in faith daily. Let the Word come alive!
            </p>
          </div>
        </div>

        {/* Find Out More Links */}
        <div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 px-1">
            Find out more here
          </h3>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 shadow-sm">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 hover:bg-gray-100/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{link.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright Footer */}
        <p className="text-center text-xs text-gray-400 mt-12 pb-4 font-medium">
          © 2026 AI Chat & Bible Quiz. All rights reserved.
        </p>
      </div>
    </div>
  );
}
