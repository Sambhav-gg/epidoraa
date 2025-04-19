import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Footer } from '../components/Footer';
import Weather from './weather'; 
import {
  Leaf,
  User,
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Search,
  Bookmark,
  UserCog,
  BookmarkPlus,
  Trash2,
  BookmarkCheck,
  Menu,
  X,
} from 'lucide-react';

const skinTypes = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'] as const;
const skinConcerns = [
  'Acne',
  'Hyperpigmentation',
  'Fine Lines',
  'Dryness',
  'Redness',
  'Sensitivity',
  'Uneven Texture',
  'Large Pores',
  'Dark Circles',
  'Sun Damage',
] as const;

type SkinType = typeof skinTypes[number];
type SkinConcern = typeof skinConcerns[number];

interface RecommendationResponse {
  products: Array<{
    name: string;
    description: string;
    why: string;
    rating:string;
  }>;
  harmful_crops: Array<{
    name: string;
    reason: string;
    origin: string;
  }>;
  harmful_pesticides: Array<{
    name: string;
    reason: string;
  }>;
}

interface SavedProduct {
  id: string;
  product_name: string;
  product_description: string;
  product_reason: string;
  product_rating: string;
  created_at: string;
}

function Dashboard() {
  const [weatherTip, setWeatherTip] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'saved'>('recommendations');
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [savingProduct, setSavingProduct] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Form states
  const [skinType, setSkinType] = useState<SkinType | ''>('');
  const [selectedConcerns, setSelectedConcerns] = useState<Set<SkinConcern>>(new Set());
  const [allergens, setAllergens] = useState('');

  useEffect(() => {
    loadSavedProducts();

    // Add click event listener to handle clicking outside the sidebar
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeTab]);

  const loadSavedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load saved products');
    }
  };

  const isProductSaved = (productName: string) => {
    return savedProducts.some(p => p.product_name === productName);
  };

  const handleSaveProduct = async (product: RecommendationResponse['products'][0]) => {
    try {
      setSavingProduct(product.name);
      
      // Check if product is already saved
      if (isProductSaved(product.name)) {
        setError('This product is already saved');
        return;
      }

      // Get the current user's ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('saved_products')
        .insert([
          {
            user_id: user.id,
            product_name: product.name,
            product_description: product.description,
            product_reason: product.why,
            product_rating:product.rating,
            
            
          }
        ]);

      if (error) throw error;
      
      // Refresh saved products
      await loadSavedProducts();
  
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSavingProduct(null);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setDeletingProduct(productId);
      const { error } = await supabase
        .from('saved_products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      setSavedProducts(savedProducts.filter(p => p.id !== productId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setDeletingProduct(null);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const handleConcernToggle = (concern: SkinConcern) => {
    const newConcerns = new Set(selectedConcerns);
    if (newConcerns.has(concern)) {
      newConcerns.delete(concern);
    } else {
      newConcerns.add(concern);
    }
    setSelectedConcerns(newConcerns);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // alert("hjk")
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recommendations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skinType,
          concerns: Array.from(selectedConcerns),
          allergens: allergens.split(',').map(a => a.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
      console.log(data)
      // alert("sd")
      // console.log();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 h-full w-64 glass-effect border-r border-green-100 transform transition-transform duration-300 ease-in-out z-20 ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-green-100">
            <div className="flex items-center gap-3">
              <Leaf className="h-7 w-7 text-green-600" />
              <span className="text-xl font-semibold gradient-text">Epidora</span>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-6 space-y-3">
            <button
              onClick={() => {
                setActiveTab('recommendations');
                setShowSidebar(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <Search className="h-5 w-5" />
              Get Recommendations
            </button>
            <button
              onClick={() => {
                setActiveTab('saved');
                setShowSidebar(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'saved'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <Bookmark className="h-5 w-5" />
              Saved Products
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="glass-effect border-b border-green-100 sticky top-0 z-30">
            <div className="flex items-center justify-between px-8 py-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-semibold gradient-text">
                  {activeTab === 'recommendations' ? 'Get Recommmendations' : 'Saved Products'}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                 {/* 🌤️ Weather Widget with Tooltip */}
                <div className="hidden md:block relative group cursor-pointer">
                  <Weather setTip={setWeatherTip} />
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max bg-white text-sm text-gray-700 rounded-lg shadow-md px-3 py-2 opacity-0 group-hover:opacity-100 transition duration-300 z-50 ">
                    {weatherTip}
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg py-1 z-50">
                      <button
                        onClick={() => navigate('/edit-profile')}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-all"
                      >
                        <UserCog className="h-5 w-5 mr-3" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-all"
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                        ) : (
                          <LogOut className="h-5 w-5 mr-3" />
                        )}
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-8 relative z-10">
            {error && (
              <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {activeTab === 'recommendations' ? (
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Skin Type */}
                  <div className="glass-effect p-8 rounded-2xl hover-card">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Skin Type</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {skinTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSkinType(type)}
                          className={`
                            flex items-center justify-center p-4 rounded-xl border-2 transition-all
                            ${skinType === type
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-200 text-gray-700 hover:bg-green-50'}
                          `}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skin Concerns */}
                  <div className="glass-effect p-8 rounded-2xl hover-card">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Skin Concerns
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {skinConcerns.map((concern) => (
                        <label
                          key={concern}
                          className={`
                            flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                            ${selectedConcerns.has(concern)
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-green-200 hover:bg-green-50'}
                          `}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedConcerns.has(concern)}
                            onChange={() => handleConcernToggle(concern)}
                          />
                          <CheckCircle2
                            className={`h-5 w-5 mr-3 ${
                              selectedConcerns.has(concern) ? 'text-green-500' : 'text-gray-300'
                            }`}
                          />
                          {concern}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Allergens */}
                  <div className="glass-effect p-8 rounded-2xl hover-card">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Allergens
                    </h3>
                    <textarea
                      value={allergens}
                      onChange={(e) => setAllergens(e.target.value)}
                      placeholder="Enter any allergens, separated by commas (e.g., latex, nuts, fragrances)"
                      className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Analyzing...
                      </>
                    ) : (
                      'Get Recommmendations'
                    )}
                  </button>
                </form>

                {/* Recommendations */}
                {recommendations && (
                  <div className="mt-12 space-y-8">
                    {/* Product Recommendations */}
                    <div className="glass-effect p-8 rounded-2xl hover-card">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Recommended Products
                      </h3>
                      <div className="grid gap-6">
                        {recommendations.products.map((product, index) => (
                          <div
                            key={index}
                            className="p-6 rounded-xl bg-green-50 border border-green-200 relative"
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-gray-900">{product.name}</h4>
                              {
                              product.rating === "10/10" ? (<p className="text-green-700 font-bold ">{`Highly recommended: ${product.rating}`}</p>):(<p className="text-green-600 font-bold">{`Recommended: ${product.rating}`}</p>)
                              }
                              <button
                                onClick={() => handleSaveProduct(product)}
                                disabled={savingProduct === product.name || isProductSaved(product.name)}
                                className={`text-green-600 hover:text-green-700 transition-colors p-1 ${
                                  isProductSaved(product.name) ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                                title={isProductSaved(product.name) ? 'Product already saved' : 'Save product'}
                              >
                                {savingProduct === product.name ? (
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                ) : isProductSaved(product.name) ? (
                                  <BookmarkCheck className="h-5 w-5" />
                                ) : (
                                  <BookmarkPlus className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            
                            <div className="mt-4 flex items-start gap-3 text-green-700">
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                              <p>{product.why}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Harmful Crops */}
                    <div className="glass-effect p-8 rounded-2xl hover-card">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Crops to Be Cautious With
                      </h3>
                      <div className="grid gap-6">
                        {recommendations.harmful_crops.map((crop, index) => (
                          <div
                            key={index}
                            className="p-6 rounded-xl bg-red-50 border border-red-200"
                          >
                            <h4 className="font-semibold text-red-700">{crop.name}</h4>
                            <p className="text-red-600 mt-2">{crop.reason}</p>
                            <p className="text-red-600 mt-2">{crop.origin}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Harmful Pesticides */}
                    <div className="glass-effect p-8 rounded-2xl hover-card">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Pesticides to Avoid
                      </h3>
                      <div className="grid gap-6">
                        {recommendations.harmful_pesticides.map((pesticide, index) => (
                          <div
                            key={index}
                            className="p-6 rounded-xl bg-yellow-50 border border-yellow-200"
                          >
                            <h4 className="font-semibold text-yellow-700">
                              {pesticide.name}
                            </h4>
                            <p className="text-yellow-600 mt-2">{pesticide.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {savedProducts.length === 0 ? (
                  <div className="glass-effect p-8 rounded-2xl hover-card text-center">
                    <Bookmark className="h-16 w-16 text-green-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No Saved Products</h3>
                    <p className="text-gray-600">
                      Your saved products will appear here. Click the bookmark icon on any product to save it.
                    </p>
                  </div>
                ) : (
                  <div className="glass-effect p-8 rounded-2xl hover-card">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Your Saved Products
                    </h3>
                    <div className="grid gap-6">
                      {savedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="p-6 rounded-xl bg-green-50 border border-green-200 relative"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900">{product.product_name}</h4>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deletingProduct === product.id}
                              className="text-red-500 hover:text-red-600 transition-colors p-1"
                              title="Remove from saved"
                            >
                              {deletingProduct === product.id ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <Trash2 className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <p className="text-gray-600 mt-2">{product.product_description}</p>
                          <p className="text-gray-600 mt-2">{product.product_rating}</p>
                          <div className="mt-4 flex items-start gap-3 text-green-700">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <p>{product.product_reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;