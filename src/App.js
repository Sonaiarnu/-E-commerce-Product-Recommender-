import React, { useState, useEffect } from 'react';
import UserProfile from './components/UserProfile';
import ProductCard from './components/ProductCard';
import ExplanationModal from './components/ExplanationModal';
import { Layers } from 'lucide-react';

function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [userRes, prodRes] = await Promise.all([
                    fetch('http://localhost:3000/api/user'),
                    fetch('http://localhost:3000/api/products')
                ]);

                const userJson = await userRes.json();
                const prodJson = await prodRes.json();

                setUserData(userJson.behavior);
                setProducts(prodJson);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
            {/* Professional Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded text-white">
                            <Layers size={20} />
                        </div>
                        <h1 className="text-lg font-semibold text-slate-800">
                            RetailAI <span className="text-slate-400 font-normal">/ Insights</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Documentation</span>
                        <span>Support</span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                            JD
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Recommendation Analysis</h2>
                    <p className="text-slate-500">Review why specific products are being targeted to current active users.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: User Context */}
                    <div className="lg:col-span-4 space-y-6">
                        <UserProfile userBehavior={userData} />
                    </div>

                    {/* Right Column: Recommendations */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Top Recommendations</h3>
                            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Live Algorithm</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onExplain={setSelectedProduct}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {selectedProduct && (
                <ExplanationModal
                    product={selectedProduct}
                    userBehavior={userData}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

export default App;
