import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterSidebar({ 
  fabrics, 
  collections, 
  selectedFabric, 
  setSelectedFabric, 
  selectedCollection, 
  setSelectedCollection,
  onClear 
}) {
  const hasActiveFilters = selectedFabric || selectedCollection;

  return (
    <div className="flex flex-col space-y-8 bg-white p-6 border border-neutral-charcoal/5 rounded shadow-premium">
      <div className="flex justify-between items-center border-b border-neutral-charcoal/10 pb-4">
        <h4 className="text-lg font-serif text-primary flex items-center gap-2">
          <Filter size={18} /> Filters
        </h4>
        {hasActiveFilters && (
          <button 
            onClick={onClear}
            className="text-xs text-primary hover:text-accent font-medium flex items-center gap-1 transition-colors duration-300"
          >
            <RotateCcw size={12} /> Clear
          </button>
        )}
      </div>

      {/* Collection Filters */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/80 mb-3">Collections</h5>
        <div className="space-y-2">
          {collections.map(col => (
            <button
              key={col}
              onClick={() => setSelectedCollection(selectedCollection === col ? '' : col)}
              className={`w-full text-left px-3 py-2 text-sm transition-all duration-300 rounded ${
                selectedCollection === col 
                  ? 'bg-primary-light text-primary font-medium border-l-4 border-accent' 
                  : 'hover:bg-neutral-100 text-neutral-charcoal'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      {/* Fabric Filters */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/80 mb-3">Fabrics</h5>
        <div className="space-y-2">
          {fabrics.map(fab => (
            <button
              key={fab}
              onClick={() => setSelectedFabric(selectedFabric === fab ? '' : fab)}
              className={`w-full text-left px-3 py-2 text-sm transition-all duration-300 rounded ${
                selectedFabric === fab 
                  ? 'bg-primary-light text-primary font-medium border-l-4 border-accent' 
                  : 'hover:bg-neutral-100 text-neutral-charcoal'
              }`}
            >
              {fab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
