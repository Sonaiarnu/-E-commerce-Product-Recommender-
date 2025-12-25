import React, { useEffect, useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

export default function ExplanationModal({ product, userBehavior, onClose }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch explanation from Backend API (Simulating LLM call)
    useEffect(() => {
        async function fetchExplanation() {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/explain', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: product.id,
                        userBehavior: userBehavior
                    })
                });
                const data = await response.json();
                setText(data.explanation);
            } catch (err) {
                setText("Failed to generate explanation. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchExplanation();
    }, [product, userBehavior]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden transform animate-in fade-in zoom-in duration-150">
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-1.5 rounded-md text-blue-600">
                            <Sparkles size={18} />
                        </div>
                        <h3 className="font-semibold text-slate-900">Recommendation Logic</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Target Product</span>
                        <div className="text-lg font-bold text-slate-900">{product.name}</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 min-h-[100px] flex items-center">
                        {loading ? (
                            <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                                <Loader2 size={20} className="animate-spin" />
                                <span className="text-sm font-medium">Analyzing user behavior...</span>
                            </div>
                        ) : (
                            <p className="text-slate-700 leading-relaxed text-sm">
                                {text}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4 flex justify-end gap-2">
                        <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md font-medium">
                            Close
                        </button>
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 shadow-sm">
                            View Full Analysis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
