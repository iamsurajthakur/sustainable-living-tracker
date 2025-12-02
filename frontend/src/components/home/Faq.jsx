import React from 'react'

const Faq = () => {
  const [openIndex, setOpenIndex] = React.useState(null)

  const faqs = [
    {
      question: 'How does the carbon footprint tracker work?',
      answer:
        'Our tracker monitors your daily activities including transportation, energy usage, and consumption habits. It calculates your environmental impact in real-time and provides personalized insights to help you reduce your carbon footprint.',
    },
    {
      question: 'Can I set custom sustainability goals?',
      answer:
        'Yes! You can set personalized goals based on your lifestyle. Whether you want to reduce waste, lower energy consumption, or transition to eco-friendly products, our app helps you track progress and celebrate milestones.',
    },
    {
      question: 'How do the community challenges work?',
      answer:
        'Join weekly and monthly challenges with other users! Complete sustainable actions, earn points, and climb the leaderboard. Challenges range from plastic-free weeks to energy-saving initiatives, making sustainability fun and engaging.',
    },
    {
      question: 'Is my data private and secure?',
      answer:
        'Absolutely. We use industry-standard encryption to protect your data. Your personal information and tracking data are never shared with third parties without your explicit consent. You have full control over your privacy settings.',
    },
    {
      question: 'What kind of rewards can I earn?',
      answer:
        'Earn eco-points for completing challenges and maintaining sustainable habits. Redeem points for discounts at partner eco-friendly brands, plant trees through our partnerships, or unlock premium features in the app.',
    },
  ]

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <div className="bg-black py-16 px-4">
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Got questions about sustainable living? We've got answers. Learn how
            our platform helps you make a positive impact on the planet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8">
          <div className="w-full md:w-auto md:flex-shrink-0 flex justify-center">
            <img
              className="max-w-sm w-full rounded-xl mt-5 h-auto border border-zinc-800 shadow-xl shadow-green-500/10"
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=830&h=844&auto=format&fit=crop"
              alt="Sustainable living"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Looking for answers?
            </h3>
            <p className="text-sm text-zinc-400 mt-2 pb-6">
              Discover how our sustainable living tracker empowers you to make
              eco-friendly choices and reduce your environmental impact.
            </p>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  className="border border-zinc-800 rounded-lg bg-zinc-900/50 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
                  key={index}
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer group"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <h4 className="text-base font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                      {faq.question}
                    </h4>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${openIndex === index ? 'rotate-180' : ''} transition-all duration-500 ease-in-out flex-shrink-0 ml-4`}
                    >
                      <path
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="#22c55e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={`px-4 transition-all duration-500 ease-in-out ${
                      openIndex === index
                        ? 'opacity-100 max-h-[300px] pb-4'
                        : 'opacity-0 max-h-0'
                    }`}
                  >
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq
