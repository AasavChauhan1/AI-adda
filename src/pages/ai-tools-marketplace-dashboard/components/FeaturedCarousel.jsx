import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCarousel = ({ featuredTools }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying || featuredTools.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredTools.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredTools.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTools.length) % featuredTools.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTools.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleToolClick = (toolId) => {
    navigate('/ai-tool-detail-profile', { state: { toolId } });
  };

  if (!featuredTools || featuredTools.length === 0) {
    return null;
  }

  const currentTool = featuredTools[currentSlide];

  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden elevated-shadow mb-8">
      <div className="relative h-64 md:h-80">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentTool.image}
            alt={currentTool.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {currentTool.category}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {currentTool.name}
              </h2>
              
              <p className="text-white/90 text-sm md:text-base mb-6 line-clamp-2">
                {currentTool.description}
              </p>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={`${
                        i < Math.floor(currentTool.rating)
                          ? 'text-yellow-400 fill-current' :'text-white/30'
                      }`}
                    />
                  ))}
                  <span className="text-white/90 text-sm ml-2">
                    {currentTool.rating} ({currentTool.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  iconName="ExternalLink"
                  iconPosition="right"
                  onClick={() => window.open(currentTool.url, '_blank')}
                >
                  Try Now
                </Button>
                <Button
                  variant="outline"
                  iconName="Info"
                  iconPosition="left"
                  onClick={() => handleToolClick(currentTool.id)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {featuredTools.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150 micro-interaction"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150 micro-interaction"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {featuredTools.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredTools.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                index === currentSlide
                  ? 'bg-white w-6' :'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;