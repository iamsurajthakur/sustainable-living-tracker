import React from 'react'

const Testimonials = () => {
  const cardsData = [
    {
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Briar Martin',
      handle: '@neilstellar',
      text: 'Tracking my carbon footprint has never been easier! The insights helped me reduce my emissions by 40% in just 3 months.',
    },
    {
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Avery Johnson',
      handle: '@averywrites',
      text: 'The personalized recommendations are spot-on. I love how it suggests simple swaps that actually make a difference.',
    },
    {
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
      name: 'Jordan Lee',
      handle: '@jordantalks',
      text: 'Finally, a sustainability app that gamifies eco-friendly living! The challenges keep me motivated every single day.',
    },
    {
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Maya Chen',
      handle: '@mayagreen',
      text: "Real-time tracking shows exactly how my daily choices impact the planet. It's eye-opening and empowering!",
    },
    {
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'Emma Wilson',
      handle: '@ecoemma',
      text: "The community challenges brought my whole family together. We're now competing to see who can be the most sustainable!",
    },
    {
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      name: 'Ryan Torres',
      handle: '@ryansustain',
      text: 'I saved over $200 on utilities while reducing my waste. This app literally pays for itself while helping the environment.',
    },
    {
      image: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'Sophie Anderson',
      handle: '@sophiesaves',
      text: "The waste reduction tracker opened my eyes to how much I was throwing away. Now I'm practically zero-waste!",
    },
    {
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'Marcus Kim',
      handle: '@marcuseco',
      text: 'Love how the app breaks down complex sustainability concepts into simple, actionable steps anyone can follow.',
    },
    {
      image: 'https://randomuser.me/api/portraits/women/89.jpg',
      name: 'Zara Patel',
      handle: '@zaragreen',
      text: "The monthly challenges are addictive! I've discovered so many sustainable brands and practices I never knew existed.",
    },
    {
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      name: 'Lucas Brown',
      handle: '@lucaseco',
      text: 'Being able to see my progress over time is incredibly motivating. My eco-score has tripled since I started!',
    },
    {
      image: 'https://randomuser.me/api/portraits/women/72.jpg',
      name: 'Aria Martinez',
      handle: '@ariaearth',
      text: 'The app helped me transition to a plant-based diet with recipes and meal planning. My health and the planet thank me!',
    },
    {
      image: 'https://randomuser.me/api/portraits/men/91.jpg',
      name: 'Noah Taylor',
      handle: '@noahsustain',
      text: "I've convinced my entire office to use this app. We've collectively reduced our carbon footprint by tons!",
    },
  ]

  const CreateCard = ({ card }) => (
    <div className="group mt-5 p-4 rounded-lg mx-4 bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 w-72 shrink-0 hover:-translate-y-1">
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full ring-2 ring-zinc-800 group-hover:ring-green-500/50 transition-all duration-300"
          src={card.image}
          alt="User Image"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-white font-medium">{card.name}</p>
            <svg
              className="mt-0.5 fill-green-500 group-hover:scale-110 transition-transform duration-300"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
              />
            </svg>
          </div>
          <span className="text-xs text-zinc-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-zinc-300 group-hover:text-zinc-200 transition-colors duration-300">
        {card.text}
      </p>
    </div>
  )
  return (
    <div
      id="testimonials"
      className="flex mt-15 flex-col items-center my-10 scroll-mt-12 bg-black"
    >
      <div className="flex items-center divide-x divide-zinc-700">
        <div className="flex -space-x-3 pr-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="image"
            className="w-12 h-12 rounded-full border-2 border-zinc-800 hover:border-green-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-1 ring-1 ring-zinc-700"
          />
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="image"
            className="w-12 h-12 rounded-full border-2 border-zinc-800 hover:border-green-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-[2] ring-1 ring-zinc-700"
          />
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="image"
            className="w-12 h-12 rounded-full border-2 border-zinc-800 hover:border-green-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-[3] ring-1 ring-zinc-700"
          />
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="image"
            className="w-12 h-12 rounded-full border-2 border-zinc-800 hover:border-green-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-[4] ring-1 ring-zinc-700"
          />
        </div>
        <div className="pl-3">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FACC15"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FACC15"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FACC15"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FACC15"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FACC15"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
            <p className="text-zinc-300 font-medium ml-2">5.0</p>
          </div>
          <p className="text-sm text-zinc-500">
            Trusted by{' '}
            <span className="font-medium text-zinc-300">100,000+</span> users
          </p>
        </div>
      </div>
      <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-100%); }
            }

            .marquee-inner {
                animation: marqueeScroll 40s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
      </div>
    </div>
  )
}

export default Testimonials
