import React from 'react'

export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-green-950 to-gray-900">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="w-24 h-24 border-4 border-transparent border-t-green-400 border-r-green-400 rounded-full"></div>
        </div>

        {/* Middle rotating ring */}
        <div className="absolute inset-0 animate-spin-reverse">
          <div className="w-24 h-24 border-4 border-transparent border-b-green-500 border-l-green-500 rounded-full opacity-60"></div>
        </div>

        {/* Center leaf icon */}
        <div className="relative w-24 h-24 flex items-center justify-center animate-pulse">
          <img src="/logo.png" alt="logo" className="h-11 w-auto" />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 w-24 h-24 bg-green-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
