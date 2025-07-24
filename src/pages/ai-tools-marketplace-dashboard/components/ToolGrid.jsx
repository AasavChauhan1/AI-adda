import React from 'react';
import ToolCard from './ToolCard';

const ToolGrid = ({ tools, loading, onBookmark, onLoadMore, hasMore }) => {
  if (loading && tools.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="flex justify-between">
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No tools found</h3>
        <p className="text-text-secondary">Try adjusting your filters or search terms to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onBookmark={onBookmark}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {loading && tools.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-muted"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load more button */}
      {hasMore && !loading && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150 font-medium"
          >
            Load More Tools
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolGrid;