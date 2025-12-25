import React from 'react';
import { User, ShoppingBag, Clock } from 'lucide-react';

export default function UserProfile({ userBehavior }) {
    const { viewedCategories, interactionSummary } = userBehavior;

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <User className="text-slate-600 w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Active User</h2>
                    <p className="text-sm text-slate-500 font-mono">ID: #8821X9</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-3 text-slate-800 text-sm font-semibold uppercase tracking-wide">
                        <Clock size={16} className="text-blue-500" /> Recently Viewed
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {viewedCategories.map((cat, i) => (
                            <span key={i} className="px-3 py-1 rounded-md text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-3 text-slate-800 text-sm font-semibold uppercase tracking-wide">
                        <ShoppingBag size={16} className="text-blue-500" /> Interaction Summary
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100 italic">
                        "{interactionSummary}"
                    </p>
                </div>
            </div>
        </div>
    );
}
