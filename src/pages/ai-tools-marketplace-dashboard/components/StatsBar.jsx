import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsBar = ({ totalTools, filteredTools, activeFiltersCount }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border">
      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Database" size={16} />
          <span>
            Showing {filteredTools.toLocaleString()} of {totalTools.toLocaleString()} tools
          </span>
        </div>
        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-1">
            <Icon name="Filter" size={16} />
            <span>{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied</span>
          </div>
        )}
      </div>
      
      <div className="hidden sm:flex items-center space-x-2 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Free</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span>Freemium</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Paid</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;