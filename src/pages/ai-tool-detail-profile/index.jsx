import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationTabs from '../../components/ui/NavigationTabs';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import ToolHero from './components/ToolHero';
import ToolTabs from './components/ToolTabs';
import ActionPanel from './components/ActionPanel';
import CommunityQA from './components/CommunityQA';
import RelatedTools from './components/RelatedTools';

const AIToolDetailProfile = () => {
  const [searchParams] = useSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock tool data
  const mockTool = {
    id: 1,
    name: "ChatGPT",
    shortDescription: "Advanced AI chatbot for conversations, writing, and problem-solving",
    description: `ChatGPT is a state-of-the-art conversational AI developed by OpenAI, built on the GPT (Generative Pre-trained Transformer) architecture. This powerful language model has been trained on diverse internet text to understand and generate human-like responses across a wide range of topics and tasks.

The tool excels at natural language understanding and generation, making it invaluable for content creation, coding assistance, research, education, and creative writing. ChatGPT can engage in contextual conversations, answer questions, help with problem-solving, and assist with various professional and personal tasks.

With its intuitive interface and robust capabilities, ChatGPT has revolutionized how people interact with AI, making advanced language processing accessible to millions of users worldwide. The model continues to evolve with regular updates and improvements, maintaining its position as one of the most versatile AI tools available today.`,
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 2847,
    userCount: 1250000,
    pricing: "Freemium",
    categories: ["Writing & Content", "Chatbots", "Research"],
    dateAdded: "March 2023",
    lastUpdated: "December 2024",
    websiteUrl: "https://chat.openai.com",
    keyFeatures: [
      {
        title: "Natural Conversations",
        description: "Engage in human-like conversations with contextual understanding and memory"
      },
      {
        title: "Code Generation",
        description: "Write, debug, and explain code in multiple programming languages"
      },
      {
        title: "Content Creation",
        description: "Generate articles, essays, creative writing, and marketing content"
      },
      {
        title: "Problem Solving",
        description: "Analyze complex problems and provide step-by-step solutions"
      },
      {
        title: "Language Translation",
        description: "Translate text between multiple languages with high accuracy"
      },
      {
        title: "Research Assistance",
        description: "Help with research, data analysis, and information synthesis"
      }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1675557009230-1e8b2c0b8b1a?w=800&h=600&fit=crop&crop=center"
    ],
    pros: [
      "Exceptional natural language understanding and generation capabilities",
      "Versatile across multiple domains and use cases",
      "Continuously updated with improvements and new features",
      "Large and active community providing support and resources",
      "Free tier available with generous usage limits",
      "Intuitive and user-friendly interface design"
    ],
    cons: [
      "Can occasionally generate inaccurate or outdated information",
      "Limited knowledge cutoff date may affect recent information",
      "Premium features require paid subscription",
      "Response times can vary during peak usage periods",
      "May struggle with highly specialized or niche topics",
      "Requires internet connection for all functionality"
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "2 weeks ago",
        content: "ChatGPT has completely transformed my workflow. As a content writer, I use it daily for brainstorming, research, and editing. The quality of responses is consistently impressive, and it saves me hours of work every week.",
        helpful: 23
      },
      {
        id: 2,
        author: "Michael Chen",
        rating: 4,
        date: "1 month ago",
        content: "Great tool for coding assistance. It helps me debug issues quickly and explains complex concepts clearly. Sometimes the code suggestions need tweaking, but overall it's incredibly valuable for developers.",
        helpful: 18
      },
      {
        id: 3,
        author: "Emily Rodriguez",
        rating: 5,
        date: "3 weeks ago",
        content: "I'm a teacher and use ChatGPT to create lesson plans, quizzes, and educational content. It understands context well and provides age-appropriate materials. The free version is generous enough for my needs.",
        helpful: 15
      }
    ],
    ratingDistribution: {
      5: 1847,
      4: 743,
      3: 189,
      2: 45,
      1: 23
    },
    specifications: {
      modelType: "Large Language Model (LLM)",
      apiAvailable: true,
      platform: "Web, Mobile App, API",
      languages: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "50+ others"],
      dataPrivacy: "OpenAI Privacy Policy",
      license: "Proprietary",
      integrations: ["Slack", "Discord", "Microsoft Teams", "Zapier", "Chrome Extension", "API"],
      supportedTasks: [
        "Text Generation",
        "Question Answering",
        "Code Generation",
        "Translation",
        "Summarization",
        "Creative Writing",
        "Data Analysis",
        "Problem Solving"
      ]
    }
  };

  useEffect(() => {
    // Simulate loading tool data
    const toolId = searchParams.get('id') || '1';
    
    setTimeout(() => {
      setTool(mockTool);
      setLoading(false);
    }, 500);

    // Check if tool is bookmarked
    const bookmarkedTools = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    setIsBookmarked(bookmarkedTools.includes(parseInt(toolId)));
  }, [searchParams]);

  const handleBookmark = () => {
    const toolId = parseInt(searchParams.get('id') || '1');
    const bookmarkedTools = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedTools.filter(id => id !== toolId);
      localStorage.setItem('bookmarkedTools', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      const updatedBookmarks = [...bookmarkedTools, toolId];
      localStorage.setItem('bookmarkedTools', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }
  };

  const handleAddToCollection = (collectionId) => {
    console.log('Adding tool to collection:', collectionId);
    // Implementation for adding to collection
  };

  const handleShare = () => {
    console.log('Share tool');
    // Implementation for sharing
  };

  const handleRequestUpdate = () => {
    console.log('Request update for tool');
    // Implementation for requesting update
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading tool details...</p>
          </div>
        </div>
        <NavigationTabs />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-text-primary text-lg mb-2">Tool not found</p>
            <p className="text-text-secondary">The requested AI tool could not be found.</p>
          </div>
        </div>
        <NavigationTabs />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <BreadcrumbNavigation tool={tool} />
      
      <div className="relative">
        <ToolHero
          tool={tool}
          onBookmark={handleBookmark}
          onAddToCollection={handleAddToCollection}
          onShare={handleShare}
          isBookmarked={isBookmarked}
        />
        
        <div className="flex">
          <div className="flex-1">
            <ToolTabs tool={tool} />
            <CommunityQA tool={tool} />
            <RelatedTools currentTool={tool} />
          </div>
          
          <ActionPanel
            tool={tool}
            isBookmarked={isBookmarked}
            onBookmark={handleBookmark}
            onAddToCollection={handleAddToCollection}
            onShare={handleShare}
            onRequestUpdate={handleRequestUpdate}
          />
        </div>
      </div>
      
      <NavigationTabs />
      
      {/* Mobile bottom padding to account for sticky actions */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default AIToolDetailProfile;