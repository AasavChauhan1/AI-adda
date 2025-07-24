import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import ToolCard from './ToolCard';
import ComparisonModal from './ComparisonModal';

const SearchResults = ({ viewMode, onViewModeChange }) => {
  const location = useLocation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTools, setSelectedTools] = useState([]);
  const [compareTools, setCompareTools] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [savedSearches, setSavedSearches] = useState([]);

  const itemsPerPage = viewMode === 'grid' ? 12 : 10;

  // Mock tools data
  const mockTools = [
    {
      id: 1,
      name: "ChatGPT",
      description: "Advanced conversational AI that can help with writing, coding, analysis, and creative tasks. Built by OpenAI with state-of-the-art language understanding.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 12543,
      userCount: 2500000,
      pricing: "freemium",
      categories: ["Writing", "Code", "Analysis"],
      website: "https://chat.openai.com",
      isVerified: true,
      isNew: false,
      lastUpdated: "2 days ago",
      modelType: "llm",
      taskTypes: ["generation", "analysis"],
      integrations: ["api", "chrome"],
      licensing: "commercial"
    },
    {
      id: 2,
      name: "Midjourney",
      description: "AI-powered image generation tool that creates stunning artwork from text descriptions. Perfect for artists, designers, and creative professionals.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 8932,
      userCount: 1200000,
      pricing: "paid",
      categories: ["Image", "Creative"],
      website: "https://midjourney.com",
      isVerified: true,
      isNew: false,
      lastUpdated: "1 week ago",
      modelType: "vision",
      taskTypes: ["generation"],
      integrations: ["discord"],
      licensing: "commercial"
    },
    {
      id: 3,
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write code faster and with fewer errors. Trained on billions of lines of code to provide intelligent suggestions.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 15678,
      userCount: 3000000,
      pricing: "paid",
      categories: ["Code", "Development"],
      website: "https://github.com/features/copilot",
      isVerified: true,
      isNew: false,
      lastUpdated: "3 days ago",
      modelType: "llm",
      taskTypes: ["generation", "analysis"],
      integrations: ["api", "vscode"],
      licensing: "commercial"
    },
    {
      id: 4,
      name: "Grammarly",
      description: "AI writing assistant that helps improve your writing with grammar checking, style suggestions, and tone detection across all platforms.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 23456,
      userCount: 5000000,
      pricing: "freemium",
      categories: ["Writing", "Productivity"],
      website: "https://grammarly.com",
      isVerified: true,
      isNew: false,
      lastUpdated: "1 day ago",
      modelType: "nlp",
      taskTypes: ["analysis", "correction"],
      integrations: ["chrome", "office"],
      licensing: "commercial"
    },
    {
      id: 5,
      name: "Stable Diffusion",
      description: "Open-source AI image generator that creates high-quality images from text prompts. Free to use and highly customizable for developers.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 6789,
      userCount: 800000,
      pricing: "free",
      categories: ["Image", "Open Source"],
      website: "https://stability.ai",
      isVerified: true,
      isNew: false,
      lastUpdated: "5 days ago",
      modelType: "vision",
      taskTypes: ["generation"],
      integrations: ["api", "python"],
      licensing: "opensource"
    },
    {
      id: 6,
      name: "Jasper AI",
      description: "AI content creation platform for marketing teams. Generate blog posts, social media content, and marketing copy with brand voice consistency.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 4567,
      userCount: 450000,
      pricing: "paid",
      categories: ["Writing", "Marketing"],
      website: "https://jasper.ai",
      isVerified: true,
      isNew: false,
      lastUpdated: "1 week ago",
      modelType: "llm",
      taskTypes: ["generation"],
      integrations: ["api", "zapier"],
      licensing: "commercial"
    },
    {
      id: 7,
      name: "Whisper AI",
      description: "OpenAI\'s speech recognition system that can transcribe and translate audio in multiple languages with high accuracy.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 3421,
      userCount: 600000,
      pricing: "free",
      categories: ["Audio", "Transcription"],
      website: "https://openai.com/research/whisper",
      isVerified: true,
      isNew: true,
      lastUpdated: "2 weeks ago",
      modelType: "audio",
      taskTypes: ["transcription", "translation"],
      integrations: ["api", "python"],
      licensing: "opensource"
    },
    {
      id: 8,
      name: "Claude",
      description: "Anthropic's AI assistant focused on being helpful, harmless, and honest. Great for analysis, writing, and complex reasoning tasks.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 5432,
      userCount: 750000,
      pricing: "freemium",
      categories: ["Analysis", "Writing"],
      website: "https://claude.ai",
      isVerified: true,
      isNew: true,
      lastUpdated: "4 days ago",
      modelType: "llm",
      taskTypes: ["analysis", "generation"],
      integrations: ["api"],
      licensing: "commercial"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call with filters
    setTimeout(() => {
      const filteredTools = filterTools(mockTools);
      setTools(filteredTools);
      setTotalResults(filteredTools.length);
      setLoading(false);
    }, 500);
  }, [location.search]);

  const filterTools = (allTools) => {
    const urlParams = new URLSearchParams(location.search);
    let filtered = [...allTools];

    // Search query
    const query = urlParams.get('q');
    if (query) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Categories
    const categories = urlParams.get('categories');
    if (categories) {
      const categoryList = categories.split(',');
      filtered = filtered.filter(tool =>
        tool.categories.some(cat => categoryList.includes(cat.toLowerCase()))
      );
    }

    // Pricing
    const pricing = urlParams.get('pricing');
    if (pricing) {
      const pricingList = pricing.split(',');
      filtered = filtered.filter(tool => pricingList.includes(tool.pricing));
    }

    // Rating
    const minRating = urlParams.get('rating');
    if (minRating) {
      filtered = filtered.filter(tool => tool.rating >= parseFloat(minRating));
    }

    // Sort
    const sortBy = urlParams.get('sortBy') || 'relevance';
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.userCount - a.userCount);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  const handleToolSelect = (toolId) => {
    setSelectedTools(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleCompareToggle = (toolId) => {
    setCompareTools(prev => {
      const newCompareTools = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId].slice(0, 3); // Max 3 tools for comparison
      
      if (newCompareTools.length >= 2) {
        setShowComparison(true);
      }
      
      return newCompareTools;
    });
  };

  const handleSelectAll = () => {
    const currentPageTools = getCurrentPageTools().map(tool => tool.id);
    const allSelected = currentPageTools.every(id => selectedTools.includes(id));
    
    if (allSelected) {
      setSelectedTools(prev => prev.filter(id => !currentPageTools.includes(id)));
    } else {
      setSelectedTools(prev => [...new Set([...prev, ...currentPageTools])]);
    }
  };

  const getCurrentPageTools = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tools.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(tools.length / itemsPerPage);

  const handleSaveSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    const searchName = searchParams.get('q') || 'Custom Search';
    const newSearch = {
      id: Date.now(),
      name: searchName,
      url: location.search,
      resultCount: totalResults,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  };

  const viewModeOptions = [
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' }
  ];

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-text-primary">
            {totalResults.toLocaleString()} AI Tools Found
          </h2>
          {selectedTools.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedTools.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTools([])}
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveSearch}
            iconName="Bookmark"
            iconPosition="left"
          >
            Save Search
          </Button>
          
          <Select
            options={viewModeOptions}
            value={viewMode}
            onChange={onViewModeChange}
            className="w-32"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {tools.length > 0 && (
        <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={getCurrentPageTools().every(tool => selectedTools.includes(tool.id))}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary">
              Select all on this page
            </span>
          </div>

          {compareTools.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(true)}
              iconName="GitCompare"
              iconPosition="left"
            >
              Compare ({compareTools.length})
            </Button>
          )}
        </div>
      )}

      {/* Results Grid/List */}
      {tools.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No tools found</h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search criteria or filters to find more results.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/advanced-search-and-filtering'}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <>
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :"space-y-4"
          }>
            {getCurrentPageTools().map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                viewMode={viewMode}
                isSelected={selectedTools.includes(tool.id)}
                onSelect={handleToolSelect}
                onCompare={handleCompareToggle}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-text-secondary">...</span>
                    <Button
                      variant={currentPage === totalPages ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Comparison Modal */}
      {showComparison && compareTools.length >= 2 && (
        <ComparisonModal
          tools={tools.filter(tool => compareTools.includes(tool.id))}
          onClose={() => setShowComparison(false)}
          onRemoveTool={(toolId) => {
            setCompareTools(prev => prev.filter(id => id !== toolId));
            if (compareTools.length <= 2) {
              setShowComparison(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default SearchResults;