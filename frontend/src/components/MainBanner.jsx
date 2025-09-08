import React, { useEffect, useState, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: assets.banner1,
    heading: 'Everything You Need, In One Place',
    subheading: "From groceries to gadgets — delivered fast.",
    description: "Get the best deals on fresh groceries delivered at your doorstep. Affordable, fast, and farm-fresh.",
    bgGradient: 'from-blue-600/20 to-purple-600/20',
    textColor: 'text-white',
    overlayColor: 'bg-black/40'
  },
  {
    id: 2,
    image: assets.banner2,
    heading: 'Deals That Make You Smile',
    subheading: 'Unbeatable prices on your favorite brands.',
    description: "Discover amazing discounts and offers on premium products. Quality meets affordability.",
    bgGradient: 'from-green-600/20 to-blue-600/20',
    textColor: 'text-white',
    overlayColor: 'bg-black/35'
  },
  {
    id: 3,
    image: assets.banner3,
    heading: 'Shop Smart, Live Better',
    subheading: 'Convenience, savings, and trusted quality.',
    description: "Experience seamless shopping with our user-friendly platform and reliable delivery service.",
    bgGradient: 'from-orange-600/20 to-red-600/20',
    textColor: 'text-white',
    overlayColor: 'bg-black/30'
  },
  {
    id: 4,
    image: assets.banner4,
    heading: 'Fast Delivery, Big Savings',
    subheading: 'Why wait? Get what you love—quicker & cheaper.',
    description: "Lightning-fast delivery combined with incredible savings. Your satisfaction is our priority.",
    bgGradient: 'from-purple-600/20 to-pink-600/20',
    textColor: 'text-white',
    overlayColor: 'bg-black/45'
  },
  {
    id: 5,
    image: assets.banner5,
    heading: 'India\'s Trusted Online Store',
    subheading: 'Millions of happy customers. You\'re next.',
    description: "Join millions of satisfied customers who trust us for their daily shopping needs.",
    bgGradient: 'from-indigo-600/20 to-cyan-600/20',
    textColor: 'text-white',
    overlayColor: 'bg-black/50'
  },
];

const MainBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play with hover pause and better control
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Increased to 5 seconds for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false); // Pause auto-play during touch
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div
      className="relative w-full overflow-hidden h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Pattern - Removed blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-transparent to-gray-900/5 z-0"></div>

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={slides[currentSlide].image}
            alt={`slide-${slides[currentSlide].id}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Dynamic Overlay - Removed backdrop-blur */}
          <div className={`absolute inset-0 ${slides[currentSlide].overlayColor}`}></div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgGradient}`}></div>

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
              <div className="max-w-5xl">
                {/* Banner Text with Improved Responsive Typography */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`${slides[currentSlide].textColor} space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6`}
                >
                  {/* Main Heading - Better responsive scaling */}
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight tracking-tight"
                  >
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
                      {slides[currentSlide].heading}
                    </span>
                    <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                      {slides[currentSlide].subheading}
                    </span>
                  </motion.h1>

                  {/* Description - Better responsive text */}
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl leading-relaxed opacity-95 font-medium"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* CTA Buttons - Improved responsive layout */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pt-3 sm:pt-4 md:pt-6"
                  >
                    <Link
                      to="/products"
                      className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-primary hover:bg-primary-dull transition-all duration-300 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
                    >
                      Shop Now
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>

                    <Link
                      to="/products"
                      className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg border border-white/30 hover:border-white/50 w-full sm:w-auto min-w-[140px] sm:min-w-[180px]"
                    >
                      Explore Categories
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  </motion.div>

                  {/* Features - Better responsive spacing */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-3 sm:pt-4 md:pt-6 lg:pt-8"
                  >
                    <div className="flex items-center gap-1 sm:gap-2 text-white/90">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-white/90">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-white/90">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">Secure Payment</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Improved positioning and responsiveness */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 flex items-center justify-center group"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators - Better responsive design */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-primary w-4 sm:w-5 md:w-6 lg:w-8 shadow-lg'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar - Improved visibility */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 flex items-center justify-center group"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m-3 7.5A9.5 9.5 0 1121.5 12 9.5 9.5 0 0112 2.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
