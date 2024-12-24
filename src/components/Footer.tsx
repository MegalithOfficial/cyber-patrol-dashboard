import React, { useState } from 'react';
import { Github, Heart, AlertTriangle, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <>
      {/* Footer */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-4">
        <a
          href="https://github.com/MegalithOfficial/cyber-patrol-dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg hover:bg-gray-800/80 transition-colors"
        >
          <Github className="w-5 h-5 text-cyan-400" />
        </a>
        <div className="flex items-center bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg px-4 py-2">
          <span className="text-sm text-cyan-400 mr-2">Made with</span>
          <Heart className="w-4 h-4 text-red-400 animate-pulse" />
        </div>
        <button
          onClick={() => setShowDisclaimer(true)}
          className="flex items-center justify-center w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-amber-900/50 rounded-lg hover:bg-gray-800/80 transition-colors"
        >
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </button>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gray-900/95 border border-amber-900/50 rounded-lg p-6 max-w-lg w-full">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 mr-2" />
              <h2 className="text-lg font-bold text-amber-400">Disclaimer</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                This is a <span className="text-amber-400">fictional project</span> created for demonstration purposes only.
              </p>
              <p>
                It does not connect to or represent any real security systems, law enforcement agencies, or surveillance networks.
                All data shown is randomly generated and simulated.
              </p>
              <p>
                This project is designed to showcase modern web development techniques and create an engaging sci-fi inspired user interface.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 