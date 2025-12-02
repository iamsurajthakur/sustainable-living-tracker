import React, { useState, useEffect, useRef } from 'react'

const Features = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the card animations
            featuresData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const featuresData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500 size-8 mt-4"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: 'Track Your Carbon Footprint',
      description:
        'Monitor your daily activities and see their environmental impact in real-time.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500 size-8 mt-4"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Personalized Insights',
      description:
        'Get tailored recommendations to reduce waste and live sustainably.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500 size-8 mt-4"
        >
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      title: 'Eco-friendly Challenges',
      description:
        'Join community challenges and earn rewards for sustainable actions.',
    },
  ]

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        ref={sectionRef}
        id="features"
        className="flex flex-col items-center mt-5 pb-10 scroll-mt-12 bg-black px-4"
      >
        <div className="text-center">
          <p className="text-center font-medium text-green-400 px-10 py-1.5 rounded-full bg-green-950/30 border border-green-900 w-max mx-auto">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-center mx-auto mt-4 text-white">
            Everything You Need to Go Green
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Powerful tools to track, analyze, and improve your environmental
            impact.
          </p>
        </div>

        <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-4 mt-12 px-6 max-w-6xl">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } ${index === 1 ? 'p-px rounded-[13px] bg-gradient-to-br from-green-600 to-emerald-900' : ''}`}
            >
              <div className="p-6 rounded-xl space-y-4 border border-slate-700 bg-slate-950 max-w-80 w-full h-full hover:border-green-900/50 transition-all duration-300 hover:-translate-y-1">
                <div className="group-hover:scale-110 transition-transform duration-300 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 pb-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Features
