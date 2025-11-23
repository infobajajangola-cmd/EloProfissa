import React, { useState } from 'react';
import { Button } from './Button';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isSearching: boolean;
  initialQuery?: string;
}

const ANGOLA_LOCATIONS = [
  'Luanda', 'Benguela', 'Huambo', 'Huíla', 'Cabinda', 'Cuanza Sul', 'Namibe', 'Malanje'
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTriggerSearch();
  };

  const handleTriggerSearch = () => {
    const filters: SearchFilters = {
        location: location || undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minRating: minRating > 0 ? minRating : undefined,
        onlyAvailable: onlyAvailable
    };
    onSearch(query, filters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setLocation('');
    setMaxPrice('');
    setMinRating(0);
    setOnlyAvailable(false);
  };

  const activeFiltersCount = [location, maxPrice, minRating > 0, onlyAvailable].filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl relative z-20">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className={`relative flex flex-col md:flex-row items-center bg-white shadow-lg transition-all duration-300 ${showFilters ? 'rounded-t-xl rounded-b-none' : 'rounded-xl'}`}>
          <div className="flex-1 flex items-center w-full">
            <div className="pl-4 text-slate-400 hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full p-4 md:p-5 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400 text-base md:text-lg"
              placeholder="Qual serviço você precisa? Ex: 'Meu AC não gela'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center w-full md:w-auto p-2 gap-2 border-t md:border-t-0 border-slate-100">
            <button 
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showFilters || activeFiltersCount > 0 ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                <span className="hidden md:inline">Filtros</span>
                {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                        {activeFiltersCount}
                    </span>
                )}
            </button>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              className="w-full md:w-auto rounded-lg shadow-md whitespace-nowrap"
              isLoading={isSearching}
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Advanced Filters Dropdown */}
        {showFilters && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-xl border-t border-slate-100 p-6 animate-fade-in z-30">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Localização</label>
                        <select 
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Todas as províncias</option>
                            {ANGOLA_LOCATIONS.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Preço Máximo (Kz/h)</label>
                        <input 
                            type="number" 
                            placeholder="Ex: 20000"
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Avaliação Mínima</label>
                        <div className="flex gap-2">
                            {[3, 4, 4.5].map((rate) => (
                                <button
                                    key={rate}
                                    type="button"
                                    onClick={() => setMinRating(minRating === rate ? 0 : rate)}
                                    className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${minRating === rate ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {rate}+ ★
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="space-y-2 flex flex-col justify-end pb-1">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${onlyAvailable ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}>
                                {onlyAvailable && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                            </div>
                            <input type="checkbox" className="hidden" checked={onlyAvailable} onChange={() => setOnlyAvailable(!onlyAvailable)} />
                            <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">Apenas Disponíveis Agora</span>
                        </label>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                    <button type="button" onClick={clearFilters} className="text-sm text-slate-500 hover:text-red-500 underline">
                        Limpar Filtros
                    </button>
                    <div className="text-xs text-slate-400">
                        A IA irá considerar estes filtros nos resultados.
                    </div>
                </div>
            </div>
        )}
      </form>
    </div>
  );
};