import { Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400">
          <Info className="size-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <p>
            <strong className="text-gray-700 dark:text-slate-300">ChePrecio</strong> es informativo. No realiza ventas ni garantiza precios finales.
          </p>
        </div>
      </div>
    </footer>
  );
}
