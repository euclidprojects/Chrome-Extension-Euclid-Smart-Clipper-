import React, { useState } from 'react';
import {
  Scissors,
  PenTool,
  Youtube,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Pin,
} from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Euclid Smart Clipper',
      subtitle: 'The official web-clipping & research companion for Euclid Smart Notes.',
      icon: <Scissors className="w-8 h-8 text-lime-400" />,
      content: 'Capture articles, webpages, selected text, bookmarks, PDFs, and screenshots with 1-click directly into your Smart Notes notebooks.',
    },
    {
      title: 'Live Webpage & Screenshot Annotations',
      subtitle: 'Highlight, draw, add callouts, or blur sensitive content.',
      icon: <PenTool className="w-8 h-8 text-lime-400" />,
      content: 'Use text highlighters (6 colors), arrows, sticky notes, and shapes. Both flattened images and editable annotation JSON are preserved.',
    },
    {
      title: 'YouTube & Video Note-Taking',
      subtitle: 'Capture timestamped notes, bookmarks, and video frames.',
      icon: <Youtube className="w-8 h-8 text-lime-400" />,
      content: 'Deep integration with YouTube watch pages. Use Alt+N to add timestamped notes and Alt+S to capture frames. Click any timestamp in Smart Notes to jump back to the exact video frame!',
    },
    {
      title: 'Direct Euclid ID Integration',
      subtitle: 'One account across Clipper & Smart Notes Web App.',
      icon: <BookOpen className="w-8 h-8 text-lime-400" />,
      content: 'Your notebooks, folders, and tags stay perfectly in sync with https://notes.app.euclidprojects.org/ using Firebase project euclid-projects.',
    },
  ];

  const current = steps[step];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#16181D] text-white max-w-md w-full rounded-[2rem] p-6 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 p-0.5 shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center">
              <img
                src={typeof chrome !== 'undefined' && chrome?.runtime?.getURL ? chrome.runtime.getURL('icons/icon32.png') : '/icons/icon32.png'}
                alt="Icon"
                className="w-7 h-7"
                onError={(e) => {
                  console.error('[Icon Debug] Failed to load logo in OnboardingModal:', e.currentTarget.src);
                  e.currentTarget.src = '/icons/icon32.png';
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Euclid Smart Clipper</h3>
              <p className="text-[11px] text-indigo-400 font-semibold">Onboarding Guide ({step + 1}/4)</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3 py-2">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto shadow-2xl">
            {current.icon}
          </div>
          <h2 className="font-extrabold text-base text-white">{current.title}</h2>
          <p className="font-semibold text-xs text-indigo-300">{current.subtitle}</p>
          <p className="text-xs text-slate-300 leading-relaxed px-2">{current.content}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? 'w-6 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                onClose();
              }
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-2 transition-all"
          >
            <span>{step === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
