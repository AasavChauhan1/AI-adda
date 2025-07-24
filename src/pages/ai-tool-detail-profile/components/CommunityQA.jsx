import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunityQA = ({ tool }) => {
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Mock Q&A data
  const questions = [
    {
      id: 1,
      question: "How does the API pricing work for high-volume usage?",
      author: "Sarah Chen",
      date: "2 days ago",
      votes: 12,
      answers: [
        {
          id: 1,
          answer: `The API pricing follows a tiered structure:\n\n• First 1,000 requests/month: Free\n• 1,001-10,000 requests: $0.002 per request\n• 10,001-100,000 requests: $0.0015 per request\n• 100,000+ requests: Contact for enterprise pricing\n\nThere's also a monthly subscription option that might be more cost-effective for high-volume users.`,
          author: "Mike Rodriguez",
          date: "1 day ago",
          votes: 8,
          isVerified: true
        },
        {
          id: 2,
          answer: "I've been using it for 6 months with around 50k requests monthly. The pricing is quite reasonable compared to alternatives, and they offer good volume discounts.",author: "Alex Thompson",date: "1 day ago",
          votes: 5,
          isVerified: false
        }
      ]
    },
    {
      id: 2,
      question: "Can this tool integrate with Slack for team workflows?",author: "David Park",date: "5 days ago",
      votes: 8,
      answers: [
        {
          id: 3,
          answer: "Yes! There\'s a native Slack integration available. You can set it up through the integrations panel in your dashboard. It supports slash commands and can post results directly to channels.",
          author: "Jennifer Liu",
          date: "4 days ago",
          votes: 6,
          isVerified: true
        }
      ]
    },
    {
      id: 3,
      question: "What's the difference between the free and paid versions?",author: "Emma Wilson",date: "1 week ago",
      votes: 15,
      answers: [
        {
          id: 4,
          answer: `Here's a breakdown of the key differences:\n\n**Free Version:**\n• 100 requests per month\n• Basic templates\n• Community support\n• Standard processing speed\n\n**Paid Version:**\n• Unlimited requests\n• Premium templates\n• Priority support\n• 3x faster processing\n• Advanced analytics\n• Team collaboration features`,
          author: "Tom Anderson",date: "6 days ago",
          votes: 12,
          isVerified: true
        }
      ]
    }
  ];

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleVote = (type, id) => {
    console.log(`${type} vote for ${id}`);
  };

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      console.log('New question:', newQuestion);
      setNewQuestion('');
      setShowAskQuestion(false);
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'answered':
        return b.answers.length - a.answers.length;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:pr-80">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Community Q&A</h2>
              <p className="text-text-secondary">
                Get answers from the community about {tool.name}
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recent">Most Recent</option>
                <option value="votes">Most Voted</option>
                <option value="answered">Most Answered</option>
              </select>
              <Button
                variant="default"
                onClick={() => setShowAskQuestion(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Ask Question
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {sortedQuestions.map((q) => (
              <div key={q.id} className="bg-surface border border-border rounded-lg p-6">
                {/* Question Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => handleVote('up', q.id)}
                      className="p-1 rounded-md text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Icon name="ChevronUp" size={20} />
                    </button>
                    <span className="text-sm font-medium text-text-primary">{q.votes}</span>
                    <button
                      onClick={() => handleVote('down', q.id)}
                      className="p-1 rounded-md text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
                    >
                      <Icon name="ChevronDown" size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <button
                      onClick={() => toggleQuestion(q.id)}
                      className="text-left w-full group"
                    >
                      <h3 className="text-lg font-medium text-text-primary group-hover:text-primary transition-colors mb-2">
                        {q.question}
                      </h3>
                    </button>
                    
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>Asked by {q.author}</span>
                      <span>{q.date}</span>
                      <span>{q.answers.length} answer{q.answers.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
                  >
                    <Icon
                      name={expandedQuestions.has(q.id) ? "ChevronUp" : "ChevronDown"}
                      size={20}
                    />
                  </button>
                </div>

                {/* Answers */}
                {expandedQuestions.has(q.id) && (
                  <div className="ml-12 space-y-4">
                    {q.answers.map((answer) => (
                      <div key={answer.id} className="bg-muted rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex flex-col items-center space-y-1">
                            <button
                              onClick={() => handleVote('up', answer.id)}
                              className="p-1 rounded-md text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Icon name="ChevronUp" size={16} />
                            </button>
                            <span className="text-xs font-medium text-text-primary">{answer.votes}</span>
                            <button
                              onClick={() => handleVote('down', answer.id)}
                              className="p-1 rounded-md text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
                            >
                              <Icon name="ChevronDown" size={16} />
                            </button>
                          </div>
                          
                          <div className="flex-1">
                            <div className="prose prose-sm max-w-none mb-3">
                              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                                {answer.answer}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-3 text-xs text-text-secondary">
                              <div className="flex items-center space-x-1">
                                <span>{answer.author}</span>
                                {answer.isVerified && (
                                  <Icon name="CheckCircle" size={14} className="text-primary" />
                                )}
                              </div>
                              <span>{answer.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Answer Input */}
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={16} color="white" />
                        </div>
                        <div className="flex-1">
                          <textarea
                            placeholder="Write your answer..."
                            className="w-full p-3 border border-border rounded-md bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm">
                              Post Answer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ask Question Modal */}
          {showAskQuestion && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
              <div className="bg-surface rounded-lg p-6 w-full max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Ask a Question</h3>
                  <button
                    onClick={() => setShowAskQuestion(false)}
                    className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Your Question"
                    type="text"
                    placeholder={`Ask anything about ${tool.name}...`}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    description="Be specific and clear to get the best answers from the community"
                  />
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowAskQuestion(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      onClick={handleAskQuestion}
                      disabled={!newQuestion.trim()}
                      className="flex-1"
                    >
                      Ask Question
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityQA;