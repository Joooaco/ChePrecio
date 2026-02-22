import { ArrowLeft, MapPin, Store as StoreIcon, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Logo } from '@/app/components/Logo';

interface Product {
  id: number;
  name: string;
  price: number;
  lastUpdate: string;
  hoursAgo: number;
  category: string;
}

interface StoreDetailProps {
  storeId: number;
  storeName: string;
  address: string;
  schedule?: string;
  onBack: () => void;
}

export function StoreDetail({ storeId, storeName, address, schedule, onBack }: StoreDetailProps) {
  // Mock data para productos del comercio
  const products: Product[] = [
    { id: 1, name: 'Yerba Mate Playadito 1kg', price: 2300, lastUpdate: '20/01/2026', hoursAgo: 12, category: 'Almacén' },
    { id: 2, name: 'Yerba Mate Taragüi 1kg', price: 2450, lastUpdate: '20/01/2026', hoursAgo: 12, category: 'Almacén' },
    { id: 3, name: 'Arroz Gallo Oro 1kg', price: 1450, lastUpdate: '19/01/2026', hoursAgo: 24, category: 'Almacén' },
    { id: 4, name: 'Fideos Matarazzo 500g', price: 890, lastUpdate: '20/01/2026', hoursAgo: 8, category: 'Almacén' },
    { id: 5, name: 'Azúcar Ledesma 1kg', price: 1350, lastUpdate: '19/01/2026', hoursAgo: 36, category: 'Almacén' },
    { id: 6, name: 'Coca Cola 2.25L', price: 1750, lastUpdate: '20/01/2026', hoursAgo: 6, category: 'Bebidas' },
    { id: 7, name: 'Coca Cola 1.5L', price: 1250, lastUpdate: '20/01/2026', hoursAgo: 6, category: 'Bebidas' },
    { id: 8, name: 'Sprite 2.25L', price: 1650, lastUpdate: '20/01/2026', hoursAgo: 6, category: 'Bebidas' },
    { id: 9, name: 'Agua Villavicencio 2L', price: 650, lastUpdate: '20/01/2026', hoursAgo: 10, category: 'Bebidas' },
    { id: 10, name: 'Leche La Serenísima 1L', price: 1190, lastUpdate: '20/01/2026', hoursAgo: 5, category: 'Lácteos' },
    { id: 11, name: 'Yogur Sancor 1L', price: 1350, lastUpdate: '20/01/2026', hoursAgo: 5, category: 'Lácteos' },
    { id: 12, name: 'Dulce de Leche La Serenísima 400g', price: 1590, lastUpdate: '20/01/2026', hoursAgo: 8, category: 'Lácteos' },
    { id: 13, name: 'Aceite Cocinero 900ml', price: 2890, lastUpdate: '20/01/2026', hoursAgo: 8, category: 'Aceites y Condimentos' },
    { id: 14, name: 'Aceite Lira 1.5L', price: 4200, lastUpdate: '20/01/2026', hoursAgo: 8, category: 'Aceites y Condimentos' },
    { id: 15, name: 'Sal Celusal 500g', price: 450, lastUpdate: '19/01/2026', hoursAgo: 30, category: 'Aceites y Condimentos' },
    { id: 16, name: 'Pan Lactal Bimbo', price: 1890, lastUpdate: '20/01/2026', hoursAgo: 4, category: 'Panadería' },
    { id: 17, name: 'Pan Lactal Fargo', price: 1750, lastUpdate: '20/01/2026', hoursAgo: 4, category: 'Panadería' },
  ];

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const sortedCategories = Object.keys(productsByCategory).sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-10 transition-colors">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800">
              <ArrowLeft className="size-4 mr-2" />
              Volver
            </Button>
            <div className="flex-1 flex justify-center">
              <Logo className="h-10" />
            </div>
            <div className="w-24"></div>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StoreIcon className="size-6 text-blue-600 dark:text-blue-500" />
              <h1 className="text-3xl text-gray-900 dark:text-slate-100">{storeName}</h1>
            </div>
            <div className="flex items-start gap-2 text-gray-600 dark:text-slate-400">
              <MapPin className="size-4 mt-1" />
              <span>{address}</span>
            </div>
            {schedule && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                <Clock className="size-4" />
                <span>{schedule}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-xl text-gray-900 dark:text-slate-100 mb-6">Productos disponibles</h2>
        
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-3 pb-2 border-b border-blue-100 dark:border-blue-900/30">
                {category}
              </h3>
              
              <div className="space-y-3">
                {productsByCategory[category].map((product) => (
                  <Card key={product.id} className="p-5 hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg text-gray-900 dark:text-slate-100 mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          Actualizado hace {product.hoursAgo} {product.hoursAgo === 1 ? 'hora' : 'horas'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                          ${product.price.toLocaleString('es-AR')}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
