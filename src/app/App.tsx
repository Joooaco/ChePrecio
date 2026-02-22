import { useState, useEffect } from 'react';
import { SearchScreen } from '@/app/components/SearchScreen';
import { ResultsScreen } from '@/app/components/ResultsScreen';
import { StoreDetail } from '@/app/components/StoreDetail';
import { Footer } from '@/app/components/Footer';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

type Screen = 'search' | 'results' | 'store-detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('search');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [searchedProduct, setSearchedProduct] = useState('');
  const [selectedStore, setSelectedStore] = useState<{
    id: number;
    name: string;
    address: string;
  } | null>(null);
  const [cameFromResults, setCameFromResults] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSearch = (query: string) => {
    setSearchedProduct(query);
    setCurrentScreen('results');
    setCameFromResults(false);
  };

  const handleSearchStore = (storeName: string) => {
    // Mapear nombre del comercio a datos
    const storeMap: Record<string, { id: number; address: string }> = {
      'Supermercado Central': { id: 1, address: 'Av. Libertador 1234' },
      'Almacén Don Pedro': { id: 2, address: 'Calle San Martín 567' },
      'Maxiconsumo': { id: 3, address: 'Av. Rivadavia 2890' },
      'La Esquina': { id: 4, address: 'Calle Belgrano 123' },
      'SuperAhorro': { id: 5, address: 'Av. Corrientes 3456' },
      'Kiosco Pepe': { id: 6, address: 'Calle Moreno 789' },
      'Super Juan': { id: 7, address: 'Av. Santa Fe 5678' },
      'Mercado del Norte': { id: 8, address: 'Av. Cabildo 3210' },
      'Despensa María': { id: 9, address: 'Calle Alsina 456' },
      'Súper Express': { id: 10, address: 'Av. Córdoba 1234' },
    };

    const storeData = storeMap[storeName];
    if (storeData) {
      setSelectedStore({
        id: storeData.id,
        name: storeName,
        address: storeData.address,
      });
      setCameFromResults(false);
      setCurrentScreen('store-detail');
    } else {
      // Si no encuentra el comercio exacto, tratamos la búsqueda como un producto
      // para que aparezca la pantalla de "no encontrado" si corresponde
      handleSearch(storeName);
    }
  };

  const handleBackToSearch = () => {
    setCurrentScreen('search');
    setCameFromResults(false);
  };

  const handleViewStore = (storeId: number, storeName: string, address: string) => {
    setSelectedStore({ id: storeId, name: storeName, address });
    setCameFromResults(true);
    setCurrentScreen('store-detail');
  };

  const handleBackFromStoreDetail = () => {
    if (cameFromResults) {
      setCurrentScreen('results');
    } else {
      setCurrentScreen('search');
    }
  };

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-slate-950 transition-colors duration-300`}>
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-sm"
        >
          {isDarkMode ? <Sun className="size-5 text-yellow-500" /> : <Moon className="size-5 text-slate-700" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'search' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <SearchScreen onSearch={handleSearch} onSearchStore={handleSearchStore} />
            </div>
          </div>
        )}
        {currentScreen === 'results' && (
          <ResultsScreen 
            productName={searchedProduct} 
            onBack={handleBackToSearch}
            onViewStore={handleViewStore}
            onSearchAgain={handleSearch}
          />
        )}
        {currentScreen === 'store-detail' && selectedStore && (
          <StoreDetail
            storeId={selectedStore.id}
            storeName={selectedStore.name}
            address={selectedStore.address}
            schedule="Lun a Sáb: 8:00 - 21:00"
            onBack={handleBackFromStoreDetail}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

