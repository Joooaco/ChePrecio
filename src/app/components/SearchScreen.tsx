import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Logo } from '@/app/components/Logo';

interface SearchScreenProps {
  onSearch: (query: string) => void;
  onSearchStore: (storeName: string) => void;
}

// Productos sugeridos para búsqueda en tiempo real
const suggestedProducts = [
  'Coca Cola 2.25L',
  'Coca Cola 1.5L',
  'Arroz Gallo Oro 1kg',
  'Arroz Molinos Ala 1kg',
  'Aceite Cocinero 900ml',
  'Aceite Lira 1.5L',
  'Leche La Serenísima 1L',
  'Leche Sancor 1L',
  'Pan Lactal Bimbo',
  'Yerba Mate Playadito 1kg',
  'Yerba Mate Taragüi 1kg',
  'Azúcar Ledesma 1kg',
  'Fideos Matarazzo',
  'Café La Virginia',
  'Dulce de Leche Serenísima',
];

// Comercios sugeridos
const suggestedStores = [
  'Supermercado Central',
  'Almacén Don Pedro',
  'Maxiconsumo',
  'La Esquina',
  'SuperAhorro',
  'Kiosco Pepe',
  'Super Juan',
  'Mercado del Norte',
  'Despensa María',
  'Súper Express',
];

export function SearchScreen({ onSearch, onSearchStore }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{text: string, type: 'product' | 'store'}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Cargar búsquedas recientes al inicio
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches(['Coca Cola', 'Arroz Gallo', 'Aceite Cocinero']);
      }
    } else {
      setRecentSearches(['Coca Cola', 'Arroz Gallo', 'Aceite Cocinero']);
    }
  }, []);

  const saveSearch = (query: string) => {
    const newRecent = [query, ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filteredProducts = suggestedProducts
        .filter(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(text => ({ text, type: 'product' as const }));
      
      const filteredStores = suggestedStores
        .filter(store => store.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(text => ({ text, type: 'store' as const }));
      
      const combined = [...filteredStores, ...filteredProducts].slice(0, 6);
      setSuggestions(combined);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      const matchedStore = suggestedStores.find(
        store => store.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (matchedStore) {
        onSearchStore(matchedStore);
      } else {
        onSearch(searchQuery);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: {text: string, type: 'product' | 'store'}) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    saveSearch(suggestion.text);
    
    if (suggestion.type === 'store') {
      onSearchStore(suggestion.text);
    } else {
      onSearch(suggestion.text);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-slate-950 h-full w-full transition-colors duration-300">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo className="w-64" />
        </div>
        <div className="text-center mb-12">
          <p className="text-gray-600 dark:text-slate-400 font-medium tracking-wide">Comparador de precios</p>
        </div>

        {/* Buscador - Enhanced border and dark mode */}
        <form onSubmit={handleSubmit} className="mb-10 relative">
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 size-5 transition-colors group-focus-within:text-blue-500" />
              <Input
                type="text"
                placeholder="¿Qué buscás hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                className="pl-12 h-16 text-lg rounded-2xl border-2 border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg focus:border-blue-500 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 dark:text-slate-100 dark:placeholder:text-slate-600 transition-all duration-200"
              />
              
              {/* Sugerencias */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-5 py-4 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between border-b last:border-0 border-gray-100 dark:border-slate-800"
                    >
                      <span className="text-gray-800 dark:text-slate-200 font-medium">{suggestion.text}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        suggestion.type === 'store' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {suggestion.type === 'store' ? 'Comercio' : 'Producto'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
              Buscar
            </Button>
          </div>
        </form>

        {/* Info y Recientes */}
        <div className="text-center">
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 font-medium">
              💡 Podés buscar por productos o locales específicos
            </p>
            <div className="flex gap-8 justify-center text-sm text-gray-600 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <span>🛒</span> <strong>Productos</strong>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <span>🏪</span> <strong>Comercios</strong>
              </div>
            </div>
          </div>

          {recentSearches.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <p className="text-[11px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold mb-4">Búsquedas recientes</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(search);
                      onSearch(search);
                    }}
                    className="px-5 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-full text-sm font-medium text-gray-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer shadow-sm active:scale-90"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
