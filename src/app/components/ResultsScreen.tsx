import { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, SlidersHorizontal, Map as MapIcon, Store as StoreIcon, Search } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Logo } from '@/app/components/Logo';

interface Store {
  id: number;
  name: string;
  price: number;
  address: string;
  distance: string;
  distanceKm: number;
  hoursAgo: number;
  lat: number;
  lng: number;
}

interface ResultsScreenProps {
  productName: string;
  onBack: () => void;
  onViewStore: (storeId: number, storeName: string, address: string) => void;
  onSearchAgain?: (query: string) => void;
}

export function ResultsScreen({ productName, onBack, onViewStore, onSearchAgain }: ResultsScreenProps) {
  const [sortBy, setSortBy] = useState<'price' | 'distance'>('price');
  const [maxDistance, setMaxDistance] = useState<string>('all');

  // Mock data para demostración
  const stores: Store[] = [
    {
      id: 1,
      name: 'Supermercado Central',
      price: 180.50,
      address: 'Av. Libertador 1234',
      distance: '0.8 km',
      distanceKm: 0.8,
      hoursAgo: 6,
      lat: -34.5875,
      lng: -58.4217,
    },
    {
      id: 2,
      name: 'Almacén Don Pedro',
      price: 175.00,
      address: 'Calle San Martín 567',
      distance: '1.2 km',
      distanceKm: 1.2,
      hoursAgo: 12,
      lat: -34.5885,
      lng: -58.4227,
    },
    {
      id: 3,
      name: 'Maxiconsumo',
      price: 195.99,
      address: 'Av. Rivadavia 2890',
      distance: '2.5 km',
      distanceKm: 2.5,
      hoursAgo: 3,
      lat: -34.5905,
      lng: -58.4247,
    },
    {
      id: 4,
      name: 'La Esquina',
      price: 182.00,
      address: 'Calle Belgrano 123',
      distance: '0.5 km',
      distanceKm: 0.5,
      hoursAgo: 24,
      lat: -34.5865,
      lng: -58.4207,
    },
    {
      id: 5,
      name: 'SuperAhorro',
      price: 188.50,
      address: 'Av. Corrientes 3456',
      distance: '3.1 km',
      distanceKm: 3.1,
      hoursAgo: 8,
      lat: -34.5925,
      lng: -58.4267,
    },
  ];

  // Simulación de búsqueda real: solo mostrar resultados si el producto está en nuestra lista
  const knownProducts = [
    'coca cola', 'arroz', 'aceite', 'leche', 'pan lactal', 'yerba mate', 'azúcar', 'fideos', 'café', 'dulce de leche'
  ];

  const hasResults = useMemo(() => {
    return knownProducts.some(p => productName.toLowerCase().includes(p));
  }, [productName]);

  // Filtrar y ordenar comercios
  const filteredAndSortedStores = useMemo(() => {
    if (!hasResults) return [];
    let filtered = [...stores];

    // Filtrar por distancia máxima
    if (maxDistance !== 'all') {
      const maxKm = parseFloat(maxDistance);
      filtered = filtered.filter(store => store.distanceKm <= maxKm);
    }

    // Ordenar
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return filtered;
  }, [sortBy, maxDistance, hasResults]);

  const handleViewOnMap = () => {
    if (filteredAndSortedStores.length === 0) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(productName + ' tiendas')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-10 transition-colors">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="size-4 mr-2" />
              Volver
            </Button>
            <div className="flex-1 flex justify-center">
              <Logo className="h-10" />
            </div>
            <div className="w-24"></div>
          </div>
          <h2 className="text-2xl text-gray-900 dark:text-slate-100">
            {hasResults ? `Resultados para "${productName}"` : 'Búsqueda sin resultados'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {hasResults ? `${filteredAndSortedStores.length} comercios encontrados` : `No pudimos encontrar nada para "${productName}"`}
          </p>
        </div>
      </div>

      {/* Filtros */}
      {hasResults && (
        <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-gray-600 dark:text-slate-400" />
                <span className="text-sm text-gray-600 dark:text-slate-400">Filtros:</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">Ordenar:</span>
                <Select value={sortBy} onValueChange={(value: 'price' | 'distance') => setSortBy(value)}>
                  <SelectTrigger className="w-40 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
                    <SelectItem value="price">Mejor precio</SelectItem>
                    <SelectItem value="distance">Más cercano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">Distancia:</span>
                <Select value={maxDistance} onValueChange={setMaxDistance}>
                  <SelectTrigger className="w-32 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="1">1 km</SelectItem>
                    <SelectItem value="2">2 km</SelectItem>
                    <SelectItem value="3">3 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={handleViewOnMap}
                className="ml-auto dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <MapIcon className="size-4 mr-2" />
                Ver en mapa
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {!hasResults ? (
          <div className="space-y-8">
            <Card className="p-16 text-center border-dashed border-2 bg-white dark:bg-slate-900 dark:border-slate-800">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full">
                  <Search className="size-12 text-blue-400 dark:text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-slate-100">No encontramos resultados</h3>
                  <p className="text-gray-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                    Intentá con otro producto o verificá si el nombre es correcto.
                  </p>
                </div>
                <Button
                  variant="default"
                  onClick={onBack}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Volver a buscar
                </Button>
              </div>
            </Card>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h4 className="text-gray-900 dark:text-slate-200 font-medium mb-4 flex items-center gap-2">
                <StoreIcon className="size-4 text-blue-600 dark:text-blue-500" />
                Productos sugeridos:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {knownProducts.slice(0, 4).map((product, idx) => (
                  <Card 
                    key={idx} 
                    className="p-4 hover:border-blue-300 dark:hover:border-blue-700 dark:bg-slate-900 dark:border-slate-800 transition-all cursor-pointer group"
                    onClick={() => onSearchAgain && onSearchAgain(product)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize text-gray-700 dark:text-slate-300 font-medium">{product}</span>
                      <ArrowLeft className="size-4 text-gray-300 dark:text-slate-600 group-hover:text-blue-500 rotate-180 transition-transform" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : filteredAndSortedStores.length === 0 ? (
          <Card className="p-12 text-center dark:bg-slate-900 dark:border-slate-800">
            <p className="text-gray-500 dark:text-slate-400">No hay comercios con estos filtros.</p>
            <Button variant="outline" onClick={() => setMaxDistance('all')} className="mt-4 dark:border-slate-700 dark:text-slate-300">
              Limpiar filtros
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedStores.map((store, index) => (
              <Card key={store.id} className="p-6 hover:shadow-lg dark:hover:shadow-blue-900/10 transition-shadow dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <StoreIcon className="size-5 text-gray-600 dark:text-slate-400" />
                      <h3 className="text-xl dark:text-slate-100">{store.name}</h3>
                      {sortBy === 'price' && index === 0 && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Mejor precio</Badge>
                      )}
                      {sortBy === 'distance' && index === 0 && (
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Más cercano</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span>{store.address}</span>
                        <span className="text-gray-300 dark:text-slate-700">•</span>
                        <span>{store.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-500 mb-1">
                      ${store.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <Button
                    variant="default"
                    onClick={() => onViewStore(store.id, store.name, store.address)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    Ver comercio
                  </Button>
                  <Button variant="outline" className="dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`, '_blank')}>
                    <MapPin className="size-4 mr-2" />
                    Mapa
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
