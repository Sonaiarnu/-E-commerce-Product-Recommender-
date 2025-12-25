import React from 'react';
import { Sparkles, BarChart2 } from 'lucide-react';

export default function ProductCard({ product, onExplain }) {
    return (
        <div className="group bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-center p-4 gap-6">

            {/* Product "Thumbnail" - Simplified */}
            <div className="w-16 h-16 rounded bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
                <span className="font-bold text-xs uppercase">{product.category.substring(0, 3)}</span>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-500 px-2 py-0.5 bg-slate-100 rounded">
                        {product.category}
                    </span>
                    <span className="text-xs text-slate-400">Ref: {product.id}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 truncate">
                    {product.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><BarChart2 size={12} /> Match Score: 98%</span>
                    <span>•</span>
                    <span>Inventory: <span className="text-green-600 font-medium">In Stock</span></span>
                </div>
            </div>

            <button
                onClick={() => onExplain(product)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors border border-blue-100"
            >
                <Sparkles size={16} />
                Explain Why
            </button>
        </div>
    );
}
