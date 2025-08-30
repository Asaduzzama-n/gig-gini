'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearAll: () => void;
  resultCount?: number;
  showResultCount?: boolean;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearAll,
  resultCount,
  showResultCount = false,
  className = ''
}: CategoryFilterProps) {
  return (
    <div className={`bg-white rounded-lg p-6  ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleCategory(category)}
                className={`transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#FC5602] hover:bg-[#e54d02] text-white border-[#FC5602]'
                    : 'text-gray-700 hover:text-[#FC5602] hover:border-[#FC5602] border-gray-300'
                }`}
              >
                {category}
                {isSelected && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Button>
            );
          })}
        </div>
        {showResultCount && selectedCategories.length > 0 && resultCount !== undefined && (
          <p className="text-sm text-gray-600">
            Showing {resultCount} result{resultCount !== 1 ? 's' : ''} for: {selectedCategories.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}