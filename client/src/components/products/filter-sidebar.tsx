import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterSidebar({ selectedCategory, onCategoryChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: false,
  });

  const categories = ['All', 'Jackets', 'Shirts', 'Jeans', 'Shoes', 'Hoodies', 'Dresses', 'Coats', 'Shorts'];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="w-64 space-y-6">
      {/* Category Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-sm uppercase tracking-wider">Category</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                  selectedCategory === category
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-sm uppercase tracking-wider">Price Range</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map((range) => (
              <label key={range} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <input type="checkbox" className="rounded border-border" />
                {range}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-sm uppercase tracking-wider">Size</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.size ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.size && (
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                className="px-3 py-1.5 text-sm border border-border hover:bg-secondary hover:border-foreground transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}