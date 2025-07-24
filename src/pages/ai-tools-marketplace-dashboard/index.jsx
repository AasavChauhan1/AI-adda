import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FilterPanel from '../../components/ui/FilterPanel';
import NavigationTabs from '../../components/ui/NavigationTabs';
import FeaturedCarousel from './components/FeaturedCarousel';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ToolGrid from './components/ToolGrid';
import StatsBar from './components/StatsBar';

const AIToolsMarketplaceDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for AI tools
  const mockTools = [
    {
      id: 1,
      name: "ChatGPT",
      category: "chatbot",
      pricing: "Freemium",
      description: "Advanced conversational AI that can help with writing, coding, analysis, and creative tasks using natural language processing.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 12500,
      views: "2.1M",
      users: "100M+",
      url: "https://chat.openai.com",
      isBookmarked: false,
      isSponsored: true,
      features: ["api", "mobile", "integration"],
      dateAdded: new Date('2023-11-15')
    },
    {
      id: 2,
      name: "Midjourney",
      category: "image",
      pricing: "Paid",
      description: "AI-powered image generation tool that creates stunning artwork and visuals from text descriptions with incredible detail and creativity.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 8900,
      views: "1.8M",
      users: "15M+",
      url: "https://midjourney.com",
      isBookmarked: true,
      isSponsored: false,
      features: ["collaboration", "customization"],
      dateAdded: new Date('2023-10-20')
    },
    {
      id: 3,
      name: "GitHub Copilot",
      category: "code",
      pricing: "Paid",
      description: "AI pair programmer that helps you write code faster with intelligent suggestions and completions directly in your IDE.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 15600,
      views: "950K",
      users: "5M+",
      url: "https://github.com/features/copilot",
      isBookmarked: false,
      isSponsored: false,
      features: ["api", "integration", "opensource"],
      dateAdded: new Date('2023-12-01')
    },
    {
      id: 4,
      name: "Grammarly",
      category: "writing",
      pricing: "Freemium",
      description: "AI writing assistant that helps improve your writing with grammar checking, style suggestions, and tone detection.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 25000,
      views: "3.2M",
      users: "30M+",
      url: "https://grammarly.com",
      isBookmarked: false,
      isSponsored: true,
      features: ["mobile", "integration", "analytics"],
      dateAdded: new Date('2023-09-15')
    },
    {
      id: 5,
      name: "Tableau",
      category: "data",
      pricing: "Paid",
      description: "Powerful data visualization and business intelligence platform that helps you see and understand your data with AI-driven insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 7800,
      views: "1.1M",
      users: "2M+",
      url: "https://tableau.com",
      isBookmarked: true,
      isSponsored: false,
      features: ["analytics", "collaboration", "integration"],
      dateAdded: new Date('2023-11-30')
    },
    {
      id: 6,
      name: "ElevenLabs",
      category: "voice",
      pricing: "Freemium",
      description: "Advanced AI voice synthesis and cloning technology that creates realistic speech from text with emotional expression.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 4200,
      views: "680K",
      users: "1M+",
      url: "https://elevenlabs.io",
      isBookmarked: false,
      isSponsored: false,
      features: ["api", "customization"],
      dateAdded: new Date('2023-10-05')
    },
    {
      id: 7,
      name: "Runway ML",
      category: "video",
      pricing: "Freemium",
      description: "AI-powered video editing and generation platform that enables creators to produce professional content with machine learning tools.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 3500,
      views: "520K",
      users: "800K",
      url: "https://runwayml.com",
      isBookmarked: false,
      isSponsored: false,
      features: ["collaboration", "mobile"],
      dateAdded: new Date('2023-12-10')
    },
    {
      id: 8,
      name: "DeepL",
      category: "translation",
      pricing: "Freemium",
      description: "AI-powered translation service that provides more accurate and natural translations than traditional tools using neural networks.",
      image: "https://images.unsplash.com/photo-1526554850534-7c78330d5f90?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 9200,
      views: "1.4M",
      users: "25M+",
      url: "https://deepl.com",
      isBookmarked: true,
      isSponsored: false,
      features: ["api", "integration"],
      dateAdded: new Date('2023-08-22')
    },
    {
      id: 9,
      name: "Zapier",
      category: "automation",
      pricing: "Freemium",
      description: "Automation platform that connects your apps and services to create workflows, saving time on repetitive tasks with AI assistance.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 18700,
      views: "2.8M",
      users: "5M+",
      url: "https://zapier.com",
      isBookmarked: false,
      isSponsored: true,
      features: ["integration", "analytics", "support"],
      dateAdded: new Date('2023-07-18')
    },
    {
      id: 10,
      name: "Perplexity AI",
      category: "research",
      pricing: "Freemium",
      description: "AI-powered research assistant that provides accurate answers with citations, helping you find and verify information quickly.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 6800,
      views: "890K",
      users: "3M+",
      url: "https://perplexity.ai",
      isBookmarked: false,
      isSponsored: false,
      features: ["api", "mobile"],
      dateAdded: new Date('2023-11-08')
    },
    {
      id: 11,
      name: "Copy.ai",
      category: "writing",
      pricing: "Freemium",
      description: "AI copywriting tool that helps create marketing content, blog posts, and social media copy with various templates and styles.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 5400,
      views: "720K",
      users: "2M+",
      url: "https://copy.ai",
      isBookmarked: false,
      isSponsored: false,
      features: ["collaboration", "customization"],
      dateAdded: new Date('2023-09-30')
    },
    {
      id: 12,
      name: "DALL-E 3",
      category: "image",
      pricing: "Paid",
      description: "OpenAI\'s advanced image generation model that creates highly detailed and accurate images from natural language descriptions.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 11200,
      views: "1.6M",
      users: "8M+",
      url: "https://openai.com/dall-e-3",
      isBookmarked: true,
      isSponsored: false,
      features: ["api", "integration"],
      dateAdded: new Date('2023-12-15')
    }
  ];

  const featuredTools = mockTools.filter(tool => tool.isSponsored);

  // Parse URL parameters for filters
  const parseFiltersFromURL = () => {
    const urlParams = new URLSearchParams(location.search);
    const filters = {
      categories: urlParams.get('categories')?.split(',').filter(Boolean) || [],
      pricing: urlParams.get('pricing')?.split(',').filter(Boolean) || [],
      features: urlParams.get('features')?.split(',').filter(Boolean) || [],
      rating: urlParams.get('rating') || '',
      dateAdded: urlParams.get('dateAdded') || '',
      searchQuery: urlParams.get('q') || ''
    };
    
    return filters;
  };

  // Apply filters and sorting
  const applyFiltersAndSort = (toolsData, filters, sortOrder) => {
    let filtered = [...toolsData];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(tool =>
        filters.categories.includes(tool.category)
      );
    }

    // Apply pricing filter
    if (filters.pricing.length > 0) {
      filtered = filtered.filter(tool =>
        filters.pricing.includes(tool.pricing.toLowerCase())
      );
    }

    // Apply features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(tool =>
        filters.features.some(feature => tool.features.includes(feature))
      );
    }

    // Apply rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(tool => tool.rating >= minRating);
    }

    // Apply date filter
    if (filters.dateAdded) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateAdded) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (filters.dateAdded !== '') {
        filtered = filtered.filter(tool => tool.dateAdded >= filterDate);
      }
    }

    // Apply sorting
    switch (sortOrder) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => {
          const aViews = parseFloat(a.views.replace(/[KM+]/g, '')) * (a.views.includes('M') ? 1000000 : a.views.includes('K') ? 1000 : 1);
          const bViews = parseFloat(b.views.replace(/[KM+]/g, '')) * (b.views.includes('M') ? 1000000 : b.views.includes('K') ? 1000 : 1);
          return bViews - aViews;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.dateAdded - b.dateAdded);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceOrder = { 'free': 0, 'freemium': 1, 'paid': 2 };
          return priceOrder[a.pricing.toLowerCase()] - priceOrder[b.pricing.toLowerCase()];
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceOrder = { 'free': 0, 'freemium': 1, 'paid': 2 };
          return priceOrder[b.pricing.toLowerCase()] - priceOrder[a.pricing.toLowerCase()];
        });
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  // Load initial data
  useEffect(() => {
    const loadTools = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Parse sort parameter from URL
      const urlParams = new URLSearchParams(location.search);
      const sortParam = urlParams.get('sortBy') || 'relevance';
      setSortBy(sortParam);
      
      const filters = parseFiltersFromURL();
      const filtered = applyFiltersAndSort(mockTools, filters, sortParam);
      
      setTools(mockTools);
      setFilteredTools(filtered);
      setLoading(false);
      setCurrentPage(1);
    };

    loadTools();
  }, []); // Empty dependency array to run only once

  // Handle filter changes when URL changes
  useEffect(() => {
    if (tools.length > 0) {
      const urlParams = new URLSearchParams(location.search);
      const sortParam = urlParams.get('sortBy') || 'relevance';
      setSortBy(sortParam);
      
      const filters = parseFiltersFromURL();
      const filtered = applyFiltersAndSort(tools, filters, sortParam);
      setFilteredTools(filtered);
    }
  }, [location.search]); // Only depend on location.search

  // Handle bookmark toggle
  const handleBookmark = useCallback((toolId, isBookmarked) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId ? { ...tool, isBookmarked } : tool
      )
    );
    setFilteredTools(prevFiltered =>
      prevFiltered.map(tool =>
        tool.id === toolId ? { ...tool, isBookmarked } : tool
      )
    );
  }, []);

  // Handle filter removal
  const handleRemoveFilter = useCallback((filterType, filterValue) => {
    const urlParams = new URLSearchParams(location.search);
    
    if (filterType === 'rating' || filterType === 'dateAdded') {
      urlParams.delete(filterType);
    } else {
      const currentValues = urlParams.get(filterType)?.split(',').filter(Boolean) || [];
      const newValues = currentValues.filter(value => value !== filterValue);
      
      if (newValues.length > 0) {
        urlParams.set(filterType, newValues.join(','));
      } else {
        urlParams.delete(filterType);
      }
    }
    
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);

  // Handle clear all filters
  const handleClearAllFilters = useCallback(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('q');
    
    const newParams = new URLSearchParams();
    if (searchQuery) {
      newParams.set('q', searchQuery);
    }
    
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);

  // Handle sort change
  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('sortBy', newSortBy);
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    // Simulate loading more data
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
      // In real app, you would load more data here
      if (currentPage >= 3) {
        setHasMore(false);
      }
    }, 1000);
  }, [currentPage]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Refresh data
    const filters = parseFiltersFromURL();
    const filtered = applyFiltersAndSort(mockTools, filters, sortBy);
    setFilteredTools(filtered);
    setRefreshing(false);
  }, [sortBy]);

  // Get active filters count
  const getActiveFiltersCount = () => {
    const filters = parseFiltersFromURL();
    return (filters.categories?.length || 0) +
           (filters.pricing?.length || 0) +
           (filters.features?.length || 0) +
           (filters.rating ? 1 : 0) +
           (filters.dateAdded ? 1 : 0);
  };

  const activeFilters = parseFiltersFromURL();
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {/* Featured Tools Carousel */}
        <FeaturedCarousel featuredTools={featuredTools} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Discover AI Tools
            </h1>
            <p className="text-text-secondary">
              Explore our comprehensive catalog of AI-powered tools and services
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              iconName="Filter"
              iconPosition="left"
              onClick={() => setIsFilterPanelOpen(true)}
              className="lg:hidden"
            >
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleRefresh}
              loading={refreshing}
              className="hidden sm:flex"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <StatsBar
          totalTools={tools.length}
          filteredTools={filteredTools.length}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Filter Chips */}
        <FilterChips
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterPanel />
          </div>

          {/* Tools Grid */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-secondary">Sort by:</span>
                <SortDropdown value={sortBy} onChange={handleSortChange} />
              </div>
              
              <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Grid3X3" size={16} />
                <span>Grid view</span>
              </div>
            </div>

            {/* Tools Grid */}
            <ToolGrid
              tools={filteredTools}
              loading={loading}
              onBookmark={handleBookmark}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </div>
        </div>

        {/* Mobile Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
        />
      </main>

      <NavigationTabs />
    </div>
  );
};

export default AIToolsMarketplaceDashboard;