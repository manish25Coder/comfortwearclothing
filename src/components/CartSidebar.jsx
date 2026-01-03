import { X, Plus, Minus, ShoppingCart } from "lucide-react";

const CartSidebar = ({
  cart,
  showCart,
  closeCart,
  updateQuantity,
  removeFromCart,
  subtotal,
  gst,
  total,
  handleCheckout,
}) => {
  if (!showCart) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      onClick={closeCart}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white rounded-l-3xl shadow-2xl flex flex-col animate-slideIn"
      >
        <div className="flex justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={closeCart}>
            <X />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-5 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <ShoppingCart size={64} className="mx-auto" />
              <p className="mt-4">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-indigo-600 font-bold">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rs.{item.price} × {item.quantity}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 bg-white rounded-full shadow"
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 bg-white rounded-full shadow"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>GST (18%)</span>
              <span>Rs.{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total</span>
              <span className="text-indigo-600">
                Rs.{total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
