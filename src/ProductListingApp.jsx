import React, { useState } from "react";
import { ShoppingCart, Search, Filter, Tag, TrendingUp, Star } from "lucide-react";
import CartSidebar from "./components/CartSidebar";
import OrderSuccess from "./components/OrderSuccess";
import generateInvoice from "./utils/generateInvoice";

const ProductListingApp = () => {

  const [products] = useState([
  {
    id: 1,
    name: "Classic Cotton Boxer Shorts",
    price: 599,
    category: "Men's Innerwear",
    image: "https://plus.unsplash.com/premium_photo-1661302899489-c4da834bf7bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Relaxed-fit cotton boxer shorts designed for everyday comfort",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "High-Support Active Sports Bra",
    price: 899,
    category: "Women's Innerwear",
    image: "https://plus.unsplash.com/premium_photo-1675186049535-fd762eea0325?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sleek, stretchable sports bra ideal for workouts and daily wear",
    rating: 4.8,
    inStock: true
  },
  {
    id: 3,
    name: "Everyday Cotton Briefs (3-Pack)",
    price: 449,
    category: "Men's Innerwear",
    image: "https://cdn17.nnnow.com/web-images/large/styles/VAVAP7VR99U/1689328628960/2.jpg",
    description: "Soft cotton briefs with a snug fit for all-day comfort",
    rating: 4.3,
    inStock: true
  },
  {
    id: 4,
    name: "Light Lace Bralette",
    price: 699,
    category: "Women's Innerwear",
    image: "https://images.unsplash.com/photo-1634846382801-219c261d38a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVuZGVyd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Minimal lace bralette offering comfort with a stylish look",
    rating: 4.6,
    inStock: false
  },
  {
    id: 5,
    name: "Warm Thermal Innerwear Set",
    price: 499,
    category: "Women's Innerwear",
    image: "https://cdn00.nnnow.com/web-images/large/styles/Q3MWNCMSQCZ/1743768711919/2.jpg",
    description: "Insulated thermal wear designed to retain warmth in cold weather",
    rating: 4.7,
    inStock: true
  },
  {
    id: 6,
    name: "Soft Bamboo Trunks",
    price: 799,
    category: "Men's Innerwear",
    image: "https://cdn06.nnnow.com/web-images/large/styles/YETFVBBWUJC/1689328628943/1.jpg",
    description: "Ultra-soft trunks made from breathable bamboo fabric",
    rating: 4.9,
    inStock: true
  },
  {
    id: 7,
    name: "Everyday Cotton Hipster Panties (5-Pack)",
    price: 549,
    category: "Women's Innerwear",
    image: "https://images.unsplash.com/photo-1610241519159-8a62634bac9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVuZGVyd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Comfort-focused hipster panties with full coverage fit",
    rating: 4.4,
    inStock: true
  },
  {
    id: 8,
    name: "Athletic Compression Shorts",
    price: 999,
    category: "Men's Innerwear",
    image: "https://cdn01.nnnow.com/web-images/large/styles/CA8Q00RUDP7/1680781149294/1.jpg",
    description: "Performance-fit compression shorts for training and sports",
    rating: 4.5,
    inStock: true
  }
]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ["All", "Men's Innerwear", "Women's Innerwear"];

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const addToCart = (product) => {
    const found = cart.find(i => i.id === product.id);
    if (found) {
      setCart(cart.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification("Added to cart!");
  };

  const updateQuantity = (id, delta) => {
    setCart(cart =>
      cart
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
    showNotification("Removed from cart");
  };

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleCheckout = () => {
    generateInvoice({ cart, subtotal, gst, total });
    setCart([]);
    setShowCart(false);
    setOrderSuccess(true);
    showNotification("Order placed successfully!");
  };

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                ComfortWear
              </h1>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          <div className="mt-4 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">

          <aside className={`md:w-64 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" /> Filters
              </h2>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Category</h3>
                {categories.map(cat => (
                  <label key={cat} className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="mr-2"
                    />
                    {cat}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" /> Sort By
                </h3>
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={sortBy === opt.value}
                      onChange={() => setSortBy(opt.value)}
                      className="mr-2"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} products
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredProducts.map(product => (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Out of Stock
          </div>
        )}

        <div className="absolute top-2 left-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold flex items-center">
          <Star className="w-3 h-3 mr-1 fill-current" />
          {product.rating}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-indigo-600 font-semibold mb-1">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            Rs.{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2 ${
              product.inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          </main>

        </div>
      </div>

      <CartSidebar
        cart={cart}
        showCart={showCart}
        closeCart={() => setShowCart(false)}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
        gst={gst}
        total={total}
        handleCheckout={handleCheckout}
      />
      {orderSuccess && (
        <OrderSuccess onClose={() => setOrderSuccess(false)} />
      )}
    </div>
  );
};

export default ProductListingApp;
